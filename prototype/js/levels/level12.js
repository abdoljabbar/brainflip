/* Brainflip — Level 12: "Make him taller!"
   Home hallway growth chart. Noodle stands at 3 FT and needs to reach the 5 FT Tall Club mark.
   Main ending : put TWO fingers on Noodle and spread them apart (pinch-out) to stretch him
                 into the 5 FT–6 FT green zone, then release! (desktop: scroll wheel UP)  (verb: object pinch)
   Secret #1   : keep stretching Noodle PAST 6 FT into the ceiling so his spaghetti body
                 snaps into a giant pretzel knot!                                         (verb: over-stretch)
   Secret #2   : attach the bicycle air-pump hose to Noodle and pump the handle 3 times
                 to inflate him into a towering 5 FT balloon-Noodle!                      (verb: attach + pump)
   Decoys: 1-finger vertical drag only makes him jump, tall top hat ("no hats!"),
           glass of milk ("+2mm — takes 12 years"), giraffe poster, trophy shelf, rug. */
(function (BF) {
  'use strict';
  const U = BF.U, A = BF.audio, I = BF.input, ART = BF.art;
  const INK = '#1B1B2F', YELLOW = '#FFC93C', PINK = '#FF5D8F', MINT = '#3DDC97', SKY = '#5BC0EB', ORANGE = '#FF6B35', RED = '#FF5964';
  const W = 'stroke-linecap="round" stroke-linejoin="round"';
  const S = `stroke="${INK}" stroke-width="3.4" ${W}`;

  const ND0 = { x: 195, y: 416 };
  const HAT0 = { x: 48, y: 326 };
  const MILK0 = { x: 98, y: 444 };
  const PUMP = { x: 334, y: 440 };
  const NOZ0 = { x: 286, y: 454 };

  // Growth chart geometry (56px per foot; Noodle starts at head-top y=364 = 3 FT)
  const Y_6FT = 196;
  const Y_5FT = 252;
  const Y_4FT = 308;
  const Y_3FT = 364;
  const Y_2FT = 420;
  const HAIR_D = 'M1,-51 C0,-62 -12,-68 -15,-60 C-18,-51 -5,-48 -3,-57 C-1,-66 10,-74 20,-66';

  function topHatSVG() {
    return `
      <circle r="30" fill="#000" fill-opacity="0" pointer-events="all"/>
      <rect x="-19" y="-36" width="38" height="40" rx="5" fill="#2B2D6E" ${S}/>
      <rect x="-19" y="-8" width="38" height="10" fill="${PINK}" stroke="${INK}" stroke-width="2.4"/>
      <ellipse cx="0" cy="4" rx="28" ry="6.5" fill="#2B2D6E" ${S}/>
      <path d="M-11,-30 V-12" stroke="#fff" stroke-width="3" opacity=".35" stroke-linecap="round"/>`;
  }

  function milkSVG() {
    return `
      <circle r="28" fill="#000" fill-opacity="0" pointer-events="all"/>
      <path d="M-13,-18 H13 L10,18 Q9,22 0,22 Q-9,22 -10,18 Z" fill="#E3F5FF" ${S}/>
      <path d="M-11,-9 H11 L9,17 Q8,20 0,20 Q-8,20 -9,17 Z" fill="#fff"/>
      <ellipse cx="0" cy="-9" rx="11" ry="2.8" fill="#FFFDF8" stroke="${INK}" stroke-width="1.8"/>
      <path d="M-13,-18 H13 L10,18 Q9,22 0,22 Q-9,22 -10,18 Z" fill="none" ${S}/>
      <path d="M-7,-13 V11" stroke="#fff" stroke-width="2.6" opacity=".8" stroke-linecap="round"/>`;
  }

  function knotNoodleSVG() {
    return `
      <g transform="translate(0,18)">
        <!-- giant tangled spaghetti-pretzel body -->
        <path d="M-44,12 C-66,-22 -32,-62 0,-36 C32,-62 66,-22 44,12 C28,36 -28,36 -44,12 Z" fill="none" stroke="${INK}" stroke-width="30" ${W}/>
        <path d="M-44,12 C-66,-22 -32,-62 0,-36 C32,-62 66,-22 44,12 C28,36 -28,36 -44,12 Z" fill="none" stroke="${YELLOW}" stroke-width="23" ${W}/>
        <path d="M-26,-16 C-6,-42 18,-10 0,14 C-18,36 22,42 36,16" fill="none" stroke="${INK}" stroke-width="24" ${W}/>
        <path d="M-26,-16 C-6,-42 18,-10 0,14 C-18,36 22,42 36,16" fill="none" stroke="${YELLOW}" stroke-width="17" ${W}/>
        <!-- dizzy Noodle face peeking out of the knot! -->
        <circle cx="0" cy="-12" r="28" fill="${YELLOW}" stroke="${INK}" stroke-width="3.4"/>
        <path d="${HAIR_D}" transform="translate(0,18) scale(.76)" fill="none" stroke="${INK}" stroke-width="8" ${W}/>
        <path d="${HAIR_D}" transform="translate(0,18) scale(.76)" fill="none" stroke="#FFE6A0" stroke-width="3.6" ${W}/>
        <g transform="translate(0,-12) scale(.85)">${ART.noodleFace({ eyes: 'spiral', mouth: 'o' })}</g>
        <!-- tiny tangled feet poking out -->
        <ellipse cx="-26" cy="48" rx="10" ry="5.5" fill="${YELLOW}" stroke="${INK}" stroke-width="3"/>
        <ellipse cx="26" cy="48" rx="10" ry="5.5" fill="${YELLOW}" stroke="${INK}" stroke-width="3"/>
      </g>`;
  }

  function sceneSVG() {
    return `
<svg viewBox="0 0 390 630" xmlns="http://www.w3.org/2000/svg" aria-label="Noodle standing at 3 feet in front of his home hallway growth chart trying to reach 5 feet">
  <defs>
    <pattern id="l12-wall" width="32" height="32" patternUnits="userSpaceOnUse">
      <rect width="16" height="32" fill="#DDF3EA" opacity=".62"/>
    </pattern>
  </defs>

  <g id="l12-room">
    <!-- bright indoor hallway wall + oak wood floor (full bleed past HUD and tall screens) -->
    <rect data-tap="wall" x="-30" y="-200" width="450" height="692" fill="#EDF9F4"/>
    <rect x="-30" y="-200" width="450" height="692" fill="url(#l12-wall)" pointer-events="none"/>
    <rect data-tap="floor" x="-30" y="490" width="450" height="440" fill="#E6A468"/>
    <path d="M-30,536 H420 M-30,582 H420 M-30,628 H420 M-30,674 H420 M-30,720 H420 M82,490 V536 M246,536 V582 M130,582 V628 M312,490 V536" stroke="#C47D44" stroke-width="2.6" pointer-events="none"/>
    <rect x="-30" y="484" width="450" height="12" fill="#fff" ${S}/>

    <!-- cozy hallway rug -->
    <g data-tap="rug">
      <ellipse cx="195" cy="542" rx="134" ry="22" fill="${YELLOW}" ${S}/>
      <ellipse cx="195" cy="542" rx="112" ry="14" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="8 8"/>
    </g>

    <!-- ============ HOME DOORWAY GROWTH CHART (Center Wall) ============ -->
    <g id="l12-chart" data-tap="chart">
      <rect x="128" y="40" width="134" height="448" rx="10" fill="#FFFDF6" ${S}/>
      <rect x="136" y="48" width="118" height="432" rx="6" fill="#FFF5DE" stroke="#E0C89E" stroke-width="2"/>
      <!-- header badge -->
      <rect x="142" y="54" width="106" height="26" rx="6" fill="${SKY}" stroke="${INK}" stroke-width="2.6"/>
      <text x="195" y="72" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="12.5" fill="#fff">TALL CLUB</text>

      <!-- green target sweet-spot band between 5 FT and 6 FT -->
      <rect id="l12-zone" x="138" y="${Y_6FT}" width="114" height="${Y_5FT - Y_6FT}" fill="${MINT}" opacity=".16" pointer-events="none"/>

      <!-- ruler ticks & labels -->
      <g stroke="${INK}" stroke-width="2.4" stroke-linecap="round">
        <path d="M138,${Y_6FT} H162 M228,${Y_6FT} H252"/>
        <path d="M138,${Y_5FT} H164 M226,${Y_5FT} H252"/>
        <path d="M138,${Y_4FT} H156 M234,${Y_4FT} H252"/>
        <path d="M138,${Y_3FT} H156 M234,${Y_3FT} H252"/>
        <path d="M138,${Y_2FT} H152 M238,${Y_2FT} H252"/>
        <!-- half-foot mini ticks -->
        <path d="M138,${Y_5FT - 28} H148 M138,${Y_4FT - 28} H148 M138,${Y_3FT - 28} H148 M138,${Y_2FT - 28} H148" stroke-width="1.8" opacity=".55"/>
      </g>
      <text x="166" y="${Y_6FT + 4}" font-family="Fredoka, sans-serif" font-weight="700" font-size="11.5" fill="${INK}">6ft</text>
      <text x="162" y="${Y_4FT + 4}" font-family="Fredoka, sans-serif" font-weight="700" font-size="11.5" fill="${INK}">4ft</text>
      <text x="162" y="${Y_3FT + 4}" font-family="Fredoka, sans-serif" font-weight="700" font-size="11.5" fill="${INK}">3ft</text>
      <text x="160" y="${Y_2FT + 4}" font-family="Fredoka, sans-serif" font-weight="700" font-size="11.5" fill="${INK}">2ft</text>

      <!-- ceiling warning line at 6 FT -->
      <path d="M138,${Y_6FT} H252" stroke="${ORANGE}" stroke-width="2" stroke-dasharray="4 5" opacity=".6"/>

      <!-- bold 5 FT TARGET LINE -->
      <path id="l12-target-line" d="M132,${Y_5FT} H258" stroke="${PINK}" stroke-width="3.6" stroke-dasharray="7 5" stroke-linecap="round"/>
      <g transform="translate(195,${Y_5FT})">
        <rect id="l12-target-pill" x="-42" y="-12" width="84" height="24" rx="12" fill="${PINK}" stroke="${INK}" stroke-width="2.8"/>
        <text id="l12-target-txt" x="0" y="4.5" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="12" fill="#fff">5 FT ★</text>
      </g>
    </g>

    <!-- ============ FRAMED GIRAFFE POSTER (Top-Left Wall) ============ -->
    <g transform="translate(65,132) rotate(-3)"><g id="l12-poster" data-tap="poster" class="fb" style="cursor:pointer">
      <rect x="-38" y="-48" width="76" height="96" rx="6" fill="#fff" ${S}/>
      <rect x="-30" y="-40" width="60" height="66" rx="3" fill="#CFEFFF" stroke="${INK}" stroke-width="2.2"/>
      <!-- giraffe neck stretching past top edge! -->
      <path d="M-8,26 L-4,-40 H6 L10,26 Z" fill="${YELLOW}" stroke="${INK}" stroke-width="2.4"/>
      <circle cx="0" cy="-14" r="3.5" fill="${ORANGE}"/><circle cx="3" cy="6" r="4" fill="${ORANGE}"/><circle cx="-3" cy="18" r="3" fill="${ORANGE}"/>
      <ellipse cx="1" cy="-42" rx="10" ry="7" fill="${YELLOW}" stroke="${INK}" stroke-width="2.4"/>
      <circle cx="4" cy="-43" r="1.8" fill="${INK}"/>
      <text x="0" y="39" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="10.5" fill="${INK}">DREAM BIG</text>
    </g></g>

    <!-- ============ WALL TROPHY SHELF (Top-Right Wall) ============ -->
    <g id="l12-shelf">
      <path d="M294,162 V180 L308,162 M356,162 V180 L342,162" fill="none" stroke="#B5713E" stroke-width="6" ${W}/>
      <rect x="280" y="150" width="90" height="13" rx="5" fill="#C77D4A" ${S}/>
      <g transform="translate(325,128)"><g id="l12-trophy" data-tap="trophy" class="fb" style="cursor:pointer">
        <path d="M-12,-14 C-22,-14 -22,2 -10,4 M12,-14 C22,-14 22,2 10,4" fill="none" stroke="${INK}" stroke-width="3.2" ${W}/>
        <path d="M-14,-18 H14 L10,4 Q8,10 0,10 Q-8,10 -10,4 Z" fill="${YELLOW}" ${S}/>
        <path d="M0,10 V18 M-10,18 H10" stroke="${INK}" stroke-width="3.6" ${W}/>
        <rect x="-12" y="16" width="24" height="7" rx="3" fill="#B5713E" stroke="${INK}" stroke-width="2.4"/>
        <text x="0" y="-2" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="9" fill="${INK}">5ft+</text>
      </g></g>
    </g>

    <!-- ============ LEFT COAT RACK + STOOL FOR MILK ============ -->
    <g id="l12-rack" data-tap="rack">
      <path d="M48,334 V488 M28,488 H68 M48,370 L32,356 M48,382 L64,368" fill="none" stroke="#8A5A33" stroke-width="7" ${W}/>
      <path d="M48,334 V488 M28,488 H68" fill="none" stroke="${INK}" stroke-width="2.4" ${W}/>
    </g>
    <g id="l12-stool" data-tap="stool">
      <path d="M84,474 L80,492 M112,474 L116,492" stroke="#9E5E30" stroke-width="6" ${W}/>
      <rect x="74" y="464" width="48" height="11" rx="5" fill="#D99058" ${S}/>
    </g>

    <!-- ============ BICYCLE AIR PUMP (Secret #2: Pumped Up!) ============ -->
    <g id="l12-pump-wrap" transform="translate(${PUMP.x},${PUMP.y})">
      <!-- plunger rod & T-handle (tappable & pushable down!) -->
      <g id="l12-pump-handle" class="grabbable" transform="translate(0,0)" style="cursor:pointer">
        <rect x="-34" y="-82" width="68" height="62" fill="#000" fill-opacity="0" pointer-events="all"/>
        <rect x="-4.5" y="-56" width="9" height="44" fill="#C9D3DF" stroke="${INK}" stroke-width="2.8"/>
        <rect x="-26" y="-66" width="52" height="13" rx="6.5" fill="${YELLOW}" ${S}/>
      </g>
      <!-- pump cylinder body -->
      <g id="l12-pump-body" data-tap="pumpBody" style="cursor:pointer">
        <rect x="-13" y="-26" width="26" height="72" rx="6" fill="${PINK}" ${S}/>
        <path d="M-6,-18 V36" stroke="#fff" stroke-width="3.2" opacity=".35" stroke-linecap="round"/>
        <!-- mini pressure gauge -->
        <circle cx="-18" cy="18" r="11" fill="#fff" stroke="${INK}" stroke-width="2.6"/>
        <g id="l12-gauge" transform="translate(-18,18) rotate(-55)">
          <path d="M0,0 V-7" stroke="${RED}" stroke-width="2.4" stroke-linecap="round"/>
        </g>
        <circle cx="-18" cy="18" r="2.2" fill="${INK}"/>
        <!-- sturdy base footplate -->
        <rect x="-26" y="42" width="52" height="10" rx="4" fill="#32355C" ${S}/>
      </g>
    </g>

    <!-- flexible rubber pump hose -->
    <path id="l12-hose-ink" d="" fill="none" stroke="${INK}" stroke-width="8.5" ${W} pointer-events="none"/>
    <path id="l12-hose-core" d="" fill="none" stroke="#4D546E" stroke-width="4" ${W} pointer-events="none"/>

    <!-- ============ NOODLE (Custom Stretchy & Inflatable Hero!) ============ -->
    <g id="l12-noodle-wrap" transform="translate(${ND0.x},${ND0.y})">
      <g id="l12-nd-anim" class="boil fb" style="cursor:grab">
        <!-- generous touch halo for 1-finger jump / 2-finger pinch -->
        <ellipse cx="0" cy="-20" rx="64" ry="92" fill="#000" fill-opacity="0" pointer-events="all"/>
        <!-- normal / stretchy / inflatable Noodle -->
        <g id="l12-nd-normal">
          <g id="l12-nd-legs">${ART.noodleLegs(YELLOW)}</g>
          <g id="l12-nd-arms" transform="translate(0,0)">${ART.noodleArms('relax', YELLOW)}</g>
          <!-- dynamically stretchy yellow noodle torso -->
          <rect id="l12-nd-torso" x="-38" y="-52" width="76" height="104" rx="38" fill="${YELLOW}" stroke="${INK}" stroke-width="3.6"/>
          <path id="l12-nd-shine" d="M-26,-26 Q-30,-6 -26,14" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" opacity=".55"/>
          <!-- head group (curly hair + face stay crisp & undistorted while stretching!) -->
          <g id="l12-nd-head" transform="translate(0,0)">
            <path d="${HAIR_D}" fill="none" stroke="${INK}" stroke-width="8" ${W}/>
            <path d="${HAIR_D}" fill="none" stroke="#FFE6A0" stroke-width="3.6" ${W}/>
            <g id="l12-nd-face" transform="translate(0,-14)">${ART.noodleFace({ eyes: 'open', mouth: 'frown' })}</g>
          </g>
        </g>
        <!-- pretzel-knot Noodle (shown ONLY on Over-Noodled secret ending!) -->
        <g id="l12-nd-knot" display="none">${knotNoodleSVG()}</g>
      </g>
    </g>

    <!-- ============ FOREGROUND DRAGGABLES (outer translate + inner .fb!) ============ -->
    <!-- draggable pump hose brass nozzle -->
    <g id="l12-hose-tip" class="grabbable" transform="translate(${NOZ0.x},${NOZ0.y})" style="cursor:grab">
      <g id="l12-hose-tip-in" class="fb">
        <circle r="28" fill="#000" fill-opacity="0" pointer-events="all"/>
        <rect x="-12" y="-7" width="16" height="14" rx="4" fill="#E6A93B" stroke="${INK}" stroke-width="2.8"/>
        <rect x="-20" y="-4" width="9" height="8" rx="2.5" fill="#D5DEE8" stroke="${INK}" stroke-width="2.4"/>
      </g>
    </g>

    <!-- draggable Tall Top Hat decoy -->
    <g id="l12-hat" class="grabbable" transform="translate(${HAT0.x},${HAT0.y})" style="cursor:grab">
      <g id="l12-hat-in" class="fb">${topHatSVG()}</g>
    </g>

    <!-- draggable Glass of Milk decoy -->
    <g id="l12-milk" class="grabbable" transform="translate(${MILK0.x},${MILK0.y})" style="cursor:grab">
      <g id="l12-milk-in" class="fb">${milkSVG()}</g>
    </g>

    <!-- FX & speech bubble layers -->
    <g id="l12-fx" pointer-events="none"></g>
    <g id="l12-talk" pointer-events="none"></g>
  </g>
</svg>`;
  }

  Object.assign(ART.stickers, {
    l12stretch: (uid = 'a') => ART.stickerFrame('#7FF0BD',
      `<path d="M-54,-22 H54" stroke="${PINK}" stroke-width="4" stroke-dasharray="6 5"/>` +
      `<rect x="-20" y="-36" width="40" height="96" rx="20" fill="${YELLOW}" stroke="${INK}" stroke-width="3.6"/>` +
      `<g transform="translate(0,-16) scale(.62)">${ART.noodleFace({ eyes: 'happy', mouth: 'grin' })}</g>`, 'l12st' + uid),
    l12knot: (uid = 'a') => ART.stickerFrame('#FFD66B',
      `<g transform="translate(0,2) scale(.76)">${knotNoodleSVG()}</g>`, 'l12kn' + uid),
    l12pump: (uid = 'a') => ART.stickerFrame('#7FD3F7',
      `<circle cx="-6" cy="4" r="38" fill="${YELLOW}" stroke="${INK}" stroke-width="3.6"/>` +
      `<path d="M-28,-12 Q-22,-22 -12,-24" fill="none" stroke="#fff" stroke-width="4.5" opacity=".7" stroke-linecap="round"/>` +
      `<g transform="translate(-6,0) scale(.8)">${ART.noodleFace({ eyes: 'wide', mouth: 'grin' })}</g>` +
      `<rect x="26" y="4" width="16" height="36" rx="4" fill="${PINK}" stroke="${INK}" stroke-width="3"/>` +
      `<rect x="20" y="-6" width="28" height="8" rx="4" fill="${YELLOW}" stroke="${INK}" stroke-width="2.6"/>`, 'l12pm' + uid),
  });

  const L = {
    id: 12,
    promptHTML: 'Make him <span class="pw" id="pw-tall">taller</span>!',
    endings: [
      { id: 'stretch', name: 'Growth Spurt', line: 'Two fingers, zero milk required.', rarity: 48, icon: 'l12stretch', stamp: 'TALL ENOUGH!' },
      { id: 'knot', name: 'Over-Noodled', line: 'Pulled too far. Officially a pretzel now.', rarity: 26, icon: 'l12knot', stamp: 'KNOTTED!' },
      { id: 'pump', name: 'Pumped Up!', line: 'Five feet tall — and ninety percent compressed air.', rarity: 18, icon: 'l12pump', stamp: 'INFLATED!' },
    ],
    hints(found) {
      if (!found.includes('stretch')) return [
        { text: 'Pulling Noodle with one finger only makes him jump. Try using two!' },
        { text: 'Pinch-out (spread two fingers apart) directly on Noodle until he hits 5 FT! (Desktop: scroll wheel UP on Noodle.)', demo: 'pinchNoodle' },
      ];
      if (!found.includes('knot')) return [
        { text: 'What happens if you stretch Noodle WAY past the 5 FT line?' },
        { text: 'Keep pinching-out on Noodle past 6 FT until he hits the ceiling!', demo: 'pinchNoodle' },
      ];
      if (!found.includes('pump')) return [
        { text: 'Look at that pink bicycle air pump on the right…' },
        { text: 'Drag the pump nozzle onto Noodle, then push the yellow handle 3 times!', demo: 'pump' },
      ];
      return [{ text: 'All three endings found! Tall Club VIP!' }];
    },
    demo(kind) {
      if (kind === 'pinchNoodle') return { pinch: { x: ND0.x, y: ND0.y - 10 } };
      if (kind === 'pump') return [{ x: NOZ0.x, y: NOZ0.y }, { x: ND0.x + 28, y: ND0.y + 10 }];
      return null;
    },
    build,
  };

  function build(ctx) {
    ctx.root.innerHTML = sceneSVG();
    const svg = ctx.root.querySelector('svg');
    const q = (s) => svg.querySelector(s);

    const ndWrap = q('#l12-noodle-wrap'), ndAnim = q('#l12-nd-anim'), ndNormal = q('#l12-nd-normal'), ndKnot = q('#l12-nd-knot');
    const ndTorso = q('#l12-nd-torso'), ndShine = q('#l12-nd-shine'), ndHead = q('#l12-nd-head'), ndFace = q('#l12-nd-face'), ndArms = q('#l12-nd-arms');
    const targetLine = q('#l12-target-line'), targetPill = q('#l12-target-pill'), targetTxt = q('#l12-target-txt'), zone = q('#l12-zone');
    const hatEl = q('#l12-hat'), hatIn = q('#l12-hat-in');
    const milkEl = q('#l12-milk'), milkIn = q('#l12-milk-in');
    const pumpHandle = q('#l12-pump-handle'), gauge = q('#l12-gauge');
    const hoseInk = q('#l12-hose-ink'), hoseCore = q('#l12-hose-core'), hoseTip = q('#l12-hose-tip'), hoseTipIn = q('#l12-hose-tip-in');
    const fx = q('#l12-fx'), talkLayer = q('#l12-talk');

    const st = {
      done: false,
      stretch: 1.0,       // 1.0 = 3 FT (headTop 364), 2.08 = 5 FT (252), 2.65+ = ceiling knot!
      inflate: 0,         // 0..3 pumps from bicycle pump!
      milkBonus: 0,       // tiny +2px joke from drinking milk
      holdingNoodle: false,
      jumping: false,
      holdingHat: false,
      hatBusy: false,
      holdingMilk: false,
      milkBusy: false,
      hoseAttached: false,
      holdingHose: false,
      hosePos: { ...NOZ0 },
      pumping: false,
      wheelTimer: 0,
      lastIdle: performance.now(),
    };

    const alive = () => ctx.alive;
    const setFace = (o) => { ndFace.innerHTML = ART.noodleFace(o); };
    const setArms = (t) => { ndArms.innerHTML = ART.noodleArms(t, YELLOW); };
    const talk = (text, ms = 1900) => {
      const topY = ND0.y + currentTopY() - 26;
      ctx.talk(talkLayer, ND0.x, Math.max(20, topY), text, ms);
    };

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

    function currentTopY() {
      const baseH = 104 * st.stretch + st.inflate * 39 + st.milkBonus;
      return 52 - baseH;
    }

    /* ---------- renders stretchy AND/OR inflated Noodle cleanly without distorting face! ---------- */
    function renderNoodle() {
      const baseH = 104 * st.stretch + st.inflate * 39 + st.milkBonus;
      const topY = 52 - baseH;
      // Stretching slims him slightly like a noodle; pumping widens him like a balloon!
      const halfW = U.clamp(38 - (st.stretch - 1) * 7 + st.inflate * 13, 25, 76);
      const rx = Math.min(halfW, baseH / 2);

      ndTorso.setAttribute('x', (-halfW).toFixed(1));
      ndTorso.setAttribute('y', topY.toFixed(1));
      ndTorso.setAttribute('width', (halfW * 2).toFixed(1));
      ndTorso.setAttribute('height', baseH.toFixed(1));
      ndTorso.setAttribute('rx', rx.toFixed(1));

      const shineX = -halfW + 12;
      ndShine.setAttribute('d', `M${shineX.toFixed(1)},${(topY + 26).toFixed(1)} Q${(shineX - 4).toFixed(1)},${(topY + baseH * 0.45).toFixed(1)} ${shineX.toFixed(1)},${(topY + baseH - 26).toFixed(1)}`);

      const headShift = topY + 52; // 0 when baseH=104
      ndHead.setAttribute('transform', `translate(0,${headShift.toFixed(1)})`);
      ndArms.setAttribute('transform', `translate(0,${(headShift * 0.72).toFixed(1)})`);

      const worldHeadTop = ND0.y + topY;
      const inGreen = worldHeadTop <= Y_5FT + 4 && worldHeadTop >= Y_6FT - 4;
      const tooHigh = worldHeadTop < Y_6FT - 4;

      targetLine.setAttribute('stroke', inGreen ? MINT : tooHigh ? ORANGE : PINK);
      targetPill.setAttribute('fill', inGreen ? MINT : tooHigh ? ORANGE : PINK);
      targetTxt.textContent = inGreen ? '5 FT ✓' : tooHigh ? 'TOO TALL!' : '5 FT ★';
      zone.setAttribute('opacity', inGreen ? '.38' : '.16');

      if (st.hoseAttached) {
        st.hosePos = { x: ND0.x + halfW + 6, y: ND0.y + 12 };
        renderHose();
      }
    }

    function renderHose() {
      const ax = PUMP.x - 14, ay = PUMP.y + 38;
      const nx = st.hosePos.x, ny = st.hosePos.y;
      const mx = (ax + nx) / 2;
      const my = Math.max(ay, ny) + 28;
      const d = `M${ax},${ay} Q${mx.toFixed(1)},${my.toFixed(1)} ${nx.toFixed(1)},${ny.toFixed(1)}`;
      hoseInk.setAttribute('d', d);
      hoseCore.setAttribute('d', d);
      hoseTip.setAttribute('transform', `translate(${nx.toFixed(1)},${ny.toFixed(1)})`);
    }

    /* ---------- ENDING 1 (MAIN): GROWTH SPURT (Stretch into 5 FT – 6 FT Green Zone!) ---------- */
    async function winStretch() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      clearTimeout(st.wheelTimer);
      A.play('boing'); U.haptic([18, 36, 20]);
      setFace({ eyes: 'happy', mouth: 'grin' });
      setArms('up');
      U.replay(ndAnim, 'hop');
      pop(ND0.x, ND0.y + currentTopY() - 28, '5 FT CLUB!', MINT, 20);
      talk('WHOA! I CAN SEE THE TOP SHELF!', 2200);
      ctx.say('Two fingers, zero milk required.');
      await U.wait(840);
      if (alive()) ctx.win('stretch');
    }

    /* ---------- ENDING 2 (SECRET #1): OVER-NOODLED (Stretched past 6 FT -> Pretzel Knot!) ---------- */
    async function winKnot() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      clearTimeout(st.wheelTimer);
      A.play('bonk'); U.haptic([30, 40, 60]);
      pop(ND0.x, Y_6FT - 16, 'BONK!!', ORANGE, 22);
      talk('TOO TALL! TOO TALL!!', 900);
      U.replay(q('#l12-room'), 'jolt');
      await U.wait(360);
      if (!alive()) return;

      // Elastic spaghetti snap-back into a giant pretzel knot!
      A.play('boing'); A.play('wobble');
      const startS = st.stretch;
      await U.tween(320, (t) => {
        if (!alive()) return;
        st.stretch = U.lerp(startS, 0.85, t);
        renderNoodle();
      }, U.ease.inCubic);
      if (!alive()) return;

      ndNormal.setAttribute('display', 'none');
      ndKnot.removeAttribute('display');
      U.replay(ndAnim, 'hop');
      pop(ND0.x, ND0.y - 54, 'KNOTTED!', YELLOW, 22);
      ctx.talk(talkLayer, ND0.x, ND0.y - 68, 'Officially a pretzel now…', 2200);
      ctx.say('Pulled too far. Officially a pretzel now.');
      await U.wait(900);
      if (alive()) ctx.win('knot');
    }

    /* ---------- ENDING 3 (SECRET #2): PUMPED UP! (Bicycle Air Pump!) ---------- */
    async function doPumpStroke() {
      if (st.done || ctx.locked || st.pumping) return;
      st.pumping = true;
      ctx.attempt();
      A.play('puff'); U.haptic(18);

      // Plunge yellow T-handle smoothly down & back up!
      await U.tween(150, (t) => {
        if (!alive()) return;
        pumpHandle.setAttribute('transform', `translate(0,${(t * 28).toFixed(1)})`);
      }, U.ease.inCubic);
      if (!alive()) return;

      if (!st.hoseAttached) {
        // Funny decoy puff into empty air if hose isn't attached yet!
        pop(st.hosePos.x - 16, st.hosePos.y - 16, 'PSSSH!', SKY, 16);
        ctx.say('Great workout! Maybe connect the hose to Noodle first?');
        await U.tween(180, (t) => {
          if (!alive()) return;
          pumpHandle.setAttribute('transform', `translate(0,${U.lerp(28, 0, t).toFixed(1)})`);
        }, U.ease.outBack);
        st.pumping = false;
        return;
      }

      const nextInf = st.inflate + 1;
      const startInf = st.inflate;
      gauge.setAttribute('transform', `translate(-18,18) rotate(${(-55 + nextInf * 38).toFixed(0)})`);

      await Promise.all([
        U.tween(240, (t) => {
          if (!alive()) return;
          st.inflate = U.lerp(startInf, nextInf, t);
          renderNoodle();
        }, U.ease.outBack),
        U.tween(200, (t) => {
          if (!alive()) return;
          pumpHandle.setAttribute('transform', `translate(0,${U.lerp(28, 0, t).toFixed(1)})`);
        }, U.ease.outBack),
      ]);
      if (!alive()) return;
      st.inflate = nextInf;
      renderNoodle();
      st.pumping = false;

      if (nextInf === 1) {
        A.play('squeak');
        setFace({ eyes: 'wide', mouth: 'o' });
        pop(ND0.x, ND0.y + currentTopY() - 20, 'PUFF!', SKY, 18);
        talk('WHOA—I AM EXPANDING!');
        ctx.say('1 pump! Keep pumping!');
      } else if (nextInf === 2) {
        A.play('squeak');
        setFace({ eyes: 'wide', mouth: 'bigO' });
        setArms('shrug');
        pop(ND0.x, ND0.y + currentTopY() - 20, 'BIGGER!!', YELLOW, 19);
        talk('ONE MORE PUMP!!');
        ctx.say('Almost at 5 feet — one more pump!');
      } else {
        st.done = true; ctx.locked = true;
        A.play('boing'); U.haptic([20, 40, 24]);
        setFace({ eyes: 'happy', mouth: 'grin' });
        setArms('up');
        U.replay(ndAnim, 'hop');
        pop(ND0.x, ND0.y + currentTopY() - 24, '5 FT BALLOON!', MINT, 20);
        talk('I AM 5 FEET TALL!! (90% AIR!)', 2200);
        ctx.say('Five feet tall — and ninety percent compressed air.');
        await U.wait(880);
        if (alive()) ctx.win('pump');
      }
    }

    /* ---------- PUMP HANDLE INTERACTION (Tap OR Drag Down!) ---------- */
    let handlePushed = false;
    I.drag(pumpHandle, svg, {
      onStart() { handlePushed = false; },
      onMove(p, d) {
        if (ctx.locked || st.done || st.pumping || handlePushed) return;
        const dy = U.clamp(d.dy, 0, 28);
        pumpHandle.setAttribute('transform', `translate(0,${dy.toFixed(1)})`);
        if (dy > 18) { handlePushed = true; doPumpStroke(); }
      },
      onTap() { doPumpStroke(); },
      onEnd() {
        if (!st.pumping && !handlePushed) pumpHandle.setAttribute('transform', 'translate(0,0)');
      },
    });

    /* ---------- PUMP HOSE NOZZLE DRAG (Attach to Noodle!) ---------- */
    I.drag(hoseTip, svg, {
      onStart() {
        if (ctx.locked || st.done || st.hoseAttached) return;
        st.holdingHose = true;
        A.play('tap'); ctx.attempt();
      },
      onMove(p) {
        if (!st.holdingHose || ctx.locked || st.done || st.hoseAttached) return;
        st.hosePos = { x: U.clamp(p.x, 40, 368), y: U.clamp(p.y, 120, 560) };
        renderHose();
        if (Math.hypot(st.hosePos.x - ND0.x, st.hosePos.y - ND0.y) < 58) {
          st.holdingHose = false;
          st.hoseAttached = true;
          A.play('pop'); U.haptic(16);
          renderNoodle();
          pop(ND0.x + 48, ND0.y - 10, 'CONNECTED!', MINT, 16);
          talk('Wait… why did you plug a pump into me?!');
          ctx.say('Hose connected! Now push the yellow pump handle!');
        }
      },
      onTap() {
        st.holdingHose = false;
        if (ctx.locked || st.done) return;
        if (st.hoseAttached) {
          A.play('tap'); ctx.say('Already hooked up! Push the yellow pump handle!');
          return;
        }
        st.hosePos = { ...NOZ0 }; renderHose();
        A.play('tap'); U.replay(hoseTipIn, 'wiggle');
        ctx.say('Air pump nozzle. Wonder what happens if you connect it…');
      },
      async onEnd() {
        if (!st.holdingHose || st.done || st.hoseAttached) return;
        st.holdingHose = false;
        const from = { ...st.hosePos };
        await U.tween(260, (t) => {
          if (!alive() || st.done || st.holdingHose || st.hoseAttached) return;
          st.hosePos = { x: U.lerp(from.x, NOZ0.x, t), y: U.lerp(from.y, NOZ0.y, t) };
          renderHose();
        }, U.ease.outBack);
      },
    });

    /* ---------- NOODLE: 1-Finger Vertical Drag = DECOY JUMP! ---------- */
    I.drag(ndAnim, svg, {
      onStart() {
        if (ctx.locked || st.done || fingers.size >= 2) return;
        st.holdingNoodle = true;
        ctx.attempt();
      },
      onMove(p, d) {
        if (!st.holdingNoodle || ctx.locked || st.done || st.jumping || fingers.size >= 2) return;
        if (d.dy < -28) {
          st.holdingNoodle = false;
          st.jumping = true;
          A.play('boing'); U.haptic(14);
          setFace({ eyes: 'wide', mouth: 'o' });
          setArms('up');
          U.tween(480, (t) => {
            if (!alive() || st.done) return;
            const jumpY = -Math.sin(t * Math.PI) * 76;
            ndWrap.setAttribute('transform', `translate(${ND0.x},${(ND0.y + jumpY).toFixed(1)})`);
          }, U.ease.linear).then(() => {
            if (!alive() || st.done) return;
            ndWrap.setAttribute('transform', `translate(${ND0.x},${ND0.y})`);
            setFace({ eyes: 'open', mouth: 'frown' });
            setArms('relax');
            A.play('thud');
            pop(ND0.x, ND0.y + currentTopY() - 24, 'NO JUMPING!', RED, 17);
            talk('Jumping doesn’t count! Feet on the floor!');
            ctx.say('One finger only makes him jump. Try stretching with two.');
            st.jumping = false;
          });
        }
      },
      onTap() {
        st.holdingNoodle = false;
        if (ctx.locked || st.done || st.jumping) return;
        A.play('squeak'); U.replay(ndAnim, 'hop');
        pop(ND0.x, ND0.y + currentTopY() - 20, '3 FT!', PINK, 18);
        talk(U.pick(['Tippy-toes! …okay, still 3 feet.', 'I am very tall on the inside!']));
        ctx.say('Still three feet tall.');
      },
      onEnd() { st.holdingNoodle = false; },
    });

    /* ---------- TWO-FINGER PINCH-OUT ON NOODLE (Main + Over-Stretch Secret #1!) ---------- */
    function checkStretchThresholds(isRelease = false) {
      const worldHeadTop = ND0.y + currentTopY();
      if (worldHeadTop < Y_6FT - 6) {
        winKnot();
        return;
      }
      if (isRelease && worldHeadTop <= Y_5FT + 6 && worldHeadTop >= Y_6FT - 6) {
        winStretch();
        return;
      }
      if (isRelease && st.stretch > 1.04 && !st.done) {
        // Released too early (below 5 FT) -> boings back down!
        const from = st.stretch;
        A.play('boing');
        ctx.say('Almost! Stretch him all the way into the 5 FT zone before letting go!');
        U.tween(320, (t) => {
          if (!alive() || st.done || fingers.size >= 2) return;
          st.stretch = U.lerp(from, 1.0, t);
          renderNoodle();
        }, U.ease.outBack).then(() => {
          if (!st.done) { setFace({ eyes: 'open', mouth: 'frown' }); setArms('relax'); }
        });
      }
    }

    const fingers = new Map();
    let pinch = null;
    const onPtrDown = (e) => {
      if (ctx.locked || st.done || st.inflate > 0) return;
      const pt = U.svgPoint(svg, e.clientX, e.clientY);
      // Generous pinch zone around Noodle & the growth chart!
      if (pt.x < 95 || pt.x > 295 || pt.y < 140 || pt.y > 510) return;
      fingers.set(e.pointerId, pt);
      if (fingers.size === 2) {
        st.holdingNoodle = false;
        const [a, b] = [...fingers.values()];
        pinch = { d0: Math.max(24, Math.hypot(a.x - b.x, a.y - b.y)), s0: st.stretch };
        setFace({ eyes: 'wide', mouth: 'o' });
        A.play('wobble');
      }
    };
    const onPtrMove = (e) => {
      if (!pinch || ctx.locked || st.done || !fingers.has(e.pointerId)) return;
      fingers.set(e.pointerId, U.svgPoint(svg, e.clientX, e.clientY));
      if (fingers.size !== 2) return;
      const [a, b] = [...fingers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const ratio = d / pinch.d0;
      st.stretch = U.clamp(pinch.s0 + (ratio - 1) * 1.35, 0.92, 2.75);
      renderNoodle();
      const headTop = ND0.y + currentTopY();
      if (headTop <= Y_5FT + 6 && headTop >= Y_6FT - 6) setFace({ eyes: 'happy', mouth: 'grin' });
      else if (headTop < Y_6FT - 6) { pinch = null; fingers.clear(); winKnot(); }
    };
    const onPtrUp = (e) => {
      if (!fingers.has(e.pointerId)) return;
      const wasPinch = fingers.size === 2 && !!pinch;
      fingers.delete(e.pointerId);
      if (fingers.size < 2) {
        pinch = null;
        if (wasPinch && !st.done) checkStretchThresholds(true);
      }
    };

    /* Desktop fallback: Mouse Wheel UP over Noodle stretches him smoothly! */
    const onWheel = (e) => {
      if (ctx.locked || st.done || st.inflate > 0) return;
      const pt = U.svgPoint(svg, e.clientX, e.clientY);
      if (pt.x < 105 || pt.x > 285 || pt.y < 140 || pt.y > 510) return;
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.16 : -0.14;
      st.stretch = U.clamp(st.stretch + delta, 1.0, 2.75);
      renderNoodle();
      const headTop = ND0.y + currentTopY();
      if (headTop < Y_6FT - 6) { winKnot(); return; }
      if (headTop <= Y_5FT + 6) setFace({ eyes: 'happy', mouth: 'grin' });
      else setFace({ eyes: 'wide', mouth: 'o' });
      clearTimeout(st.wheelTimer);
      st.wheelTimer = setTimeout(() => {
        if (alive() && !st.done) checkStretchThresholds(true);
      }, 650);
    };

    svg.addEventListener('pointerdown', onPtrDown);
    svg.addEventListener('pointermove', onPtrMove);
    svg.addEventListener('pointerup', onPtrUp);
    svg.addEventListener('pointercancel', onPtrUp);
    svg.addEventListener('wheel', onWheel, { passive: false });
    ctx.onCleanup(() => {
      clearTimeout(st.wheelTimer);
      svg.removeEventListener('pointerdown', onPtrDown);
      svg.removeEventListener('pointermove', onPtrMove);
      svg.removeEventListener('pointerup', onPtrUp);
      svg.removeEventListener('pointercancel', onPtrUp);
      svg.removeEventListener('wheel', onWheel);
    });

    /* ---------- DECOY: TALL TOP HAT ("NO HATS!") ---------- */
    I.drag(hatEl, svg, {
      onStart() {
        if (ctx.locked || st.done || st.hatBusy) return;
        st.holdingHat = true; A.play('swish'); ctx.attempt();
      },
      onMove(p) {
        if (!st.holdingHat || ctx.locked || st.done) return;
        const x = U.clamp(p.x, 26, 364), y = U.clamp(p.y, 44, 540);
        hatEl.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
      },
      onTap() {
        st.holdingHat = false;
        if (ctx.locked || st.done || st.hatBusy) return;
        hatEl.setAttribute('transform', `translate(${HAT0.x},${HAT0.y})`);
        A.play('tap'); U.replay(hatIn, 'wiggle');
        ctx.say('A very tall top hat. Surely nobody will notice…');
      },
      async onEnd(p) {
        if (!st.holdingHat || st.done) return;
        st.holdingHat = false;
        const x = U.clamp(p.x, 26, 364), y = U.clamp(p.y, 44, 540);
        const headY = ND0.y + currentTopY();
        if (Math.hypot(x - ND0.x, y - headY) < 68) {
          st.hatBusy = true;
          hatEl.setAttribute('transform', `translate(${ND0.x},${(headY - 12).toFixed(1)})`);
          setFace({ eyes: 'happy', mouth: 'grin' });
          A.play('pop');
          talk('Does this count?!', 950);
          await U.wait(650);
          if (!alive() || st.done) return;
          A.play('bonk'); U.haptic(16);
          setFace({ eyes: 'open', mouth: 'frown' });
          pop(ND0.x, headY - 56, 'NO HATS!!', RED, 19);
          ctx.say('Nice try! Top hats are strictly banned by the Tall Club.');
          await U.tween(320, (t) => {
            if (!alive() || st.done) return;
            hatEl.setAttribute('transform', `translate(${U.lerp(ND0.x, HAT0.x, t).toFixed(1)},${U.lerp(headY - 12, HAT0.y, t).toFixed(1)})`);
          }, U.ease.outBack);
          st.hatBusy = false;
        } else {
          await U.tween(260, (t) => {
            if (!alive() || st.done || st.holdingHat) return;
            hatEl.setAttribute('transform', `translate(${U.lerp(x, HAT0.x, t).toFixed(1)},${U.lerp(y, HAT0.y, t).toFixed(1)})`);
          }, U.ease.outBack);
        }
      },
    });

    /* ---------- DECOY: GLASS OF MILK ("+2mm — takes 12 years!") ---------- */
    I.drag(milkEl, svg, {
      onStart() {
        if (ctx.locked || st.done || st.milkBusy) return;
        st.holdingMilk = true; A.play('clink'); ctx.attempt();
      },
      onMove(p) {
        if (!st.holdingMilk || ctx.locked || st.done) return;
        const x = U.clamp(p.x, 24, 366), y = U.clamp(p.y, 44, 540);
        milkEl.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
      },
      onTap() {
        st.holdingMilk = false;
        if (ctx.locked || st.done || st.milkBusy) return;
        milkEl.setAttribute('transform', `translate(${MILK0.x},${MILK0.y})`);
        A.play('clink'); U.replay(milkIn, 'wiggle');
        ctx.say('Fresh calcium! Mom says it makes you grow tall.');
      },
      async onEnd(p) {
        if (!st.holdingMilk || st.done) return;
        st.holdingMilk = false;
        const x = U.clamp(p.x, 24, 366), y = U.clamp(p.y, 44, 540);
        if (Math.hypot(x - ND0.x, y - ND0.y) < 70) {
          st.milkBusy = true;
          A.play('pour', 0.4);
          await U.tween(240, (t) => {
            if (!alive()) return;
            milkEl.setAttribute('transform', `translate(${U.lerp(x, ND0.x - 28, t).toFixed(1)},${U.lerp(y, ND0.y - 16, t).toFixed(1)}) rotate(${(t * 58).toFixed(0)})`);
          });
          if (!alive() || st.done) return;
          st.milkBonus = Math.min(6, st.milkBonus + 2);
          renderNoodle();
          A.play('pop');
          pop(ND0.x, ND0.y + currentTopY() - 22, '+2mm!', SKY, 17);
          talk('3 feet and… two millimeters!');
          ctx.say('Milk takes 12 years. We have 30 seconds.');
          await U.tween(300, (t) => {
            if (!alive() || st.done) return;
            milkEl.setAttribute('transform', `translate(${U.lerp(ND0.x - 28, MILK0.x, t).toFixed(1)},${U.lerp(ND0.y - 16, MILK0.y, t).toFixed(1)})`);
          }, U.ease.outBack);
          st.milkBusy = false;
        } else {
          await U.tween(260, (t) => {
            if (!alive() || st.done || st.holdingMilk) return;
            milkEl.setAttribute('transform', `translate(${U.lerp(x, MILK0.x, t).toFixed(1)},${U.lerp(y, MILK0.y, t).toFixed(1)})`);
          }, U.ease.outBack);
        }
      },
    });

    /* ---------- IDLE COMEDY ---------- */
    (function loop(now) {
      if (!alive()) return;
      if (!st.done && now - st.lastIdle > 11000) {
        st.lastIdle = now;
        ctx.say(U.pick([
          'Three feet of pure determination.',
          'His name is literally Noodle. He is very stretchy.',
          'The Tall Club line is not going to reach itself.',
        ]));
      }
      requestAnimationFrame(loop);
    })(performance.now());
    svg.addEventListener('pointerdown', () => { st.lastIdle = performance.now(); });

    /* ---------- TAP REACTIONS (all inner .fb, zero jump-to-(0,0)!) ---------- */
    const taps = {
      poster(node) { ctx.attempt(); A.play('tap'); U.replay(node, 'wiggle'); ctx.say('“DREAM BIG.” Easy for a giraffe to say.'); },
      trophy(node) { ctx.attempt(); A.play('clink'); U.replay(node, 'wiggle'); ctx.say('Tall Club trophy. Minimum height: 5 feet.'); },
      pumpBody() { ctx.attempt(); A.play('puff'); ctx.say(st.hoseAttached ? 'Push the yellow handle on top!' : 'A bicycle air pump. Grab the nozzle on the left!'); },
      chart() { ctx.attempt(); A.play('tap'); ctx.say('Home growth chart. Noodle has been 3 feet tall since 2021.'); },
      rack() { ctx.attempt(); A.play('thud'); ctx.say('Hallway coat rack.'); },
      stool() { ctx.attempt(); A.play('thud'); ctx.say('Too tiny to stand on — and besides, that is cheating.'); },
      rug() { ctx.attempt(); A.play('swish'); ctx.say('Cozy hallway rug.'); },
      wall() { ctx.attempt(); A.play('tap'); ctx.say('Minty fresh hallway wall.'); },
      floor() { ctx.attempt(); A.play('thud'); ctx.say('Solid oak floor. Feet must stay right here.'); },
    };
    I.taps(svg, (name, node) => { if (ctx.locked || st.done) return; if (taps[name]) taps[name](node); });

    const onPromptClick = (e) => {
      if (ctx.locked || st.done) return;
      if (e.target.id === 'pw-tall') {
        U.replay(e.target, 'wiggle'); A.play('boing');
        ctx.say('Good stretch on the word. Now try Noodle.');
      }
    };
    ctx.promptEl.addEventListener('click', onPromptClick);
    ctx.onCleanup(() => ctx.promptEl.removeEventListener('click', onPromptClick));

    renderNoodle();
    renderHose();
  }

  BF.levels = BF.levels || {};
  BF.levels[12] = L;
})(window.BF);
