/* Brainflip — synthesized SFX (no audio files needed for the prototype).
   Every sound is a few oscillators / filtered noise bursts through one master gain. */
(function (BF) {
  'use strict';
  const U = BF.U;
  let ctx = null, master = null, noiseBuf = null;
  let muted = U.store.get('bf.muted', false);
  const VOL = 0.6;

  function unlock() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : VOL;
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
  }

  // Suspend audio cleanly when the app goes to background (phone call, Home button, Level 11).
  document.addEventListener('visibilitychange', () => {
    if (!ctx) return;
    if (document.hidden) {
      if (ctx.state === 'running') ctx.suspend().catch(() => {});
    } else if (!muted && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  });
  window.addEventListener('pagehide', () => {
    if (ctx && ctx.state === 'running') ctx.suspend().catch(() => {});
  });

  function tone({ type = 'sine', f0 = 440, f1 = null, dur = 0.15, vol = 0.3, delay = 0, attack = 0.005 }) {
    if (!ctx) return;
    const t = ctx.currentTime + delay;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + dur + 0.05);
  }

  function noise({ dur = 0.2, vol = 0.3, type = 'lowpass', f0 = 1000, f1 = null, q = 1, delay = 0 }) {
    if (!ctx) return;
    if (!noiseBuf) {
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    const t = ctx.currentTime + delay;
    const s = ctx.createBufferSource(); s.buffer = noiseBuf;
    const fl = ctx.createBiquadFilter(); fl.type = type; fl.Q.value = q;
    fl.frequency.setValueAtTime(f0, t);
    if (f1) fl.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(fl); fl.connect(g); g.connect(master);
    s.start(t); s.stop(t + dur + 0.05);
  }

  const muteFns = new Set();
  const sfx = {
    tap: () => tone({ type: 'sine', f0: 520, f1: 880, dur: 0.08, vol: 0.22 }),
    pop: () => { tone({ type: 'sine', f0: 900, f1: 180, dur: 0.1, vol: 0.3 }); noise({ dur: 0.06, vol: 0.15, type: 'highpass', f0: 2000 }); },
    bonk: () => tone({ type: 'triangle', f0: 230, f1: 110, dur: 0.18, vol: 0.32 }),
    boing: () => tone({ type: 'sine', f0: 180, f1: 640, dur: 0.28, vol: 0.25 }),
    whoosh: () => noise({ dur: 0.35, vol: 0.22, type: 'bandpass', f0: 400, f1: 2600, q: 0.8 }),
    swish: () => noise({ dur: 0.28, vol: 0.14, type: 'bandpass', f0: 1400, f1: 500, q: 1.4 }),
    snore: () => { noise({ dur: 0.9, vol: 0.05, type: 'lowpass', f0: 280, f1: 520, q: 5 }); tone({ type: 'sawtooth', f0: 68, f1: 88, dur: 0.8, vol: 0.025 }); },
    alarm: () => { for (let i = 0; i < 7; i++) tone({ type: 'square', f0: 1320, dur: 0.055, vol: 0.1, delay: i * 0.1 }); },
    smack: () => { noise({ dur: 0.12, vol: 0.45, type: 'lowpass', f0: 2600 }); tone({ type: 'triangle', f0: 320, f1: 80, dur: 0.13, vol: 0.3 }); },
    rumble: () => { noise({ dur: 1.5, vol: 0.55, type: 'lowpass', f0: 170, f1: 60, q: 2 }); tone({ type: 'sine', f0: 46, f1: 30, dur: 1.4, vol: 0.35 }); },
    crash: () => { noise({ dur: 0.4, vol: 0.38, type: 'highpass', f0: 1600, f1: 400 }); tone({ type: 'triangle', f0: 420, f1: 90, dur: 0.25, vol: 0.22 }); },
    chirp: () => { [0, 0.2, 0.4].forEach((d, i) => { tone({ type: 'sine', f0: 2300 + i * 200, f1: 3400, dur: 0.08, vol: 0.11, delay: d }); tone({ type: 'sine', f0: 3100, f1: 2200, dur: 0.07, vol: 0.09, delay: d + 0.09 }); }); },
    brrr: () => { for (let i = 0; i < 11; i++) tone({ type: 'square', f0: 130 + Math.random() * 40, dur: 0.05, vol: 0.07, delay: i * 0.055 }); },
    giggle: () => { [0, 0.09, 0.18].forEach((d, i) => tone({ type: 'triangle', f0: 900 - i * 80, f1: 1250 - i * 80, dur: 0.07, vol: 0.14, delay: d })); },
    squeak: () => tone({ type: 'sine', f0: 1500, f1: 2500, dur: 0.12, vol: 0.14 }),
    wobble: () => tone({ type: 'sine', f0: 300, f1: 520, dur: 0.15, vol: 0.14 }),
    slam: () => { tone({ type: 'triangle', f0: 170, f1: 60, dur: 0.2, vol: 0.38 }); noise({ dur: 0.1, vol: 0.18, type: 'lowpass', f0: 900 }); },
    ouch: () => { tone({ type: 'square', f0: 700, f1: 300, dur: 0.12, vol: 0.12 }); },
    meow: () => { tone({ type: 'triangle', f0: 620, f1: 980, dur: 0.16, vol: 0.2 }); tone({ type: 'triangle', f0: 980, f1: 520, dur: 0.28, vol: 0.2, delay: 0.15 }); },
    mrrp: () => { for (let i = 0; i < 6; i++) tone({ type: 'sine', f0: 210 + (i % 2) * 30, dur: 0.05, vol: 0.06, delay: i * 0.045 }); },
    pour: (p = 0) => {
      const f = 340 + U.clamp(p, 0, 1) * 560;
      noise({ dur: 0.11, vol: 0.075, type: 'bandpass', f0: f * 1.4, f1: f * 1.7, q: 3.2 });
      tone({ type: 'sine', f0: f, f1: f * 1.18, dur: 0.08, vol: 0.085 });
    },
    click: () => {
      noise({ dur: 0.035, vol: 0.28, type: 'highpass', f0: 1800 });
      tone({ type: 'triangle', f0: 520, f1: 140, dur: 0.055, vol: 0.22 });
    },
    flip: () => {
      tone({ type: 'sine', f0: 420, f1: 110, dur: 0.26, vol: 0.24 });
      noise({ dur: 0.18, vol: 0.14, type: 'lowpass', f0: 800, f1: 160 });
    },
    beat: (n = 0) => {
      tone({ type: 'sine', f0: n % 2 ? 120 : 96, f1: 42, dur: 0.13, vol: 0.18 });
      noise({ dur: 0.045, vol: 0.055, type: 'highpass', f0: 3600, delay: 0.08 });
      tone({ type: 'square', f0: [262, 330, 392, 330][n % 4], dur: 0.08, vol: 0.045, delay: 0.04 });
    },
    shhh: () => noise({ dur: 0.42, vol: 0.16, type: 'bandpass', f0: 2800, f1: 1900, q: 1.5 }),
    lullaby: (step = 0) => {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      const f = notes[step % notes.length];
      tone({ type: 'sine', f0: f, dur: 0.36, vol: 0.16 });
      tone({ type: 'sine', f0: f * 2, dur: 0.2, vol: 0.05, delay: 0.02 });
    },
    cuckoo: () => {
      tone({ type: 'triangle', f0: 784, dur: 0.11, vol: 0.18 });
      tone({ type: 'triangle', f0: 622, dur: 0.16, vol: 0.18, delay: 0.12 });
    },
    creak: () => tone({ type: 'sawtooth', f0: 210, f1: 420, dur: 0.18, vol: 0.07 }),
    clink: () => {
      tone({ type: 'sine', f0: 1900, f1: 1450, dur: 0.09, vol: 0.18 });
      tone({ type: 'triangle', f0: 2700, dur: 0.07, vol: 0.11, delay: 0.03 });
    },
    thud: () => {
      tone({ type: 'triangle', f0: 140, f1: 58, dur: 0.13, vol: 0.3 });
      noise({ dur: 0.07, vol: 0.15, type: 'lowpass', f0: 600 });
    },
    crunch: () => {
      for (let i = 0; i < 3; i++) {
        noise({ dur: 0.055, vol: 0.22, type: 'bandpass', f0: 1700 + i * 350, q: 1.3, delay: i * 0.095 });
        tone({ type: 'triangle', f0: 260 - i * 25, f1: 110, dur: 0.05, vol: 0.14, delay: i * 0.095 });
      }
    },
    baa: (pitch = 1) => {
      const f = 340 * pitch;
      tone({ type: 'sawtooth', f0: f, f1: f * 0.92, dur: 0.24, vol: 0.09 });
      tone({ type: 'triangle', f0: f * 1.5, f1: f * 1.28, dur: 0.2, vol: 0.07, delay: 0.03 });
    },
    bark: () => {
      [0, 0.16].forEach((d) => {
        tone({ type: 'sawtooth', f0: 420, f1: 210, dur: 0.11, vol: 0.16, delay: d });
        noise({ dur: 0.09, vol: 0.14, type: 'bandpass', f0: 900, f1: 450, q: 2, delay: d });
      });
    },
    slowmo: () => {
      tone({ type: 'sine', f0: 620, f1: 190, dur: 0.34, vol: 0.18 });
      noise({ dur: 0.26, vol: 0.08, type: 'lowpass', f0: 1200, f1: 260 });
    },
    speedup: () => {
      tone({ type: 'sine', f0: 220, f1: 580, dur: 0.22, vol: 0.14 });
    },
    shakeSalt: () => {
      noise({ dur: 0.055, vol: 0.16, type: 'highpass', f0: 3200 });
      noise({ dur: 0.05, vol: 0.12, type: 'highpass', f0: 3800, delay: 0.065 });
    },
    puff: () => {
      noise({ dur: 0.24, vol: 0.18, type: 'bandpass', f0: 1100, f1: 420, q: 0.9 });
    },
    curtain: () => {
      noise({ dur: 0.22, vol: 0.14, type: 'bandpass', f0: 900, f1: 2200, q: 1.1 });
    },
    drip: () => {
      tone({ type: 'sine', f0: 1500 + Math.random() * 700, f1: 700, dur: 0.07, vol: 0.05 });
      noise({ dur: 0.05, vol: 0.03, type: 'highpass', f0: 3000 });
    },
    thunder: () => {
      noise({ dur: 1.1, vol: 0.3, type: 'lowpass', f0: 420, f1: 90, q: 1.6 });
      tone({ type: 'sine', f0: 62, f1: 34, dur: 0.95, vol: 0.16, delay: 0.05 });
    },
    splash: () => {
      noise({ dur: 0.3, vol: 0.24, type: 'bandpass', f0: 1600, f1: 500, q: 0.9 });
      tone({ type: 'sine', f0: 520, f1: 180, dur: 0.16, vol: 0.1 });
    },
    wring: () => {
      noise({ dur: 0.5, vol: 0.16, type: 'bandpass', f0: 700, f1: 1800, q: 2.2 });
      tone({ type: 'triangle', f0: 320, f1: 140, dur: 0.32, vol: 0.1, delay: 0.1 });
    },
    plugIn: () => {
      noise({ dur: 0.04, vol: 0.24, type: 'highpass', f0: 2400 });
      tone({ type: 'triangle', f0: 300, f1: 120, dur: 0.09, vol: 0.2 });
      tone({ type: 'sine', f0: 1320, dur: 0.14, vol: 0.1, delay: 0.08 });
    },
    charge: (step = 0) => {
      const f = 440 * Math.pow(2, U.clamp(step, 0, 10) / 6);
      tone({ type: 'sine', f0: f, dur: 0.12, vol: 0.1 });
      tone({ type: 'sine', f0: f * 1.5, dur: 0.09, vol: 0.05, delay: 0.02 });
    },
    lowBattery: () => {
      tone({ type: 'square', f0: 880, dur: 0.09, vol: 0.09 });
      tone({ type: 'square', f0: 660, dur: 0.12, vol: 0.08, delay: 0.12 });
    },
    zap: () => {
      noise({ dur: 0.11, vol: 0.24, type: 'bandpass', f0: 2800, f1: 900, q: 1.8 });
      tone({ type: 'sawtooth', f0: 960, f1: 240, dur: 0.1, vol: 0.16 });
      tone({ type: 'square', f0: 1480, f1: 620, dur: 0.07, vol: 0.09, delay: 0.04 });
    },
    sniffle: () => {
      noise({ dur: 0.18, vol: 0.1, type: 'bandpass', f0: 900, f1: 400, q: 1.4 });
    },
    sneeze: () => {
      // Comic "ah… CHOOOO!!"
      tone({ type: 'triangle', f0: 340, f1: 520, dur: 0.16, vol: 0.16 });
      noise({ dur: 0.34, vol: 0.44, type: 'bandpass', f0: 2400, f1: 680, q: 0.7, delay: 0.18 });
      tone({ type: 'sawtooth', f0: 680, f1: 140, dur: 0.26, vol: 0.22, delay: 0.18 });
    },
    carAlarm: () => {
      for (let i = 0; i < 3; i++) {
        tone({ type: 'square', f0: 880, dur: 0.08, vol: 0.08, delay: i * 0.16 });
        tone({ type: 'square', f0: 660, dur: 0.07, vol: 0.07, delay: i * 0.16 + 0.08 });
      }
    },
    hint: () => { tone({ type: 'sine', f0: 880, dur: 0.1, vol: 0.16 }); tone({ type: 'sine', f0: 1320, dur: 0.16, vol: 0.14, delay: 0.09 }); },
    win: () => {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone({ type: 'triangle', f0: f, dur: 0.22, vol: 0.24, delay: i * 0.11 }));
      tone({ type: 'sine', f0: 1046.5, dur: 0.7, vol: 0.14, delay: 0.44 });
      tone({ type: 'sine', f0: 1318.5, dur: 0.7, vol: 0.1, delay: 0.44 });
    },
  };

  document.addEventListener('visibilitychange', () => {
    if (!ctx) return;
    if (document.hidden) ctx.suspend().catch(() => {});
    else if (!muted) ctx.resume().catch(() => {});
  });

  BF.audio = {
    unlock,
    play(name, arg) { try { if (!document.hidden && sfx[name]) sfx[name](arg); } catch (e) { /* never let audio break gameplay */ } },
    get muted() { return muted; },
    setMuted(m) {
      muted = !!m;
      U.store.set('bf.muted', muted);
      if (master) master.gain.value = muted ? 0 : VOL;
      muteFns.forEach((f) => { try { f(muted); } catch (e) { /* ignore */ } });
    },
    onMuteChange(f) { muteFns.add(f); return () => muteFns.delete(f); },
  };
})(window.BF);
