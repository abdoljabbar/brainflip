/* Brainflip — Level 11: "Wait for sunrise!"
   Midnight in Noodle's cozy bedroom window nook. No "skip time" button anywhere.
   Main ending : leave the app / switch tabs for >=1s and come back — morning has arrived!
                 (visibilitychange; dev key V simulates it)                         (verb: leave & return)
   Secret #1   : do literally NOTHING for 15 seconds — stay completely hands-off
                 and watch night gradually melt into dawn!                          (verb: patience / idle)
   Secret #2   : grab the big wall clock showing 11:55 PM and spin its hand
                 clockwise forward to 6:00 AM to fast-forward time!                 (verb: circular drag)
   Decoys: trying to drag the moon down (Level 1 callback — it boings right back!),
           bedside lamp ("not the sun"), desk calendar ("STILL TONIGHT"), steaming cocoa,
           BRB wall tag, bunny slippers, pillow, window seat. */
(function (BF) {
  'use strict';
  const U = BF.U, A = BF.audio, I = BF.input, ART = BF.art;
  const INK = '#1B1B2F', YELLOW = '#FFC93C', PINK = '#FF5D8F', MINT = '#3DDC97', SKY = '#5BC0EB', ORANGE = '#FF6B35';
  const W = 'stroke-linecap="round" stroke-linejoin="round"';
  const S = `stroke="${INK}" stroke-width="3.4" ${W}`;

  const ND0 = { x: 146, y: 344 };
  const CLOCK = { x: 318, y: 122 };
  const MOON0 = { x: 96, y: 92 };
  const NEED_RAD = Math.PI * 4.4; // ~2.2 clockwise turns = 11:55 PM -> 6:00 AM
  const IDLE_WIN_MS = 15000;      // 15s completely untouched for Pure Patience!

  function moonSVG() {
    return `
      <circle r="32" fill="#000" fill-opacity="0" pointer-events="all"/>
      <path d="M8,-20 A22,22 0 1,0 8,20 A16,16 0 1,1 8,-20 Z" fill="#FFF3B0" stroke="${INK}" stroke-width="3" ${W}/>
      <circle cx="-11" cy="-2" r="2.2" fill="${INK}"/>
      <path d="M-12,6 Q-7,10 -2,6" fill="none" stroke="${INK}" stroke-width="2" ${W}/>`;
  }

  function sceneSVG() {
    return `
<svg viewBox="0 0 390 630" xmlns="http://www.w3.org/2000/svg" aria-label="Noodle sitting by his bedroom window at midnight waiting for sunrise">
  <defs>
    <linearGradient id="l11-sky" x1="0" y1="0" x2="0" y2="1">
      <stop id="l11-sky-top" offset="0%" stop-color="#171A48"/>
      <stop id="l11-sky-mid" offset="58%" stop-color="#282C6A"/>
      <stop id="l11-sky-bot" offset="100%" stop-color="#3B3D82"/>
    </linearGradient>
    <pattern id="l11-wallp" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="16" cy="16" r="2.2" fill="#FFFFFF" opacity=".12"/>
    </pattern>
    <clipPath id="l11-winclip"><rect x="34" y="44" width="212" height="172" rx="6"/></clipPath>
    <radialGradient id="l11-lampglow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF5B8" stop-opacity=".78"/>
      <stop offset="100%" stop-color="#FFF5B8" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <g id="l11-room">
    <!-- bedroom wall + wooden floor (full bleed; colors smoothly warm up at sunrise!) -->
    <rect id="l11-wall" data-tap="wall" x="-30" y="-200" width="450" height="692" fill="#2F336E"/>
    <rect x="-30" y="-200" width="450" height="692" fill="url(#l11-wallp)" pointer-events="none"/>
    <rect id="l11-floor" data-tap="floor" x="-30" y="490" width="450" height="440" fill="#9A6845"/>
    <path d="M-30,536 H420 M-30,582 H420 M-30,628 H420 M-30,674 H420 M-30,720 H420 M82,490 V536 M246,536 V582 M130,582 V628 M312,490 V536" stroke="#6E462C" stroke-width="2.6" opacity=".55" pointer-events="none"/>
    <rect x="-30" y="484" width="450" height="12" fill="#EDEAF6" ${S}/>

    <!-- cozy bedroom rug + bunny slippers -->
    <g data-tap="rug">
      <ellipse cx="195" cy="544" rx="134" ry="22" fill="#7D77C8" ${S}/>
      <ellipse cx="195" cy="544" rx="112" ry="14" fill="none" stroke="#FFF4DC" stroke-width="3" stroke-dasharray="8 8"/>
    </g>
    <g transform="translate(116,522)"><g id="l11-slippers" data-tap="slippers" class="fb" style="cursor:pointer">
      <ellipse cx="-14" cy="4" rx="14" ry="7" fill="${PINK}" stroke="${INK}" stroke-width="2.6"/>
      <ellipse cx="-19" cy="-4" rx="3.5" ry="7" fill="#fff" stroke="${INK}" stroke-width="2"/>
      <ellipse cx="14" cy="6" rx="14" ry="7" fill="${PINK}" stroke="${INK}" stroke-width="2.6"/>
      <ellipse cx="9" cy="-2" rx="3.5" ry="7" fill="#fff" stroke="${INK}" stroke-width="2"/>
    </g></g>

    <!-- ============ BIG PANORAMIC BEDROOM WINDOW ============ -->
    <g id="l11-window">
      <g clip-path="url(#l11-winclip)">
        <rect data-tap="sky" x="34" y="44" width="212" height="172" fill="url(#l11-sky)"/>

        <!-- twinkling stars -->
        <g id="l11-stars" pointer-events="none">
          <circle cx="56" cy="70" r="2.2" fill="#FFF4C2"/>
          <circle cx="146" cy="66" r="2.6" fill="#FFF4C2"/>
          <circle cx="212" cy="76" r="2" fill="#FFF4C2"/>
          <circle cx="178" cy="108" r="2.2" fill="#FFF4C2"/>
          <circle cx="66" cy="130" r="1.8" fill="#FFF4C2"/>
          <circle cx="226" cy="118" r="2.4" fill="#FFF4C2"/>
          <circle cx="132" cy="126" r="1.8" fill="#FFF4C2"/>
        </g>

        <!-- draggable sleepy Crescent Moon (Level 1 callback decoy!) -->
        <g id="l11-moon-wrap" transform="translate(${MOON0.x},${MOON0.y})">
          <g id="l11-moon" class="grabbable fb" style="cursor:grab">${moonSVG()}</g>
        </g>

        <!-- Brainflip's Sun rising from behind the hill at sunrise! -->
        <g id="l11-sun-wrap" transform="translate(166,236)" opacity="0" pointer-events="none">
          <g transform="scale(1.08)">${ART.sun('happy', { spin: true })}</g>
        </g>

        <!-- distant hills -->
        <path id="l11-hill-back" d="M26,188 Q84,146 154,178 Q206,198 256,162 V224 H26 Z" fill="#233754" stroke="${INK}" stroke-width="2.4"/>
        <path id="l11-hill-front" d="M26,200 Q102,168 184,196 Q224,208 256,188 V224 H26 Z" fill="#1D4B4E" stroke="${INK}" stroke-width="2.4"/>
      </g>
      <!-- window frame + curtains + sill -->
      <path d="M26,36 H254 V224 H26 Z M34,44 V216 H246 V44 Z" fill="#FFFDF8" fill-rule="evenodd" ${S}/>
      <path d="M140,44 V216 M34,130 H246" stroke="#FFFDF8" stroke-width="5.5"/>
      <path d="M140,44 V216 M34,130 H246" stroke="${INK}" stroke-width="2.4"/>
      <!-- cozy side curtains -->
      <path d="M22,34 H56 C48,96 42,148 34,216 H22 Z" fill="${PINK}" ${S}/>
      <path d="M258,34 H224 C232,96 238,148 246,216 H258 Z" fill="${PINK}" ${S}/>
      <rect x="18" y="218" width="244" height="13" rx="6" fill="#FFFDF8" ${S}/>
    </g>

    <!-- warm morning light rays (appear at sunrise!) -->
    <polygon id="l11-morning-rays" points="34,44 246,44 330,490 -10,490" fill="#FFF3A8" opacity="0" pointer-events="none"/>

    <!-- ============ BIG INTERACTIVE ANALOG WALL CLOCK (Secret #2: Spin to 6:00 AM!) ============ -->
    <g id="l11-clock-wrap" transform="translate(${CLOCK.x},${CLOCK.y})">
      <g id="l11-clock" class="grabbable fb" style="cursor:grab">
        <circle r="54" fill="#000" fill-opacity="0" pointer-events="all"/>
        <circle r="46" fill="${YELLOW}" ${S}/>
        <circle r="37" fill="#FFFDF8" stroke="${INK}" stroke-width="2.8"/>
        <!-- hour ticks -->
        <path d="M0,-31 V-25 M0,25 V31 M-31,0 H-25 M25,0 H31" stroke="${INK}" stroke-width="3" ${W}/>
        <circle cx="15" cy="-26" r="1.8" fill="${INK}"/><circle cx="26" cy="-15" r="1.8" fill="${INK}"/>
        <circle cx="26" cy="15" r="1.8" fill="${INK}"/><circle cx="15" cy="26" r="1.8" fill="${INK}"/>
        <circle cx="-15" cy="26" r="1.8" fill="${INK}"/><circle cx="-26" cy="15" r="1.8" fill="${INK}"/>
        <circle cx="-26" cy="-15" r="1.8" fill="${INK}"/><circle cx="-15" cy="-26" r="1.8" fill="${INK}"/>
        <!-- digital mini readout pill inside clock -->
        <rect x="-21" y="9" width="42" height="13" rx="4" fill="#23254A"/>
        <text id="l11-clock-txt" x="0" y="18.5" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="8.5" fill="${YELLOW}">11:55 PM</text>
        <!-- hour hand -->
        <g id="l11-hand-h" transform="rotate(-3)">
          <path d="M0,4 V-18" stroke="${INK}" stroke-width="4.2" ${W}/>
        </g>
        <!-- chunky draggable pink minute hand -->
        <g id="l11-hand-m" transform="rotate(-30)">
          <path d="M0,6 V-27" stroke="${PINK}" stroke-width="4" ${W}/>
          <circle cx="0" cy="-27" r="4.5" fill="${YELLOW}" stroke="${INK}" stroke-width="2.2"/>
        </g>
        <circle r="4.5" fill="${INK}"/>
      </g>
    </g>

    <!-- ============ "BRB" DOOR-HANGER SIGN (Subtle diegetic clue for Main Ending!) ============ -->
    <g transform="translate(318,224)"><g id="l11-brb-sign" data-tap="brbSign" class="fb" style="cursor:pointer">
      <path d="M-12,-14 L0,-24 L12,-14" fill="none" stroke="${INK}" stroke-width="2.4" ${W}/>
      <circle cx="0" cy="-24" r="3" fill="${INK}"/>
      <rect x="-34" y="-14" width="68" height="38" rx="8" fill="#FFF3C4" ${S}/>
      <text x="0" y="4" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="14" fill="${PINK}">B.R.B.</text>
      <text x="0" y="17" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="8.5" fill="${INK}">BACK AT DAWN</text>
    </g></g>

    <!-- ============ COZY WINDOW SEAT + PILLOW + NOODLE ============ -->
    <g id="l11-bench" data-tap="bench">
      <rect x="28" y="384" width="230" height="106" rx="10" fill="#D99058" ${S}/>
      <rect x="44" y="416" width="88" height="58" rx="6" fill="#C47D44" stroke="${INK}" stroke-width="2.6"/>
      <rect x="154" y="416" width="88" height="58" rx="6" fill="#C47D44" stroke="${INK}" stroke-width="2.6"/>
      <!-- plush seat cushion -->
      <rect x="22" y="372" width="242" height="28" rx="14" fill="#6EC9F2" ${S}/>
    </g>
    <!-- fluffy pink cushion -->
    <g transform="translate(72,354)"><g id="l11-pillow" data-tap="pillow" class="fb" style="cursor:pointer">
      <rect x="-26" y="-20" width="52" height="40" rx="14" fill="${PINK}" ${S} transform="rotate(-10)"/>
      <path d="M-12,-4 Q0,4 12,-4" fill="none" stroke="#FFF4DC" stroke-width="3" stroke-linecap="round" opacity=".6"/>
    </g></g>

    <!-- Noodle sitting eagerly on window seat waiting for dawn -->
    <g id="l11-noodle" transform="translate(${ND0.x},${ND0.y})">
      <g id="l11-nd-anim" class="boil fb" data-tap="noodle" style="cursor:pointer">
        <g>${ART.noodleLegs(YELLOW)}</g>
        <g>${ART.noodleBody({ color: YELLOW })}</g>
        <g id="l11-nd-arms">${ART.noodleArms('relax', YELLOW)}</g>
        <g id="l11-nd-face" transform="translate(0,-14)">${ART.noodleFace({ eyes: 'open', mouth: 'flat' })}</g>
      </g>
    </g>

    <!-- ============ NIGHTSTAND + LAMP + CALENDAR + COCOA ============ -->
    <g id="l11-nightstand" data-tap="nightstand">
      <rect x="284" y="474" width="10" height="16" rx="3" fill="#9E5E30" ${S}/>
      <rect x="358" y="474" width="10" height="16" rx="3" fill="#9E5E30" ${S}/>
      <rect x="278" y="388" width="96" height="88" rx="6" fill="#D99058" ${S}/>
      <rect x="288" y="404" width="76" height="28" rx="5" fill="#E8A86C" stroke="${INK}" stroke-width="2.4"/>
      <circle cx="326" cy="418" r="3.6" fill="#fff" stroke="${INK}" stroke-width="2"/>
      <rect x="272" y="378" width="108" height="13" rx="5" fill="#B5713E" ${S}/>
    </g>

    <!-- bedside lamp (decoy: "not the sun!") -->
    <circle id="l11-lamp-halo" cx="348" cy="340" r="68" fill="url(#l11-lampglow)" opacity="0" pointer-events="none"/>
    <g transform="translate(348,354)"><g id="l11-lamp" data-tap="lamp" class="fb" style="cursor:pointer">
      <rect x="-24" y="-32" width="48" height="60" fill="#000" fill-opacity="0" pointer-events="all"/>
      <path d="M0,22 V-4 M-11,22 H11" stroke="#6E7891" stroke-width="4.5" ${W}/>
      <path d="M-20,0 L-12,-24 H12 L20,0 Z" fill="${YELLOW}" ${S}/>
      <circle id="l11-lamp-bulb" cx="0" cy="-2" r="5" fill="#FFF7B0" opacity=".3"/>
    </g></g>

    <!-- desk calendar ("TONIGHT") -->
    <g transform="translate(298,362)"><g id="l11-cal" data-tap="calendar" class="fb" style="cursor:pointer">
      <rect x="-18" y="-14" width="36" height="30" rx="5" fill="#fff" ${S}/>
      <rect x="-18" y="-14" width="36" height="10" rx="4" fill="${PINK}" stroke="${INK}" stroke-width="2.4"/>
      <text id="l11-cal-txt" x="0" y="9" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="7.8" fill="${INK}">NIGHT</text>
    </g></g>

    <!-- warm cocoa mug on window bench -->
    <g transform="translate(226,360)"><g id="l11-cocoa" data-tap="cocoa" class="fb" style="cursor:pointer">
      <g id="l11-cocoa-steam" pointer-events="none">
        <path d="M-5,-14 q-4,-6 0,-11 M5,-16 q4,-6 0,-11" fill="none" stroke="#fff" stroke-width="2.4" opacity=".68" ${W}/>
      </g>
      <path d="M11,-6 Q21,-6 20,2 Q19,10 10,9" fill="none" stroke="${INK}" stroke-width="5.5" ${W}/>
      <path d="M11,-6 Q21,-6 20,2 Q19,10 10,9" fill="none" stroke="${MINT}" stroke-width="2.4" ${W}/>
      <path d="M-12,-10 H12 L10,12 Q9,16 0,16 Q-9,16 -10,12 Z" fill="${MINT}" ${S}/>
      <ellipse cx="0" cy="-10" rx="12" ry="3.2" fill="#5E361B" stroke="${INK}" stroke-width="2.2"/>
    </g></g>

    <!-- FX & speech bubble layers -->
    <g id="l11-fx" pointer-events="none"></g>
    <g id="l11-talk" pointer-events="none"></g>
  </g>
</svg>`;
  }

  Object.assign(ART.stickers, {
    l11brb: (uid = 'a') => ART.stickerFrame('#7FD3F7',
      `<g transform="translate(-20,-20) scale(.62)">${ART.sun('happy')}</g>` +
      `<rect x="-4" y="-36" width="48" height="28" rx="7" fill="#FFF3C4" stroke="${INK}" stroke-width="3"/>` +
      `<text x="20" y="-17" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="14" fill="${PINK}">B.R.B.</text>` +
      ART.noodle({ x: 8, y: 24, scale: .56, eyes: 'happy', mouth: 'grin', armType: 'wave' }), 'l11br' + uid),
    l11patient: (uid = 'a') => ART.stickerFrame('#FFD66B',
      `<g transform="translate(0,-16) scale(.75)">${ART.sun('happy')}</g>` +
      ART.noodle({ x: 0, y: 26, scale: .54, eyes: 'closed', mouth: 'smile', armType: 'hug' }), 'l11pt' + uid),
    l11clock: (uid = 'a') => ART.stickerFrame('#FF8FB1',
      `<g transform="translate(-18,-14) scale(.72)">
        <circle r="32" fill="${YELLOW}" stroke="${INK}" stroke-width="4"/><circle r="24" fill="#fff" stroke="${INK}" stroke-width="3"/>
        <path d="M0,0 V-14 M0,0 V14" stroke="${PINK}" stroke-width="4" ${W}/>
      </g>` +
      ART.noodle({ x: 22, y: 20, scale: .52, eyes: 'wide', mouth: 'grin', armType: 'up' }), 'l11cl' + uid),
  });

  const L = {
    id: 11,
    promptHTML: '<span class="pw" id="pw-wait">Wait</span> for <span class="pw" id="pw-sun">sunrise</span>!',
    endings: [
      { id: 'brb', name: 'Back By Dawn', line: 'You left the game. Time kept moving without you.', rarity: 46, icon: 'l11brb', stamp: 'SUNRISE!' },
      { id: 'patient', name: 'Pure Patience', line: 'Fifteen seconds of doing literally nothing. Zen master.', rarity: 24, icon: 'l11patient', stamp: 'WORTH IT!' },
      { id: 'clock', name: 'Time Traveler', line: 'Why wait for 6:00 AM when you own the clock?', rarity: 18, icon: 'l11clock', stamp: '6:00 AM!' },
    ],
    hints(found) {
      if (!found.includes('brb')) return [
        { text: 'There is no skip button inside the game… maybe leave the game to pass the time?' },
        { text: 'Switch away from this app or tab for a couple seconds, then come right back!' },
      ];
      if (!found.includes('patient')) return [
        { text: 'Sometimes “Wait” literally means do nothing at all.' },
        { text: 'Take your hands off the screen for 15 seconds and watch the window!' },
      ];
      if (!found.includes('clock')) return [
        { text: 'It is 11:55 PM on the wall clock. Sunrise is at 6:00 AM.' },
        { text: 'Grab the big wall clock and spin its hand clockwise to 6:00 AM!', demo: 'spinClock' },
      ];
      return [{ text: 'All three endings found! Good morning, Noodle!' }];
    },
    demo(kind) {
      if (kind === 'spinClock') {
        return [
          { x: CLOCK.x, y: CLOCK.y - 34 },
          { x: CLOCK.x + 34, y: CLOCK.y },
          { x: CLOCK.x, y: CLOCK.y + 34 },
          { x: CLOCK.x - 34, y: CLOCK.y },
          { x: CLOCK.x, y: CLOCK.y - 34 },
        ];
      }
      return null;
    },
    build,
  };

  function build(ctx) {
    ctx.root.innerHTML = sceneSVG();
    const svg = ctx.root.querySelector('svg');
    const q = (s) => svg.querySelector(s);

    const wall = q('#l11-wall'), floor = q('#l11-floor');
    const skyTop = q('#l11-sky-top'), skyMid = q('#l11-sky-mid'), skyBot = q('#l11-sky-bot');
    const stars = q('#l11-stars'), moonWrap = q('#l11-moon-wrap'), moonEl = q('#l11-moon'), sunWrap = q('#l11-sun-wrap');
    const hillBack = q('#l11-hill-back'), hillFront = q('#l11-hill-front'), rays = q('#l11-morning-rays');
    const clockEl = q('#l11-clock'), handH = q('#l11-hand-h'), handM = q('#l11-hand-m'), clockTxt = q('#l11-clock-txt');
    const ndAnim = q('#l11-nd-anim'), ndFace = q('#l11-nd-face'), ndArms = q('#l11-nd-arms');
    const lampHalo = q('#l11-lamp-halo'), lampBulb = q('#l11-lamp-bulb'), calTxt = q('#l11-cal-txt'), cocoaSteam = q('#l11-cocoa-steam');
    const fx = q('#l11-fx'), talkLayer = q('#l11-talk');

    const st = {
      done: false,
      dawn: 0,           // current visual dawn [0..1]
      clockRad: 0,       // accumulated clockwise radians on wall clock
      holdingClock: false,
      holdingMoon: false,
      lampOn: false,
      calCount: 0,
      lastTouchAt: performance.now(),
      patienceWhispered: false,
      lastTickIdx: 0,
    };

    const alive = () => ctx.alive;
    const setFace = (o) => { ndFace.innerHTML = ART.noodleFace(o); };
    const setArms = (t) => { ndArms.innerHTML = ART.noodleArms(t, YELLOW); };
    const talk = (text, ms = 1950) => ctx.talk(talkLayer, ND0.x, ND0.y - 68, text, ms);

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

    /* ---------- smoothly morphs night -> dawn -> bright sunrise ---------- */
    function applyDawn(p) {
      p = U.clamp(p, 0, 1);
      st.dawn = p;
      const topC = p < 0.5 ? U.lerpColor('#171A48', '#52448F', p * 2) : U.lerpColor('#52448F', '#5BC0EB', (p - 0.5) * 2);
      const midC = p < 0.5 ? U.lerpColor('#282C6A', '#B85C8A', p * 2) : U.lerpColor('#B85C8A', '#9DE2FF', (p - 0.5) * 2);
      const botC = p < 0.55 ? U.lerpColor('#3B3D82', '#FF9666', p / 0.55) : U.lerpColor('#FF9666', '#FFF3B0', (p - 0.55) / 0.45);
      skyTop.setAttribute('stop-color', topC);
      skyMid.setAttribute('stop-color', midC);
      skyBot.setAttribute('stop-color', botC);

      wall.setAttribute('fill', U.lerpColor('#2F336E', '#FFF4DC', Math.pow(p, 1.15)));
      floor.setAttribute('fill', U.lerpColor('#9A6845', '#E8A86C', p));
      hillBack.setAttribute('fill', U.lerpColor('#233754', '#72D17E', p));
      hillFront.setAttribute('fill', U.lerpColor('#1D4B4E', '#3EB868', p));

      stars.setAttribute('opacity', U.clamp(1 - p * 1.8, 0, 1).toFixed(2));
      if (!st.holdingMoon) {
        const mx = MOON0.x - p * 34;
        const my = MOON0.y + p * 110;
        moonWrap.setAttribute('transform', `translate(${mx.toFixed(1)},${my.toFixed(1)})`);
        moonWrap.setAttribute('opacity', U.clamp(1 - p * 1.4, 0, 1).toFixed(2));
      }

      const sunT = U.clamp((p - 0.35) / 0.65, 0, 1);
      const sy = U.lerp(238, 108, sunT);
      sunWrap.setAttribute('transform', `translate(166,${sy.toFixed(1)})`);
      sunWrap.setAttribute('opacity', (sunT > 0.02 ? 1 : 0).toString());
      rays.setAttribute('opacity', (U.clamp((p - 0.65) / 0.35, 0, 1) * 0.24).toFixed(2));
    }

    function updateClockVisuals(progress) {
      // progress 0 = 11:55 PM, progress 1 = 6:00 AM (365 minutes)
      const totalMins = Math.round(progress * 365);
      const minsFromMidnight = (23 * 60 + 55 + totalMins) % (24 * 60);
      const h24 = Math.floor(minsFromMidnight / 60);
      const m = minsFromMidnight % 60;
      const ampm = h24 >= 12 ? 'PM' : 'AM';
      const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
      clockTxt.textContent = `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
      const hDeg = ((h24 % 12) + m / 60) * 30;
      const mDeg = m * 6;
      handH.setAttribute('transform', `rotate(${hDeg.toFixed(1)})`);
      handM.setAttribute('transform', `rotate(${mDeg.toFixed(1)})`);
    }

    /* ---------- SHARED SUNRISE CELEBRATION ---------- */
    async function winSunrise(endingId, talkLine, narrLine) {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      st.holdingClock = false; st.holdingMoon = false;
      const startDawn = st.dawn;
      A.play('chirp'); U.haptic([18, 36, 22]);
      await U.tween(Math.max(420, (1 - startDawn) * 1100), (t) => {
        if (!alive()) return;
        const p = U.lerp(startDawn, 1, t);
        applyDawn(p);
        updateClockVisuals(p);
      }, U.ease.inOutCubic);
      if (!alive()) return;
      applyDawn(1);
      updateClockVisuals(1);
      calTxt.textContent = 'DAWN!';
      setFace({ eyes: 'happy', mouth: 'grin' });
      setArms('up');
      U.replay(ndAnim, 'hop');
      pop(ND0.x, ND0.y - 78, 'GOOD MORNING!', YELLOW, 20);
      talk(talkLine, 2200);
      ctx.say(narrLine);
      await U.wait(860);
      if (alive()) ctx.win(endingId);
    }

    /* ---------- ENDING 1 (MAIN): LEAVE APP & RETURN ---------- */
    ctx.onCleanup(I.onAppReturn(() => {
      if (ctx.locked || st.done) return;
      winSunrise('brb', "OH! YOU'RE BACK — IT'S MORNING!!", 'You left the game. Time kept moving without you.');
    }));

    /* ---------- ENDING 3 (SECRET #2): SPIN WALL CLOCK TO 6:00 AM ---------- */
    let prevAngle = null;
    I.drag(clockEl, svg, {
      onStart(p) {
        if (ctx.locked || st.done) return;
        st.holdingClock = true;
        prevAngle = Math.atan2(p.y - CLOCK.y, p.x - CLOCK.x);
        A.play('tap'); ctx.attempt();
      },
      onMove(p) {
        if (!st.holdingClock || ctx.locked || st.done) return;
        const a = Math.atan2(p.y - CLOCK.y, p.x - CLOCK.x);
        let da = a - prevAngle;
        while (da > Math.PI) da -= Math.PI * 2;
        while (da < -Math.PI) da += Math.PI * 2;
        prevAngle = a;

        st.clockRad = U.clamp(st.clockRad + da, -1.1, NEED_RAD);
        if (st.clockRad < -0.75) {
          A.play('wobble');
          talk('Whoa—that is YESTERDAY!!');
          ctx.say('Wrong way! Spin clockwise toward 6:00 AM.');
          st.clockRad = -0.3;
        }
        const prog = U.clamp(st.clockRad / NEED_RAD, 0, 1);
        updateClockVisuals(prog);
        applyDawn(prog);

        const tickIdx = Math.floor(st.clockRad / (Math.PI / 3));
        if (tickIdx !== st.lastTickIdx) {
          st.lastTickIdx = tickIdx;
          A.play('click');
        }
        if (prog >= 0.98) {
          winSunrise('clock', 'WAIT—DID YOU FAST-FORWARD TIME?!', 'Why wait for 6:00 AM when you own the clock?');
        }
      },
      onTap() {
        st.holdingClock = false;
        if (ctx.locked || st.done) return;
        A.play('click'); U.replay(clockEl, 'wiggle');
        ctx.say('11:55 PM. Sunrise is at 6:00 AM. If only the hands moved faster…');
      },
      onEnd() {
        st.holdingClock = false;
        prevAngle = null;
      },
    });

    /* ---------- DECOY: DRAGGING THE MOON DOWN (Level 1 Callback!) ---------- */
    I.drag(moonEl, svg, {
      onStart() {
        if (ctx.locked || st.done) return;
        st.holdingMoon = true;
        A.play('tap'); ctx.attempt();
      },
      onMove(p, d) {
        if (!st.holdingMoon || ctx.locked || st.done) return;
        const x = MOON0.x + U.clamp(d.dx * 0.4, -24, 24);
        const y = MOON0.y + U.clamp(d.dy * 0.45, -16, 46);
        moonWrap.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
      },
      onTap() {
        st.holdingMoon = false;
        if (ctx.locked || st.done) return;
        A.play('giggle'); U.replay(moonEl, 'wiggle');
        ctx.say('The moon is on night shift until 6:00 AM.');
      },
      async onEnd(p, d) {
        if (!st.holdingMoon || st.done) return;
        st.holdingMoon = false;
        A.play('boing');
        const fromX = MOON0.x + U.clamp(d.dx * 0.4, -24, 24);
        const fromY = MOON0.y + U.clamp(d.dy * 0.45, -16, 46);
        await U.tween(320, (t) => {
          if (!alive() || st.done || st.holdingMoon) return;
          moonWrap.setAttribute('transform', `translate(${U.lerp(fromX, MOON0.x, t).toFixed(1)},${U.lerp(fromY, MOON0.y, t).toFixed(1)})`);
        }, U.ease.outBack);
        pop(MOON0.x + 20, MOON0.y + 10, 'NOPE!', '#FFF3B0', 16);
        ctx.say('That worked on the sun in Level 1 — the moon refuses to clock out early.');
      },
    });

    /* ---------- RESET PATIENCE TIMER ON ANY INTERACTION ---------- */
    const onAnyTouch = () => {
      if (st.done || ctx.locked) return;
      const idleMs = performance.now() - st.lastTouchAt;
      st.lastTouchAt = performance.now();
      // If player was partway through Patience and poked something (not the clock!), notify gently
      if (idleMs > 6500 && st.clockRad < 0.25 && !st.holdingClock) {
        st.patienceWhispered = false;
        ctx.say('Oops! You startled the sunrise back into midnight.');
      }
    };
    svg.addEventListener('pointerdown', onAnyTouch);
    ctx.promptEl.addEventListener('pointerdown', onAnyTouch);
    ctx.onCleanup(() => ctx.promptEl.removeEventListener('pointerdown', onAnyTouch));

    /* ---------- ANIMATION LOOP (Ending 2: Pure Patience after 15s untouched!) ---------- */
    (function loop(now) {
      if (!alive()) return;
      if (!st.done) {
        cocoaSteam.setAttribute('transform', `translate(${(Math.sin(now / 420) * 1.4).toFixed(1)},${(Math.cos(now / 360) * 1.5).toFixed(1)})`);

        const idleMs = now - st.lastTouchAt;
        const clockProg = U.clamp(st.clockRad / NEED_RAD, 0, 1);

        if (!st.holdingClock && !st.holdingMoon) {
          // After 3.5s hands-off, night gently begins melting into dawn!
          const patienceProg = U.clamp((idleMs - 3500) / (IDLE_WIN_MS - 3500), 0, 1);
          const targetDawn = Math.max(clockProg, patienceProg);
          // Smoothly ease visual dawn toward targetDawn (so resetting patience glides back softly)
          const nextDawn = st.dawn + (targetDawn - st.dawn) * 0.08;
          if (Math.abs(nextDawn - st.dawn) > 0.0005) {
            applyDawn(nextDawn);
            if (patienceProg > clockProg) updateClockVisuals(nextDawn);
          }

          if (patienceProg > 0.35 && !st.patienceWhispered) {
            st.patienceWhispered = true;
            talk('Shhh… stay still… the sky is brightening!', 2400);
          }
          if (idleMs >= IDLE_WIN_MS) {
            winSunrise('patient', 'PATIENCE ACTUALLY PAID OFF!!', 'Fifteen seconds of doing literally nothing. Zen master.');
            return;
          }
        }
      }
      requestAnimationFrame(loop);
    })(performance.now());

    /* ---------- TAP REACTIONS (all inner .fb, zero jump-to-(0,0)!) ---------- */
    const taps = {
      noodle() {
        ctx.attempt(); A.play('wobble'); U.replay(ndAnim, 'hop');
        talk(U.pick(['Is it morning yet?', 'I hate waiting…', 'Six hours to go!']));
        ctx.say('Watching the clock makes time slower. Proven science.');
      },
      lamp(node) {
        ctx.attempt(); A.play('click'); U.replay(node, 'wiggle');
        st.lampOn = !st.lampOn;
        lampHalo.setAttribute('opacity', st.lampOn ? '.95' : '0');
        lampBulb.setAttribute('opacity', st.lampOn ? '1' : '.3');
        ctx.say(st.lampOn ? 'Nice try. A bedside lamp is not a sunrise.' : 'Back to dramatic midnight lighting.');
      },
      calendar(node) {
        ctx.attempt(); A.play('swish'); U.replay(node, 'wiggle');
        st.calCount++;
        const labels = ['STILL', 'NIGHT', 'NOPE', '11:55'];
        calTxt.textContent = labels[st.calCount % labels.length];
        ctx.say('Flipped a page. Still midnight.');
      },
      brbSign(node) {
        ctx.attempt(); A.play('creak'); U.replay(node, 'wiggle');
        ctx.say('“B.R.B. — Back At Dawn.” Sometimes walking away is the fastest wait.');
      },
      cocoa(node) {
        ctx.attempt(); A.play('clink'); U.replay(node, 'wiggle');
        ctx.say('Warm midnight cocoa. Keeps Noodle awake for the sunrise.');
      },
      pillow(node) {
        ctx.attempt(); A.play('boing'); U.replay(node, 'wiggle');
        ctx.say('No hidden sun under the pillow.');
      },
      slippers(node) {
        ctx.attempt(); A.play('squeak'); U.replay(node, 'hop');
        ctx.say('Cozy bunny slippers. Ready for morning.');
      },
      sky() { ctx.attempt(); A.play('tap'); ctx.say('Still midnight out there.'); },
      bench() { ctx.attempt(); A.play('thud'); ctx.say('Front-row seat for sunrise.'); },
      nightstand() { ctx.attempt(); A.play('thud'); ctx.say('Just a lamp and a stubborn calendar.'); },
      rug() { ctx.attempt(); A.play('swish'); ctx.say('Soft rug. Zero time machines underneath.'); },
      wall() { ctx.attempt(); A.play('tap'); ctx.say('Waiting… waiting…'); },
      floor() { ctx.attempt(); A.play('thud'); ctx.say('Creaky midnight floorboards.'); },
    };
    I.taps(svg, (name, node) => { if (ctx.locked || st.done) return; if (taps[name]) taps[name](node); });

    const onPromptClick = (e) => {
      if (ctx.locked || st.done) return;
      if (e.target.id === 'pw-wait') { U.replay(e.target, 'wiggle'); A.play('tap'); ctx.say('Waiting is the hardest verb in gaming.'); }
      else if (e.target.id === 'pw-sun') { U.replay(e.target, 'wiggle'); A.play('tap'); ctx.say('Scheduled for 6:00 AM sharp.'); }
    };
    ctx.promptEl.addEventListener('click', onPromptClick);
    ctx.onCleanup(() => ctx.promptEl.removeEventListener('click', onPromptClick));

    applyDawn(0);
    updateClockVisuals(0);
  }

  BF.levels = BF.levels || {};
  BF.levels[11] = L;
})(window.BF);
