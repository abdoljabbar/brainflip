/* Brainflip — Level 2: "Pour him some tea!"
   Main ending : tilt the phone right so the teapot tips and pours; stop when the cup is full  (verb: tilt)
   Secret #1   : keep pouring after the cup is full → overflow, hot tea everywhere
   Secret #2   : feed Noodle three sugar cubes → sugar rush  (verb: drag)
   No sensors (desktop, sandboxed web view)? The teapot can be tipped by dragging it instead. */
(function (BF) {
  'use strict';
  const U = BF.U, A = BF.audio, I = BF.input, ART = BF.art;
  const INK = '#1B1B2F', YELLOW = '#FFC93C', TEA = '#B5651D', PINK = '#FF5D8F';
  const PIV = { x: 160, y: 380 };     // teapot pivot: bottom-right corner of its base
  const TIP = { x: 28, y: -80 };      // spout tip, teapot-local
  const CUP = { x: 245, y: 380 };     // cup base centre
  const RIM = CUP.y - 30;
  const ND = { x: 312, y: 322 };      // Noodle, sitting behind the table
  const W = 'stroke-linecap="round" stroke-linejoin="round"';
  const S = `stroke="${INK}" stroke-width="3.4" ${W}`;

  function teapot() {
    return `
      <path d="M-91,-62 C-116,-62 -116,-22 -91,-22" fill="none" stroke="${INK}" stroke-width="11" ${W}/>
      <path d="M-91,-62 C-116,-62 -116,-22 -91,-22" fill="none" stroke="${PINK}" stroke-width="5" ${W}/>
      <path d="M-16,-34 C2,-34 10,-52 20,-76 L31,-84 L30,-71 C22,-48 12,-22 -12,-16 Z" fill="${PINK}" ${S}/>
      <rect x="-80" y="-8" width="60" height="8" rx="3" fill="${PINK}" ${S}/>
      <circle cx="-50" cy="-46" r="42" fill="${PINK}" ${S}/>
      <circle cx="-50" cy="-46" r="42" fill="url(#l2-dots)" pointer-events="none"/>
      <path d="M-74,-70 Q-80,-56 -78,-42" fill="none" stroke="#fff" stroke-width="4.5" opacity=".6" stroke-linecap="round"/>
      <path d="M-50,-46 C-56,-54 -66,-48 -60,-40 L-50,-32 L-40,-40 C-34,-48 -44,-54 -50,-46 Z" fill="${YELLOW}" stroke="${INK}" stroke-width="2.4" ${W}/>
      <g id="l2-lid" data-tap="lid"><g class="fb">
        <ellipse cx="-50" cy="-86" rx="24" ry="7" fill="${PINK}" ${S}/>
        <circle cx="-50" cy="-96" r="6.5" fill="${YELLOW}" ${S}/>
      </g></g>`;
  }

  function sceneSVG() {
    const tile = (x, y) => `<rect x="${x}" y="${y}" width="40" height="40" fill="#FFD6E4"/>`;
    let tiles = '';
    for (let y = 520; y < 1000; y += 40) for (let x = -40; x < 420; x += 40) if (((x + y) / 40) % 2 === 0) tiles += tile(x, y);
    return `
<svg viewBox="0 0 390 630" xmlns="http://www.w3.org/2000/svg" aria-label="Noodle waiting for tea at the kitchen table">
  <defs>
    <pattern id="l2-wallp" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M15,8 L22,15 L15,22 L8,15 Z" fill="none" stroke="#B3DDF7" stroke-width="2.2"/></pattern>
    <pattern id="l2-dots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="3" fill="#fff" opacity=".85"/><circle cx="14" cy="14" r="3" fill="#fff" opacity=".85"/></pattern>
    <pattern id="l2-check" width="28" height="28" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#fff" opacity=".9"/><rect x="14" y="14" width="14" height="14" fill="#fff" opacity=".9"/></pattern>
    <clipPath id="l2-cupin"><path d="M-21,-27 H21 L16,-3 H-16 Z"/></clipPath>
  </defs>
  <g id="l2-shake">
    <rect data-tap="wall" x="-30" y="-200" width="450" height="720" fill="#CFEFFF"/>
    <rect x="-30" y="-200" width="450" height="720" fill="url(#l2-wallp)" pointer-events="none"/>
    <rect data-tap="floor" x="-30" y="520" width="450" height="480" fill="#FFF4E0"/>
    <g pointer-events="none">${tiles}</g>
    <rect x="-30" y="514" width="450" height="10" fill="#fff" ${S}/>

    <!-- hanging lamp: it swings with real gravity, a clue that tilting matters -->
    <g id="l2-lamp" transform="translate(200,-150)"><g data-tap="lamp">
      <path d="M0,0 V215" stroke="${INK}" stroke-width="3"/>
      <circle cx="0" cy="249" r="8" fill="#FFF4C2" ${S}/>
      <path d="M-32,243 L-15,215 H15 L32,243 Z" fill="${YELLOW}" ${S}/>
    </g></g>

    <!-- poster: the honest clue -->
    <g transform="translate(78,160) rotate(-4)"><g data-tap="poster" class="fb">
      <rect x="-54" y="-70" width="108" height="140" rx="6" fill="${YELLOW}" ${S}/>
      <path d="M-14,-52 L-8,-60 L0,-52 L8,-60 L14,-52 L12,-44 H-12 Z" fill="#fff" stroke="${INK}" stroke-width="2.2" ${W}/>
      <text x="0" y="-18" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="22" fill="${INK}">KEEP</text>
      <text x="0" y="6" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="22" fill="${INK}">CALM</text>
      <text x="0" y="24" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="14" fill="${INK}">AND</text>
      <text x="0" y="52" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="26" fill="${PINK}" stroke="${INK}" stroke-width="1.2">TILT ON</text>
    </g></g>

    <!-- clock: 4 o'clock, obviously -->
    <g transform="translate(300,74)"><g data-tap="clock">
      <circle r="36" fill="#fff" ${S}/>
      <path d="M0,-28 V-23 M28,0 H23 M0,28 V23 M-28,0 H-23" stroke="${INK}" stroke-width="2.6" ${W}/>
      <g id="l2-hands" class="o0"><path d="M0,0 L13,8 M0,0 V-24" stroke="${INK}" stroke-width="3.4" ${W}/></g>
      <circle r="3" fill="${INK}"/>
    </g></g>

    <!-- shelf with plates -->
    <path d="M280,214 l8,10 M362,214 l-8,10" stroke="${INK}" stroke-width="3" ${W}/>
    <g data-tap="plates"><g class="fb">
      <ellipse cx="292" cy="188" rx="9" ry="20" fill="#fff" ${S}/><ellipse cx="312" cy="188" rx="9" ry="20" fill="${PINK}" ${S}/>
      <ellipse cx="332" cy="188" rx="9" ry="20" fill="#5BC0EB" ${S}/>
      <rect x="346" y="178" width="20" height="28" rx="5" fill="#3DDC97" ${S}/>
    </g></g>
    <rect x="270" y="206" width="100" height="9" rx="3" fill="#C77D4A" ${S}/>

    <!-- chair + Noodle (behind the table) -->
    <rect x="266" y="252" width="92" height="140" rx="20" fill="#E89A5E" ${S}/>
    <path d="M286,268 V380 M312,268 V380 M338,268 V380" stroke="#C77D4A" stroke-width="5" stroke-linecap="round"/>
    <g id="l2-nd" transform="translate(${ND.x},${ND.y})" data-tap="noodle">
      <g id="l2-nd-shake"><g id="l2-nd-boil" class="boil fb">
        ${ART.noodleBody({ pillId: 'l2-nd-pill' })}
        <g id="l2-nd-arms">${ART.noodleArms('reach')}</g>
        <g transform="translate(0,-14)"><g id="l2-nd-face">${ART.noodleFace({ eyes: 'open', mouth: 'smile' })}</g></g>
      </g></g>
    </g>

    <!-- table -->
    <rect x="-20" y="372" width="430" height="14" rx="4" fill="#C77D4A" ${S}/>
    <path d="M6,386 H384 V462 Q370,476 356,462 Q342,476 328,462 Q314,476 300,462 Q286,476 272,462 Q258,476 244,462 Q230,476 216,462 Q202,476 188,462 Q174,476 160,462 Q146,476 132,462 Q118,476 104,462 Q90,476 76,462 Q62,476 48,462 Q34,476 20,462 Q13,469 6,462 Z" fill="${PINK}" ${S} data-tap="cloth"/>
    <path d="M6,386 H384 V462 Q370,476 356,462 Q342,476 328,462 Q314,476 300,462 Q286,476 272,462 Q258,476 244,462 Q230,476 216,462 Q202,476 188,462 Q174,476 160,462 Q146,476 132,462 Q118,476 104,462 Q90,476 76,462 Q62,476 48,462 Q34,476 20,462 Q13,469 6,462 Z" fill="url(#l2-check)" pointer-events="none"/>
    <rect x="30" y="470" width="14" height="52" fill="#C77D4A" ${S}/><rect x="346" y="470" width="14" height="52" fill="#C77D4A" ${S}/>

    <g id="l2-puddle" pointer-events="none"></g>

    <!-- sugar bowl -->
    <g id="l2-sugar" transform="translate(40,380)"><g class="fb">
      <rect x="-15" y="-38" width="14" height="14" rx="3" transform="rotate(-12,-8,-31)" fill="#fff" stroke="${INK}" stroke-width="2.4"/>
      <rect x="0" y="-40" width="14" height="14" rx="3" transform="rotate(10,7,-33)" fill="#fff" stroke="${INK}" stroke-width="2.4"/>
      <path d="M-26,-28 H26 Q25,0 0,0 Q-25,0 -26,-28 Z" fill="#5BC0EB" ${S}/>
      <text x="0" y="-10" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="9" fill="${INK}">SUGAR</text>
    </g></g>

    <!-- the cup -->
    <g id="l2-cup" transform="translate(${CUP.x},${CUP.y})"><g data-tap="cup">
      <path d="M21,-24 Q34,-24 32,-12 Q30,-2 18,-4" fill="none" stroke="${INK}" stroke-width="8" ${W}/>
      <path d="M21,-24 Q34,-24 32,-12 Q30,-2 18,-4" fill="none" stroke="#fff" stroke-width="3.4" ${W}/>
      <path d="M-24,-30 H24 L18,0 H-18 Z" fill="#fff" ${S}/>
      <g clip-path="url(#l2-cupin)"><rect id="l2-tea" x="-24" y="-3" width="48" height="0" fill="${TEA}"/></g>
      <path d="M-16,-12 H16" stroke="${PINK}" stroke-width="3" stroke-linecap="round"/>
      <g id="l2-drips" opacity="0"><path d="M-23,-29 Q-28,-14 -21,-2 M23,-29 Q28,-14 21,-2" fill="none" stroke="${TEA}" stroke-width="5" stroke-linecap="round"/></g>
    </g></g>

    <!-- the teapot (tips around its base corner) -->
    <g id="l2-pot" transform="translate(${PIV.x},${PIV.y})"><g id="l2-pot-in" data-tap="teapot" class="boil">${teapot()}</g></g>

    <!-- tea stream -->
    <path id="l2-stream-ink" d="" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round" opacity="0" pointer-events="none"/>
    <path id="l2-stream" d="" fill="none" stroke="${TEA}" stroke-width="5" stroke-linecap="round" opacity="0" pointer-events="none"/>

    <g id="l2-fx" pointer-events="none"></g>
    <g id="l2-talk" pointer-events="none"></g>
  </g>
</svg>`;
  }

  const L = {
    id: 2,
    promptHTML: '<span class="pw" id="pw-pour">Pour</span> him some tea!',
    endings: [
      { id: 'tea', name: 'Tea Time', line: 'Ahh. Perfect cup.', rarity: 58, icon: 'tea', stamp: 'CHEERS!' },
      { id: 'spill', name: 'Overflow', line: 'HOT HOT HOT!', rarity: 17, icon: 'spill', stamp: 'OOPS!' },
      { id: 'sugar', name: 'Sugar Rush', line: 'SUGAAAR RUSH!', rarity: 9, icon: 'sugar', stamp: 'SWEET!' },
    ],
    hints(found, ctx) {
      const sensors = I.hasMotion;
      if (!found.includes('tea')) return sensors
        ? [{ text: 'Teapots pour when they tip. Phones tip too.' }, { text: 'Tilt your phone to the right. Stop when it is full!', demo: 'tilt' }]
        : [{ text: 'Teapots pour when they tip.' }, { text: 'Drag the teapot to tip it. Stop when it is full!', demo: 'pot' }];
      if (!found.includes('spill')) return [{ text: 'What happens if you DON\'T stop?' }, { text: 'Keep pouring after the cup is full.', demo: sensors ? 'tilt' : 'pot' }];
      if (!found.includes('sugar')) return [{ text: 'Noodle has a sweet tooth.' }, { text: 'Feed him sugar cubes. Lots of them.', demo: 'sugar' }];
      return [{ text: 'All endings found. You are a tea master.' }];
    },
    demo(kind) {
      if (kind === 'tilt') return { tilt: 1 };
      if (kind === 'pot') return [{ x: 110, y: 330 }, { x: 175, y: 330 }];
      if (kind === 'sugar') return [{ x: 40, y: 362 }, { x: 300, y: 320 }];
      return null;
    },
    build,
  };

  function build(ctx) {
    ctx.root.innerHTML = sceneSVG();
    const svg = ctx.root.querySelector('svg');
    const $ = (id) => svg.querySelector('#l2-' + id);
    const pot = $('pot'), potIn = $('pot-in'), lamp = $('lamp'), cup = $('cup'), tea = $('tea'), drips = $('drips');
    const stream = $('stream'), streamInk = $('stream-ink'), puddle = $('puddle');
    const nd = $('nd'), ndFace = $('nd-face'), ndArms = $('nd-arms'), ndShake = $('nd-shake'), ndBoil = $('nd-boil');
    const fx = $('fx'), talkLayer = $('talk'), shakeG = $('shake');

    const st = {
      done: false, theta: 0, manual: null, lampA: 0, fill: 0, fullAnnounced: false, overT: 0, pourT: 0, pourSfxAt: 0, stopT: 0,
      nagged: false, warned: false, spill: 0, sugar: 0, taps: {}, face: 'smile', thirsty: true, lastTouch: performance.now(),
    };
    const alive = () => ctx.alive;
    const count = (k) => (st.taps[k] = (st.taps[k] || 0) + 1);
    const setFace = (eyes, mouth) => { ndFace.innerHTML = ART.noodleFace({ eyes, mouth }); st.face = eyes + mouth; };
    const setArms = (t, c) => { ndArms.innerHTML = ART.noodleArms(t, c || YELLOW); };

    const talk = (text, ms = 1800) => ctx.talk(talkLayer, ND.x - 6, ND.y - 62, text, ms, 0.72);

    /* ---------- the physics of a teapot ---------- */
    const potLift = (th) => Math.min(26, Math.max(0, th) * 0.42);
    function tipWorld(th) {
      const r = (th * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r);
      return { x: PIV.x + TIP.x * c - TIP.y * s, y: (PIV.y - potLift(th)) + TIP.x * s + TIP.y * c };
    }
    function drawPot() {
      pot.setAttribute('transform', `translate(${PIV.x},${(PIV.y - potLift(st.theta)).toFixed(1)}) rotate(${st.theta.toFixed(1)})`);
    }
    function drawTea() {
      const h = 25 * U.clamp(st.fill, 0, 1);
      tea.setAttribute('y', (-3 - h).toFixed(1));
      tea.setAttribute('height', h.toFixed(1));
    }
    function drawStream(on, tip, land) {
      const o = on ? 1 : 0;
      stream.setAttribute('opacity', o); streamInk.setAttribute('opacity', o);
      if (!on) return;
      const d = `M${tip.x.toFixed(1)},${tip.y.toFixed(1)} Q${(tip.x + 14).toFixed(1)},${(tip.y - 2).toFixed(1)} ${land.x.toFixed(1)},${land.y.toFixed(1)}`;
      stream.setAttribute('d', d); streamInk.setAttribute('d', d);
    }
    let puddleEl = null;
    function growPuddle(x, amt) {
      st.spill += amt;
      const rx = Math.min(70, 8 + st.spill * 60);
      if (!puddleEl) puddleEl = U.svgEl('ellipse', { cy: 381, fill: TEA, stroke: INK, 'stroke-width': 2 }, puddle);
      puddleEl.setAttribute('cx', x.toFixed(1));
      puddleEl.setAttribute('rx', rx.toFixed(1));
      puddleEl.setAttribute('ry', Math.min(6, 2 + rx / 14).toFixed(1));
    }

    // touch fallback: drag the teapot sideways to tip it (only matters without sensors)
    I.drag(potIn, svg, {
      onStart() { if (ctx.locked || st.done) return; st.manual = 0; },
      onMove(pt, d) {
        if (st.manual === null) return;
        if (I.hasMotion) { st.manual = U.clamp(d.dx * 0.12, -6, 6); return; } // just a heavy wobble
        st.manual = U.clamp(d.dx * 0.55, 0, 72);
      },
      onEnd() {
        if (st.manual === null) return;
        st.manual = null;
        if (I.hasMotion && !st.done) { ctx.say('Too heavy to lift. Tilt something bigger…'); A.play('bonk'); ctx.attempt(); }
      },
      onTap(pt, e) {
        st.manual = null;
        if (ctx.locked) return;
        const hit = e.target.closest('[data-tap]');
        if (hit && hit.getAttribute('data-tap') === 'lid') taps.lid(hit);
        else taps.teapot();
      },
    });

    let last = performance.now();
    (function loop(now) {
      if (!alive()) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      // lamp hangs toward real "down"
      const tilt = I.hasMotion ? I.tilt : 0;
      st.lampA += (U.clamp(-tilt * 0.9, -45, 45) - st.lampA) * 0.12;
      lamp.setAttribute('transform', `translate(200,-150) rotate(${st.lampA.toFixed(1)})`);

      if (!st.done) {
        let target = 0;
        if (st.manual !== null) target = st.manual;
        else if (I.hasMotion) target = U.clamp((tilt - 6) * 1.1, 0, 72);
        st.theta += (target - st.theta) * 0.14;
        drawPot();

        const flow = st.theta > 28 ? Math.min(1, (st.theta - 28) / 10) : 0;
        if (flow > 0) {
          const tip = tipWorld(st.theta);
          const landX = tip.x + 12 + Math.max(0, st.theta - 58) * 1.1;
          const inCup = tip.y < RIM - 2 && Math.abs(landX - CUP.x) < 22;
          const land = inCup ? { x: landX, y: CUP.y - 3 - 25 * Math.min(1, st.fill) } : { x: landX + 4, y: 378 };
          drawStream(true, tip, land);
          st.pourT += dt; st.stopT = 0;
          if (now - st.pourSfxAt > 115) {
            st.pourSfxAt = now;
            A.play('pour', inCup ? st.fill : 0.1);
          }
          if (inCup) {
            if (st.fill < 1) {
              st.fill = Math.min(1, st.fill + 0.4 * flow * dt);
              drawTea();
              if (st.face !== 'opengrin' && st.fill > 0.25) setFace('open', 'grin');
              if (st.fill >= 1 && !st.fullAnnounced) {
                st.fullAnnounced = true;
                setFace('wide', 'o');
                talk('That\'s plenty!', 1400);
                A.play('squeak');
              }
            } else {
              drips.setAttribute('opacity', 1);
              growPuddle(CUP.x, 0.5 * dt);
              st.overT += dt;
              if (st.overT > 1.35) overflow();
            }
          } else {
            growPuddle(landX, 0.35 * dt);
            if (!st.warned && st.spill > 0.15) { st.warned = true; ctx.say('Easy! Not THAT far.'); }
          }
        } else {
          drawStream(false);
          if (st.fill >= 1) teaTime();
          else if (st.fill > 0.12) {
            st.stopT += dt;
            if (st.stopT > 1.4 && !st.nagged) { st.nagged = true; talk('Half a cup? Really?', 1500); ctx.say('Keep going. He is thirsty.'); }
          }
        }
        if (now - st.lastTouch > 8000 && st.fill === 0) {
          st.lastTouch = now;
          ctx.say(U.pick(['Psst… read the poster.', 'Watch the lamp when you move.', 'Stuck? The bulb up top can help.']));
        }
      }
      requestAnimationFrame(loop);
    })(last);
    svg.addEventListener('pointerdown', () => { st.lastTouch = performance.now(); });

    /* ---------- endings ---------- */
    async function settlePot() {
      const from = st.theta;
      drawStream(false);
      await U.tween(450, (t) => { st.theta = from * (1 - t); drawPot(); }, U.ease.outBack);
    }
    async function teaTime() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      settlePot();
      A.play('boing');
      setFace('happy', 'grin'); setArms('hold');
      // Noodle lifts the cup to his mouth
      await U.tween(600, (t) => cup.setAttribute('transform', `translate(${U.lerp(CUP.x, ND.x - 4, t).toFixed(1)},${U.lerp(CUP.y, ND.y + 28, t).toFixed(1)}) rotate(${(-14 * t).toFixed(1)})`), U.ease.outBack);
      A.play('chirp');
      talk('Ahh. Perfect cup.', 2200);
      hearts();
      await U.wait(1300);
      if (alive()) ctx.win('tea');
    }
    async function overflow() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      A.play('whoosh'); U.haptic([60, 40, 60]);
      const t0 = performance.now();
      await U.tween(700, () => growPuddle(CUP.x, 0.03), U.ease.linear);
      settlePot();
      $('nd-pill').setAttribute('fill', '#FFB08A');
      setFace('wide', 'bigO'); setArms('up', '#FFB08A');
      ndShake.classList.add('shiver');
      A.play('brrr');
      steam();
      await U.tween(300, (t) => nd.setAttribute('transform', `translate(${ND.x},${(ND.y - 40 * Math.sin(t * Math.PI)).toFixed(1)})`));
      talk('HOT HOT HOT!', 2200);
      await U.tween(300, (t) => nd.setAttribute('transform', `translate(${ND.x},${(ND.y - 30 * Math.sin(t * Math.PI)).toFixed(1)})`));
      void t0;
      await U.wait(1100);
      if (alive()) ctx.win('spill');
    }
    async function sugarRush() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      settlePot();
      setFace('wide', 'grin'); setArms('up');
      ndShake.classList.add('shiver');
      talk('SUGAAAR RUSH!', 2400);
      U.haptic([40, 30, 40, 30, 40, 30, 80]);
      for (let i = 0; i < 5 && alive(); i++) {
        A.play('boing');
        zoomLines();
        await U.tween(220, (t) => nd.setAttribute('transform', `translate(${(ND.x + (i % 2 ? 10 : -10) * Math.sin(t * Math.PI)).toFixed(1)},${(ND.y - 46 * Math.sin(t * Math.PI)).toFixed(1)})`));
      }
      await U.wait(700);
      if (alive()) ctx.win('sugar');
    }
    function hearts() {
      for (let i = 0; i < 4; i++) {
        const h = U.svgEl('path', { d: 'M0,-6 C-4,-11 -11,-7 -7,-2 L0,5 L7,-2 C11,-7 4,-11 0,-6 Z', fill: PINK, stroke: INK, 'stroke-width': 1.8 }, fx);
        const x0 = ND.x - 30 + i * 16;
        setTimeout(() => {
          if (!alive()) { h.remove(); return; }
          U.tween(1400, (t) => {
            if (!alive()) return;
            h.setAttribute('transform', `translate(${(x0 + Math.sin(t * 6 + i) * 6).toFixed(1)},${(ND.y - 40 - 70 * t).toFixed(1)}) scale(${(0.8 + t * 0.6).toFixed(2)})`);
            h.setAttribute('opacity', 1 - t);
          }, U.ease.linear).then(() => h.remove());
        }, i * 180);
      }
    }
    function steam() {
      for (let i = 0; i < 3; i++) {
        const s = U.svgEl('path', { d: 'M0,0 q6,-8 0,-16 q-6,-8 0,-16', fill: 'none', stroke: INK, 'stroke-width': 3, 'stroke-linecap': 'round', opacity: 0.7 }, fx);
        const x0 = ND.x - 26 + i * 26;
        U.tween(1600, (t) => { s.setAttribute('transform', `translate(${x0},${(ND.y - 64 - 30 * t).toFixed(1)})`); s.setAttribute('opacity', (0.7 * (1 - t)).toFixed(2)); }, U.ease.linear).then(() => s.remove());
      }
    }
    function zoomLines() {
      const g = U.svgEl('g', {}, fx);
      g.innerHTML = `<path d="M${ND.x - 70},${ND.y - 20} h-20 M${ND.x + 70},${ND.y - 10} h20 M${ND.x - 64},${ND.y + 10} h-16 M${ND.x + 66},${ND.y + 18} h16" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`;
      setTimeout(() => g.remove(), 200);
    }

    /* ---------- SECRET: sugar cubes, dragged into Noodle's mouth ---------- */
    const sugarEl = $('sugar');
    let cube = null;
    I.drag(sugarEl, svg, {
      onStart(pt) {
        if (ctx.locked || st.done) return;
        cube = U.svgEl('rect', { width: 16, height: 16, rx: 3, fill: '#fff', stroke: INK, 'stroke-width': 2.6 }, fx);
        cube.setAttribute('transform', `translate(${pt.x - 8},${pt.y - 8})`);
        A.play('tap');
      },
      onMove(pt) { if (cube) cube.setAttribute('transform', `translate(${(pt.x - 8).toFixed(1)},${(pt.y - 8).toFixed(1)}) rotate(${(pt.x % 30) - 15},8,8)`); },
      onEnd(pt) {
        if (!cube) return;
        const c = cube; cube = null;
        if (Math.hypot(pt.x - ND.x, pt.y - (ND.y - 4)) < 52) {
          c.remove(); st.sugar++;
          A.play('pop'); U.replay(ndBoil, 'wiggle'); U.haptic(20);
          if (st.sugar === 1) { setFace('happy', 'grin'); talk('Mmm! Sugar!'); ctx.say('That is not tea.'); }
          else if (st.sugar === 2) { setFace('wide', 'grin'); talk('MORE! MORE!'); }
          else sugarRush();
        } else if (Math.abs(pt.x - CUP.x) < 26 && Math.abs(pt.y - (CUP.y - 16)) < 26) {
          c.remove(); A.play('pop'); ctx.say('Sweet. But the cup is still empty.');
        } else {
          A.play('bonk');
          const x0 = pt.x - 8, y0 = pt.y - 8;
          U.tween(400, (t) => c.setAttribute('transform', `translate(${x0.toFixed(1)},${U.lerp(y0, 364, t).toFixed(1)})`), U.ease.outBounce)
            .then(() => U.tween(500, (t) => c.setAttribute('opacity', 1 - t))).then(() => c.remove());
        }
      },
      onTap() { if (cube) { cube.remove(); cube = null; } if (!ctx.locked) taps.sugar(); },
    });

    /* ---------- reactions ---------- */
    const thirsty = ['I\'m sooo thirsty…', 'Tea, please!', '*taps cup*', 'Any day now…'];
    const taps = {
      noodle() { if (st.done) return; const n = count('noodle'); A.play('wobble'); U.replay(ndBoil, 'wiggle'); talk(thirsty[(n - 1) % thirsty.length]); ctx.attempt(); },
      cup() { A.play('squeak'); ctx.say(st.fill > 0 ? 'Some tea is in. Keep going!' : 'Empty. Tragic.'); ctx.attempt(); },
      teapot() { A.play('bonk'); U.replay(potIn, 'wiggle'); ctx.say(I.hasMotion ? 'Too heavy to lift. Tilt something bigger…' : 'Heavy! Try dragging it.'); ctx.attempt(); },
      lid(node) { A.play('boing'); U.replay(node.firstElementChild, 'hop'); steamPuff(); ctx.say('Hot! And full of tea.'); },
      lamp() { A.play('swish'); st.lampA += 25; ctx.say('Wheee. It always hangs straight down.', 2600); },
      poster(node) { A.play('tap'); U.replay(node, 'wiggle'); ctx.say('Wise words.'); },
      clock() {
        A.play('wobble');
        const h = $('hands');
        U.tween(700, (t) => h.setAttribute('transform', `rotate(${(720 * t).toFixed(0)})`), U.ease.outCubic);
        ctx.say('Four o\'clock. Always tea time.');
      },
      plates(node) { A.play('squeak'); U.replay(node.firstElementChild, 'wiggle'); ctx.say('Clatter! Not helpful.'); ctx.attempt(); },
      sugar() { A.play('tap'); ctx.say('Sugar cubes. Somebody loves sugar…'); },
      cloth() { A.play('tap'); ctx.say('Fancy tablecloth. Wrong answer.'); ctx.attempt(); },
      wall() { A.play('bonk'); ctx.say(U.pick(['Nope.', 'Think outside the screen.', 'The tea is not going to pour itself.'])); ctx.attempt(); },
      floor() { taps.wall(); },
    };
    function steamPuff() {
      const tip = { x: PIV.x - 50, y: PIV.y - 100 };
      const s = U.svgEl('path', { d: 'M0,0 q6,-8 0,-16 q-6,-8 0,-16', fill: 'none', stroke: INK, 'stroke-width': 3, 'stroke-linecap': 'round' }, fx);
      U.tween(900, (t) => { s.setAttribute('transform', `translate(${tip.x},${(tip.y - 24 * t).toFixed(1)})`); s.setAttribute('opacity', 1 - t); }).then(() => s.remove());
    }
    I.taps(svg, (name, node) => { if (ctx.locked) return; if (taps[name]) taps[name](node); });

    const pour = ctx.promptEl.querySelector('#pw-pour');
    ctx.promptEl.onclick = (e) => {
      if (ctx.locked) return;
      if (e.target === pour) { U.replay(pour, 'tip'); A.play('swish'); ctx.say('Pouring needs a little… tilt.'); }
      else { A.play('tap'); ctx.say('Yes. Tea. For Noodle.'); }
    };
    void shakeG;
  }

  BF.levels = BF.levels || {};
  BF.levels[2] = L;
})(window.BF);
