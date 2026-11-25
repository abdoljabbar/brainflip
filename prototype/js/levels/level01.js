/* Brainflip — Level 1: "Wake him up!"
   Main ending : drag the sleepy sun up from behind the hill  (verb: drag)
   Secret #1   : shake the phone — or grab the bed and wiggle it fast  (verb: shake)
   Secret #2   : pull the blanket off  (verb: drag)
   Every other object reacts with a joke so no tap is ever dead. */
(function (BF) {
  'use strict';
  const U = BF.U, A = BF.audio, I = BF.input, ART = BF.art;
  const INK = '#1B1B2F', YELLOW = '#FFC93C', ICE = '#A8DDF7';
  const NIGHT = '#2B2D6E', DAY = '#7FD3F7';
  const SUN0 = { x: 125, y: 206 }, SUN1 = { x: 125, y: 86 };
  const LIE = { x: 220, y: 392, rot: -78 };
  const SIT = { x: 204, y: 366, rot: 0 };
  const SIT_BARE = { x: 212, y: 368, rot: 0 };
  const W = 'stroke-linecap="round" stroke-linejoin="round"';
  const S = `stroke="${INK}" stroke-width="3.4" ${W}`;

  const star = (x, y, s = 5) => `<path d="M${x},${y - s} Q${x},${y} ${x + s},${y} Q${x},${y} ${x},${y + s} Q${x},${y} ${x - s},${y} Q${x},${y} ${x},${y - s} Z"/>`;
  const moonFace = (wink) => wink
    ? `<path d="M-9,-4 Q-6,-8 -3,-4" fill="none" stroke="${INK}" stroke-width="2.2" ${W}/><path d="M-9,4 Q-5,7 -2,4" fill="none" stroke="${INK}" stroke-width="2.2" ${W}/>`
    : `<path d="M-9,-5 Q-6,-2 -3,-5" fill="none" stroke="${INK}" stroke-width="2.2" ${W}/><path d="M-8,4 Q-5,6 -2,4" fill="none" stroke="${INK}" stroke-width="2.2" ${W}/>`;

  function sceneSVG() {
    return `
<svg viewBox="0 0 390 630" xmlns="http://www.w3.org/2000/svg" aria-label="Noodle asleep in his bedroom at night">
  <defs>
    <clipPath id="l1-glass"><rect x="52" y="42" width="146" height="176" rx="4"/></clipPath>
    <pattern id="l1-wallp" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M14,9 v10 M9,14 h10" stroke="#F3C88E" stroke-width="2.4" stroke-linecap="round"/></pattern>
    <pattern id="l1-dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="3.4" fill="#fff" opacity=".9"/><circle cx="18" cy="18" r="3.4" fill="#fff" opacity=".9"/></pattern>
    <linearGradient id="l1-beamg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF1A8" stop-opacity=".9"/><stop offset="1" stop-color="#FFF1A8" stop-opacity="0"/></linearGradient>
  </defs>
  <g id="l1-shake">
    <!-- wall + floor (only these darken at night: characters and props stay readable) -->
    <rect data-tap="wall" x="-30" y="-200" width="450" height="682" fill="#FFE1B3"/>
    <rect x="-30" y="-200" width="450" height="682" fill="url(#l1-wallp)" pointer-events="none"/>
    <rect data-tap="floor" x="-30" y="482" width="450" height="520" fill="#F2A65A"/>
    <path d="M0,522 H120 M150,522 H390 M0,562 H70 M100,562 H300 M330,562 H390 M0,602 H200 M230,602 H390 M0,642 H90 M120,642 H390 M0,682 H260 M290,682 H390 M0,722 H150 M180,722 H390" stroke="#C77D4A" stroke-width="2.6" pointer-events="none"/>
    <rect x="-30" y="474" width="450" height="12" fill="#fff" ${S}/>
    <rect id="l1-night" x="-30" y="-200" width="450" height="1200" fill="#1E2058" opacity=".55" pointer-events="none"/>
    <polygon id="l1-beam" points="52,218 198,218 340,760 100,760" fill="url(#l1-beamg)" opacity="0" pointer-events="none"/>

    <!-- window: sky, stars, moon, the sleepy sun, hill -->
    <g id="l1-window">
      <g clip-path="url(#l1-glass)">
        <rect id="l1-sky" data-tap="sky" x="52" y="42" width="146" height="176" fill="${NIGHT}"/>
        <g id="l1-stars" fill="#FFF4C2" stroke="${INK}" stroke-width="1.4" pointer-events="none">
          ${star(70, 62)}${star(104, 98, 4)}${star(150, 58, 6)}${star(186, 112, 4)}${star(78, 140, 4)}${star(134, 128, 5)}${star(178, 162, 4)}
        </g>
        <g id="l1-moon" transform="translate(168,80)"><g data-tap="moon" class="fb">
          <path d="M6,-17 A17,17 0 1,0 6,17 A13,13 0 1,1 6,-17 Z" fill="#FFF4C2" stroke="${INK}" stroke-width="2.8" ${W}/>
          <g id="l1-moonface">${moonFace(false)}</g>
        </g></g>
        <g id="l1-sun" transform="translate(${SUN0.x},${SUN0.y})"><g id="l1-sun-in" class="boil peek">${ART.sun('sleep')}</g></g>
        <g data-tap="hill">
          <path d="M44,214 C78,196 112,196 140,206 C160,213 180,206 206,198 L206,224 L44,224 Z" fill="#3DDC97" ${S}/>
          <path d="M176,204 V190" stroke="${INK}" stroke-width="3.4" ${W}/>
          <circle cx="176" cy="182" r="11" fill="#2EB57B" ${S}/>
        </g>
        <path d="M66,120 L98,60 M78,132 L104,84" stroke="#fff" stroke-width="4" opacity=".28" stroke-linecap="round" pointer-events="none"/>
      </g>
      <path d="M40,30 h170 v200 h-170 Z M52,42 v176 h146 v-176 Z" fill="#fff" fill-rule="evenodd" ${S}/>
      <rect x="30" y="226" width="190" height="16" rx="6" fill="#fff" ${S}/>
    </g>
    <circle id="l1-sun-hit" cx="${SUN0.x}" cy="${SUN0.y}" r="40" fill="#000" fill-opacity="0" pointer-events="all"/>

    <!-- curtains + rod -->
    <g data-tap="curtain"><g class="fb-top boil">
      <path d="M18,26 H64 C62,70 54,120 60,170 C62,200 70,232 64,258 C52,262 38,256 26,262 C30,220 20,170 22,120 C24,80 16,50 18,26 Z" fill="#FF5D8F" ${S}/>
      <path d="M34,40 C36,100 30,170 36,250 M50,40 C48,110 54,180 50,252" fill="none" stroke="#C93A6B" stroke-width="2.4" ${W}/>
    </g></g>
    <g data-tap="curtain"><g class="fb-top boil">
      <path d="M232,26 H186 C188,70 196,120 190,170 C188,200 180,232 186,258 C198,262 212,256 224,262 C220,220 230,170 228,120 C226,80 234,50 232,26 Z" fill="#FF5D8F" ${S}/>
      <path d="M216,40 C214,100 220,170 214,250 M200,40 C202,110 196,180 200,252" fill="none" stroke="#C93A6B" stroke-width="2.4" ${W}/>
    </g></g>
    <path d="M12,24 H238" stroke="${INK}" stroke-width="4.5" ${W}/>
    <circle cx="12" cy="24" r="6.5" fill="${YELLOW}" ${S}/><circle cx="238" cy="24" r="6.5" fill="${YELLOW}" ${S}/>

    <!-- picture frame (a noodle bowl, naturally) -->
    <g id="l1-frame" transform="translate(306,108)"><g id="l1-frame-rot" transform="rotate(4,0,-52)"><g data-tap="frame" class="fb boil">
      <path d="M-22,-34 L0,-52 L22,-34" fill="none" stroke="${INK}" stroke-width="2.4" ${W}/><circle cx="0" cy="-52" r="3.6" fill="${INK}"/>
      <rect x="-44" y="-34" width="88" height="68" rx="7" fill="#C77D4A" ${S}/>
      <rect x="-35" y="-25" width="70" height="50" rx="3" fill="#FFF4E0" stroke="${INK}" stroke-width="2.4"/>
      <path d="M-12,-10 q3,-4 0,-8 M0,-12 q3,-4 0,-8" fill="none" stroke="${INK}" stroke-width="1.8" opacity=".5" ${W}/>
      <path d="M-15,3 C-15,-7 -7,-7 -7,3 C-7,-7 1,-7 1,3 C1,-7 9,-7 9,3" fill="none" stroke="${INK}" stroke-width="5" ${W}/>
      <path d="M-15,3 C-15,-7 -7,-7 -7,3 C-7,-7 1,-7 1,3 C1,-7 9,-7 9,3" fill="none" stroke="${YELLOW}" stroke-width="2.2" ${W}/>
      <path d="M8,-17 L22,4 M14,-19 L26,0" stroke="${INK}" stroke-width="2.4" ${W}/>
      <path d="M-22,3 H22 Q20,20 0,21 Q-20,20 -22,3 Z" fill="#FF5D8F" stroke="${INK}" stroke-width="2.6" ${W}/>
    </g></g></g>

    <!-- shelf: cactus + books -->
    <path d="M272,241 l8,10 M342,241 l-8,10" stroke="${INK}" stroke-width="3" ${W}/>
    <rect x="262" y="232" width="92" height="9" rx="3" fill="#C77D4A" ${S}/>
    <g transform="translate(292,232)"><g data-tap="cactus" class="fb boil">
      <path d="M-6,-18 V-48 Q-6,-56 0,-56 Q6,-56 6,-48 V-18 Z" fill="#3DDC97" ${S}/>
      <path d="M6,-32 H11 Q15,-32 15,-36 V-42" fill="none" stroke="${INK}" stroke-width="7" ${W}/><path d="M6,-32 H11 Q15,-32 15,-36 V-42" fill="none" stroke="#3DDC97" stroke-width="3" ${W}/>
      <path d="M-2,-46 h-3 M3,-38 h3 M-2,-28 h-3" stroke="${INK}" stroke-width="1.6" ${W}/>
      <path d="M-14,-18 H14 L11,0 H-11 Z" fill="#FF6B35" ${S}/>
    </g></g>
    <g transform="translate(332,232)" data-tap="books">
      <rect x="-15" y="-10" width="29" height="10" rx="2" fill="#5BC0EB" ${S}/>
      <rect x="-12" y="-19" width="25" height="9" rx="2" fill="${YELLOW}" ${S}/>
      <rect x="-14" y="-27" width="22" height="8" rx="2" fill="#FF5D8F" ${S}/>
    </g>

    <!-- floor props -->
    <g data-tap="rug">
      <ellipse cx="262" cy="568" rx="118" ry="30" fill="#3DDC97" ${S}/>
      <ellipse cx="262" cy="568" rx="100" ry="21" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="7 9"/>
    </g>
    <g transform="translate(98,548)"><g data-tap="slippers" class="fb">
      <ellipse cx="-14" cy="0" rx="16" ry="8" fill="#FF8FB1" ${S}/><ellipse cx="-19" cy="-3" rx="9" ry="6" fill="#fff" stroke="${INK}" stroke-width="2.6"/>
      <ellipse cx="18" cy="7" rx="16" ry="8" fill="#FF8FB1" ${S}/><ellipse cx="13" cy="4" rx="9" ry="6" fill="#fff" stroke="${INK}" stroke-width="2.6"/>
    </g></g>

    <!-- nightstand + alarm clock -->
    <g data-tap="nightstand">
      <rect x="26" y="472" width="8" height="12" fill="#C77D4A" ${S}/><rect x="94" y="472" width="8" height="12" fill="#C77D4A" ${S}/>
      <rect x="22" y="416" width="84" height="58" rx="3" fill="#E89A5E" ${S}/>
      <rect x="30" y="428" width="68" height="26" rx="4" fill="#F2B07A" stroke="${INK}" stroke-width="2.6"/>
      <circle cx="64" cy="441" r="4" fill="#fff" stroke="${INK}" stroke-width="2.4"/>
      <rect x="16" y="406" width="96" height="12" rx="4" fill="#C77D4A" ${S}/>
    </g>
    <g id="l1-clock" transform="translate(64,384)"><g id="l1-clock-rot"><g id="l1-clock-in" data-tap="clock" class="o0 boil">
      <path d="M-12,15 L-17,23 M12,15 L17,23" stroke="${INK}" stroke-width="3.4" ${W}/>
      <circle cx="-15" cy="-18" r="8.5" fill="#FF6B35" stroke="${INK}" stroke-width="3"/><circle cx="15" cy="-18" r="8.5" fill="#FF6B35" stroke="${INK}" stroke-width="3"/>
      <path d="M0,-22 V-29" stroke="${INK}" stroke-width="3" ${W}/><circle cx="0" cy="-31" r="3.2" fill="${INK}"/>
      <circle r="21" fill="#FF6B35" stroke="${INK}" stroke-width="3.6"/>
      <circle r="15.5" fill="#fff" stroke="${INK}" stroke-width="2.6"/>
      <path d="M0,-12 V-10 M12,0 H10 M0,12 V10 M-12,0 H-10" stroke="${INK}" stroke-width="2" ${W}/>
      <path d="M0,0 V-9 M0,0 L7,4" stroke="${INK}" stroke-width="2.6" ${W}/><circle r="2" fill="${INK}"/>
    </g></g></g>

    <!-- the bed, Noodle, the blanket -->
    <g id="l1-bedset">
      <rect id="l1-headboard" data-tap="bed" x="110" y="334" width="28" height="150" rx="13" fill="#C77D4A" ${S}/>
      <circle cx="124" cy="332" r="8" fill="#E89A5E" ${S} pointer-events="none"/>
      <rect x="144" y="466" width="12" height="16" fill="#C77D4A" ${S}/><rect x="352" y="466" width="12" height="16" fill="#C77D4A" ${S}/>
      <rect id="l1-bedbase" data-tap="bed" x="132" y="446" width="240" height="24" rx="5" fill="#C77D4A" ${S}/>
      <rect id="l1-mattress" data-tap="bed" x="134" y="420" width="236" height="30" rx="12" fill="#fff" ${S}/>
      <g id="l1-pillow" data-tap="pillow">
        <path d="M138,412 Q136,396 158,396 L196,398 Q212,400 208,414 Q206,428 186,428 L154,428 Q138,428 138,412 Z" fill="#fff" ${S}/>
        <path d="M150,404 Q156,408 150,414" fill="none" stroke="${INK}" stroke-width="2" ${W}/>
      </g>

      <g id="l1-nd" transform="translate(${LIE.x},${LIE.y})" data-tap="noodle">
        <g id="l1-nd-shake"><g id="l1-nd-boil" class="boil fb">
          <g id="l1-nd-body" transform="rotate(${LIE.rot})">${ART.noodleBody({ pillId: 'l1-nd-pill' })}<g id="l1-nd-arms"></g></g>
          <g id="l1-nd-face">
            <g id="l1-nd-face-in">${ART.noodleFace({ eyes: 'closed', mouth: 'sleep' })}</g>
            <g id="l1-bubble" data-tap="bubble">
              <circle id="l1-bubble-c" cx="9" cy="3" r="6" fill="#CFEFFF" fill-opacity=".85" stroke="${INK}" stroke-width="2.2"/>
              <circle id="l1-bubble-h" cx="7" cy="1" r="1.8" fill="#fff"/>
            </g>
          </g>
        </g></g>
      </g>

      <g id="l1-blanket"><g id="l1-blanket-in">
        <path d="M226,382 C236,360 266,356 284,374 C294,386 300,398 316,400 L360,400 Q374,400 374,414 L376,452 Q376,462 366,462 L232,462 Q222,462 222,452 L220,404 Q219,392 226,382 Z" fill="#5BC0EB" ${S}/>
        <path d="M226,382 C236,360 266,356 284,374 C294,386 300,398 316,400 L360,400 Q374,400 374,414 L376,452 Q376,462 366,462 L232,462 Q222,462 222,452 L220,404 Q219,392 226,382 Z" fill="url(#l1-dots)" pointer-events="none"/>
        <path d="M222,404 Q221,390 228,380 C232,374 238,370 246,368 L252,376 C242,380 236,390 236,404 L236,462 L232,462 Q222,462 222,452 Z" fill="#fff" stroke="${INK}" stroke-width="3" ${W}/>
      </g></g>

      <rect id="l1-footboard" data-tap="bed" x="366" y="388" width="22" height="96" rx="10" fill="#C77D4A" ${S}/>
      <circle cx="377" cy="386" r="7" fill="#E89A5E" ${S} pointer-events="none"/>
    </g>

    <g id="l1-zs" pointer-events="none"></g>
    <g id="l1-fx" pointer-events="none"></g>
    <g id="l1-talk" pointer-events="none"></g>
  </g>
</svg>`;
  }

  const L = {
    id: 1,
    promptHTML: 'Wake him <span class="pw" id="pw-up">up</span>!',
    endings: [
      { id: 'sunrise', name: 'Rise & Shine', line: 'Good morning, world!', rarity: 64, icon: 'sunrise' },
      { id: 'quake', name: 'Earthquake Alarm', line: 'WHOA! Was that an earthquake?!', rarity: 21, icon: 'quake' },
      { id: 'cold', name: 'Cold Feet', line: 'BRRR! Who stole my blanket?!', rarity: 12, icon: 'cold' },
    ],
    hints(found) {
      const sensors = I.hasMotion;
      if (!found.includes('sunrise')) return [{ text: 'Even Noodle gets up when the sun does…' }, { text: 'The sun is asleep too. Drag it UP!', demo: 'sun' }];
      if (!found.includes('quake')) return [{ text: 'Phones can shake, you know.' },
        { text: sensors ? 'Shake your phone! (Or wiggle the bed fast!)' : 'Shake your phone — or grab the bed and wiggle it fast!', demo: sensors ? 'shake' : 'bed' }];
      if (!found.includes('cold')) return [{ text: 'He looks a little TOO cozy…' }, { text: 'Steal his blanket!', demo: 'blanket' }];
      return [{ text: 'You found every ending. Galaxy brain!' }];
    },
    demo(kind) {
      if (kind === 'sun') return [{ x: 125, y: 196 }, { x: 125, y: 92 }];
      if (kind === 'shake') return { shake: true };
      if (kind === 'blanket') return [{ x: 300, y: 420 }, { x: 330, y: 530 }];
      if (kind === 'bed') return [{ x: 378, y: 446 }, { x: 352, y: 446 }, { x: 378, y: 446 }, { x: 352, y: 446 }, { x: 378, y: 446 }, { x: 352, y: 446 }];
      return null;
    },
    build,
  };

  function build(ctx) {
    ctx.root.innerHTML = sceneSVG();
    const svg = ctx.root.querySelector('svg');
    const $ = (id) => svg.querySelector('#l1-' + id);
    const shakeG = $('shake'), bedset = $('bedset');
    const nd = $('nd'), ndBody = $('nd-body'), ndFace = $('nd-face'), ndFaceIn = $('nd-face-in'), ndArms = $('nd-arms');
    const ndShake = $('nd-shake'), ndBoil = $('nd-boil'), bubble = $('bubble'), bubbleC = $('bubble-c'), bubbleH = $('bubble-h');
    const sun = $('sun'), sunIn = $('sun-in'), sunHit = $('sun-hit');
    const clockPos = $('clock'), clockRot = $('clock-rot'), clockIn = $('clock-in');
    const frame = $('frame'), frameRot = $('frame-rot');
    const blanket = $('blanket');
    const zLayer = $('zs'), fxLayer = $('fx'), talkLayer = $('talk');

    const st = {
      sleeping: true, done: false, p: 0,
      sun: { ...SUN0 }, sunMood: 'sleep', sunAnim: 0, dragSun: false,
      pose: { ...LIE }, face: 'sleep', bubblePopped: false,
      dragBlanket: false, bOff: { x: 0, y: 0 },
      busy: {}, frameTilt: 4, taps: {}, lastTouch: performance.now(),
    };
    const alive = () => ctx.alive;
    const asleep = () => ctx.alive && st.sleeping && !st.done;
    const count = (k) => (st.taps[k] = (st.taps[k] || 0) + 1);

    /* ---------- Noodle ---------- */
    function applyPose(breath) {
      const p = st.pose;
      nd.setAttribute('transform', `translate(${p.x.toFixed(1)},${p.y.toFixed(1)})`);
      ndBody.setAttribute('transform', `rotate(${p.rot.toFixed(1)}) scale(${(1 + (breath || 0)).toFixed(3)},1)`);
      const k = U.clamp(Math.abs(p.rot) / 78, 0, 1);
      const ay = -14 - 12 * k, r = (p.rot * Math.PI) / 180;
      ndFace.setAttribute('transform', `translate(${(-ay * Math.sin(r)).toFixed(1)},${(ay * Math.cos(r)).toFixed(1)}) rotate(${(p.rot * 0.18).toFixed(1)})`);
    }
    function setFace(eyes, mouth, tag) { ndFaceIn.innerHTML = ART.noodleFace({ eyes, mouth }); st.face = tag || eyes + mouth; }
    function setArms(type, color) { ndArms.innerHTML = ART.noodleArms(type, color || YELLOW); }
    function tweenPose(to, dur, ease) {
      const from = { ...st.pose };
      return U.tween(dur, (t) => { st.pose = { x: U.lerp(from.x, to.x, t), y: U.lerp(from.y, to.y, t), rot: U.lerp(from.rot, to.rot, t) }; applyPose(0); }, ease);
    }
    function setBubble(r) {
      const cx = 9 + r * 0.95, cy = 10 - r * 0.15; // hangs off the nose, beside the mouth — clear of the eyes
      bubbleC.setAttribute('cx', cx.toFixed(1)); bubbleC.setAttribute('cy', cy.toFixed(1)); bubbleC.setAttribute('r', r.toFixed(1));
      bubbleH.setAttribute('cx', (cx - r * 0.35).toFixed(1)); bubbleH.setAttribute('cy', (cy - r * 0.35).toFixed(1)); bubbleH.setAttribute('r', (r * 0.28).toFixed(1));
    }
    applyPose(0);

    /** Noodle's own speech bubble (SVG, above his head). */
    function talk(text, ms = 1800) {
      const ax = st.pose.x + (st.sleeping ? -20 : 8), ay = st.pose.y - (st.sleeping ? 46 : 66);
      ctx.talk(talkLayer, ax, ay, text, ms, 0.35);
    }

    /** Comic burst ("SMACK!", "OUCH!") */
    function burst(text, x, y, color = YELLOW) {
      const g = U.svgEl('g', { transform: `translate(${x},${y})` }, fxLayer);
      const inner = U.svgEl('g', { class: 'fb popin' }, g);
      let d = '';
      for (let i = 0; i < 18; i++) { const a = (i / 18) * Math.PI * 2, r = i % 2 ? 22 : 34; d += `${i ? 'L' : 'M'}${(Math.cos(a) * r * 1.5).toFixed(1)},${(Math.sin(a) * r).toFixed(1)} `; }
      U.svgEl('path', { d: d + 'Z', fill: color, stroke: INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, inner);
      const t = U.svgEl('text', { y: 6, 'text-anchor': 'middle', 'font-family': '"Lilita One", sans-serif', 'font-size': 17, fill: INK }, inner);
      t.textContent = text;
      setTimeout(() => g.remove(), 750);
    }

    /* ---------- idle life: breathing, snot bubble, Z's ---------- */
    const t0 = performance.now();
    (function loop(now) {
      if (!alive()) return;
      const t = (now - t0) / 1000;
      if (st.sleeping) {
        applyPose(0.022 * Math.sin(t * 2.6));
        if (!st.bubblePopped) setBubble(4 + 6.5 * (0.5 + 0.5 * Math.sin(t * 2.6 - 1)));
      }
      if (st.sleeping && !st.done && now - st.lastTouch > 7000) {
        st.lastTouch = now;
        ctx.say(U.pick(['Psst… everything here reacts. Poke around!', 'Stuck? The bulb up top can help.', 'Think outside the screen.']));
      }
      requestAnimationFrame(loop);
    })(t0);
    svg.addEventListener('pointerdown', () => { st.lastTouch = performance.now(); });

    let zi = 0;
    const zTimer = setInterval(() => {
      if (!st.sleeping || !alive() || document.hidden) return;
      zi++;
      if (zi % 2) A.play('snore');
      const size = [16, 22, 13][zi % 3];
      const z = U.svgEl('text', { x: 172, y: 352, 'font-family': '"Lilita One", sans-serif', 'font-size': size, fill: '#fff', stroke: INK, 'stroke-width': 2.4, 'paint-order': 'stroke' }, zLayer);
      z.textContent = 'Z';
      const sx = 172 + U.rand(-6, 6), sway = U.rand(10, 22) * (zi % 2 ? 1 : -1);
      U.tween(2300, (t) => {
        if (!alive()) return;
        z.setAttribute('x', (sx + Math.sin(t * 5) * 6 + sway * t).toFixed(1));
        z.setAttribute('y', (352 - 80 * t).toFixed(1));
        z.setAttribute('opacity', (t < 0.2 ? t * 5 : 1 - (t - 0.2) / 0.8).toFixed(2));
      }, U.ease.linear).then(() => z.remove());
    }, 1500);
    ctx.onCleanup(() => clearInterval(zTimer));

    /* ---------- MAIN ENDING: drag the sun up ---------- */
    function setSunMood(m) { if (st.sunMood === m) return; st.sunMood = m; sunIn.querySelector('[data-part="sunface"]').innerHTML = ART.sunFace(m); }
    function daylight(p) {
      $('sky').setAttribute('fill', U.lerpColor(NIGHT, DAY, p));
      $('stars').setAttribute('opacity', Math.max(0, 1 - p * 1.6).toFixed(2));
      $('moon').setAttribute('transform', `translate(${(168 + p * 30).toFixed(1)},${(80 + p * 132).toFixed(1)})`);
      $('night').setAttribute('opacity', (0.55 * (1 - p)).toFixed(3));
      $('beam').setAttribute('opacity', (p * 0.55).toFixed(3));
      if (!st.done) setSunMood(p > 0.45 ? 'open' : 'sleep');
      if (st.sleeping && !st.done) {
        if (p > 0.5 && st.face !== 'stir') setFace('squint', 'frown', 'stir');
        else if (p <= 0.5 && st.face === 'stir') setFace('closed', 'sleep', 'sleep');
      }
    }
    function placeSun() {
      sun.setAttribute('transform', `translate(${st.sun.x.toFixed(1)},${st.sun.y.toFixed(1)})`);
      sunHit.setAttribute('cx', st.sun.x.toFixed(1)); sunHit.setAttribute('cy', st.sun.y.toFixed(1));
      st.p = U.clamp((SUN0.y - st.sun.y) / (SUN0.y - SUN1.y), 0, 1);
      daylight(st.p);
    }
    let grab = { x: 0, y: 0 };
    I.drag(sunHit, svg, {
      onStart(pt) {
        if (ctx.locked || st.done) return;
        st.dragSun = true; st.sunAnim++;
        grab = { x: pt.x - st.sun.x, y: pt.y - st.sun.y };
        sunIn.classList.remove('peek');
        A.play('tap');
      },
      onMove(pt) {
        if (!st.dragSun) return;
        st.sun.x = U.clamp(pt.x - grab.x, 84, 166);
        st.sun.y = U.clamp(pt.y - grab.y, SUN1.y, SUN0.y + 6);
        placeSun();
        if (st.p >= 1) { st.dragSun = false; sunrise(); }
      },
      onEnd() {
        if (!st.dragSun) return;
        st.dragSun = false;
        if (st.p > 0.75) sunrise(); else sunSink();
      },
      onTap() { st.dragSun = false; if (!ctx.locked && !st.done) sunTap(); },
    });
    async function sunTap() {
      const n = count('sun'), id = ++st.sunAnim, y0 = SUN0.y;
      A.play('giggle');
      ctx.say(n === 1 ? 'Did the sun just… move?' : 'Hehe. That tickles.');
      await U.tween(180, (t) => { if (st.sunAnim !== id) return; st.sun.y = y0 - 18 * t; placeSun(); });
      await U.tween(450, (t) => { if (st.sunAnim !== id) return; st.sun.y = y0 - 18 + 18 * t; placeSun(); }, U.ease.outBounce);
      if (st.sunAnim === id && !st.done) sunIn.classList.add('peek');
    }
    async function sunSink() {
      const id = ++st.sunAnim, y0 = st.sun.y, x0 = st.sun.x;
      if (st.p > 0.15) ctx.say('It slid back down. Push it ALL the way up!');
      A.play('swish');
      await U.tween(850, (t) => { if (st.sunAnim !== id) return; st.sun.y = U.lerp(y0, SUN0.y, t); st.sun.x = U.lerp(x0, SUN0.x, t); placeSun(); }, U.ease.inOutCubic);
      if (st.sunAnim === id && !st.done) sunIn.classList.add('peek');
    }
    async function sunrise() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true; st.sunAnim++;
      const y0 = st.sun.y, x0 = st.sun.x;
      A.play('whoosh');
      await U.tween(450, (t) => { st.sun.y = U.lerp(y0, SUN1.y, t); st.sun.x = U.lerp(x0, SUN1.x, t); placeSun(); }, U.ease.outBack);
      setSunMood('happy');
      sunIn.querySelector('[data-part="rays"]').classList.add('spin');
      A.play('chirp');
      await U.wait(350);
      wake('sunrise');
    }

    /* ---------- SECRET ENDING: earthquake (shake the phone, or wiggle the bed) ---------- */
    function joltFeedback(n) {
      if (st.done || !alive()) return;
      U.replay(shakeG, 'jolt');
      A.play('wobble');
      if (n === 1 && st.sleeping) talk('Hm…?', 900);
    }
    ctx.onCleanup(I.onShake(() => quake()));
    ctx.onCleanup(I.onJolt((n) => joltFeedback(n)));
    ctx.debugShake = () => quake();

    let wig = null, bedAnim = 0;
    function springBed() {
      const id = ++bedAnim;
      const m = /translate\(([-\d.]+)/.exec(bedset.getAttribute('transform') || '');
      const from = m ? parseFloat(m[1]) : 0;
      U.tween(400, (t) => {
        if (bedAnim !== id || !alive()) return;
        bedset.setAttribute('transform', `translate(${(from * (1 - t)).toFixed(1)},0)`);
      }, U.ease.outElastic);
    }
    const bedHandlers = {
      onStart(pt) { if (ctx.locked || st.done) return; bedAnim++; A.play('tap'); wig = { lastX: pt.x, dir: 0, extreme: pt.x, flips: [] }; },
      onMove(pt, d) {
        if (!wig) return;
        bedset.setAttribute('transform', `translate(${U.clamp(d.dx * 0.3, -14, 14).toFixed(1)},0)`);
        if (wig.dir === 0) {
          if (Math.abs(pt.x - wig.extreme) > 10) { wig.dir = Math.sign(pt.x - wig.extreme); wig.extreme = pt.x; }
        } else if ((pt.x - wig.extreme) * wig.dir > 0) {
          wig.extreme = pt.x;
        } else if (Math.abs(pt.x - wig.extreme) > 14) {
          wig.dir = -wig.dir; wig.extreme = pt.x;
          const now = performance.now();
          wig.flips = wig.flips.filter((f) => now - f < 1400);
          wig.flips.push(now);
          joltFeedback(wig.flips.length);
          if (wig.flips.length >= 4) { wig = null; bedset.removeAttribute('transform'); quake(); }
        }
      },
      onEnd() { if (!wig) return; wig = null; springBed(); },
      onTap(pt, e) {
        wig = null;
        const hit = e.target.closest('[data-tap]');
        const name = hit ? hit.getAttribute('data-tap') : 'bed';
        if (taps[name]) taps[name]();
      },
    };
    ['headboard', 'bedbase', 'mattress', 'pillow', 'footboard'].forEach((id) => I.drag($(id), svg, bedHandlers));

    async function quake() {
      if (st.done || ctx.locked || !alive()) return;
      st.done = true; ctx.locked = true;
      A.play('rumble');
      U.haptic([120, 40, 200, 40, 260]);
      shakeG.classList.remove('jolt');
      shakeG.classList.add('quake');
      setTimeout(() => shakeG.classList.remove('quake'), 1300);
      // the frame drops off its nail (and lands in front of the bed), the clock falls off the nightstand
      shakeG.insertBefore(frame, zLayer);
      const tilt0 = st.frameTilt;
      U.tween(700, (t) => {
        frame.setAttribute('transform', `translate(${(306 + 12 * t).toFixed(1)},${(108 + 450 * t).toFixed(1)})`);
        frameRot.setAttribute('transform', `rotate(${U.lerp(tilt0, -14, t).toFixed(1)})`);
      }, U.ease.outBounce).then(() => A.play('crash'));
      setTimeout(() => U.tween(600, (t) => {
        clockPos.setAttribute('transform', `translate(${(64 - 10 * t).toFixed(1)},${(384 + 120 * t).toFixed(1)})`);
        clockRot.setAttribute('transform', `rotate(${(-110 * t).toFixed(1)})`);
      }, U.ease.outBounce), 220);
      zLayer.innerHTML = '';
      await U.wait(300);
      wake('quake');
    }

    /* ---------- SECRET ENDING: steal the blanket ---------- */
    I.drag(blanket, svg, {
      onStart() { if (ctx.locked || st.done) return; st.dragBlanket = true; A.play('tap'); },
      onMove(pt, d) {
        if (!st.dragBlanket) return;
        const dist = Math.hypot(d.dx, d.dy);
        st.bOff = { x: d.dx * 0.75, y: d.dy * 0.75 };
        blanket.setAttribute('transform', `translate(${st.bOff.x.toFixed(1)},${st.bOff.y.toFixed(1)})`);
        if (dist > 45 && st.face !== 'chilly') setFace('squint', 'frown', 'chilly');
        if (dist > 170) { st.dragBlanket = false; blanketOff(); }
      },
      onEnd(pt, d) {
        if (!st.dragBlanket) return;
        st.dragBlanket = false;
        if (Math.hypot(d.dx, d.dy) > 115) blanketOff(); else blanketBack();
      },
      onTap() { st.dragBlanket = false; if (!ctx.locked && !st.done) taps.blanket(); },
    });
    function blanketBack() {
      const from = { ...st.bOff };
      U.tween(650, (t) => { st.bOff = { x: from.x * (1 - t), y: from.y * (1 - t) }; blanket.setAttribute('transform', `translate(${st.bOff.x.toFixed(1)},${st.bOff.y.toFixed(1)})`); }, U.ease.outElastic);
      if (Math.hypot(from.x, from.y) > 30) {
        A.play('swish'); talk('Mmh… mine…', 1300);
        ctx.say('He yanked it back. Pull harder!');
      }
      if (st.sleeping) setFace('closed', 'sleep', 'sleep');
    }
    async function blanketOff() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      A.play('whoosh'); U.haptic(30);
      shakeG.insertBefore(blanket, zLayer); // falls in front of the bed
      const from = { ...st.bOff };
      await U.tween(560, (t) => {
        const x = U.lerp(from.x, 30, t), y = U.lerp(from.y, 128, t) - Math.sin(t * Math.PI) * 46;
        blanket.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(9 * t).toFixed(1)},300,430)`);
      }, U.ease.inOutCubic);
      A.play('slam');
      wake('cold');
    }

    /* ---------- waking up: three different payoffs ---------- */
    async function wake(type) {
      st.sleeping = false;
      bubble.style.display = 'none';
      talkLayer.innerHTML = '';
      if (!alive()) return;
      if (type === 'sunrise') {
        setFace('squint', 'flat'); await U.wait(300);
        setFace('open', 'yawn'); setArms('up'); A.play('boing');
        await tweenPose(SIT, 700, U.ease.outBack);
        talk('Good morning, world!', 2400);
        await U.wait(600); setFace('happy', 'grin');
      } else if (type === 'quake') {
        setFace('wide', 'bigO'); setArms('up'); A.play('boing');
        await tweenPose({ x: 212, y: 296, rot: -30 }, 280, U.ease.outCubic);
        await tweenPose(SIT, 560, U.ease.outBounce);
        setFace('spiral', 'o'); setArms('relax');
        dizzy();
        talk('WHOA! Earthquake?!', 2400);
      } else if (type === 'cold') {
        U.tween(400, (t) => $('nd-pill').setAttribute('fill', U.lerpColor(YELLOW, ICE, t)));
        setFace('wide', 'chatter');
        ndShake.classList.add('shiver');
        A.play('brrr');
        await tweenPose(SIT_BARE, 600, U.ease.outBack);
        setArms('hug', ICE);
        snow();
        talk('BRRR! Who stole my blanket?!', 2400);
      }
      await U.wait(850);
      if (alive()) ctx.win(type);
    }
    function dizzy() {
      const g = U.svgEl('g', { transform: `translate(${SIT.x},${SIT.y - 64}) scale(1,.35)` }, fxLayer);
      const spin = U.svgEl('g', { class: 'o0 spin', style: 'animation-duration:1.1s' }, g);
      [0, 120, 240].forEach((a) => {
        const r = (a * Math.PI) / 180;
        U.svgEl('path', { d: `M0,-9 L2.6,-2.6 L9,-2 L4,2.4 L5.6,9 L0,5.4 L-5.6,9 L-4,2.4 L-9,-2 L-2.6,-2.6 Z`, transform: `translate(${(Math.cos(r) * 30).toFixed(1)},${(Math.sin(r) * 30).toFixed(1)}) scale(1,2.6)`, fill: YELLOW, stroke: INK, 'stroke-width': 1.6 }, spin);
      });
    }
    function snow() {
      for (let i = 0; i < 16; i++) {
        const x = U.rand(120, 320), delay = U.rand(0, 700), dur = U.rand(1500, 2400), rot = U.rand(-90, 90);
        const f = U.svgEl('g', { opacity: 0 }, fxLayer);
        f.innerHTML = `<path d="M0,-7 V7 M-6,-3.5 L6,3.5 M-6,3.5 L6,-3.5" stroke="#3A9BD5" stroke-width="2.6" stroke-linecap="round"/>`;
        setTimeout(() => {
          if (!alive()) { f.remove(); return; }
          U.tween(dur, (t) => {
            if (!alive()) return;
            f.setAttribute('opacity', t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85);
            f.setAttribute('transform', `translate(${(x + Math.sin(t * 6 + i) * 10).toFixed(1)},${(250 + 200 * t).toFixed(1)}) rotate(${(rot * t).toFixed(1)})`);
          }, U.ease.linear).then(() => f.remove());
        }, delay);
      }
    }

    /* ---------- everything else reacts (and never solves) ---------- */
    async function clockTap() {
      if (st.busy.clock || !asleep()) return;
      st.busy.clock = true; ctx.attempt();
      A.play('alarm'); clockIn.classList.add('ring'); U.haptic([30, 40, 30, 40, 30, 40]);
      setFace('squint', 'frown', 'annoyed');
      await U.wait(750);
      clockIn.classList.remove('ring');
      if (!asleep()) { st.busy.clock = false; return; }
      // a stretchy noodle arm whacks the snooze button
      const d = 'M206,404 C170,356 108,338 72,370';
      const armInk = U.svgEl('path', { d, fill: 'none', stroke: INK, 'stroke-width': 11, 'stroke-linecap': 'round' }, fxLayer);
      const armCol = U.svgEl('path', { d, fill: 'none', stroke: YELLOW, 'stroke-width': 5.5, 'stroke-linecap': 'round' }, fxLayer);
      const len = armInk.getTotalLength();
      [armInk, armCol].forEach((a) => { a.style.strokeDasharray = len; a.style.strokeDashoffset = len; });
      await U.tween(170, (t) => [armInk, armCol].forEach((a) => (a.style.strokeDashoffset = len * (1 - t))));
      const hand = U.svgEl('circle', { cx: 72, cy: 370, r: 8.5, fill: YELLOW, stroke: INK, 'stroke-width': 3 }, fxLayer);
      A.play('smack'); U.haptic(40); burst('SMACK!', 70, 330);
      await U.tween(280, (t) => clockRot.setAttribute('transform', `translate(${(8 * t).toFixed(1)},${(10 * t).toFixed(1)}) rotate(${(-100 * t).toFixed(1)})`), U.ease.outBounce);
      hand.remove();
      await U.tween(170, (t) => [armInk, armCol].forEach((a) => (a.style.strokeDashoffset = len * t)));
      armInk.remove(); armCol.remove();
      if (!asleep()) { st.busy.clock = false; return; }
      setFace('closed', 'sleep', 'sleep');
      talk('…5 more minutes.');
      ctx.say('He hit snooze. Classic.');
      await U.wait(2300);
      if (!alive() || st.done) { st.busy.clock = false; return; }
      A.play('boing');
      await U.tween(350, (t) => clockRot.setAttribute('transform', `translate(${(8 * (1 - t)).toFixed(1)},${(10 * (1 - t)).toFixed(1)}) rotate(${(-100 * (1 - t)).toFixed(1)})`), U.ease.outBack);
      st.busy.clock = false;
    }

    const sleepTalk = ['5 more minutes…', 'Mmm… pancakes…', '*snort*… zzz', 'Not now, Mom…'];
    const taps = {
      noodle() {
        if (!asleep()) return;
        const n = count('noodle');
        A.play('snore'); U.replay(ndBoil, 'wiggle');
        talk(sleepTalk[(n - 1) % sleepTalk.length]);
        if (n === 2) ctx.say('He is a VERY heavy sleeper.');
        ctx.attempt();
      },
      bubble() {
        if (!asleep() || st.bubblePopped) return;
        st.bubblePopped = true;
        A.play('pop'); U.haptic(15);
        const r = bubbleC.getBoundingClientRect(), c = U.svgPoint(svg, r.left + r.width / 2, r.top + r.height / 2);
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2, drop = U.svgEl('circle', { r: 2.4, fill: '#CFEFFF', stroke: INK, 'stroke-width': 1.2 }, fxLayer);
          U.tween(380, (t) => { drop.setAttribute('cx', (c.x + Math.cos(a) * 18 * t).toFixed(1)); drop.setAttribute('cy', (c.y + Math.sin(a) * 18 * t + 10 * t * t).toFixed(1)); drop.setAttribute('opacity', 1 - t); }).then(() => drop.remove());
        }
        bubble.style.display = 'none';
        setFace('wide', 'o', 'pop');
        talk('*snort*', 1000);
        ctx.say('Gross. And he is still asleep.');
        ctx.attempt();
        setTimeout(() => {
          if (!asleep()) return;
          setFace('closed', 'sleep', 'sleep');
          bubble.style.display = ''; st.bubblePopped = false;
        }, 1300);
      },
      clock: clockTap,
      frame() {
        const from = st.frameTilt;
        st.frameTilt = from === 4 ? 18 : 4;
        A.play('wobble');
        U.tween(600, (t) => frameRot.setAttribute('transform', `rotate(${U.lerp(from, st.frameTilt, t).toFixed(1)},0,-52)`), U.ease.outElastic);
        ctx.say(st.frameTilt === 18 ? 'Crooked. Like your strategy.' : 'Straight again. Happy?');
        ctx.attempt();
      },
      curtain(node) { U.replay(node.firstElementChild, 'sway'); A.play('swish'); ctx.say('Swish! Still asleep.'); ctx.attempt(); },
      moon() {
        $('moonface').innerHTML = moonFace(true); A.play('giggle');
        ctx.say('The moon winks at you. Suspicious.');
        setTimeout(() => { if (alive()) $('moonface').innerHTML = moonFace(false); }, 900);
      },
      sky() { ctx.say('It is night. Obviously.'); ctx.attempt(); },
      hill() { ctx.say('A sleepy hill. Something is hiding behind it…'); },
      cactus(node) { A.play('ouch'); U.haptic(60); U.replay(node, 'wiggle'); burst('OUCH!', 292, 160, '#FF8FB1'); ctx.say('Cactus 1, You 0.'); ctx.attempt(); },
      books() { A.play('tap'); ctx.say('Book title: “The Sun Rises, So Do You.”', 3000); },
      slippers(node) { A.play('squeak'); U.replay(node, 'hop'); ctx.say('Squeak! Not nearly loud enough.'); ctx.attempt(); },
      rug() { A.play('tap'); ctx.say('Nice rug. Wrong answer.'); ctx.attempt(); },
      nightstand() { A.play('tap'); ctx.say('Just socks in there.'); ctx.attempt(); },
      pillow() { A.play('tap'); ctx.say('Fluffy. Not helpful.'); ctx.attempt(); },
      bed() { A.play('wobble'); ctx.say(count('bed') > 1 ? 'Wobbly old bed…' : 'Comfy bed. Too comfy.'); ctx.attempt(); },
      blanket() { A.play('swish'); talk('Mmh… burrito mode.', 1300); ctx.say('He is wrapped up tight.'); ctx.attempt(); },
      wall() { A.play('bonk'); ctx.say(U.pick(['Nope.', 'Think outside the screen.', 'Try something brighter.', 'Hmm. No.'])); ctx.attempt(); },
      floor() { taps.wall(); },
    };
    I.taps(svg, (name, node) => { if (ctx.locked) return; if (taps[name]) taps[name](node); });

    /* the prompt is part of the puzzle too */
    const up = ctx.promptEl.querySelector('#pw-up');
    ctx.promptEl.onclick = (e) => {
      if (ctx.locked) return;
      if (e.target === up) { U.replay(up, 'hop'); A.play('boing'); ctx.say('UP. Yes. Things go up.'); }
      else { A.play('tap'); ctx.say('Yes. THAT is the task.'); }
    };
  }

  BF.levels = BF.levels || {};
  BF.levels[1] = L;
})(window.BF);
