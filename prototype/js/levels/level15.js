/* Brainflip — Level 15 (CHAPTER 1 FINALE BOSS): "BOSS: Rescue Noodle!"
   The smug Pink Brain Narrator has turned Noodle's living room into a maximum-security
   cartoon fortress, trapping Noodle in a laser-guarded glass cage and confiscating Chapter 1 tools!

   ALL 3 ENDINGS ARE MULTI-STEP CHAPTER 1 FINALE CHAINS:
   Main (4 steps)     — System Shutdown (MASTERMIND!):
     1. Unscrew both bolts on the ⚡ POWER breaker box (Lv5 callback)
     2. Flip the Master Breaker OFF to shut down the lasers & shatter the Boss's shield (Lv4 callback)
     3. Shake the phone (or wiggle the Boss's hanging chain fast / dev key S) to drop his Golden Key (Lv1 callback)
     4. Drag the Golden Key to Noodle's cage padlock to free him!

   Secret #1 (3 steps) — Brainflipped! (BRAINFLIPPED! — Title Drop):
     1. Drag the "BOSS: Rescue Noodle!" prompt banner down over the live CCTV Camera to blind it (Lv4 callback)
     2. Slide aside the crooked "THE GREAT BRAIN" portrait & flip the hidden GRAVITY LOCK to UNLOCKED
     3. Turn the phone 180° UPSIDE DOWN (or tap/flip the unlocked Gravity badge / dev key U) to flip the Brain Boss!

   Secret #2 (3 steps) — Spicy KO! (SPICY KO!):
     1. Tap the top-left HUD Sound button (or Volume Down / dev key M) to silence the Boss's Sonic Lock (Lv8 callback)
     2. Slide/tap open the overhead Air Vent connected directly into the Boss's shield bubble
     3. Drag the confiscated X-TRA HOT Pepper shaker over the open vent and shake/wiggle it 3 times! (Lv7 callback) */
