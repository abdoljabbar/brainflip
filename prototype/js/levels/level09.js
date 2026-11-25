/* Brainflip — Level 9 (redesigned, indoor Home Sweet Home): "Stop the rain!"
   Cozy living room: it's 100% sunny outside the window, yet ONE grumpy personal storm cloud
   has moved into Noodle's living room and is soaking him in his favorite armchair.
   Main ending : turn the phone SIDEWAYS (landscape) — gravity slides the indoor cloud out
                 of the room! (dev key L; desktop/no-sensor fallback: rotate the crooked
                 "HOME" wall frame 90° sideways)                                  (verb: rotate phone)
   Secret #1   : drag the living room Vacuum Cleaner nozzle up onto the rain cloud
                 to suck the entire storm straight into the dust bag!              (verb: drag appliance)
   Secret #2   : put TWO fingers on the cloud and push together in one direction
                 (desktop fallback: scroll wheel / trackpad pinch on the cloud)    (verb: two-finger push)
   Decoys: tapping or 1-finger dragging the cloud makes it rain HARDER, inside-out umbrella,
           sunny outdoor window, overflowing floor bucket, living-room puddle rubber duck,
           delighted potted fern, soggy magazines, armchair. */
(function (BF) {
  'use strict';
  const U = BF.U, A = BF.audio, I = BF.input, ART = BF.art;
  const INK = '#1B1B2F', YELLOW = '#FFC93C', PINK = '#FF5D8F', MINT = '#3DDC97', SKY = '#5BC0EB', RED = '#FF5964', ORANGE = '#FF6B35';
  const W = 'stroke-linecap="round" stroke-linejoin="round"';
  const S = `stroke="${INK}" stroke-width="3.4" ${W}`;

  const ND0 = { x: 195, y: 408 };
  const CLOUD0 = { x: 195, y: 202 };
  const FRAME_NAIL = { x: 314, y: 58 };
  const VAC0 = { x: 332, y: 458 };
  const NOZZLE0 = { x: 312, y: 378 };

  function cloudSVG(mood = 'angry') {
    const face = mood === 'panic'
      ? `<circle cx="-16" cy="-4" r="7" fill="#fff" stroke="${INK}" stroke-width="2.6"/><circle cx="-16" cy="-4" r="2.6" fill="${INK}"/>` +
        `<circle cx="16" cy="-4" r="7" fill="#fff" stroke="${INK}" stroke-width="2.6"/><circle cx="16" cy="-4" r="2.6" fill="${INK}"/>` +
        `<ellipse cx="0" cy="11" rx="7" ry="9" fill="${INK}"/>`
      : mood === 'happy'
        ? `<path d="M-24,-4 Q-16,-12 -8,-4 M8,-4 Q16,-12 24,-4" fill="none" stroke="${INK}" stroke-width="3.2" ${W}/>` +
          `<path d="M-12,9 Q0,18 12,9" fill="none" stroke="${INK}" stroke-width="3" ${W}/>`
        : `<circle cx="-17" cy="-2" r="3.6" fill="${INK}"/><circle cx="16" cy="-2" r="3.6" fill="${INK}"/>` +
          `<path d="M-30,-16 L-12,-9 M14,-9 L31,-16" stroke="${INK}" stroke-width="3.4" ${W}/>` +
          `<path d="M-13,13 Q0,5 13,13" fill="none" stroke="${INK}" stroke-width="3" ${W}/>`;
    return `
      <path d="M-62,16 C-80,16 -88,2 -80,-12 C-88,-30 -69,-44 -52,-38 C-48,-59 -16,-63 -9,-42 C3,-61 34,-58 37,-38 C55,-44 72,-29 64,-12 C78,-4 68,16 50,16 Z"
            fill="#8EA0B8" stroke="${INK}" stroke-width="3.5" ${W}/>
      <path d="M-46,3 C-40,-13 -19,-21 -5,-12" fill="none" stroke="#C5D1E0" stroke-width="6" ${W} opacity=".85"/>
      ${face}`;
  }

  function vacuumBodySVG() {
    return `
      <!-- chunky retro canister vacuum -->
      <rect x="-32" y="-14" width="64" height="36" rx="18" fill="${PINK}" ${S}/>
      <path d="M-20,-14 Q0,-24 20,-14" fill="none" stroke="${INK}" stroke-width="5.5" ${W}/>
      <path d="M-20,-14 Q0,-24 20,-14" fill="none" stroke="#FFF4DC" stroke-width="2.4" ${W}/>
      <!-- dust bag window -->
      <rect id="l9-vac-bag" x="-22" y="-6" width="24" height="16" rx="6" fill="#FFFDF6" stroke="${INK}" stroke-width="2.4"/>
      <path d="M-16,2 H-4" stroke="#B8C4D4" stroke-width="3" stroke-linecap="round"/>
      <!-- power button -->
      <circle id="l9-vac-btn" cx="15" cy="2" r="7.5" fill="${YELLOW}" stroke="${INK}" stroke-width="2.4"/>
      <path d="M15,-2 V2" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
      <!-- wheels -->
      <circle cx="-18" cy="24" r="10" fill="#32355C" ${S}/><circle cx="-18" cy="24" r="3.6" fill="#fff"/>
      <circle cx="18" cy="24" r="10" fill="#32355C" ${S}/><circle cx="18" cy="24" r="3.6" fill="#fff"/>`;
  }

  function nozzleSVG() {
    return `
      <circle cx="0" cy="0" r="30" fill="#000" fill-opacity="0" pointer-events="all"/>
      <!-- suction mouth pointing up-left -->
      <path d="M-18,-18 L18,-18 L10,-4 H-10 Z" fill="#32355C" ${S}/>
      <rect x="-20" y="-22" width="40" height="7" rx="3.5" fill="${YELLOW}" stroke="${INK}" stroke-width="2.6"/>
      <rect x="-6" y="-4" width="12" height="22" rx="5" fill="#9AA5B8" ${S}/>`;
  }

  function sceneSVG() {
    return `
<svg viewBox="0 0 390 630" xmlns="http://www.w3.org/2000/svg" aria-label="A personal storm cloud raining inside Noodle's living room while it is sunny outside">
  <defs>
    <pattern id="l9-wall" width="32" height="32" patternUnits="userSpaceOnUse">
      <rect width="16" height="32" fill="#DFECF8" opacity=".62"/>
    </pattern>
    <clipPath id="l9-winclip"><rect x="30" y="44" width="102" height="114" rx="4"/></clipPath>
  </defs>

  <g id="l9-world">
    <!-- cozy living room wall + oak wood floor (full bleed past HUD and tall screens) -->
    <rect data-tap="wall" x="-30" y="-200" width="450" height="692" fill="#EDF5FC"/>
    <rect x="-30" y="-200" width="450" height="692" fill="url(#l9-wall)" pointer-events="none"/>
    <rect data-tap="floor" x="-30" y="490" width="450" height="440" fill="#E4A267"/>
    <path d="M-30,536 H420 M-30,582 H420 M-30,628 H420 M-30,674 H420 M-30,720 H420 M82,490 V536 M246,536 V582 M130,582 V628 M312,490 V536" stroke="#C47D44" stroke-width="2.6" pointer-events="none"/>
    <rect x="-30" y="484" width="450" height="12" fill="#fff" ${S}/>

    <!-- living room rug + growing indoor puddle + unbothered rubber duck -->
    <g data-tap="rug">
      <ellipse cx="195" cy="540" rx="136" ry="24" fill="#FF8FB1" ${S}/>
      <ellipse cx="195" cy="540" rx="114" ry="15" fill="none" stroke="#FFF4E0" stroke-width="3" stroke-dasharray="8 8"/>
    </g>
    <g id="l9-puddle" data-tap="puddle" style="cursor:pointer">
      <ellipse cx="195" cy="534" rx="84" ry="14" fill="#6EC9F2" stroke="#2D8FB8" stroke-width="2.6" opacity=".88"/>
      <ellipse cx="176" cy="530" rx="34" ry="4.5" fill="#CFEFFF" opacity=".8"/>
      <g transform="translate(242,526)"><g id="l9-duck" data-tap="duck" class="fb" style="cursor:pointer">
        <ellipse cx="0" cy="4" rx="13" ry="8" fill="${YELLOW}" ${S}/>
        <circle cx="-4" cy="-6" r="7.5" fill="${YELLOW}" ${S}/>
        <path d="M-10,-7 L-17,-4 L-10,-1 Z" fill="${ORANGE}" stroke="${INK}" stroke-width="1.8"/>
        <circle cx="-3" cy="-7.5" r="1.6" fill="${INK}"/>
      </g></g>
    </g>

    <!-- ============ SUNNY LIVING ROOM WINDOW (100% sunny OUTSIDE!) ============ -->
    <g id="l9-window" data-tap="window" style="cursor:pointer">
      <g clip-path="url(#l9-winclip)">
        <rect x="30" y="44" width="102" height="114" fill="#6EC9F2"/>
        <ellipse cx="110" cy="126" rx="26" ry="10" fill="#fff" opacity=".86"/>
        <ellipse cx="48" cy="118" rx="22" ry="9" fill="#fff" opacity=".78"/>
        <path d="M26,142 Q66,126 106,142 Q124,148 138,136 V162 H26 Z" fill="#55C96B" stroke="${INK}" stroke-width="2.2"/>
        <g transform="translate(86,84) scale(.76)"><g id="l9-sun" class="fb">
          ${ART.sun('happy', { spin: true })}
        </g></g>
      </g>
      <!-- curtains + window frame -->
      <path d="M22,36 H140 V166 H22 Z M30,44 V158 H132 V44 Z" fill="#fff" fill-rule="evenodd" ${S}/>
      <path d="M81,44 V158 M30,101 H132" stroke="#fff" stroke-width="5"/><path d="M81,44 V158 M30,101 H132" stroke="${INK}" stroke-width="2.2"/>
      <rect x="16" y="162" width="130" height="11" rx="5" fill="#fff" ${S}/>
    </g>

    <!-- ============ "HOME" FRAMED SIGN + SPIRIT LEVEL (Diegetic sideways-gravity clue & desktop fallback!) ============ -->
    <g id="l9-frame-pivot" transform="translate(${FRAME_NAIL.x},${FRAME_NAIL.y})">
      <circle cx="0" cy="0" r="4" fill="${INK}"/>
      <g id="l9-frame" class="grabbable" transform="rotate(0)" style="cursor:grab">
        <circle cy="46" r="48" fill="#000" fill-opacity="0" pointer-events="all"/>
        <path d="M-16,16 L0,0 L16,16" fill="none" stroke="${INK}" stroke-width="2.6" ${W}/>
        <rect x="-42" y="16" width="84" height="68" rx="7" fill="#FFFDF8" ${S}/>
        <rect x="-34" y="24" width="68" height="52" rx="4" fill="#FFF3D6" stroke="${INK}" stroke-width="2.2"/>
        <!-- tiny cozy house icon -->
        <path d="M-14,44 L0,31 L14,44 Z" fill="${PINK}" stroke="${INK}" stroke-width="2.2" ${W}/>
        <rect x="-10" y="44" width="20" height="14" fill="#fff" stroke="${INK}" stroke-width="2"/>
        <rect x="-3" y="49" width="6" height="9" fill="${SKY}" stroke="${INK}" stroke-width="1.6"/>
        <!-- living spirit-level tube showing real tilt! -->
        <rect x="-26" y="63" width="52" height="9" rx="4.5" fill="#E3F5EB" stroke="${INK}" stroke-width="2"/>
        <circle id="l9-bubble" cx="0" cy="67.5" r="3.6" fill="${MINT}" stroke="${INK}" stroke-width="1.6"/>
        <path d="M-6,63 V72 M6,63 V72" stroke="${INK}" stroke-width="1.4" opacity=".5"/>
      </g>
    </g>

    <!-- ============ LEFT SIDE TABLE + DELIGHTED POTTED FERN + OVERFLOWING BUCKET ============ -->
    <g id="l9-table-l" data-tap="tableL">
      <rect x="28" y="414" width="11" height="78" rx="3" fill="#B5713E" ${S}/>
      <rect x="86" y="414" width="11" height="78" rx="3" fill="#B5713E" ${S}/>
      <rect x="20" y="402" width="86" height="13" rx="5" fill="#D99058" ${S}/>
    </g>
    <!-- delighted indoor fern loving the indoor rain -->
    <g transform="translate(56,386)"><g id="l9-fern" data-tap="fern" class="fb" style="cursor:pointer">
      <path d="M0,-4 C-18,-18 -20,-34 -6,-30 C-10,-44 10,-44 6,-30 C20,-34 18,-18 0,-4 Z" fill="${MINT}" ${S}/>
      <path d="M-12,-4 H12 L9,16 H-9 Z" fill="#E07A4C" ${S}/>
      <rect x="-14" y="-8" width="28" height="7" rx="3" fill="#F4A261" ${S}/>
    </g></g>
    <!-- overflowing plastic catch-bucket on floor -->
    <g transform="translate(102,482)"><g id="l9-bucket" data-tap="bucket" class="fb" style="cursor:pointer">
      <path d="M-16,-14 H16 L12,14 H-12 Z" fill="${ORANGE}" ${S}/>
      <ellipse cx="0" cy="-14" rx="16" ry="4.5" fill="#6EC9F2" stroke="${INK}" stroke-width="2.4"/>
      <path d="M-14,-14 Q0,-30 14,-14" fill="none" stroke="${INK}" stroke-width="2.4" ${W}/>
    </g></g>

    <!-- ============ PLUSH LIVING ROOM ARMCHAIR + DRENCHED NOODLE ============ -->
    <g id="l9-chair" data-tap="chair">
      <rect x="130" y="476" width="12" height="16" rx="3" fill="#B5713E" ${S}/>
      <rect x="248" y="476" width="12" height="16" rx="3" fill="#B5713E" ${S}/>
      <rect x="122" y="352" width="146" height="118" rx="26" fill="#4BA890" ${S}/>
      <rect x="110" y="408" width="28" height="72" rx="14" fill="#3B8E78" ${S}/>
      <rect x="252" y="408" width="28" height="72" rx="14" fill="#3B8E78" ${S}/>
      <rect x="132" y="440" width="126" height="40" rx="14" fill="#63C2A9" ${S}/>
    </g>

    <g id="l9-noodle" transform="translate(${ND0.x},${ND0.y})">
      <g id="l9-nd-anim" class="boil fb" data-tap="noodle" style="cursor:pointer">
        <g>${ART.noodleLegs(YELLOW)}</g>
        <g>${ART.noodleBody({ color: YELLOW })}</g>
        <g id="l9-nd-arms">${ART.noodleArms('hug', YELLOW)}</g>
        <g id="l9-nd-face" transform="translate(0,-14)">${ART.noodleFace({ eyes: 'squint', mouth: 'frown' })}</g>
        <!-- water drops running down Noodle -->
        <g id="l9-nd-drops">
          <path d="M-24,24 q3,8 0,13 q-6,-6 0,-13 M23,28 q3,8 0,13 q-6,-6 0,-13" fill="#8FD3F4" stroke="${INK}" stroke-width="1.8"/>
        </g>
        <!-- hilariously inside-out broken pink umbrella -->
        <g id="l9-umbrella-wrap" transform="translate(40,-40) rotate(16)"><g id="l9-umbrella" data-tap="umbrella" class="fb" style="cursor:pointer">
          <path d="M0,48 V-10" stroke="${INK}" stroke-width="3.6" ${W}/>
          <path d="M0,48 Q0,56 -8,54" fill="none" stroke="${INK}" stroke-width="3.6" ${W}/>
          <path d="M-28,-20 C-24,6 24,6 28,-20 Q14,-11 0,-15 Q-14,-11 -28,-20 Z" fill="${PINK}" ${S}/>
          <path d="M-18,-12 Q0,-2 18,-12 Q0,-16 -18,-12 Z" fill="#6EC9F2" stroke="${INK}" stroke-width="1.6"/>
        </g></g>
      </g>
    </g>

    <!-- ============ HOUSEHOLD VACUUM CLEANER (Secret #1: Storm Vacuum!) ============ -->
    <g id="l9-vac-body" transform="translate(${VAC0.x},${VAC0.y})">
      <g id="l9-vac-in" data-tap="vacuum" class="fb" style="cursor:pointer">
        ${vacuumBodySVG()}
      </g>
    </g>
    <!-- flexible vacuum hose connecting canister to draggable nozzle -->
    <path id="l9-hose-ink" d="" fill="none" stroke="${INK}" stroke-width="11" ${W} pointer-events="none"/>
    <path id="l9-hose-core" d="" fill="none" stroke="#6E7891" stroke-width="5.5" stroke-dasharray="4 4" ${W} pointer-events="none"/>
    <!-- draggable vacuum nozzle -->
    <g id="l9-nozzle" class="grabbable" transform="translate(${NOZZLE0.x},${NOZZLE0.y})" style="cursor:grab">
      <g id="l9-nozzle-rot"><g id="l9-nozzle-in" class="fb">${nozzleSVG()}</g></g>
    </g>

    <!-- ============ THE GRUMPY INDOOR RAIN CLOUD ============ -->
    <g id="l9-rain" pointer-events="none"></g>
    <g id="l9-cloud-wrap" transform="translate(${CLOUD0.x},${CLOUD0.y})">
      <g id="l9-cloud" class="grabbable boil fb" style="cursor:grab">
        <ellipse cx="0" cy="0" rx="90" ry="58" fill="#000" fill-opacity="0" pointer-events="all"/>
        <g id="l9-cloud-art">${cloudSVG('angry')}</g>
      </g>
    </g>

    <!-- sideways wind gusts (shown when rotating sideways) -->
    <g id="l9-wind" pointer-events="none" opacity="0">
      <path d="M44,174 H172 M24,220 H148 M70,264 H192" stroke="#fff" stroke-width="5" ${W}/>
    </g>

    <!-- FX & speech bubble layers -->
    <g id="l9-fx" pointer-events="none"></g>
    <g id="l9-talk" pointer-events="none"></g>
  </g>
</svg>`;
  }

  Object.assign(ART.stickers, {
    l9slide: (uid = 'a') => ART.stickerFrame('#7FD3F7',
      `<g transform="translate(26,-18) scale(.58)">${cloudSVG('happy')}</g>` +
      `<path d="M-46,2 H8 M-2,-8 L10,2 L-2,12" fill="none" stroke="#fff" stroke-width="5" ${W}/>` +
      ART.noodle({ x: -12, y: 26, scale: .56, eyes: 'happy', mouth: 'grin', armType: 'up' }), 'l9sl3' + uid),
    l9vac: (uid = 'a') => ART.stickerFrame('#FF8FB1',
      `<g transform="translate(18,-22) rotate(18) scale(.46)">${cloudSVG('panic')}</g>` +
      `<g transform="translate(-14,18) scale(.75)">${vacuumBodySVG()}</g>` +
      `<path d="M-6,-2 L6,-12 M4,6 L14,-4" stroke="#fff" stroke-width="3.4" ${W}/>`, 'l9vc3' + uid),
    l9shove: (uid = 'a') => ART.stickerFrame('#FFD66B',
      `<g transform="translate(18,-18) rotate(20) scale(.56)">${cloudSVG('angry')}</g>` +
      `<path d="M-50,-2 H-16 M-54,18 H-10 M-44,36 H-18" stroke="#fff" stroke-width="5" ${W}/>` +
      ART.noodle({ x: -18, y: 28, scale: .52, eyes: 'wide', mouth: 'grin', armType: 'up' }), 'l9sh3' + uid),
  });

  const L = {
    id: 9,
    promptHTML: '<span class="pw" id="pw-rain">Stop the rain</span>!',
    endings: [
      { id: 'slide', name: 'Sideways Exit', line: 'Even indoor weather obeys sideways gravity.', rarity: 44, icon: 'l9slide', stamp: 'DRY!' },
      { id: 'vacuum', name: 'Storm Vacuumed', line: '2000 watts of pure indoor weather control.', rarity: 28, icon: 'l9vac', stamp: 'SUCKED UP!' },
      { id: 'shove', name: 'Two-Hand Eviction', line: 'One finger annoyed it. Two fingers evicted it.', rarity: 15, icon: 'l9shove', stamp: 'EVICTED!' },
    ],
    hints(found) {
      if (!found.includes('slide')) return [
        { text: 'It is sunny outside, yet this grumpy cloud refuses to leave the living room.' },
        I.hasMotion
          ? { text: 'Clouds obey gravity too! Turn your whole phone SIDEWAYS to slide it out of the room.', demo: 'landscape' }
          : { text: 'Turn the room sideways! Grab the framed HOME sign on the right wall and swing it 90° sideways.', demo: 'frame' },
      ];
      if (!found.includes('vacuum')) return [
        { text: 'There is a 2000-watt household appliance sitting right next to Noodle.' },
        { text: 'Drag the Vacuum Cleaner nozzle straight up onto the rain cloud!', demo: 'vacuum' },
      ];
      if (!found.includes('shove')) return [
        { text: 'One finger only made the cloud rain harder.' },
        { text: 'Put TWO fingers on the cloud and push them together in one direction! (Desktop: scroll wheel on the cloud.)', demo: 'push' },
      ];
      return [{ text: 'All three endings found! Living room officially dry.' }];
    },
    demo(kind) {
      if (kind === 'landscape') return { landscape: true };
      if (kind === 'frame') return [{ x: 314, y: 120 }, { x: 250, y: 80 }];
      if (kind === 'vacuum') return [{ x: NOZZLE0.x, y: NOZZLE0.y }, { x: 256, y: 274 }, { x: CLOUD0.x, y: CLOUD0.y }];
      if (kind === 'push') return [{ x: CLOUD0.x - 34, y: CLOUD0.y }, { x: CLOUD0.x + 86, y: CLOUD0.y }];
      return null;
    },
    build,
  };

  function build(ctx) {
    ctx.root.innerHTML = sceneSVG();
    const svg = ctx.root.querySelector('svg');
    const q = (s) => svg.querySelector(s);

    const world = q('#l9-world');
    const ndAnim = q('#l9-nd-anim'), ndFace = q('#l9-nd-face'), ndArms = q('#l9-nd-arms'), ndDrops = q('#l9-nd-drops'), umbrellaWrap = q('#l9-umbrella-wrap');
    const cloudWrap = q('#l9-cloud-wrap'), cloudEl = q('#l9-cloud'), cloudArt = q('#l9-cloud-art');
    const rainLayer = q('#l9-rain'), windLayer = q('#l9-wind'), puddle = q('#l9-puddle');
    const frameEl = q('#l9-frame'), bubble = q('#l9-bubble');
    const vacIn = q('#l9-vac-in'), vacBag = q('#l9-vac-bag'), vacBtn = q('#l9-vac-btn');
    const hoseInk = q('#l9-hose-ink'), hoseCore = q('#l9-hose-core');
    const nozzleEl = q('#l9-nozzle'), nozzleRot = q('#l9-nozzle-rot'), nozzleIn = q('#l9-nozzle-in');
    const fx = q('#l9-fx'), talkLayer = q('#l9-talk');

    const st = {
      done: false,
      cloudPos: { ...CLOUD0 },
      heldCloud: false,
      rainRate: 1,
      angry: 0,
      nozzle: { ...NOZZLE0 },
      holdingNozzle: false,
      frameAng: 0,
      holdingFrame: false,
      lastIdle: performance.now(),
    };

    const alive = () => ctx.alive;
    const setFace = (o) => { ndFace.innerHTML = ART.noodleFace(o); };
    const setArms = (t) => { ndArms.innerHTML = ART.noodleArms(t, YELLOW); };
    const talk = (text, ms = 1900) => ctx.talk(talkLayer, ND0.x, ND0.y - 72, text, ms);

    function pop(x, y, text, color = YELLOW, size = 18) {
      const el = U.svgEl('text', {
        x, y, 'text-anchor': 'middle', 'font-family': 'Lilita One, sans-serif', 'font-size': size,
        fill: color, stroke: INK, 'stroke-width': 3.6, 'paint-order': 'stroke',
      }, fx);
      el.textContent = text;
      U.tween(720, (t) => {
        el.setAttribute('y', (y - t * 42).toFixed(1));
        el.setAttribute('opacity', (1 - t * t).toFixed(2));
      }, U.ease.outCubic).then(() => el.remove());
    }

    /* ---------- vacuum hose renderer ---------- */
    function renderHose() {
      const ax = VAC0.x - 16, ay = VAC0.y - 10;
      const nx = st.nozzle.x, ny = st.nozzle.y + 14;
      const mx = (ax + nx) / 2 + 16;
      const my = Math.max(ay, ny) + 22;
      const d = `M${ax},${ay} Q${mx.toFixed(1)},${my.toFixed(1)} ${nx.toFixed(1)},${ny.toFixed(1)}`;
      hoseInk.setAttribute('d', d);
      hoseCore.setAttribute('d', d);
      nozzleEl.setAttribute('transform', `translate(${st.nozzle.x.toFixed(1)},${st.nozzle.y.toFixed(1)})`);
      const ang = st.holdingNozzle ? U.clamp((st.nozzle.x - CLOUD0.x) * -0.22, -38, 38) : -14;
      nozzleRot.setAttribute('transform', `rotate(${ang.toFixed(1)})`);
    }

    /* ---------- indoor rain drops ---------- */
    const drops = [];
    for (let i = 0; i < 16; i++) {
      const el = U.svgEl('ellipse', { rx: 2.5, ry: 6.5, fill: '#9CE0FF', stroke: '#3FA4D6', 'stroke-width': 1.2 }, rainLayer);
      drops.push({ el, x: 0, y: 0, v: 0 });
    }
    function seed(d, randomY = false) {
      d.x = st.cloudPos.x + U.rand(-52, 52);
      d.y = st.cloudPos.y + (randomY ? U.rand(18, 250) : U.rand(18, 34));
      d.v = U.rand(230, 345) * st.rainRate;
    }
    drops.forEach((d) => seed(d, true));

    function celebrateDry(talkLine) {
      ndDrops.setAttribute('opacity', '0');
      umbrellaWrap.setAttribute('opacity', '0');
      setFace({ eyes: 'happy', mouth: 'grin' });
      setArms('up');
      U.replay(ndAnim, 'hop');
      talk(talkLine, 2200);
    }

    /* ---------- ENDING 1 (MAIN): SIDEWAYS EXIT (Landscape rotate OR rotate wall frame!) ---------- */
    async function winSlide(dir = 1) {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      A.play('whoosh'); U.haptic([20, 40, 20]);
      ctx.say('Gravity just went sideways!');
      const from = { ...st.cloudPos };
      windLayer.setAttribute('opacity', '.9');
      await U.tween(720, (t) => {
        if (!alive()) return;
        cloudWrap.setAttribute('transform', `translate(${U.lerp(from.x, from.x + dir * 480, t).toFixed(1)},${(from.y + Math.sin(t * Math.PI) * -18).toFixed(1)}) rotate(${(dir * t * 18).toFixed(1)})`);
        rainLayer.setAttribute('transform', `translate(${U.lerp(0, dir * 480, t).toFixed(1)},0)`);
        puddle.setAttribute('opacity', (1 - t * 0.7).toFixed(2));
      }, U.ease.inCubic);
      if (!alive()) return;
      cloudWrap.setAttribute('opacity', '0'); rainLayer.setAttribute('opacity', '0'); windLayer.setAttribute('opacity', '0');
      const bow = U.svgEl('g', { opacity: 0 }, fx);
      [PINK, YELLOW, MINT, SKY].forEach((c, i) => {
        U.svgEl('path', { d: `M${78 + i * 9},326 A${117 - i * 9},${117 - i * 9} 0 0 1 ${312 - i * 9},326`, fill: 'none', stroke: c, 'stroke-width': 7.5, 'stroke-linecap': 'round' }, bow);
      });
      A.play('chirp');
      await U.tween(480, (t) => bow.setAttribute('opacity', t.toFixed(2)));
      if (!alive()) return;
      celebrateDry('FINALLY DRY!!');
      ctx.say('Even indoor weather obeys sideways gravity.');
      await U.wait(820);
      if (alive()) ctx.win('slide');
    }

    /* ---------- ENDING 2 (SECRET #1): STORM VACUUMED! ---------- */
    async function winVacuum() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      st.holdingNozzle = false;
      vacBtn.setAttribute('fill', MINT);
      cloudArt.innerHTML = cloudSVG('panic');
      A.play('rumble'); A.play('whoosh'); U.haptic([24, 30, 60]);
      pop(st.cloudPos.x, st.cloudPos.y - 64, 'WAIT—NO!!', '#fff', 19);

      // Park nozzle right beside the panicked cloud
      const targetNoz = { x: st.cloudPos.x + 54, y: st.cloudPos.y + 18 };
      const fromNoz = { ...st.nozzle };
      await U.tween(180, (t) => {
        if (!alive()) return;
        st.nozzle = { x: U.lerp(fromNoz.x, targetNoz.x, t), y: U.lerp(fromNoz.y, targetNoz.y, t) };
        renderHose();
        nozzleRot.setAttribute('transform', 'rotate(-52)');
      });
      if (!alive()) return;

      // Suction wind streaks + taffy-stretch cloud straight into the nozzle!
      const fromC = { ...st.cloudPos };
      const suckX = targetNoz.x - 10, suckY = targetNoz.y - 14;
      await U.tween(860, (t) => {
        if (!alive()) return;
        const cx = U.lerp(fromC.x, suckX, t);
        const cy = U.lerp(fromC.y, suckY, t);
        const sx = Math.max(0.05, 1 - t * 0.94);
        const sy = Math.max(0.05, (1 - t * 0.94) * (1 - Math.sin(t * Math.PI) * 0.35));
        cloudWrap.setAttribute('transform', `translate(${cx.toFixed(1)},${cy.toFixed(1)}) rotate(${(t * 28).toFixed(1)}) scale(${sx.toFixed(3)},${sy.toFixed(3)})`);
        rainLayer.setAttribute('opacity', (1 - t).toFixed(2));
        puddle.setAttribute('opacity', (1 - t * 0.65).toFixed(2));
      }, U.ease.inCubic);
      if (!alive()) return;

      cloudWrap.setAttribute('opacity', '0');
      rainLayer.setAttribute('opacity', '0');
      A.play('pop');
      vacBag.setAttribute('fill', '#8EA0B8');
      U.replay(vacIn, 'hop');
      pop(VAC0.x, VAC0.y - 44, 'SCHLURP!!', MINT, 19);
      celebrateDry('HOUSEKEEPING WINS!!');
      ctx.say('2000 watts of pure indoor weather control.');
      await U.wait(860);
      if (alive()) ctx.win('vacuum');
    }

    /* ---------- ENDING 3 (SECRET #2): TWO-HAND EVICTION! ---------- */
    async function winShove(dir = 1) {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      A.play('whoosh'); U.haptic([25, 50, 25]);
      cloudArt.innerHTML = cloudSVG('panic');
      await U.tween(150, (t) => {
        if (!alive()) return;
        cloudArt.setAttribute('transform', `scale(${(1 - t * .22).toFixed(2)},${(1 + t * .14).toFixed(2)})`);
      });
      if (!alive()) return;
      cloudArt.setAttribute('transform', '');
      A.play('thunder'); U.replay(world, 'quake');
      const from = { ...st.cloudPos };
      await U.tween(600, (t) => {
        if (!alive()) return;
        cloudWrap.setAttribute('transform', `translate(${U.lerp(from.x, from.x + dir * 520, t).toFixed(1)},${(from.y - Math.sin(t * Math.PI) * 90).toFixed(1)}) rotate(${(dir * t * 65).toFixed(1)})`);
        rainLayer.setAttribute('opacity', (1 - t).toFixed(2));
      }, U.ease.outCubic);
      if (!alive()) return;
      cloudWrap.setAttribute('opacity', '0'); rainLayer.setAttribute('opacity', '0');
      celebrateDry('OUT OF MY HOUSE!!');
      ctx.say('One finger annoyed it. Two fingers evicted it.');
      await U.wait(820);
      if (alive()) ctx.win('shove');
    }

    /* ---------- DRAG: Grumpy Cloud with 1 finger = DECOY (rains harder & snaps back!) ---------- */
    I.drag(cloudEl, svg, {
      onStart() {
        if (ctx.locked || st.done) return;
        st.heldCloud = true;
        A.play('tap'); ctx.attempt();
      },
      onMove(p, d) {
        if (ctx.locked || st.done || !st.heldCloud || fingers.size >= 2) return;
        // Rubbery resistance — refuses to leave with just 1 finger!
        const x = CLOUD0.x + U.clamp(d.dx * 0.36, -54, 54);
        const y = CLOUD0.y + U.clamp(d.dy * 0.28, -28, 34);
        st.cloudPos = { x, y };
        cloudWrap.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
        if (Math.hypot(d.dx, d.dy) > 26 && st.angry < 3) {
          st.angry++;
          st.rainRate = Math.min(2.2, st.rainRate + 0.35);
          A.play('thunder'); U.haptic(16);
          pop(x, y - 62, U.pick(['GRRR!', 'TOO HEAVY!', 'RAIN HARDER!']), '#DCE6F2', 18);
          talk('One finger just made it angrier!');
          ctx.say('Too stubborn for one finger — now it is raining harder.');
        }
      },
      onTap() {
        st.heldCloud = false;
        if (ctx.locked || st.done) return;
        st.rainRate = Math.min(2.4, st.rainRate + 0.3);
        A.play('drip'); U.replay(cloudEl, 'wiggle');
        pop(CLOUD0.x, CLOUD0.y - 62, 'POUR!', SKY, 17);
        ctx.say('Great. Tapping it just boosted the indoor downpour.');
        ctx.attempt();
      },
      async onEnd() {
        st.heldCloud = false;
        if (ctx.locked || st.done) return;
        const sx = st.cloudPos.x, sy = st.cloudPos.y;
        await U.tween(300, (t) => {
          if (!alive() || st.done || st.heldCloud) return;
          cloudWrap.setAttribute('transform', `translate(${U.lerp(sx, CLOUD0.x, t).toFixed(1)},${U.lerp(sy, CLOUD0.y, t).toFixed(1)})`);
        }, U.ease.outBack);
        st.cloudPos = { ...CLOUD0 };
      },
    });

    /* ---------- TWO-FINGER PUSH on Cloud (Secret #2) + desktop wheel fallback ---------- */
    const fingers = new Map();
    let gesture = null;
    const onPtrDown = (e) => {
      if (ctx.locked || st.done || !e.target.closest('#l9-cloud')) return;
      fingers.set(e.pointerId, U.svgPoint(svg, e.clientX, e.clientY));
      if (fingers.size === 2) {
        st.heldCloud = false;
        const [a, b] = [...fingers.values()];
        gesture = { cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 };
      }
    };
    const onPtrMove = (e) => {
      if (!gesture || ctx.locked || st.done || !fingers.has(e.pointerId)) return;
      fingers.set(e.pointerId, U.svgPoint(svg, e.clientX, e.clientY));
      if (fingers.size !== 2) return;
      const [a, b] = [...fingers.values()];
      const cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2;
      if (Math.hypot(cx - gesture.cx, cy - gesture.cy) > 58) {
        const dir = cx >= gesture.cx ? 1 : -1;
        gesture = null; fingers.clear();
        winShove(dir);
      }
    };
    const onPtrUp = (e) => { fingers.delete(e.pointerId); if (fingers.size < 2) gesture = null; };
    const onWheel = (e) => {
      if (ctx.locked || st.done || !e.target.closest('#l9-cloud')) return;
      e.preventDefault();
      winShove(e.deltaX !== 0 ? Math.sign(e.deltaX) : 1);
    };
    svg.addEventListener('pointerdown', onPtrDown);
    svg.addEventListener('pointermove', onPtrMove);
    svg.addEventListener('pointerup', onPtrUp);
    svg.addEventListener('pointercancel', onPtrUp);
    svg.addEventListener('wheel', onWheel, { passive: false });
    ctx.onCleanup(() => {
      svg.removeEventListener('pointerdown', onPtrDown);
      svg.removeEventListener('pointermove', onPtrMove);
      svg.removeEventListener('pointerup', onPtrUp);
      svg.removeEventListener('pointercancel', onPtrUp);
      svg.removeEventListener('wheel', onWheel);
    });

    /* ---------- DRAG: Vacuum Cleaner Nozzle (Secret #1: Storm Vacuum!) ---------- */
    I.drag(nozzleEl, svg, {
      onStart() {
        if (ctx.locked || st.done) return;
        st.holdingNozzle = true;
        vacBtn.setAttribute('fill', MINT);
        A.play('tap'); ctx.attempt();
      },
      onMove(p) {
        if (!st.holdingNozzle || ctx.locked || st.done) return;
        st.nozzle = { x: U.clamp(p.x, 32, 360), y: U.clamp(p.y, 70, 520) };
        renderHose();
        if (Math.hypot(st.nozzle.x - st.cloudPos.x, st.nozzle.y - st.cloudPos.y) < 68) {
          winVacuum();
        }
      },
      onTap() {
        st.holdingNozzle = false;
        if (ctx.locked || st.done) return;
        vacBtn.setAttribute('fill', YELLOW);
        st.nozzle = { ...NOZZLE0 };
        renderHose();
        A.play('whoosh'); U.replay(nozzleIn, 'wiggle');
        ctx.say('High-power vacuum nozzle. Drag it toward something messy!');
      },
      async onEnd() {
        if (!st.holdingNozzle || st.done) return;
        st.holdingNozzle = false;
        vacBtn.setAttribute('fill', YELLOW);
        const from = { ...st.nozzle };
        await U.tween(280, (t) => {
          if (!alive() || st.done || st.holdingNozzle) return;
          st.nozzle = { x: U.lerp(from.x, NOZZLE0.x, t), y: U.lerp(from.y, NOZZLE0.y, t) };
          renderHose();
        }, U.ease.outBack);
      },
    });

    /* ---------- DRAG: Crooked "HOME" Frame (Diegetic sideways-gravity desktop fallback!) ---------- */
    I.drag(frameEl, svg, {
      onStart() {
        if (ctx.locked || st.done) return;
        st.holdingFrame = true;
        A.play('creak'); ctx.attempt();
      },
      onMove(p) {
        if (!st.holdingFrame || ctx.locked || st.done) return;
        const ang = (Math.atan2(p.y - FRAME_NAIL.y, p.x - FRAME_NAIL.x) * 180) / Math.PI - 90;
        const norm = ((ang + 540) % 360) - 180;
        st.frameAng = U.clamp(norm, -100, 100);
        frameEl.setAttribute('transform', `rotate(${st.frameAng.toFixed(1)})`);
        bubble.setAttribute('cx', U.clamp(-st.frameAng * 0.25, -20, 20).toFixed(1));
        if (Math.abs(st.frameAng) > 68) {
          st.holdingFrame = false;
          winSlide(st.frameAng > 0 ? -1 : 1);
        }
      },
      onTap() {
        st.holdingFrame = false;
        if (ctx.locked || st.done) return;
        A.play('creak');
        U.tween(320, (t) => {
          if (!alive() || st.holdingFrame || st.done) return;
          frameEl.setAttribute('transform', `rotate(${(Math.sin(t * Math.PI * 2) * 14).toFixed(1)})`);
        });
        ctx.say('A wall level! Swings sideways if you turn it — or turn your phone.');
      },
      async onEnd() {
        if (!st.holdingFrame || st.done) return;
        st.holdingFrame = false;
        const from = st.frameAng;
        await U.tween(300, (t) => {
          if (!alive() || st.holdingFrame || st.done) return;
          st.frameAng = U.lerp(from, 0, t);
          frameEl.setAttribute('transform', `rotate(${st.frameAng.toFixed(1)})`);
          bubble.setAttribute('cx', U.clamp(-st.frameAng * 0.25, -20, 20).toFixed(1));
        }, U.ease.outBack);
      },
    });

    ctx.onCleanup(I.onLandscape((dir) => { if (!ctx.locked && !st.done) winSlide(dir || 1); }));
    ctx.onCleanup(() => I.clearLandscape());

    /* ---------- ANIMATION LOOP ---------- */
    let last = performance.now();
    (function loop(now) {
      if (!alive()) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (!st.done) {
        drops.forEach((d) => {
          d.y += d.v * dt;
          if (d.y > 498) seed(d);
          d.el.setAttribute('cx', d.x.toFixed(1));
          d.el.setAttribute('cy', d.y.toFixed(1));
        });
        if (!st.heldCloud) {
          const bob = Math.sin(now / 620) * 3;
          cloudWrap.setAttribute('transform', `translate(${st.cloudPos.x.toFixed(1)},${(st.cloudPos.y + bob).toFixed(1)})`);
        }
        if (!st.holdingFrame) {
          const tilt = U.clamp(I.tilt, -65, 65);
          frameEl.setAttribute('transform', `rotate(${(tilt * -0.55).toFixed(1)})`);
          bubble.setAttribute('cx', U.clamp(tilt * 0.35, -20, 20).toFixed(1));
        }
        windLayer.setAttribute('opacity', (I.landscapeProgress * 0.85).toFixed(2));

        if (now - st.lastIdle > 11000) {
          st.lastIdle = now;
          ctx.say(U.pick([
            'Sunny outside. Torrential inside.',
            'My living room rug is legally a swamp now.',
            'Who invited a thundercloud indoors?',
          ]));
        }
      }
      requestAnimationFrame(loop);
    })(last);
    svg.addEventListener('pointerdown', () => { st.lastIdle = performance.now(); });

    /* ---------- TAP REACTIONS (all inner .fb, zero jump-to-(0,0)!) ---------- */
    const taps = {
      noodle() {
        ctx.attempt(); A.play('splash'); U.replay(ndAnim, 'hop');
        pop(ND0.x, ND0.y - 78, 'SOAKED!', SKY, 19);
        talk(U.pick(['It is SUNNY outside!!', 'Why is it raining IN MY HOUSE?!', 'My socks are squelching!']));
        ctx.say('One cloud. One armchair. Pure disrespect.');
      },
      umbrella(node) {
        ctx.attempt(); A.play('drip'); U.replay(node, 'wiggle');
        ctx.say('Inside-out umbrella. Basically a portable soup bowl now.');
      },
      window() {
        ctx.attempt(); A.play('chirp'); U.replay(q('#l9-sun'), 'wiggle');
        ctx.say('Blue skies and sunshine outside. The storm chose the living room.');
      },
      vacuum(node) {
        ctx.attempt(); A.play('whoosh'); U.replay(node, 'wiggle');
        ctx.say('2000-watt living room vacuum. Grab the nozzle on top!');
      },
      fern(node) {
        ctx.attempt(); A.play('chirp'); U.replay(node, 'hop');
        ctx.say('The houseplant is thriving. Literally nobody else is.');
      },
      bucket(node) {
        ctx.attempt(); A.play('splash'); U.replay(node, 'wiggle');
        pop(102, 456, 'FULL!', SKY, 15);
        ctx.say('Bucket is already overflowing.');
      },
      duck(node) {
        ctx.attempt(); A.play('squeak'); U.replay(node, 'hop');
        pop(242, 502, 'QUACK!', YELLOW, 15);
        ctx.say('The rubber duck rates this living room five stars.');
      },
      puddle() { ctx.attempt(); A.play('splash'); ctx.say('Congratulations, your hardwood floor is now a pond.'); },
      chair() { ctx.attempt(); A.play('boing'); ctx.say('Soggy cushion. Squish, squish.'); },
      tableL() { ctx.attempt(); A.play('thud'); ctx.say('Dry oak table… mostly.'); },
      rug() { ctx.attempt(); A.play('splash'); ctx.say('Wet rug. Nature’s cold socks.'); },
      wall() { ctx.attempt(); A.play('tap'); ctx.say('Cozy indoor wallpaper. Not rated for thunderstorms.'); },
      floor() { ctx.attempt(); A.play('thud'); ctx.say('Slippery when rained on indoors.'); },
    };
    I.taps(svg, (name, node) => { if (ctx.locked || st.done) return; if (taps[name]) taps[name](node); });

    const onPromptClick = (e) => {
      if (ctx.locked || st.done) return;
      if (e.target.id === 'pw-rain') {
        U.replay(e.target, 'wiggle'); A.play('drip');
        ctx.say('The indoor cloud heard that as encouragement.');
      } else {
        A.play('tap');
        ctx.say('Home sweet soggy home.');
      }
    };
    ctx.promptEl.addEventListener('click', onPromptClick);
    ctx.onCleanup(() => ctx.promptEl.removeEventListener('click', onPromptClick));

    renderHose();
  }

  BF.levels = BF.levels || {};
  BF.levels[9] = L;
})(window.BF);
