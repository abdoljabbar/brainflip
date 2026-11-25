/* Brainflip — Level 8 (reserved per GDD v0.1): "Shhh! Baby's asleep!"
   Main ending : mute the game using the HUD sound button — or press hardware Volume Down  (verb: meta-UI audio)
   Secret #1   : 2-step combo — open the bedroom window, then toss the blasting boombox out!  (verb: multi-step drag)
   Secret #2   : gently rock the phone left-right (or smoothly drag the cradle) to lull Baby Noodle into deep sleep  (verb: gentle sway)
   Decoys: jammed boombox buttons ("goes to 11"), cuckoo clock + stretchy shush arm, squeaky rubber duck, baby mobile. */
(function (BF) {
  'use strict';
  const U = BF.U, A = BF.audio, I = BF.input, ART = BF.art;
  const INK = '#1B1B2F', YELLOW = '#FFC93C', PINK = '#FF5D8F', MINT = '#3DDC97', SKY = '#5BC0EB';
  const W = 'stroke-linecap="round" stroke-linejoin="round"';
  const S = `stroke="${INK}" stroke-width="3.4" ${W}`;

  const ND = { x: 226, y: 404 };
  const CRADLE = { x: 108, y: 468 };  // rocker pivot on floor
  const BOX0 = { x: 324, y: 368 };    // boombox resting on side table
  const WIN = { x: 91, y: 112 };      // window center

  function boomboxSVG() {
    return `
      <path d="M-24,-24 V-34 Q-24,-40 -18,-40 H18 Q24,-40 24,-34 V-24" fill="none" stroke="${INK}" stroke-width="6" ${W}/>
      <path d="M-24,-24 V-34 Q-24,-40 -18,-40 H18 Q24,-40 24,-34 V-24" fill="none" stroke="#9AA3B2" stroke-width="2.6" ${W}/>
      <rect x="-44" y="-24" width="88" height="48" rx="9" fill="${PINK}" ${S}/>
      <rect x="-14" y="-12" width="28" height="18" rx="3" fill="#2B2D6E" stroke="${INK}" stroke-width="2.2"/>
      <circle cx="-6" cy="-3" r="3.5" fill="#fff"/><circle cx="6" cy="-3" r="3.5" fill="#fff"/>
      <rect x="-10" y="10" width="20" height="7" rx="2" fill="${YELLOW}" stroke="${INK}" stroke-width="1.8"/>
      <g id="l8-spk-l" transform="translate(-28,2)"><g class="fb">
        <circle r="13.5" fill="#2B2D6E" stroke="${INK}" stroke-width="2.6"/>
        <circle r="8" fill="#5BC0EB" stroke="${INK}" stroke-width="2"/>
        <circle r="3.2" fill="${INK}"/>
      </g></g>
      <g id="l8-spk-r" transform="translate(28,2)"><g class="fb">
        <circle r="13.5" fill="#2B2D6E" stroke="${INK}" stroke-width="2.6"/>
        <circle r="8" fill="#5BC0EB" stroke="${INK}" stroke-width="2"/>
        <circle r="3.2" fill="${INK}"/>
      </g></g>
      <circle cx="12" cy="-18" r="3.5" fill="${YELLOW}" stroke="${INK}" stroke-width="1.6"/>
      <text x="-2" y="-15" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="8.5" fill="#fff">VOL 11</text>`;
  }

  function babyFace(mode = 'sleep') {
    const cheeks = `<ellipse cx="-14" cy="4" rx="4.5" ry="2.6" fill="#FF8FB1" opacity=".85"/><ellipse cx="14" cy="4" rx="4.5" ry="2.6" fill="#FF8FB1" opacity=".85"/>`;
    const eyes = mode === 'wide'
      ? `<circle cx="-8" cy="-4" r="5.5" fill="#fff" stroke="${INK}" stroke-width="2.4"/><circle cx="-8" cy="-4" r="2" fill="${INK}"/><circle cx="8" cy="-4" r="5.5" fill="#fff" stroke="${INK}" stroke-width="2.4"/><circle cx="8" cy="-4" r="2" fill="${INK}"/>`
      : mode === 'happy'
        ? `<path d="M-12,-2 Q-8,-8 -4,-2 M4,-2 Q8,-8 12,-2" fill="none" stroke="${INK}" stroke-width="2.6" ${W}/>`
        : `<path d="M-12,-4 Q-8,1 -4,-4 M4,-4 Q8,1 12,-4" fill="none" stroke="${INK}" stroke-width="2.6" ${W}/>`;
    const paci = `<circle cx="0" cy="8" r="5.5" fill="${PINK}" stroke="${INK}" stroke-width="2.2"/><circle cx="0" cy="11" r="3.6" fill="none" stroke="${YELLOW}" stroke-width="2.2"/>`;
    return cheeks + eyes + paci;
  }

  function shushArms() {
    // left arm relaxed, right noodle arm curled up with finger on lips ("SHHH!")
    return `<path d="M-33,6 Q-46,20 -46,34" fill="none" stroke="${INK}" stroke-width="9" ${W}/>` +
      `<path d="M-33,6 Q-46,20 -46,34" fill="none" stroke="${YELLOW}" stroke-width="4" ${W}/>` +
      `<circle cx="-46" cy="38" r="6.5" fill="${YELLOW}" stroke="${INK}" stroke-width="3"/>` +
      `<path d="M33,4 Q44,-6 14,-6" fill="none" stroke="${INK}" stroke-width="9" ${W}/>` +
      `<path d="M33,4 Q44,-6 14,-6" fill="none" stroke="${YELLOW}" stroke-width="4" ${W}/>` +
      `<path d="M6,-12 V2" stroke="${INK}" stroke-width="8" ${W}/><path d="M6,-12 V2" stroke="${YELLOW}" stroke-width="3.6" ${W}/>`;
  }

  function sceneSVG() {
    return `
<svg viewBox="0 0 390 630" xmlns="http://www.w3.org/2000/svg" aria-label="Baby Noodle sleeping in a cradle while a loud boombox blasts music">
  <defs>
    <pattern id="l8-wallp" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="16" cy="16" r="2.6" fill="#D9CCF5"/></pattern>
    <pattern id="l8-bdot" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="2.2" fill="#fff" opacity=".8"/><circle cx="12" cy="12" r="2.2" fill="#fff" opacity=".8"/></pattern>
    <clipPath id="l8-winclip"><rect x="34" y="46" width="114" height="130" rx="3"/></clipPath>
    <clipPath id="l8-cuckclip"><rect x="-18" y="-22" width="36" height="28"/></clipPath>
  </defs>

  <g id="l8-room">
    <!-- nursery wall + floor -->
    <rect data-tap="wall" x="-30" y="-200" width="450" height="690" fill="#EDE7FB"/>
    <rect x="-30" y="-200" width="450" height="690" fill="url(#l8-wallp)" pointer-events="none"/>
    <rect data-tap="floor" x="-30" y="490" width="450" height="520" fill="#E8A86C"/>
    <path d="M-30,536 H420 M-30,582 H420 M-30,628 H420 M-30,674 H420 M70,490 V536 M210,536 V582 M120,582 V628 M300,490 V536" stroke="#C77D4A" stroke-width="2.6" pointer-events="none"/>
    <rect x="-30" y="484" width="450" height="12" fill="#fff" ${S}/>

    <!-- nursery rug -->
    <g data-tap="rug">
      <ellipse cx="195" cy="548" rx="142" ry="26" fill="#FF8FB1" ${S}/>
      <ellipse cx="195" cy="548" rx="120" ry="17" fill="none" stroke="#FFF4E0" stroke-width="3.2" stroke-dasharray="8 8"/>
    </g>

    <!-- bedroom window (starts CLOSED; tap or slide up to open for Window Toss!) -->
    <g id="l8-window">
      <g clip-path="url(#l8-winclip)">
        <rect x="34" y="46" width="114" height="130" fill="#20225A"/>
        <circle cx="52" cy="64" r="2.2" fill="#FFF4C2"/><circle cx="88" cy="78" r="1.8" fill="#FFF4C2"/>
        <circle cx="132" cy="66" r="2" fill="#FFF4C2"/><circle cx="70" cy="108" r="1.8" fill="#FFF4C2"/>
        <path transform="translate(118,84)" d="M4,-11 A12,12 0 1,0 4,11 A9.2,9.2 0 1,1 4,-11 Z" fill="#FFF4C2" stroke="${INK}" stroke-width="1.8" ${W}/>
        <!-- distant skyline + tiny parked red car -->
        <path d="M32,148 H56 V128 H76 V152 H112 V136 H134 V148 H152 V178 H32 Z" fill="#2E3272" stroke="${INK}" stroke-width="2"/>
        <rect x="42" y="138" width="5" height="6" fill="${YELLOW}" opacity=".7"/><rect x="118" y="144" width="5" height="6" fill="${YELLOW}" opacity=".7"/>
        <g id="l8-car" transform="translate(88,166)">
          <rect x="-14" y="-6" width="28" height="9" rx="3" fill="${PINK}" stroke="${INK}" stroke-width="1.8"/>
          <path d="M-8,-6 L-5,-12 H6 L9,-6 Z" fill="${PINK}" stroke="${INK}" stroke-width="1.6"/>
          <circle cx="-8" cy="3" r="3" fill="${INK}"/><circle cx="8" cy="3" r="3" fill="${INK}"/>
        </g>
        <!-- tossed boombox arc layer inside window -->
        <g id="l8-win-fx" pointer-events="none"></g>
        <!-- upper fixed glass + lower sliding sash -->
        <rect x="34" y="46" width="114" height="65" fill="#BDE7FF" fill-opacity=".14" stroke="${INK}" stroke-width="2.4"/>
        <path d="M91,46 V111" stroke="#fff" stroke-width="5"/><path d="M91,46 V111" stroke="${INK}" stroke-width="2.2"/>
        <g id="l8-sash">
          <rect x="34" y="111" width="114" height="65" fill="#BDE7FF" fill-opacity=".22" stroke="#fff" stroke-width="5"/>
          <rect x="34" y="111" width="114" height="65" fill="none" stroke="${INK}" stroke-width="2.8"/>
          <path d="M91,111 V176" stroke="#fff" stroke-width="5"/><path d="M91,111 V176" stroke="${INK}" stroke-width="2.2"/>
          <path d="M46,158 L64,126 M56,162 L70,138" stroke="#fff" stroke-width="3" opacity=".32" stroke-linecap="round"/>
          <!-- sash handle -->
          <rect x="78" y="164" width="26" height="6" rx="3" fill="${YELLOW}" stroke="${INK}" stroke-width="2"/>
        </g>
      </g>
      <path d="M26,38 H156 V184 H26 Z M34,46 V176 H148 V46 Z" fill="#fff" fill-rule="evenodd" ${S}/>
      <rect x="20" y="180" width="142" height="12" rx="5" fill="#fff" ${S}/>
      <!-- invisible generous hit area for opening/closing window -->
      <rect id="l8-win-hit" x="24" y="40" width="134" height="148" fill="#000" fill-opacity="0" pointer-events="all" style="cursor:pointer"/>
    </g>

    <!-- hanging nursery mobile (center top) -->
    <g id="l8-mobile" transform="translate(212,48)"><g data-tap="mobile" class="fb-top">
      <path d="M0,-200 V24 M-32,24 H32 M-32,24 V44 M0,24 V52 M32,24 V42" fill="none" stroke="${INK}" stroke-width="2.6" ${W}/>
      <path d="M-32,42 L-29,48 L-23,49 L-27,53 L-26,59 L-32,56 L-38,59 L-37,53 L-41,49 L-35,48 Z" fill="${YELLOW}" stroke="${INK}" stroke-width="2"/>
      <path transform="translate(0,60)" d="M3,-9 A10,10 0 1,0 3,9 A7.6,7.6 0 1,1 3,-9 Z" fill="${SKY}" stroke="${INK}" stroke-width="2" ${W}/>
      <path d="M32,40 L35,46 L41,47 L37,51 L38,57 L32,54 L26,57 L27,51 L23,47 L29,46 Z" fill="${PINK}" stroke="${INK}" stroke-width="2"/>
    </g></g>

    <!-- cuckoo clock (top-right comedy decoy) -->
    <g id="l8-cuckoo" transform="translate(324,104)"><g data-tap="cuckoo" class="fb">
      <circle cy="8" r="42" fill="#000" fill-opacity="0" pointer-events="all"/>
      <path d="M-12,34 V58 M12,34 V52" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>
      <circle cx="-12" cy="60" r="5" fill="${YELLOW}" stroke="${INK}" stroke-width="2.2"/>
      <circle cx="12" cy="54" r="5" fill="${PINK}" stroke="${INK}" stroke-width="2.2"/>
      <rect x="-30" y="-22" width="60" height="58" rx="5" fill="#C77D4A" ${S}/>
      <path d="M-38,-18 L0,-48 L38,-18 Z" fill="#E89A5E" ${S}/>
      <!-- little cuckoo door -->
      <rect x="-12" y="-22" width="24" height="20" rx="3" fill="#2B2D6E" stroke="${INK}" stroke-width="2.4"/>
      <g clip-path="url(#l8-cuckclip)">
        <g id="l8-bird" transform="translate(0,18)">
          <circle cx="0" cy="-10" r="8" fill="${PINK}" stroke="${INK}" stroke-width="2.2"/>
          <path d="M6,-12 L13,-10 L6,-7 Z" fill="${YELLOW}" stroke="${INK}" stroke-width="1.6"/>
          <circle cx="2" cy="-12" r="1.8" fill="${INK}"/>
        </g>
      </g>
      <circle cx="0" cy="14" r="14" fill="#fff" stroke="${INK}" stroke-width="2.6"/>
      <path d="M0,14 V6 M0,14 L6,17" stroke="${INK}" stroke-width="2.4" ${W}/>
    </g></g>

    <!-- side table for boombox -->
    <g data-tap="table">
      <rect x="284" y="472" width="9" height="16" fill="#C77D4A" ${S}/><rect x="358" y="472" width="9" height="16" fill="#C77D4A" ${S}/>
      <rect x="280" y="402" width="92" height="72" rx="4" fill="#E89A5E" ${S}/>
      <rect x="274" y="392" width="104" height="12" rx="4" fill="#C77D4A" ${S}/>
    </g>

    <!-- Adult Noodle tiptoeing & shushing -->
    <g id="l8-nd" transform="translate(${ND.x},${ND.y})" data-tap="noodle">
      <g id="l8-nd-boil" class="boil fb">
        ${ART.noodleLegs()}${ART.noodleBody()}
        <g id="l8-nd-arms">${shushArms()}</g>
        <g transform="translate(0,-14)"><g id="l8-nd-face">${ART.noodleFace({ eyes: 'wide', mouth: 'o' })}</g></g>
        <path id="l8-sweat" d="M26,-38 Q32,-28 26,-24 Q20,-28 26,-38 Z" fill="#5BC0EB" stroke="${INK}" stroke-width="2"/>
      </g>
    </g>

    <!-- Baby Noodle's wooden rocking cradle (drag gently left-right or tilt phone gently!) -->
    <g id="l8-cradle-pivot" transform="translate(${CRADLE.x},${CRADLE.y})">
      <g id="l8-cradle" class="boil">
        <circle cx="0" cy="-44" r="62" fill="#000" fill-opacity="0" pointer-events="all"/>
        <!-- back rail -->
        <rect x="-54" y="-86" width="108" height="44" rx="14" fill="#D9945C" ${S}/>
        <!-- pillow -->
        <ellipse cx="-24" cy="-64" rx="22" ry="12" fill="#fff" stroke="${INK}" stroke-width="2.6"/>
        <!-- Baby Noodle! -->
        <g id="l8-baby" transform="translate(-14,-66)">
          <path d="M1,-24 C0,-31 -7,-34 -9,-29 C-10,-24 -2,-23 -1,-28 C0,-33 7,-36 12,-32" fill="none" stroke="${INK}" stroke-width="5.5" ${W}/>
          <path d="M1,-24 C0,-31 -7,-34 -9,-29 C-10,-24 -2,-23 -1,-28 C0,-33 7,-36 12,-32" fill="none" stroke="#FFE6A0" stroke-width="2.4" ${W}/>
          <rect x="-22" y="-26" width="44" height="46" rx="22" fill="${YELLOW}" stroke="${INK}" stroke-width="3"/>
          <g id="l8-baby-face" transform="translate(0,-6)">${babyFace('sleep')}</g>
        </g>
        <!-- mint baby blanket -->
        <path d="M-46,-54 Q-14,-64 16,-56 L46,-54 V-24 H-46 Z" fill="${MINT}" ${S}/>
        <path d="M-46,-54 Q-14,-64 16,-56 L46,-54 V-24 H-46 Z" fill="url(#l8-bdot)" pointer-events="none"/>
        <!-- crib front slats -->
        <rect x="-56" y="-56" width="112" height="36" rx="10" fill="none" ${S}/>
        <path d="M-36,-56 V-20 M-12,-56 V-20 M12,-56 V-20 M36,-56 V-20" stroke="#C77D4A" stroke-width="6" stroke-linecap="round"/>
        <path d="M-36,-56 V-20 M-12,-56 V-20 M12,-56 V-20 M36,-56 V-20" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
        <rect x="-60" y="-26" width="120" height="12" rx="5" fill="#E89A5E" ${S}/>
        <!-- curved wooden rockers -->
        <path d="M-66,-4 Q0,14 66,-4" fill="none" stroke="${INK}" stroke-width="11" ${W}/>
        <path d="M-66,-4 Q0,14 66,-4" fill="none" stroke="#C77D4A" stroke-width="5.5" ${W}/>
        <path d="M-42,-14 V-3 M42,-14 V-3" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
      </g>
    </g>
    <g id="l8-lullaby" pointer-events="none"></g>

    <!-- squeaky rubber duck on floor (decoy!) -->
    <g transform="translate(216,506)"><g data-tap="duck" class="fb">
      <circle r="24" fill="#000" fill-opacity="0" pointer-events="all"/>
      <ellipse cx="0" cy="4" rx="15" ry="10" fill="${YELLOW}" stroke="${INK}" stroke-width="2.8"/>
      <circle cx="-8" cy="-7" r="8.5" fill="${YELLOW}" stroke="${INK}" stroke-width="2.8"/>
      <path d="M-16,-7 L-23,-5 L-16,-2 Z" fill="#FF6B35" stroke="${INK}" stroke-width="2" ${W}/>
      <circle cx="-11" cy="-9" r="1.8" fill="${INK}"/>
    </g></g>

    <!-- blasting retro boombox (draggable!) -->
    <g id="l8-box" transform="translate(${BOX0.x},${BOX0.y})"><g id="l8-box-in" class="fb">
      <circle r="48" fill="#000" fill-opacity="0" pointer-events="all"/>
      ${boomboxSVG()}
    </g></g>

    <g id="l8-notes" pointer-events="none"></g>
    <g id="l8-fx" pointer-events="none"></g>
    <g id="l8-talk" pointer-events="none"></g>
  </g>
</svg>`;
  }

  const L = {
    id: 8,
    promptHTML: '<span class="pw" id="pw-shh">Shhh!</span> Baby’s asleep!',
    endings: [
      { id: 'mute', name: 'Dead Silent', line: 'Wait… you muted the WHOLE GAME?!', rarity: 52, icon: 'l8mute', stamp: 'MUTED!' },
      { id: 'toss', name: 'Window Toss', line: 'Well… that’s one way to do it!', rarity: 22, icon: 'l8toss', stamp: 'YEET!' },
      { id: 'rock', name: 'Rock-a-Bye', line: 'Out like a light! Nothing can wake them!', rarity: 16, icon: 'l8rock', stamp: 'SWEET!' },
    ],
    hints(found, ctx) {
      const sensors = I.hasMotion;
      if (!found.includes('mute')) return [
        { text: 'The boombox buttons are broken… is there ANOTHER sound button?' },
        { text: 'Tap the Sound button up top to mute the whole game!', demo: 'mute' },
      ];
      if (!found.includes('toss')) return [
        { text: 'If you can’t turn it off, get it OUT of the room!' },
        { text: 'Open the window first, then drag the boombox right out!', demo: 'toss' },
      ];
      if (!found.includes('rock')) return sensors
        ? [{ text: 'A deeply sleeping baby won’t hear a thing…' }, { text: 'Gently rock your phone left and right (don’t shake)!', demo: 'rockPhone' }]
        : [{ text: 'A deeply sleeping baby won’t hear a thing…' }, { text: 'Gently rock the wooden cradle back and forth!', demo: 'rockCradle' }];
      return [{ text: 'All endings found! Best babysitter ever.' }];
    },
    demo(kind, ctx) {
      if (kind === 'mute' && ctx.soundBtn) {
        const r = ctx.soundBtn.getBoundingClientRect();
        const p = ctx.sceneFromClient(r.left + r.width / 2, r.top + r.height / 2);
        return [{ x: p.x + 26, y: p.y + 68 }, { x: p.x, y: p.y }];
      }
      if (kind === 'toss') return [{ x: BOX0.x, y: BOX0.y }, { x: WIN.x, y: WIN.y + 26 }];
      if (kind === 'rockPhone') return { rock: true };
      if (kind === 'rockCradle') return [
        { x: CRADLE.x - 28, y: CRADLE.y - 44 }, { x: CRADLE.x + 28, y: CRADLE.y - 44 },
        { x: CRADLE.x - 28, y: CRADLE.y - 44 }, { x: CRADLE.x + 28, y: CRADLE.y - 44 },
      ];
      return null;
    },
    build,
  };

  // Level 8 stickers
  Object.assign(ART.stickers, {
    l8mute: (uid = 'a') => ART.stickerFrame(MINT,
      `<path d="M-32,-12 H-18 L4,-30 V30 L-18,12 H-32 Z" fill="#fff" stroke="${INK}" stroke-width="4" ${W}/>` +
      `<path d="M14,-16 L38,16 M38,-16 L14,16" stroke="${PINK}" stroke-width="6.5" ${W}/>` +
      `<path d="M14,-16 L38,16 M38,-16 L14,16" stroke="${INK}" stroke-width="2" ${W}/>`, 'l8mt' + uid),
    l8toss: (uid = 'a') => ART.stickerFrame('#20225A',
      `<circle cx="-30" cy="-30" r="2.5" fill="#FFF4C2"/><circle cx="32" cy="-26" r="2.5" fill="#FFF4C2"/>` +
      `<path d="M-40,-10 Q0,-44 36,16" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="6 6" stroke-linecap="round"/>` +
      `<g transform="translate(8,-10) rotate(28) scale(.56)">${boomboxSVG()}</g>` +
      `<rect x="-26" y="30" width="52" height="16" rx="5" fill="${PINK}" stroke="${INK}" stroke-width="3"/>`, 'l8ts' + uid),
    l8rock: (uid = 'a') => ART.stickerFrame('#D9CCF5',
      `<path transform="translate(24,-28)" d="M5,-13 A14,14 0 1,0 5,13 A10.5,10.5 0 1,1 5,-13 Z" fill="${YELLOW}" stroke="${INK}" stroke-width="2.6" ${W}/>` +
      `<g transform="translate(-4,16) rotate(-6) scale(.9)">` +
      `<rect x="-22" y="-26" width="44" height="44" rx="22" fill="${YELLOW}" stroke="${INK}" stroke-width="3.2"/>` +
      `<g transform="translate(0,-6)">${babyFace('happy')}</g>` +
      `<path d="M-40,14 Q0,28 40,14" fill="none" stroke="#C77D4A" stroke-width="7" ${W}/>` +
      `<path d="M-40,14 Q0,28 40,14" fill="none" stroke="${INK}" stroke-width="2.4" ${W}/></g>`, 'l8rk' + uid),
  });

  function build(ctx) {
    ctx.root.innerHTML = sceneSVG();
    const svg = ctx.root.querySelector('svg');
    const $ = (id) => svg.querySelector('#l8-' + id);

    const sash = $('sash'), winHit = $('win-hit'), winFx = $('win-fx');
    const box = $('box'), boxIn = $('box-in'), spkL = $('spk-l'), spkR = $('spk-r');
    const cradlePivot = $('cradle-pivot'), cradle = $('cradle'), babyFaceEl = $('baby-face'), lullabyLayer = $('lullaby');
    const ndBoil = $('nd-boil'), ndFace = $('nd-face'), ndArms = $('nd-arms'), sweat = $('sweat');
    const bird = $('bird'), notesLayer = $('notes'), fx = $('fx'), talkLayer = $('talk');

    const wasMuted = A.muted;
    if (wasMuted && ctx.soundBtn) ctx.soundBtn.classList.add('sound-blast');

    const st = {
      done: false, playing: true, winOpen: false, winBusy: false, cuckooBusy: false,
      cradleA: 0, rocks: 0, lastRockSide: 0, lastRockAt: 0, dragCradle: false,
      boxDragged: false, batteryJoke: false, beat: 0, taps: {}, lastTouch: performance.now(),
    };
    const alive = () => ctx.alive;
    const count = (k) => (st.taps[k] = (st.taps[k] || 0) + 1);
    const setFace = (eyes, mouth) => { ndFace.innerHTML = ART.noodleFace({ eyes, mouth }); };
    const setArms = (t) => { ndArms.innerHTML = ART.noodleArms(t); };
    const talk = (text, ms = 1800) => ctx.talk(talkLayer, ND.x, ND.y - 64, text, ms, 0.55);

    function burst(text, x, y, color = YELLOW) {
      const g = U.svgEl('g', { transform: `translate(${x},${y})` }, fx);
      const inner = U.svgEl('g', { class: 'fb popin' }, g);
      let d = '';
      for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2, r = i % 2 ? 20 : 32; d += `${i ? 'L' : 'M'}${(Math.cos(a) * r * 1.45).toFixed(1)},${(Math.sin(a) * r).toFixed(1)} `; }
      U.svgEl('path', { d: d + 'Z', fill: color, stroke: INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, inner);
      const t = U.svgEl('text', { y: 6, 'text-anchor': 'middle', 'font-family': '"Lilita One", sans-serif', 'font-size': 16.5, fill: INK }, inner);
      t.textContent = text;
      setTimeout(() => g.remove(), 750);
    }

    /* ---------- boombox beat + floating music notes ---------- */
    const activeNotes = new Set();
    function pulseBeat() {
      if (!st.playing || !alive() || document.hidden) return;
      st.beat++;
      if (!st.done) A.play('beat', st.beat);
      [spkL, spkR].forEach((s) => U.replay(s.firstElementChild, 'popin'));
      const glyphs = ['♪', '♫', '♬'];
      const sx = st.boxDragged ? 200 : BOX0.x + U.rand(-26, 20);
      const sy = st.boxDragged ? 260 : BOX0.y - 38;
      const n = U.svgEl('text', {
        x: sx.toFixed(1), y: sy.toFixed(1),
        'font-family': '"Lilita One", sans-serif', 'font-size': U.pick([20, 24, 19]),
        fill: U.pick([PINK, YELLOW, SKY]), stroke: INK, 'stroke-width': 2.4, 'paint-order': 'stroke',
      }, notesLayer);
      n.textContent = U.pick(glyphs);
      activeNotes.add(n);
      const driftX = U.rand(-52, -16);
      U.tween(1600, (t) => {
        if (!alive() || !st.playing) return;
        n.setAttribute('x', (sx + driftX * t + Math.sin(t * 7) * 6).toFixed(1));
        n.setAttribute('y', (sy - 78 * t).toFixed(1));
        n.setAttribute('opacity', (t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85).toFixed(2));
      }, U.ease.linear).then(() => {
        if (st.playing) { activeNotes.delete(n); n.remove(); }
      });
    }
    const firstBeat = setTimeout(pulseBeat, 180);
    const beatTimer = setInterval(pulseBeat, 640);
    ctx.onCleanup(() => { clearTimeout(firstBeat); clearInterval(beatTimer); });

    /* ---------- MAIN ENDING: mute the whole game (HUD sound button OR hardware Volume Down) ---------- */
    let mutedByEnding = false;
    ctx.onCleanup(() => {
      if (mutedByEnding && !wasMuted) A.setMuted(false);
    });

    async function muteEnding() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true; st.playing = false;
      if (ctx.soundBtn) ctx.soundBtn.classList.remove('sound-blast');
      A.play('click');
      U.haptic(35);
      if (!A.muted) { mutedByEnding = true; A.setMuted(true); }
      activeNotes.forEach((n) => {
        n.setAttribute('fill', '#C9C3D4');
        U.tween(420, (t) => {
          n.setAttribute('opacity', (1 - t).toFixed(2));
          n.setAttribute('transform', `translate(0,${(18 * t * t).toFixed(1)})`);
        }).then(() => n.remove());
      });
      activeNotes.clear();
      const g = U.svgEl('g', { transform: `translate(${BOX0.x},${BOX0.y - 34})`, class: 'fb popin' }, fx);
      U.svgEl('circle', { r: 22, fill: '#fff', stroke: INK, 'stroke-width': 3 }, g);
      U.svgEl('path', { d: 'M-10,-6 H-4 L4,-12 V12 L-4,6 H-10 Z', fill: INK }, g);
      U.svgEl('path', { d: 'M7,-6 L15,6 M15,-6 L7,6', stroke: PINK, 'stroke-width': 3.5, 'stroke-linecap': 'round' }, g);

      sweat.setAttribute('opacity', '0');
      setFace('wide', 'grin'); setArms('up');
      babyFaceEl.innerHTML = babyFace('happy');
      talk('Wait… you muted the WHOLE GAME?!', 2400);
      ctx.say('Galaxy brain move. Total silence.', 2600);
      await U.wait(1250);
      if (alive()) ctx.win('mute');
    }

    ctx.onSoundButton = () => {
      muteEnding();
      return true;
    };
    ctx.onCleanup(I.onVolumeDown(() => muteEnding()));

    /* ---------- SECRET ENDING #1: 2-step combo — open window, then toss boombox out! ---------- */
    async function toggleWindow(forceOpen) {
      if (st.winBusy || st.done) return;
      const next = forceOpen !== undefined ? forceOpen : !st.winOpen;
      if (next === st.winOpen) return;
      st.winBusy = true;
      st.winOpen = next;
      A.play('creak');
      const from = next ? 0 : -54, to = next ? -54 : 0;
      await U.tween(320, (t) => {
        if (!alive()) return;
        sash.setAttribute('transform', `translate(0,${U.lerp(from, to, t).toFixed(1)})`);
      }, U.ease.outBack);
      st.winBusy = false;
      ctx.say(next ? 'Fresh night air! Also a very convenient drop…' : 'Window closed.');
    }
    I.drag(winHit, svg, {
      onStart() { st.lastTouch = performance.now(); },
      onMove(pt, d) {
        if (st.done || st.winBusy) return;
        if (!st.winOpen && d.dy < -24) toggleWindow(true);
        else if (st.winOpen && d.dy > 24) toggleWindow(false);
      },
      onEnd() {},
      onTap() { if (!ctx.locked && !st.done) toggleWindow(); },
    });

    let boxGrab = null;
    I.drag(box, svg, {
      onStart(pt) {
        if (ctx.locked || st.done) return;
        st.lastTouch = performance.now();
        st.boxDragged = true;
        const m = /translate\(([-\d.]+),([-\d.]+)/.exec(box.getAttribute('transform'));
        boxGrab = { dx: pt.x - parseFloat(m[1]), dy: pt.y - parseFloat(m[2]) };
        A.play('tap');
      },
      onMove(pt) {
        if (!boxGrab) return;
        const x = U.clamp(pt.x - boxGrab.dx, 36, 354);
        const y = U.clamp(pt.y - boxGrab.dy, 48, 520);
        box.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${U.clamp((x - BOX0.x) * 0.06, -16, 16).toFixed(1)})`);
        if (!st.batteryJoke && Math.hypot(x - BOX0.x, y - BOX0.y) > 55) {
          st.batteryJoke = true;
          ctx.say('No cord to unplug — it’s battery powered!');
        }
      },
      onEnd() {
        if (!boxGrab) return;
        boxGrab = null;
        st.boxDragged = false;
        const m = /translate\(([-\d.]+),([-\d.]+)/.exec(box.getAttribute('transform'));
        const x0 = parseFloat(m[1]), y0 = parseFloat(m[2]);
        const nearWin = x0 < 178 && y0 < 235;
        if (nearWin && st.winOpen) {
          tossEnding(x0, y0);
        } else {
          if (nearWin && !st.winOpen) {
            A.play('bonk'); U.haptic(35);
            burst('BONK!', WIN.x, WIN.y + 24, '#FF8FB1');
            ctx.say('The window is closed! Open it first.');
            ctx.attempt();
          } else {
            A.play('bonk');
          }
          U.tween(460, (t) => {
            if (!alive() || st.done) return;
            box.setAttribute('transform', `translate(${U.lerp(x0, BOX0.x, t).toFixed(1)},${U.lerp(y0, BOX0.y, t).toFixed(1)})`);
          }, U.ease.outBounce);
        }
      },
      onTap() {
        boxGrab = null; st.boxDragged = false;
        if (!ctx.locked && !st.done) taps.boombox();
      },
    });

    async function tossEnding(x0, y0) {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true; st.playing = false;
      if (ctx.soundBtn) ctx.soundBtn.classList.remove('sound-blast');
      notesLayer.innerHTML = '';
      A.play('whoosh'); U.haptic(30);
      await U.tween(320, (t) => {
        if (!alive()) return;
        const x = U.lerp(x0, WIN.x, t), y = U.lerp(y0, WIN.y + 32, t) - Math.sin(t * Math.PI) * 28;
        box.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(140 * t).toFixed(1)}) scale(${U.lerp(1, 0.45, t).toFixed(2)})`);
      }, U.ease.inCubic);
      box.style.display = 'none';
      const tiny = U.svgEl('g', { transform: `translate(${WIN.x},${WIN.y + 18}) scale(.35)` }, winFx);
      tiny.innerHTML = boomboxSVG();
      await U.tween(520, (t) => {
        if (!alive()) return;
        const y = U.lerp(WIN.y + 14, 166, t * t);
        tiny.setAttribute('transform', `translate(${(WIN.x - 3 * t).toFixed(1)},${y.toFixed(1)}) rotate(${(140 + 420 * t).toFixed(1)}) scale(${U.lerp(0.35, 0.16, t).toFixed(2)})`);
      }, U.ease.linear);
      tiny.remove();
      A.play('crash'); U.haptic(50);
      await U.wait(180);
      if (!alive()) return;
      A.play('carAlarm');
      const yell = U.svgEl('text', { x: WIN.x, y: 158, 'text-anchor': 'middle', 'font-family': '"Lilita One", sans-serif', 'font-size': 12.5, fill: YELLOW, stroke: INK, 'stroke-width': 2.4, 'paint-order': 'stroke' }, winFx);
      yell.textContent = 'MY CAR!!';
      U.tween(1200, (t) => { yell.setAttribute('y', (158 - 20 * t).toFixed(1)); yell.setAttribute('opacity', (1 - t * 0.4).toFixed(2)); });

      sweat.setAttribute('opacity', '0');
      setFace('happy', 'grin'); setArms('relax');
      babyFaceEl.innerHTML = babyFace('happy');
      talk('Well… that’s one way to do it!', 2400);
      ctx.say('Problem yeeted. Peaceful silence.', 2400);
      await U.wait(1250);
      if (alive()) ctx.win('toss');
    }

    /* ---------- SECRET ENDING #2: Rock-a-Bye (gentle phone tilt OR smooth cradle drag) ---------- */
    function registerGentleRock(side) {
      if (st.done || !alive() || side === st.lastRockSide) return;
      const now = performance.now();
      if (now - st.lastRockAt < 260) return;
      if (st.lastRockAt && now - st.lastRockAt > 3800) st.rocks = 0;
      st.lastRockSide = side;
      st.lastRockAt = now;
      st.rocks++;
      A.play('lullaby', st.rocks - 1);
      const sym = U.svgEl('text', {
        x: (CRADLE.x + U.rand(-30, 30)).toFixed(1), y: (CRADLE.y - 98).toFixed(1),
        'font-family': '"Lilita One", sans-serif', 'font-size': 18,
        fill: YELLOW, stroke: INK, 'stroke-width': 2.2, 'paint-order': 'stroke',
      }, lullabyLayer);
      sym.textContent = st.rocks % 2 ? '✦' : 'Z';
      U.tween(1200, (t) => {
        if (!alive()) return;
        sym.setAttribute('y', (CRADLE.y - 98 - 54 * t).toFixed(1));
        sym.setAttribute('opacity', (1 - t).toFixed(2));
      }, U.ease.linear).then(() => sym.remove());

      if (st.rocks === 2) ctx.say('Ooh, nice and gentle… keep rocking!');
      if (st.rocks >= 4) rockEnding();
    }

    ctx.onCleanup(I.onShake(() => {
      if (st.done || !alive()) return;
      st.rocks = 0; st.lastRockSide = 0;
      U.replay(cradle, 'jolt');
      babyFaceEl.innerHTML = babyFace('wide');
      A.play('squeak');
      talk('GENTLY! Not an earthquake!', 1800);
      ctx.say('Easy! Rock it softly, don’t shake!');
      setTimeout(() => { if (alive() && !st.done) babyFaceEl.innerHTML = babyFace('sleep'); }, 750);
    }));

    let cDrag = null;
    I.drag(cradle, svg, {
      onStart(pt) {
        if (ctx.locked || st.done) return;
        st.lastTouch = performance.now();
        st.dragCradle = true;
        cDrag = { x0: pt.x, lastX: pt.x, lastT: performance.now(), tooFast: false };
      },
      onMove(pt, d) {
        if (!cDrag || st.done) return;
        const now = performance.now(), dt = Math.max(8, now - cDrag.lastT);
        const speed = Math.abs(pt.x - cDrag.lastX) / (dt / 1000);
        cDrag.lastX = pt.x; cDrag.lastT = now;
        st.cradleA = U.clamp(d.dx * 0.28, -16, 16);
        cradlePivot.setAttribute('transform', `translate(${CRADLE.x},${CRADLE.y}) rotate(${st.cradleA.toFixed(1)})`);
        if (speed > 1350 && !cDrag.tooFast) {
          cDrag.tooFast = true; st.rocks = 0;
          A.play('wobble');
          ctx.say('Slower! Gently rock the cradle.');
        } else if (!cDrag.tooFast) {
          if (st.cradleA <= -8) registerGentleRock(-1);
          else if (st.cradleA >= 8) registerGentleRock(1);
        }
      },
      onEnd() { st.dragCradle = false; cDrag = null; },
      onTap() {
        st.dragCradle = false; cDrag = null;
        if (!ctx.locked && !st.done) taps.baby();
      },
    });

    async function rockEnding() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      if (ctx.soundBtn) ctx.soundBtn.classList.remove('sound-blast');
      babyFaceEl.innerHTML = babyFace('happy');
      sweat.setAttribute('opacity', '0');
      setFace('happy', 'grin'); setArms('up');
      A.play('lullaby', 3); U.haptic([25, 40, 25]);
      const b = U.svgEl('circle', { cx: CRADLE.x - 4, cy: CRADLE.y - 62, r: 9, fill: '#CFEFFF', 'fill-opacity': '.85', stroke: INK, 'stroke-width': 2.2 }, fx);
      U.tween(900, (t) => { if (alive()) b.setAttribute('r', (6 + 5 * Math.sin(t * Math.PI * 2)).toFixed(1)); });
      talk('Out like a light! Nothing can wake them!', 2500);
      ctx.say('Deep sleep achieved. Even loud music can’t wake them now.', 2600);
      await U.wait(1350);
      if (alive()) ctx.win('rock');
    }

    /* ---------- animation loop: gentle phone tilt rocking, cradle spring, sweat bob ---------- */
    const t0 = performance.now();
    (function loop(now) {
      if (!alive()) return;
      const t = (now - t0) / 1000;
      if (st.playing && !st.done) {
        sweat.setAttribute('transform', `translate(0,${(Math.sin(t * 6) * 2.5).toFixed(1)})`);
      }
      if (!st.dragCradle) {
        let targetA = 0;
        if (I.hasMotion && !st.done) {
          const tilt = I.tilt;
          targetA = U.clamp(tilt * 0.45, -16, 16);
          if (Math.abs(tilt) < 52) {
            if (tilt <= -12) registerGentleRock(-1);
            else if (tilt >= 12) registerGentleRock(1);
          }
        }
        st.cradleA += (targetA - st.cradleA) * 0.14;
        cradlePivot.setAttribute('transform', `translate(${CRADLE.x},${CRADLE.y}) rotate(${st.cradleA.toFixed(1)})`);
      }
      if (!st.done && now - st.lastTouch > 8500) {
        st.lastTouch = now;
        ctx.say(U.pick([
          'Psst… look at the sound button up top.',
          'That window looks like it opens…',
          'Maybe gently rocking the baby helps?',
        ]));
      }
      requestAnimationFrame(loop);
    })(t0);
    svg.addEventListener('pointerdown', () => { st.lastTouch = performance.now(); });

    /* ---------- cuckoo clock gag ---------- */
    async function cuckooTap() {
      if (st.cuckooBusy || st.done) return;
      st.cuckooBusy = true; ctx.attempt();
      A.play('cuckoo');
      await U.tween(180, (t) => bird.setAttribute('transform', `translate(0,${U.lerp(18, 0, t).toFixed(1)})`), U.ease.outBack);
      if (!alive() || st.done) { st.cuckooBusy = false; return; }
      const d = `M${ND.x + 20},${ND.y - 24} C${ND.x + 70},${ND.y - 120} 310,170 324,96`;
      const armInk = U.svgEl('path', { d, fill: 'none', stroke: INK, 'stroke-width': 11, 'stroke-linecap': 'round' }, fx);
      const armCol = U.svgEl('path', { d, fill: 'none', stroke: YELLOW, 'stroke-width': 5.5, 'stroke-linecap': 'round' }, fx);
      const len = armInk.getTotalLength();
      [armInk, armCol].forEach((a) => { a.style.strokeDasharray = len; a.style.strokeDashoffset = len; });
      await U.tween(150, (t) => [armInk, armCol].forEach((a) => (a.style.strokeDashoffset = len * (1 - t))));
      A.play('smack'); U.haptic(25);
      burst('SHHH!', 314, 72, MINT);
      await U.tween(140, (t) => bird.setAttribute('transform', `translate(0,${(18 * t).toFixed(1)})`));
      await U.tween(150, (t) => [armInk, armCol].forEach((a) => (a.style.strokeDashoffset = len * t)));
      armInk.remove(); armCol.remove();
      ctx.say('Not now, bird!');
      st.cuckooBusy = false;
    }

    /* ---------- reactions (no dead taps!) ---------- */
    const noodleLines = ['Turn that thing OFF!!', 'I JUST got them to sleep!', 'Use your inside taps!'];
    const taps = {
      boombox() {
        const n = count('boombox');
        A.play('bonk'); U.replay(boxIn, 'wiggle');
        ctx.say(n === 1 ? 'Volume is welded to 11. Power button is jammed!' : 'If ONLY there were another sound button on this screen…', 2800);
        ctx.attempt();
      },
      baby() {
        A.play('wobble'); U.replay(cradle, 'wiggle');
        ctx.say('Careful! Try rocking them gently, not poking.');
        ctx.attempt();
      },
      noodle() {
        const n = count('noodle');
        A.play('shhh'); U.replay(ndBoil, 'wiggle');
        talk(noodleLines[(n - 1) % noodleLines.length]);
        ctx.attempt();
      },
      cuckoo: cuckooTap,
      duck(node) {
        A.play('squeak'); U.haptic(30); U.replay(node, 'hop');
        burst('SQUEAK!', 216, 474, YELLOW);
        babyFaceEl.innerHTML = babyFace('wide');
        talk('DON’T TOUCH THE DUCK!', 1600);
        ctx.say('That was WAY too close!');
        ctx.attempt();
        setTimeout(() => { if (alive() && !st.done) babyFaceEl.innerHTML = babyFace('sleep'); }, 550);
      },
      mobile(node) { A.play('lullaby', 0); U.replay(node, 'sway'); ctx.say('Cute, but not louder than that stereo.'); ctx.attempt(); },
      table() { A.play('tap'); ctx.say('Vibrating to the bass.'); ctx.attempt(); },
      rug() { A.play('tap'); ctx.say('Soft rug. Quiet footsteps.'); ctx.attempt(); },
      wall() { A.play('bonk'); ctx.say(U.pick(['Shhh!', 'Quietly…', 'Think outside the room.'])); ctx.attempt(); },
      floor() { A.play('creak'); ctx.say('Careful! Creaky floorboards!'); ctx.attempt(); },
    };
    I.taps(svg, (name, node) => { if (ctx.locked || st.done) return; if (taps[name]) taps[name](node); });

    const shh = ctx.promptEl.querySelector('#pw-shh');
    ctx.promptEl.onclick = (e) => {
      if (ctx.locked) return;
      if (e.target === shh) { U.replay(shh, 'hop'); A.play('shhh'); talk('SHHHHHH!', 1200); ctx.say('Shushing doesn’t stop a boombox.'); }
      else { A.play('tap'); ctx.say('Keep it down!'); }
    };
  }

  BF.levels = BF.levels || {};
  BF.levels[8] = L;
})(window.BF);
