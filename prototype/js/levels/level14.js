/* Brainflip — Level 14: "What day is it today?"
   Home study desk & corkboard. Noodle is hopelessly lost in time.
   Main ending : tap the sticky note on the corkboard matching TODAY'S real-world
                 day of the week (reads new Date().getDay())                       (verb: real-world date)
   Secret #1   : tap the literal word "today" right inside the prompt banner!      (verb: read the UI)
   Secret #2   : tear off the 3 outdated pages from the red wall calendar
                 (drag down or tap 3 times) until it catches up to today's date!   (verb: tear / swipe down)
   Decoys: the stale wall calendar starts 3 days behind as misdirection, wrong day sticky
           notes get a red crayon X, folded "OLD NEWS" paper, glitchy "??:??" digital clock,
           potted succulent, corkboard, desk drawers. */
(function (BF) {
  'use strict';
  const U = BF.U, A = BF.audio, I = BF.input, ART = BF.art;
  const INK = '#1B1B2F', YELLOW = '#FFC93C', PINK = '#FF5D8F', MINT = '#3DDC97', SKY = '#5BC0EB', ORANGE = '#FF6B35', RED = '#FF5964';
  const W = 'stroke-linecap="round" stroke-linejoin="round"';
  const S = `stroke="${INK}" stroke-width="3.4" ${W}`;

  const ND0 = { x: 195, y: 382 };
  const CAL0 = { x: 68, y: 118 };

  const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  // 7 colorful sticky notes arranged cleanly in 2 rows on the corkboard (x: 132..366, y: 50..236)
  const NOTES = [
    { day: 1, x: 164, y: 100, rot: -4, fill: '#FFF08A', pin: PINK },   // MON
    { day: 2, x: 220, y: 98,  rot: 3,  fill: '#B8F0D4', pin: SKY },    // TUE
    { day: 3, x: 276, y: 101, rot: -2, fill: '#FFD0E0', pin: YELLOW }, // WED
    { day: 4, x: 332, y: 98,  rot: 4,  fill: '#BDE9FF', pin: ORANGE }, // THU
    { day: 5, x: 192, y: 176, rot: 2,  fill: '#FFD9A8', pin: MINT },   // FRI
    { day: 6, x: 250, y: 178, rot: -3, fill: '#E4D4FF', pin: PINK },   // SAT
    { day: 0, x: 308, y: 175, rot: 3,  fill: '#FFF08A', pin: SKY },    // SUN
  ];

  function dateOffset(base, daysAgo) {
    const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() - daysAgo);
    return {
      dayIdx: d.getDay(),
      dayStr: DAYS[d.getDay()],
      dateNum: d.getDate(),
      monthStr: MONTHS[d.getMonth()],
    };
  }

  function calPageSVG(info, golden = false) {
    return `
      <rect x="-40" y="-44" width="80" height="96" rx="7" fill="${golden ? '#FFF7B8' : '#FFFDF8'}" ${S}/>
      <rect x="-40" y="-44" width="80" height="24" rx="6" fill="${golden ? MINT : RED}" stroke="${INK}" stroke-width="3"/>
      <text x="0" y="-27" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="13" fill="#fff">${info.monthStr}</text>
      <text x="0" y="13" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="33" fill="${INK}">${info.dateNum}</text>
      <text x="0" y="34" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="13" fill="${golden ? '#157A54' : PINK}">${info.dayStr}</text>
      ${golden ? '' : `<path d="M22,52 L40,34 L40,46 Q40,52 34,52 Z" fill="#E6DEC8" stroke="${INK}" stroke-width="2.2" ${W}/>`}`;
  }

  function noteSVG(n) {
    return `
      <g transform="translate(${n.x},${n.y}) rotate(${n.rot})">
        <g id="l14-note-${n.day}" class="fb" data-day="${n.day}" data-tap="note" style="cursor:pointer">
          <rect x="-25" y="-27" width="50" height="54" rx="5" fill="${n.fill}" stroke="${INK}" stroke-width="2.8" ${W}/>
          <circle cx="0" cy="-20" r="4" fill="${n.pin}" stroke="${INK}" stroke-width="2"/>
          <text x="0" y="8" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="15.5" fill="${INK}">${DAYS[n.day]}</text>
          <g id="l14-x-${n.day}" opacity="0" pointer-events="none">
            <path d="M-14,-8 L14,18 M14,-8 L-14,18" stroke="${RED}" stroke-width="4.4" stroke-linecap="round"/>
          </g>
          <g id="l14-star-${n.day}" opacity="0" pointer-events="none">
            <path d="M16,-14 L18,-9 L23,-9 L19,-5 L21,0 L16,-3 L11,0 L13,-5 L9,-9 L14,-9 Z" fill="${YELLOW}" stroke="${INK}" stroke-width="1.8" ${W}/>
          </g>
        </g>
      </g>`;
  }

  function sceneSVG(calInfo, nextInfo) {
    return `
<svg viewBox="0 0 390 630" xmlns="http://www.w3.org/2000/svg" aria-label="Noodle at his home study desk staring confusedly at a corkboard with seven day-of-the-week sticky notes">
  <defs>
    <pattern id="l14-wall" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="14" cy="14" r="2" fill="#EBD7BE"/>
    </pattern>
  </defs>

  <g id="l14-room">
    <!-- cozy home study wall (full bleed past HUD) -->
    <rect data-tap="wall" x="-30" y="-200" width="450" height="640" fill="#FDF3E7"/>
    <rect x="-30" y="-200" width="450" height="640" fill="url(#l14-wall)" pointer-events="none"/>

    <!-- ============ TEAR-OFF WALL CALENDAR (3 days behind — Decoy + Secret #2!) ============ -->
    <g id="l14-cal-wrap" transform="translate(${CAL0.x},${CAL0.y})">
      <!-- hanging wall rings -->
      <path d="M-20,-48 V-36 M20,-48 V-36" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
      <!-- underlying next page peeking beneath -->
      <g id="l14-cal-under" transform="translate(2,3)">${calPageSVG(nextInfo, false)}</g>
      <!-- draggable/tappable top page -->
      <g id="l14-cal-top" class="grabbable" style="cursor:grab">
        <g id="l14-cal-in" class="fb">
          <rect x="-46" y="-50" width="92" height="110" fill="#000" fill-opacity="0" pointer-events="all"/>
          ${calPageSVG(calInfo, false)}
        </g>
      </g>
    </g>

    <!-- ============ SMALL LEFT WALL SHELF + POTTED SUCCULENT ============ -->
    <g id="l14-shelf-l">
      <path d="M36,276 V292 L48,276 M100,276 V292 L88,276" fill="none" stroke="#B5713E" stroke-width="5.5" ${W}/>
      <rect x="24" y="266" width="88" height="12" rx="5" fill="#C77D4A" ${S}/>
      <g transform="translate(68,246)"><g id="l14-plant" data-tap="plant" class="fb" style="cursor:pointer">
        <circle r="24" fill="#000" fill-opacity="0" pointer-events="all"/>
        <path d="M-12,4 H12 L9,20 H-9 Z" fill="#E07A4C" ${S}/>
        <ellipse cx="-8" cy="-4" rx="7" ry="10" fill="${MINT}" stroke="${INK}" stroke-width="2.6" transform="rotate(-26 -8 -4)"/>
        <ellipse cx="8" cy="-4" rx="7" ry="10" fill="${MINT}" stroke="${INK}" stroke-width="2.6" transform="rotate(26 8 -4)"/>
        <ellipse cx="0" cy="-10" rx="7" ry="12" fill="#46B862" stroke="${INK}" stroke-width="2.6"/>
      </g></g>
    </g>

    <!-- ============ WOODEN CORKBOARD + 7 DAY STICKY NOTES (Main Ending!) ============ -->
    <g id="l14-cork" data-tap="cork">
      <rect x="128" y="46" width="244" height="194" rx="12" fill="#A66534" ${S}/>
      <rect x="138" y="56" width="224" height="174" rx="6" fill="#D9A16B" stroke="${INK}" stroke-width="2.6"/>
      <!-- subtle cork flecks -->
      <g fill="#B87E49" opacity=".55" pointer-events="none">
        <circle cx="152" cy="70" r="2.2"/><circle cx="348" cy="74" r="2"/><circle cx="344" cy="214" r="2.5"/>
        <circle cx="156" cy="212" r="2.2"/><circle cx="248" cy="136" r="2"/><circle cx="312" cy="142" r="2"/>
      </g>
      ${NOTES.map(noteSVG).join('')}
    </g>

    <!-- ============ CONFUSED NOODLE BEHIND STUDY DESK ============ -->
    <g id="l14-noodle-wrap" transform="translate(${ND0.x},${ND0.y})">
      <g id="l14-nd-anim" class="boil fb" data-tap="noodle" style="cursor:pointer">
        <g>${ART.noodleBody({ color: YELLOW })}</g>
        <g id="l14-nd-arms">${ART.noodleArms('shrug', YELLOW)}</g>
        <g id="l14-nd-face" transform="translate(0,-14)">${ART.noodleFace({ eyes: 'wide', mouth: 'o' })}</g>
        <text id="l14-qmark" x="34" y="-56" font-family="Lilita One, sans-serif" font-size="26" fill="${PINK}" stroke="${INK}" stroke-width="4" paint-order="stroke">?</text>
      </g>
    </g>

    <!-- ============ STUDY DESK + DRAWERS ============ -->
    <g id="l14-desk" data-tap="desk">
      <rect x="-30" y="446" width="450" height="480" fill="#D68E54"/>
      <!-- desk drawers -->
      <rect x="24" y="470" width="156" height="58" rx="8" fill="#E39D62" ${S}/>
      <rect x="86" y="494" width="32" height="10" rx="5" fill="#FFF4DC" stroke="${INK}" stroke-width="2.4"/>
      <rect x="210" y="470" width="156" height="58" rx="8" fill="#E39D62" ${S}/>
      <rect x="272" y="494" width="32" height="10" rx="5" fill="#FFF4DC" stroke="${INK}" stroke-width="2.4"/>
      <rect x="24" y="542" width="156" height="62" rx="8" fill="#E39D62" ${S}/>
      <rect x="86" y="568" width="32" height="10" rx="5" fill="#FFF4DC" stroke="${INK}" stroke-width="2.4"/>
      <rect x="210" y="542" width="156" height="62" rx="8" fill="#E39D62" ${S}/>
      <rect x="272" y="568" width="32" height="10" rx="5" fill="#FFF4DC" stroke="${INK}" stroke-width="2.4"/>
      <!-- tabletop -->
      <rect x="-30" y="428" width="450" height="22" fill="#EBB27C" ${S}/>
      <path d="M-30,435 H420" stroke="#F7CBA0" stroke-width="4" pointer-events="none"/>
    </g>

    <!-- ============ DESK DECOYS: OLD NEWSPAPER + GLITCHY "??:??" CLOCK ============ -->
    <g transform="translate(68,414)"><g id="l14-paper" data-tap="paper" class="fb" style="cursor:pointer">
      <circle r="32" fill="#000" fill-opacity="0" pointer-events="all"/>
      <path d="M-36,12 L-28,-16 H32 L36,12 Z" fill="#F4F1E8" ${S}/>
      <rect x="-24" y="-11" width="48" height="9" rx="2" fill="${INK}"/>
      <text x="0" y="-4" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="7.5" fill="#fff">OLD NEWS</text>
      <path d="M-24,4 H4 M-24,9 H12 M12,4 H26" stroke="#9AA3B2" stroke-width="2.6" stroke-linecap="round"/>
    </g></g>

    <g transform="translate(322,410)"><g id="l14-dclock" data-tap="dclock" class="fb" style="cursor:pointer">
      <circle r="34" fill="#000" fill-opacity="0" pointer-events="all"/>
      <rect x="-34" y="-20" width="68" height="36" rx="9" fill="#2B2D6E" ${S}/>
      <rect x="-26" y="-12" width="52" height="20" rx="4" fill="#17193B"/>
      <text id="l14-dclock-txt" x="0" y="3.5" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="14" fill="${MINT}">??:??</text>
    </g></g>

    <!-- FX & speech bubble layers -->
    <g id="l14-fx" pointer-events="none"></g>
    <g id="l14-talk" pointer-events="none"></g>
  </g>
</svg>`;
  }

  Object.assign(ART.stickers, {
    l14real: (uid = 'a') => ART.stickerFrame('#7FF0BD',
      `<rect x="-36" y="-40" width="72" height="78" rx="8" fill="#FFFDF8" stroke="${INK}" stroke-width="3.6"/>` +
      `<rect x="-36" y="-40" width="72" height="22" rx="7" fill="${PINK}" stroke="${INK}" stroke-width="3.2"/>` +
      `<text x="0" y="-24" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="12" fill="#fff">TODAY</text>` +
      `<path d="M-16,10 L-4,22 L20,-4" fill="none" stroke="${MINT}" stroke-width="7" ${W}/>`, 'l14rl' + uid),
    l14word: (uid = 'a') => ART.stickerFrame('#FFD66B',
      `<rect x="-46" y="-24" width="92" height="38" rx="12" fill="#fff" stroke="${INK}" stroke-width="3.4" transform="rotate(-6)"/>` +
      `<text x="0" y="2" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="22" fill="${PINK}" transform="rotate(-6)">today!</text>` +
      ART.noodle({ x: 24, y: 28, scale: .46, eyes: 'wink', mouth: 'grin', armType: 'up' }), 'l14wd' + uid),
    l14tear: (uid = 'a') => ART.stickerFrame('#7FD3F7',
      `<g transform="translate(-14,-10) rotate(-10) scale(.62)">
        <rect x="-38" y="-42" width="76" height="90" rx="8" fill="#FFF7B8" stroke="${INK}" stroke-width="4.5"/>
        <rect x="-38" y="-42" width="76" height="24" rx="7" fill="${MINT}" stroke="${INK}" stroke-width="4"/>
      </g>` +
      `<g transform="translate(26,18) rotate(24) scale(.42)">
        <rect x="-38" y="-42" width="76" height="90" rx="8" fill="#FFFDF8" stroke="${INK}" stroke-width="5"/>
        <rect x="-38" y="-42" width="76" height="24" rx="7" fill="${RED}" stroke="${INK}" stroke-width="4.5"/>
      </g>` +
      `<path d="M-4,24 L12,34" stroke="#fff" stroke-width="4" ${W}/>`, 'l14tr' + uid),
  });

  const L = {
    id: 14,
    promptHTML: 'What day is it <span class="pw" id="pw-today">today</span>?',
    endings: [
      { id: 'realday', name: 'Real Calendar', line: 'Checked the real world. Bold move.', rarity: 52, icon: 'l14real', stamp: 'TODAY!' },
      { id: 'word', name: 'Technically Correct', line: 'What day is it today? Literally “today.”', rarity: 26, icon: 'l14word', stamp: 'LITERAL!' },
      { id: 'tear', name: 'Caught Up!', line: 'Three stale pages later, welcome to the present.', rarity: 18, icon: 'l14tear', stamp: 'UP TO DATE!' },
    ],
    hints(found) {
      if (!found.includes('realday')) return [
        { text: 'The wall calendar on the left is outdated. Do not trust it!' },
        { text: `Tap the sticky note on the corkboard for TODAY in real life (${FULL[new Date().getDay()]})!` },
      ];
      if (!found.includes('word')) return [
        { text: 'Read the question very, VERY literally.' },
        { text: 'Tap the actual word “today” right inside the question banner!', demo: 'tapToday' },
      ];
      if (!found.includes('tear')) return [
        { text: 'That red wall calendar on the left is stuck three days in the past…' },
        { text: 'Tear off 3 pages from the red wall calendar (drag down or tap it 3 times)!', demo: 'tearCal' },
      ];
      return [{ text: 'All three endings found! Never miss a day again.' }];
    },
    demo(kind) {
      if (kind === 'tapToday') return [{ x: 286, y: -32 }, { x: 286, y: -32 }];
      if (kind === 'tearCal') return [{ x: CAL0.x, y: CAL0.y + 10 }, { x: CAL0.x, y: CAL0.y + 92 }];
      return null;
    },
    build,
  };

  function build(ctx) {
    const now = new Date();
    const todayIdx = now.getDay();
    const pages = [3, 2, 1, 0].map((ago) => dateOffset(now, ago));
    const decoyIdx = pages[0].dayIdx;

    ctx.root.innerHTML = sceneSVG(pages[0], pages[1]);
    const svg = ctx.root.querySelector('svg');
    const q = (s) => svg.querySelector(s);

    const ndAnim = q('#l14-nd-anim'), ndFace = q('#l14-nd-face'), ndArms = q('#l14-nd-arms'), qmark = q('#l14-qmark');
    const calTop = q('#l14-cal-top'), calIn = q('#l14-cal-in'), calUnder = q('#l14-cal-under');
    const dclockTxt = q('#l14-dclock-txt');
    const fx = q('#l14-fx'), talkLayer = q('#l14-talk');

    const st = {
      done: false,
      pageStep: 0,      // 0 = 3 days ago, 1 = 2 days ago, 2 = yesterday, 3 = TODAY!
      tearing: false,
      holdingCal: false,
      wrongSet: new Set(),
      lastIdle: performance.now(),
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

    function celebrate(talkLine, narrLine, endingId) {
      qmark.setAttribute('opacity', '0');
      setFace({ eyes: 'happy', mouth: 'grin' });
      setArms('up');
      U.replay(ndAnim, 'hop');
      dclockTxt.textContent = DAYS[todayIdx];
      talk(talkLine, 2200);
      ctx.say(narrLine);
      setTimeout(() => { if (alive()) ctx.win(endingId); }, 850);
    }

    /* ---------- ENDING 1 (MAIN): TAP TODAY'S REAL STICKY NOTE ---------- */
    function handleNoteTap(node) {
      const day = Number(node.getAttribute('data-day'));
      ctx.attempt();
      if (day === todayIdx) {
        if (st.done) return;
        st.done = true; ctx.locked = true;
        A.play('pop'); A.play('chirp'); U.haptic([18, 36, 22]);
        const star = q(`#l14-star-${day}`);
        if (star) star.setAttribute('opacity', '1');
        node.querySelector('rect').setAttribute('fill', MINT);
        U.replay(node, 'hop');
        const noteObj = NOTES.find((n) => n.day === day);
        pop(noteObj.x, noteObj.y - 34, `${FULL[day].toUpperCase()}!`, MINT, 18);
        celebrate(`OH RIGHT!! HAPPY ${FULL[day].toUpperCase()}!!`, 'Checked the real world. Bold move.', 'realday');
        return;
      }

      // Wrong day sticky note!
      A.play('bonk'); U.haptic(12);
      U.replay(node, 'wiggle');
      const xEl = q(`#l14-x-${day}`);
      if (xEl) xEl.setAttribute('opacity', '1');
      const noteObj = NOTES.find((n) => n.day === day);
      pop(noteObj.x, noteObj.y - 30, 'NOPE!', RED, 15);
      if (day === decoyIdx && st.pageStep === 0) {
        talk('That wall calendar is 3 days behind!');
        ctx.say('Do not trust that dusty wall calendar — it has not been torn in days.');
      } else if (st.wrongSet.has(day)) {
        ctx.say(`Still not ${FULL[day]}. Try checking real life!`);
      } else {
        st.wrongSet.add(day);
        ctx.say(day === 1 ? 'Feels like Monday, sure. Still wrong.' : `Nope, not ${FULL[day]} in the real world.`);
      }
    }

    /* ---------- ENDING 3 (SECRET #2): TEAR OFF 3 STALE CALENDAR PAGES ---------- */
    async function tearOnePage(startDy = 0) {
      if (st.done || ctx.locked || st.tearing || st.pageStep >= 3) return;
      st.tearing = true;
      ctx.attempt();
      A.play('swish'); U.haptic(14);

      const ripped = pages[st.pageStep];
      const nextStep = st.pageStep + 1;
      const isToday = nextStep === 3;

      // Spawn a fluttering torn page copy flying off downward!
      const fly = U.svgEl('g', { transform: `translate(${CAL0.x},${(CAL0.y + startDy).toFixed(1)})` }, fx);
      fly.innerHTML = calPageSVG(ripped, false);

      // Immediately advance calendar stack beneath!
      st.pageStep = nextStep;
      calTop.setAttribute('transform', 'translate(0,0)');
      calIn.innerHTML = `<rect x="-46" y="-50" width="92" height="110" fill="#000" fill-opacity="0" pointer-events="all"/>` + calPageSVG(pages[st.pageStep], isToday);
      calUnder.innerHTML = calPageSVG(pages[Math.min(3, st.pageStep + 1)], isToday);

      const rotDir = nextStep % 2 ? 1 : -1;
      await U.tween(480, (t) => {
        if (!alive()) return;
        const fxX = CAL0.x + rotDir * t * 48;
        const fxY = CAL0.y + startDy + t * 190;
        fly.setAttribute('transform', `translate(${fxX.toFixed(1)},${fxY.toFixed(1)}) rotate(${(rotDir * t * 38).toFixed(1)})`);
        fly.setAttribute('opacity', (1 - t).toFixed(2));
      }, U.ease.inCubic);
      fly.remove();
      if (!alive()) return;

      st.tearing = false;

      if (st.pageStep === 1) {
        pop(CAL0.x, CAL0.y - 54, 'RIP!', YELLOW, 16);
        ctx.say('Two days behind! Keep tearing…');
      } else if (st.pageStep === 2) {
        pop(CAL0.x, CAL0.y - 54, 'YESTERDAY!', ORANGE, 16);
        talk('Almost caught up to today!');
        ctx.say('Yesterday! Tear one more page!');
      } else {
        st.done = true; ctx.locked = true;
        A.play('pop'); A.play('chirp'); U.haptic([20, 40, 24]);
        U.replay(calIn, 'hop');
        pop(CAL0.x, CAL0.y - 58, `${pages[3].dayStr} ${pages[3].dateNum}!`, MINT, 19);
        celebrate(`WHOA! IT’S ${FULL[todayIdx].toUpperCase()}!!`, 'Three stale pages later, welcome to the present.', 'tear');
      }
    }

    I.drag(calTop, svg, {
      onStart() {
        if (ctx.locked || st.done || st.tearing) return;
        st.holdingCal = true;
      },
      onMove(p, d) {
        if (!st.holdingCal || ctx.locked || st.done || st.tearing) return;
        const dy = U.clamp(d.dy, 0, 56);
        calTop.setAttribute('transform', `translate(${(d.dx * 0.15).toFixed(1)},${dy.toFixed(1)}) rotate(${(dy * 0.18).toFixed(1)})`);
        if (dy > 38) {
          st.holdingCal = false;
          tearOnePage(dy);
        }
      },
      onTap() {
        st.holdingCal = false;
        if (ctx.locked || st.done || st.tearing) return;
        tearOnePage(0);
      },
      async onEnd(p, d) {
        if (!st.holdingCal || st.done || st.tearing) return;
        st.holdingCal = false;
        const dy = U.clamp(d.dy, 0, 56);
        if (dy > 24) { tearOnePage(dy); return; }
        await U.tween(220, (t) => {
          if (!alive() || st.done || st.holdingCal) return;
          calTop.setAttribute('transform', `translate(0,${U.lerp(dy, 0, t).toFixed(1)})`);
        }, U.ease.outBack);
      },
    });

    /* ---------- ENDING 2 (SECRET #1): TAP "today" IN THE PROMPT BANNER! ---------- */
    const todayWord = ctx.promptEl.querySelector('#pw-today');
    const onPromptClick = (e) => {
      if (ctx.locked || st.done) return;
      if (e.target === todayWord || e.target.id === 'pw-today') {
        st.done = true; ctx.locked = true;
        A.play('pop'); A.play('chirp'); U.haptic([18, 36, 22]);
        todayWord.style.color = PINK;
        U.replay(todayWord, 'hop');
        celebrate('WAIT… TODAY LITERALLY IS TODAY!!', 'What day is it today? Literally “today.”', 'word');
      } else {
        A.play('tap');
        ctx.say('Think outside the screen — or read the question very literally.');
      }
    };
    ctx.promptEl.addEventListener('click', onPromptClick);
    ctx.onCleanup(() => ctx.promptEl.removeEventListener('click', onPromptClick));

    /* ---------- ANIMATION LOOP ---------- */
    (function loop(nowMs) {
      if (!alive()) return;
      if (!st.done) {
        qmark.setAttribute('transform', `translate(0,${(Math.sin(nowMs / 340) * 3.2).toFixed(1)})`);
        dclockTxt.setAttribute('opacity', Math.sin(nowMs / 380) > -0.35 ? '1' : '.35');
        if (nowMs - st.lastIdle > 11000) {
          st.lastIdle = nowMs;
          ctx.say(U.pick([
            'Seven sticky notes. Only one matches real life.',
            'Noodle forgot to check the calendar for three days.',
            'What day IS it today, really?',
          ]));
        }
      }
      requestAnimationFrame(loop);
    })(performance.now());
    svg.addEventListener('pointerdown', () => { st.lastIdle = performance.now(); });

    /* ---------- TAP REACTIONS (all inner .fb, zero jump-to-(0,0)!) ---------- */
    const taps = {
      note(node) { handleNoteTap(node); },
      noodle() {
        ctx.attempt(); A.play('wobble'); U.replay(ndAnim, 'hop');
        talk(U.pick(['Is it Friday yet?', 'Every day feels like Tuesday…', 'I have lost all sense of time!']));
        ctx.say('He genuinely has no idea what day it is.');
      },
      paper(node) {
        ctx.attempt(); A.play('swish'); U.replay(node, 'wiggle');
        ctx.say('Headline: “Yesterday Happened.” Zero help for today.');
      },
      dclock(node) {
        ctx.attempt(); A.play('click'); U.replay(node, 'wiggle');
        ctx.say('Even the digital clock gave up on tracking days.');
      },
      plant(node) {
        ctx.attempt(); A.play('chirp'); U.replay(node, 'hop');
        ctx.say('Succulents do not care about weekdays.');
      },
      cork() { ctx.attempt(); A.play('tap'); ctx.say('Seven sticky notes, seven days of the week.'); },
      desk() { ctx.attempt(); A.play('thud'); ctx.say('Solid study desk.'); },
      wall() { ctx.attempt(); A.play('tap'); ctx.say('Warm study wallpaper.'); },
    };
    I.taps(svg, (name, node) => { if (ctx.locked || st.done) return; if (taps[name]) taps[name](node); });
  }

  BF.levels = BF.levels || {};
  BF.levels[14] = L;
})(window.BF);
