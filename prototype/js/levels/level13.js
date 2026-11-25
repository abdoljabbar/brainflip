/* Brainflip — Level 13: "Open the jar!"
   Tiled kitchen counter & sink. A factory-sealed jar of PICKLES refuses to open.
   Main ending : put TWO fingers on the jar lid and twist COUNTER-CLOCKWISE to unscrew it!
                 (desktop fallback: scroll wheel UP/LEFT over the jar lid)        (verb: two-finger twist)
   Secret #1   : drag the pickle jar over to Noodle — he clamps down and bites
                 the metal lid right off with his teeth!                          (verb: drag to Noodle)
   Secret #2   : place the jar under the kitchen faucet and run the RED HOT tap
                 (either order!) — steam expands the metal lid until it POPS!     (verb: hot water physics)
   Decoys: tapping or 1-finger dragging the lid ("too tight!"), twisting clockwise
           ("wrong way!"), cold blue tap ("shrinks metal!"), banging wooden spoon on lid,
           slipping oven mitt on lid, kitchen timer, potted basil, pickle-lover sign. */
(function (BF) {
  'use strict';
  const U = BF.U, A = BF.audio, I = BF.input, ART = BF.art;
  const INK = '#1B1B2F', YELLOW = '#FFC93C', PINK = '#FF5D8F', MINT = '#3DDC97', SKY = '#5BC0EB', ORANGE = '#FF6B35', RED = '#FF5964';
  const W = 'stroke-linecap="round" stroke-linejoin="round"';
  const S = `stroke="${INK}" stroke-width="3.4" ${W}`;

  const ND0 = { x: 100, y: 368 };
  const JAR0 = { x: 204, y: 374 };
  const SINK_SPOT = { x: 320, y: 382 };
  const SPOON0 = { x: 36, y: 382 };
  const MITT0 = { x: 60, y: 178 };

  function pickle(x, y, rot = 0) {
    return `<g transform="translate(${x},${y}) rotate(${rot})">
      <rect x="-8" y="-20" width="16" height="40" rx="8" fill="#46B862" stroke="${INK}" stroke-width="2.4"/>
      <circle cx="-3" cy="-9" r="1.6" fill="#2A8040"/><circle cx="3" cy="-2" r="1.8" fill="#2A8040"/>
      <circle cx="-2" cy="8" r="1.7" fill="#2A8040"/><circle cx="3" cy="12" r="1.4" fill="#2A8040"/>
      <path d="M-4,-14 V-4" stroke="#8CE8A1" stroke-width="2" opacity=".7" stroke-linecap="round"/>
    </g>`;
  }

  function jarArtSVG() {
    return `
      <!-- glass jar body (drag here to move the whole jar!) -->
      <g id="l13-jar-body" style="cursor:grab">
        <rect x="-40" y="-32" width="80" height="82" rx="16" fill="#D9F8E2" ${S}/>
        <!-- green brine + pickles inside -->
        <rect x="-35" y="-22" width="70" height="68" rx="12" fill="#B6F0C5"/>
        ${pickle(-16, 12, -12)}${pickle(15, 14, 14)}${pickle(0, 10, 2)}
        <!-- crisp cream PICKLES label -->
        <rect x="-32" y="-4" width="64" height="28" rx="7" fill="#FFFDF6" stroke="${INK}" stroke-width="2.6"/>
        <rect x="-32" y="-4" width="64" height="7" rx="3" fill="${MINT}" stroke="${INK}" stroke-width="1.8"/>
        <text x="0" y="17" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="13.5" letter-spacing=".4" fill="${INK}">PICKLES</text>
        <!-- glass highlight + outer stroke -->
        <path d="M-29,-18 V32" stroke="#fff" stroke-width="4.5" opacity=".7" stroke-linecap="round"/>
        <rect x="-40" y="-32" width="80" height="82" rx="16" fill="none" ${S}/>
        <!-- jar neck threads -->
        <rect x="-28" y="-40" width="56" height="10" rx="3" fill="#E8FAF0" stroke="${INK}" stroke-width="2.6"/>
      </g>
      <!-- metal screw lid (twist with 2 fingers or scroll wheel!) -->
      <g id="l13-lid-wrap" transform="translate(0,-42)">
        <g id="l13-lid" class="fb" style="cursor:grab">
          <rect x="-42" y="-24" width="84" height="38" fill="#000" fill-opacity="0" pointer-events="all"/>
          <rect id="l13-lid-cap" x="-33" y="-12" width="66" height="18" rx="6" fill="${RED}" ${S}/>
          <!-- vertical grip ridges that visibly slide as you unscrew! -->
          <g id="l13-lid-ridges" stroke="#fff" stroke-width="2.4" opacity=".62" stroke-linecap="round">
            <path d="M-22,-8 V2 M-11,-8 V2 M0,-8 V2 M11,-8 V2 M22,-8 V2"/>
          </g>
          <path d="M-24,-12 H24" stroke="#FFB3B8" stroke-width="2.6" opacity=".75" stroke-linecap="round"/>
        </g>
      </g>`;
  }

  function spoonSVG() {
    return `
      <circle r="28" fill="#000" fill-opacity="0" pointer-events="all"/>
      <g transform="rotate(-14)">
        <rect x="-3.5" y="-6" width="7" height="44" rx="3.5" fill="#D99058" stroke="${INK}" stroke-width="2.8"/>
        <ellipse cx="0" cy="-16" rx="12" ry="16" fill="#E6A468" ${S}/>
        <ellipse cx="-2" cy="-18" rx="5" ry="7" fill="#F4C592" opacity=".7"/>
      </g>`;
  }

  function mittSVG() {
    return `
      <circle r="30" fill="#000" fill-opacity="0" pointer-events="all"/>
      <path d="M-14,-22 H14 V6 C14,22 -14,22 -14,6 V2 C-24,2 -24,-12 -14,-12 Z" fill="${PINK}" ${S}/>
      <rect x="-15" y="-24" width="30" height="9" rx="3" fill="#FFFDF6" stroke="${INK}" stroke-width="2.6"/>
      <path d="M-7,-6 L7,8 M7,-6 L-7,8" stroke="#fff" stroke-width="2.2" opacity=".55" stroke-linecap="round"/>`;
  }

  function sceneSVG() {
    return `
<svg viewBox="0 0 390 630" xmlns="http://www.w3.org/2000/svg" aria-label="Noodle at his tiled kitchen counter struggling to open a sealed jar of pickles">
  <defs>
    <pattern id="l13-tiles" width="44" height="24" patternUnits="userSpaceOnUse">
      <rect width="44" height="24" fill="#FFF8EE"/>
      <path d="M0,24 H44 M22,0 V12 M0,12 H44 M0,12 V24" fill="none" stroke="#E4ECE7" stroke-width="2"/>
    </pattern>
  </defs>

  <g id="l13-room">
    <!-- tiled kitchen backsplash (full bleed past HUD!) -->
    <rect data-tap="wall" x="-30" y="-200" width="450" height="624" fill="url(#l13-tiles)"/>

    <!-- ============ UPPER KITCHEN WALL DECOR ============ -->
    <!-- left spice shelf + garlic jar -->
    <g id="l13-shelf-l">
      <path d="M32,146 V162 L44,146 M116,146 V162 L104,146" fill="none" stroke="#B5713E" stroke-width="5.5" ${W}/>
      <rect x="20" y="136" width="108" height="12" rx="5" fill="#C77D4A" ${S}/>
      <g transform="translate(52,118)"><g id="l13-spice1" data-tap="spice" class="fb" style="cursor:pointer">
        <rect x="-11" y="-12" width="22" height="28" rx="5" fill="#FFE680" ${S}/>
        <rect x="-12" y="-16" width="24" height="6" rx="2.5" fill="${PINK}" stroke="${INK}" stroke-width="2.2"/>
        <text x="0" y="6" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="7.5" fill="${INK}">DILL</text>
      </g></g>
      <g transform="translate(94,118)"><g id="l13-spice2" data-tap="spice" class="fb" style="cursor:pointer">
        <rect x="-11" y="-12" width="22" height="28" rx="5" fill="#CFEFFF" ${S}/>
        <rect x="-12" y="-16" width="24" height="6" rx="2.5" fill="${SKY}" stroke="${INK}" stroke-width="2.2"/>
        <text x="0" y="6" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="6.8" fill="${INK}">HERB</text>
      </g></g>
      <!-- hook under shelf for oven mitt -->
      <circle cx="60" cy="154" r="3" fill="${INK}"/>
    </g>

    <!-- center kitchen sign -->
    <g transform="translate(195,94) rotate(-2)"><g id="l13-sign" data-tap="sign" class="fb" style="cursor:pointer">
      <rect x="-48" y="-36" width="96" height="72" rx="8" fill="#FFFDF8" ${S}/>
      <rect x="-40" y="-28" width="80" height="56" rx="4" fill="#E8FAF0" stroke="${INK}" stroke-width="2.2"/>
      <text x="0" y="-10" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="11.5" fill="#2A8040">PICKLE</text>
      <text x="0" y="5" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="11.5" fill="${PINK}">LOVER</text>
      <text x="0" y="20" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="8.5" fill="${INK}">EST. 2026</text>
    </g></g>

    <!-- right shelf: egg timer + potted basil -->
    <g id="l13-shelf-r">
      <path d="M274,154 V170 L286,154 M358,154 V170 L346,154" fill="none" stroke="#B5713E" stroke-width="5.5" ${W}/>
      <rect x="262" y="144" width="110" height="12" rx="5" fill="#C77D4A" ${S}/>
      <g transform="translate(292,126)"><g id="l13-timer" data-tap="timer" class="fb" style="cursor:pointer">
        <ellipse cx="0" cy="0" rx="14" ry="18" fill="#fff" ${S}/>
        <path d="M-13,2 H13" stroke="${PINK}" stroke-width="3"/>
        <circle cx="0" cy="2" r="2.2" fill="${INK}"/>
      </g></g>
      <g transform="translate(342,124)"><g id="l13-basil" data-tap="basil" class="fb" style="cursor:pointer">
        <circle r="24" fill="#000" fill-opacity="0" pointer-events="all"/>
        <path d="M-11,4 H11 L8,20 H-8 Z" fill="#E07A4C" ${S}/>
        <ellipse cx="-8" cy="-4" rx="8" ry="6" fill="${MINT}" stroke="${INK}" stroke-width="2.4" transform="rotate(-24 -8 -4)"/>
        <ellipse cx="8" cy="-4" rx="8" ry="6" fill="${MINT}" stroke="${INK}" stroke-width="2.4" transform="rotate(24 8 -4)"/>
        <ellipse cx="0" cy="-12" rx="7" ry="8" fill="#46B862" stroke="${INK}" stroke-width="2.4"/>
      </g></g>
    </g>

    <!-- ============ NOODLE BEHIND KITCHEN COUNTER (Secret #1 target: Teeth!) ============ -->
    <g id="l13-noodle-wrap" transform="translate(${ND0.x},${ND0.y})">
      <g id="l13-nd-anim" class="boil fb" data-tap="noodle" style="cursor:pointer">
        <g>${ART.noodleBody({ color: YELLOW })}</g>
        <g id="l13-nd-arms">${ART.noodleArms('relax', YELLOW)}</g>
        <g id="l13-nd-face" transform="translate(0,-14)">${ART.noodleFace({ eyes: 'open', mouth: 'frown' })}</g>
      </g>
    </g>

    <!-- ============ KITCHEN COUNTERTOP + CABINETS + BUILT-IN SINK ============ -->
    <!-- lower cabinets -->
    <g id="l13-cabinets" data-tap="cabinets">
      <rect x="-30" y="432" width="450" height="490" fill="#D99058"/>
      <rect x="18" y="454" width="110" height="144" rx="8" fill="#E6A468" ${S}/>
      <circle cx="112" cy="526" r="5" fill="#fff" stroke="${INK}" stroke-width="2.4"/>
      <rect x="140" y="454" width="110" height="144" rx="8" fill="#E6A468" ${S}/>
      <circle cx="156" cy="526" r="5" fill="#fff" stroke="${INK}" stroke-width="2.4"/>
      <rect x="262" y="454" width="110" height="144" rx="8" fill="#E6A468" ${S}/>
      <circle cx="278" cy="526" r="5" fill="#fff" stroke="${INK}" stroke-width="2.4"/>
    </g>
    <!-- marble countertop -->
    <rect data-tap="counter" x="-30" y="414" width="450" height="22" fill="#FFFDF8" ${S}/>
    <path d="M-30,432 H420" stroke="#D9E0E6" stroke-width="3" pointer-events="none"/>

    <!-- ============ BUILT-IN KITCHEN SINK + HOT / COLD FAUCET (Secret #2!) ============ -->
    <g id="l13-sink">
      <!-- sink rim inset into right counter -->
      <rect x="272" y="408" width="98" height="14" rx="6" fill="#C9D3DF" ${S}/>
      <ellipse cx="321" cy="414" rx="40" ry="6" fill="#7D8A9E" stroke="${INK}" stroke-width="2.2"/>
      <!-- arched silver faucet spout -->
      <path d="M336,410 V336 C336,304 308,304 308,330 V338" fill="none" stroke="${INK}" stroke-width="14" ${W}/>
      <path d="M336,410 V336 C336,304 308,304 308,330 V338" fill="none" stroke="#DCE3EC" stroke-width="7.5" ${W}/>
      <rect x="301" y="335" width="14" height="6" rx="2" fill="#B0BCCB" stroke="${INK}" stroke-width="2.4"/>

      <!-- HOT water stream + steam (Secret #2!) -->
      <g id="l13-stream-hot" opacity="0" pointer-events="none">
        <path d="M308,342 V412" stroke="#FFD6DE" stroke-width="10" stroke-linecap="round" opacity=".88"/>
        <path d="M308,344 V412" stroke="#fff" stroke-width="4" stroke-dasharray="10 8" stroke-linecap="round"/>
        <g id="l13-hot-steam">
          <path d="M292,386 q-6,-10 0,-20 q6,-10 0,-18 M324,382 q6,-10 0,-20 q-6,-10 0,-18 M308,370 q-5,-9 0,-18" fill="none" stroke="#fff" stroke-width="3.4" opacity=".85" ${W}/>
        </g>
      </g>
      <!-- COLD water stream (Decoy!) -->
      <g id="l13-stream-cold" opacity="0" pointer-events="none">
        <path d="M308,342 V412" stroke="${SKY}" stroke-width="10" stroke-linecap="round" opacity=".82"/>
        <path d="M308,344 V412" stroke="#E3F7FF" stroke-width="4" stroke-dasharray="10 8" stroke-linecap="round"/>
      </g>

      <!-- RED HOT tap knob -->
      <g transform="translate(290,396)"><g id="l13-tap-hot" data-tap="hotTap" class="fb" style="cursor:pointer">
        <circle r="24" fill="#000" fill-opacity="0" pointer-events="all"/>
        <rect x="-4" y="2" width="8" height="12" fill="#B0BCCB" stroke="${INK}" stroke-width="2.4"/>
        <circle cx="0" cy="-2" r="12" fill="${RED}" ${S}/>
        <text x="0" y="2.5" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="11.5" fill="#fff">H</text>
      </g></g>

      <!-- BLUE COLD tap knob -->
      <g transform="translate(354,396)"><g id="l13-tap-cold" data-tap="coldTap" class="fb" style="cursor:pointer">
        <circle r="24" fill="#000" fill-opacity="0" pointer-events="all"/>
        <rect x="-4" y="2" width="8" height="12" fill="#B0BCCB" stroke="${INK}" stroke-width="2.4"/>
        <circle cx="0" cy="-2" r="12" fill="${SKY}" ${S}/>
        <text x="0" y="2.5" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="11.5" fill="#fff">C</text>
      </g></g>
    </g>

    <!-- utensil crock on far-left counter (holds wooden spoon) -->
    <g id="l13-crock" data-tap="crock" transform="translate(36,396)">
      <path d="M-16,-14 H16 L13,20 H-13 Z" fill="${SKY}" ${S}/>
      <rect x="-18" y="-18" width="36" height="7" rx="3" fill="#fff" stroke="${INK}" stroke-width="2.4"/>
    </g>

    <!-- ============ FOREGROUND DRAGGABLES (outer translate + inner .fb!) ============ -->
    <!-- wooden spoon decoy -->
    <g id="l13-spoon" class="grabbable" transform="translate(${SPOON0.x},${SPOON0.y})" style="cursor:grab">
      <g id="l13-spoon-in" class="fb">${spoonSVG()}</g>
    </g>

    <!-- oven mitt decoy -->
    <g id="l13-mitt" class="grabbable" transform="translate(${MITT0.x},${MITT0.y})" style="cursor:grab">
      <g id="l13-mitt-in" class="fb">${mittSVG()}</g>
    </g>

    <!-- THE STUBBORN PICKLE JAR -->
    <g id="l13-jar" transform="translate(${JAR0.x},${JAR0.y})">
      <g id="l13-jar-in" class="fb">${jarArtSVG()}</g>
    </g>

    <!-- FX & speech bubble layers -->
    <g id="l13-fx" pointer-events="none"></g>
    <g id="l13-talk" pointer-events="none"></g>
  </g>
</svg>`;
  }

  Object.assign(ART.stickers, {
    l13twist: (uid = 'a') => ART.stickerFrame('#7FF0BD',
      `<g transform="translate(0,12) scale(.62)">
        <rect x="-38" y="-30" width="76" height="78" rx="14" fill="#B6F0C5" stroke="${INK}" stroke-width="4.5"/>
        ${pickle(-14, 12, -10)}${pickle(14, 14, 12)}
        <g transform="translate(14,-56) rotate(22)"><rect x="-32" y="-10" width="64" height="18" rx="6" fill="${RED}" stroke="${INK}" stroke-width="4"/></g>
      </g>` +
      `<path d="M-38,-22 A36,36 0 0,1 18,-36" fill="none" stroke="#fff" stroke-width="4.5" ${W}/>`, 'l13tw' + uid),
    l13teeth: (uid = 'a') => ART.stickerFrame('#FFD66B',
      ART.noodle({ x: -12, y: 14, scale: .62, eyes: 'squint', mouth: 'chatter', armType: 'hold' }) +
      `<g transform="translate(24,-14) rotate(28) scale(.55)"><rect x="-32" y="-10" width="64" height="18" rx="6" fill="${RED}" stroke="${INK}" stroke-width="4.5"/></g>`, 'l13th' + uid),
    l13hot: (uid = 'a') => ART.stickerFrame('#FF8FB1',
      `<path d="M-30,-42 q-8,12 0,24 M0,-46 q8,12 0,24 M30,-42 q-8,12 0,24" fill="none" stroke="#fff" stroke-width="4.5" ${W}/>` +
      `<g transform="translate(0,18) scale(.58)">
        <rect x="-38" y="-30" width="76" height="78" rx="14" fill="#B6F0C5" stroke="${INK}" stroke-width="4.5"/>
        ${pickle(0, 10, 4)}
        <g transform="translate(0,-66) rotate(-14)"><rect x="-32" y="-10" width="64" height="18" rx="6" fill="${ORANGE}" stroke="${INK}" stroke-width="4.5"/></g>
      </g>`, 'l13ht' + uid),
  });

  const L = {
    id: 13,
    promptHTML: 'Open the <span class="pw" id="pw-jar">jar</span>!',
    endings: [
      { id: 'twist', name: 'Lefty Loosey', line: 'Two fingers and a tiny bit of physics.', rarity: 50, icon: 'l13twist', stamp: 'POPPED!' },
      { id: 'teeth', name: 'Noodle Jaws', line: 'Dentists hate this one weird trick.', rarity: 26, icon: 'l13teeth', stamp: 'CHOMP!' },
      { id: 'hotwater', name: 'Hot Water Trick', line: 'Grandma’s thermal expansion never misses.', rarity: 18, icon: 'l13hot', stamp: 'STEAM POP!' },
    ],
    hints(found) {
      if (!found.includes('twist')) return [
        { text: 'One finger cannot get enough grip on that stubborn metal lid.' },
        { text: 'Put TWO fingers on the red lid and twist counter-clockwise! (Desktop: scroll wheel UP on the lid.)', demo: 'twistLid' },
      ];
      if (!found.includes('teeth')) return [
        { text: 'Noodle really wants those pickles… maybe hand him the whole jar?' },
        { text: 'Drag the pickle jar body directly over to Noodle!', demo: 'toNoodle' },
      ];
      if (!found.includes('hotwater')) return [
        { text: 'Remember Grandma’s trick for stuck metal lids? Heat makes metal expand!' },
        { text: 'Turn on the RED hot tap (H) and hold the pickle jar under the steaming water!', demo: 'toSink' },
      ];
      return [{ text: 'All three endings found! Pickle feast!' }];
    },
    demo(kind) {
      if (kind === 'twistLid') return [{ x: JAR0.x + 26, y: JAR0.y - 44 }, { x: JAR0.x, y: JAR0.y - 58 }, { x: JAR0.x - 26, y: JAR0.y - 44 }];
      if (kind === 'toNoodle') return [{ x: JAR0.x, y: JAR0.y }, { x: ND0.x, y: ND0.y }];
      if (kind === 'toSink') return [{ x: JAR0.x, y: JAR0.y }, { x: SINK_SPOT.x, y: SINK_SPOT.y }];
      return null;
    },
    build,
  };

  function build(ctx) {
    ctx.root.innerHTML = sceneSVG();
    const svg = ctx.root.querySelector('svg');
    const q = (s) => svg.querySelector(s);

    const ndAnim = q('#l13-nd-anim'), ndFace = q('#l13-nd-face'), ndArms = q('#l13-nd-arms');
    const jarEl = q('#l13-jar'), jarIn = q('#l13-jar-in'), jarBody = q('#l13-jar-body');
    const lidWrap = q('#l13-lid-wrap'), lidEl = q('#l13-lid'), lidCap = q('#l13-lid-cap'), lidRidges = q('#l13-lid-ridges');
    const streamHot = q('#l13-stream-hot'), hotSteam = q('#l13-hot-steam'), streamCold = q('#l13-stream-cold');
    const spoonEl = q('#l13-spoon'), spoonIn = q('#l13-spoon-in');
    const mittEl = q('#l13-mitt'), mittIn = q('#l13-mitt-in');
    const fx = q('#l13-fx'), talkLayer = q('#l13-talk');

    const st = {
      done: false,
      jarPos: { ...JAR0 },
      inSink: false,
      holdingJar: false,
      twistProg: 0,       // 0..1 counter-clockwise unscrew progress
      hotOn: false,
      coldOn: false,
      holdingSpoon: false,
      holdingMitt: false,
      lastCreakAt: 0,
      lastIdle: performance.now(),
    };

    const alive = () => ctx.alive;
    const setFace = (o) => { ndFace.innerHTML = ART.noodleFace(o); };
    const setArms = (t) => { ndArms.innerHTML = ART.noodleArms(t, YELLOW); };
    const talk = (text, ms = 1900) => ctx.talk(talkLayer, ND0.x, ND0.y - 68, text, ms);

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

    function renderLidTwist() {
      const lift = st.twistProg * 11;
      const shift = (st.twistProg * 28) % 11;
      lidWrap.setAttribute('transform', `translate(0,${(-42 - lift).toFixed(1)})`);
      lidRidges.setAttribute('transform', `translate(${(-shift).toFixed(1)},0)`);
    }

    function renderStreams() {
      streamHot.setAttribute('opacity', st.hotOn ? '1' : '0');
      streamCold.setAttribute('opacity', st.coldOn ? '1' : '0');
    }

    /* ---------- SHARED LID-POP FINALE ---------- */
    async function popLidAndWin(endingId, talkLine, narrLine, dir = 1) {
      A.play('pop'); A.play('boing'); U.haptic([24, 38, 22]);
      pop(st.jarPos.x, st.jarPos.y - 74, 'POP!!', MINT, 24);
      // Lid launches dramatically off the jar!
      await U.tween(540, (t) => {
        if (!alive()) return;
        const lx = dir * t * 92;
        const ly = -52 - Math.sin(t * Math.PI) * 110 + t * 34;
        lidWrap.setAttribute('transform', `translate(${lx.toFixed(1)},${ly.toFixed(1)}) rotate(${(dir * t * 240).toFixed(0)})`);
      }, U.ease.outCubic);
      if (!alive()) return;

      setFace({ eyes: 'happy', mouth: 'grin' });
      setArms('up');
      U.replay(ndAnim, 'hop');
      talk(talkLine, 2200);
      ctx.say(narrLine);
      await U.wait(820);
      if (alive()) ctx.win(endingId);
    }

    /* ---------- ENDING 1 (MAIN): TWO-FINGER TWIST ---------- */
    function winTwist() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      popLidAndWin('twist', 'YES!! PICKLE TIME!!', 'Two fingers and a tiny bit of physics.', 1);
    }

    /* ---------- ENDING 2 (SECRET #1): NOODLE BITES IT OPEN! ---------- */
    async function winTeeth() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      st.holdingJar = false;
      const from = { ...st.jarPos };
      const bitePos = { x: ND0.x + 28, y: ND0.y + 42 };
      await U.tween(220, (t) => {
        if (!alive()) return;
        st.jarPos = { x: U.lerp(from.x, bitePos.x, t), y: U.lerp(from.y, bitePos.y, t) };
        jarEl.setAttribute('transform', `translate(${st.jarPos.x.toFixed(1)},${st.jarPos.y.toFixed(1)}) rotate(${(-18 * t).toFixed(1)})`);
      }, U.ease.outCubic);
      if (!alive()) return;

      setFace({ eyes: 'squint', mouth: 'chatter' });
      setArms('hold');
      talk('STAND BACK. I HAVE TEETH.', 1200);
      A.play('crunch'); U.haptic([20, 25, 20, 25]);
      // Comical head-shake wrestling the metal lid!
      await U.tween(540, (t) => {
        if (!alive()) return;
        const sh = Math.sin(t * Math.PI * 10) * 6;
        jarEl.setAttribute('transform', `translate(${(bitePos.x + sh).toFixed(1)},${bitePos.y.toFixed(1)}) rotate(${(-18 + sh).toFixed(1)})`);
      });
      if (!alive()) return;
      jarEl.setAttribute('transform', `translate(${bitePos.x},${bitePos.y}) rotate(-12)`);
      await popLidAndWin('teeth', 'OW!! TOTALLY WORTH IT!!', 'Dentists hate this one weird trick.', 1);
    }

    /* ---------- ENDING 3 (SECRET #2): HOT WATER TRICK! ---------- */
    async function winHotWater() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      st.holdingJar = false;
      const from = { ...st.jarPos };
      const under = { x: 308, y: 392 };
      await U.tween(220, (t) => {
        if (!alive()) return;
        st.jarPos = { x: U.lerp(from.x, under.x, t), y: U.lerp(from.y, under.y, t) };
        jarEl.setAttribute('transform', `translate(${st.jarPos.x.toFixed(1)},${st.jarPos.y.toFixed(1)})`);
      }, U.ease.outCubic);
      if (!alive()) return;

      A.play('pour', 0.6); A.play('shhh');
      pop(under.x, under.y - 78, 'STEAMING!', ORANGE, 18);
      // Heat expands the metal lid before popping!
      await U.tween(740, (t) => {
        if (!alive()) return;
        lidCap.setAttribute('fill', U.lerpColor(RED, ORANGE, t));
        lidEl.setAttribute('transform', `scale(${(1 + t * 0.14).toFixed(3)},${(1 + t * 0.08).toFixed(3)})`);
      }, U.ease.inOutCubic);
      if (!alive()) return;
      lidEl.setAttribute('transform', '');
      await popLidAndWin('hotwater', 'SCIENCE!! THERMAL EXPANSION!!', 'Grandma’s thermal expansion never misses.', -1);
    }

    function checkSinkReaction() {
      if (st.done || ctx.locked || !st.inSink) return;
      if (st.hotOn) {
        winHotWater();
      } else if (st.coldOn) {
        A.play('brrr'); U.haptic(14);
        U.replay(lidEl, 'wiggle');
        pop(SINK_SPOT.x, SINK_SPOT.y - 74, 'SHRUNK!', SKY, 17);
        talk('Cold water shrinks metal! Wrong tap!');
        ctx.say('Cold water shrinks metal — that made the lid even tighter!');
      }
    }

    /* ---------- DRAG: JAR BODY (Move whole jar to Noodle OR Sink!) ---------- */
    I.drag(jarBody, svg, {
      onStart() {
        if (ctx.locked || st.done || fingers.size >= 2) return;
        st.holdingJar = true;
        A.play('tap'); ctx.attempt();
      },
      onMove(p) {
        if (!st.holdingJar || ctx.locked || st.done || fingers.size >= 2) return;
        const x = U.clamp(p.x, 42, 348), y = U.clamp(p.y, 120, 412);
        st.jarPos = { x, y };
        jarEl.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
        if (Math.hypot(x - ND0.x, y - ND0.y) < 62) {
          winTeeth();
          return;
        }
        if (st.hotOn && Math.hypot(x - 308, y - 386) < 48) {
          st.inSink = true;
          winHotWater();
        }
      },
      onTap() {
        st.holdingJar = false;
        if (ctx.locked || st.done) return;
        A.play('clink'); U.replay(jarIn, 'wiggle');
        ctx.say('Crisp kosher dill pickles. Trapped behind impenetrable metal.');
      },
      async onEnd() {
        if (!st.holdingJar || st.done) return;
        st.holdingJar = false;
        const x = st.jarPos.x, y = st.jarPos.y;
        // Let the player park the jar neatly in the sink!
        if (Math.hypot(x - 314, y - 392) < 62) {
          st.inSink = true;
          const dest = { x: 308, y: 392 };
          await U.tween(220, (t) => {
            if (!alive() || st.done || st.holdingJar) return;
            st.jarPos = { x: U.lerp(x, dest.x, t), y: U.lerp(y, dest.y, t) };
            jarEl.setAttribute('transform', `translate(${st.jarPos.x.toFixed(1)},${st.jarPos.y.toFixed(1)})`);
          }, U.ease.outBack);
          A.play('thud');
          if (!st.hotOn && !st.coldOn) ctx.say('Jar is in the sink. Which tap loosens a metal lid?');
          else checkSinkReaction();
          return;
        }
        // Otherwise return to counter spot
        st.inSink = false;
        await U.tween(260, (t) => {
          if (!alive() || st.done || st.holdingJar) return;
          st.jarPos = { x: U.lerp(x, JAR0.x, t), y: U.lerp(y, JAR0.y, t) };
          jarEl.setAttribute('transform', `translate(${st.jarPos.x.toFixed(1)},${st.jarPos.y.toFixed(1)})`);
        }, U.ease.outBack);
        A.play('thud');
      },
    });

    /* ---------- DRAG: JAR LID with 1 finger = DECOY ("Too tight!") ---------- */
    I.drag(lidEl, svg, {
      onStart() {
        if (ctx.locked || st.done || fingers.size >= 2) return;
        ctx.attempt();
      },
      onMove(p, d) {
        if (ctx.locked || st.done || fingers.size >= 2) return;
        const now = performance.now();
        if (Math.hypot(d.dx, d.dy) > 16 && now - st.lastCreakAt > 800) {
          st.lastCreakAt = now;
          A.play('creak'); U.haptic(12);
          U.replay(lidEl, 'wiggle');
          pop(st.jarPos.x, st.jarPos.y - 68, 'TOO TIGHT!', RED, 16);
          ctx.say('One finger cannot twist it — try gripping with two fingers!');
        }
      },
      onTap() {
        if (ctx.locked || st.done || fingers.size >= 2) return;
        A.play('clink'); U.replay(lidEl, 'wiggle');
        pop(st.jarPos.x, st.jarPos.y - 68, 'CLINK!', SKY, 15);
        ctx.say('Tapping the lid only makes a nice clink sound.');
      },
      onEnd() {},
    });

    /* ---------- TWO-FINGER TWIST ON JAR LID (Main Ending!) + Desktop Wheel Fallback ---------- */
    const fingers = new Map();
    let prevAngle = null;
    function applyTwistDelta(deltaCCW) {
      if (st.done || ctx.locked) return;
      if (deltaCCW < -0.18) {
        const now = performance.now();
        if (now - st.lastCreakAt > 650) {
          st.lastCreakAt = now;
          A.play('creak'); U.replay(lidEl, 'wiggle');
          pop(st.jarPos.x, st.jarPos.y - 70, 'WRONG WAY!', ORANGE, 16);
          ctx.say('Lefty-loosey! Twist counter-clockwise!');
        }
        st.twistProg = Math.max(0, st.twistProg - 0.08);
        renderLidTwist();
        return;
      }
      if (deltaCCW > 0) {
        const prevTick = Math.floor(st.twistProg * 5);
        st.twistProg = U.clamp(st.twistProg + deltaCCW, 0, 1);
        renderLidTwist();
        if (Math.floor(st.twistProg * 5) > prevTick) { A.play('creak'); U.haptic(10); }
        if (st.twistProg >= 0.98) winTwist();
      }
    }

    const onPtrDown = (e) => {
      if (ctx.locked || st.done) return;
      const pt = U.svgPoint(svg, e.clientX, e.clientY);
      if (Math.hypot(pt.x - st.jarPos.x, pt.y - (st.jarPos.y - 18)) > 95) return;
      fingers.set(e.pointerId, pt);
      if (fingers.size === 2) {
        st.holdingJar = false;
        const [a, b] = [...fingers.values()];
        prevAngle = Math.atan2(b.y - a.y, b.x - a.x);
      }
    };
    const onPtrMove = (e) => {
      if (prevAngle === null || ctx.locked || st.done || !fingers.has(e.pointerId)) return;
      fingers.set(e.pointerId, U.svgPoint(svg, e.clientX, e.clientY));
      if (fingers.size !== 2) return;
      const [a, b] = [...fingers.values()];
      const aNow = Math.atan2(b.y - a.y, b.x - a.x);
      let da = aNow - prevAngle;
      while (da > Math.PI) da -= Math.PI * 2;
      while (da < -Math.PI) da += Math.PI * 2;
      prevAngle = aNow;
      // In SVG coords (+X right, +Y down), counter-clockwise is negative da!
      applyTwistDelta(-da / 1.05);
    };
    const onPtrUp = (e) => { fingers.delete(e.pointerId); if (fingers.size < 2) prevAngle = null; };

    /* Desktop fallback: scroll UP/LEFT over the jar unscrews the lid counter-clockwise! */
    const onWheel = (e) => {
      if (ctx.locked || st.done) return;
      const pt = U.svgPoint(svg, e.clientX, e.clientY);
      if (Math.hypot(pt.x - st.jarPos.x, pt.y - (st.jarPos.y - 20)) > 84) return;
      e.preventDefault();
      const ccw = (e.deltaY < 0 || e.deltaX < 0) ? 0.22 : -0.22;
      applyTwistDelta(ccw);
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

    /* ---------- DECOY: WOODEN SPOON (bangs on lid!) ---------- */
    I.drag(spoonEl, svg, {
      onStart() { if (!ctx.locked && !st.done) { st.holdingSpoon = true; A.play('tap'); ctx.attempt(); } },
      onMove(p) {
        if (!st.holdingSpoon || ctx.locked || st.done) return;
        spoonEl.setAttribute('transform', `translate(${U.clamp(p.x, 24, 366).toFixed(1)},${U.clamp(p.y, 44, 520).toFixed(1)})`);
      },
      onTap() {
        st.holdingSpoon = false;
        if (ctx.locked || st.done) return;
        spoonEl.setAttribute('transform', `translate(${SPOON0.x},${SPOON0.y})`);
        A.play('thud'); U.replay(spoonIn, 'wiggle');
        ctx.say('Wooden spoon. Famous for noisy, unsuccessful jar-tapping.');
      },
      async onEnd(p) {
        if (!st.holdingSpoon || st.done) return;
        st.holdingSpoon = false;
        const x = U.clamp(p.x, 24, 366), y = U.clamp(p.y, 44, 520);
        if (Math.hypot(x - st.jarPos.x, y - (st.jarPos.y - 36)) < 68) {
          A.play('clink'); U.replay(lidEl, 'wiggle');
          pop(st.jarPos.x, st.jarPos.y - 72, 'BONK! CLINK!', YELLOW, 16);
          talk('Woke the whole street. Lid didn’t move.');
          ctx.say('Great rhythm! Zero unscrewing.');
        }
        await U.tween(260, (t) => {
          if (!alive() || st.done || st.holdingSpoon) return;
          spoonEl.setAttribute('transform', `translate(${U.lerp(x, SPOON0.x, t).toFixed(1)},${U.lerp(y, SPOON0.y, t).toFixed(1)})`);
        }, U.ease.outBack);
      },
    });

    /* ---------- DECOY: OVEN MITT (slips off lid!) ---------- */
    I.drag(mittEl, svg, {
      onStart() { if (!ctx.locked && !st.done) { st.holdingMitt = true; A.play('swish'); ctx.attempt(); } },
      onMove(p) {
        if (!st.holdingMitt || ctx.locked || st.done) return;
        mittEl.setAttribute('transform', `translate(${U.clamp(p.x, 24, 366).toFixed(1)},${U.clamp(p.y, 44, 520).toFixed(1)})`);
      },
      onTap() {
        st.holdingMitt = false;
        if (ctx.locked || st.done) return;
        mittEl.setAttribute('transform', `translate(${MITT0.x},${MITT0.y})`);
        A.play('swish'); U.replay(mittIn, 'wiggle');
        ctx.say('Padded oven mitt. Extra cozy, questionable grip.');
      },
      async onEnd(p) {
        if (!st.holdingMitt || st.done) return;
        st.holdingMitt = false;
        const x = U.clamp(p.x, 24, 366), y = U.clamp(p.y, 44, 520);
        if (Math.hypot(x - st.jarPos.x, y - (st.jarPos.y - 36)) < 68) {
          A.play('squeak'); U.replay(lidEl, 'wiggle');
          pop(st.jarPos.x, st.jarPos.y - 72, 'SLIP!', PINK, 16);
          ctx.say('Too fluffy! It just slid right off the lid.');
        }
        await U.tween(260, (t) => {
          if (!alive() || st.done || st.holdingMitt) return;
          mittEl.setAttribute('transform', `translate(${U.lerp(x, MITT0.x, t).toFixed(1)},${U.lerp(y, MITT0.y, t).toFixed(1)})`);
        }, U.ease.outBack);
      },
    });

    /* ---------- ANIMATION LOOP (steam + idle comedy) ---------- */
    (function loop(now) {
      if (!alive()) return;
      if (st.hotOn) {
        hotSteam.setAttribute('transform', `translate(${(Math.sin(now / 240) * 2).toFixed(1)},${((-(now / 35) % 14)).toFixed(1)})`);
      }
      if (!st.done && now - st.lastIdle > 11000) {
        st.lastIdle = now;
        ctx.say(U.pick([
          'Whoever tightened this jar at the factory is a supervillain.',
          'Just one crunchy pickle. Is that too much to ask?',
          'Sealed tighter than a submarine hatch.',
        ]));
      }
      requestAnimationFrame(loop);
    })(performance.now());
    svg.addEventListener('pointerdown', () => { st.lastIdle = performance.now(); });

    /* ---------- TAP REACTIONS (all inner .fb, zero jump-to-(0,0)!) ---------- */
    const taps = {
      hotTap(node) {
        ctx.attempt(); A.play('click'); U.replay(node, 'wiggle');
        st.hotOn = !st.hotOn;
        if (st.hotOn) { st.coldOn = false; A.play('pour', 0.5); }
        renderStreams();
        if (st.hotOn && st.inSink) { checkSinkReaction(); return; }
        ctx.say(st.hotOn ? 'Steaming hot water! Metal lids hate heat…' : 'Hot tap off.');
      },
      coldTap(node) {
        ctx.attempt(); A.play('click'); U.replay(node, 'wiggle');
        st.coldOn = !st.coldOn;
        if (st.coldOn) { st.hotOn = false; A.play('pour', 0.2); }
        renderStreams();
        if (st.coldOn && st.inSink) { checkSinkReaction(); return; }
        ctx.say(st.coldOn ? 'Ice-cold tap running.' : 'Cold tap off.');
      },
      noodle() {
        ctx.attempt(); A.play('squeak'); U.replay(ndAnim, 'hop');
        talk(U.pick(['I NEED a pickle!!', 'My noodle arms aren’t strong enough!', 'Hand it over—I’ll use my teeth!']));
        ctx.say('Noodle has strong opinions about pickles and very noodly arms.');
      },
      sign(node) { ctx.attempt(); A.play('tap'); U.replay(node, 'wiggle'); ctx.say('“PICKLE LOVER · EST. 2026.” Committed.'); },
      timer(node) { ctx.attempt(); A.play('clink'); U.replay(node, 'wiggle'); ctx.say('Kitchen timer. Zero help with vacuum seals.'); },
      basil(node) { ctx.attempt(); A.play('chirp'); U.replay(node, 'hop'); ctx.say('Fresh basil. Smells great, cannot open jars.'); },
      spice(node) { ctx.attempt(); A.play('shakeSalt'); U.replay(node, 'wiggle'); ctx.say('Those tiny lids open effortlessly. Pure mockery.'); },
      crock() { ctx.attempt(); A.play('clink'); ctx.say('Utensil crock.'); },
      cabinets() { ctx.attempt(); A.play('thud'); ctx.say('Locked kitchen cabinets. No jar opener inside.'); },
      counter() { ctx.attempt(); A.play('tap'); ctx.say('Smooth marble counter.'); },
      wall() { ctx.attempt(); A.play('tap'); ctx.say('Clean subway tiles.'); },
    };
    I.taps(svg, (name, node) => { if (ctx.locked || st.done) return; if (taps[name]) taps[name](node); });

    const onPromptClick = (e) => {
      if (ctx.locked || st.done) return;
      if (e.target.id === 'pw-jar') {
        U.replay(e.target, 'wiggle'); A.play('clink');
        ctx.say('Even the word “jar” is sealed shut.');
      }
    };
    ctx.promptEl.addEventListener('click', onPromptClick);
    ctx.onCleanup(() => ctx.promptEl.removeEventListener('click', onPromptClick));
  }

  BF.levels = BF.levels || {};
  BF.levels[13] = L;
})(window.BF);
