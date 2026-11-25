/* Brainflip — Level 6 (per GDD v0.1): "How many sheep?"
   Main ending : hold the sky/meadow to enter Slow-Mo, then tap all 5 real jumping sheep directly (taps at normal speed are too fast and don't count!)  (verb: hold + tap)
   Secret #1   : while in Slow-Mo, tap Jumper #4 — the sneaky wolf disguised in wool — to unmask the impostor!  (verb: hold + observe)
   Secret #2   : find & tap the sleepy hidden sheep behind the "How many sheep?" prompt banner (drag banner or tap its peeking nightcap!)  (verb: inspect UI)
   Decoys: Noodle in pajamas, smiling moon, drifting clouds, wooden fence, normal-speed blurry sheep whiffs. */
(function (BF) {
  'use strict';
  const U = BF.U, A = BF.audio, I = BF.input, ART = BF.art;
  const INK = '#1B1B2F', YELLOW = '#FFC93C', PINK = '#FF5D8F', MINT = '#3DDC97', SKY = '#5BC0EB';
  const W = 'stroke-linecap="round" stroke-linejoin="round"';
  const S = `stroke="${INK}" stroke-width="3.2" ${W}`;

  const ND = { x: 76, y: 416 };
  const SHEEP_HIDE = { x: 292, y: -47 }; // tucked behind right end of #prompt; pink nightcap pom-pom peeks subtly above top edge
  const SHEEP_LAND = { x: 308, y: 422 };
  const HERD_N = 6;     // 5 real sheep + 1 wolf impostor
  const REAL_NEED = 5;  // tap all 5 real sheep during Slow-Mo!
  const WOLF_IDX = 3;   // Jumper #4 is a wolf in sheep's clothing
  const GAP = 0.23;     // sim-seconds between jumpers
  const DUR = 0.54;     // sim-seconds to cross screen
  const CYCLE = 2.6;    // full loop in sim-seconds

  function sheepWool(fill = '#FFFFFF') {
    return `<path d="M-24,4 C-32,-2 -30,-16 -18,-18 C-14,-28 2,-28 8,-20 C20,-24 30,-14 26,-2 C32,6 24,18 12,16 C6,22 -8,22 -14,16 C-24,18 -30,10 -24,4 Z" fill="${fill}" ${S}/>`;
  }

  function sheepArt(variant = 0) {
    const faceEye = variant === 1
      ? `<path d="M18,-3 Q21,-7 24,-3 M26,-3 Q29,-7 32,-3" fill="none" stroke="#fff" stroke-width="2" ${W}/>`
      : `<circle cx="21" cy="-4" r="3" fill="#fff"/><circle cx="22" cy="-4" r="1.4" fill="${INK}"/><circle cx="29" cy="-4" r="3" fill="#fff"/><circle cx="30" cy="-4" r="1.4" fill="${INK}"/>`;
    const bow = variant === 2
      ? `<path d="M12,-18 L18,-14 L12,-10 Z M24,-18 L18,-14 L24,-10 Z" fill="${PINK}" stroke="${INK}" stroke-width="1.8" ${W}/>`
      : '';
    return `
      <!-- legs -->
      <path d="M-12,14 L-16,26 M-4,15 L-5,26 M8,15 L12,26 M16,14 L22,25" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
      <!-- tiny fluffy tail -->
      <circle cx="-28" cy="2" r="6" fill="#fff" stroke="${INK}" stroke-width="2.6"/>
      ${sheepWool()}
      <!-- dark sheep head -->
      <ellipse cx="24" cy="-2" rx="13" ry="11" fill="#32304A" ${S}/>
      <!-- floppy ears -->
      <ellipse cx="14" cy="-10" rx="6" ry="3.5" transform="rotate(-28,14,-10)" fill="#32304A" stroke="${INK}" stroke-width="2.4"/>
      <ellipse cx="33" cy="-10" rx="5.5" ry="3.2" transform="rotate(24,33,-10)" fill="#32304A" stroke="${INK}" stroke-width="2.4"/>
      <!-- top wool puff -->
      <circle cx="22" cy="-12" r="6.5" fill="#fff" stroke="${INK}" stroke-width="2.4"/>
      ${faceEye}
      <path d="M23,3 Q26,6 29,3" fill="none" stroke="#FF8FB1" stroke-width="2" ${W}/>
      ${bow}`;
  }

  function wolfSheepArt() {
    return `
      <!-- gray wolf paws -->
      <path d="M-12,14 L-17,26 M-4,15 L-5,26 M8,15 L13,26 M16,14 L23,25" stroke="#5B6275" stroke-width="5" stroke-linecap="round"/>
      <path d="M-12,14 L-17,26 M-4,15 L-5,26 M8,15 L13,26 M16,14 L23,25" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
      <!-- BUSHY GRAY WOLF TAIL sticking out the back! -->
      <path d="M-24,2 C-38,-6 -44,6 -36,14 C-28,16 -24,10 -22,6 Z" fill="#7D869B" stroke="${INK}" stroke-width="2.8" ${W}/>
      <path d="M-38,8 L-31,12" stroke="#DCE3EE" stroke-width="3.5" stroke-linecap="round"/>
      <!-- wool disguise with silver zipper! -->
      ${sheepWool('#F5F4F8')}
      <path d="M-4,-10 V14" stroke="#7D869B" stroke-width="2.6" stroke-dasharray="3 3" stroke-linecap="round"/>
      <rect x="-6.5" y="10" width="5" height="6" rx="1.5" fill="${YELLOW}" stroke="${INK}" stroke-width="1.6"/>
      <!-- wolf snout + pointy wolf ears poking through the hood! -->
      <path d="M13,-10 L11,-24 L21,-13 Z" fill="#7D869B" stroke="${INK}" stroke-width="2.4" ${W}/>
      <path d="M26,-11 L33,-24 L35,-10 Z" fill="#7D869B" stroke="${INK}" stroke-width="2.4" ${W}/>
      <path d="M14,-4 C16,-14 34,-12 39,-3 C41,3 35,8 25,8 C17,8 12,3 14,-4 Z" fill="#7D869B" ${S}/>
      <circle cx="39" cy="-3" r="3" fill="${INK}"/>
      <!-- mischievous yellow eyes + tiny white fang -->
      <circle cx="21" cy="-4" r="3.2" fill="${YELLOW}" stroke="${INK}" stroke-width="1.4"/><circle cx="22" cy="-4" r="1.4" fill="${INK}"/>
      <circle cx="29" cy="-4" r="3.2" fill="${YELLOW}" stroke="${INK}" stroke-width="1.4"/><circle cx="30" cy="-4" r="1.4" fill="${INK}"/>
      <path d="M23,3 Q29,6 34,2" fill="none" stroke="${INK}" stroke-width="2" ${W}/>
      <path d="M30,4 L32,8 L34,3 Z" fill="#fff" stroke="${INK}" stroke-width="1.2"/>
      <!-- whisper tag that only fades in during slow-mo! -->
      <text class="wolf-tag" x="8" y="-28" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="10.5" fill="${YELLOW}" stroke="${INK}" stroke-width="2.2" paint-order="stroke" opacity="0">WOOF?</text>`;
  }

  function unmaskedWolfArt() {
    return `
      <!-- goofy unmasked gray wolf in polka-dot shorts! -->
      <path d="M-26,6 C-42,-4 -48,10 -38,18 C-30,20 -24,12 -22,8 Z" fill="#7D869B" stroke="${INK}" stroke-width="3" ${W}/>
      <ellipse cx="0" cy="4" rx="26" ry="18" fill="#7D869B" ${S}/>
      <!-- pink polka-dot boxers -->
      <path d="M-18,0 H8 V20 H-18 Z" fill="${PINK}" stroke="${INK}" stroke-width="2.8" ${W}/>
      <circle cx="-11" cy="7" r="2.6" fill="#fff"/><circle cx="-1" cy="13" r="2.6" fill="#fff"/><circle cx="2" cy="5" r="2.2" fill="#fff"/>
      <path d="M-12,18 L-16,32 M-2,18 L-4,32 M12,16 L18,30 M20,14 L28,28" stroke="#5B6275" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M13,-12 L11,-28 L22,-15 Z M27,-12 L34,-28 L37,-11 Z" fill="#7D869B" stroke="${INK}" stroke-width="2.6" ${W}/>
      <path d="M12,-4 C14,-16 36,-14 42,-3 C44,4 37,10 26,10 C17,10 10,4 12,-4 Z" fill="#7D869B" ${S}/>
      <circle cx="42" cy="-3" r="3.4" fill="${INK}"/>
      <ellipse cx="22" cy="3" rx="4.5" ry="2.5" fill="#FF8FB1" opacity=".9"/>
      <circle cx="21" cy="-5" r="4" fill="#fff" stroke="${INK}" stroke-width="1.8"/><circle cx="22" cy="-5" r="1.7" fill="${INK}"/>
      <circle cx="30" cy="-5" r="4" fill="#fff" stroke="${INK}" stroke-width="1.8"/><circle cx="31" cy="-5" r="1.7" fill="${INK}"/>
      <ellipse cx="29" cy="4" rx="4.5" ry="3.2" fill="${INK}"/>`;
  }

  function hiddenSheepArt() {
    return `
      <!-- sleepy hidden sheep wearing a cute pink nightcap -->
      <g transform="scale(.88)">
        ${sheepArt(1)}
        <path d="M11,-14 Q22,-36 38,-22 Q29,-12 11,-14 Z" fill="${PINK}" stroke="${INK}" stroke-width="2.6" ${W}/>
        <circle cx="39" cy="-21" r="4.8" fill="${YELLOW}" stroke="${INK}" stroke-width="2.2"/>
        <g id="l6-sh-tag" transform="translate(-14,-28)" opacity="0">
          <rect x="-18" y="-12" width="36" height="22" rx="6" fill="${YELLOW}" stroke="${INK}" stroke-width="2.4"/>
          <text x="0" y="4" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="13" fill="${INK}">+1!</text>
        </g>
      </g>`;
  }

  function nightcapSVG() {
    return `<g transform="translate(0,-48)">
      <path d="M-26,4 Q-6,-34 34,-18 Q22,2 26,6 Z" fill="${SKY}" stroke="${INK}" stroke-width="3.2" ${W}/>
      <path d="M-28,6 Q0,0 28,6" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
      <path d="M-28,6 Q0,0 28,6" fill="none" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>
      <circle cx="36" cy="-16" r="7" fill="${YELLOW}" stroke="${INK}" stroke-width="2.6"/>
    </g>`;
  }

  function miniSheepIcon() {
    return `<g transform="scale(.48)">${sheepWool()}<ellipse cx="22" cy="-2" rx="11" ry="9.5" fill="#32304A" stroke="${INK}" stroke-width="3"/><circle cx="20" cy="-4" r="2.6" fill="#fff"/><circle cx="27" cy="-4" r="2.6" fill="#fff"/></g>`;
  }

  const star = (x, y, r = 2.2) => `<circle class="l6-star" cx="${x}" cy="${y}" r="${r}" fill="#FFF4C2"/>`;

  function sceneSVG() {
    return `
<svg viewBox="0 0 390 630" xmlns="http://www.w3.org/2000/svg" aria-label="Sleepy Noodle counting fast-jumping sheep over a fence at night">
  <defs>
    <linearGradient id="l6-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#191D4D"/>
      <stop offset="0.68" stop-color="#2D337A"/>
      <stop offset="1" stop-color="#48509B"/>
    </linearGradient>
    <radialGradient id="l6-slowg" cx="50%" cy="42%" r="62%">
      <stop offset="0.45" stop-color="#5BC0EB" stop-opacity="0"/>
      <stop offset="1" stop-color="#0B1340" stop-opacity="0.58"/>
    </radialGradient>
  </defs>

  <g id="l6-room">
    <!-- full-bleed starry night sky -->
    <rect data-tap="sky" x="-30" y="-200" width="450" height="580" fill="url(#l6-sky)"/>

    <!-- twinkling stars -->
    <g id="l6-stars" pointer-events="none">
      ${star(36, 46, 2.4)}${star(94, 28, 1.8)}${star(154, 62, 2.2)}${star(226, 36, 2.6)}${star(278, 72, 1.9)}${star(354, 48, 2.4)}
      ${star(58, 128, 1.8)}${star(188, 114, 2.1)}${star(254, 134, 1.7)}${star(342, 148, 2.2)}${star(124, 168, 2)}${star(296, 186, 1.8)}
      <path d="M168,42 Q168,50 176,50 Q168,50 168,58 Q168,50 160,50 Q168,50 168,42 Z" fill="${YELLOW}"/>
      <path d="M332,96 Q332,102 338,102 Q332,102 332,108 Q332,102 326,102 Q332,102 332,96 Z" fill="${MINT}"/>
    </g>

    <!-- sleepy smiling crescent moon (tappable decoy) -->
    <g id="l6-moon" transform="translate(324,84)"><g data-tap="moon" class="fb">
      <circle r="38" fill="#000" fill-opacity="0" pointer-events="all"/>
      <path d="M9,-27 A28,28 0 1,0 9,27 A21,21 0 1,1 9,-27 Z" fill="#FFF1A8" ${S}/>
      <path d="M-12,-4 Q-8,0 -4,-4" fill="none" stroke="${INK}" stroke-width="2.4" ${W}/>
      <path d="M-10,6 Q-6,10 -2,6" fill="none" stroke="${INK}" stroke-width="2.2" ${W}/>
    </g></g>

    <!-- drifting night clouds -->
    <g id="l6-cloud1" transform="translate(86,98)" data-tap="cloud">
      <path d="M-32,10 C-42,10 -44,-4 -30,-6 C-26,-18 -6,-20 2,-10 C14,-16 28,-8 26,4 C34,6 32,16 20,16 H-28 C-34,16 -36,12 -32,10 Z" fill="#525AA8" opacity=".68" stroke="${INK}" stroke-width="2.4"/>
    </g>
    <g id="l6-cloud2" transform="translate(232,140)" data-tap="cloud">
      <path d="M-24,8 C-32,8 -34,-2 -22,-4 C-18,-14 -4,-14 2,-7 C10,-12 22,-5 20,4 C26,6 24,13 14,13 H-20 Z" fill="#525AA8" opacity=".55" stroke="${INK}" stroke-width="2.2"/>
    </g>

    <!-- rolling dreamy hills + night pasture -->
    <path data-tap="hill" d="M-30,362 Q90,306 215,346 Q320,378 420,328 V660 H-30 Z" fill="#2A6558" ${S}/>
    <path data-tap="hill" d="M-30,406 Q125,364 260,392 Q350,412 420,384 V840 H-30 Z" fill="#3B8770" ${S}/>
    <!-- meadow grass tufts & wildflowers -->
    <g pointer-events="none" opacity=".82">
      <path d="M24,458 l-4,-9 m4,9 l4,-10 m104,34 l-3,-8 m3,8 l4,-9 m226,-10 l-4,-8 m4,8 l4,-9 m-160,64 l-4,-9 m4,9 l4,-10" stroke="#255A4D" stroke-width="2.8" stroke-linecap="round"/>
      <circle cx="150" cy="442" r="4.2" fill="${YELLOW}" stroke="${INK}" stroke-width="1.6"/>
      <circle cx="268" cy="456" r="4.2" fill="${PINK}" stroke="${INK}" stroke-width="1.6"/>
      <circle cx="352" cy="482" r="3.8" fill="#fff" stroke="${INK}" stroke-width="1.5"/>
      <circle cx="52" cy="524" r="3.8" fill="${YELLOW}" stroke="${INK}" stroke-width="1.5"/>
    </g>

    <!-- wooden pasture fence (sheep jump right over it!) -->
    <g id="l6-fence" data-tap="fence" transform="translate(195,366)">
      <rect x="-66" y="-26" width="14" height="62" rx="4" fill="#C77D4A" ${S}/>
      <rect x="-7" y="-28" width="14" height="64" rx="4" fill="#C77D4A" ${S}/>
      <rect x="52" y="-26" width="14" height="62" rx="4" fill="#C77D4A" ${S}/>
      <rect x="-78" y="-14" width="156" height="12" rx="4" fill="#E89A5E" ${S}/>
      <rect x="-78" y="8" width="156" height="12" rx="4" fill="#E89A5E" ${S}/>
    </g>

    <!-- sleepy Noodle in pajamas -->
    <g id="l6-nd" transform="translate(${ND.x},${ND.y})" data-tap="noodle">
      <g id="l6-nd-boil" class="boil fb">
        ${ART.noodleLegs()}${ART.noodleBody()}
        <path d="M-36,8 H36 V26 C36,42 22,52 0,52 C-22,52 -36,42 -36,26 Z" fill="${SKY}" stroke="${INK}" stroke-width="3.2"/>
        <path d="M-16,10 V48 M0,10 V51 M16,10 V48" stroke="#fff" stroke-width="3" opacity=".55"/>
        ${nightcapSVG()}
        <g id="l6-nd-arms">${ART.noodleArms('shrug')}</g>
        <g transform="translate(0,-14)"><g id="l6-nd-face">${ART.noodleFace({ eyes: 'spiral', mouth: 'o' })}</g></g>
      </g>
    </g>

    <!-- compact tally pill showing counted real sheep (0 / 5) cleanly above narrator -->
    <g id="l6-tally" transform="translate(195,512)" pointer-events="none">
      <g id="l6-tally-in" class="fb">
        <rect x="-68" y="-20" width="136" height="46" rx="23" fill="${INK}"/>
        <rect x="-68" y="-24" width="136" height="46" rx="23" fill="#FFF4E0" stroke="${INK}" stroke-width="3.4"/>
        <g transform="translate(-34,-2)">${miniSheepIcon()}</g>
        <text id="l6-tally-txt" x="22" y="8" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="25" fill="${INK}">0 / ${REAL_NEED}</text>
      </g>
    </g>

    <!-- JUMPING HERD LAYER (5 real sheep + Jumper #4 Wolf in Wool!) -->
    <g id="l6-herd"></g>

    <!-- Hidden sleepy sheep behind the #prompt banner! (opacity=0 during 470ms intro slam) -->
    <g id="l6-sh-wrap" opacity="0">
      <g id="l6-sh" transform="translate(${SHEEP_HIDE.x},${SHEEP_HIDE.y})" data-no-hold="1" style="cursor:pointer">
        <circle r="38" fill="#000" fill-opacity="0" pointer-events="all"/>
        <g id="l6-sh-in" class="fb">${hiddenSheepArt()}</g>
      </g>
    </g>

    <!-- Slow-mo atmospheric vignette + top-left SLOW-MO badge -->
    <rect id="l6-slow-fx" x="-30" y="-200" width="450" height="1200" fill="url(#l6-slowg)" opacity="0" pointer-events="none"/>
    <g id="l6-slow-pill" transform="translate(20,16)" opacity="0" pointer-events="none">
      <rect x="0" y="0" width="124" height="32" rx="16" fill="#1B1B2F" stroke="${MINT}" stroke-width="2.6"/>
      <circle cx="17" cy="16" r="7" fill="none" stroke="${MINT}" stroke-width="2.4"/>
      <path d="M17,12 V16 L20,18" fill="none" stroke="${MINT}" stroke-width="2.2" ${W}/>
      <text x="31" y="21" font-family="Lilita One, sans-serif" font-size="14" letter-spacing=".5" fill="#fff">SLOW-MO</text>
      <rect x="14" y="26" width="96" height="4" rx="2" fill="#323866"/>
      <rect id="l6-slow-bar" x="14" y="26" width="96" height="4" rx="2" fill="${MINT}"/>
    </g>

    <!-- Circular long-press progress ring (tracks finger position!) -->
    <g id="l6-hold-ui" opacity="0" pointer-events="none">
      <circle r="36" fill="rgba(255,255,255,.16)" stroke="${INK}" stroke-width="7"/>
      <circle r="36" fill="none" stroke="#fff" stroke-width="3.6" opacity=".35"/>
      <circle id="l6-hold-arc" r="36" fill="none" stroke="${YELLOW}" stroke-width="6.5" stroke-linecap="round"
        stroke-dasharray="226.2" stroke-dashoffset="226.2" transform="rotate(-90)"/>
      <text id="l6-hold-lbl" y="-46" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="14" fill="${YELLOW}" stroke="${INK}" stroke-width="3" paint-order="stroke">HOLD…</text>
    </g>

    <g id="l6-fx" pointer-events="none"></g>
    <g id="l6-talk" pointer-events="none"></g>
  </g>
</svg>`;
  }

  const L = {
    id: 6,
    promptHTML: 'How many sheep?',
    endings: [
      { id: 'count', name: 'Slow-Mo Counter', line: 'One, two, three, four, five… COUNTED!', rarity: 56, icon: 'l6slow', stamp: 'COUNTED!' },
      { id: 'wolf', name: 'Wolf in Wool', line: '5 sheep… and 1 VERY bad disguise!', rarity: 18, icon: 'l6wolf', stamp: 'BUSTED!' },
      { id: 'hidden', name: 'Sneaky Sheep', line: 'One was napping behind the question?!', rarity: 20, icon: 'l6hide', stamp: 'FOUND ME!' },
    ],
    hints(found) {
      if (!found.includes('count')) return [
        { text: 'Way too fast to tap! What if you could slow down time first?' },
        { text: 'HOLD your finger on the night sky for Slow-Mo, then tap all 5 real sheep!', demo: 'hold' },
      ];
      if (!found.includes('wolf')) return [
        { text: 'Look REALLY closely at jumper #4 while time is slowed down…' },
        { text: 'Hold for Slow-Mo, then TAP the sneaky wolf with the bushy gray tail!', demo: 'wolf' },
      ];
      if (!found.includes('hidden')) return [
        { text: 'Wait… is another sleepy sheep hiding somewhere outside the pasture?' },
        { text: 'Drag the “How many sheep?” banner aside and tap the hidden sheep!', demo: 'prompt' },
      ];
      return [{ text: 'All endings found! Sweet dreams, shepherd.' }];
    },
    demo(kind) {
      if (kind === 'hold') return { hold: { x: 195, y: 195 } };
      if (kind === 'wolf') return { hold: { x: 195, y: 245 } };
      if (kind === 'prompt') return [{ x: 245, y: -32 }, { x: 130, y: 115 }];
      return null;
    },
    build,
  };

  // Level 6 stickers
  Object.assign(ART.stickers, {
    l6slow: (uid = 'a') => ART.stickerFrame('#2B2D6E',
      `<circle cx="-32" cy="-28" r="2.5" fill="#FFF4C2"/><circle cx="34" cy="-24" r="2.5" fill="#FFF4C2"/>` +
      `<g transform="translate(-4,10) scale(.95)">${sheepArt(0)}</g>` +
      `<g transform="translate(26,-24)"><circle r="16" fill="${YELLOW}" stroke="${INK}" stroke-width="3"/><path d="M0,-8 V0 L6,4" fill="none" stroke="${INK}" stroke-width="3" ${W}/></g>`, 'l6sl' + uid),
    l6wolf: (uid = 'a') => ART.stickerFrame(PINK,
      `<g transform="translate(-4,10) scale(1.05)">${unmaskedWolfArt()}</g>` +
      `<text x="0" y="-32" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="15" fill="${YELLOW}" stroke="${INK}" stroke-width="3" paint-order="stroke">WOOF?!</text>`, 'l6wf' + uid),
    l6hide: (uid = 'a') => ART.stickerFrame(MINT,
      `<rect x="-46" y="-40" width="92" height="30" rx="12" fill="#fff" stroke="${INK}" stroke-width="3.2" transform="rotate(-6)"/>` +
      `<text x="0" y="-20" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="16" fill="${INK}" transform="rotate(-6)">+1?</text>` +
      `<g transform="translate(0,18) scale(1.05)">${hiddenSheepArt()}</g>`, 'l6hd' + uid),
  });

  function build(ctx) {
    ctx.root.innerHTML = sceneSVG();
    const svg = ctx.root.querySelector('svg');
    const $ = (id) => svg.querySelector('#l6-' + id);

    const herdLayer = $('herd');
    const shWrap = $('sh-wrap'), sh = $('sh'), shIn = $('sh-in'), shTag = $('sh-tag');
    const slowFx = $('slow-fx'), slowPill = $('slow-pill'), slowBar = $('slow-bar');
    const holdUI = $('hold-ui'), holdArc = $('hold-arc'), holdLbl = $('hold-lbl');
    const tallyIn = $('tally-in'), tallyTxt = $('tally-txt');
    const ndBoil = $('nd-boil'), ndFace = $('nd-face'), ndArms = $('nd-arms');
    const cloud1 = $('cloud1'), cloud2 = $('cloud2');
    const fx = $('fx'), talkLayer = $('talk');

    // Reveal peeking hidden sheep only after the 470ms #prompt slam intro finishes so it never flashes!
    const shRevealTimer = setTimeout(() => { if (alive()) shWrap.setAttribute('opacity', '1'); }, 470);
    ctx.onCleanup(() => clearTimeout(shRevealTimer));

    const st = {
      done: false, counted: 0, foundHidden: false,
      simT: 0.1, timeScale: 1.0, slowActive: false, slowCoast: 0,
      pOff: { x: 0, y: 0 }, taps: {}, lastTouch: performance.now(),
    };
    const alive = () => ctx.alive;
    const bump = (k) => (st.taps[k] = (st.taps[k] || 0) + 1);
    const setFace = (eyes, mouth) => { ndFace.innerHTML = ART.noodleFace({ eyes, mouth }); };
    const setArms = (t) => { ndArms.innerHTML = ART.noodleArms(t); };
    const talk = (text, ms = 1900, ax = ND.x + 14, ay = ND.y - 68) => ctx.talk(talkLayer, ax, ay, text, ms, 0.25);

    function burst(text, x, y, color = YELLOW) {
      const g = U.svgEl('g', { transform: `translate(${x},${y})` }, fx);
      const inner = U.svgEl('g', { class: 'fb popin' }, g);
      let d = '';
      for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2, r = i % 2 ? 20 : 32; d += `${i ? 'L' : 'M'}${(Math.cos(a) * r * 1.5).toFixed(1)},${(Math.sin(a) * r).toFixed(1)} `; }
      U.svgEl('path', { d: d + 'Z', fill: color, stroke: INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, inner);
      const t = U.svgEl('text', { y: 6, 'text-anchor': 'middle', 'font-family': '"Lilita One", sans-serif', 'font-size': 15.5, fill: INK }, inner);
      t.textContent = text;
      setTimeout(() => g.remove(), 800);
    }

    function floatNum(text, x, y, color = MINT) {
      const t = U.svgEl('text', {
        x: x.toFixed(1), y: y.toFixed(1), 'text-anchor': 'middle',
        'font-family': '"Lilita One", sans-serif', 'font-size': 28,
        fill: color, stroke: INK, 'stroke-width': 3.2, 'paint-order': 'stroke',
      }, fx);
      t.textContent = text;
      U.tween(750, (p) => {
        if (!alive()) return;
        t.setAttribute('y', (y - 46 * p).toFixed(1));
        t.setAttribute('opacity', (1 - p).toFixed(2));
      }, U.ease.outCubic).then(() => t.remove());
    }

    /* ---------- Build the 6 leaping jumpers (5 real sheep + Jumper #4 Wolf in Wool) ---------- */
    const HOLD_CHARGE = 0.42; // seconds to fill the circular ring
    const COAST_DUR = 4.2;    // seconds Slow-Mo coasts after release (1-finger & desktop friendly!)

    const jumpers = [];
    for (let i = 0; i < HERD_N; i++) {
      const isWolf = i === WOLF_IDX;
      const g = U.svgEl('g', { transform: 'translate(-120,340)', style: 'cursor:pointer', 'data-no-hold': '1' }, herdLayer);
      // Supersonic white motion streaks shown at normal speed, hidden in Slow-Mo
      const streaks = U.svgEl('g', { class: 'l6-streaks', pointerEvents: 'none' }, g);
      U.svgEl('path', { d: 'M-28,-8 H-74 M-26,4 H-84 M-22,14 H-64', stroke: '#fff', 'stroke-width': 5, 'stroke-linecap': 'round', opacity: 0.72 }, streaks);
      // Generous invisible touch target so tapping in Slow-Mo feels buttery-smooth
      U.svgEl('circle', { r: 42, fill: '#000', 'fill-opacity': 0, 'pointer-events': 'all' }, g);
      const art = U.svgEl('g', { class: 'fb' }, g);
      art.innerHTML = isWolf ? wolfSheepArt() : sheepArt(i % 3);
      const wolfTag = isWolf ? art.querySelector('.wolf-tag') : null;
      // Mint counted badge pinned on real sheep once counted in Slow-Mo
      const badge = U.svgEl('g', { transform: 'translate(0,-30)', opacity: 0, pointerEvents: 'none' }, g);
      U.svgEl('circle', { r: 12, fill: MINT, stroke: INK, 'stroke-width': 2.6 }, badge);
      const badgeTxt = U.svgEl('text', { y: 4.5, 'text-anchor': 'middle', 'font-family': '"Lilita One", sans-serif', 'font-size': 13.5, fill: INK }, badge);

      g.addEventListener('pointerdown', (e) => {
        if (ctx.locked || st.done) return;
        st.lastTouch = performance.now();
        e.stopPropagation();

        // STRICT RULE: Tapping jumpers BEFORE entering Slow-Mo NEVER counts!
        if (!st.slowActive) {
          A.play('whoosh'); U.haptic(15);
          ctx.attempt();
          talk('Too fast! My fingers can’t catch them!', 1700);
          ctx.say('WHOOSH! Too fast — HOLD the night sky first to slow down time!');
          return;
        }

        // In Slow-Mo: tapping the Wolf unmasks it -> Secret Ending #1 (Wolf in Wool)!
        if (isWolf) {
          wolfEnding(jumpers[i]);
          return;
        }

        // In Slow-Mo: tapping a real sheep counts it!
        const j = jumpers[i];
        if (j.counted) {
          A.play('baa', 1.15);
          U.replay(j.art, 'hop');
          ctx.say(`Already counted #${j.num}! Tap the uncounted sheep!`);
          return;
        }
        j.counted = true;
        st.counted++;
        j.num = st.counted;
        badgeTxt.textContent = String(j.num);
        badge.setAttribute('opacity', '1');
        // Small momentum bonus to Slow-Mo coast so players chain all 5 taps smoothly!
        st.slowCoast = Math.min(COAST_DUR, st.slowCoast + 0.65);

        A.play('baa', 0.88 + st.counted * 0.08);
        U.haptic(20);
        U.replay(j.art, 'hop');
        floatNum(`${st.counted}!`, j.x, j.y - 34, MINT);
        tallyTxt.textContent = `${st.counted} / ${REAL_NEED}`;
        U.replay(tallyIn, 'popin');

        if (st.counted === 1) ctx.say('Nice! Keep tapping the real sheep (watch out for #4…)');
        else if (st.counted === 3) ctx.say('3 counted! Only 2 real sheep left!');
        else if (st.counted >= REAL_NEED) countEnding();
      });

      jumpers.push({ idx: i, isWolf, el: g, art, streaks, wolfTag, badge, x: -120, y: 340, visible: false, frozen: false, counted: false, num: 0 });
    }

    /* ---------- MAIN ENDING: All 5 real jumping sheep tapped in Slow-Mo! ---------- */
    async function countEnding() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      holdUI.setAttribute('opacity', '0');
      slowPill.setAttribute('opacity', '0');
      A.play('baa', 1.15); U.haptic([25, 45, 35]);
      setFace('happy', 'grin'); setArms('up');
      talk('One, two, three, four, five… COUNTED!', 2400);
      ctx.say('5 real sheep counted! (And you didn’t fall for the wolf!)', 2600);
      await U.wait(1150);
      if (alive()) ctx.win('count');
    }

    /* ---------- SECRET ENDING #1: Tap the Wolf in Wool during Slow-Mo! ---------- */
    async function wolfEnding(j) {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      j.frozen = true;
      holdUI.setAttribute('opacity', '0');
      slowPill.setAttribute('opacity', '0');

      const wx = U.clamp(j.x, 86, 304), wy = U.clamp(j.y, 172, 320);
      j.el.setAttribute('transform', `translate(${wx.toFixed(1)},${wy.toFixed(1)})`);
      j.streaks.setAttribute('opacity', '0');
      if (j.wolfTag) j.wolfTag.setAttribute('opacity', '0');

      A.play('pop'); A.play('bark');
      U.haptic([35, 50, 80]);
      burst('IMPOSTOR!', U.clamp(wx + 46, 80, 310), wy - 36, PINK);

      const woolPop = U.svgEl('g', { transform: `translate(${wx},${wy})` }, fx);
      woolPop.innerHTML = sheepWool('#fff');
      U.tween(700, (t) => {
        if (!alive()) return;
        woolPop.setAttribute('transform', `translate(${(wx - 28 * t).toFixed(1)},${(wy - 90 * t).toFixed(1)}) rotate(${(-95 * t).toFixed(1)}) scale(${(1 - 0.35 * t).toFixed(2)})`);
        woolPop.setAttribute('opacity', (1 - t).toFixed(2));
      }).then(() => woolPop.remove());

      j.art.innerHTML = unmaskedWolfArt();
      U.replay(j.art, 'hop');
      ctx.talk(talkLayer, wx, wy - 74, 'WOOF!! …Uh, I mean BAA?!', 1200, 0.5);
      setFace('wide', 'grin'); setArms('up');

      await U.wait(950);
      if (!alive()) return;
      A.play('whoosh');
      await U.tween(420, (t) => {
        if (!alive()) return;
        j.el.setAttribute('transform', `translate(${U.lerp(wx, 460, t * t).toFixed(1)},${(wy + Math.sin(t * Math.PI * 3) * 10).toFixed(1)}) rotate(${(12 * t).toFixed(1)})`);
      }, U.ease.linear);
      if (!alive()) return;

      setFace('happy', 'grin');
      talk('5 sheep… and 1 VERY bad disguise!', 2300);
      ctx.say('Busted! Nice detective eyes in slow-mo.', 2500);
      await U.wait(1150);
      if (alive()) ctx.win('wolf');
    }

    /* ---------- SECRET ENDING #2: Find & tap the Hidden Sheep behind #prompt! ---------- */
    async function hiddenSheepEnding() {
      if (st.done || st.foundHidden || !alive()) return;
      st.foundHidden = true;
      st.done = true; ctx.locked = true;
      holdUI.setAttribute('opacity', '0');
      slowPill.setAttribute('opacity', '0');
      shWrap.setAttribute('opacity', '1');
      shWrap.parentNode.insertBefore(shWrap, slowFx);

      A.play('baa', 1.28); U.haptic(35);
      burst('BAA!', SHEEP_HIDE.x, 12, MINT);

      // Hop playfully from behind #prompt down onto the right meadow!
      const x0 = SHEEP_HIDE.x, y0 = SHEEP_HIDE.y;
      await U.tween(680, (t) => {
        if (!alive()) return;
        const x = U.lerp(x0, SHEEP_LAND.x, t);
        const y = U.lerp(y0, SHEEP_LAND.y, t * t) - Math.sin(t * Math.PI) * 58;
        sh.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(Math.sin(t * Math.PI) * -14).toFixed(1)})`);
      }, U.ease.linear);
      if (!alive()) return;
      A.play('thud');
      U.replay(shIn, 'hop');
      shTag.setAttribute('opacity', '1');
      setFace('wide', 'grin'); setArms('up');
      ctx.talk(talkLayer, SHEEP_LAND.x, SHEEP_LAND.y - 44, 'Baa… you found my hiding spot!', 2300, 0.78);
      ctx.say('Sneaky! One sheep was napping behind the question!', 2600);
      await U.wait(1200);
      if (alive()) ctx.win('hidden');
    }

    // Tap hidden sheep directly (peeking pom-pom OR once prompt banner is dragged aside!)
    sh.addEventListener('pointerdown', (e) => {
      if (ctx.locked || st.done) return;
      e.stopPropagation();
      st.lastTouch = performance.now();
      hiddenSheepEnding();
    });

    // Make #prompt draggable so dragging it aside uncovers the sleepy hidden sheep!
    const promptEl = ctx.promptEl;
    promptEl.classList.add('prompt-drag');
    let pDrag = null, bannerUncovered = false;
    function placePrompt(rot = -2) {
      promptEl.style.transform = `translate(calc(-50% + ${st.pOff.x.toFixed(1)}px), ${st.pOff.y.toFixed(1)}px) rotate(${rot.toFixed(1)}deg)`;
    }
    const onPromptDown = (e) => {
      if (ctx.locked || st.done || pDrag) return;
      st.lastTouch = performance.now();
      promptEl.classList.remove('slam');
      shWrap.setAttribute('opacity', '1');
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
      st.pOff.x = U.clamp(pDrag.off0.x + dx, -200, 200);
      st.pOff.y = U.clamp(pDrag.off0.y + dy, -16, 220);
      placePrompt(U.clamp(-2 + dx * 0.08, -14, 12));
      if (!bannerUncovered && (Math.abs(st.pOff.x) > 58 || st.pOff.y > 42)) {
        bannerUncovered = true;
        A.play('baa', 1.3);
        U.replay(shIn, 'hop');
        ctx.say('WAIT… there’s a sleepy sheep back there! Tap it!', 2600);
      }
    };
    const onPromptUp = (e) => {
      if (!pDrag || e.pointerId !== pDrag.id) return;
      const moved = pDrag.maxMove;
      pDrag = null;
      if (moved < 8) {
        A.play('wobble');
        promptEl.style.transition = 'transform .22s cubic-bezier(.3,1.5,.5,1)';
        placePrompt(5);
        setTimeout(() => { if (alive() && !pDrag) placePrompt(-2); }, 180);
        ctx.say('Wait… did something fluffy just wiggle behind me?');
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

    /* ---------- Hold-to-Slow-Mo (Circular progress ring + 4.2s bullet-time coast after release!) ---------- */
    let hold = null;

    function onSceneDown(e) {
      if (ctx.locked || st.done || hold) return;
      if (e.target.closest('[data-no-hold]')) return;
      st.lastTouch = performance.now();
      const pt = U.svgPoint(svg, e.clientX, e.clientY);
      hold = { id: e.pointerId, x: pt.x, y: pt.y, t0: performance.now(), charged: false, target: e.target };
    }
    function onSceneMove(e) {
      if (!hold || e.pointerId !== hold.id) return;
      const pt = U.svgPoint(svg, e.clientX, e.clientY);
      hold.x = pt.x; hold.y = pt.y;
    }
    function onSceneUp(e) {
      if (!hold || e.pointerId !== hold.id) return;
      const elapsed = (performance.now() - hold.t0) / 1000;
      const wasCharged = hold.charged;
      const startTarget = hold.target;
      hold = null;
      holdUI.setAttribute('opacity', '0');
      holdArc.setAttribute('stroke-dashoffset', '226.2');
      if (st.done) return;
      if (!wasCharged && elapsed < 0.24) {
        const hit = startTarget && startTarget.closest('[data-tap]');
        if (hit && taps[hit.getAttribute('data-tap')]) taps[hit.getAttribute('data-tap')](hit);
      } else if (!wasCharged && elapsed >= 0.24) {
        ctx.say('Keep holding a tiny bit longer until the ring fills!');
      }
    }
    svg.addEventListener('pointerdown', onSceneDown);
    window.addEventListener('pointermove', onSceneMove);
    window.addEventListener('pointerup', onSceneUp);
    window.addEventListener('pointercancel', onSceneUp);
    ctx.onCleanup(() => {
      window.removeEventListener('pointermove', onSceneMove);
      window.removeEventListener('pointerup', onSceneUp);
      window.removeEventListener('pointercancel', onSceneUp);
    });

    /* ---------- Main animation loop: parabolic sheep leaps, circular hold ring, bullet-time ---------- */
    const t0 = performance.now();
    let last = t0;
    (function loop(now) {
      if (!alive()) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const realT = (now - t0) / 1000;

      // 1. Hold-to-Slow-Mo charge & bullet-time coast
      if (hold && !st.done) {
        const held = (now - hold.t0) / 1000;
        if (held > 0.1) {
          const p = U.clamp((held - 0.1) / HOLD_CHARGE, 0, 1);
          holdUI.setAttribute('opacity', '1');
          holdUI.setAttribute('transform', `translate(${U.clamp(hold.x, 48, 342).toFixed(1)},${U.clamp(hold.y, 44, 460).toFixed(1)})`);
          holdArc.setAttribute('stroke-dashoffset', (226.2 * (1 - p)).toFixed(1));
          holdArc.setAttribute('stroke', p >= 1 ? MINT : YELLOW);
          holdLbl.textContent = p >= 1 ? 'SLOW-MO!' : 'HOLD…';
          holdLbl.setAttribute('fill', p >= 1 ? MINT : YELLOW);
          if (p >= 1 && !hold.charged) {
            hold.charged = true;
            if (!st.slowActive) { A.play('slowmo'); U.haptic(25); }
            st.slowActive = true;
            st.slowCoast = COAST_DUR;
            setFace('open', 'o');
            const rip = U.svgEl('circle', { cx: hold.x, cy: hold.y, r: 36, fill: 'none', stroke: MINT, 'stroke-width': 4 }, fx);
            U.tween(380, (t) => {
              if (!alive()) return;
              rip.setAttribute('r', (36 + 34 * t).toFixed(1));
              rip.setAttribute('opacity', (1 - t).toFixed(2));
            }).then(() => rip.remove());
          }
          if (hold.charged) st.slowCoast = COAST_DUR;
        }
      } else if (st.slowActive && !st.done) {
        st.slowCoast = Math.max(0, st.slowCoast - dt);
        if (st.slowCoast <= 0) {
          st.slowActive = false;
          A.play('speedup');
          setFace('spiral', 'o');
        }
      }

      // Smooth timeScale interpolation (0.21x in Slow-Mo: super clear & tappable!)
      const targetScale = st.slowActive ? 0.21 : (hold && (now - hold.t0) > 120 ? 0.48 : 1.0);
      st.timeScale += (targetScale - st.timeScale) * Math.min(1, dt * 10);

      // Slow-mo HUD & vignette visuals
      const slowVis = U.clamp((1 - st.timeScale) / 0.79, 0, 1);
      slowFx.setAttribute('opacity', (slowVis * 0.95).toFixed(2));
      if (st.slowActive && !st.done) {
        slowPill.setAttribute('opacity', '1');
        slowBar.setAttribute('width', (96 * (st.slowCoast / COAST_DUR)).toFixed(1));
      } else {
        slowPill.setAttribute('opacity', '0');
      }

      // 2. Advance herd clock (fast-skip empty inter-wave gap in Slow-Mo so player never waits!)
      if (!st.done) {
        st.simT += dt * st.timeScale;
        const lastEnd = (HERD_N - 1) * GAP + DUR;
        if (st.slowActive && st.simT > lastEnd + 0.06 && st.simT < CYCLE - 0.08) {
          st.simT = CYCLE - 0.08;
        }
        if (st.simT >= CYCLE) st.simT -= CYCLE;
      }

      // 3. Parabolic jump paths over the wooden fence
      const fastFactor = U.clamp((st.timeScale - 0.35) / 0.65, 0, 1);
      const sx = 1 + fastFactor * 0.36;
      const sy = 1 - fastFactor * 0.12;
      jumpers.forEach((j) => {
        if (j.frozen) return;
        const u = (st.simT - j.idx * GAP) / DUR;
        if (u >= 0 && u <= 1) {
          j.visible = true;
          const x = U.lerp(-58, 448, u);
          const y = 382 - Math.sin(u * Math.PI) * 154 + (j.idx % 2) * 8;
          const rot = Math.cos(u * Math.PI) * -22;
          j.x = x; j.y = y;
          j.el.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${sx.toFixed(3)},${sy.toFixed(3)})`);
          j.streaks.setAttribute('opacity', (fastFactor * 0.85).toFixed(2));
          if (j.wolfTag) j.wolfTag.setAttribute('opacity', (slowVis > 0.65 ? (slowVis - 0.65) / 0.35 : 0).toFixed(2));
        } else if (j.visible) {
          j.visible = false;
          j.el.setAttribute('transform', 'translate(-140,340)');
        }
      });

      // Gentle drifting night clouds
      cloud1.setAttribute('transform', `translate(${(86 + Math.sin(realT * 0.25) * 14).toFixed(1)},98)`);
      cloud2.setAttribute('transform', `translate(${(232 + Math.cos(realT * 0.2) * 16).toFixed(1)},140)`);

      // Subtle peeking bob on hidden sheep while still behind prompt
      if (!st.foundHidden) {
        sh.setAttribute('transform', `translate(${SHEEP_HIDE.x},${(SHEEP_HIDE.y + Math.sin(realT * 2.4) * 2.5).toFixed(1)})`);
      }

      if (!st.done && now - st.lastTouch > 8500) {
        st.lastTouch = now;
        ctx.say(U.pick([
          'Psst… HOLD the sky to slow down time, then tap the sheep!',
          'Did a pink nightcap just peek above the title?',
          'Look closely at jumper #4 in slow motion…',
        ]));
      }
      requestAnimationFrame(loop);
    })(t0);

    /* ---------- Reactions (no dead taps!) ---------- */
    const noodleLines = ['Too fast! Slow time down first!', 'Was that 5 or 50?!', 'Try holding the sky to slow them down!'];
    const taps = {
      noodle() {
        const n = bump('noodle');
        A.play('wobble'); U.replay(ndBoil, 'wiggle');
        talk(noodleLines[(n - 1) % noodleLines.length]);
        ctx.attempt();
      },
      moon(node) {
        const n = bump('moon');
        A.play('lullaby', n % 4); U.replay(node, 'wiggle');
        ctx.say(n === 1 ? 'Even the moon is too sleepy to count.' : 'Hold on… literally! Hold down on the sky to slow time!');
      },
      cloud(node) { A.play('swish'); U.replay(node, 'hop'); ctx.say('Fluffy cloud — definitely not a sheep!'); ctx.attempt(); },
      fence() { A.play('bonk'); ctx.say('Sturdy wooden fence. Sheep-jumping certified.'); ctx.attempt(); },
      sky() { A.play('tap'); ctx.say('HOLD your finger down here to slow time, then tap the sheep!'); ctx.attempt(); },
      hill() { A.play('tap'); ctx.say('Soft midnight grass. Try holding down to slow time!'); ctx.attempt(); },
    };
  }

  BF.levels = BF.levels || {};
  BF.levels[6] = L;
})(window.BF);
