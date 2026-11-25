/* Brainflip — input layer: SVG drags/taps + device sensors behind one small API.
   Production version adds pinch, rotate, hold, tilt, flip and system events here. */
(function (BF) {
  'use strict';
  const U = BF.U;

  /** Draggable SVG element. Calls onTap instead of onEnd when the pointer barely moved. */
  function drag(el, svg, { onStart, onMove, onEnd, onTap }) {
    let id = null, start = null, t0 = 0, maxMove = 0;
    el.setAttribute('data-drag', '');
    el.addEventListener('pointerdown', (e) => {
      if (id !== null) return;
      id = e.pointerId; t0 = performance.now(); maxMove = 0;
      try { el.setPointerCapture(id); } catch (err) { /* ignore */ }
      start = U.svgPoint(svg, e.clientX, e.clientY);
      if (onStart) onStart(start, e);
      e.preventDefault();
    });
    el.addEventListener('pointermove', (e) => {
      if (e.pointerId !== id) return;
      const p = U.svgPoint(svg, e.clientX, e.clientY);
      const d = { dx: p.x - start.x, dy: p.y - start.y };
      maxMove = Math.max(maxMove, Math.hypot(d.dx, d.dy));
      if (onMove) onMove(p, d, e);
    });
    const end = (e) => {
      if (e.pointerId !== id) return;
      id = null;
      const p = U.svgPoint(svg, e.clientX, e.clientY);
      const d = { dx: p.x - start.x, dy: p.y - start.y };
      if (maxMove < 7 && performance.now() - t0 < 500 && onTap) onTap(p, e);
      else if (onEnd) onEnd(p, d, e);
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }

  /** Delegated taps on any element carrying data-tap="name" inside root. */
  function taps(root, handler) {
    let s = null;
    root.addEventListener('pointerdown', (e) => { s = { x: e.clientX, y: e.clientY, t: performance.now(), target: e.target }; });
    root.addEventListener('pointerup', (e) => {
      if (!s) return;
      const moved = Math.hypot(e.clientX - s.x, e.clientY - s.y);
      const target = s.target; s = null;
      if (moved > 10 || target.closest('[data-drag]')) return;
      const hit = target.closest('[data-tap]');
      if (hit) handler(hit.getAttribute('data-tap'), hit, e);
    });
  }

  /* ---------- shake detection ----------
     |acceleration| deviating from gravity by > JOLT m/s², 3 jolts inside 1.1 s = a shake. */
  const JOLT = 9.5, WINDOW = 1100, NEED = 3;
  const shakeFns = new Set(), joltFns = new Set(), flipFns = new Set(), upsideFns = new Set(), volDownFns = new Set(), blowFns = new Set();
  let motionSeen = false, lastJolt = 0, jolts = [];

  /* ---------- tilt: in-screen-plane angle, + = right edge down ----------
     From gravity when the phone is held up (works upright too); from gamma when it lies flat.
     Android reports the gravity reaction (y>0 upright), iOS the opposite sign: both handled. */
  let tiltDeg = 0, tiltOverride = null, lastGravityTilt = 0;
  let faceDown = false, faceDownSince = 0, flipFired = false, lastOrientFlip = 0;
  let upsideDown = false, upsideSince = 0, upsideFired = false, lastOrientUp = 0, upProgress = 0;
  let zSign = 0, ySign = 0; // learned upright/face-up signs for accelerometer-only fallback

  function gravityTilt(g) {
    if (!g || g.x == null || Math.hypot(g.x, g.y) < 3) return null;
    const a = g.y >= 0 ? Math.atan2(-g.x, g.y) : Math.atan2(g.x, -g.y);
    return (a * 180) / Math.PI;
  }

  function updateFaceDown(down, now) {
    if (document.hidden) { faceDownSince = 0; return; }
    faceDown = down;
    if (down) {
      if (!faceDownSince) faceDownSince = now;
      if (!flipFired && now - faceDownSince >= 420) {
        flipFired = true;
        flipFns.forEach((f) => f('sensor'));
      }
    } else {
      faceDownSince = 0;
      flipFired = false;
    }
  }

  function updateUpsideDown(upZ, now) {
    if (document.hidden) { upsideSince = 0; upProgress = 0; return; }
    // upZ = world-Z component of phone's +Y (top) axis: +1 upright, 0 flat/sideways, -1 upside down
    upProgress = U.clamp((-upZ - 0.15) / 0.65, 0, 1);
    const inv = upZ < -0.68;
    upsideDown = inv;
    if (inv) {
      if (!upsideSince) upsideSince = now;
      if (!upsideFired && now - upsideSince >= 360) {
        upsideFired = true;
        upsideFns.forEach((f) => f('sensor'));
      }
    } else {
      upsideSince = 0;
      upsideFired = false;
    }
  }

  window.addEventListener('deviceorientation', (e) => {
    if (e.gamma == null) return;
    // Ignore dummy all-zero events fired once by some desktop browsers without sensors
    const hasSignal = Math.abs(e.gamma) > 0.01 || Math.abs(e.beta || 0) > 0.01 || Math.abs(e.alpha || 0) > 0.01;
    if (!hasSignal) return;
    motionSeen = true;
    const now = performance.now();
    if (now - lastGravityTilt >= 400) tiltDeg = e.gamma;
    // Exact world-Z components under W3C Z-X'-Y'' Euler angles:
    // screen normal = cos(beta)*cos(gamma); screen +Y (top edge) = sin(beta)
    if (e.beta != null) {
      const bRad = (e.beta * Math.PI) / 180;
      const gRad = (e.gamma * Math.PI) / 180;
      const nz = Math.cos(bRad) * Math.cos(gRad);
      lastOrientFlip = now;
      updateFaceDown(nz < -0.65, now);
      lastOrientUp = now;
      updateUpsideDown(Math.sin(bRad), now);
    }
  });

  function onMotion(e) {
    if (document.hidden) return;
    let dev = null;
    const g = e.accelerationIncludingGravity, a = e.acceleration;
    const now = performance.now();
    if (g && g.x != null && g.y != null && g.z != null) {
      const mag = Math.hypot(g.x, g.y, g.z);
      // Reject zeroed dummy readings so desktop/sandboxed frames never fake sensors or trigger false shakes
      if (mag > 1.0) {
        motionSeen = true;
        const gt = gravityTilt(g);
        if (gt !== null) { tiltDeg = gt; lastGravityTilt = now; }
        updateLandscape(g.x, g.y, g.z, now);
        dev = Math.abs(mag - 9.81);
        // Accelerometer-only fallbacks when deviceorientation isn't providing beta/gamma
        if (!zSign && Math.abs(g.z) > 4) zSign = Math.sign(g.z);
        if (zSign && now - lastOrientFlip > 600) {
          updateFaceDown(g.z * zSign < -7.4 && Math.hypot(g.x, g.y) < 5.5, now);
        }
        if (!ySign && Math.abs(g.y) > 4.5) ySign = Math.sign(g.y);
        if (ySign && now - lastOrientUp > 600) {
          updateUpsideDown((g.y * ySign) / 9.81, now);
        }
      }
    }
    if (dev === null && a && a.x != null && a.y != null && a.z != null) {
      const amag = Math.hypot(a.x, a.y, a.z);
      if (amag > 0.05) { motionSeen = true; dev = amag; }
    }
    if (dev === null) return;
    if (dev > JOLT && now - lastJolt > 90) {
      lastJolt = now;
      jolts = jolts.filter((t) => now - t < WINDOW);
      jolts.push(now);
      joltFns.forEach((f) => f(jolts.length));
      if (jolts.length >= NEED) { jolts = []; shakeFns.forEach((f) => f('sensor')); }
    }
  }
  window.addEventListener('devicemotion', onMotion);

  /** iOS 13+ needs an explicit permission prompt from a user gesture. */
  async function requestMotion() {
    let ok = true;
    try {
      if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        ok = (await DeviceMotionEvent.requestPermission()) === 'granted';
      }
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        await DeviceOrientationEvent.requestPermission();
      }
    } catch (e) { return false; }
    return ok;
  }

  /** Opt-in microphone blow detector (only started on explicit user action; always stopped on cleanup). */
  let micStream = null, micCtx = null, micRAF = 0, micActive = false;
  async function startMic() {
    if (micActive) return true;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return false;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      micStream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
      micCtx = new AC();
      const src = micCtx.createMediaStreamSource(micStream);
      const an = micCtx.createAnalyser();
      an.fftSize = 512;
      src.connect(an);
      const buf = new Uint8Array(an.fftSize);
      micActive = true;
      let loudSince = 0, lastBlow = 0;
      (function poll() {
        if (!micActive) return;
        an.getByteTimeDomainData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) { const v = (buf[i] - 128) / 128; sum += v * v; }
        const rms = Math.sqrt(sum / buf.length);
        const now = performance.now();
        if (rms > 0.14 && !document.hidden) {
          if (!loudSince) loudSince = now;
          if (now - loudSince >= 170 && now - lastBlow > 900) {
            lastBlow = now; loudSince = 0;
            blowFns.forEach((f) => f('mic'));
          }
        } else {
          loudSince = 0;
        }
        micRAF = requestAnimationFrame(poll);
      })();
      return true;
    } catch (e) {
      stopMic();
      return false;
    }
  }
  function stopMic() {
    micActive = false;
    if (micRAF) { cancelAnimationFrame(micRAF); micRAF = 0; }
    if (micStream) { try { micStream.getTracks().forEach((t) => t.stop()); } catch (e) { /* ignore */ } micStream = null; }
    if (micCtx) { try { micCtx.close(); } catch (e) { /* ignore */ } micCtx = null; }
  }

  /* ---------- landscape / sideways detection ----------
     When the player turns the phone 90° the gravity vector moves into the phone's X axis.
     We only *detect* it: the UI stays portrait so the puzzle scene can react (a cloud slides off). */
  const landFns = new Set();
  let landProgress = 0, landSince = 0, landFired = false, landOverride = 0;
  function updateLandscape(px, py, pz, now) {
    if (document.hidden) { landSince = 0; landProgress = 0; return; }
    const mag = Math.hypot(px, py, pz);
    if (mag < 4) return; // flat on a table or a zeroed dummy reading
    const side = Math.abs(px) / mag;
    landProgress = U.clamp((side - 0.55) / 0.35, 0, 1);
    const on = landProgress > 0.85 && Math.abs(py) / mag < 0.6;
    if (on) {
      if (!landSince) landSince = now;
      if (!landFired && now - landSince >= 380) {
        landFired = true;
        landFns.forEach((f) => f(Math.sign(px) || 1, 'sensor'));
      }
    } else {
      landSince = 0;
      landFired = false;
    }
  }

  /* ---------- charging state (real device, opt-in: no permission needed) ----------
     We only react to a *transition* into charging (the player actually plugged the cable in).
     The state at page load is recorded silently, so a phone that was already on a charger
     — or a plugged-in laptop — never auto-wins the level. */
  const powerFns = new Set();
  let charging = false, batteryLevel = null, powerStarted = false, powerReady = false;
  function setCharging(v, src) {
    const next = !!v;
    if (next === charging) return;
    charging = next;
    if (!powerReady) return; // bootstrap reading: remember it, don't fire
    powerFns.forEach((f) => { try { f(charging, src); } catch (e) { /* ignore */ } });
  }
  async function startPower() {
    if (powerStarted) return charging;
    powerStarted = true;
    try {
      if (navigator.getBattery) {
        const b = await navigator.getBattery();
        batteryLevel = b.level;
        charging = !!b.charging;   // silent: this is the baseline, not an event
        powerReady = true;
        const upd = () => { batteryLevel = b.level; setCharging(b.charging, 'battery'); };
        b.addEventListener('chargingchange', upd);
        b.addEventListener('levelchange', upd);
      } else {
        powerReady = true;
      }
    } catch (e) { powerReady = true; /* unsupported webview: the in-game plug still works */ }
    return charging;
  }
  // Native Android bridge (MainActivity battery BroadcastReceiver) calls this hook
  window.BF_NATIVE_CHARGING = (v) => {
    if (v) { powerReady = true; setCharging(true, 'native'); }
    else setCharging(false, 'native');
    return true;
  };

  /* ---------- app leave & return (visibilitychange — Level 11!) ---------- */
  const appReturnFns = new Set();
  let hiddenAt = 0;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      hiddenAt = performance.now();
    } else if (hiddenAt) {
      const awayMs = performance.now() - hiddenAt;
      hiddenAt = 0;
      if (awayMs >= 1000) {
        appReturnFns.forEach((f) => { try { f(awayMs, 'visibility'); } catch (e) { /* ignore */ } });
      }
    }
  });

  BF.input = {
    drag, taps, requestMotion, startMic, stopMic, startPower,
    onShake(f) { shakeFns.add(f); return () => shakeFns.delete(f); },
    onJolt(f) { joltFns.add(f); return () => joltFns.delete(f); },
    onFlip(f) { flipFns.add(f); return () => flipFns.delete(f); },
    onUpsideDown(f) { upsideFns.add(f); return () => upsideFns.delete(f); },
    onVolumeDown(f) { volDownFns.add(f); return () => volDownFns.delete(f); },
    onBlow(f) { blowFns.add(f); return () => blowFns.delete(f); },
    onLandscape(f) { landFns.add(f); return () => landFns.delete(f); },
    onPower(f) { powerFns.add(f); return () => powerFns.delete(f); },
    onAppReturn(f) { appReturnFns.add(f); return () => appReturnFns.delete(f); },
    get hasMotion() { return motionSeen || tiltOverride !== null; },
    get isFaceDown() { return faceDown; },
    get isUpsideDown() { return upsideDown; },
    get upProgress() { return upProgress; },
    get micActive() { return micActive; },
    /** 0 = held upright, 1 = turned fully sideways (landscape). */
    get landscapeProgress() { return landOverride ? 1 : landProgress; },
    get isLandscape() { return landProgress > 0.85 || !!landOverride; },
    get isCharging() { return charging; },
    get batteryLevel() { return batteryLevel; },
    /** current tilt in degrees, + = right edge of the phone down */
    get tilt() { return tiltOverride !== null ? tiltOverride : tiltDeg; },
    simulateTilt(d) { tiltOverride = d; },
    simulateShake() { shakeFns.forEach((f) => f('debug')); },
    simulateFlip() { flipFns.forEach((f) => f('debug')); },
    simulateUpsideDown(src = 'debug') { upsideFns.forEach((f) => f(src)); },
    simulateVolumeDown(src = 'debug') { volDownFns.forEach((f) => f(src)); },
    simulateBlow(src = 'debug') { blowFns.forEach((f) => f(src)); },
    simulateLandscape(dir = 1) {
      landOverride = dir || 1;
      landProgress = 1;
      landFns.forEach((f) => f(dir || 1, 'debug'));
    },
    clearLandscape() { landOverride = 0; landProgress = 0; landSince = 0; landFired = false; },
    simulateCharging(v = true) {
      powerReady = true;
      if (v) charging = false; // force a real transition so listeners fire
      setCharging(v, 'debug');
    },
    simulateAppReturn(awayMs = 5000) {
      appReturnFns.forEach((f) => { try { f(awayMs, 'debug'); } catch (e) { /* ignore */ } });
    },
  };
  // Native Android bridge (MainActivity.java KEYCODE_VOLUME_DOWN) calls this hook when available
  window.BF_VOLUME_DOWN = () => {
    volDownFns.forEach((f) => f('hardware'));
    return volDownFns.size > 0;
  };
})(window.BF);
