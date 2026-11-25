/* Brainflip — Level 10 (redesigned): "His phone is at 1%!"
   Late-night boss fight on the couch. The wall charger cord is two painful inches too short.
   Main ending : plug YOUR real phone into a real charger (transition only; dev key C)      (verb: real charging)
   Secret #1   : rip & drag the crooked wall outlet across the room so the short cord fits  (verb: drag wall / physics)
   Secret #2   : drag Noodle's steaming Turbo Espresso mug to Bolt the sleeping hamster     (verb: multi-step drag)
   Decoys: taut 2-inch-too-short charger cord, dragging Noodle loses Wi-Fi, 0% power bank,
           manual hamster wheel spin, Wi-Fi router, stormy night window, poster, cactus, couch. */
(function (BF) {
  'use strict';
  const U = BF.U, A = BF.audio, I = BF.input, ART = BF.art;
  const INK = '#1B1B2F', YELLOW = '#FFC93C', PINK = '#FF5D8F', MINT = '#3DDC97', SKY = '#5BC0EB', RED = '#FF5964', ORANGE = '#FF6B35';
  const W = 'stroke-linecap="round" stroke-linejoin="round"';
  const S = `stroke="${INK}" stroke-width="3.4" ${W}`;

  const OUTLET0 = { x: 40, y: 298 };
  const PLUG0 = { x: 88, y: 352 };
  const ND0 = { x: 195, y: 372 };
  const PHONE = { x: 195, y: 422 };
  const PHONE_PORT = { x: 195, y: 460 };
  const MUG0 = { x: 84, y: 444 };
  const HAMSTER = { x: 328, y: 322 };
  const BANK0 = { x: 326, y: 432 };
  const MAX_CORD = 124;

  function boltSVG(scale = 1) {
    return `<g transform="scale(${scale})"><path d="M4,-28 L16,-28 L-2,-2 L9,-2 L-12,28 L2,-5 L-8,-5 Z" fill="${YELLOW}" stroke="${INK}" stroke-width="3" ${W}/></g>`;
  }

  function usbTipSVG() {
    return `
      <rect x="-7" y="-22" width="14" height="12" rx="2.5" fill="#D5DEE8" stroke="${INK}" stroke-width="2.6"/>
      <path d="M-3,-18 V-14 M3,-18 V-14" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
      <rect x="-11" y="-11" width="22" height="22" rx="6" fill="#fff" ${S}/>
      <rect x="-5" y="11" width="10" height="8" rx="3" fill="#E6ECF2" stroke="${INK}" stroke-width="2.4"/>
      <path d="M-3,-4 L3,-4 L-1,1 L3,1 L-3,7" fill="none" stroke="${PINK}" stroke-width="2.2" ${W}/>`;
  }

  function mugSVG() {
    return `
      <circle cx="0" cy="0" r="32" fill="#000" fill-opacity="0" pointer-events="all"/>
      <g id="l10-steam" pointer-events="none">
        <path d="M-8,-22 q-5,-7 0,-14 q5,-7 0,-12" fill="none" stroke="#fff" stroke-width="3" opacity=".82" ${W}/>
        <path d="M5,-24 q5,-7 0,-14 q-5,-7 0,-12" fill="none" stroke="#fff" stroke-width="3" opacity=".72" ${W}/>
      </g>
      <path d="M16,-10 Q30,-10 29,2 Q28,13 15,12" fill="none" stroke="${INK}" stroke-width="7" ${W}/>
      <path d="M16,-10 Q30,-10 29,2 Q28,13 15,12" fill="none" stroke="${PINK}" stroke-width="3.2" ${W}/>
      <path d="M-17,-16 H17 L14,16 Q13,22 0,22 Q-13,22 -14,16 Z" fill="${PINK}" ${S}/>
      <ellipse cx="0" cy="-16" rx="17" ry="4.5" fill="#4E2A14" stroke="${INK}" stroke-width="2.8"/>
      <ellipse cx="-4" cy="-16.5" rx="6" ry="1.6" fill="#7D4927" opacity=".8"/>
      <path d="M1,-6 L7,-6 L-1,3 L5,3 L-5,14 L0,4 L-5,4 Z" fill="${YELLOW}" stroke="${INK}" stroke-width="2" ${W}/>`;
  }

  function hamsterSVG(mode = 'sleep') {
    if (mode === 'turbo') {
      return `
        <g>
          <ellipse cx="0" cy="14" rx="18" ry="11" fill="#FF9F43" stroke="${INK}" stroke-width="3"/>
          <ellipse cx="0" cy="17" rx="11" ry="6" fill="#FFF3D6"/>
          <circle cx="-11" cy="3" r="5" fill="#FF9F43" stroke="${INK}" stroke-width="2.4"/>
          <circle cx="11" cy="3" r="5" fill="#FF9F43" stroke="${INK}" stroke-width="2.4"/>
          <circle cx="9" cy="8" r="7" fill="#fff" stroke="${INK}" stroke-width="2.4"/>
          <circle cx="11" cy="8" r="2.6" fill="${INK}"/>
          <circle cx="15" cy="14" r="3" fill="${PINK}" opacity=".85"/>
          <path d="M-14,22 Q-6,29 0,23 Q8,30 15,22" fill="none" stroke="#FF9F43" stroke-width="6" opacity=".7" ${W}/>
          <path d="M-24,10 H-15 M-26,16 H-17" stroke="${YELLOW}" stroke-width="3" ${W}/>
        </g>`;
    }
    return `
      <g>
        <ellipse cx="0" cy="17" rx="18" ry="12" fill="#FF9F43" stroke="${INK}" stroke-width="3"/>
        <ellipse cx="0" cy="20" rx="12" ry="6.5" fill="#FFF3D6"/>
        <circle cx="-11" cy="7" r="4.8" fill="#FF9F43" stroke="${INK}" stroke-width="2.4"/>
        <circle cx="-11" cy="7" r="2.2" fill="#FF8FB1"/>
        <circle cx="11" cy="7" r="4.8" fill="#FF9F43" stroke="${INK}" stroke-width="2.4"/>
        <circle cx="11" cy="7" r="2.2" fill="#FF8FB1"/>
        <path d="M-9,14 Q-5,18 -1,14 M3,14 Q7,18 11,14" fill="none" stroke="${INK}" stroke-width="2.4" ${W}/>
        <ellipse cx="-12" cy="19" rx="3.2" ry="1.8" fill="#FF8FB1" opacity=".8"/>
        <ellipse cx="12" cy="19" rx="3.2" ry="1.8" fill="#FF8FB1" opacity=".8"/>
        <circle cx="1" cy="17" r="1.8" fill="${PINK}"/>
      </g>`;
  }

  function phoneInnerSVG(level = 1, bossDead = false) {
    const pct = Math.max(0, Math.min(100, Math.round(level)));
    const good = pct > 20;
    const barW = Math.max(2.2, (pct / 100) * 28);
    const barCol = good ? MINT : RED;
    return `
      <rect x="-32" y="-44" width="64" height="88" rx="12" fill="#000" fill-opacity="0" pointer-events="all"/>
      <rect x="-26" y="-38" width="52" height="76" rx="10" fill="${INK}" stroke="${INK}" stroke-width="3"/>
      <rect class="l10-screen ${good ? 'l10-ok' : ''}" x="-21" y="-31" width="42" height="58" rx="5"/>
      <rect x="-6" y="-34.5" width="12" height="2.4" rx="1.2" fill="#525270"/>
      <rect x="-7" y="30.5" width="14" height="4.5" rx="2.2" fill="${good ? MINT : '#474766'}" stroke="#111122" stroke-width="1.2"/>
      <!-- battery icon -->
      <rect x="-16" y="-24" width="32" height="13" rx="3" fill="#1B1B2F" stroke="#fff" stroke-width="1.8"/>
      <rect x="16" y="-20.5" width="3" height="6" rx="1.2" fill="#fff"/>
      <rect x="-14" y="-22" width="${barW.toFixed(1)}" height="9" rx="1.6" fill="${barCol}"/>
      <!-- big percentage -->
      <text x="0" y="5" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="${pct >= 100 ? 15 : 18}" fill="${good ? '#157A54' : RED}" stroke="#fff" stroke-width="2.5" paint-order="stroke">${pct}%</text>
      <!-- mini boss bar -->
      <rect x="-17" y="11" width="34" height="11.5" rx="3" fill="#23254A"/>
      <text x="0" y="19" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="7" fill="${bossDead ? MINT : YELLOW}">${bossDead ? 'VICTORY!' : 'BOSS 1 HP'}</text>`;
  }

  function outletFaceSVG() {
    return `
      <circle cx="0" cy="0" r="34" fill="#000" fill-opacity="0" pointer-events="all"/>
      <rect x="-19" y="-27" width="38" height="54" rx="8" fill="#FFFDF8" ${S}/>
      <circle cx="0" cy="-20" r="2.2" fill="#9AA3B2" stroke="${INK}" stroke-width="1.5"/>
      <circle cx="0" cy="20" r="2.2" fill="#9AA3B2" stroke="${INK}" stroke-width="1.5"/>
      <!-- top empty outlet -->
      <rect x="-11" y="-15" width="22" height="14" rx="4" fill="#E6ECF5" stroke="${INK}" stroke-width="2"/>
      <path d="M-5,-11 V-6 M5,-11 V-6" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
      <!-- bottom occupied socket with charger block -->
      <rect x="-12" y="1" width="26" height="18" rx="5" fill="#fff" stroke="${INK}" stroke-width="2.8"/>
      <circle cx="8" cy="10" r="2.6" fill="${MINT}" stroke="${INK}" stroke-width="1.4"/>`;
  }

  function sceneSVG() {
    return `
<svg viewBox="0 0 390 630" xmlns="http://www.w3.org/2000/svg" aria-label="Noodle panicking on his couch with a phone at 1 percent while the charger cord is too short">
  <defs>
    <pattern id="l10-wallp" width="34" height="34" patternUnits="userSpaceOnUse">
      <path d="M17,11 L20,17 L17,23 L14,17 Z" fill="#DDD5F3"/>
    </pattern>
    <clipPath id="l10-winclip"><rect x="30" y="40" width="104" height="118" rx="4"/></clipPath>
  </defs>

  <g id="l10-room">
    <!-- cozy late-night living room wall + wood floor (full bleed past HUD and tall screens) -->
    <rect data-tap="wall" x="-30" y="-200" width="450" height="692" fill="#ECE8FA"/>
    <rect x="-30" y="-200" width="450" height="692" fill="url(#l10-wallp)" pointer-events="none"/>
    <rect data-tap="floor" x="-30" y="490" width="450" height="440" fill="#E8A86C"/>
    <path d="M-30,536 H420 M-30,582 H420 M-30,628 H420 M-30,674 H420 M-30,720 H420 M80,490 V536 M240,536 V582 M130,582 V628 M312,490 V536" stroke="#C77D4A" stroke-width="2.6" pointer-events="none"/>
    <rect x="-30" y="484" width="450" height="12" fill="#fff" ${S}/>

    <!-- living room rug -->
    <g data-tap="rug">
      <ellipse cx="195" cy="534" rx="134" ry="22" fill="${SKY}" ${S}/>
      <ellipse cx="195" cy="534" rx="112" ry="14" fill="none" stroke="#FFF4E0" stroke-width="3" stroke-dasharray="8 8"/>
    </g>

    <!-- subtle floor masking-tape clue pointing toward the real phone's charging port -->
    <g id="l10-floor-clue" data-tap="floorClue" transform="translate(195,588)" style="cursor:pointer">
      <rect x="-46" y="-20" width="92" height="42" fill="#000" fill-opacity="0" pointer-events="all"/>
      <rect x="-34" y="-12" width="68" height="24" rx="5" fill="#FFF3C4" stroke="${INK}" stroke-width="2.2" opacity=".88" transform="rotate(-1.5)"/>
      <path d="M-12,-6 L-7,-6 L-12,0 L-8,0 L-14,7 M2,-6 V5 M-3,1 L2,6 L7,1 M14,-6 V5 M9,1 L14,6 L19,1" fill="none" stroke="${INK}" stroke-width="2.2" ${W} opacity=".78"/>
    </g>

    <!-- ============ NIGHT WINDOW (with distant storm cloud) ============ -->
    <g id="l10-window" data-tap="window" style="cursor:pointer">
      <g clip-path="url(#l10-winclip)">
        <rect x="30" y="40" width="104" height="118" fill="#20225A"/>
        <circle cx="48" cy="58" r="2.2" fill="#FFF4C2"/><circle cx="76" cy="70" r="1.8" fill="#FFF4C2"/>
        <circle cx="118" cy="112" r="2" fill="#FFF4C2"/><circle cx="52" cy="120" r="1.6" fill="#FFF4C2"/>
        <path transform="translate(106,66)" d="M4,-11 A12,12 0 1,0 4,11 A9.2,9.2 0 1,1 4,-11 Z" fill="#FFF4C2" stroke="${INK}" stroke-width="1.8" ${W}/>
        <!-- little storm cloud + flashable bolt -->
        <path d="M44,104 C36,104 34,94 42,91 C44,81 58,80 62,88 C70,84 79,90 77,98 C83,100 81,106 74,106 Z" fill="#5D6B8E" stroke="${INK}" stroke-width="2"/>
        <path id="l10-win-bolt" d="M60,104 L54,118 L61,118 L55,134" fill="none" stroke="${YELLOW}" stroke-width="3.4" ${W} opacity="0"/>
        <path d="M26,142 Q64,126 104,142 Q124,148 140,136 V164 H26 Z" fill="#2D4A5E" stroke="${INK}" stroke-width="2.2"/>
      </g>
      <path d="M22,32 H142 V164 H22 Z M30,40 V156 H134 V40 Z" fill="#fff" fill-rule="evenodd" ${S}/>
      <path d="M82,40 V156 M30,98 H134" stroke="#fff" stroke-width="5.5"/><path d="M82,40 V156 M30,98 H134" stroke="${INK}" stroke-width="2.4"/>
      <rect x="16" y="160" width="132" height="12" rx="5" fill="#fff" ${S}/>
    </g>

    <!-- ============ FRAMED LOW-POWER POSTER ============ -->
    <g transform="translate(198,96) rotate(-2)"><g id="l10-poster" data-tap="poster" class="fb" style="cursor:pointer">
      <rect x="-38" y="-48" width="76" height="96" rx="6" fill="#FFFDF8" ${S}/>
      <rect x="-38" y="-48" width="76" height="22" rx="6" fill="${PINK}" stroke="${INK}" stroke-width="3"/>
      <text x="0" y="-33" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="11.5" fill="#fff">LOW POWER</text>
      <rect x="-22" y="-12" width="40" height="20" rx="4" fill="#fff" stroke="${INK}" stroke-width="2.6"/>
      <rect x="18" y="-6" width="5" height="8" rx="1.5" fill="${INK}"/>
      <rect x="-19" y="-9" width="6" height="14" rx="1.5" fill="${RED}"/>
      <text x="4" y="3" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="12" fill="${RED}">1%</text>
      <text x="0" y="28" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="10.5" fill="${INK}">SEND JUICE</text>
    </g></g>

    <!-- ============ RIGHT WALL SHELF + WI-FI ROUTER + CACTUS ============ -->
    <g id="l10-shelf">
      <path d="M272,158 V176 L286,158 M358,158 V176 L344,158" fill="none" stroke="#B5713E" stroke-width="6" ${W}/>
      <rect x="256" y="146" width="118" height="13" rx="5" fill="#C77D4A" ${S}/>
      <!-- Wi-Fi router -->
      <g id="l10-router" data-tap="router" transform="translate(296,136)" style="cursor:pointer">
        <path d="M-14,-8 L-20,-30 M14,-8 L20,-30" stroke="${INK}" stroke-width="3.4" ${W}/>
        <circle cx="-20" cy="-31" r="2.8" fill="${PINK}" stroke="${INK}" stroke-width="1.6"/>
        <circle cx="20" cy="-31" r="2.8" fill="${PINK}" stroke="${INK}" stroke-width="1.6"/>
        <rect x="-24" y="-8" width="48" height="18" rx="5" fill="#32355C" ${S}/>
        <circle id="l10-led1" cx="-12" cy="1" r="2.6" fill="${MINT}"/>
        <circle id="l10-led2" cx="-3" cy="1" r="2.6" fill="${MINT}"/>
        <circle id="l10-led3" cx="6" cy="1" r="2.6" fill="${YELLOW}"/>
      </g>
      <!-- tiny cactus -->
      <g transform="translate(348,128)"><g id="l10-cactus" data-tap="cactus" class="fb" style="cursor:pointer">
        <path d="M-11,4 H11 L8,18 H-8 Z" fill="#E07A4C" ${S}/>
        <rect x="-7" y="-20" width="14" height="25" rx="7" fill="${MINT}" ${S}/>
        <path d="M-7,-8 Q-15,-8 -15,-14 M7,-11 Q14,-11 14,-16" fill="none" stroke="${MINT}" stroke-width="5.5" ${W}/>
        <path d="M-7,-8 Q-15,-8 -15,-14 M7,-11 Q14,-11 14,-16" fill="none" stroke="${INK}" stroke-width="2.2" ${W}/>
        <circle cx="0" cy="-22" r="3.6" fill="${PINK}" stroke="${INK}" stroke-width="1.6"/>
      </g></g>
    </g>

    <!-- ============ WALL CAVITY + LIVE WIRES (revealed when wall outlet is moved!) ============ -->
    <!-- subtle hairline crack behind crooked outlet (diegetic clue!) -->
    <g id="l10-crack" transform="translate(${OUTLET0.x},${OUTLET0.y})" pointer-events="none">
      <path d="M16,-24 L25,-31 L29,-27 M-17,22 L-25,28" fill="none" stroke="${INK}" stroke-width="2" opacity=".48" ${W}/>
    </g>
    <g id="l10-wall-hole" transform="translate(${OUTLET0.x},${OUTLET0.y})" opacity="0" pointer-events="none">
      <path d="M-18,-24 L-8,-28 L10,-25 L19,-18 L17,20 L6,27 L-14,25 L-20,10 Z" fill="#23254A" stroke="${INK}" stroke-width="3" ${W}/>
      <path d="M-14,-8 H12 M-10,6 H14 M0,-22 V-8 M-6,-8 V6 M6,6 V22" stroke="#3D4073" stroke-width="2"/>
    </g>
    <path id="l10-wire-red" d="" fill="none" stroke="${INK}" stroke-width="7.5" ${W} opacity="0" pointer-events="none"/>
    <path id="l10-wire-red-in" d="" fill="none" stroke="${RED}" stroke-width="3.6" ${W} opacity="0" pointer-events="none"/>
    <path id="l10-wire-blue" d="" fill="none" stroke="${INK}" stroke-width="7.5" ${W} opacity="0" pointer-events="none"/>
    <path id="l10-wire-blue-in" d="" fill="none" stroke="${SKY}" stroke-width="3.6" ${W} opacity="0" pointer-events="none"/>

    <!-- ============ PLUSH LIVING ROOM SOFA ============ -->
    <g id="l10-sofa" data-tap="sofa">
      <!-- wooden legs -->
      <rect x="128" y="476" width="12" height="16" rx="3" fill="#B5713E" ${S}/>
      <rect x="250" y="476" width="12" height="16" rx="3" fill="#B5713E" ${S}/>
      <!-- backrest -->
      <rect x="118" y="338" width="154" height="122" rx="26" fill="#7D77C8" ${S}/>
      <path d="M148,366 Q195,358 242,366" fill="none" stroke="#9B96E2" stroke-width="5" stroke-linecap="round" opacity=".6"/>
      <!-- armrests -->
      <rect x="106" y="400" width="30" height="78" rx="14" fill="#6761B2" ${S}/>
      <rect x="254" y="400" width="30" height="78" rx="14" fill="#6761B2" ${S}/>
      <!-- seat cushion -->
      <rect x="128" y="438" width="134" height="42" rx="14" fill="#9A94E2" ${S}/>
    </g>

    <!-- ============ LEFT WOODEN STOOL (holds Turbo Espresso Mug) ============ -->
    <g id="l10-stool" data-tap="stool">
      <path d="M62,474 L58,494 M106,474 L110,494" stroke="#9E5E30" stroke-width="7" ${W}/>
      <path d="M62,474 L58,494 M106,474 L110,494" stroke="${INK}" stroke-width="2.4" ${W}/>
      <rect x="52" y="464" width="64" height="12" rx="5" fill="#D99058" ${S}/>
    </g>

    <!-- ============ RIGHT SIDE TABLE + DEAD 0% POWER BANK ============ -->
    <g id="l10-table-r" data-tap="tableR">
      <rect x="286" y="382" width="11" height="110" rx="3" fill="#B5713E" ${S}/>
      <rect x="358" y="382" width="11" height="110" rx="3" fill="#B5713E" ${S}/>
      <!-- lower shelf -->
      <rect x="284" y="446" width="88" height="10" rx="4" fill="#C77D4A" ${S}/>
      <!-- top plank -->
      <rect x="276" y="370" width="102" height="14" rx="5" fill="#D99058" ${S}/>
    </g>

    <!-- dead 0% power bank decoy on lower shelf -->
    <g id="l10-bank" class="grabbable" transform="translate(${BANK0.x},${BANK0.y})" style="cursor:grab">
      <g id="l10-bank-in" class="fb">
        <circle r="28" fill="#000" fill-opacity="0" pointer-events="all"/>
        <rect x="-26" y="-13" width="52" height="26" rx="7" fill="#6E7891" ${S}/>
        <circle cx="-14" cy="0" r="3" fill="${RED}"/>
        <circle cx="-6" cy="0" r="2.6" fill="#41475B"/>
        <text x="10" y="4.5" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="11.5" fill="#fff">0%</text>
      </g>
    </g>

    <!-- ============ HAMSTER DYNAMO + BOLT THE HAMSTER (Secret #2) ============ -->
    <!-- DIY copper jumper wire running from dynamo box to Noodle's phone side -->
    <path id="l10-dynamo-wire" d="M294,358 C274,380 278,442 252,448 C236,452 228,446 221,440" fill="none" stroke="${INK}" stroke-width="6.4" ${W}/>
    <path d="M294,358 C274,380 278,442 252,448 C236,452 228,446 221,440" fill="none" stroke="${YELLOW}" stroke-width="2.8" ${W}/>
    <path id="l10-dynamo-spark" d="M294,358 C274,380 278,442 252,448 C236,452 228,446 221,440" fill="none" stroke="#FFF9B0" stroke-width="4" stroke-dasharray="10 14" ${W} opacity="0" pointer-events="none"/>

    <g id="l10-hamster-wrap" transform="translate(${HAMSTER.x},${HAMSTER.y})">
      <!-- stand behind wheel -->
      <path d="M-24,48 L0,0 L24,48 M-30,48 H30" fill="none" stroke="#8F9AA8" stroke-width="6" ${W}/>
      <path d="M-24,48 L0,0 L24,48 M-30,48 H30" fill="none" stroke="${INK}" stroke-width="2.4" ${W}/>
      <!-- wheel body + rotating spokes -->
      <circle r="36" fill="#FFFDF6" fill-opacity=".86" stroke="${INK}" stroke-width="3.4"/>
      <g id="l10-wheel-spin">
        <path d="M0,-35 V35 M-35,0 H35 M-25,-25 L25,25 M25,-25 L-25,25" stroke="#B8C3D1" stroke-width="2.6" stroke-linecap="round"/>
        <circle r="31" fill="none" stroke="#E0E6EE" stroke-width="2.4" stroke-dasharray="6 6"/>
      </g>
      <!-- turbo blur ring (hidden until turbo!) -->
      <circle id="l10-turbo-ring" r="24" fill="none" stroke="#FF9F43" stroke-width="11" stroke-dasharray="28 18" opacity="0" pointer-events="none"/>
      <!-- Bolt the hamster -->
      <g id="l10-hamster">${hamsterSVG('sleep')}</g>
      <!-- wheel hub + rim highlight -->
      <circle r="5.5" fill="${YELLOW}" stroke="${INK}" stroke-width="2.6"/>
      <circle r="36" fill="none" stroke="${INK}" stroke-width="3.4"/>
      <!-- sleepy Zzz -->
      <g id="l10-ham-zzz" pointer-events="none">
        <text x="20" y="-26" font-family="Lilita One, sans-serif" font-size="13" fill="#6E7891">z</text>
        <text x="30" y="-36" font-family="Lilita One, sans-serif" font-size="16" fill="#6E7891">Z</text>
      </g>
      <!-- mini dynamo box mounted on left leg of stand -->
      <g transform="translate(-34,34)">
        <rect x="-15" y="-12" width="30" height="24" rx="5" fill="#49507A" ${S}/>
        <path d="M-9,4 A9,9 0 0,1 9,4" fill="#FFFDF6" stroke="${INK}" stroke-width="1.8"/>
        <g id="l10-gauge-needle" transform="translate(0,4) rotate(-65)">
          <path d="M0,0 V-8" stroke="${RED}" stroke-width="2.4" stroke-linecap="round"/>
        </g>
        <circle id="l10-dynamo-led" cx="9" cy="-6" r="2.6" fill="#6E7891"/>
      </g>
      <!-- generous touch/swipe target for the wheel -->
      <circle id="l10-wheel-hit" r="44" fill="#000" fill-opacity="0" pointer-events="all" style="cursor:pointer"/>
    </g>

    <!-- ============ NOODLE + GLOWING 1% PHONE ============ -->
    <g id="l10-noodle-wrap" transform="translate(${ND0.x},${ND0.y})">
      <g id="l10-nd-anim" class="boil fb" style="cursor:grab">
        <g>${ART.noodleLegs()}</g>
        <g>${ART.noodleBody()}</g>
        <g id="l10-nd-arms">${ART.noodleArms('hold')}</g>
        <g id="l10-nd-face" transform="translate(0,-14)">${ART.noodleFace({ eyes: 'wide', mouth: 'frown' })}</g>
        <!-- animated panic sweat drop -->
        <path id="l10-sweat" d="M27,-34 Q32,-26 27,-22 Q22,-26 27,-34 Z" fill="${SKY}" stroke="${INK}" stroke-width="2"/>
      </g>
    </g>

    <!-- Wi-Fi warning badge (flashes if you try dragging Noodle toward the wall outlet!) -->
    <g id="l10-wifi-pop" transform="translate(195,296)" opacity="0" pointer-events="none">
      <g id="l10-wifi-in" class="fb">
        <rect x="-46" y="-18" width="92" height="32" rx="12" fill="#fff" stroke="${INK}" stroke-width="3"/>
        <path d="M-32,3 A14,14 0 0,1 -12,3 M-29,6 A9,9 0 0,1 -15,6" fill="none" stroke="${RED}" stroke-width="2.4" ${W}/>
        <path d="M-32,-5 L-12,9" stroke="${RED}" stroke-width="2.6" ${W}/>
        <text x="12" y="4" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="12.5" fill="${RED}">NO WI-FI!</text>
      </g>
    </g>

    <!-- Noodle's Phone (held right in front of him) -->
    <ellipse id="l10-phone-glow" cx="${PHONE.x}" cy="${PHONE.y}" rx="44" ry="58" fill="${RED}" opacity=".18" pointer-events="none"/>
    <g transform="translate(${PHONE.x},${PHONE.y})"><g id="l10-phone" class="fb" data-tap="phone" style="cursor:pointer">${phoneInnerSVG(1, false)}</g></g>

    <!-- ============ FOREGROUND DRAGGABLES (always render cleanly on top!) ============ -->
    <!-- short wall charger cable (drawn behind plug & outlet plate) -->
    <path id="l10-cord-ink" d="" fill="none" stroke="${INK}" stroke-width="9" ${W} pointer-events="none"/>
    <path id="l10-cord-core" d="" fill="none" stroke="#fff" stroke-width="4.2" ${W} pointer-events="none"/>

    <!-- crooked draggable wall outlet plate (Secret #1!) -->
    <g id="l10-outlet" class="grabbable" transform="translate(${OUTLET0.x},${OUTLET0.y}) rotate(-4)" style="cursor:grab">
      ${outletFaceSVG()}
    </g>

    <!-- draggable charger plug tip -->
    <g id="l10-cord-plug" class="grabbable" transform="translate(${PLUG0.x},${PLUG0.y})" style="cursor:grab">
      <circle r="28" fill="#000" fill-opacity="0" pointer-events="all"/>
      <g id="l10-plug-rot">${usbTipSVG()}</g>
    </g>

    <!-- real-phone giant surge cable (shoots up from bottom edge on Real Charging ending!) -->
    <g id="l10-real-cable" transform="translate(${PHONE_PORT.x},740)" opacity="0" pointer-events="none">
      <path d="M0,18 V260" stroke="${INK}" stroke-width="14" ${W}/>
      <path d="M0,18 V260" stroke="#fff" stroke-width="7.5" ${W}/>
      <path d="M0,18 V260" stroke="${YELLOW}" stroke-width="3" stroke-dasharray="10 12" ${W}/>
      <g transform="scale(1.18)">${usbTipSVG()}</g>
    </g>

    <!-- draggable steaming Turbo Espresso Mug (Secret #2!) -->
    <g id="l10-mug" class="grabbable" transform="translate(${MUG0.x},${MUG0.y})" style="cursor:grab">
      <g id="l10-mug-in" class="fb">${mugSVG()}</g>
    </g>

    <!-- floating FX + speech bubble layers -->
    <g id="l10-fx" pointer-events="none"></g>
    <g id="l10-talk" pointer-events="none"></g>
  </g>
</svg>`;
  }

  Object.assign(ART.stickers, {
    l10real: (uid = 'a') => ART.stickerFrame('#7FF0BD',
      `<g transform="translate(-26,18) scale(.9)">
        <path d="M0,18 V44" stroke="${INK}" stroke-width="10" ${W}/><path d="M0,18 V44" stroke="#fff" stroke-width="5" ${W}/>
        ${usbTipSVG()}
      </g>` +
      `<g transform="translate(-26,-26)">${boltSVG(.62)}</g>` +
      ART.noodle({ x: 18, y: 20, scale: .56, eyes: 'happy', mouth: 'grin', armType: 'up' }), 'l10rl' + uid),
    l10wall: (uid = 'a') => ART.stickerFrame('#7FD3F7',
      `<path d="M-54,-6 Q-34,-28 -18,-8" fill="none" stroke="${RED}" stroke-width="4.5" ${W}/>` +
      `<path d="M-54,8 Q-32,26 -18,4" fill="none" stroke="${YELLOW}" stroke-width="4.5" ${W}/>` +
      `<g transform="translate(-16,-4) rotate(-10) scale(.82)">${outletFaceSVG()}</g>` +
      ART.noodle({ x: 24, y: 20, scale: .52, eyes: 'wide', mouth: 'grin', armType: 'up' }), 'l10wl' + uid),
    l10hamster: (uid = 'a') => ART.stickerFrame('#FFD66B',
      `<circle cx="0" cy="-4" r="36" fill="#FFFDF6" stroke="${INK}" stroke-width="3.5"/>` +
      `<circle cx="0" cy="-4" r="24" fill="none" stroke="#FF9F43" stroke-width="9" stroke-dasharray="22 14"/>` +
      `<g transform="translate(0,-14) scale(.95)">${hamsterSVG('turbo')}</g>` +
      `<g transform="translate(34,-26)">${boltSVG(.55)}</g>` +
      `<g transform="translate(-34,26) scale(.62)">${mugSVG()}</g>`, 'l10hm' + uid),
  });

  const L = {
    id: 10,
    promptHTML: '<span class="pw" id="pw-his">His</span> <span class="pw" id="pw-phone">phone</span> is at <b class="pw" id="pw-1pc">1%</b>!',
    endings: [
      { id: 'real', name: 'Real Outlet', line: "The cord was too short. Your real charger wasn't.", rarity: 42, icon: 'l10real', stamp: 'REAL JUICE!' },
      { id: 'wall', name: 'Portable Outlet', line: "If the cord won't reach the couch, bring the wall.", rarity: 24, icon: 'l10wall', stamp: 'MOVED WALL!' },
      { id: 'hamster', name: 'Hamster Power', line: 'One tiny espresso. One hundred percent battery.', rarity: 14, icon: 'l10hamster', stamp: 'TURBO BOLT!' },
    ],
    hints(found) {
      if (!found.includes('real')) return [
        { text: 'No cord in this room reaches the couch. Maybe yours does?' },
        I.isCharging
          ? { text: 'Already plugged in! Unplug your real phone and plug it back in — or check that crooked wall outlet.', demo: 'realphone' }
          : { text: 'Plug YOUR real phone into a charger! (No cable handy? Try dragging the crooked wall outlet!)', demo: 'realphone' },
      ];
      if (!found.includes('wall')) return [
        { text: "The charger cord is two inches too short. What's holding the other end?" },
        { text: 'Grab the crooked wall outlet and drag it closer to Noodle, then plug the cord in!', demo: 'movewall' },
      ];
      if (!found.includes('hamster')) return [
        { text: 'Bolt the hamster is wired to a mini generator… if only he were awake.' },
        { text: "Drag Noodle's steaming espresso mug over to the sleeping hamster!", demo: 'espresso' },
      ];
      return [{ text: 'All three endings found! The boss never stood a chance.' }];
    },
    demo(kind) {
      if (kind === 'realphone') return [{ x: PHONE_PORT.x, y: 596 }, { x: PHONE_PORT.x, y: PHONE_PORT.y + 8 }];
      if (kind === 'movewall') return [{ x: OUTLET0.x, y: OUTLET0.y }, { x: 138, y: 348 }];
      if (kind === 'espresso') return [{ x: MUG0.x, y: MUG0.y }, { x: 210, y: 360 }, { x: HAMSTER.x, y: HAMSTER.y }];
      return null;
    },
    build,
  };

  function build(ctx) {
    ctx.root.innerHTML = sceneSVG();
    const svg = ctx.root.querySelector('svg');
    const q = (s) => svg.querySelector(s);

    const ndWrap = q('#l10-noodle-wrap'), ndAnim = q('#l10-nd-anim'), ndFace = q('#l10-nd-face'), ndArms = q('#l10-nd-arms'), sweat = q('#l10-sweat');
    const phoneG = q('#l10-phone'), glow = q('#l10-phone-glow'), wifiPop = q('#l10-wifi-pop'), wifiIn = q('#l10-wifi-in');
    const outletEl = q('#l10-outlet'), wallHole = q('#l10-wall-hole'), crack = q('#l10-crack');
    const wireR = q('#l10-wire-red'), wireRi = q('#l10-wire-red-in'), wireB = q('#l10-wire-blue'), wireBi = q('#l10-wire-blue-in');
    const cordInk = q('#l10-cord-ink'), cordCore = q('#l10-cord-core'), plugEl = q('#l10-cord-plug'), plugRot = q('#l10-plug-rot');
    const realCable = q('#l10-real-cable');
    const mugEl = q('#l10-mug'), mugIn = q('#l10-mug-in'), steamEl = q('#l10-steam'), bankEl = q('#l10-bank'), bankIn = q('#l10-bank-in');
    const wheelSpin = q('#l10-wheel-spin'), wheelHit = q('#l10-wheel-hit'), hamsterG = q('#l10-hamster'), hamZzz = q('#l10-ham-zzz');
    const turboRing = q('#l10-turbo-ring'), gaugeNeedle = q('#l10-gauge-needle'), dynamoLed = q('#l10-dynamo-led'), dynamoSpark = q('#l10-dynamo-spark');
    const winBolt = q('#l10-win-bolt'), led1 = q('#l10-led1'), led2 = q('#l10-led2'), led3 = q('#l10-led3');
    const fx = q('#l10-fx'), talkLayer = q('#l10-talk');

    const css = document.createElement('style');
    css.textContent = [
      '.l10-screen{fill:#9CE0FF;animation:l10Flicker 2.1s infinite}',
      '.l10-screen.l10-ok{fill:#D7FFEA;animation:none}',
      '@keyframes l10Flicker{0%,82%,100%{fill:#9CE0FF}88%,94%{fill:#FFD0D8}}',
      '#pw-1pc{color:#FF5964}',
    ].join('');
    document.head.appendChild(css);
    ctx.onCleanup(() => css.remove());

    const st = {
      done: false,
      level: 1,
      outlet: { ...OUTLET0 },
      outletMoved: false,
      holdingOutlet: false,
      plug: { ...PLUG0 },
      holdingPlug: false,
      tautPulls: 0,
      lastTautAt: 0,
      holdingMug: false,
      holdingBank: false,
      wheelAngle: 0,
      wheelVel: 0,
      turbo: false,
      wifiBusy: false,
      lastIdle: performance.now(),
    };

    const alive = () => ctx.alive;
    const setFace = (o) => { ndFace.innerHTML = ART.noodleFace(o); };
    const setArms = (t) => { ndArms.innerHTML = ART.noodleArms(t); };
    const talk = (text, ms = 1900) => ctx.talk(talkLayer, ND0.x, ND0.y - 68, text, ms);

    function pop(x, y, text, color = YELLOW, size = 18) {
      const el = U.svgEl('text', {
        x, y, 'text-anchor': 'middle', 'font-family': 'Lilita One, sans-serif', 'font-size': size,
        fill: color, stroke: INK, 'stroke-width': 3.6, 'paint-order': 'stroke',
      }, fx);
      el.textContent = text;
      U.tween(740, (t) => {
        el.setAttribute('y', (y - t * 42).toFixed(1));
        el.setAttribute('opacity', (1 - t * t).toFixed(2));
      }, U.ease.outCubic).then(() => el.remove());
    }

    function sparkBurst(x, y, count = 8, color = YELLOW) {
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + U.rand(-0.22, 0.22);
        const r0 = 32;
        const r1 = U.rand(52, 76);
        const dot = U.svgEl('circle', { cx: x + Math.cos(a) * r0, cy: y + Math.sin(a) * r0, r: U.rand(3, 5), fill: i % 2 ? color : '#fff', stroke: INK, 'stroke-width': 1.8 }, fx);
        U.tween(480, (t) => {
          const r = U.lerp(r0, r1, t);
          dot.setAttribute('cx', (x + Math.cos(a) * r).toFixed(1));
          dot.setAttribute('cy', (y + Math.sin(a) * r).toFixed(1));
          dot.setAttribute('opacity', (1 - t).toFixed(2));
        }, U.ease.outCubic).then(() => dot.remove());
      }
    }

    function paintPhone(bossDead = false) {
      phoneG.innerHTML = phoneInnerSVG(st.level, bossDead);
      glow.setAttribute('fill', st.level > 20 ? MINT : RED);
      glow.setAttribute('opacity', st.level > 20 ? '.26' : '.18');
    }

    function outletAnchor() {
      return { x: st.outlet.x + 2, y: st.outlet.y + 12 };
    }

    function renderOutletAndCord(taut = false) {
      const rot = st.outletMoved ? 0 : -4;
      outletEl.setAttribute('transform', `translate(${st.outlet.x.toFixed(1)},${st.outlet.y.toFixed(1)}) rotate(${rot})`);

      const movedDist = Math.hypot(st.outlet.x - OUTLET0.x, st.outlet.y - OUTLET0.y);
      const showWires = movedDist > 8;
      wallHole.setAttribute('opacity', showWires ? '1' : '0');
      crack.setAttribute('opacity', showWires ? '0' : '1');
      [wireR, wireRi, wireB, wireBi].forEach((w) => w.setAttribute('opacity', showWires ? '1' : '0'));
      if (showWires) {
        const mx = (OUTLET0.x + st.outlet.x) / 2;
        const my = (OUTLET0.y + st.outlet.y) / 2;
        const d1 = `M${OUTLET0.x - 4},${OUTLET0.y - 6} Q${mx.toFixed(1)},${(my - 26).toFixed(1)} ${st.outlet.x.toFixed(1)},${(st.outlet.y - 4).toFixed(1)}`;
        const d2 = `M${OUTLET0.x + 4},${OUTLET0.y + 8} Q${mx.toFixed(1)},${(my + 28).toFixed(1)} ${st.outlet.x.toFixed(1)},${(st.outlet.y + 6).toFixed(1)}`;
        wireR.setAttribute('d', d1); wireRi.setAttribute('d', d1);
        wireB.setAttribute('d', d2); wireBi.setAttribute('d', d2);
      }

      const a = outletAnchor();
      const dx = st.plug.x - a.x, dy = st.plug.y - a.y;
      const dist = Math.hypot(dx, dy);
      const sag = taut ? 0 : Math.max(0, (MAX_CORD - dist) * 0.36);
      const cx = (a.x + st.plug.x) / 2;
      const cy = (a.y + st.plug.y) / 2 + sag;
      const d = `M${a.x.toFixed(1)},${a.y.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${st.plug.x.toFixed(1)},${st.plug.y.toFixed(1)}`;
      cordInk.setAttribute('d', d);
      cordCore.setAttribute('d', d);

      const angle = (Math.atan2(st.plug.y - cy, st.plug.x - cx) * 180) / Math.PI + 90;
      plugEl.setAttribute('transform', `translate(${st.plug.x.toFixed(1)},${st.plug.y.toFixed(1)})`);
      plugRot.setAttribute('transform', `rotate(${angle.toFixed(1)})`);
    }

    function nearPhonePort(p, r = 44) {
      return Math.hypot(p.x - PHONE_PORT.x, p.y - PHONE_PORT.y) < r || Math.hypot(p.x - PHONE.x, p.y - PHONE.y) < r;
    }

    /* ---------- shared charging finale ---------- */
    async function finishCharge(endingId, talkLine, narrLine) {
      let lastStep = -1;
      const boltEl = U.svgEl('g', { transform: `translate(${PHONE.x},${PHONE.y - 60})`, opacity: 0 }, fx);
      boltEl.innerHTML = boltSVG(0.9);
      U.tween(540, (t) => boltEl.setAttribute('opacity', Math.sin(t * Math.PI).toFixed(2))).then(() => boltEl.remove());

      await U.tween(1150, (t) => {
        if (!alive()) return;
        st.level = U.lerp(1, 100, t);
        paintPhone(t > 0.88);
        const step = Math.floor(t * 7);
        if (step > lastStep) { lastStep = step; A.play('charge', step); }
      }, U.ease.inOutCubic);
      if (!alive()) return;
      paintPhone(true);
      sparkBurst(PHONE.x, PHONE.y, 12, MINT);
      sweat.setAttribute('opacity', '0');
      setFace({ eyes: 'happy', mouth: 'grin' });
      setArms('up');
      U.replay(ndAnim, 'hop');
      talk(talkLine, 2200);
      ctx.say(narrLine);
      await U.wait(880);
      if (alive()) ctx.win(endingId);
    }

    /* ---------- ENDING 1 (MAIN): Real Phone Charging ---------- */
    async function winRealPlug() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      A.play('whoosh');
      realCable.setAttribute('opacity', '1');
      await U.tween(420, (t) => {
        if (!alive()) return;
        const y = U.lerp(720, PHONE_PORT.y + 18, t);
        realCable.setAttribute('transform', `translate(${PHONE_PORT.x},${y.toFixed(1)})`);
      }, U.ease.outBack);
      if (!alive()) return;
      A.play('plugIn'); A.play('zap'); U.haptic([24, 40, 24]);
      sparkBurst(PHONE_PORT.x, PHONE_PORT.y, 10, YELLOW);
      pop(PHONE.x, PHONE.y - 68, 'REAL POWER!', MINT, 20);
      await finishCharge('real', 'WHOA! WHERE DID THAT CORD COME FROM?!', "The cord was too short. Your real charger wasn't.");
    }

    ctx.onCleanup(I.onPower((on) => { if (on && !ctx.locked && !st.done) winRealPlug(); }));
    I.startPower();

    /* ---------- ENDING 2 (SECRET #1): Portable Wall Outlet ---------- */
    async function winWallOutlet() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      st.holdingOutlet = false; st.holdingPlug = false;
      const from = { ...st.plug };
      const target = { x: PHONE_PORT.x, y: PHONE_PORT.y + 16 };
      await U.tween(220, (t) => {
        if (!alive()) return;
        st.plug = { x: U.lerp(from.x, target.x, t), y: U.lerp(from.y, target.y, t) };
        renderOutletAndCord(false);
        plugRot.setAttribute('transform', 'rotate(0)');
      }, U.ease.outBack);
      if (!alive()) return;
      A.play('plugIn'); A.play('zap'); U.haptic([18, 36, 22]);
      sparkBurst(PHONE_PORT.x, PHONE_PORT.y, 10, YELLOW);
      pop(PHONE.x, PHONE.y - 68, 'PLUGGED IN!', MINT, 19);
      await finishCharge('wall', 'DID YOU JUST MOVE THE WALL?!', "If the cord won't reach the couch, bring the wall.");
    }

    /* ---------- ENDING 3 (SECRET #2): Hamster Espresso Dynamo ---------- */
    async function winHamsterPower() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      st.holdingMug = false;
      // Tip espresso mug right above Bolt!
      A.play('pour', 0.5);
      await U.tween(320, (t) => {
        if (!alive()) return;
        const x = U.lerp(HAMSTER.x - 30, HAMSTER.x - 16, t);
        const y = U.lerp(HAMSTER.y - 38, HAMSTER.y - 26, t);
        mugEl.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(t * 78).toFixed(1)})`);
      });
      if (!alive()) return;
      pop(HAMSTER.x, HAMSTER.y - 52, 'GULP!!', YELLOW, 20);
      A.play('boing');
      // Hide mug back smoothly and ignite turbo Bolt!
      U.tween(240, (t) => {
        mugEl.setAttribute('opacity', (1 - t).toFixed(2));
      });
      hamZzz.setAttribute('opacity', '0');
      hamsterG.innerHTML = hamsterSVG('turbo');
      st.turbo = true;
      st.wheelVel = 22;
      turboRing.setAttribute('opacity', '.85');
      dynamoLed.setAttribute('fill', MINT);
      dynamoSpark.setAttribute('opacity', '1');
      gaugeNeedle.setAttribute('transform', 'translate(0,4) rotate(68)');
      A.play('zap'); U.haptic([20, 30, 20, 30]);
      sparkBurst(HAMSTER.x - 34, HAMSTER.y + 34, 8, YELLOW);
      pop(HAMSTER.x, HAMSTER.y - 52, '1000 WATTS!', ORANGE, 18);
      await U.wait(420);
      if (!alive()) return;
      await finishCharge('hamster', 'GO BOLT GO!! 100%!!', 'One tiny espresso. One hundred percent battery.');
    }

    function triggerTooShort() {
      const now = performance.now();
      if (now - st.lastTautAt < 700) return;
      st.lastTautAt = now;
      st.tautPulls++;
      A.play('creak'); U.haptic(14);
      // Visual clue: rattle the crooked wall outlet!
      const baseR = st.outletMoved ? 0 : -4;
      U.tween(260, (t) => {
        if (!alive() || st.holdingOutlet) return;
        const j = Math.sin(t * Math.PI * 4) * 8 * (1 - t);
        outletEl.setAttribute('transform', `translate(${(st.outlet.x + j * 0.4).toFixed(1)},${st.outlet.y.toFixed(1)}) rotate(${(baseR + j).toFixed(1)})`);
      });
      pop(st.plug.x, st.plug.y - 26, 'TOO SHORT!', RED, 16);
      if (st.tautPulls === 1) {
        talk('Just two more inches!!');
        ctx.say('So close! The cord is two inches too short.');
      } else {
        talk('Wait—the wall outlet just wiggled!');
        ctx.say('Hey… the wall outlet wiggled when you pulled that.');
      }
    }

    /* ---------- DRAG: Charger Plug (hits 2-inch wall unless outlet moved!) ---------- */
    let plugHitTaut = false;
    I.drag(plugEl, svg, {
      onStart() {
        if (ctx.locked || st.done) return;
        st.holdingPlug = true;
        plugHitTaut = false;
        A.play('tap');
        ctx.attempt();
      },
      onMove(p) {
        if (!st.holdingPlug || ctx.locked || st.done) return;
        const a = outletAnchor();
        let dx = p.x - a.x, dy = p.y - a.y;
        const dist = Math.hypot(dx, dy);
        let taut = false;
        if (dist > MAX_CORD) {
          taut = true;
          const k = MAX_CORD / dist;
          dx *= k; dy *= k;
        }
        st.plug = { x: U.clamp(a.x + dx, 14, 376), y: U.clamp(a.y + dy, 40, 590) };
        renderOutletAndCord(taut);

        if (st.outletMoved && nearPhonePort(st.plug, 42)) {
          winWallOutlet();
          return;
        }

        if (taut && dx > 35) {
          plugHitTaut = true;
          triggerTooShort();
        }
      },
      onTap() {
        st.holdingPlug = false;
        if (ctx.locked || st.done) return;
        A.play('tap');
        ctx.say(st.outletMoved ? 'Drag the plug right into Noodle’s phone!' : 'A real charger! Drag the plug over to his phone.');
      },
      async onEnd(p) {
        if (!st.holdingPlug || st.done) return;
        st.holdingPlug = false;
        const a = outletAnchor();
        if (!st.outletMoved && (plugHitTaut || (p.x - a.x > 65 && Math.hypot(p.x - a.x, p.y - a.y) > MAX_CORD - 14))) {
          triggerTooShort();
        }
        const from = { ...st.plug };
        const rest = { x: U.clamp(a.x + 48, 24, 366), y: U.clamp(a.y + 42, 80, 560) };
        await U.tween(280, (t) => {
          if (!alive() || st.done || st.holdingPlug) return;
          st.plug = { x: U.lerp(from.x, rest.x, t), y: U.lerp(from.y, rest.y, t) };
          renderOutletAndCord(false);
        }, U.ease.outBack);
      },
    });

    /* ---------- DRAG: Crooked Wall Outlet (Secret #1!) ---------- */
    I.drag(outletEl, svg, {
      onStart() {
        if (ctx.locked || st.done) return;
        st.holdingOutlet = true;
        A.play('creak'); U.haptic(14);
        ctx.attempt();
      },
      onMove(p) {
        if (!st.holdingOutlet || ctx.locked || st.done) return;
        const nx = U.clamp(p.x, 30, 354), ny = U.clamp(p.y, 180, 470);
        const dx = nx - st.outlet.x, dy = ny - st.outlet.y;
        st.outlet = { x: nx, y: ny };
        if (!st.outletMoved && Math.hypot(nx - OUTLET0.x, ny - OUTLET0.y) > 22) {
          st.outletMoved = true;
          A.play('pop'); U.haptic(18);
          pop(OUTLET0.x + 12, OUTLET0.y - 34, 'RIP!!', PINK, 17);
          talk('Wait… ARE YOU MOVING THE WALL?!');
        }
        // Carry the plug smoothly along with the moved outlet
        st.plug = {
          x: U.clamp(st.plug.x + dx, 18, 372),
          y: U.clamp(st.plug.y + dy, 80, 580),
        };
        renderOutletAndCord(false);

        // If dragged very close to Noodle's phone, auto-snap the dangling plug right in!
        const a = outletAnchor();
        if (Math.hypot(a.x - PHONE_PORT.x, a.y - PHONE_PORT.y) < 92 || nearPhonePort(st.plug, 36)) {
          winWallOutlet();
        }
      },
      onTap() {
        st.holdingOutlet = false;
        if (ctx.locked || st.done) return;
        A.play('creak'); U.haptic(10);
        U.tween(240, (t) => {
          if (!alive() || st.holdingOutlet) return;
          const j = Math.sin(t * Math.PI * 3) * 8 * (1 - t);
          outletEl.setAttribute('transform', `translate(${st.outlet.x.toFixed(1)},${st.outlet.y.toFixed(1)}) rotate(${((st.outletMoved ? 0 : -4) + j).toFixed(1)})`);
        });
        ctx.say('Whoa… this wall outlet is completely loose!');
      },
      onEnd() {
        if (!st.holdingOutlet || st.done) return;
        st.holdingOutlet = false;
        A.play('thud');
        const distToPort = Math.hypot(outletAnchor().x - PHONE_PORT.x, outletAnchor().y - PHONE_PORT.y);
        if (distToPort <= MAX_CORD - 4) {
          ctx.say('Nice! Now the cord easily reaches the phone.');
        } else if (st.outletMoved) {
          ctx.say('Drag the outlet a little closer to Noodle!');
        }
      },
    });

    /* ---------- DRAG: Noodle (Decoy — moving him kills the Wi-Fi!) ---------- */
    I.drag(ndAnim, svg, {
      onStart() {
        if (ctx.locked || st.done) return;
        ctx.attempt();
      },
      onMove(p, d) {
        if (ctx.locked || st.done || st.wifiBusy) return;
        const shiftX = U.clamp(d.dx * 0.25, -18, 18);
        ndWrap.setAttribute('transform', `translate(${(ND0.x + shiftX).toFixed(1)},${ND0.y})`);
        if (Math.abs(d.dx) > 22) {
          st.wifiBusy = true;
          A.play('bonk'); U.haptic(16);
          wifiPop.setAttribute('opacity', '1');
          U.replay(wifiIn, 'popin');
          talk('NO! The Wi-Fi dies two inches left!', 2100);
          ctx.say("He refuses to move. One inch off the cushion and Wi-Fi drops.");
          U.tween(260, (t) => {
            if (!alive()) return;
            ndWrap.setAttribute('transform', `translate(${U.lerp(ND0.x + shiftX, ND0.x, t).toFixed(1)},${ND0.y})`);
          }, U.ease.outBack).then(async () => {
            await U.wait(1100);
            if (alive()) wifiPop.setAttribute('opacity', '0');
            st.wifiBusy = false;
          });
        }
      },
      onTap() {
        if (ctx.locked || st.done) return;
        A.play('squeak'); U.replay(ndAnim, 'hop');
        pop(ND0.x, ND0.y - 78, '1%!!', RED, 20);
        talk(U.pick(['Boss is at 1 HP! Save my battery!', "Don't let it die now!!", 'My thumbs are sweating!']));
        ctx.say(U.pick(['He has been on 1% for six dramatic minutes.', 'Priority #1: the boss fight. Priority #2: blinking.']));
      },
      onEnd() {
        if (st.done || st.wifiBusy) return;
        ndWrap.setAttribute('transform', `translate(${ND0.x},${ND0.y})`);
      },
    });

    /* ---------- DRAG: Turbo Espresso Mug (Secret #2!) ---------- */
    I.drag(mugEl, svg, {
      onStart() {
        if (ctx.locked || st.done) return;
        st.holdingMug = true;
        A.play('clink');
        ctx.attempt();
      },
      onMove(p) {
        if (!st.holdingMug || ctx.locked || st.done) return;
        const x = U.clamp(p.x, 22, 368), y = U.clamp(p.y, 40, 570);
        mugEl.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(-6)`);
        if (Math.hypot(x - HAMSTER.x, y - HAMSTER.y) < 52) {
          winHamsterPower();
        }
      },
      onTap() {
        st.holdingMug = false;
        if (ctx.locked || st.done) return;
        mugEl.setAttribute('transform', `translate(${MUG0.x},${MUG0.y})`);
        A.play('clink'); U.replay(mugIn, 'wiggle');
        ctx.say('Triple-shot Turbo Espresso. Legally classified as rocket fuel.');
      },
      async onEnd(p) {
        if (!st.holdingMug || st.done) return;
        st.holdingMug = false;
        const x = U.clamp(p.x, 22, 368), y = U.clamp(p.y, 40, 570);
        if (Math.hypot(x - ND0.x, y - ND0.y) < 66) {
          A.play('bonk');
          talk('No time to sip! Boss is at 1 HP!');
          ctx.say("Noodle's hands are full. Someone else in this room looks sleepy…");
        } else if (Math.hypot(x - BANK0.x, y - BANK0.y) < 48) {
          A.play('bonk');
          ctx.say("Caffeine doesn't charge lithium-ion.");
        } else {
          A.play('thud');
        }
        await U.tween(300, (t) => {
          if (!alive() || st.done || st.holdingMug) return;
          mugEl.setAttribute('transform', `translate(${U.lerp(x, MUG0.x, t).toFixed(1)},${U.lerp(y, MUG0.y, t).toFixed(1)})`);
        }, U.ease.outBack);
      },
    });

    /* ---------- DRAG: Dead 0% Power Bank (Decoy!) ---------- */
    I.drag(bankEl, svg, {
      onStart() {
        if (ctx.locked || st.done) return;
        st.holdingBank = true;
        A.play('tap');
        ctx.attempt();
      },
      onMove(p) {
        if (!st.holdingBank || ctx.locked || st.done) return;
        const x = U.clamp(p.x, 24, 366), y = U.clamp(p.y, 60, 570);
        bankEl.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
      },
      onTap() {
        st.holdingBank = false;
        if (ctx.locked || st.done) return;
        bankEl.setAttribute('transform', `translate(${BANK0.x},${BANK0.y})`);
        A.play('lowBattery'); U.replay(bankIn, 'wiggle');
        pop(BANK0.x, BANK0.y - 26, '0%', RED, 16);
        ctx.say('A power bank at 0%. Truly a brick of false hope.');
      },
      async onEnd(p) {
        if (!st.holdingBank || st.done) return;
        st.holdingBank = false;
        const x = U.clamp(p.x, 24, 366), y = U.clamp(p.y, 60, 570);
        if (nearPhonePort({ x, y }, 58)) {
          A.play('lowBattery'); U.haptic(14);
          pop(PHONE.x, PHONE.y - 62, '0% + 1% = 1%', RED, 15);
          ctx.say("Zero percent can't donate to one percent.");
        } else {
          A.play('thud');
        }
        await U.tween(280, (t) => {
          if (!alive() || st.done || st.holdingBank) return;
          bankEl.setAttribute('transform', `translate(${U.lerp(x, BANK0.x, t).toFixed(1)},${U.lerp(y, BANK0.y, t).toFixed(1)})`);
        }, U.ease.outBack);
      },
    });

    /* ---------- INTERACTION: Hamster Wheel (manual spin = weak spark + fair clue) ---------- */
    let wheelSwipe = 0;
    I.drag(wheelHit, svg, {
      onStart() {
        if (ctx.locked || st.done) return;
        wheelSwipe = 0;
        ctx.attempt();
      },
      onMove(p, d) {
        if (ctx.locked || st.done) return;
        const spd = Math.hypot(d.dx, d.dy);
        if (spd > wheelSwipe + 8) {
          wheelSwipe = spd;
          st.wheelVel = Math.min(10, st.wheelVel + 1.8);
          gaugeNeedle.setAttribute('transform', 'translate(0,4) rotate(-30)');
          dynamoLed.setAttribute('fill', YELLOW);
        }
      },
      onTap() {
        if (ctx.locked || st.done) return;
        A.play('creak');
        st.wheelVel = Math.max(st.wheelVel, 5);
        pop(HAMSTER.x, HAMSTER.y - 46, 'Zzz…', SKY, 16);
        ctx.say("Bolt's wheel is wired to a mini-dynamo. Too bad he's fast asleep.");
      },
      onEnd() {
        if (ctx.locked || st.done) return;
        A.play('squeak');
        pop(HAMSTER.x, HAMSTER.y - 46, '0.2V!', YELLOW, 15);
        ctx.say('Barely a spark. Bolt needs serious fuel to hit 100%.');
      },
    });

    /* ---------- TAPS: Every single background prop reacts! ---------- */
    const taps = {
      phone() {
        ctx.attempt(); A.play('lowBattery'); U.replay(phoneG, 'wiggle');
        pop(PHONE.x, PHONE.y - 60, '1%!', RED, 18);
        ctx.say(U.pick(['Still 1%. Tapping it is brave.', 'One percent has lasted all night. Do not test its mercy.']));
      },
      window() {
        ctx.attempt(); A.play('thunder');
        U.tween(380, (t) => winBolt.setAttribute('opacity', t < 0.25 || (t > 0.4 && t < 0.65) ? '1' : '0'));
        ctx.say('A million volts outside. Terrible Wi-Fi out there though.');
      },
      poster(node) {
        ctx.attempt(); A.play('tap'); U.replay(node, 'wiggle');
        ctx.say('“LOW POWER · SEND JUICE.” Thanks for the update, poster.');
      },
      router() {
        ctx.attempt(); A.play('click');
        led1.setAttribute('fill', RED); led2.setAttribute('fill', RED);
        talk('HEY!! DO NOT TOUCH THE WI-FI!!');
        ctx.say('Touch the router again and Noodle will cry.');
        setTimeout(() => { if (alive()) { led1.setAttribute('fill', MINT); led2.setAttribute('fill', MINT); } }, 850);
      },
      cactus(node) {
        ctx.attempt(); A.play('ouch'); U.replay(node, 'wiggle');
        pop(348, 96, 'OW!', ORANGE, 16);
        ctx.say('Runs on sunlight. Not USB-C.');
      },
      floorClue() {
        ctx.attempt(); A.play('tap');
        ctx.say('An arrow pointing off the bottom of the screen… right toward YOUR charging port.');
      },
      sofa() { ctx.attempt(); A.play('boing'); ctx.say('Checked between the cushions. Just crumbs and one lost sock.'); },
      stool() { ctx.attempt(); A.play('thud'); ctx.say("Noodle's late-night gaming stool."); },
      tableR() { ctx.attempt(); A.play('thud'); ctx.say("Science-fair hamster power station. Still in beta."); },
      rug() { ctx.attempt(); A.play('swish'); ctx.say('No spare cable under the rug.'); },
      wall() { ctx.attempt(); A.play('tap'); ctx.say('There is power behind this wall. And a very loose outlet.'); },
      floor() { ctx.attempt(); A.play('tap'); ctx.say('Nothing on the floor. Maybe below the screen?'); },
    };
    I.taps(svg, (name, node) => { if (ctx.locked || st.done) return; if (taps[name]) taps[name](node); });

    const onPromptClick = (e) => {
      if (ctx.locked || st.done) return;
      if (e.target.id === 'pw-1pc') { A.play('lowBattery'); U.replay(e.target, 'wiggle'); ctx.say('That 1% is doing emotional damage.'); }
      else if (e.target.id === 'pw-phone') { A.play('tap'); U.replay(e.target, 'wiggle'); ctx.say('Yes, HIS phone. Or maybe YOUR phone.'); }
      else if (e.target.id === 'pw-his') { A.play('tap'); U.replay(e.target, 'wiggle'); ctx.say('His phone, your problem.'); }
    };
    ctx.promptEl.addEventListener('click', onPromptClick);
    ctx.onCleanup(() => ctx.promptEl.removeEventListener('click', onPromptClick));

    /* ---------- animation loop ---------- */
    let prev = performance.now();
    (function loop(now) {
      if (!alive()) return;
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;

      // Wheel rotation (smooth decay when manually nudged, infinite blur when turbo!)
      if (st.turbo || st.wheelVel > 0.05) {
        st.wheelAngle = (st.wheelAngle + st.wheelVel * 60 * dt) % 360;
        wheelSpin.setAttribute('transform', `rotate(${st.wheelAngle.toFixed(1)})`);
        if (st.turbo) {
          turboRing.setAttribute('transform', `rotate(${(-st.wheelAngle * 1.4).toFixed(1)})`);
          dynamoSpark.setAttribute('stroke-dashoffset', (-(now / 12) % 48).toFixed(1));
        } else {
          st.wheelVel *= Math.pow(0.08, dt);
          if (st.wheelVel < 0.2) {
            gaugeNeedle.setAttribute('transform', 'translate(0,4) rotate(-65)');
            dynamoLed.setAttribute('fill', '#6E7891');
          }
        }
      }

      if (!st.done) {
        // Urgent battery glow pulse + Noodle nervous sweat bob
        glow.setAttribute('rx', (42 + Math.sin(now / 260) * 4).toFixed(1));
        const sy = Math.sin(now / 320) * 2.5;
        sweat.setAttribute('transform', `translate(0,${sy.toFixed(1)})`);
        // Steam wisps gently drift
        steamEl.setAttribute('transform', `translate(${(Math.sin(now / 420) * 1.6).toFixed(1)},${(Math.cos(now / 360) * 1.8).toFixed(1)})`);
        // Sleepy Zzz float above Bolt
        hamZzz.setAttribute('transform', `translate(0,${(Math.sin(now / 600) * 3).toFixed(1)})`);
        // Router LED blink
        led3.setAttribute('opacity', Math.sin(now / 220) > 0 ? '1' : '.3');

        if (now - st.lastIdle > 11000) {
          st.lastIdle = now;
          ctx.say(U.pick([
            '1%… and the final boss has 1 HP left.',
            'Nobody breathe near that battery.',
            'Two inches of cable stand between victory and tragedy.',
          ]));
        }
      }
      requestAnimationFrame(loop);
    })(prev);

    svg.addEventListener('pointerdown', () => { st.lastIdle = performance.now(); });

    renderOutletAndCord(false);
    paintPhone(false);
  }

  BF.levels = BF.levels || {};
  BF.levels[10] = L;
})(window.BF);
