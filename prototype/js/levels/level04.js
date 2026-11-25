/* Brainflip — Level 4: "Turn off the light!"
   Main ending : drag the prompt banner aside — the real switch is hiding behind it!  (verb: drag UI)
   Secret #1   : flip the phone face-down (desktop fallback: hold the bulb down to smother it)  (verb: flip)
   Secret #2   : drag the sleep mask onto Noodle's eyes — light stays ON, problem solved!  (verb: drag)
   Decoys: a "useless machine" fake wall switch that flips itself back on, a glued wall plug, a moth. */
(function (BF) {
  'use strict';
  const U = BF.U, A = BF.audio, I = BF.input, ART = BF.art;
  const INK = '#1B1B2F', YELLOW = '#FFC93C', PINK = '#FF5D8F', MINT = '#3DDC97';
  const W = 'stroke-linecap="round" stroke-linejoin="round"';
  const S = `stroke="${INK}" stroke-width="3.4" ${W}`;

  const ND = { x: 195, y: 404 };
  const BULB = { x: 195, y: 118 };
  const RSW = { x: 264, y: -34 };     // real switch — hidden right behind the #prompt banner!
  const MASK0 = { x: 314, y: 392 };

  const star = (x, y, s = 7, fill = MINT) =>
    `<path d="M${x},${y - s} Q${x},${y} ${x + s},${y} Q${x},${y} ${x},${y + s} Q${x},${y} ${x - s},${y} Q${x},${y} ${x},${y - s} Z" fill="${fill}" stroke="${INK}" stroke-width="1.8" ${W}/>`;

  function shadesSVG() {
    return `<g id="l4-shades">
      <path d="M-26,-8 H26" stroke="${INK}" stroke-width="3" ${W}/>
      <rect x="-24" y="-15" width="21" height="14" rx="5" fill="${INK}" stroke="${INK}" stroke-width="2.4"/>
      <rect x="3" y="-15" width="21" height="14" rx="5" fill="${INK}" stroke="${INK}" stroke-width="2.4"/>
      <path d="M-20,-11 L-14,-5 M7,-11 L13,-5" stroke="#fff" stroke-width="2.2" opacity=".65" stroke-linecap="round"/>
    </g>`;
  }

  function maskArt() {
    return `<path d="M-26,-2 Q-34,-2 -34,4 M26,-2 Q34,-2 34,4" fill="none" stroke="${INK}" stroke-width="3" ${W}/>` +
      `<path d="M-26,-6 C-26,-16 -6,-16 0,-8 C6,-16 26,-16 26,-6 C28,8 14,14 4,8 Q0,5 -4,8 C-14,14 -28,8 -26,-6 Z" fill="${PINK}" ${S}/>` +
      `<path d="M-17,-1 Q-12,5 -7,-1 M7,-1 Q12,5 17,-1" fill="none" stroke="${INK}" stroke-width="2.4" ${W}/>` +
      `<path d="M-19,2 l-2,3 M-12,4 v3 M-6,2 l2,3 M6,2 l-2,3 M12,4 v3 M19,2 l2,3" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`;
  }

  function sceneSVG() {
    return `
<svg viewBox="0 0 390 630" xmlns="http://www.w3.org/2000/svg" aria-label="Noodle squinting under a blinding overhead lightbulb">
  <defs>
    <pattern id="l4-wallp" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M16,10 V22 M10,16 H22" stroke="#F6E5B8" stroke-width="2.2" stroke-linecap="round"/></pattern>
    <radialGradient id="l4-glare" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#FFFDF0" stop-opacity="1"/>
      <stop offset=".45" stop-color="#FFE97D" stop-opacity=".65"/>
      <stop offset="1" stop-color="#FFE97D" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="l4-beamg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FFF8C6" stop-opacity=".75"/>
      <stop offset="1" stop-color="#FFF8C6" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="l4-winclip"><rect x="34" y="64" width="90" height="106" rx="4"/></clipPath>
  </defs>

  <g id="l4-room">
    <!-- bright over-lit bedroom wall + floor -->
    <rect data-tap="wall" x="-30" y="-200" width="450" height="690" fill="#FFF9DC"/>
    <rect x="-30" y="-200" width="450" height="690" fill="url(#l4-wallp)" pointer-events="none"/>
    <rect data-tap="floor" x="-30" y="490" width="450" height="520" fill="#EBB47A"/>
    <path d="M-30,536 H420 M-30,582 H420 M-30,628 H420 M-30,674 H420 M90,490 V536 M240,536 V582 M140,582 V628 M310,490 V536" stroke="#C77D4A" stroke-width="2.6" pointer-events="none"/>
    <rect x="-30" y="484" width="450" height="12" fill="#fff" ${S}/>

    <!-- secret wire + REAL SWITCH (hidden behind #prompt; opacity starts 0 during slam intro so it never flashes!) -->
    <g id="l4-secret-wrap" opacity="0">
      <path d="M195,-34 H${RSW.x}" fill="none" stroke="${PINK}" stroke-width="4" stroke-dasharray="6 5" stroke-linecap="round"/>

      <g id="l4-real-switch" transform="translate(${RSW.x},${RSW.y})" data-tap="realSwitch">
        <circle r="34" fill="#000" fill-opacity="0" pointer-events="all"/>
        <g transform="translate(38,4) rotate(8)">
          <rect x="-18" y="-11" width="36" height="22" rx="3" fill="${YELLOW}" stroke="${INK}" stroke-width="2.2"/>
          <text x="0" y="4" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="10.5" fill="${INK}">shhh!</text>
        </g>
        <rect x="-18" y="-24" width="36" height="48" rx="7" fill="#fff" ${S}/>
        <circle cx="0" cy="-17" r="2.2" fill="${INK}"/><circle cx="0" cy="17" r="2.2" fill="${INK}"/>
        <rect x="-9" y="-11" width="18" height="22" rx="3" fill="#EAF0F6" stroke="${INK}" stroke-width="2.4"/>
        <rect id="l4-real-toggle" x="-7" y="-10" width="14" height="11" rx="2.5" fill="${MINT}" stroke="${INK}" stroke-width="2.4"/>
      </g>
    </g>

    <!-- night window (callback to Level 1: it's already dark outside!) -->
    <g data-tap="window">
      <g clip-path="url(#l4-winclip)">
        <rect x="34" y="64" width="90" height="106" fill="#20225A"/>
        <path d="M102,84 A13,13 0 1,0 102,110 A10,10 0 1,1 102,84 Z" fill="#FFF4C2" stroke="${INK}" stroke-width="2"/>
        <circle cx="54" cy="88" r="2.2" fill="#FFF4C2"/><circle cx="72" cy="116" r="1.8" fill="#FFF4C2"/><circle cx="106" cy="138" r="2" fill="#FFF4C2"/>
        <path d="M30,152 Q76,136 128,154 V174 H30 Z" fill="#2E5A4C" stroke="${INK}" stroke-width="2.4"/>
      </g>
      <path d="M26,56 H132 V178 H26 Z M34,64 V170 H124 V64 Z" fill="#fff" fill-rule="evenodd" ${S}/>
      <path d="M79,64 V170 M34,117 H124" stroke="#fff" stroke-width="6"/><path d="M79,64 V170 M34,117 H124" stroke="${INK}" stroke-width="2.6"/>
      <rect x="20" y="176" width="118" height="12" rx="5" fill="#fff" ${S}/>
    </g>

    <!-- electric bill poster on right wall -->
    <g transform="translate(316,120) rotate(4)"><g data-tap="poster" class="fb">
      <rect x="-46" y="-54" width="92" height="108" rx="6" fill="#fff" ${S}/>
      <rect x="-46" y="-54" width="92" height="26" rx="6" fill="${PINK}" stroke="${INK}" stroke-width="3.2"/>
      <text x="0" y="-36" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="14" fill="#fff">POWER BILL</text>
      <text x="0" y="4" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="30" fill="${INK}">$999</text>
      <path d="M-28,22 H28 M-20,34 H20" stroke="#C9C3D4" stroke-width="3.5" stroke-linecap="round"/>
    </g></g>

    <!-- faint glow-in-the-dark stars (barely visible while bright, shine bright when dark!) -->
    <g id="l4-stars-dim" data-tap="stars" opacity=".28">
      ${star(150, 206, 8, MINT)}${star(252, 224, 9, YELLOW)}${star(132, 272, 6, YELLOW)}${star(282, 286, 7, MINT)}${star(224, 186, 6, PINK)}
    </g>

    <!-- DECOY FAKE SWITCH + big obvious arrow + useless-machine hatch -->
    <g id="l4-decoy-hint" pointer-events="none">
      <text x="64" y="218" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="15" fill="${PINK}" stroke="${INK}" stroke-width="1">SWITCH</text>
      <path d="M64,224 V242 M57,236 L64,244 L71,236" fill="none" stroke="${INK}" stroke-width="3.2" ${W}/>
    </g>
    <!-- wall scribble revealed when fake switch falls off -->
    <g id="l4-decoy-msg" opacity="0" pointer-events="none">
      <text x="64" y="274" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="14" fill="${PINK}">DECOY</text>
      <text x="64" y="292" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="14" fill="${INK}">:P</text>
    </g>
    <g id="l4-fake-switch" transform="translate(64,278)"><g id="l4-fake-rot" data-tap="fakeSwitch" class="fb">
      <rect x="-20" y="-28" width="40" height="56" rx="8" fill="#fff" ${S}/>
      <circle cx="0" cy="-20" r="2.4" fill="${INK}"/><circle cx="0" cy="20" r="2.4" fill="${INK}"/>
      <rect x="-10" y="-12" width="20" height="24" rx="3" fill="#EAF0F6" stroke="${INK}" stroke-width="2.4"/>
      <rect id="l4-fake-toggle" x="-8" y="-11" width="16" height="12" rx="3" fill="${PINK}" stroke="${INK}" stroke-width="2.6"/>
    </g></g>
    <!-- tiny hatch + cheeky finger that flips the fake switch back ON -->
    <g id="l4-hatch" transform="translate(94,278)" pointer-events="none" opacity="0">
      <rect x="-4" y="-16" width="12" height="32" rx="3" fill="#2B2D6E" stroke="${INK}" stroke-width="2.8"/>
      <g id="l4-finger" transform="translate(0,0)">
        <path d="M4,0 H-28" stroke="${INK}" stroke-width="12" ${W}/>
        <path d="M4,0 H-28" stroke="${YELLOW}" stroke-width="6.5" ${W}/>
        <circle cx="-28" cy="0" r="6.5" fill="${YELLOW}" stroke="${INK}" stroke-width="2.8"/>
      </g>
    </g>

    <!-- taped power outlet (decoy) -->
    <g transform="translate(52,442)" data-tap="outlet">
      <rect x="-16" y="-20" width="32" height="40" rx="5" fill="#fff" ${S}/>
      <rect x="-7" y="-10" width="14" height="18" rx="3" fill="#5BC0EB" stroke="${INK}" stroke-width="2.4"/>
      <path d="M0,8 C0,24 -12,30 -24,30" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
      <!-- X tape holding plug in -->
      <path d="M-14,-10 L14,8 M14,-10 L-14,8" stroke="${YELLOW}" stroke-width="6" opacity=".88" stroke-linecap="round"/>
      <path d="M-14,-10 L14,8 M14,-10 L-14,8" stroke="${INK}" stroke-width="1.4" opacity=".45" stroke-linecap="round"/>
    </g>

    <!-- rug -->
    <g data-tap="rug">
      <ellipse cx="195" cy="548" rx="134" ry="26" fill="#5BC0EB" ${S}/>
      <ellipse cx="195" cy="548" rx="114" ry="17" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="7 8"/>
    </g>

    <!-- armchair behind Noodle -->
    <g data-tap="chair">
      <rect x="128" y="346" width="134" height="122" rx="26" fill="#8A84C8" ${S}/>
      <rect x="116" y="406" width="30" height="72" rx="14" fill="#726CB2" ${S}/>
      <rect x="244" y="406" width="30" height="72" rx="14" fill="#726CB2" ${S}/>
      <rect x="136" y="438" width="118" height="42" rx="14" fill="#A09AE0" ${S}/>
      <rect x="138" y="476" width="12" height="16" fill="#C77D4A" ${S}/><rect x="240" y="476" width="12" height="16" fill="#C77D4A" ${S}/>
    </g>

    <!-- Noodle squinting under the blinding light -->
    <g id="l4-nd" transform="translate(${ND.x},${ND.y})" data-tap="noodle">
      <g id="l4-nd-boil" class="boil fb">
        ${ART.noodleLegs()}${ART.noodleBody()}
        <g id="l4-nd-arms">${ART.noodleArms('shrug')}</g>
        <g transform="translate(0,-14)">
          <g id="l4-nd-face">${ART.noodleFace({ eyes: 'squint', mouth: 'frown' })}</g>
          <g id="l4-nd-wear">${shadesSVG()}</g>
        </g>
      </g>
    </g>

    <!-- bedside nightstand + glass of water + draggable sleep mask -->
    <g data-tap="nightstand">
      <rect x="292" y="476" width="8" height="14" fill="#C77D4A" ${S}/><rect x="358" y="476" width="8" height="14" fill="#C77D4A" ${S}/>
      <rect x="288" y="410" width="82" height="68" rx="4" fill="#E89A5E" ${S}/>
      <rect x="296" y="424" width="66" height="24" rx="4" fill="#F2B07A" stroke="${INK}" stroke-width="2.4"/>
      <circle cx="329" cy="436" r="3.6" fill="#fff" stroke="${INK}" stroke-width="2.2"/>
      <rect x="282" y="400" width="94" height="12" rx="4" fill="#C77D4A" ${S}/>
    </g>
    <g transform="translate(362,390)" data-tap="water">
      <path d="M-9,-18 H9 L7,10 H-7 Z" fill="#CFEFFF" stroke="${INK}" stroke-width="2.6" ${W}/>
      <path d="M-8,-6 H8 L7,10 H-7 Z" fill="#5BC0EB" opacity=".75"/>
    </g>
    <g id="l4-mask" transform="translate(${MASK0.x},${MASK0.y})"><g id="l4-mask-in" class="fb">
      <circle r="32" fill="#000" fill-opacity="0" pointer-events="all"/>
      ${maskArt()}
    </g></g>

    <!-- blinding light beam + overhead hanging bulb -->
    <polygon id="l4-beam" points="168,128 222,128 380,620 10,620" fill="url(#l4-beamg)" pointer-events="none"/>
    <g id="l4-bulb-pivot" transform="translate(195,-150)">
      <path d="M0,0 V228" stroke="${INK}" stroke-width="4"/>
      <!-- glare halo + pulsing comic light rays -->
      <g id="l4-bulb-glow" transform="translate(0,268)" pointer-events="none">
        <circle r="118" fill="url(#l4-glare)"/>
        <g id="l4-rays" stroke="${YELLOW}" stroke-width="4" stroke-linecap="round">
          <path d="M0,-52 V-66 M44,-28 L56,-36 M52,6 L66,8 M36,40 L46,52 M-44,-28 L-56,-36 M-52,6 L-66,8 M-36,40 L-46,52"/>
        </g>
      </g>
      <g id="l4-bulb-body" transform="translate(0,268)">
        <rect x="-14" y="-42" width="28" height="18" rx="4" fill="#9AA3B2" ${S}/>
        <path d="M-12,-36 H12 M-12,-30 H12" stroke="${INK}" stroke-width="2"/>
        <path id="l4-bulb-glass" d="M-13,-24 C-26,-16 -30,2 -22,16 C-16,26 -10,32 0,32 C10,32 16,26 22,16 C30,2 26,-16 13,-24 Z" fill="#FFFBE0" ${S}/>
        <path id="l4-filament" d="M-7,-16 L-4,2 L0,-6 L4,2 L7,-16" fill="none" stroke="#FF9F43" stroke-width="2.6" ${W}/>
        <path d="M-14,-8 Q-17,4 -11,14" fill="none" stroke="#fff" stroke-width="4" opacity=".8" stroke-linecap="round"/>
      </g>
      <!-- generous touch/hold hit target over the bulb -->
      <circle id="l4-bulb-hit" cx="0" cy="268" r="46" fill="#000" fill-opacity="0" pointer-events="all" style="cursor:pointer"/>
      <!-- desktop hold-to-smother progress ring -->
      <circle id="l4-hold-ring" cx="0" cy="268" r="42" fill="none" stroke="${INK}" stroke-width="6" stroke-dasharray="264" stroke-dashoffset="264" opacity="0" pointer-events="none"/>
    </g>

    <!-- moth orbiting the blinding bulb -->
    <g id="l4-moth" transform="translate(245,118)"><g data-tap="moth" class="fb">
      <circle r="22" fill="#000" fill-opacity="0" pointer-events="all"/>
      <ellipse cx="-8" cy="-2" rx="9" ry="6" transform="rotate(-24,-8,-2)" fill="#D7C4A3" stroke="${INK}" stroke-width="2.2"/>
      <ellipse cx="8" cy="-2" rx="9" ry="6" transform="rotate(24,8,-2)" fill="#D7C4A3" stroke="${INK}" stroke-width="2.2"/>
      <ellipse cx="0" cy="0" rx="3.2" ry="7" fill="${INK}"/>
      <path d="M-2,-6 Q-6,-12 -9,-10 M2,-6 Q6,-12 9,-10" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>
    </g></g>

    <!-- darkness overlay (lights out!) + glowing night layer above it -->
    <rect id="l4-dark" x="-30" y="-200" width="450" height="1200" fill="#131538" opacity="0" pointer-events="none"/>
    <g id="l4-night-glow" opacity="0" pointer-events="none">
      <g class="glow-star">${star(150, 206, 9, MINT)}${star(252, 224, 10, YELLOW)}${star(132, 272, 7, YELLOW)}${star(282, 286, 8, MINT)}${star(224, 186, 7, PINK)}${star(76, 336, 7, MINT)}${star(328, 220, 8, YELLOW)}</g>
      <!-- Noodle's happy eyes glowing in the dark! -->
      <g id="l4-dark-eyes" transform="translate(${ND.x},${ND.y - 14})">
        <path d="M-20,-4 Q-13,-13 -6,-4 M6,-4 Q13,-13 20,-4" fill="none" stroke="#FFF4C2" stroke-width="4" ${W}/>
        <path d="M-10,12 Q0,21 10,12" fill="none" stroke="#FFF4C2" stroke-width="3.6" ${W}/>
      </g>
    </g>

    <g id="l4-fx" pointer-events="none"></g>
    <g id="l4-talk" pointer-events="none"></g>
  </g>
</svg>`;
  }

  const L = {
    id: 4,
    promptHTML: 'Turn off the light!',
    endings: [
      { id: 'switch', name: 'Hidden Switch', line: 'Who puts a switch behind the title?!', rarity: 56, icon: 'l4switch', stamp: 'CLICK!' },
      { id: 'flip', name: 'Brain Flip!', line: 'Whoa… pitch black! Genius!', rarity: 14, icon: 'l4flip', stamp: 'FLIPPED!' },
      { id: 'mask', name: 'Out of Sight', line: 'Dark enough for me!', rarity: 11, icon: 'l4mask', stamp: 'GENIUS!' },
    ],
    hints(found) {
      const sensors = I.hasMotion;
      if (!found.includes('switch')) return [
        { text: 'The real switch is hiding behind something you never touch…' },
        { text: 'Drag the “Turn off the light!” banner out of the way!', demo: 'prompt' },
      ];
      if (!found.includes('flip')) return sensors
        ? [{ text: 'The game is literally called BrainFLIP…' }, { text: 'Flip your phone face-down!', demo: 'flip' }]
        : [{ text: 'Block out the light completely…' }, { text: 'Hold the glowing bulb down to smother it! (On a phone: flip it face-down!)', demo: 'hold' }];
      if (!found.includes('mask')) return [
        { text: 'If you can’t see the light, is it really on?' },
        { text: 'Drag the sleep mask onto Noodle’s eyes!', demo: 'mask' },
      ];
      return [{ text: 'All endings found! Sweet dreams.' }];
    },
    demo(kind) {
      if (kind === 'prompt') return [{ x: 240, y: -32 }, { x: 110, y: 150 }];
      if (kind === 'flip') return { flip: true };
      if (kind === 'hold') return { hold: { x: BULB.x, y: BULB.y } };
      if (kind === 'mask') return [{ x: MASK0.x, y: MASK0.y }, { x: ND.x, y: ND.y - 16 }];
      return null;
    },
    build,
  };

  // Level 4 stickers
  Object.assign(ART.stickers, {
    l4switch: (uid = 'a') => ART.stickerFrame('#1E2058',
      star(-32, -26, 8, MINT) + star(34, -20, 7, YELLOW) + star(-28, 30, 6, PINK) +
      `<rect x="-20" y="-28" width="40" height="56" rx="8" fill="#fff" stroke="${INK}" stroke-width="3.5"/>` +
      `<rect x="-10" y="-12" width="20" height="24" rx="3" fill="#EAF0F6" stroke="${INK}" stroke-width="2.4"/>` +
      `<rect x="-8" y="0" width="16" height="12" rx="3" fill="${MINT}" stroke="${INK}" stroke-width="2.6"/>`, 'l4sw' + uid),
    l4flip: (uid = 'a') => ART.stickerFrame('#131538',
      star(-34, -24, 7, YELLOW) + star(34, -26, 8, MINT) + star(32, 26, 6, PINK) +
      `<g transform="translate(0,-10) rotate(180)"><rect x="-18" y="-28" width="36" height="56" rx="8" fill="#2B2D6E" stroke="#fff" stroke-width="3"/><circle cx="0" cy="-16" r="4" fill="#5BC0EB"/></g>` +
      `<path d="M-20,26 Q-13,18 -6,26 M6,26 Q13,18 20,26" fill="none" stroke="#FFF4C2" stroke-width="3.8" ${W}/>`, 'l4fl' + uid),
    l4mask: (uid = 'a') => ART.stickerFrame('#FFE97D',
      `<path d="M0,-54 V-42 M40,-38 L30,-28 M-40,-38 L-30,-28 M50,0 H38 M-50,0 H-38" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>` +
      ART.noodle({ x: 0, y: 12, scale: 0.64, eyes: 'closed', mouth: 'grin', armType: 'relax', extra: `<g transform="translate(0,-20) scale(.92)">${maskArt()}</g>` }), 'l4mk' + uid),
  });

  function build(ctx) {
    ctx.root.innerHTML = sceneSVG();
    const svg = ctx.root.querySelector('svg');
    const $ = (id) => svg.querySelector('#l4-' + id);

    const beam = $('beam'), bulbGlow = $('bulb-glow'), bulbGlass = $('bulb-glass'), filament = $('filament');
    const bulbPivot = $('bulb-pivot'), bulbHit = $('bulb-hit'), holdRing = $('hold-ring');
    const dark = $('dark'), nightGlow = $('night-glow'), starsDim = $('stars-dim');
    const moth = $('moth'), secretWrap = $('secret-wrap'), realSwitch = $('real-switch'), realToggle = $('real-toggle');
    const fakeSwitch = $('fake-switch'), fakeRot = $('fake-rot'), fakeToggle = $('fake-toggle'), decoyMsg = $('decoy-msg');
    const hatch = $('hatch'), finger = $('finger');
    const ndBoil = $('nd-boil'), ndFace = $('nd-face'), ndArms = $('nd-arms'), ndWear = $('nd-wear');
    const mask = $('mask'), maskIn = $('mask-in'), fx = $('fx'), talkLayer = $('talk');
    const secretTimer = setTimeout(() => { if (alive()) secretWrap.setAttribute('opacity', '1'); }, 470);
    ctx.onCleanup(() => clearTimeout(secretTimer));

    const st = {
      done: false, lightOn: true, fakeTaps: 0, fakeBusy: false, fakeFallen: false,
      revealed: false, pOff: { x: 0, y: 0 }, swing: 0, swingV: 0,
      mothScared: 0, taps: {}, lastTouch: performance.now(),
    };
    const alive = () => ctx.alive;
    const count = (k) => (st.taps[k] = (st.taps[k] || 0) + 1);
    const setFace = (eyes, mouth) => { ndFace.innerHTML = ART.noodleFace({ eyes, mouth }); };
    const setArms = (t) => { ndArms.innerHTML = ART.noodleArms(t); };
    const talk = (text, ms = 1800) => ctx.talk(talkLayer, ND.x, ND.y - 64, text, ms, 0.5);

    function burst(text, x, y, color = YELLOW) {
      const g = U.svgEl('g', { transform: `translate(${x},${y})` }, fx);
      const inner = U.svgEl('g', { class: 'fb popin' }, g);
      let d = '';
      for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2, r = i % 2 ? 20 : 32; d += `${i ? 'L' : 'M'}${(Math.cos(a) * r * 1.4).toFixed(1)},${(Math.sin(a) * r).toFixed(1)} `; }
      U.svgEl('path', { d: d + 'Z', fill: color, stroke: INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, inner);
      const t = U.svgEl('text', { y: 6, 'text-anchor': 'middle', 'font-family': '"Lilita One", sans-serif', 'font-size': 17, fill: INK }, inner);
      t.textContent = text;
      setTimeout(() => g.remove(), 750);
    }

    function isSwitchUncovered() {
      const pr = ctx.promptEl.getBoundingClientRect();
      const sr = realToggle.getBoundingClientRect();
      // Uncovered once the prompt no longer overlaps the center of the real switch toggle
      const sx = sr.left + sr.width / 2, sy = sr.top + sr.height / 2;
      const hitPrompt = sx > pr.left - 8 && sx < pr.right + 8 && sy > pr.top - 8 && sy < pr.bottom + 8;
      return !hitPrompt;
    }

    /* ---------- MAIN ENDING: drag the #prompt banner to reveal the hidden switch ---------- */
    const promptEl = ctx.promptEl;
    promptEl.classList.add('prompt-drag');
    let pDrag = null;
    function placePrompt(rot = -2) {
      promptEl.style.transform = `translate(calc(-50% + ${st.pOff.x.toFixed(1)}px), ${st.pOff.y.toFixed(1)}px) rotate(${rot.toFixed(1)}deg)`;
    }
    const onPromptDown = (e) => {
      if (ctx.locked || st.done || pDrag) return;
      st.lastTouch = performance.now();
      promptEl.classList.remove('slam');
      secretWrap.setAttribute('opacity', '1');
      promptEl.style.transition = 'none';
      const p = ctx.sceneFromClient(e.clientX, e.clientY);
      pDrag = { id: e.pointerId, start: p, off0: { ...st.pOff }, maxMove: 0 };
      try { promptEl.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      e.preventDefault();
    };
    const onPromptMove = (e) => {
      if (!pDrag || e.pointerId !== pDrag.id || st.done) return;
      const p = ctx.sceneFromClient(e.clientX, e.clientY);
      const dx = p.x - pDrag.start.x, dy = p.y - pDrag.start.y;
      pDrag.maxMove = Math.max(pDrag.maxMove, Math.hypot(dx, dy));
      st.pOff.x = U.clamp(pDrag.off0.x + dx, -220, 220);
      st.pOff.y = U.clamp(pDrag.off0.y + dy, -16, 440);
      placePrompt(U.clamp(-2 + dx * 0.08, -14, 12));
      if (!st.revealed && isSwitchUncovered()) {
        st.revealed = true;
        A.play('squeak');
        ctx.say('WAIT… how did you find that?!', 2600);
      }
    };
    const onPromptUp = (e) => {
      if (!pDrag || e.pointerId !== pDrag.id) return;
      const moved = pDrag.maxMove;
      pDrag = null;
      if (moved < 8) {
        const n = count('prompt');
        A.play('wobble');
        promptEl.style.transition = 'transform .22s cubic-bezier(.3,1.5,.5,1)';
        placePrompt(n % 2 ? 5 : -8);
        setTimeout(() => { if (alive() && !pDrag) placePrompt(-2); }, 180);
        ctx.say(n === 1 ? 'Hey! Don’t push the instructions around.' : 'Seriously, stop shoving me!');
      } else {
        promptEl.style.transition = 'transform .25s ease-out';
        placePrompt(-2);
        A.play('tap');
      }
    };
    promptEl.addEventListener('pointerdown', onPromptDown);
    promptEl.addEventListener('pointermove', onPromptMove);
    promptEl.addEventListener('pointerup', onPromptUp);
    promptEl.addEventListener('pointercancel', onPromptUp);
    ctx.onCleanup(() => {
      promptEl.removeEventListener('pointerdown', onPromptDown);
      promptEl.removeEventListener('pointermove', onPromptMove);
      promptEl.removeEventListener('pointerup', onPromptUp);
      promptEl.removeEventListener('pointercancel', onPromptUp);
    });

    /* ---------- light off visual transition (shared by Hidden Switch & Brain Flip!) ---------- */
    async function turnOffLights(endingId, src) {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true; st.lightOn = false;
      A.play('click');
      if (endingId === 'flip') { A.play('flip'); U.haptic([40, 60, 120]); }
      else U.haptic(35);

      if (endingId === 'switch') realToggle.setAttribute('y', '0');
      beam.setAttribute('opacity', '0');
      bulbGlow.setAttribute('opacity', '0');
      bulbGlass.setAttribute('fill', '#B8C0CC');
      filament.setAttribute('stroke', '#6E6680');
      starsDim.setAttribute('opacity', '0');
      moth.setAttribute('opacity', '0');
      holdRing.setAttribute('opacity', '0');
      ndWear.innerHTML = ''; // Noodle removes his sunglasses in the dark!
      setFace('happy', 'grin'); setArms('relax');

      await U.tween(320, (t) => {
        if (!alive()) return;
        dark.setAttribute('opacity', (0.86 * t).toFixed(3));
        nightGlow.setAttribute('opacity', t.toFixed(3));
      }, U.ease.outCubic);

      // If flipped face-down on a real phone, wait briefly for the player to turn it back up so they see the payoff!
      if (endingId === 'flip' && src === 'sensor' && I.isFaceDown) {
        for (let i = 0; i < 32 && alive() && I.isFaceDown; i++) await U.wait(100);
        if (!alive()) return;
        await U.wait(220);
      }

      A.play('boing');
      talk(endingId === 'flip' ? 'Whoa… pitch black! Genius!' : 'Ahhh… sweet darkness!', 2400);
      if (endingId === 'switch') ctx.say('Who hides a light switch behind the title?!', 2600);
      await U.wait(1100);
      if (alive()) ctx.win(endingId);
    }

    /* ---------- SECRET ENDING #1: flip phone face-down (or hold bulb on desktop) ---------- */
    ctx.onCleanup(I.onFlip((src) => turnOffLights('flip', src)));

    let hold = null;
    bulbHit.addEventListener('pointerdown', (e) => {
      if (ctx.locked || st.done || hold) return;
      st.lastTouch = performance.now();
      try { bulbHit.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      hold = { id: e.pointerId, t0: performance.now(), smothering: false, warnedSensor: false };
      e.preventDefault();
    });
    const endBulbHold = (e) => {
      if (!hold || e.pointerId !== hold.id) return;
      const elapsed = performance.now() - hold.t0;
      const wasSmothering = hold.smothering;
      hold = null;
      holdRing.setAttribute('opacity', '0');
      holdRing.setAttribute('stroke-dashoffset', '264');
      if (st.done) return;
      if (wasSmothering) {
        dark.setAttribute('opacity', '0');
        A.play('swish');
        ctx.say('Keep holding to block out ALL the light!');
      } else if (elapsed < 340) {
        taps.bulb();
      }
    };
    bulbHit.addEventListener('pointerup', endBulbHold);
    bulbHit.addEventListener('pointercancel', endBulbHold);

    /* ---------- SECRET ENDING #2: drag the sleep mask onto Noodle's eyes ---------- */
    let maskGrab = null;
    I.drag(mask, svg, {
      onStart(pt) {
        if (ctx.locked || st.done) return;
        const m = /translate\(([-\d.]+),([-\d.]+)/.exec(mask.getAttribute('transform'));
        maskGrab = { dx: pt.x - parseFloat(m[1]), dy: pt.y - parseFloat(m[2]) };
        A.play('tap');
      },
      onMove(pt) {
        if (!maskGrab) return;
        const x = pt.x - maskGrab.dx, y = pt.y - maskGrab.dy;
        mask.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${U.clamp((x - MASK0.x) * 0.08, -14, 14).toFixed(1)})`);
      },
      onEnd(pt) {
        if (!maskGrab) return;
        maskGrab = null;
        if (Math.hypot(pt.x - ND.x, pt.y - (ND.y - 20)) < 64) {
          maskEnding();
        } else {
          const m = /translate\(([-\d.]+),([-\d.]+)/.exec(mask.getAttribute('transform'));
          const x0 = parseFloat(m[1]), y0 = parseFloat(m[2]);
          A.play('swish');
          U.tween(420, (t) => {
            if (!alive() || st.done) return;
            mask.setAttribute('transform', `translate(${U.lerp(x0, MASK0.x, t).toFixed(1)},${U.lerp(y0, MASK0.y, t).toFixed(1)})`);
          }, U.ease.outBack);
        }
      },
      onTap() {
        maskGrab = null;
        if (ctx.locked || st.done) return;
        A.play('squeak'); U.replay(maskIn, 'hop');
        ctx.say('A cozy sleep mask. Doesn’t turn off the light… or does it?');
      },
    });

    async function maskEnding() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      mask.style.display = 'none';
      ndWear.innerHTML = `<g class="fb popin" transform="translate(0,-10) scale(.92)">${maskArt()}</g>`;
      setFace('closed', 'grin'); setArms('relax');
      A.play('pop'); U.haptic(25);
      await U.wait(280);
      A.play('boing');
      talk('Dark enough for me!', 2400);
      ctx.say('Technically… the light is still on. I’ll allow it.', 2600);
      // peaceful Z's under the blazing spotlight
      for (let i = 0; i < 3 && alive(); i++) {
        const z = U.svgEl('text', { x: ND.x + 28 + i * 10, y: ND.y - 44, 'font-family': '"Lilita One", sans-serif', 'font-size': 18 - i * 2, fill: '#fff', stroke: INK, 'stroke-width': 2.4, 'paint-order': 'stroke' }, fx);
        z.textContent = 'Z';
        U.tween(1300, (t) => {
          if (!alive()) return;
          z.setAttribute('y', (ND.y - 44 - 50 * t).toFixed(1));
          z.setAttribute('opacity', (1 - t).toFixed(2));
        }, U.ease.linear).then(() => z.remove());
        await U.wait(280);
      }
      await U.wait(700);
      if (alive()) ctx.win('mask');
    }

    /* ---------- DECOY: Useless Machine fake wall switch ---------- */
    async function fakeSwitchTap() {
      if (st.fakeBusy || st.fakeFallen || st.done) return;
      st.fakeTaps++;
      ctx.attempt();
      if (st.fakeTaps >= 3) {
        st.fakeFallen = true;
        A.play('crash'); U.haptic(45);
        decoyMsg.setAttribute('opacity', '1');
        await U.tween(620, (t) => {
          if (!alive()) return;
          fakeSwitch.setAttribute('transform', `translate(${(64 + 10 * t).toFixed(1)},${(278 + 206 * t).toFixed(1)})`);
          fakeRot.setAttribute('transform', `rotate(${(118 * t).toFixed(1)})`);
        }, U.ease.outBounce);
        ctx.say('Okay, THAT was definitely a decoy.');
        return;
      }
      st.fakeBusy = true;
      A.play('click');
      fakeToggle.setAttribute('y', '0');
      dark.setAttribute('opacity', '0.62');
      beam.setAttribute('opacity', '0.15');
      await U.wait(280);
      if (!alive() || st.done) { st.fakeBusy = false; return; }
      // cheeky mechanical finger pops out and flips it right back ON!
      hatch.setAttribute('opacity', '1');
      await U.tween(170, (t) => finger.setAttribute('transform', `translate(${(-10 * t).toFixed(1)},0)`), U.ease.outBack);
      if (!alive() || st.done) { st.fakeBusy = false; return; }
      A.play('click'); U.haptic(20);
      fakeToggle.setAttribute('y', '-11');
      dark.setAttribute('opacity', '0');
      beam.setAttribute('opacity', '1');
      await U.tween(160, (t) => finger.setAttribute('transform', `translate(${(-10 * (1 - t)).toFixed(1)},0)`));
      hatch.setAttribute('opacity', '0');
      ctx.say(st.fakeTaps === 1 ? 'Nope. It turned itself right back on.' : 'Very stubborn switch. Look somewhere else.');
      st.fakeBusy = false;
    }

    /* ---------- main animation loop: pendulum bulb, moth orbit, hold-to-smother ---------- */
    const t0 = performance.now();
    let last = t0;
    (function loop(now) {
      if (!alive()) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const t = (now - t0) / 1000;

      // bulb pendulum physics
      st.swingV += (-16 * st.swing - 3.6 * st.swingV) * dt;
      st.swing += st.swingV * dt;
      if (Math.abs(st.swing) > 0.05 || Math.abs(st.swingV) > 0.05) {
        bulbPivot.setAttribute('transform', `translate(195,-150) rotate(${st.swing.toFixed(2)})`);
      }

      if (st.lightOn) {
        // pulsing light rays
        const rs = 1 + 0.06 * Math.sin(t * 7);
        $('rays').setAttribute('transform', `scale(${rs.toFixed(3)})`);

        // moth orbiting the bulb
        const r = st.mothScared > 0 ? 78 : 42;
        if (st.mothScared > 0) st.mothScared = Math.max(0, st.mothScared - dt);
        const mx = BULB.x + Math.sin(t * 2.2) * r;
        const my = BULB.y + Math.sin(t * 4.4) * 16;
        moth.setAttribute('transform', `translate(${mx.toFixed(1)},${my.toFixed(1)}) rotate(${(Math.cos(t * 2.2) * 18).toFixed(1)})`);
      }

      // hold-to-smother on desktop (no motion sensors)
      if (hold && !st.done) {
        const held = (now - hold.t0) / 1000;
        if (I.hasMotion) {
          if (held > 0.35 && !hold.warnedSensor) {
            hold.warnedSensor = true;
            A.play('ouch'); U.haptic(50);
            burst('HOT!', BULB.x, BULB.y + 10, '#FF8FB1');
            ctx.say('Too hot to cover by hand! Flip something bigger…');
          }
        } else if (held > 0.18) {
          hold.smothering = true;
          const p = U.clamp((held - 0.18) / 1.1, 0, 1);
          dark.setAttribute('opacity', (p * 0.8).toFixed(3));
          holdRing.setAttribute('opacity', '0.9');
          holdRing.setAttribute('stroke-dashoffset', (264 * (1 - p)).toFixed(1));
          if (p >= 1) { hold = null; turnOffLights('flip', 'hold'); }
        }
      }

      if (!st.done && now - st.lastTouch > 8000) {
        st.lastTouch = now;
        ctx.say(U.pick([
          'Psst… the switch is behind something you never touch.',
          'The game is called BrainFLIP…',
          'Stuck? The bulb up top can help.',
        ]));
      }
      requestAnimationFrame(loop);
    })(t0);
    svg.addEventListener('pointerdown', () => { st.lastTouch = performance.now(); });

    /* ---------- reactions (no dead taps!) ---------- */
    const complaints = ['MY EYES! Turn it OFF!', 'It’s 3 AM!', 'I can see through my eyelids!', 'Too bright!!'];
    const taps = {
      realSwitch() {
        if (!isSwitchUncovered()) return;
        turnOffLights('switch', 'tap');
      },
      fakeSwitch: fakeSwitchTap,
      bulb() {
        st.swingV += (Math.random() < 0.5 ? 1 : -1) * 32;
        A.play('ouch'); U.haptic(45);
        burst('HOT!', BULB.x, BULB.y + 10, '#FF8FB1');
        ctx.say(I.hasMotion ? 'OW! Way too hot to touch!' : 'OW! Hot! (Unless you really hold it down…)');
        ctx.attempt();
      },
      moth() {
        st.mothScared = 1.6;
        A.play('squeak');
        ctx.say('Moth says: “LÄMP! Don’t you dare turn it off!”');
        ctx.attempt();
      },
      noodle() {
        const n = count('noodle');
        A.play('wobble'); U.replay(ndBoil, 'wiggle');
        talk(complaints[(n - 1) % complaints.length]);
        ctx.attempt();
      },
      window() { A.play('tap'); ctx.say('It’s already night outside! The sun isn’t the problem this time.'); ctx.attempt(); },
      poster(node) { A.play('wobble'); U.replay(node, 'wiggle'); ctx.say('$999 electric bill?! Hurry up and turn it off!'); ctx.attempt(); },
      stars() { A.play('tap'); ctx.say('Glow-in-the-dark stickers. Way too bright to see them.'); },
      outlet() { A.play('bonk'); ctx.say('Super-glued in. And that’s just the toaster.'); ctx.attempt(); },
      chair() { A.play('tap'); ctx.say('Comfy chair, blinding room.'); ctx.attempt(); },
      nightstand() { A.play('tap'); ctx.say('Just bedtime stuff.'); ctx.attempt(); },
      water() { A.play('squeak'); ctx.say('Water and electricity? Bad idea.'); ctx.attempt(); },
      rug() { A.play('tap'); ctx.say('Nothing hidden under the rug.'); ctx.attempt(); },
      wall() { A.play('bonk'); ctx.say(U.pick(['Nope.', 'Think outside the screen.', 'Look behind what you never touch.'])); ctx.attempt(); },
      floor() { taps.wall(); },
    };
    I.taps(svg, (name, node) => { if (ctx.locked || st.done) return; if (taps[name]) taps[name](node); });
  }

  BF.levels = BF.levels || {};
  BF.levels[4] = L;
})(window.BF);
