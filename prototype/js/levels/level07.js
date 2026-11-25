/* Brainflip — Level 7 (redesigned): "Make him sneeze!"
   Sunny kitchen dining table. Noodle is stuck on the edge of a sneeze ("Ah… ah… nope!").
   Main ending : drag the black PEPPER shaker over Noodle's nose and SHAKE your phone
                 (or wiggle the shaker fast back-and-forth!)                             (verb: drag + shake)
   Secret #1   : pull the kitchen window roller blinds ALL the way up so Brainflip's
                 blazing sun shines straight into his eyes — Photic Sneeze Reflex!       (verb: pull / light)
   Secret #2   : blow into your mic (subtle mic button under dusty shelf, or dev key B)
                 OR scrub/tap the 1998 cobwebbed top shelf 3 times for a dust tornado!   (verb: blow / scrub)
   Decoys: fluffy pink feather duster (only makes him giggle!), white SALT shaker
           ("Wrong shaker, chef!"), steaming soup bowl, pop-up tissue box, swinging lamp,
           ticking kitchen clock, rattling blinds on tap, shaking phone without pepper. */
(function (BF) {
  'use strict';
  const U = BF.U, A = BF.audio, I = BF.input, ART = BF.art;
  const INK = '#1B1B2F', YELLOW = '#FFC93C', PINK = '#FF5D8F', MINT = '#3DDC97', SKY = '#5BC0EB', ORANGE = '#FF6B35';
  const W = 'stroke-linecap="round" stroke-linejoin="round"';
  const S = `stroke="${INK}" stroke-width="3.4" ${W}`;

  const ND0 = { x: 195, y: 368 };
  const TISSUE0 = { x: 56, y: 398 };
  const FEATH0 = { x: 116, y: 392 };
  const SOUP0 = { x: 195, y: 410 };
  const PEP0 = { x: 282, y: 392 };
  const SALT0 = { x: 334, y: 392 };
  const DUST_C = { x: 306, y: 122 };
  const BLIND_MAX_Y = 104; // closed blind covers 104px of the 116px window pane

  function shakerSVG({ bodyFill, label, labelBg, labelInk }) {
    return `
      <circle cx="0" cy="0" r="30" fill="#000" fill-opacity="0" pointer-events="all"/>
      <path d="M-12,-15 C-12,-26 12,-26 12,-15 Z" fill="#D5DEE8" stroke="${INK}" stroke-width="3" ${W}/>
      <circle cx="-4.5" cy="-20" r="1.4" fill="${INK}"/><circle cx="0" cy="-22" r="1.4" fill="${INK}"/><circle cx="4.5" cy="-20" r="1.4" fill="${INK}"/>
      <rect x="-14" y="-16" width="28" height="6" rx="2.5" fill="#B8C4D4" stroke="${INK}" stroke-width="2.6"/>
      <path d="M-13,-10 L-16,20 Q-16,26 -9,26 H9 Q16,26 16,20 L13,-10 Z" fill="${bodyFill}" ${S}/>
      <path d="M-9,-5 L-11,17" stroke="#fff" stroke-width="2.8" opacity=".32" stroke-linecap="round"/>
      <circle cx="0" cy="8" r="10" fill="${labelBg}" stroke="${INK}" stroke-width="2.4"/>
      <text x="0" y="12.5" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="13.5" fill="${labelInk}">${label}</text>`;
  }

  function featherSVG() {
    return `
      <circle cx="0" cy="0" r="30" fill="#000" fill-opacity="0" pointer-events="all"/>
      <g transform="rotate(-22)">
        <path d="M-4,16 C-20,6 -22,-18 -4,-34 C14,-22 18,2 0,15 Z" fill="#FF8FB1" stroke="${INK}" stroke-width="3" ${W}/>
        <path d="M-3,-26 C-11,-14 -11,0 -3,9" fill="none" stroke="#FFD6E5" stroke-width="3" stroke-linecap="round"/>
        <path d="M-14,-9 L-7,-6 M12,-12 L5,-8 M-12,3 L-6,4" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M-2,-22 Q-1,6 -5,30" fill="none" stroke="${INK}" stroke-width="5.2" stroke-linecap="round"/>
        <path d="M-2,-22 Q-1,6 -5,30" fill="none" stroke="#FFF4DC" stroke-width="2.2" stroke-linecap="round"/>
      </g>`;
  }

  function soupSVG() {
    return `
      <g id="l7-soup-steam" pointer-events="none">
        <path d="M-12,-14 q-4,-7 0,-13 q4,-6 0,-11" fill="none" stroke="#fff" stroke-width="3" opacity=".82" ${W}/>
        <path d="M8,-16 q4,-7 0,-13 q-4,-6 0,-11" fill="none" stroke="#fff" stroke-width="3" opacity=".72" ${W}/>
      </g>
      <path d="M-30,-4 H30 C28,14 16,20 0,20 C-16,20 -28,14 -30,-4 Z" fill="#fff" ${S}/>
      <ellipse cx="0" cy="-4" rx="28" ry="6.5" fill="#FFAD5A" stroke="${INK}" stroke-width="2.8"/>
      <circle cx="-10" cy="-4" r="2.8" fill="${MINT}"/><circle cx="9" cy="-3" r="2.5" fill="${PINK}"/><circle cx="1" cy="-6" r="2" fill="#FFF3B0"/>
      <path d="M-18,20 H18" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>`;
  }

  function tissueArmPose() {
    // Left arm holds a crumpled tissue near Noodle's nose; right arm rests anxiously
    return `
      <path d="M-33,2 Q-52,-12 -46,-26" fill="none" stroke="${INK}" stroke-width="9" ${W}/>
      <path d="M-33,2 Q-52,-12 -46,-26" fill="none" stroke="${YELLOW}" stroke-width="4" ${W}/>
      <path d="M-54,-24 C-60,-34 -46,-40 -42,-30 C-36,-38 -28,-28 -36,-22 Z" fill="#fff" stroke="${INK}" stroke-width="2.4" ${W}/>
      <circle cx="-45" cy="-26" r="6" fill="${YELLOW}" stroke="${INK}" stroke-width="2.8"/>
      <path d="M33,4 Q46,18 46,32" fill="none" stroke="${INK}" stroke-width="9" ${W}/>
      <path d="M33,4 Q46,18 46,32" fill="none" stroke="${YELLOW}" stroke-width="4" ${W}/>
      <circle cx="46" cy="36" r="6" fill="${YELLOW}" stroke="${INK}" stroke-width="2.8"/>`;
  }

  function sceneSVG() {
    return `
<svg viewBox="0 0 390 630" xmlns="http://www.w3.org/2000/svg" aria-label="Noodle sitting at a cozy kitchen table stuck on the edge of a sneeze">
  <defs>
    <pattern id="l7-wall" width="32" height="32" patternUnits="userSpaceOnUse">
      <rect width="16" height="32" fill="#F8E7C4" opacity=".52"/>
    </pattern>
    <pattern id="l7-blind-pat" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect width="16" height="16" fill="#FFE680"/>
      <rect width="8" height="16" fill="#FFF8DC"/>
    </pattern>
    <clipPath id="l7-winclip"><rect x="30" y="48" width="108" height="116" rx="4"/></clipPath>
    <linearGradient id="l7-beam-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFF5A8" stop-opacity=".86"/>
      <stop offset="68%" stop-color="#FFE46B" stop-opacity=".42"/>
      <stop offset="100%" stop-color="#FFE46B" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <g id="l7-room">
    <!-- cozy kitchen wall + warm wood floor (full bleed past HUD and tall screens) -->
    <rect data-tap="wall" x="-30" y="-200" width="450" height="692" fill="#FFF5DF"/>
    <rect x="-30" y="-200" width="450" height="692" fill="url(#l7-wall)" pointer-events="none"/>
    <rect data-tap="floor" x="-30" y="490" width="450" height="440" fill="#E8A86C"/>
    <path d="M-30,536 H420 M-30,582 H420 M-30,628 H420 M-30,674 H420 M-30,720 H420 M84,490 V536 M244,536 V582 M132,582 V628 M316,490 V536" stroke="#C77D4A" stroke-width="2.6" pointer-events="none"/>
    <rect x="-30" y="484" width="450" height="12" fill="#fff" ${S}/>

    <!-- kitchen rug -->
    <g data-tap="rug">
      <ellipse cx="195" cy="548" rx="134" ry="22" fill="${MINT}" ${S}/>
      <ellipse cx="195" cy="548" rx="112" ry="14" fill="none" stroke="#FFF4DC" stroke-width="3" stroke-dasharray="8 8"/>
    </g>

    <!-- ============ HANGING CEILING LAMP (swings on tap & sneeze!) ============ -->
    <g id="l7-lamp-pivot" transform="translate(195,-16)">
      <g id="l7-lamp" data-tap="lamp" style="cursor:pointer">
        <path d="M0,-170 V50" stroke="${INK}" stroke-width="3.6" ${W}/>
        <circle cx="0" cy="52" r="7" fill="#FFF3B0" stroke="${INK}" stroke-width="2.4"/>
        <path d="M-28,54 Q-26,34 0,34 Q26,34 28,54 Z" fill="${PINK}" ${S}/>
        <ellipse cx="0" cy="54" rx="28" ry="5" fill="#FFE082" stroke="${INK}" stroke-width="2.6"/>
        <circle cx="0" cy="46" r="34" fill="#000" fill-opacity="0" pointer-events="all"/>
      </g>
    </g>

    <!-- ============ KITCHEN WALL CLOCK (center wall) ============ -->
    <g transform="translate(195,126)"><g id="l7-clock" data-tap="clock" class="fb" style="cursor:pointer">
      <circle r="24" fill="${SKY}" ${S}/>
      <circle r="18" fill="#fff" stroke="${INK}" stroke-width="2.4"/>
      <circle cx="0" cy="-13" r="1.6" fill="${INK}"/><circle cx="13" cy="0" r="1.6" fill="${INK}"/>
      <circle cx="0" cy="13" r="1.6" fill="${INK}"/><circle cx="-13" cy="0" r="1.6" fill="${INK}"/>
      <path d="M0,0 V-10" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>
      <g id="l7-clock-m"><path d="M0,0 L8,5" stroke="${PINK}" stroke-width="2.4" stroke-linecap="round"/></g>
      <circle r="2.8" fill="${INK}"/>
    </g></g>

    <!-- ============ LEFT KITCHEN WINDOW + ROLLER BLINDS (Secret #1: Sun Sneeze!) ============ -->
    <g id="l7-window">
      <g clip-path="url(#l7-winclip)">
        <!-- bright sunny sky + Brainflip's grinning Sun waiting behind the blinds! -->
        <rect x="30" y="48" width="108" height="116" fill="#6EC9F2"/>
        <ellipse cx="116" cy="144" rx="28" ry="12" fill="#fff" opacity=".88"/>
        <ellipse cx="52" cy="148" rx="22" ry="10" fill="#fff" opacity=".78"/>
        <g id="l7-sun" transform="translate(84,104) scale(.86)">
          ${ART.sun('happy', { spin: true })}
        </g>
        <!-- bright golden light sliver peeking below closed blinds -->
        <rect id="l7-sun-sliver" x="30" y="152" width="108" height="12" fill="#FFF7A8" opacity=".55"/>

        <!-- draggable striped roller blinds -->
        <g id="l7-blind-pane" transform="translate(0,0)">
          <rect x="30" y="46" width="108" height="${BLIND_MAX_Y}" fill="url(#l7-blind-pat)" stroke="${INK}" stroke-width="3"/>
          <path d="M30,${46 + BLIND_MAX_Y - 12} H138" stroke="${INK}" stroke-width="2.2" opacity=".35"/>
          <rect x="28" y="${46 + BLIND_MAX_Y - 6}" width="112" height="9" rx="4" fill="#F4A261" stroke="${INK}" stroke-width="2.8"/>
        </g>
      </g>
      <!-- window outer frame + sill -->
      <path d="M22,40 H146 V172 H22 Z M30,48 V164 H138 V48 Z" fill="#fff" fill-rule="evenodd" ${S}/>
      <rect x="16" y="168" width="136" height="12" rx="5" fill="#fff" ${S}/>
      <!-- roller bar at top -->
      <rect x="24" y="38" width="120" height="12" rx="6" fill="#F4A261" ${S}/>
      <!-- dangling pull cord & tassel (moves with the blind!) -->
      <g id="l7-blind-handle" class="grabbable" transform="translate(84,${46 + BLIND_MAX_Y})" style="cursor:ns-resize">
        <rect x="-56" y="-88" width="112" height="132" fill="#000" fill-opacity="0" pointer-events="all"/>
        <path d="M0,2 V32" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>
        <circle cx="0" cy="36" r="7.5" fill="${YELLOW}" stroke="${INK}" stroke-width="2.8"/>
        <circle cx="0" cy="36" r="2.5" fill="${PINK}"/>
      </g>
    </g>

    <!-- ============ TOP-RIGHT DUSTY KITCHEN SHELF (Secret #2: Blow / Scrub Dust!) ============ -->
    <g id="l7-dust-area">
      <path d="M262,158 V178 L276,158 M352,158 V178 L338,158" fill="none" stroke="#B5713E" stroke-width="6" ${W}/>
      <rect x="244" y="146" width="128" height="14" rx="5" fill="#C77D4A" ${S}/>
      <!-- antique spice tin + old cookbook -->
      <g transform="translate(274,122)">
        <rect x="-14" y="-12" width="28" height="36" rx="4" fill="#B0BEC5" ${S}/>
        <rect x="-16" y="-16" width="32" height="7" rx="3" fill="#90A4AE" stroke="${INK}" stroke-width="2.4"/>
        <text x="0" y="10" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="8.5" fill="${INK}">1998</text>
      </g>
      <g transform="translate(332,120) rotate(7)">
        <rect x="-16" y="-20" width="32" height="44" rx="4" fill="#FFE0B2" ${S}/>
        <rect x="-16" y="-20" width="8" height="44" rx="3" fill="${ORANGE}" stroke="${INK}" stroke-width="2.4"/>
        <text x="4" y="4" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="7.5" fill="${INK}">SOUP</text>
      </g>
      <!-- cobweb -->
      <path d="M368,86 Q350,100 338,116 M368,86 Q360,112 354,138 M352,92 Q358,104 366,106 M342,104 Q354,116 366,120" fill="none" stroke="#90A4AE" stroke-width="2" opacity=".82" ${W}/>

      <!-- thick gray dust bunnies (scrub or blow!) -->
      <g id="l7-dust-pile" style="cursor:pointer">
        <rect x="236" y="84" width="142" height="76" fill="#000" fill-opacity="0" pointer-events="all"/>
        <g id="l7-dust-bunnies" class="fb">
          <ellipse cx="264" cy="142" rx="16" ry="8.5" fill="#B0B8C4" stroke="${INK}" stroke-width="2.4"/>
          <ellipse cx="304" cy="140" rx="22" ry="10.5" fill="#C6CDD6" stroke="${INK}" stroke-width="2.4"/>
          <ellipse cx="344" cy="142" rx="17" ry="9" fill="#B0B8C4" stroke="${INK}" stroke-width="2.4"/>
          <circle cx="310" cy="130" r="8.5" fill="#CFD6DF" stroke="${INK}" stroke-width="2.2"/>
          <circle cx="282" cy="134" r="6.8" fill="#CFD6DF" stroke="${INK}" stroke-width="2.2"/>
          <circle cx="334" cy="133" r="6.2" fill="#B0B8C4" stroke="${INK}" stroke-width="2.2"/>
          <circle cx="288" cy="108" r="2.4" fill="#90A4AE"/><circle cx="322" cy="102" r="2.8" fill="#90A4AE"/>
        </g>
      </g>

      <!-- subtle opt-in microphone button (fades in cleanly once player interacts with dusty shelf!) -->
      <g id="l7-mic-btn" data-tap="micBtn" transform="translate(308,194)" opacity="0" style="pointer-events:none;cursor:pointer">
        <g id="l7-mic-in" class="fb">
          <circle id="l7-mic-ring" r="20" fill="none" stroke="${MINT}" stroke-width="3.5" opacity="0"/>
          <rect id="l7-mic-pill" x="-44" y="-15" width="88" height="30" rx="15" fill="#fff" ${S}/>
          <g transform="translate(-24,0)">
            <rect x="-4" y="-8" width="8" height="11" rx="4" fill="${PINK}" stroke="${INK}" stroke-width="2"/>
            <path d="M-7,-1 A7,7 0 0,0 7,-1 M0,6 V10 M-4,10 H4" fill="none" stroke="${INK}" stroke-width="2" ${W}/>
          </g>
          <text id="l7-mic-txt" x="10" y="4.5" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="12.5" fill="${INK}">BLOW!</text>
        </g>
      </g>
    </g>

    <!-- ============ KITCHEN CHAIR + NOODLE (Stuck on the edge of a sneeze!) ============ -->
    <g id="l7-chair">
      <rect x="148" y="316" width="94" height="108" rx="18" fill="#D68E54" ${S}/>
      <rect x="162" y="330" width="66" height="16" rx="6" fill="#F2B880" stroke="${INK}" stroke-width="2.6"/>
      <rect x="158" y="432" width="12" height="72" rx="4" fill="#B5713E" ${S}/>
      <rect x="220" y="432" width="12" height="72" rx="4" fill="#B5713E" ${S}/>
    </g>

    <g id="l7-noodle" transform="translate(${ND0.x},${ND0.y})">
      <g id="l7-nd-anim" class="boil fb" data-tap="noodle" style="cursor:pointer">
        <g>${ART.noodleBody({ color: YELLOW })}</g>
        <g id="l7-nd-arms">${tissueArmPose()}</g>
        <g id="l7-nd-face" transform="translate(0,-14)">${ART.noodleFace({ eyes: 'squint', mouth: 'o' })}</g>
        <!-- itchy twitching pink nose! -->
        <circle id="l7-nose" cx="0" cy="-11" r="4.8" fill="${PINK}" stroke="${INK}" stroke-width="2.2"/>
        <!-- pre-sneeze AAAH puff -->
        <g id="l7-ah-puff" opacity="0">
          <text x="0" y="-74" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="22" fill="${PINK}" stroke="${INK}" stroke-width="4" paint-order="stroke">AAAH…</text>
        </g>
      </g>
    </g>

    <!-- ============ KITCHEN DINING TABLE ============ -->
    <g id="l7-table" data-tap="table">
      <!-- table legs -->
      <rect x="38" y="434" width="14" height="82" rx="4" fill="#B5713E" ${S}/>
      <rect x="338" y="434" width="14" height="82" rx="4" fill="#B5713E" ${S}/>
      <!-- tabletop -->
      <rect x="16" y="416" width="358" height="22" rx="7" fill="#E39D62" ${S}/>
      <path d="M24,424 H366" stroke="#F4BE8C" stroke-width="4" stroke-linecap="round" opacity=".7"/>
      <!-- cute scalloped runner cloth under soup -->
      <path d="M138,416 H252 V448 Q238,458 224,448 Q210,458 195,448 Q180,458 166,448 Q152,458 138,448 Z" fill="#fff" ${S}/>
      <path d="M150,434 H240" stroke="${PINK}" stroke-width="3" stroke-dasharray="6 6" stroke-linecap="round"/>
    </g>

    <!-- ============ TABLE PROPS (Tissue Box + Soup Bowl) ============ -->
    <g id="l7-tissues" transform="translate(${TISSUE0.x},${TISSUE0.y})">
      <g id="l7-tissues-in" data-tap="tissues" class="fb" style="cursor:pointer">
        <path d="M-10,-16 C-14,-34 2,-38 4,-26 C12,-34 20,-24 10,-16 Z" fill="#fff" stroke="${INK}" stroke-width="2.6" ${W}/>
        <rect x="-25" y="-16" width="50" height="34" rx="7" fill="${MINT}" ${S}/>
        <ellipse cx="0" cy="-16" rx="11" ry="3.2" fill="${INK}"/>
        <path d="M-14,1 H14 M-9,9 H9" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".72"/>
      </g>
    </g>

    <g id="l7-soup" transform="translate(${SOUP0.x},${SOUP0.y})">
      <g id="l7-soup-in" data-tap="soup" class="fb" style="cursor:pointer">
        ${soupSVG()}
      </g>
    </g>

    <!-- ============ DIAGONAL GOLDEN SUNBEAM OVERLAY (Secret #1) ============ -->
    <polygon id="l7-sunbeam" points="30,48 138,48 295,436 125,436" fill="url(#l7-beam-grad)" opacity="0" pointer-events="none"/>

    <!-- ============ FOREGROUND DRAGGABLE PROPS (outer translate + inner .fb!) ============ -->
    <g id="l7-feather" class="grabbable" transform="translate(${FEATH0.x},${FEATH0.y})" style="cursor:grab">
      <g id="l7-feather-in" class="fb">${featherSVG()}</g>
    </g>

    <g id="l7-salt" class="grabbable" transform="translate(${SALT0.x},${SALT0.y})" style="cursor:grab">
      <g id="l7-salt-in" class="fb">${shakerSVG({ bodyFill: '#FFF9EC', label: 'S', labelBg: MINT, labelInk: '#fff' })}</g>
    </g>

    <g id="l7-pepper" class="grabbable" transform="translate(${PEP0.x},${PEP0.y})" style="cursor:grab">
      <g id="l7-pepper-in" class="fb">${shakerSVG({ bodyFill: '#2E3047', label: 'P', labelBg: '#FFF4DC', labelInk: INK })}</g>
    </g>

    <!-- FX + Speech Bubble layers -->
    <g id="l7-fx" pointer-events="none"></g>
    <g id="l7-talk" pointer-events="none"></g>
  </g>
</svg>`;
  }

  Object.assign(ART.stickers, {
    l7pepper: (uid = 'a') => ART.stickerFrame('#FF7E5F',
      `<g transform="translate(26,-30) rotate(148) scale(.72)">${shakerSVG({ bodyFill: '#2E3047', label: 'P', labelBg: '#FFF4DC', labelInk: INK })}</g>` +
      `<circle cx="6" cy="-10" r="3" fill="${INK}"/><circle cx="14" cy="-4" r="2.5" fill="${INK}"/><circle cx="-2" cy="-14" r="2.5" fill="${INK}"/>` +
      ART.noodle({ x: -10, y: 18, scale: 0.6, rot: -14, eyes: 'squint', mouth: 'bigO', armType: 'up' }) +
      `<path d="M10,4 L36,-4 M12,16 L40,16 M8,28 L34,36" stroke="#fff" stroke-width="3.6" ${W}/>`, 'l7p2' + uid),
    l7sun: (uid = 'a') => ART.stickerFrame('#7FD3F7',
      `<polygon points="-58,-58 10,-58 64,60 -12,60" fill="#FFF5A8" opacity=".6"/>` +
      `<g transform="translate(-26,-26) scale(.62)">${ART.sun('happy')}</g>` +
      ART.noodle({ x: 16, y: 18, scale: 0.58, rot: 10, eyes: 'squint', mouth: 'bigO', armType: 'up' }), 'l7s2' + uid),
    l7dust: (uid = 'a') => ART.stickerFrame('#B0BEC5',
      `<circle cx="-30" cy="-24" r="18" fill="#E2E8F0" stroke="${INK}" stroke-width="2.8"/>` +
      `<circle cx="32" cy="-28" r="16" fill="#CBD5E1" stroke="${INK}" stroke-width="2.8"/>` +
      `<circle cx="-38" cy="24" r="14" fill="#CBD5E1" stroke="${INK}" stroke-width="2.8"/>` +
      `<circle cx="36" cy="22" r="17" fill="#E2E8F0" stroke="${INK}" stroke-width="2.8"/>` +
      ART.noodle({ x: 0, y: 12, scale: 0.6, rot: 10, eyes: 'spiral', mouth: 'bigO', armType: 'up' }), 'l7d2' + uid),
  });

  const L = {
    id: 7,
    promptHTML: 'Make him <span class="pw" id="pw-sneeze">sneeze</span>!',
    endings: [
      { id: 'pepper', name: 'Pepper Storm', line: 'Drag, shake, season. Extra spicy!', rarity: 54, icon: 'l7pepper', stamp: 'ACHOOO!' },
      { id: 'sun', name: 'Bright Idea!', line: 'When a sneeze gets stuck, always look at the sun.', rarity: 26, icon: 'l7sun', stamp: 'SUN SNEEZE!' },
      { id: 'dust', name: '1998 Dust Storm', line: 'Decades of shelf dust straight to the nose!', rarity: 16, icon: 'l7dust', stamp: 'DUSTY!' },
    ],
    hints(found) {
      if (!found.includes('pepper')) return [
        { text: 'He is stuck on the edge of a sneeze. Something spicy is right on the table.' },
        {
          text: I.hasMotion
            ? 'Hold the black PEPPER shaker over his nose and SHAKE your phone (or wiggle it fast)!'
            : 'Drag the black PEPPER shaker above his nose and wiggle it fast back and forth!',
          demo: I.hasMotion ? 'shake' : 'pepperWiggle',
        },
      ];
      if (!found.includes('sun')) return [
        { text: 'Ever heard that bright sunlight triggers a stuck sneeze?' },
        { text: 'Pull the striped window blinds ALL the way up to let the sun shine on his face!', demo: 'blinds' },
      ];
      if (!found.includes('dust')) return [
        { text: 'Look at that antique 1998 shelf on the top right… nobody has dusted it in years.' },
        { text: 'Scrub or tap the dusty top shelf 3 times — or tap the mic icon and BLOW!', demo: 'dust' },
      ];
      return [{ text: 'All 3 sneezes found! Bless you, Noodle!' }];
    },
    demo(kind) {
      if (kind === 'pepperWiggle') return [{ x: PEP0.x, y: PEP0.y }, { x: 160, y: 260 }, { x: 230, y: 260 }, { x: 160, y: 260 }];
      if (kind === 'shake') return { shake: true };
      if (kind === 'blinds') return [{ x: 84, y: 178 }, { x: 84, y: 60 }];
      if (kind === 'dust') return [{ x: 256, y: 132 }, { x: 350, y: 132 }, { x: 256, y: 132 }];
      return null;
    },
    build,
  };

  function build(ctx) {
    ctx.root.innerHTML = sceneSVG();
    const svg = ctx.root.querySelector('svg');
    const q = (s) => svg.querySelector(s);

    const room = q('#l7-room');
    const ndG = q('#l7-noodle'), ndAnim = q('#l7-nd-anim'), ndArms = q('#l7-nd-arms'), ndFace = q('#l7-nd-face'), nose = q('#l7-nose'), ahPuff = q('#l7-ah-puff');
    const lampPivot = q('#l7-lamp-pivot'), clockM = q('#l7-clock-m'), soupSteam = q('#l7-soup-steam');
    const blindPane = q('#l7-blind-pane'), blindHandle = q('#l7-blind-handle'), sunSliver = q('#l7-sun-sliver'), sunbeam = q('#l7-sunbeam');
    const pepperEl = q('#l7-pepper'), pepperIn = q('#l7-pepper-in');
    const saltEl = q('#l7-salt'), saltIn = q('#l7-salt-in');
    const featherEl = q('#l7-feather'), featherIn = q('#l7-feather-in');
    const dustPile = q('#l7-dust-pile'), dustBunnies = q('#l7-dust-bunnies');
    const micBtn = q('#l7-mic-btn'), micIn = q('#l7-mic-in'), micPill = q('#l7-mic-pill'), micTxt = q('#l7-mic-txt'), micRing = q('#l7-mic-ring');
    const fx = q('#l7-fx'), talkLayer = q('#l7-talk');

    const st = {
      done: false,
      pepperPuffs: 0,
      pepperHeld: false,
      pepperPos: { ...PEP0 },
      overNoodle: false,
      overSince: 0,
      droppedHintFlake: false,
      saltHeld: false,
      saltPos: { ...SALT0 },
      featherHeld: false,
      featherPos: { ...FEATH0 },
      blindOpen: 0, // 0 = closed, 1 = fully open
      holdingBlind: false,
      dustHits: 0,
      micRevealed: false,
      lampVel: 0,
      lampAng: 0,
      lastTickle: 0,
      lastPuffAt: 0,
      lastSaltAt: 0,
      lastDustAt: 0,
      lastIdle: performance.now(),
    };

    const alive = () => ctx.alive;
    const setFace = (o) => { ndFace.innerHTML = ART.noodleFace(o); };
    const setArms = (t) => { ndArms.innerHTML = t === 'tissue' ? tissueArmPose() : ART.noodleArms(t, YELLOW); };
    const talk = (text, ms = 1850) => ctx.talk(talkLayer, ND0.x, ND0.y - 68, text, ms);

    function isOverNoodle(x, y) {
      return x >= 116 && x <= 274 && y >= 150 && y <= 355;
    }

    function pop(x, y, text, color = PINK, size = 18) {
      const el = U.svgEl('text', {
        x, y, 'text-anchor': 'middle',
        'font-family': 'Lilita One, sans-serif', 'font-size': size,
        fill: color, stroke: INK, 'stroke-width': 3.6, 'paint-order': 'stroke',
      }, fx);
      el.textContent = text;
      U.tween(700, (t) => {
        el.setAttribute('y', (y - t * 42).toFixed(1));
        el.setAttribute('opacity', (1 - t * t).toFixed(2));
      }, U.ease.outCubic).then(() => el.remove());
    }

    function setBlind(open) {
      st.blindOpen = U.clamp(open, 0, 1);
      const lift = st.blindOpen * (BLIND_MAX_Y - 12);
      blindPane.setAttribute('transform', `translate(0,${(-lift).toFixed(1)})`);
      blindHandle.setAttribute('transform', `translate(84,${(46 + BLIND_MAX_Y - lift).toFixed(1)})`);
      sunSliver.setAttribute('opacity', (0.55 * (1 - st.blindOpen)).toFixed(2));
      sunbeam.setAttribute('opacity', (st.blindOpen > 0.25 ? (st.blindOpen - 0.25) * 0.95 : 0).toFixed(2));
    }

    function revealMicBadge() {
      if (st.micRevealed) return;
      st.micRevealed = true;
      micBtn.setAttribute('opacity', '1');
      micBtn.style.pointerEvents = 'all';
      U.replay(micIn, 'popin');
    }

    /* ---------- SHARED EXPLOSIVE MEGA SNEEZE FINALE ---------- */
    async function triggerSneeze(endingId, style, talkLine, narrLine) {
      if (st.done || !alive()) return;
      st.done = true;
      ctx.locked = true;
      I.stopMic();

      // 1. Giant dramatic inhale ("AAAH…")
      setFace({ eyes: 'squint', mouth: 'bigO' });
      setArms('up');
      ahPuff.setAttribute('opacity', '1');
      nose.setAttribute('r', '7.6');
      A.play('wobble');
      await U.tween(380, (t) => {
        if (!alive()) return;
        const sx = U.lerp(1, 1.18, t), sy = U.lerp(1, 1.14, t);
        ndAnim.setAttribute('transform', `translate(0,${(-t * 14).toFixed(1)}) scale(${sx.toFixed(3)},${sy.toFixed(3)})`);
      }, U.ease.outCubic);
      if (!alive()) return;

      // 2. EXPLOSIVE ACHOOO!!
      ahPuff.setAttribute('opacity', '0');
      A.play('sneeze');
      U.haptic([30, 45, 110]);
      U.replay(room, 'quake');
      st.lampVel = 18; // sneeze blast swings the ceiling lamp!

      const blast = U.svgEl('text', {
        x: ND0.x, y: ND0.y - 84, 'text-anchor': 'middle',
        'font-family': 'Lilita One, sans-serif', 'font-size': 42,
        fill: YELLOW, stroke: INK, 'stroke-width': 6.5, 'paint-order': 'stroke',
      }, fx);
      blast.textContent = 'ACHOOO!!';

      const ring = U.svgEl('circle', {
        cx: ND0.x, cy: ND0.y - 12, r: 16, fill: 'none',
        stroke: style === 'sun' ? '#FFE46B' : style === 'dust' ? '#CBD5E1' : '#fff',
        'stroke-width': 6,
      }, fx);

      for (let i = 0; i < 14; i++) {
        const ang = (i / 14) * Math.PI * 2 + U.rand(-0.2, 0.2);
        const dist = U.rand(70, 165);
        const p = i % 3 === 0
          ? U.svgEl('path', { d: 'M-10,-6 Q0,-12 10,-6 Q6,4 10,10 Q0,6 -10,10 Q-6,2 -10,-6 Z', fill: '#fff', stroke: INK, 'stroke-width': 2.2 }, fx)
          : U.svgEl('circle', {
              r: U.rand(3.5, 7.2).toFixed(1),
              fill: style === 'pepper' ? INK : style === 'dust' ? '#B0BEC5' : '#FFD23F',
              stroke: INK, 'stroke-width': 1.8,
            }, fx);
        const sx = ND0.x, sy = ND0.y - 12, rot = U.rand(-240, 240);
        U.tween(720, (t) => {
          const px = sx + Math.cos(ang) * dist * t;
          const py = sy + Math.sin(ang) * dist * t + 36 * t * t;
          p.setAttribute('transform', `translate(${px.toFixed(1)},${py.toFixed(1)}) rotate(${(rot * t).toFixed(0)}) scale(${(1 - t * 0.35).toFixed(2)})`);
          p.setAttribute('opacity', (1 - t * t).toFixed(2));
        }, U.ease.outCubic).then(() => p.remove());
      }

      await Promise.all([
        U.tween(540, (t) => {
          if (!alive()) return;
          ring.setAttribute('r', U.lerp(16, 175, t).toFixed(1));
          ring.setAttribute('opacity', (1 - t).toFixed(2));
          blast.setAttribute('transform', `translate(0,${(-t * 28).toFixed(1)}) scale(${(1 + Math.sin(t * Math.PI) * 0.16).toFixed(2)})`);
          blast.setAttribute('opacity', (1 - t * 0.85).toFixed(2));
        }, U.ease.outCubic),
        U.tween(520, (t) => {
          if (!alive()) return;
          const rec = Math.sin(t * Math.PI);
          ndAnim.setAttribute('transform', `translate(${(rec * -18).toFixed(1)},${(rec * 12).toFixed(1)}) rotate(${(rec * -15).toFixed(1)}) scale(${(1 - rec * 0.08).toFixed(2)},${(1 + rec * 0.12).toFixed(2)})`);
        }, U.ease.outCubic),
      ]);
      ring.remove(); blast.remove();
      if (!alive()) return;

      ndAnim.setAttribute('transform', '');
      nose.setAttribute('r', '3.6');
      setFace({ eyes: 'happy', mouth: 'grin' });
      setArms('wave');
      talk(talkLine, 2200);
      ctx.say(narrLine);
      await U.wait(650);
      if (alive()) ctx.win(endingId);
    }

    /* ---------- ENDING 1 (MAIN): PEPPER STORM (Drag + Shake OR Wiggle!) ---------- */
    function sprinklePepper(px, py) {
      if (st.done) return;
      const now = performance.now();
      if (now - st.lastPuffAt < 340) return;
      st.lastPuffAt = now;
      st.pepperPuffs++;
      A.play('shakeSalt');
      U.haptic(18);
      ctx.attempt();

      for (let i = 0; i < 12; i++) {
        const sx = px + U.rand(-16, 16), sy = py + 12;
        const flake = U.svgEl('circle', { cx: sx, cy: sy, r: U.rand(2.2, 4.2).toFixed(1), fill: i % 4 === 0 ? '#5E6478' : INK }, fx);
        const tx = ND0.x + U.rand(-24, 24), ty = ND0.y - 12 + U.rand(-14, 14);
        U.tween(460, (t) => {
          flake.setAttribute('cx', U.lerp(sx, tx, t).toFixed(1));
          flake.setAttribute('cy', U.lerp(sy, ty, t).toFixed(1));
          flake.setAttribute('opacity', (1 - t * t).toFixed(2));
        }, U.ease.outCubic).then(() => flake.remove());
      }

      if (st.pepperPuffs === 1) {
        nose.setAttribute('r', '5.8');
        setFace({ eyes: 'squint', mouth: 'o' });
        pop(ND0.x, ND0.y - 68, 'Sniff…!', ORANGE, 18);
        talk('Ooh, spicy!!');
        ctx.say('Spicy! Give it another shake!');
      } else if (st.pepperPuffs === 2) {
        nose.setAttribute('r', '6.8');
        setFace({ eyes: 'squint', mouth: 'bigO' });
        setArms('shrug');
        pop(ND0.x, ND0.y - 72, 'AAAH…!', PINK, 22);
        talk('AAAH… ONE MORE SHAKE!!');
        ctx.say('Right on the edge — one more shake!');
      } else {
        triggerSneeze('pepper', 'pepper', 'Ahhhh… FINALLY!! Bless me!', 'Drag, shake, season. Extra spicy!');
      }
    }

    function sprinkleSalt(px, py) {
      if (st.done) return;
      const now = performance.now();
      if (now - st.lastSaltAt < 460) return;
      st.lastSaltAt = now;
      A.play('shakeSalt');
      ctx.attempt();

      for (let i = 0; i < 10; i++) {
        const sx = px + U.rand(-14, 14), sy = py + 12;
        const grain = U.svgEl('rect', { x: sx, y: sy, width: 4.5, height: 4.5, rx: 1, fill: '#fff', stroke: INK, 'stroke-width': 1.2 }, fx);
        const tx = ND0.x + U.rand(-24, 24), ty = ND0.y - 16 + U.rand(-10, 14);
        U.tween(440, (t) => {
          grain.setAttribute('x', U.lerp(sx, tx, t).toFixed(1));
          grain.setAttribute('y', U.lerp(sy, ty, t).toFixed(1));
          grain.setAttribute('opacity', (1 - t * t).toFixed(2));
        }, U.ease.outCubic).then(() => grain.remove());
      }
      setFace({ eyes: 'wide', mouth: 'frown' });
      pop(ND0.x, ND0.y - 66, 'SALTY!', SKY, 18);
      talk('Bleh! Wrong shaker, chef!');
      ctx.say('Salt only makes him thirsty.');
    }

    let pepPrev = null, pepTravel = 0, pepLastDir = 0, pepFlips = 0;
    I.drag(pepperEl, svg, {
      onStart() {
        if (ctx.locked || st.done) return;
        st.pepperHeld = true;
        pepPrev = null; pepTravel = 0; pepLastDir = 0; pepFlips = 0;
        st.droppedHintFlake = false;
        A.play('pop');
        ctx.attempt();
      },
      onMove(p) {
        if (ctx.locked || st.done || !st.pepperHeld) return;
        const x = U.clamp(p.x, 34, 356), y = U.clamp(p.y, 48, 535);
        st.pepperPos = { x, y };
        const over = isOverNoodle(x, y);
        if (over && !st.overNoodle) st.overSince = performance.now();
        st.overNoodle = over;
        pepperEl.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${over ? 156 : -10})`);

        if (over) {
          if (pepPrev) {
            const dx = x - pepPrev.x, dy = y - pepPrev.y;
            pepTravel += Math.hypot(dx, dy);
            const dom = Math.abs(dx) > Math.abs(dy) ? dx : dy;
            if (Math.abs(dom) > 5) {
              const dir = Math.sign(dom);
              if (pepLastDir && dir !== pepLastDir) pepFlips++;
              pepLastDir = dir;
            }
            if (pepTravel >= 95 || (pepFlips >= 2 && pepTravel >= 46)) {
              pepTravel = 0; pepFlips = 0;
              sprinklePepper(x, y);
            }
          }
          pepPrev = { x, y };
        } else {
          pepPrev = null; pepTravel = 0; pepFlips = 0;
        }
      },
      onTap() {
        st.pepperHeld = false; st.overNoodle = false;
        if (ctx.locked || st.done) return;
        pepperEl.setAttribute('transform', `translate(${PEP0.x},${PEP0.y})`);
        A.play('shakeSalt'); U.replay(pepperIn, 'wiggle');
        ctx.say('Freshly ground black pepper. Very sneezy.');
      },
      async onEnd() {
        if (!st.pepperHeld) return;
        st.pepperHeld = false; st.overNoodle = false;
        if (st.done) return;
        const sx = st.pepperPos.x, sy = st.pepperPos.y;
        await U.tween(240, (t) => {
          if (!alive() || st.done || st.pepperHeld) return;
          pepperEl.setAttribute('transform', `translate(${U.lerp(sx, PEP0.x, t).toFixed(1)},${U.lerp(sy, PEP0.y, t).toFixed(1)}) rotate(${U.lerp(20, 0, t).toFixed(1)})`);
        }, U.ease.outBack);
        st.pepperPos = { ...PEP0 };
      },
    });

    let saltPrev = null, saltTravel = 0;
    I.drag(saltEl, svg, {
      onStart() {
        if (ctx.locked || st.done) return;
        st.saltHeld = true; saltPrev = null; saltTravel = 0;
        A.play('pop');
        ctx.attempt();
      },
      onMove(p) {
        if (ctx.locked || st.done || !st.saltHeld) return;
        const x = U.clamp(p.x, 34, 356), y = U.clamp(p.y, 48, 535);
        st.saltPos = { x, y };
        const over = isOverNoodle(x, y);
        saltEl.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${over ? 156 : 10})`);
        if (over) {
          if (saltPrev) {
            saltTravel += Math.hypot(x - saltPrev.x, y - saltPrev.y);
            if (saltTravel >= 72) { saltTravel = 0; sprinkleSalt(x, y); }
          }
          saltPrev = { x, y };
        } else {
          saltPrev = null; saltTravel = 0;
        }
      },
      onTap() {
        st.saltHeld = false;
        if (ctx.locked || st.done) return;
        saltEl.setAttribute('transform', `translate(${SALT0.x},${SALT0.y})`);
        A.play('shakeSalt'); U.replay(saltIn, 'wiggle');
        ctx.say('Plain table salt. Not exactly sneeze fuel.');
      },
      async onEnd() {
        if (!st.saltHeld) return;
        st.saltHeld = false;
        if (st.done) return;
        const sx = st.saltPos.x, sy = st.saltPos.y;
        await U.tween(240, (t) => {
          if (!alive() || st.done || st.saltHeld) return;
          saltEl.setAttribute('transform', `translate(${U.lerp(sx, SALT0.x, t).toFixed(1)},${U.lerp(sy, SALT0.y, t).toFixed(1)})`);
        }, U.ease.outBack);
        st.saltPos = { ...SALT0 };
      },
    });

    function onDeviceShake(src) {
      if (ctx.locked || st.done) return;
      if (st.pepperHeld && st.overNoodle) {
        sprinklePepper(st.pepperPos.x, st.pepperPos.y);
      } else if (st.saltHeld && isOverNoodle(st.saltPos.x, st.saltPos.y)) {
        sprinkleSalt(st.saltPos.x, st.saltPos.y);
      } else {
        A.play('shakeSalt');
        U.replay(pepperIn, 'wiggle');
        st.lampVel = 10;
        if (src === 'shake' || src === 'debug') {
          ctx.say('Hold something spicy over his nose first, then shake!');
          ctx.attempt();
        }
      }
    }
    ctx.onCleanup(I.onJolt(() => onDeviceShake('jolt')));
    ctx.onCleanup(I.onShake((src) => onDeviceShake(src || 'shake')));

    /* ---------- ENDING 2 (SECRET #1): BRIGHT IDEA! (Pull Window Blinds Up -> Sun Sneeze!) ---------- */
    let blindStartOpen = 0;
    async function winSunSneeze() {
      if (st.done || !alive()) return;
      st.holdingBlind = false;
      A.play('curtain');
      await U.tween(220, (t) => {
        if (!alive()) return;
        setBlind(U.lerp(st.blindOpen, 1, t));
      }, U.ease.outBack);
      if (!alive() || st.done) return;
      setFace({ eyes: 'squint', mouth: 'o' });
      talk('WHOA—TOO BRIGHT!!', 1400);
      pop(ND0.x, ND0.y - 72, 'SO BRIGHT!!', YELLOW, 19);
      await U.wait(420);
      if (!alive() || st.done) return;
      triggerSneeze('sun', 'sun', 'The sun trick actually worked!!', 'When a sneeze gets stuck, always look at the sun.');
    }

    I.drag(blindHandle, svg, {
      onStart() {
        if (ctx.locked || st.done) return;
        st.holdingBlind = true;
        blindStartOpen = st.blindOpen;
        A.play('tap');
        ctx.attempt();
      },
      onMove(p, d) {
        if (!st.holdingBlind || ctx.locked || st.done) return;
        // Dragging UP (negative dy) rolls the blinds open!
        const next = U.clamp(blindStartOpen + (-d.dy) / (BLIND_MAX_Y - 12), 0, 1);
        setBlind(next);
        if (next >= 0.78) {
          winSunSneeze();
        }
      },
      onTap() {
        st.holdingBlind = false;
        if (ctx.locked || st.done) return;
        A.play('curtain');
        // Quick playful peek of golden sunlight when tapped!
        U.tween(300, (t) => {
          if (!alive() || st.holdingBlind || st.done) return;
          setBlind(Math.sin(t * Math.PI) * 0.22);
        });
        ctx.say('Whoa, blazing sun outside! Good thing the blinds pull up…');
      },
      async onEnd() {
        if (!st.holdingBlind || st.done) return;
        st.holdingBlind = false;
        if (st.blindOpen >= 0.72) {
          winSunSneeze();
          return;
        }
        // Snap gently back down if not pulled all the way up
        const from = st.blindOpen;
        await U.tween(260, (t) => {
          if (!alive() || st.done || st.holdingBlind) return;
          setBlind(U.lerp(from, 0, t));
        }, U.ease.outBack);
        if (from > 0.25) ctx.say('Almost! Pull the blinds all the way up!');
      },
    });

    /* ---------- ENDING 3 (SECRET #2): 1998 DUST STORM (Mic Blow OR Scrub/Tap Shelf!) ---------- */
    function kickDust(mega = false) {
      if (st.done) return;
      const now = performance.now();
      if (!mega && now - st.lastDustAt < 280) return;
      st.lastDustAt = now;
      st.dustHits = mega ? 3 : st.dustHits + 1;
      revealMicBadge();
      A.play('puff');
      U.haptic(mega ? 40 : 16);
      U.replay(dustBunnies, 'wiggle');
      ctx.attempt();

      const clouds = mega ? 14 : 6;
      for (let i = 0; i < clouds; i++) {
        const sx = DUST_C.x + U.rand(-40, 40), sy = DUST_C.y + U.rand(-6, 16);
        const c = U.svgEl('circle', {
          cx: sx, cy: sy, r: U.rand(mega ? 12 : 8, mega ? 22 : 14).toFixed(1),
          fill: i % 2 ? '#CBD5E1' : '#E2E8F0', stroke: INK, 'stroke-width': 2.2, opacity: '0.92',
        }, fx);
        const tx = ND0.x + U.rand(-30, 30), ty = ND0.y - 12 + U.rand(-24, 20);
        U.tween(mega ? 620 : 520, (t) => {
          c.setAttribute('cx', U.lerp(sx, tx, t).toFixed(1));
          c.setAttribute('cy', U.lerp(sy, ty, t).toFixed(1));
          c.setAttribute('opacity', (0.92 * (1 - t * 0.7)).toFixed(2));
        }, U.ease.outCubic).then(() => c.remove());
      }

      if (mega) {
        for (let i = 0; i < 3; i++) {
          const y0 = 104 + i * 16;
          const gust = U.svgEl('path', {
            d: `M368,${y0} Q288,${y0 + 36} 214,${ND0.y - 24 + i * 12}`,
            fill: 'none', stroke: '#fff', 'stroke-width': 4.5, 'stroke-linecap': 'round', opacity: '0.88',
          }, fx);
          U.tween(540, (t) => gust.setAttribute('opacity', (0.88 * (1 - t)).toFixed(2))).then(() => gust.remove());
        }
        dustBunnies.setAttribute('opacity', '0.18');
        talk('WHOA!! 1998 DUST STORM!!', 1400);
        setTimeout(() => {
          if (alive() && !st.done) triggerSneeze('dust', 'dust', 'Ahhhh… clean that shelf!!', 'Decades of shelf dust straight to the nose!');
        }, 260);
      } else if (st.dustHits === 1) {
        dustBunnies.setAttribute('opacity', '0.76');
        pop(ND0.x, ND0.y - 66, '*cough*', '#94A3B8', 18);
        talk('*cough* Is that dust from 1998?!');
        ctx.say('That shelf has not been dusted this century. Keep going — or blow!');
      } else if (st.dustHits === 2) {
        dustBunnies.setAttribute('opacity', '0.48');
        nose.setAttribute('r', '6.6');
        setFace({ eyes: 'squint', mouth: 'bigO' });
        pop(ND0.x, ND0.y - 72, 'SO DUSTY…!', '#94A3B8', 20);
        talk('AAAH… TOO MUCH DUST!!');
        ctx.say('One more puff of shelf dust!');
      } else {
        dustBunnies.setAttribute('opacity', '0.18');
        triggerSneeze('dust', 'dust', 'Ahhhh… clean that shelf!!', 'Decades of shelf dust straight to the nose!');
      }
    }

    let dustPrev = null, dustTravel = 0;
    I.drag(dustPile, svg, {
      onStart(p) {
        if (ctx.locked || st.done) return;
        dustPrev = p; dustTravel = 0;
      },
      onMove(p) {
        if (ctx.locked || st.done || !dustPrev) return;
        dustTravel += Math.hypot(p.x - dustPrev.x, p.y - dustPrev.y);
        dustPrev = p;
        if (dustTravel >= 44) {
          dustTravel = 0;
          kickDust(false);
        }
      },
      onTap() {
        dustPrev = null;
        if (ctx.locked || st.done) return;
        kickDust(false);
      },
      onEnd() { dustPrev = null; },
    });

    ctx.onCleanup(I.onBlow(() => { if (!ctx.locked && !st.done) kickDust(true); }));
    ctx.onCleanup(() => I.stopMic());

    /* ---------- GDD DECOY: PINK TICKLE FEATHER (giggles only!) ---------- */
    I.drag(featherEl, svg, {
      onStart() {
        if (ctx.locked || st.done) return;
        st.featherHeld = true;
        A.play('swish');
        ctx.attempt();
      },
      onMove(p) {
        if (ctx.locked || st.done || !st.featherHeld) return;
        const x = U.clamp(p.x, 32, 358), y = U.clamp(p.y, 44, 536);
        st.featherPos = { x, y };
        const wob = Math.sin(performance.now() * 0.025) * 14;
        featherEl.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${wob.toFixed(1)})`);
        const now = performance.now();
        if (Math.hypot(x - ND0.x, y - (ND0.y - 10)) < 62 && now - st.lastTickle > 680) {
          st.lastTickle = now;
          A.play('giggle');
          U.replay(ndAnim, 'wiggle');
          setFace({ eyes: 'happy', mouth: 'grin' });
          setArms('hug');
          pop(ND0.x + U.rand(-22, 22), ND0.y - 68, U.pick(['HEHE!', 'TICKLES!', 'HAHA!']), PINK, 19);
          talk(U.pick(['Hehe! Stop, that just tickles!', 'Haha! Feathers only make me laugh!']));
          ctx.say('Classic cartoon trap — feathers only make him giggle.');
        }
      },
      onTap() {
        st.featherHeld = false;
        if (ctx.locked || st.done) return;
        featherEl.setAttribute('transform', `translate(${FEATH0.x},${FEATH0.y})`);
        A.play('swish'); U.replay(featherIn, 'wiggle');
        ctx.say('A fluffy pink feather. Classic… maybe too classic.');
      },
      async onEnd() {
        if (!st.featherHeld) return;
        st.featherHeld = false;
        if (st.done) return;
        const sx = st.featherPos.x, sy = st.featherPos.y;
        await U.tween(320, (t) => {
          if (!alive() || st.done || st.featherHeld) return;
          const cx = U.lerp(sx, FEATH0.x, t);
          const cy = U.lerp(sy, FEATH0.y, t) - Math.sin(t * Math.PI) * 24;
          featherEl.setAttribute('transform', `translate(${cx.toFixed(1)},${cy.toFixed(1)}) rotate(${(Math.sin(t * Math.PI * 2) * 12).toFixed(1)})`);
        }, U.ease.outCubic);
        st.featherPos = { ...FEATH0 };
        if (!st.done) {
          setFace({ eyes: 'squint', mouth: 'o' });
          setArms('tissue');
        }
      },
    });

    /* ---------- ANIMATION LOOP ---------- */
    const t0 = performance.now();
    let prev = t0;
    (function loop(now) {
      if (!alive()) return;
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      const t = (now - t0) / 1000;

      // Lamp pendulum spring physics
      if (Math.abs(st.lampAng) > 0.05 || Math.abs(st.lampVel) > 0.05) {
        st.lampVel += (-26 * st.lampAng - 3.2 * st.lampVel) * dt;
        st.lampAng += st.lampVel * dt;
        lampPivot.setAttribute('transform', `translate(195,-16) rotate(${st.lampAng.toFixed(2)})`);
      }

      if (!st.done) {
        // Gentle pre-sneeze bobbing + itchy nose twitch
        const bob = Math.sin(t * 3.4) * 2;
        ndG.setAttribute('transform', `translate(${ND0.x},${(ND0.y + bob).toFixed(1)})`);
        // Soup steam drift + ticking clock hand
        soupSteam.setAttribute('transform', `translate(${(Math.sin(now / 420) * 1.5).toFixed(1)},${(Math.cos(now / 360) * 1.6).toFixed(1)})`);
        clockM.setAttribute('transform', `rotate(${((now / 80) % 360).toFixed(1)})`);

        // Mic listening ring pulse
        if (I.micActive) {
          const pulse = (t * 1.4) % 1;
          micRing.setAttribute('r', (16 + pulse * 24).toFixed(1));
          micRing.setAttribute('opacity', ((1 - pulse) * 0.78).toFixed(2));
        } else {
          micRing.setAttribute('opacity', '0');
        }

        // Organic physics nudge if player holds PEPPER still over Noodle without shaking
        if (st.pepperHeld && st.overNoodle && !st.droppedHintFlake && now - st.overSince > 1100) {
          st.droppedHintFlake = true;
          A.play('tap');
          const sx = st.pepperPos.x, sy = st.pepperPos.y + 12;
          const dot = U.svgEl('circle', { cx: sx, cy: sy, r: 2.8, fill: INK }, fx);
          U.tween(380, (k) => {
            dot.setAttribute('cy', U.lerp(sy, ND0.y - 12, k).toFixed(1));
            dot.setAttribute('opacity', (1 - k).toFixed(2));
          }, U.ease.outCubic).then(() => dot.remove());
          ctx.say(I.hasMotion ? 'Just one speck fell out! SHAKE your phone (or wiggle it)!' : 'Just one speck! Wiggle the shaker fast back and forth!');
        }

        // Non-spoiler idle comedy
        if (now - st.lastIdle > 11000) {
          st.lastIdle = now;
          ctx.say(U.pick([
            'Aaaah… nope. Worst feeling on Earth.',
            'Four minutes on the edge of a sneeze.',
            'His nose is begging for closure.',
          ]));
        }
      }
      requestAnimationFrame(loop);
    })(t0);
    svg.addEventListener('pointerdown', () => { st.lastIdle = performance.now(); });

    /* ---------- TAP REACTIONS (no dead taps, no spoilers!) ---------- */
    const taps = {
      async micBtn() {
        ctx.attempt();
        if (I.micActive) {
          I.stopMic();
          micPill.setAttribute('fill', '#fff');
          micTxt.textContent = 'BLOW!';
          A.play('tap');
          ctx.say('Mic paused. You can also scrub or tap the dusty shelf.');
          return;
        }
        A.play('pop');
        const ok = await I.startMic();
        if (!alive() || st.done) return;
        if (ok) {
          micPill.setAttribute('fill', MINT);
          micTxt.textContent = 'BLOWING…';
          ctx.say('Mic is LIVE! Blow hard at the dusty shelf!');
        } else {
          U.replay(micIn, 'wiggle');
          ctx.say('No mic here — just scrub or tap the dusty shelf right above!');
        }
      },
      noodle() {
        ctx.attempt();
        A.play('wobble'); U.replay(ndAnim, 'hop');
        pop(ND0.x, ND0.y - 68, 'Ah… nope!', PINK, 18);
        talk(U.pick(['Aaaah… nope! Lost it!', 'So close! Help me sneeze!']));
        ctx.say('Stuck at 99% sneeze.');
      },
      tissues(node) {
        ctx.attempt();
        A.play('swish'); U.replay(node, 'hop');
        const tis = U.svgEl('path', { d: 'M-11,-6 Q0,-15 11,-6 Q7,5 11,11 Q0,5 -11,11 Q-7,3 -11,-6 Z', fill: '#fff', stroke: INK, 'stroke-width': 2.2 }, fx);
        U.tween(620, (t) => {
          tis.setAttribute('transform', `translate(${(TISSUE0.x + Math.sin(t * 8) * 14).toFixed(1)},${(TISSUE0.y - 22 - t * 66).toFixed(1)}) rotate(${(t * 45).toFixed(0)})`);
          tis.setAttribute('opacity', (1 - t * t).toFixed(2));
        }, U.ease.outCubic).then(() => tis.remove());
        ctx.say('Tissues locked and loaded. Now we just need the sneeze.');
      },
      soup(node) {
        ctx.attempt();
        A.play('pour', 0.25); U.replay(node, 'wiggle');
        ctx.say('Bland chicken soup. Definitely needs seasoning.');
      },
      lamp() {
        ctx.attempt();
        A.play('click');
        st.lampVel = (st.lampVel >= 0 ? -1 : 1) * 14;
        ctx.say('Cozy bulb. Nowhere near as bright as real sunlight.');
      },
      clock(node) {
        ctx.attempt();
        A.play('clink'); U.replay(node, 'wiggle');
        ctx.say('Tick-tock. Four full minutes stuck on “aaah…”');
      },
      table() { ctx.attempt(); A.play('thud'); ctx.say('Solid kitchen table. Zero allergens.'); },
      rug() { ctx.attempt(); A.play('swish'); ctx.say('Freshly vacuumed. Not a speck of dust down here.'); },
      wall() { ctx.attempt(); A.play('tap'); ctx.say('Clean striped wallpaper.'); },
      floor() { ctx.attempt(); A.play('thud'); ctx.say('Warm wooden floorboards.'); },
    };
    I.taps(svg, (name, node) => { if (ctx.locked || st.done) return; if (taps[name]) taps[name](node); });

    const onPromptClick = (e) => {
      if (ctx.locked || st.done) return;
      if (e.target.id === 'pw-sneeze') {
        U.replay(e.target, 'wiggle'); A.play('puff');
        ctx.say('Bless you! Wait — that was just the word.');
      } else {
        A.play('tap');
        ctx.say('He is stuck on the edge of a sneeze!');
      }
    };
    ctx.promptEl.addEventListener('click', onPromptClick);
    ctx.onCleanup(() => ctx.promptEl.removeEventListener('click', onPromptClick));
  }

  BF.levels = BF.levels || {};
  BF.levels[7] = L;
})(window.BF);