(function (BF) {
  'use strict';
  const U = BF.U, A = BF.audio, I = BF.input, ART = BF.art;
  const INK = '#1B1B2F', YELLOW = '#FFC93C', PINK = '#FF5D8F', MINT = '#3DDC97', SKY = '#5BC0EB', ORANGE = '#FF6B35', RED = '#FF5964';
  const W = 'stroke-linecap="round" stroke-linejoin="round"';
  const S = `stroke="${INK}" stroke-width="3.4" ${W}`;

  const BOX = { x: 64, y: 120 };
  const CCTV = { x: 162, y: 56 };
  const VENT = { x: 256, y: 172 };
  const PORT = { x: 334, y: 112 };
  const PERCH = { x: 204, y: 126 };
  const CAGE = { x: 84, y: 394 };
  const PADLOCK = { x: 132, y: 410 };
  const BOSS0 = { x: 236, y: 318 };
  const PEP0 = { x: 344, y: 351 };
  const KEY_FLOOR = { x: 204, y: 492 };

  function crownSVG() {
    return `<path d="M-15,0 L-19,-15 L-7,-6 L0,-18 L7,-6 L19,-15 L15,0 Z" fill="${YELLOW}" stroke="${INK}" stroke-width="2.6" ${W}/>
      <circle cx="0" cy="-8" r="2.2" fill="${PINK}"/><circle cx="-10" cy="-4" r="1.8" fill="${SKY}"/><circle cx="10" cy="-4" r="1.8" fill="${MINT}"/>`;
  }

  function keySVG() {
    return `
      <circle r="26" fill="#000" fill-opacity="0" pointer-events="all"/>
      <g transform="rotate(-24)">
        <circle cx="-11" cy="0" r="9.5" fill="${YELLOW}" stroke="${INK}" stroke-width="3"/>
        <circle cx="-11" cy="0" r="3.4" fill="#2A2754" stroke="${INK}" stroke-width="2"/>
        <path d="M-1,0 H19 M11,0 V8 M17,0 V6" fill="none" stroke="${INK}" stroke-width="6.5" ${W}/>
        <path d="M-1,0 H19 M11,0 V8 M17,0 V6" fill="none" stroke="${YELLOW}" stroke-width="3" ${W}/>
      </g>`;
  }

  function screwSVG() {
    return `<circle r="20" fill="#000" fill-opacity="0" pointer-events="all"/>
      <circle r="7.5" fill="#D5DEE8" stroke="${INK}" stroke-width="2.6"/>
      <path d="M-4,-4 L4,4" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`;
  }

  function superPepperSVG() {
    return `
      <circle cx="0" cy="0" r="28" fill="#000" fill-opacity="0"/>
      <path d="M-10,-13 C-10,-22 10,-22 10,-13 Z" fill="#D5DEE8" stroke="${INK}" stroke-width="2.6" ${W}/>
      <rect x="-12" y="-14" width="24" height="5" rx="2" fill="#B8C4D4" stroke="${INK}" stroke-width="2.2"/>
      <path d="M-11,-9 L-13,18 Q-13,23 -7,23 H7 Q13,23 13,18 L11,-9 Z" fill="${RED}" ${S}/>
      <circle cx="0" cy="7" r="8.5" fill="${YELLOW}" stroke="${INK}" stroke-width="2.2"/>
      <text x="0" y="10.5" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="11" fill="${INK}">HOT</text>`;
  }

  function bossBrainSVG(mood = 'smug', muted = false) {
    const face = mood === 'panic'
      ? `<circle cx="-11" cy="2" r="7.5" fill="#fff" stroke="${INK}" stroke-width="2.5"/><circle id="l15-eye-l" cx="-11" cy="2" r="2.6" fill="${INK}"/>` +
        `<circle cx="11" cy="2" r="7.5" fill="#fff" stroke="${INK}" stroke-width="2.5"/><circle id="l15-eye-r" cx="11" cy="2" r="2.6" fill="${INK}"/>` +
        (muted
          ? `<rect x="-13" y="12" width="26" height="8" rx="3" fill="#B8C4D4" stroke="${INK}" stroke-width="2.2"/><path d="M-8,12 V20 M0,12 V20 M8,12 V20" stroke="${INK}" stroke-width="1.8"/>`
          : `<ellipse cx="0" cy="17" rx="6" ry="8" fill="${INK}"/>`)
      : mood === 'ko'
        ? `<path d="M-16,-2 L-6,6 M-6,-2 L-16,6 M6,-2 L16,6 M16,-2 L6,6" stroke="${INK}" stroke-width="3" ${W}/>` +
          `<path d="M-9,16 Q0,10 9,16" fill="none" stroke="${INK}" stroke-width="2.8" ${W}/>`
        : `<circle cx="-11" cy="3" r="6.5" fill="#fff" stroke="${INK}" stroke-width="2.4"/><circle id="l15-eye-l" cx="-11" cy="3" r="2.8" fill="${INK}"/>` +
          `<circle cx="11" cy="3" r="6.5" fill="#fff" stroke="${INK}" stroke-width="2.4"/><circle id="l15-eye-r" cx="11" cy="3" r="2.8" fill="${INK}"/>` +
          `<path d="M-19,-6 L-5,-2 M19,-6 L5,-2" stroke="${INK}" stroke-width="3" ${W}/>` +
          (muted
            ? `<rect x="-13" y="12" width="26" height="8" rx="3" fill="#B8C4D4" stroke="${INK}" stroke-width="2.2"/><path d="M-8,12 V20 M0,12 V20 M8,12 V20" stroke="${INK}" stroke-width="1.8"/>`
            : `<path d="M-9,15 Q2,22 12,12" fill="none" stroke="${INK}" stroke-width="3" ${W}/>`);
    return `
      <circle r="44" fill="#000" fill-opacity="0" pointer-events="all"/>
      <path d="M-22,12 L-34,38 Q0,46 34,38 L22,12 Z" fill="#6C3483" stroke="${INK}" stroke-width="3" ${W}/>
      <path d="M-28,16 C-41,12 -41,-7 -30,-12 C-34,-26 -18,-35 -8,-28 C-2,-38 17,-36 19,-24 C33,-26 39,-10 30,-2 C41,6 34,22 20,22 C16,32 -2,34 -7,24 C-17,30 -28,26 -28,16 Z"
            fill="#FF8FB1" stroke="${INK}" stroke-width="3.4" ${W}/>
      <path d="M-13,-18 Q-5,-10 -13,-2 M10,-20 Q18,-12 12,-4" fill="none" stroke="${INK}" stroke-width="2" ${W} opacity=".45"/>
      ${face}
      <g id="l15-boss-crown" transform="translate(1,-31) rotate(6)">${crownSVG()}</g>`;
  }

  function sceneSVG() {
    return `
<svg viewBox="0 0 390 630" xmlns="http://www.w3.org/2000/svg" aria-label="Chapter 1 Boss Vault: The Narrator Brain has locked Noodle in a laser glass cage inside his hijacked living room">
  <defs>
    <pattern id="l15-wall" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M16,8 L22,16 L16,24 L10,16 Z" fill="#37336B" opacity=".7"/>
    </pattern>
    <radialGradient id="l15-shield-g" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#D7F4FF" stop-opacity=".46"/>
      <stop offset="70%" stop-color="#5BC0EB" stop-opacity=".22"/>
      <stop offset="100%" stop-color="#5BC0EB" stop-opacity=".55"/>
    </radialGradient>
    <clipPath id="l15-case-clip"><rect x="308" y="266" width="68" height="172" rx="5"/></clipPath>
  </defs>

  <g id="l15-world">
    <!-- hijacked royal-purple villain living room wall + wood floor (full bleed) -->
    <rect data-tap="wall" x="-30" y="-200" width="450" height="692" fill="#2A2754"/>
    <rect x="-30" y="-200" width="450" height="692" fill="url(#l15-wall)" pointer-events="none"/>
    <rect id="l15-power-tint" x="-30" y="-200" width="450" height="1130" fill="${RED}" opacity="0" pointer-events="none"/>

    <rect data-tap="floor" x="-30" y="490" width="450" height="440" fill="#B57A4A"/>
    <path d="M-30,536 H420 M-30,582 H420 M-30,628 H420 M-30,674 H420 M-30,720 H420 M82,490 V536 M246,536 V582 M130,582 V628 M312,490 V536" stroke="#8A5730" stroke-width="2.6" pointer-events="none"/>
    <rect x="-30" y="484" width="450" height="12" fill="#DCE2F2" ${S}/>

    <!-- royal villain arena rug -->
    <g data-tap="rug">
      <ellipse cx="195" cy="548" rx="142" ry="24" fill="${PINK}" ${S}/>
      <ellipse cx="195" cy="548" rx="118" ry="15" fill="none" stroke="${YELLOW}" stroke-width="3" stroke-dasharray="8 8"/>
    </g>

    <!-- ============ VISIBLE POWER CONDUITS (Visual clue tracing Breaker Box -> Lasers & Shield!) ============ -->
    <g id="l15-pipes" pointer-events="none">
      <!-- breaker -> cage lasers -->
      <path d="M64,166 V278" stroke="${INK}" stroke-width="9" ${W}/>
      <path id="l15-pipe-laser" d="M64,166 V278" stroke="${RED}" stroke-width="4" stroke-dasharray="8 6" ${W}/>
      <!-- breaker -> boss shield generator -->
      <path d="M102,126 H134 V246 H236 V256" fill="none" stroke="${INK}" stroke-width="9" ${W}/>
      <path id="l15-pipe-shield" d="M102,126 H134 V246 H236 V256" fill="none" stroke="${SKY}" stroke-width="4" stroke-dasharray="8 6" ${W}/>
      <!-- speaker sonic cable -> confiscated display case -->
      <path d="M276,458 H344 V444" fill="none" stroke="${INK}" stroke-width="8" ${W}/>
      <path id="l15-pipe-sonic" d="M276,458 H344 V444" fill="none" stroke="${PINK}" stroke-width="3.6" stroke-dasharray="6 6" ${W}/>
      <!-- air vent duct -> straight into Boss's shield bubble! -->
      <rect x="236" y="186" width="40" height="72" fill="#6E7891" stroke="${INK}" stroke-width="3"/>
      <path d="M244,192 V252 M268,192 V252" stroke="#9AA5B8" stroke-width="3" opacity=".6"/>
    </g>

    <!-- ============ 1. SECURITY BREAKER BOX (Upper-Left — Ending 1 Steps 1 & 2!) ============ -->
    <g id="l15-box" transform="translate(${BOX.x},${BOX.y})">
      <!-- recessed panel interior (visible once door swings open) -->
      <rect x="-36" y="-42" width="72" height="84" rx="8" fill="#1C1E38" ${S}/>
      <text x="0" y="-24" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="9.5" fill="${YELLOW}">MASTER</text>
      <!-- Master Breaker Switch -->
      <g id="l15-breaker" data-tap="breaker" style="cursor:pointer;pointer-events:none">
        <circle r="28" fill="#000" fill-opacity="0" pointer-events="all"/>
        <rect x="-14" y="-14" width="28" height="44" rx="6" fill="#32355C" stroke="${INK}" stroke-width="2.6"/>
        <rect id="l15-brk-lever" x="-11" y="-12" width="22" height="20" rx="4" fill="${MINT}" stroke="${INK}" stroke-width="2.6"/>
        <text id="l15-brk-txt" x="0" y="24" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="9" fill="#fff">ON</text>
      </g>
      <!-- bolted steel door (swings aside after unscrewing both bolts!) -->
      <g id="l15-box-door">
        <rect data-tap="boxDoor" x="-36" y="-42" width="72" height="84" rx="8" fill="#8D99AE" ${S} style="cursor:pointer"/>
        <rect x="-28" y="-14" width="56" height="28" rx="5" fill="${YELLOW}" stroke="${INK}" stroke-width="2.4" pointer-events="none"/>
        <path d="M-21,-7 L-15,-7 L-19,0 L-15,0 L-22,8 L-18,1 L-22,1 Z" fill="${RED}" stroke="${INK}" stroke-width="1.4" ${W} pointer-events="none"/>
        <text x="6" y="4.5" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="11.5" fill="${INK}" pointer-events="none">POWER</text>
        <g id="l15-screw-1" transform="translate(-26,-32)" data-tap="screw1" style="cursor:pointer">${screwSVG()}</g>
        <g id="l15-screw-2" transform="translate(26,32)" data-tap="screw2" style="cursor:pointer">${screwSVG()}</g>
      </g>
    </g>

    <!-- ============ 2. LIVE TRACKING SECURITY CAMERA (Top-Center — Ending 2 Step 1!) ============ -->
    <g id="l15-cctv" transform="translate(${CCTV.x},${CCTV.y})">
      <!-- translucent vision cone -->
      <polygon id="l15-cam-cone" points="0,8 -64,132 64,132" fill="${RED}" opacity=".14" pointer-events="none"/>
      <g id="l15-cam-head" data-tap="camera" style="cursor:pointer">
        <circle r="28" fill="#000" fill-opacity="0" pointer-events="all"/>
        <path d="M0,-24 V-8" stroke="${INK}" stroke-width="5" ${W}/>
        <rect x="-24" y="-10" width="48" height="24" rx="8" fill="#EEF2F8" ${S}/>
        <circle cx="0" cy="2" r="8.5" fill="#23254A" stroke="${INK}" stroke-width="2.4"/>
        <circle id="l15-cam-pupil" cx="0" cy="2" r="3.4" fill="${RED}"/>
        <circle id="l15-cam-rec" cx="15" cy="-3" r="3" fill="${RED}"/>
      </g>
      <text id="l15-cam-stat" x="0" y="28" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="9.5" fill="${RED}" stroke="${INK}" stroke-width="2.4" paint-order="stroke">REC ●</text>
    </g>

    <!-- ============ 3. HANGING CEILING CHAIN/RING (Boss panic perch when Shield fails — Ending 1 Step 3!) ============ -->
    <g id="l15-perch-pivot" transform="translate(${PERCH.x},86)">
      <g id="l15-perch" class="grabbable" style="cursor:grab">
        <rect x="-44" y="0" width="88" height="88" fill="#000" fill-opacity="0" pointer-events="all"/>
        <path d="M0,-90 V52" stroke="${INK}" stroke-width="4.5" stroke-dasharray="8 4" ${W}/>
        <path d="M-28,58 Q0,74 28,58" fill="none" stroke="${INK}" stroke-width="8" ${W}/>
        <path d="M-28,58 Q0,74 28,58" fill="none" stroke="${YELLOW}" stroke-width="4" ${W}/>
        <circle cx="-28" cy="54" r="5" fill="#FFF7B0" stroke="${INK}" stroke-width="2.2"/>
        <circle cx="28" cy="54" r="5" fill="#FFF7B0" stroke="${INK}" stroke-width="2.2"/>
      </g>
    </g>

    <!-- ============ 4. OVERHEAD AIR VENT (Leads into Boss's shield — Ending 3 Step 2!) ============ -->
    <g id="l15-vent-wrap" transform="translate(${VENT.x},${VENT.y})">
      <!-- open dark air duct inside -->
      <rect x="-30" y="-17" width="60" height="34" rx="5" fill="#171933" stroke="${INK}" stroke-width="3"/>
      <path d="M-12,-4 L0,9 L12,-4" fill="none" stroke="${MINT}" stroke-width="3" opacity=".75" ${W}/>
      <!-- slidable/tappable metal grate cover -->
      <g id="l15-vent-grate" class="grabbable" style="cursor:grab">
        <rect x="-36" y="-24" width="72" height="48" fill="#000" fill-opacity="0" pointer-events="all"/>
        <rect x="-32" y="-19" width="64" height="38" rx="6" fill="#C4CEDC" ${S}/>
        <path d="M-22,-9 H22 M-22,0 H22 M-22,9 H22" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
        <circle cx="24" cy="0" r="3.5" fill="${YELLOW}" stroke="${INK}" stroke-width="1.8"/>
      </g>
    </g>

    <!-- ============ 5. HIDDEN GRAVITY LOCK + BOSS EGO PORTRAIT (Top-Right — Ending 2 Steps 2 & 3!) ============ -->
    <g id="l15-grav-wrap" transform="translate(${PORT.x},${PORT.y})">
      <!-- hidden wall panel behind portrait -->
      <rect x="-34" y="-42" width="68" height="84" rx="8" fill="#1D2042" ${S}/>
      <text x="0" y="-24" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="9.5" fill="${SKY}">GRAVITY</text>
      <g id="l15-grav-sw" data-tap="gravSw" style="cursor:pointer;pointer-events:none">
        <circle r="28" fill="#000" fill-opacity="0" pointer-events="all"/>
        <rect id="l15-grav-pill" x="-26" y="-12" width="52" height="24" rx="12" fill="${RED}" stroke="${INK}" stroke-width="2.6"/>
        <text id="l15-grav-txt" x="0" y="4" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="10" fill="#fff">LOCKED</text>
      </g>
      <!-- desktop-friendly Flip 180° trigger (appears ONLY once GRAVITY is UNLOCKED!) -->
      <g id="l15-grav-flip" data-tap="gravFlip" transform="translate(0,26)" opacity="0" style="pointer-events:none;cursor:pointer">
        <rect x="-26" y="-11" width="52" height="22" rx="11" fill="${YELLOW}" stroke="${INK}" stroke-width="2.4"/>
        <text x="0" y="3.5" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="9.5" fill="${INK}">FLIP 180°</text>
      </g>
    </g>
    <!-- draggable crooked ego portrait covering the Gravity Lock -->
    <g id="l15-portrait" class="grabbable" transform="translate(${PORT.x},${PORT.y}) rotate(3)" style="cursor:grab">
      <g id="l15-port-in" class="fb">
        <rect x="-42" y="-50" width="84" height="100" fill="#000" fill-opacity="0" pointer-events="all"/>
        <rect x="-38" y="-46" width="76" height="92" rx="7" fill="${YELLOW}" ${S}/>
        <rect x="-30" y="-38" width="60" height="62" rx="4" fill="#3B3573" stroke="${INK}" stroke-width="2.4"/>
        <g transform="translate(0,-6) scale(.46)">${bossBrainSVG('smug')}</g>
        <text x="0" y="37" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="9" fill="${INK}">GREAT BRAIN</text>
      </g>
    </g>

    <!-- ============ 6. CONFISCATED CHAPTER-1 VAULT CABINET (Bottom-Right — Ending 3 Steps 1 & 3!) ============ -->
    <g id="l15-cabinet">
      <rect x="302" y="246" width="80" height="198" rx="8" fill="#3E436E" ${S}/>
      <rect x="308" y="250" width="68" height="16" rx="4" fill="${RED}" stroke="${INK}" stroke-width="2"/>
      <text x="342" y="261.5" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="8.2" fill="#fff">CONFISCATED</text>
      <!-- cabinet interior shelves -->
      <rect x="308" y="266" width="68" height="172" rx="5" fill="#23254A" stroke="${INK}" stroke-width="2.4"/>
      <path d="M308,320 H376 M308,376 H376" stroke="#5A608F" stroke-width="4"/>

      <!-- Shelf 1: Mini Cookie Jar (Lv5 cameo!) -->
      <g transform="translate(342,298)"><g id="l15-cameo-cookie" data-tap="cameoCookie" class="fb" style="cursor:pointer">
        <rect x="-15" y="-14" width="30" height="30" rx="7" fill="#D7F4FF" stroke="${INK}" stroke-width="2.4"/>
        <rect x="-13" y="-19" width="26" height="7" rx="3" fill="${PINK}" stroke="${INK}" stroke-width="2"/>
        <circle cx="-5" cy="4" r="5" fill="#E69B49" stroke="${INK}" stroke-width="1.6"/>
        <circle cx="6" cy="5" r="5" fill="#E69B49" stroke="${INK}" stroke-width="1.6"/>
        <circle cx="0" cy="-3" r="4.5" fill="#E69B49" stroke="${INK}" stroke-width="1.6"/>
      </g></g>

      <!-- Shelf 3: Mini Pickle Jar (Lv13 cameo!) -->
      <g transform="translate(342,410)"><g id="l15-cameo-pickle" data-tap="cameoPickle" class="fb" style="cursor:pointer">
        <rect x="-15" y="-16" width="30" height="32" rx="7" fill="#B6F0C5" stroke="${INK}" stroke-width="2.4"/>
        <rect x="-13" y="-21" width="26" height="7" rx="3" fill="${RED}" stroke="${INK}" stroke-width="2"/>
        <rect x="-7" y="-8" width="6" height="18" rx="3" fill="#46B862" stroke="${INK}" stroke-width="1.6"/>
        <rect x="1" y="-6" width="6" height="16" rx="3" fill="#46B862" stroke="${INK}" stroke-width="1.6"/>
      </g></g>

      <!-- Sliding Glass Door + SONIC LOCK overlay (slides away when HUD Sound is muted!) -->
      <g id="l15-pepper" class="grabbable" transform="translate(${PEP0.x},${PEP0.y})" style="pointer-events:none;cursor:grab">
        <g id="l15-pepper-in" class="fb">${superPepperSVG()}</g>
      </g>
      <g id="l15-case-glass" data-tap="caseGlass" style="cursor:pointer">
        <rect x="308" y="266" width="68" height="172" rx="5" fill="#9CE0FF" fill-opacity=".26" stroke="${INK}" stroke-width="2.6"/>
        <path d="M316,304 L344,274 M318,324 L360,280" stroke="#fff" stroke-width="3" opacity=".38" stroke-linecap="round"/>
        <g id="l15-sonic-badge" transform="translate(342,320)">
          <rect x="-28" y="-14" width="56" height="28" rx="7" fill="${PINK}" stroke="${INK}" stroke-width="2.4"/>
          <text x="0" y="-1.5" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="8.8" fill="#fff">SONIC</text>
          <text x="0" y="9.5" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="8.8" fill="${YELLOW}">LOCKED</text>
        </g>
      </g>
    </g>

    <!-- ============ 7. NOODLE TRAPPED IN LASER-GUARDED GLASS CAGE (Bottom-Left) ============ -->
    <g id="l15-cage-wrap" transform="translate(${CAGE.x},${CAGE.y})">
      <!-- Noodle inside cage -->
      <g id="l15-noodle-in" transform="translate(0,12)">
        <g id="l15-nd-anim" class="boil fb" data-tap="noodle" style="cursor:pointer">
          <g>${ART.noodleLegs(YELLOW)}</g>
          <g>${ART.noodleBody({ color: YELLOW })}</g>
          <g id="l15-nd-arms">${ART.noodleArms('hug', YELLOW)}</g>
          <g id="l15-nd-face" transform="translate(0,-14)">${ART.noodleFace({ eyes: 'wide', mouth: 'frown' })}</g>
          <g id="l15-nd-crown" transform="translate(0,-62)" opacity="0">${crownSVG()}</g>
        </g>
      </g>
      <!-- transparent cylindrical glass cage -->
      <g id="l15-glass-dome" data-tap="cage" style="cursor:pointer">
        <path d="M-54,88 V-72 C-54,-116 54,-116 54,-72 V88 Z" fill="#D7F4FF" fill-opacity=".26" stroke="${INK}" stroke-width="3.6"/>
        <path d="M-40,-66 V70" stroke="#fff" stroke-width="5" opacity=".45" stroke-linecap="round"/>
        <rect x="-60" y="82" width="120" height="14" rx="6" fill="#6E7891" ${S}/>
        <rect x="-24" y="-110" width="48" height="12" rx="5" fill="#6E7891" ${S}/>
      </g>
      <!-- glowing RED LASER BARS across cage (vanish when Master Breaker is OFF!) -->
      <g id="l15-lasers" pointer-events="none">
        <path d="M-52,-44 H52 M-52,4 H52 M-52,52 H52" stroke="${RED}" stroke-width="5.5" opacity=".9"/>
        <path d="M-52,-44 H52 M-52,4 H52 M-52,52 H52" stroke="#FFD6DE" stroke-width="2" opacity=".95"/>
      </g>
    </g>
    <!-- heavy steel padlock on cage door -->
    <g id="l15-padlock" transform="translate(${PADLOCK.x},${PADLOCK.y})">
      <g id="l15-padlock-in" data-tap="padlock" class="fb" style="cursor:pointer">
        <circle r="24" fill="#000" fill-opacity="0" pointer-events="all"/>
        <path d="M-8,-6 V-14 A8,8 0 0,1 8,-14 V-6" fill="none" stroke="#D5DEE8" stroke-width="5" ${W}/>
        <path d="M-8,-6 V-14 A8,8 0 0,1 8,-14 V-6" fill="none" stroke="${INK}" stroke-width="2.2" ${W}/>
        <rect x="-14" y="-6" width="28" height="24" rx="6" fill="${YELLOW}" ${S}/>
        <circle cx="0" cy="4" r="3.4" fill="${INK}"/>
        <path d="M0,5 V12" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
      </g>
    </g>

    <!-- ============ 8. VILLAIN LOUDSPEAKER BASE + BOSS BRAIN IN ENERGY SHIELD ============ -->
    <!-- blasting loudspeaker underneath Boss -->
    <g id="l15-speaker" transform="translate(236,456)">
      <g id="l15-spk-in" data-tap="speaker" class="fb" style="cursor:pointer">
        <rect x="-36" y="-22" width="72" height="48" rx="10" fill="#32355C" ${S}/>
        <circle cx="0" cy="2" r="16" fill="#23254A" stroke="${INK}" stroke-width="2.6"/>
        <circle cx="0" cy="2" r="9" fill="${PINK}" stroke="${INK}" stroke-width="2"/>
        <circle cx="0" cy="2" r="3" fill="${INK}"/>
      </g>
      <!-- animated sonic wave arcs (disappear when muted!) -->
      <g id="l15-sound-waves" pointer-events="none" stroke="${PINK}" stroke-width="3" fill="none" ${W}>
        <path d="M40,-10 Q52,2 40,14 M48,-18 Q64,2 48,22"/>
        <path d="M-40,-10 Q-52,2 -40,14"/>
      </g>
    </g>

    <!-- BOSS BRAIN + HELD GOLDEN KEY + ENERGY SHIELD BUBBLE -->
    <g id="l15-boss-wrap" transform="translate(${BOSS0.x},${BOSS0.y})">
      <g id="l15-boss-in" data-tap="boss" class="boil fb" style="cursor:pointer">
        ${bossBrainSVG('smug', false)}
      </g>
      <!-- gleaming Golden Cage Key clutched by the Boss! -->
      <g id="l15-held-key" transform="translate(-34,20) scale(.85)" pointer-events="none">${keySVG()}</g>
      <!-- translucent glowing energy shield bubble (shatters when Master Breaker is OFF or Spicy Sneeze!) -->
      <g id="l15-shield" pointer-events="none">
        <circle r="64" fill="url(#l15-shield-g)" stroke="${SKY}" stroke-width="3.6" stroke-dasharray="10 6"/>
        <path d="M-42,-36 Q-24,-52 -4,-48" fill="none" stroke="#fff" stroke-width="4" opacity=".65" stroke-linecap="round"/>
      </g>
    </g>

    <!-- ============ FOREGROUND DRAGGABLE WEAPONS & ITEMS ============ -->
    <!-- Dropped Golden Key (appears on floor after shaking unshielded Boss!) -->
    <g id="l15-drop-key" class="grabbable" transform="translate(${KEY_FLOOR.x},${KEY_FLOOR.y})" opacity="0" style="pointer-events:none;cursor:grab">
      <g id="l15-key-in" class="fb">${keySVG()}</g>
    </g>

    <!-- FX & speech bubble layers -->
    <g id="l15-fx" pointer-events="none"></g>
    <g id="l15-talk" pointer-events="none"></g>
  </g>
</svg>`;
  }

  Object.assign(ART.stickers, {
    l15master: (uid = 'a') => ART.stickerFrame('#7FF0BD',
      `<g transform="translate(-26,-16) scale(.85)">${keySVG()}</g>` +
      `<g transform="translate(24,-22) scale(.42)">${bossBrainSVG('ko')}</g>` +
      ART.noodle({ x: 6, y: 24, scale: .56, eyes: 'happy', mouth: 'grin', armType: 'up', extra: `<g transform="translate(0,-62)">${crownSVG()}</g>` }), 'l15ms' + uid),
    l15flip: (uid = 'a') => ART.stickerFrame('#FFD66B',
      `<g transform="translate(0,-6) rotate(180) scale(.62)">${bossBrainSVG('panic')}</g>` +
      `<text x="-34" y="34" font-family="Lilita One, sans-serif" font-size="22" fill="${PINK}" stroke="${INK}" stroke-width="2">?</text>` +
      `<text x="32" y="32" font-family="Lilita One, sans-serif" font-size="22" fill="${SKY}" stroke="${INK}" stroke-width="2">!</text>`, 'l15bf' + uid),
    l15spicy: (uid = 'a') => ART.stickerFrame('#FF8FB1',
      `<g transform="translate(-26,-20) rotate(148) scale(.8)">${superPepperSVG()}</g>` +
      `<g transform="translate(18,10) scale(.56)">${bossBrainSVG('panic')}</g>` +
      `<text x="0" y="42" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="16" fill="${YELLOW}" stroke="${INK}" stroke-width="3" paint-order="stroke">ACHOOO!</text>`, 'l15sp' + uid),
  });

  const L = {
    id: 15,
    promptHTML: 'BOSS: <span class="pw" id="pw-rescue">Rescue Noodle</span>!',
    endings: [
      { id: 'mastermind', name: 'System Shutdown', line: 'Unscrewed, blacked out, shaken down, and unlocked!', rarity: 38, icon: 'l15master', stamp: 'MASTERMIND!' },
      { id: 'brainflip', name: 'Brainflipped!', line: 'Blinded the camera, unlocked gravity, and flipped the Brain!', rarity: 20, icon: 'l15flip', stamp: 'BRAINFLIPPED!' },
      { id: 'spicy', name: 'Spicy KO!', line: 'Muted his lock, opened his vent, sneezed him out of his own shield!', rarity: 14, icon: 'l15spicy', stamp: 'SPICY KO!' },
    ],
    hints(found) {
      if (!found.includes('mastermind')) return [
        { text: 'Trace the wires from the ⚡ POWER box on the top-left wall — it feeds the lasers AND the Boss’s shield.' },
        { text: '1) Unscrew both bolts on ⚡ POWER → 2) Flip Master Breaker OFF → 3) Shake phone (or wiggle his hanging perch) → 4) Drag the Golden Key to Noodle’s padlock!', demo: 'box' },
      ];
      if (!found.includes('brainflip')) return [
        { text: 'Something is hidden behind the “GREAT BRAIN” portrait, but the CCTV camera catches you if it can see!' },
        { text: '1) Drag the “BOSS: Rescue Noodle!” banner onto the CCTV camera → 2) Drag the portrait aside & tap GRAVITY LOCK → 3) Flip phone 180° upside down (or tap FLIP 180°)!', demo: 'blindCam' },
      ];
      if (!found.includes('spicy')) return [
        { text: 'The CONFISCATED cabinet has a SONIC LOCK powered by the Boss’s loudspeaker, and an Air Vent runs right into his shield!' },
        { text: '1) Tap the top-left Sound button to mute the Boss → 2) Open the Air Vent above his shield → 3) Drag HOT pepper over the vent & shake/wiggle it!', demo: 'spicyPath' },
      ];
      return [{ text: 'ALL 3 CHAPTER 1 BOSS ENDINGS CONQUERED! You beat Brainflip Chapter 1!' }];
    },
    demo(kind) {
      if (kind === 'box') return [{ x: BOX.x - 26, y: BOX.y - 32 }, { x: BOX.x + 26, y: BOX.y + 32 }];
      if (kind === 'blindCam') return [{ x: 195, y: -32 }, { x: CCTV.x, y: CCTV.y }];
      if (kind === 'spicyPath') return [{ x: PEP0.x, y: PEP0.y }, { x: VENT.x, y: VENT.y - 26 }, { x: VENT.x + 26, y: VENT.y - 26 }];
      return null;
    },
    build,
  };

  function build(ctx) {
    ctx.root.innerHTML = sceneSVG();
    const svg = ctx.root.querySelector('svg');
    const q = (s) => svg.querySelector(s);

    const world = q('#l15-world'), powerTint = q('#l15-power-tint');
    const ndAnim = q('#l15-nd-anim'), ndFace = q('#l15-nd-face'), ndArms = q('#l15-nd-arms'), ndCrown = q('#l15-nd-crown');
    const glassDome = q('#l15-glass-dome'), lasers = q('#l15-lasers'), padlock = q('#l15-padlock'), padlockIn = q('#l15-padlock-in');
    const bossWrap = q('#l15-boss-wrap'), bossIn = q('#l15-boss-in'), heldKey = q('#l15-held-key'), shield = q('#l15-shield');
    const boxDoor = q('#l15-box-door'), screw1 = q('#l15-screw-1'), screw2 = q('#l15-screw-2');
    const breaker = q('#l15-breaker'), brkLever = q('#l15-brk-lever'), brkTxt = q('#l15-brk-txt');
    const pipeLaser = q('#l15-pipe-laser'), pipeShield = q('#l15-pipe-shield'), pipeSonic = q('#l15-pipe-sonic');
    const camCone = q('#l15-cam-cone'), camPupil = q('#l15-cam-pupil'), camRec = q('#l15-cam-rec'), camStat = q('#l15-cam-stat');
    const perchPivot = q('#l15-perch-pivot'), perchEl = q('#l15-perch');
    const ventGrate = q('#l15-vent-grate');
    const portrait = q('#l15-portrait'), portIn = q('#l15-port-in'), gravSw = q('#l15-grav-sw'), gravPill = q('#l15-grav-pill'), gravTxt = q('#l15-grav-txt'), gravFlip = q('#l15-grav-flip');
    const caseGlass = q('#l15-case-glass'), sonicBadge = q('#l15-sonic-badge'), soundWaves = q('#l15-sound-waves'), spkIn = q('#l15-spk-in');
    const pepperEl = q('#l15-pepper'), pepperIn = q('#l15-pepper-in');
    const dropKey = q('#l15-drop-key'), keyIn = q('#l15-key-in');
    const fx = q('#l15-fx'), talkLayer = q('#l15-talk');

    const css = document.createElement('style');
    css.textContent = '#prompt{font-size:29px;padding:3px 16px 5px}';
    document.head.appendChild(css);
    ctx.onCleanup(() => css.remove());

    const st = {
      done: false,
      // Ending 1 state
      s1Off: false, s2Off: false, boxOpen: false, powerOff: false, keyDropped: false,
      // Ending 2 state
      camBlinded: false, portraitMoved: false, gravUnlocked: false,
      // Ending 3 state
      sonicOff: false, ventOpen: false, pepPuffs: 0, lastPuffAt: 0,
      // Drag & physics state
      bossPos: { ...BOSS0 },
      bossMood: 'smug',
      perchAng: 0, perchVel: 0,
      holdingPerch: false, perchTravel: 0,
      holdingKey: false, keyPos: { ...KEY_FLOOR },
      holdingPep: false, pepPos: { ...PEP0 }, pepOverVent: false, pepOverSince: 0, pepHinted: false,
      holdingPort: false, portTapsAfterBlind: 0,
      holdingVent: false,
      lastIdle: performance.now(),
    };

    const alive = () => ctx.alive;
    const setFace = (o) => { ndFace.innerHTML = ART.noodleFace(o); };
    const setArms = (t) => { ndArms.innerHTML = ART.noodleArms(t, YELLOW); };
    const setBossMood = (mood) => { st.bossMood = mood; bossIn.innerHTML = bossBrainSVG(mood, st.sonicOff); };
    const bossSay = (text, ms = 2100) => {
      const msg = st.sonicOff ? 'MMMPH!! (MUTED!)' : text;
      ctx.talk(talkLayer, U.clamp(st.bossPos.x, 90, 300), Math.max(46, st.bossPos.y - 54), msg, ms);
    };
    const noodleSay = (text, ms = 2100) => ctx.talk(talkLayer, CAGE.x + 12, CAGE.y - 102, text, ms);

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

    function burst(x, y, color = YELLOW, count = 10) {
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + U.rand(-0.2, 0.2);
        const r = U.rand(30, 68);
        const d = U.svgEl('circle', { cx: x, cy: y, r: U.rand(3, 5.5), fill: i % 2 ? color : '#fff', stroke: INK, 'stroke-width': 1.8 }, fx);
        U.tween(520, (t) => {
          d.setAttribute('cx', (x + Math.cos(a) * r * t).toFixed(1));
          d.setAttribute('cy', (y + Math.sin(a) * r * t).toFixed(1));
          d.setAttribute('opacity', (1 - t).toFixed(2));
        }, U.ease.outCubic).then(() => d.remove());
      }
    }

    /* =====================================================================
       ENDING 1 (MAIN — 4 STEPS): SYSTEM SHUTDOWN (MASTERMIND!)
       ===================================================================== */
    async function unscrewBolt(el, which) {
      if (st.done || ctx.locked) return;
      if (which === 1 && st.s1Off) return;
      if (which === 2 && st.s2Off) return;
      if (which === 1) st.s1Off = true; else st.s2Off = true;
      ctx.attempt();
      A.play('clink'); U.haptic(14);
      el.style.pointerEvents = 'none';
      const x0 = which === 1 ? -26 : 26, y0 = which === 1 ? -32 : 32;
      await U.tween(320, (t) => {
        if (!alive()) return;
        el.setAttribute('transform', `translate(${(x0 + (which === 1 ? -24 : 24) * t).toFixed(1)},${(y0 + t * 80).toFixed(1)}) rotate(${(t * 420).toFixed(0)})`);
        el.setAttribute('opacity', (1 - t).toFixed(2));
      }, U.ease.inCubic);
      if (!alive()) return;

      if (st.s1Off && st.s2Off && !st.boxOpen) {
        st.boxOpen = true;
        A.play('creak'); A.play('thud');
        await U.tween(320, (t) => {
          if (!alive()) return;
          boxDoor.setAttribute('transform', `translate(${(-t * 90).toFixed(1)},${(t * 24).toFixed(1)}) rotate(${(-t * 36).toFixed(1)})`);
          boxDoor.setAttribute('opacity', (1 - t).toFixed(2));
        }, U.ease.inCubic);
        boxDoor.setAttribute('display', 'none');
        breaker.style.pointerEvents = 'all';
        pop(BOX.x, BOX.y - 52, 'OPEN!', YELLOW, 17);
        ctx.say('Power box open! Look at that Master Breaker switch.');
      } else {
        pop(BOX.x, BOX.y - 52, '1 BOLT OFF!', SKY, 15);
        ctx.say('One bolt unscrewed! One more to go.');
      }
    }

    async function flipMasterBreaker() {
      if (st.done || ctx.locked || !st.boxOpen || st.powerOff) return;
      st.powerOff = true;
      ctx.attempt();
      A.play('click'); A.play('zap'); A.play('crash'); U.haptic([24, 36, 24]);
      brkLever.setAttribute('y', '4');
      brkLever.setAttribute('fill', RED);
      brkTxt.textContent = 'OFF';
      pipeLaser.setAttribute('stroke', '#444666');
      pipeShield.setAttribute('stroke', '#444666');
      lasers.setAttribute('opacity', '0');
      shield.setAttribute('opacity', '0');
      powerTint.setAttribute('opacity', '.15');
      burst(st.bossPos.x, st.bossPos.y, SKY, 12);
      pop(st.bossPos.x, st.bossPos.y - 58, 'SHIELD DOWN!!', ORANGE, 18);

      // Boss panics and retreats up to the hanging ceiling perch clutching the Golden Key!
      setBossMood('panic');
      const from = { ...st.bossPos };
      await U.tween(420, (t) => {
        if (!alive() || st.done) return;
        st.bossPos = { x: U.lerp(from.x, PERCH.x, t), y: U.lerp(from.y, PERCH.y + 42, t) };
        bossWrap.setAttribute('transform', `translate(${st.bossPos.x.toFixed(1)},${st.bossPos.y.toFixed(1)}) scale(0.88)`);
      }, U.ease.outBack);
      if (!alive() || st.done) return;
      st.perchVel = 14;
      bossSay('HEY!! WHO CUT THE POWER?!', 2400);
      ctx.say('Lasers & shield are OFF! Now get that Golden Key from the Boss!');
    }

    async function dropKeyFromBoss() {
      if (st.done || ctx.locked || !st.powerOff || st.keyDropped) return;
      st.keyDropped = true;
      A.play('rumble'); A.play('clink'); U.haptic([24, 30, 40]);
      U.replay(world, 'quake');
      st.perchVel = 24;
      setBossMood('ko');
      heldKey.setAttribute('opacity', '0');
      pop(st.bossPos.x, st.bossPos.y - 46, 'KEY DROPPED!', YELLOW, 19);
      bossSay('WHOA—MY KEY!!', 1800);

      dropKey.setAttribute('opacity', '1');
      const startX = st.bossPos.x, startY = st.bossPos.y + 18;
      await U.tween(540, (t) => {
        if (!alive() || st.done) return;
        const kx = U.lerp(startX, KEY_FLOOR.x, t);
        const ky = U.lerp(startY, KEY_FLOOR.y, t);
        dropKey.setAttribute('transform', `translate(${kx.toFixed(1)},${ky.toFixed(1)}) rotate(${(t * 360).toFixed(0)})`);
      }, U.ease.outBounce);
      if (!alive() || st.done) return;
      st.keyPos = { ...KEY_FLOOR };
      dropKey.setAttribute('transform', `translate(${KEY_FLOOR.x},${KEY_FLOOR.y})`);
      dropKey.style.pointerEvents = 'all';
      ctx.say('He dropped the Golden Key! Drag it to Noodle’s padlock!');
    }

    async function winMastermind() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      st.holdingKey = false;
      dropKey.setAttribute('opacity', '0');
      A.play('clink'); A.play('pop'); U.haptic([24, 40, 24]);
      pop(PADLOCK.x, PADLOCK.y - 32, 'UNLOCKED!', MINT, 20);
      await U.tween(380, (t) => {
        if (!alive()) return;
        padlock.setAttribute('transform', `translate(${(PADLOCK.x + t * 40).toFixed(1)},${(PADLOCK.y + t * 90).toFixed(1)}) rotate(${(t * 160).toFixed(0)})`);
        padlock.setAttribute('opacity', (1 - t).toFixed(2));
        glassDome.setAttribute('transform', `translate(0,${(-t * 180).toFixed(1)})`);
        glassDome.setAttribute('opacity', (1 - t).toFixed(2));
      }, U.ease.outCubic);
      if (!alive()) return;

      q('#l15-boss-crown') && q('#l15-boss-crown').setAttribute('opacity', '0');
      ndCrown.setAttribute('opacity', '1');
      setFace({ eyes: 'happy', mouth: 'grin' });
      setArms('up');
      U.replay(ndAnim, 'hop');
      burst(CAGE.x, CAGE.y - 20, MINT, 12);
      noodleSay('FREE AT LAST!! MY CROWN NOW!', 2200);
      ctx.say('Unscrewed, blacked out, shaken down, and unlocked!');
      await U.wait(880);
      if (alive()) ctx.win('mastermind');
    }

    // Both tap AND drag/twist unscrew both bolts & flip Master Breaker!
    I.drag(screw1, svg, {
      onMove(p, d) { if (Math.hypot(d.dx, d.dy) > 8) unscrewBolt(screw1, 1); },
      onTap() { unscrewBolt(screw1, 1); },
      onEnd(p, d) { if (Math.hypot(d.dx, d.dy) >= 6) unscrewBolt(screw1, 1); },
    });
    I.drag(screw2, svg, {
      onMove(p, d) { if (Math.hypot(d.dx, d.dy) > 8) unscrewBolt(screw2, 2); },
      onTap() { unscrewBolt(screw2, 2); },
      onEnd(p, d) { if (Math.hypot(d.dx, d.dy) >= 6) unscrewBolt(screw2, 2); },
    });
    I.drag(breaker, svg, {
      onMove(p, d) { if (d.dy > 12 || Math.hypot(d.dx, d.dy) > 16) flipMasterBreaker(); },
      onTap() { flipMasterBreaker(); },
      onEnd(p, d) { if (Math.hypot(d.dx, d.dy) >= 8) flipMasterBreaker(); },
    });

    // Draggable dropped Golden Key -> Padlock OR Cage
    I.drag(dropKey, svg, {
      onStart() { if (!ctx.locked && !st.done && st.keyDropped) { st.holdingKey = true; A.play('clink'); } },
      onMove(p) {
        if (!st.holdingKey || ctx.locked || st.done) return;
        st.keyPos = { x: U.clamp(p.x, 24, 366), y: U.clamp(p.y, 60, 560) };
        dropKey.setAttribute('transform', `translate(${st.keyPos.x.toFixed(1)},${st.keyPos.y.toFixed(1)})`);
        if (Math.hypot(st.keyPos.x - PADLOCK.x, st.keyPos.y - PADLOCK.y) < 58 || Math.hypot(st.keyPos.x - CAGE.x, st.keyPos.y - CAGE.y) < 68) {
          winMastermind();
        }
      },
      onTap() {
        st.holdingKey = false;
        if (ctx.locked || st.done) return;
        A.play('clink'); U.replay(keyIn, 'wiggle');
        ctx.say('The Golden Cage Key! Drag it onto Noodle’s padlock!');
      },
      async onEnd() {
        if (!st.holdingKey || st.done) return;
        st.holdingKey = false;
        const from = { ...st.keyPos };
        await U.tween(260, (t) => {
          if (!alive() || st.done || st.holdingKey) return;
          st.keyPos = { x: U.lerp(from.x, KEY_FLOOR.x, t), y: U.lerp(from.y, KEY_FLOOR.y, t) };
          dropKey.setAttribute('transform', `translate(${st.keyPos.x.toFixed(1)},${st.keyPos.y.toFixed(1)})`);
        }, U.ease.outBack);
      },
    });

    // Desktop fallback for Shake in Step 3: wiggle EITHER the perch OR the unshielded Boss fast left-right!
    function wireWiggleShake(el, onTapFallback) {
      let prevX = null;
      I.drag(el, svg, {
        onStart(p) {
          if (ctx.locked || st.done) return;
          st.holdingPerch = true; prevX = p.x; st.perchTravel = 0;
          ctx.attempt();
        },
        onMove(p) {
          if (!st.holdingPerch || ctx.locked || st.done) return;
          const dx = p.x - prevX;
          prevX = p.x;
          st.perchVel += U.clamp(dx * 0.9, -12, 12);
          st.perchTravel += Math.abs(dx);
          if (st.powerOff && !st.keyDropped && st.perchTravel > 110) {
            st.holdingPerch = false;
            dropKeyFromBoss();
          }
        },
        onTap() {
          st.holdingPerch = false;
          if (ctx.locked || st.done) return;
          onTapFallback();
        },
        onEnd() { st.holdingPerch = false; prevX = null; },
      });
    }
    wireWiggleShake(perchEl, () => {
      st.perchVel = 14; A.play('creak');
      ctx.say(st.powerOff && !st.keyDropped ? 'Shake your phone (or wiggle him fast left-right) to drop his key!' : 'A wobbly hanging lamp chain.');
    });
    wireWiggleShake(bossIn, () => {
      if (!st.powerOff) {
        A.play('zap'); U.haptic(14);
        pop(st.bossPos.x, st.bossPos.y - 60, 'ZAP!!', SKY, 18);
        bossSay('10,000-volt shield! Trace the wires!');
        ctx.say('Shield is active! Cut the power or find a way inside.');
      } else if (!st.keyDropped) {
        A.play('whoosh'); st.perchVel = 18;
        bossSay('Too slow! Can’t grab my key!');
        ctx.say('He dodged! SHAKE your phone (or wiggle him fast left-right)!');
      } else {
        A.play('bonk');
        ctx.say('He’s dizzy — drag the Golden Key to Noodle’s padlock!');
      }
    });

    /* =====================================================================
       ENDING 2 (SECRET #1 — 3 STEPS): BRAINFLIPPED! (UI + Portrait + 180° Flip)
       ===================================================================== */
    // Step 1: Draggable Prompt Banner -> remove .slam so CSS animation never locks transform!
    const promptEl = ctx.promptEl;
    const camHead = q('#l15-cam-head');
    promptEl.classList.add('prompt-drag');
    let prDrag = null, prOff = { x: 0, y: 0 };
    function placePrompt(rot = -2) {
      promptEl.style.transform = `translate(calc(-50% + ${prOff.x.toFixed(1)}px), ${prOff.y.toFixed(1)}px) rotate(${rot.toFixed(1)}deg)`;
    }
    function isPromptCoveringCamera() {
      const pr = promptEl.getBoundingClientRect();
      const cr = camHead.getBoundingClientRect();
      const cx = cr.left + cr.width / 2, cy = cr.top + cr.height / 2;
      return cx > pr.left - 14 && cx < pr.right + 14 && cy > pr.top - 14 && cy < pr.bottom + 14;
    }
    const onPrDown = (e) => {
      if (ctx.locked || st.done || prDrag) return;
      e.preventDefault();
      promptEl.classList.remove('slam');
      promptEl.style.transition = 'none';
      const p = ctx.sceneFromClient(e.clientX, e.clientY);
      prDrag = { id: e.pointerId, start: p, off0: { ...prOff }, maxMove: 0 };
      try { promptEl.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    };
    const onPrMove = (e) => {
      if (!prDrag || e.pointerId !== prDrag.id || st.done) return;
      const p = ctx.sceneFromClient(e.clientX, e.clientY);
      const dx = p.x - prDrag.start.x, dy = p.y - prDrag.start.y;
      prDrag.maxMove = Math.max(prDrag.maxMove, Math.hypot(dx, dy));
      prOff = { x: U.clamp(prDrag.off0.x + dx, -180, 180), y: U.clamp(prDrag.off0.y + dy, -30, 440) };
      placePrompt(U.clamp(-2 + dx * 0.06, -12, 10));

      if (!st.camBlinded && isPromptCoveringCamera()) {
        st.camBlinded = true;
        camCone.setAttribute('opacity', '0');
        camRec.setAttribute('fill', '#555B70');
        camPupil.setAttribute('fill', '#555B70');
        camStat.textContent = 'NO SIGNAL';
        camStat.setAttribute('fill', '#9AA5B8');
        A.play('zap'); U.haptic(18);
        pop(CCTV.x, CCTV.y + 42, 'BLINDED!', MINT, 18);
        bossSay('HEY! WHY IS MY CAMERA BLACK?!', 2400);
        ctx.say('CCTV camera blinded! Now sneak behind his portrait!');
      }
    };
    const onPrUp = (e) => {
      if (!prDrag || e.pointerId !== prDrag.id) return;
      const moved = prDrag.maxMove;
      prDrag = null;
      if (moved < 8) {
        A.play('wobble');
        promptEl.style.transition = 'transform .2s cubic-bezier(.3,1.5,.5,1)';
        placePrompt(5);
        setTimeout(() => { if (alive() && !prDrag) placePrompt(-2); }, 180);
        ctx.say('You can drag this banner anywhere! Try covering the CCTV camera.');
      } else {
        promptEl.style.transition = 'transform .2s ease-out';
        placePrompt(-2);
        A.play('tap');
      }
    };
    promptEl.addEventListener('pointerdown', onPrDown);
    promptEl.addEventListener('pointermove', onPrMove);
    promptEl.addEventListener('pointerup', onPrUp);
    promptEl.addEventListener('pointercancel', onPrUp);
    ctx.onCleanup(() => {
      promptEl.removeEventListener('pointerdown', onPrDown);
      promptEl.removeEventListener('pointermove', onPrMove);
      promptEl.removeEventListener('pointerup', onPrUp);
      promptEl.removeEventListener('pointercancel', onPrUp);
    });

    // Step 2: Slide Boss Ego Portrait aside (ONLY allowed once CCTV Camera is blinded!)
    function dropPortraitOff(ox = 45, oy = 18) {
      if (st.portraitMoved || st.done) return;
      st.holdingPort = false;
      st.portraitMoved = true;
      A.play('whoosh'); A.play('thud');
      U.tween(320, (t) => {
        if (!alive()) return;
        portrait.setAttribute('transform', `translate(${(PORT.x + ox + t * 70).toFixed(1)},${(PORT.y + oy + t * 140).toFixed(1)}) rotate(${(25 + t * 65).toFixed(0)})`);
        portrait.setAttribute('opacity', (1 - t).toFixed(2));
      }, U.ease.inCubic).then(() => portrait.setAttribute('display', 'none'));
      gravSw.style.pointerEvents = 'all';
      pop(PORT.x, PORT.y - 46, 'SECRET SWITCH!', SKY, 16);
      ctx.say('Aha! A hidden GRAVITY LOCK behind his ego portrait!');
    }
    I.drag(portrait, svg, {
      onStart() {
        if (ctx.locked || st.done || st.portraitMoved) return;
        st.holdingPort = true;
        ctx.attempt();
      },
      onMove(p, d) {
        if (!st.holdingPort || ctx.locked || st.done || st.portraitMoved) return;
        if (!st.camBlinded) {
          if (Math.hypot(d.dx, d.dy) > 14) {
            st.holdingPort = false;
            A.play('alarm'); U.haptic(18);
            U.replay(portIn, 'wiggle');
            pop(CCTV.x, CCTV.y + 40, 'CAUGHT!!', RED, 18);
            bossSay('AHA! CAUGHT ON CAMERA!');
            ctx.say('The CCTV camera caught you! Drag the top banner onto its lens first!');
          }
          return;
        }
        const ox = U.clamp(d.dx, -90, 90), oy = U.clamp(d.dy, -40, 90);
        portrait.setAttribute('transform', `translate(${(PORT.x + ox).toFixed(1)},${(PORT.y + oy).toFixed(1)}) rotate(${(3 + ox * 0.15).toFixed(1)})`);
        if (Math.hypot(ox, oy) > 28) dropPortraitOff(ox, oy);
      },
      onTap() {
        st.holdingPort = false;
        if (ctx.locked || st.done) return;
        if (!st.camBlinded) {
          A.play('alarm'); U.replay(portIn, 'wiggle');
          bossSay('Hands off my portrait! Camera is watching!');
          ctx.say('The CCTV camera guards his portrait. Blind the camera first!');
        } else {
          st.portTapsAfterBlind++;
          if (st.portTapsAfterBlind >= 2) { dropPortraitOff(35, 16); return; }
          A.play('creak'); U.replay(portIn, 'wiggle');
          ctx.say('The camera is blind! Slide (or tap again) to knock the portrait off!');
        }
      },
      async onEnd() {
        if (!st.holdingPort || st.done || st.portraitMoved) return;
        st.holdingPort = false;
        portrait.setAttribute('transform', `translate(${PORT.x},${PORT.y}) rotate(3)`);
      },
    });

    function unlockGravity() {
      if (st.done || ctx.locked || !st.portraitMoved || st.gravUnlocked) return;
      st.gravUnlocked = true;
      ctx.attempt(); A.play('click'); A.play('pop'); U.haptic(16);
      gravPill.setAttribute('fill', MINT);
      gravTxt.textContent = 'FREE!';
      gravFlip.setAttribute('opacity', '1');
      gravFlip.style.pointerEvents = 'all';
      pop(PORT.x, PORT.y - 46, 'GRAVITY FREE!', MINT, 16);
      bossSay('WAIT—WHAT WAS THAT CLICK?!');
      ctx.say('Gravity unlocked! Now turn your phone 180° UPSIDE DOWN (or tap FLIP 180°)!');
    }
    I.drag(gravSw, svg, {
      onMove(p, d) { if (Math.hypot(d.dx, d.dy) > 10) unlockGravity(); },
      onTap() { unlockGravity(); },
      onEnd(p, d) { if (Math.hypot(d.dx, d.dy) >= 6) unlockGravity(); },
    });

    // Step 3: Upside-Down Brainflip Finale!
    async function winBrainflip() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      A.play('whoosh'); A.play('boing'); U.haptic([24, 40, 36]);
      setBossMood('panic');
      lasers.setAttribute('opacity', '0');
      shield.setAttribute('opacity', '0');
      bossSay('WAIT—MY THOUGHTS ARE FALLING OUT!!', 2200);

      // Flip the Brain Boss completely upside down + spill lightbulbs & question marks!
      const from = { ...st.bossPos };
      const syms = ['?', '!', '💡', '?', '★', '!'];
      syms.forEach((ch, i) => {
        const el = U.svgEl('text', {
          x: from.x + U.rand(-24, 24), y: from.y - 10, 'text-anchor': 'middle',
          'font-family': 'Lilita One, sans-serif', 'font-size': 22,
          fill: i % 2 ? YELLOW : SKY, stroke: INK, 'stroke-width': 3, 'paint-order': 'stroke',
        }, fx);
        el.textContent = ch;
        const dx = U.rand(-55, 55), dy = U.rand(-150, -80);
        U.tween(780, (t) => {
          el.setAttribute('x', (from.x + dx * t).toFixed(1));
          el.setAttribute('y', (from.y - 10 + dy * t).toFixed(1));
          el.setAttribute('opacity', (1 - t * t).toFixed(2));
        }, U.ease.outCubic).then(() => el.remove());
      });

      await U.tween(640, (t) => {
        if (!alive()) return;
        const by = U.lerp(from.y, 128, t);
        bossWrap.setAttribute('transform', `translate(${from.x.toFixed(1)},${by.toFixed(1)}) rotate(${(t * 180).toFixed(0)})`);
        glassDome.setAttribute('transform', `translate(0,${(-t * 220).toFixed(1)})`);
        glassDome.setAttribute('opacity', (1 - t).toFixed(2));
        padlock.setAttribute('opacity', (1 - t).toFixed(2));
      }, U.ease.outBack);
      if (!alive()) return;

      ndCrown.setAttribute('opacity', '1');
      setFace({ eyes: 'happy', mouth: 'grin' });
      setArms('up');
      U.replay(ndAnim, 'hop');
      pop(195, 250, 'BRAINFLIPPED!!', YELLOW, 26);
      noodleSay('LITERALLY BRAINFLIPPED!!', 2200);
      ctx.say('Blinded the camera, unlocked gravity, and flipped the Brain!');
      await U.wait(880);
      if (alive()) ctx.win('brainflip');
    }

    ctx.onCleanup(I.onUpsideDown(() => {
      if (ctx.locked || st.done) return;
      if (st.gravUnlocked) {
        winBrainflip();
      } else {
        A.play('bonk');
        bossSay('Nice try! Gravity is LOCKED!');
        ctx.say('Gravity is locked! Find the hidden Gravity Lock first.');
      }
    }));

    /* =====================================================================
       ENDING 3 (SECRET #2 — 3 STEPS): SPICY KO! (Mute + Vent + Super Pepper)
       ===================================================================== */
    // Step 1: Mute HUD Sound button (or Volume Down / dev key M) -> disables Sonic Lock!
    function triggerSonicMute() {
      if (st.done || ctx.locked || st.sonicOff) return false;
      st.sonicOff = true;
      A.play('click'); A.play('pop'); U.haptic(18);
      soundWaves.setAttribute('opacity', '0');
      pipeSonic.setAttribute('stroke', '#444666');
      setBossMood(st.bossMood); // adds zipper over Boss's mouth!
      pop(st.bossPos.x, st.bossPos.y - 54, 'MUTED!!', PINK, 19);
      bossSay('MMMPH?!');
      // Immediately unlock pepper & slide Confiscated Cabinet glass door open!
      if (ctx.soundBtn) ctx.soundBtn.classList.remove('sound-blast');
      caseGlass.style.pointerEvents = 'none';
      world.insertBefore(pepperEl, fx);
      pepperEl.style.pointerEvents = 'all';
      const pepHit = pepperEl.querySelector('circle');
      if (pepHit) pepHit.setAttribute('pointer-events', 'all');
      U.tween(340, (t) => {
        if (!alive()) return;
        caseGlass.setAttribute('transform', `translate(${(t * 76).toFixed(1)},0)`);
        caseGlass.setAttribute('opacity', (1 - t).toFixed(2));
      }, U.ease.outCubic).then(() => {
        caseGlass.setAttribute('display', 'none');
      });
      ctx.say('Boss muted! Sonic Lock disabled — grab the HOT pepper inside!');
      return true;
    }
    ctx.onSoundButton = triggerSonicMute;
    ctx.onCleanup(I.onVolumeDown(() => { triggerSonicMute(); }));

    // Step 2: Slide / Tap Open the Air Vent directly above Boss's shield!
    async function openVent() {
      if (st.done || ctx.locked || st.ventOpen) return;
      st.ventOpen = true;
      ctx.attempt();
      A.play('creak'); U.haptic(14);
      ventGrate.style.pointerEvents = 'none';
      await U.tween(300, (t) => {
        if (!alive()) return;
        ventGrate.setAttribute('transform', `translate(${(-t * 58).toFixed(1)},${(t * 14).toFixed(1)}) rotate(${(-t * 24).toFixed(0)})`);
        ventGrate.setAttribute('opacity', (1 - t).toFixed(2));
      }, U.ease.outCubic);
      ventGrate.setAttribute('display', 'none');
      pop(VENT.x, VENT.y - 26, 'VENT OPEN!', MINT, 16);
      ctx.say('Air vent open! It leads straight inside the Boss’s shield!');
    }
    I.drag(ventGrate, svg, {
      onStart() { if (!ctx.locked && !st.done && !st.ventOpen) st.holdingVent = true; },
      onMove(p, d) {
        if (!st.holdingVent || st.ventOpen || ctx.locked || st.done) return;
        if (Math.hypot(d.dx, d.dy) > 16) { st.holdingVent = false; openVent(); }
      },
      onTap() { st.holdingVent = false; openVent(); },
      onEnd() { st.holdingVent = false; },
    });

    // Step 3: Drag X-TRA HOT Pepper over open Air Vent & Shake/Wiggle 3 times!
    function sprinkleSuperPepper(px, py) {
      if (st.done || ctx.locked) return;
      const now = performance.now();
      if (now - st.lastPuffAt < 300) return;
      st.lastPuffAt = now;
      if (!st.ventOpen) {
        A.play('bonk');
        pop(VENT.x, VENT.y - 26, 'VENT CLOSED!', RED, 16);
        ctx.say('The air vent is closed! Slide the grate open first.');
        return;
      }
      st.pepPuffs++;
      A.play('shakeSalt'); U.haptic(18);
      for (let i = 0; i < 12; i++) {
        const sx = px + U.rand(-12, 12), sy = py + 10;
        const dot = U.svgEl('circle', { cx: sx, cy: sy, r: U.rand(2.5, 4.5), fill: i % 2 ? RED : ORANGE, stroke: INK, 'stroke-width': 1.2 }, fx);
        U.tween(460, (t) => {
          dot.setAttribute('cx', U.lerp(sx, st.bossPos.x + U.rand(-20, 20), t).toFixed(1));
          dot.setAttribute('cy', U.lerp(sy, st.bossPos.y, t).toFixed(1));
          dot.setAttribute('opacity', (1 - t * t).toFixed(2));
        }, U.ease.outCubic).then(() => dot.remove());
      }
      if (st.pepPuffs === 1) {
        setBossMood('panic');
        pop(st.bossPos.x, st.bossPos.y - 54, '*SNIFF* SPICY!', ORANGE, 17);
        ctx.say('Pepper is pouring INSIDE his shield! Shake again!');
      } else if (st.pepPuffs === 2) {
        pop(st.bossPos.x, st.bossPos.y - 58, 'AAAH… AAAH…!', RED, 20);
        ctx.say('One more shake — he is about to blow his own shield!');
      } else {
        winSpicyKO();
      }
    }

    async function winSpicyKO() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      st.holdingPep = false;
      A.play('sneeze'); A.play('crash'); U.haptic([35, 45, 110]);
      U.replay(world, 'quake');
      shield.setAttribute('opacity', '0');
      lasers.setAttribute('opacity', '0');
      burst(st.bossPos.x, st.bossPos.y, ORANGE, 16);
      pop(st.bossPos.x, st.bossPos.y - 68, 'ACHOOO!!', YELLOW, 30);

      const from = { ...st.bossPos };
      await U.tween(560, (t) => {
        if (!alive()) return;
        bossWrap.setAttribute('transform', `translate(${(from.x + t * 240).toFixed(1)},${(from.y - t * 340).toFixed(1)}) rotate(${(t * 420).toFixed(0)}) scale(${(1 - t * 0.6).toFixed(2)})`);
        bossWrap.setAttribute('opacity', (1 - t).toFixed(2));
        glassDome.setAttribute('transform', `translate(${(-t * 120).toFixed(1)},${(-t * 140).toFixed(1)}) rotate(${(-t * 45).toFixed(0)})`);
        glassDome.setAttribute('opacity', (1 - t).toFixed(2));
        padlock.setAttribute('opacity', (1 - t).toFixed(2));
      }, U.ease.outCubic);
      if (!alive()) return;

      ndCrown.setAttribute('opacity', '1');
      setFace({ eyes: 'happy', mouth: 'grin' });
      setArms('up');
      U.replay(ndAnim, 'hop');
      noodleSay('BLESS YOU, BOSS!! HAHA!', 2200);
      ctx.say('Muted his lock, opened his vent, sneezed him out of his own shield!');
      await U.wait(880);
      if (alive()) ctx.win('spicy');
    }

    let pepPrev = null, pepTravel = 0;
    I.drag(pepperEl, svg, {
      onStart() {
        if (ctx.locked || st.done || !st.sonicOff) return;
        st.holdingPep = true; pepPrev = null; pepTravel = 0;
        A.play('pop'); ctx.attempt();
      },
      onMove(p) {
        if (!st.holdingPep || ctx.locked || st.done) return;
        const x = U.clamp(p.x, 30, 360), y = U.clamp(p.y, 44, 540);
        st.pepPos = { x, y };
        const overVent = Math.hypot(x - VENT.x, y - (VENT.y - 12)) < 74;
        const overUnshielded = st.powerOff && Math.hypot(x - st.bossPos.x, y - (st.bossPos.y - 24)) < 74;
        const over = overVent || overUnshielded;
        if (over && !st.pepOverVent) { st.pepOverSince = performance.now(); st.pepHinted = false; }
        st.pepOverVent = over;
        pepperEl.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${over ? 155 : -8})`);
        if (over) {
          if (pepPrev) {
            pepTravel += Math.hypot(x - pepPrev.x, y - pepPrev.y);
            if (pepTravel >= 48) {
              pepTravel = 0;
              if (overUnshielded && !st.ventOpen) {
                // Shield already off, pepper goes straight onto Boss!
                st.ventOpen = true;
              }
              sprinkleSuperPepper(x, y);
            }
          }
          pepPrev = { x, y };
        } else {
          pepPrev = null; pepTravel = 0;
        }
      },
      onTap() {
        st.holdingPep = false; st.pepOverVent = false;
        if (ctx.locked || st.done) return;
        pepperEl.setAttribute('transform', `translate(${PEP0.x},${PEP0.y})`);
        A.play('shakeSalt'); U.replay(pepperIn, 'wiggle');
        ctx.say('Confiscated X-TRA HOT Pepper! Drag it over the air vent and shake!');
      },
      async onEnd() {
        if (!st.holdingPep || st.done) return;
        st.holdingPep = false; st.pepOverVent = false;
        const from = { ...st.pepPos };
        await U.tween(260, (t) => {
          if (!alive() || st.done || st.holdingPep) return;
          pepperEl.setAttribute('transform', `translate(${U.lerp(from.x, PEP0.x, t).toFixed(1)},${U.lerp(from.y, PEP0.y, t).toFixed(1)})`);
        }, U.ease.outBack);
        st.pepPos = { ...PEP0 };
      },
    });

    // Shared real-phone SHAKE handler (works for BOTH Ending 1 Key Drop AND Ending 3 Pepper Vent!)
    function onDeviceShake() {
      if (ctx.locked || st.done) return;
      if (st.holdingPep && st.pepOverVent) {
        sprinkleSuperPepper(st.pepPos.x, st.pepPos.y);
      } else if (st.powerOff && !st.keyDropped) {
        dropKeyFromBoss();
      } else {
        st.perchVel = 14;
        A.play('rumble');
        bossSay('Ha! My shield is earthquake-proof!');
        ctx.say('His shield absorbs shakes! Cut his power first.');
      }
    }
    ctx.onCleanup(I.onShake(onDeviceShake));
    ctx.onCleanup(I.onJolt(() => {
      if (st.holdingPep && st.pepOverVent) sprinkleSuperPepper(st.pepPos.x, st.pepPos.y);
    }));

    /* =====================================================================
       LIVE POINTER TRACKING (CCTV Camera + Boss Eyes Follow You!) & LOOP
       ===================================================================== */
    const onTrack = (e) => {
      if (st.done) return;
      const pt = U.svgPoint(svg, e.clientX, e.clientY);
      if (!st.camBlinded) {
        const ang = Math.atan2(pt.y - CCTV.y, pt.x - CCTV.x);
        camPupil.setAttribute('cx', (Math.cos(ang) * 3.2).toFixed(1));
        camPupil.setAttribute('cy', (2 + Math.sin(ang) * 3.2).toFixed(1));
      }
      const elL = q('#l15-eye-l'), elR = q('#l15-eye-r');
      if (elL && elR) {
        const a = Math.atan2(pt.y - st.bossPos.y, pt.x - st.bossPos.x);
        const ex = Math.cos(a) * 2.4, ey = Math.sin(a) * 2.4;
        elL.setAttribute('cx', (-11 + ex).toFixed(1)); elL.setAttribute('cy', (3 + ey).toFixed(1));
        elR.setAttribute('cx', (11 + ex).toFixed(1)); elR.setAttribute('cy', (3 + ey).toFixed(1));
      }
    };
    window.addEventListener('pointermove', onTrack);
    ctx.onCleanup(() => window.removeEventListener('pointermove', onTrack));

    let prev = performance.now();
    (function loop(now) {
      if (!alive()) return;
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;

      if (Math.abs(st.perchAng) > 0.04 || Math.abs(st.perchVel) > 0.04) {
        st.perchVel += (-28 * st.perchAng - 2.8 * st.perchVel) * dt;
        st.perchAng += st.perchVel * dt;
        perchPivot.setAttribute('transform', `translate(${PERCH.x},86) rotate(${st.perchAng.toFixed(2)})`);
        if (st.powerOff && !st.done) {
          bossWrap.setAttribute('transform', `translate(${(PERCH.x - st.perchAng * 1.4).toFixed(1)},${PERCH.y + 42}) rotate(${(st.perchAng * 0.8).toFixed(1)}) scale(0.88)`);
        }
      }

      if (!st.done) {
        if (!st.powerOff) {
          const bob = Math.sin(now / 380) * 5;
          bossWrap.setAttribute('transform', `translate(${BOSS0.x},${(BOSS0.y + bob).toFixed(1)})`);
          pipeLaser.setAttribute('stroke-dashoffset', (-(now / 28) % 28).toFixed(1));
          pipeShield.setAttribute('stroke-dashoffset', (-(now / 24) % 28).toFixed(1));
        }
        if (!st.sonicOff) {
          pipeSonic.setAttribute('stroke-dashoffset', (-(now / 22) % 24).toFixed(1));
          soundWaves.setAttribute('opacity', (0.55 + Math.sin(now / 120) * 0.4).toFixed(2));
        }
        if (!st.camBlinded) {
          camRec.setAttribute('opacity', Math.sin(now / 260) > 0 ? '1' : '.25');
        }
        if (st.holdingPep && st.pepOverVent && !st.pepHinted && now - st.pepOverSince > 900) {
          st.pepHinted = true;
          ctx.say(st.ventOpen ? 'Now SHAKE or wiggle the pepper fast!' : 'The vent is closed! Tap the metal grate to open it first!');
        }
        if (now - st.lastIdle > 12000) {
          st.lastIdle = now;
          ctx.say(U.pick([
            'Three defenses: Power Shield, CCTV Camera, and Sonic Lock.',
            'Everything you learned in Levels 1–14 works in this room.',
            'Noodle is counting on you to outsmart the Narrator!',
          ]));
        }
      }
      requestAnimationFrame(loop);
    })(prev);
    svg.addEventListener('pointerdown', () => { st.lastIdle = performance.now(); });

    /* =====================================================================
       TAP REACTIONS (all inner .fb, zero wiggle-jump bugs!)
       ===================================================================== */
    const taps = {
      screw1() { unscrewBolt(screw1, 1); },
      screw2() { unscrewBolt(screw2, 2); },
      boxDoor() { ctx.attempt(); A.play('clink'); ctx.say('Bolted shut! Look at the two metal screws on the corners.'); },
      breaker() { flipMasterBreaker(); },
      gravSw() {
        if (st.done || ctx.locked || !st.portraitMoved || st.gravUnlocked) return;
        st.gravUnlocked = true;
        ctx.attempt(); A.play('click'); A.play('pop'); U.haptic(16);
        gravPill.setAttribute('fill', MINT);
        gravTxt.textContent = 'FREE!';
        gravFlip.setAttribute('opacity', '1');
        gravFlip.style.pointerEvents = 'all';
        pop(PORT.x, PORT.y - 46, 'GRAVITY FREE!', MINT, 16);
        bossSay('WAIT—WHAT WAS THAT CLICK?!');
        ctx.say('Gravity unlocked! Now turn your phone 180° UPSIDE DOWN (or tap FLIP 180°)!');
      },
      gravFlip() { if (st.gravUnlocked && !st.done) winBrainflip(); },
      boss() {
        ctx.attempt();
        if (!st.powerOff) {
          A.play('zap'); U.haptic(14);
          pop(st.bossPos.x, st.bossPos.y - 60, 'ZAP!!', SKY, 18);
          bossSay('10,000-volt shield! Trace the wires!');
          ctx.say('Shield is active! Cut the power or find a way inside.');
        } else if (!st.keyDropped) {
          A.play('whoosh'); st.perchVel = 16;
          bossSay('Too slow! Can’t grab my key!');
          ctx.say('He dodged your finger! SHAKE the phone (or wiggle his chain fast)!');
        } else {
          A.play('bonk');
          ctx.say('He’s already dizzy — drag the Golden Key to Noodle’s padlock!');
        }
      },
      caseGlass() {
        ctx.attempt(); A.play('beat', 0); U.replay(spkIn, 'wiggle');
        if (ctx.soundBtn && !st.sonicOff) ctx.soundBtn.classList.add('sound-blast');
        pop(342, 290, 'SONIC LOCK!', PINK, 16);
        bossSay('Loudspeaker keeps my trophies locked!');
        ctx.say('Locked by the Boss’s booming voice! Mute the game to silence it.');
      },
      speaker(node) {
        ctx.attempt(); A.play('beat', 1); U.replay(node, 'wiggle');
        ctx.say(st.sonicOff ? 'Silenced! The Sonic Lock is disabled.' : 'Blasting Sonic Lock waves! If only there were a Mute button…');
      },
      camera() {
        ctx.attempt(); A.play('alarm');
        pop(CCTV.x, CCTV.y + 38, 'WATCHING!', RED, 15);
        ctx.say(st.camBlinded ? 'Camera blinded!' : 'Live CCTV camera. Cover its view with something movable!');
      },
      noodle() {
        ctx.attempt(); A.play('squeak'); U.replay(ndAnim, 'hop');
        noodleSay(st.powerOff ? 'GET THE KEY!!' : 'HELP!! LASERS!!');
        ctx.say(st.powerOff ? 'Lasers are off — just unlock his padlock!' : 'Trapped behind live red lasers and a steel padlock.');
      },
      cage() {
        ctx.attempt();
        if (!st.powerOff) { A.play('zap'); pop(CAGE.x, CAGE.y - 40, 'LASERS ON!', RED, 17); ctx.say('Live lasers! Shut down the ⚡ POWER box first.'); }
        else { A.play('clink'); ctx.say('Glass is thick — unlock the steel padlock with the Golden Key.'); }
      },
      padlock(node) {
        ctx.attempt(); A.play('clink'); U.replay(node, 'wiggle');
        ctx.say(st.keyDropped ? 'Drag the Golden Key from the floor onto this padlock!' : 'Locked tight! The Boss is clutching the Golden Key.');
      },
      cameoCookie(node) { ctx.attempt(); A.play('crunch'); U.replay(node, 'wiggle'); ctx.say('Level 5’s Cookie Jar — confiscated!'); },
      cameoPickle(node) { ctx.attempt(); A.play('clink'); U.replay(node, 'wiggle'); ctx.say('Level 13’s Pickle Jar — still crunchy!'); },
      rug() { ctx.attempt(); A.play('swish'); ctx.say('No spare key under the villain rug.'); },
      wall() { ctx.attempt(); A.play('tap'); ctx.say('Look closely at the wires, the camera, and the air vent.'); },
      floor() { ctx.attempt(); A.play('thud'); ctx.say('Noodle’s hijacked living room floor.'); },
    };
    I.taps(svg, (name, node) => { if (ctx.locked || st.done) return; if (taps[name]) taps[name](node); });
  }

  BF.levels = BF.levels || {};
  BF.levels[15] = L;
})(window.BF);
