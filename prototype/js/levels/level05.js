/* Brainflip — Level 5 (per GDD v0.1): "Get the cookie jar!"
   Main ending : turn the phone upside down — gravity flips and the jar + Noodle meet at the ceiling!
                 (desktop / no-sensor fallback: drag or double-tap the "THIS SIDE UP ↑" sign upside down, or dev key U)  (verb: upside-down flip)
   Secret #1   : stack the 3 heavy books under the shelf so Noodle climbs up to grab the jar  (verb: stack / drag)
   Secret #2   : unscrew both bolts holding up the high wall shelf so it collapses right into Noodle's arms  (verb: inspect / tap)
   Decoys: Noodle jumping futilely, bolted kitchen counter, kitchen clock, mouse hole, height chart. */
(function (BF) {
  'use strict';
  const U = BF.U, A = BF.audio, I = BF.input, ART = BF.art;
  const INK = '#1B1B2F', YELLOW = '#FFC93C', PINK = '#FF5D8F', MINT = '#3DDC97', SKY = '#5BC0EB';
  const W = 'stroke-linecap="round" stroke-linejoin="round"';
  const S = `stroke="${INK}" stroke-width="3.4" ${W}`;

  const ND0 = { x: 195, y: 416 };
  const SHELF_Y = 194;
  const JAR0 = { x: 198, y: 146 };
  const SCREW_L = { x: 146, y: 214 };
  const SCREW_R = { x: 250, y: 214 };
  const SIGN_NAIL = { x: 328, y: 146 };
  const STACK_X = 198;
  const STACK_BASE = 488;

  const BOOKS = [
    { id: 0, x0: 76, y0: 518, w: 96, h: 34, fill: SKY, spine: '#3AA6D4', title: 'BIG BOOK', pages: '#FFF9EC' },
    { id: 1, x0: 330, y0: 398, w: 88, h: 32, fill: PINK, spine: '#E04274', title: 'COOKBOOK', pages: '#FFF9EC' },
    { id: 2, x0: 312, y0: 518, w: 94, h: 30, fill: MINT, spine: '#28BA7B', title: 'GRAVITY 101', pages: '#FFF9EC' },
  ];

  function cookie(x, y, r = 11) {
    return `<g transform="translate(${x},${y})">` +
      `<circle r="${r}" fill="#E69B49" stroke="${INK}" stroke-width="2.2"/>` +
      `<circle cx="${-r * 0.35}" cy="${-r * 0.2}" r="2" fill="#4E2A14"/>` +
      `<circle cx="${r * 0.3}" cy="${-r * 0.3}" r="1.8" fill="#4E2A14"/>` +
      `<circle cx="${r * 0.1}" cy="${r * 0.35}" r="2.1" fill="#4E2A14"/>` +
      `<circle cx="${-r * 0.25}" cy="${r * 0.3}" r="1.6" fill="#4E2A14"/></g>`;
  }

  function jarSVG() {
    return `
      <!-- domed lid + knob -->
      <circle cx="0" cy="-55" r="8.5" fill="${PINK}" ${S}/>
      <rect x="-26" y="-48" width="52" height="14" rx="6" fill="${PINK}" ${S}/>
      <!-- glass jar body -->
      <rect x="-34" y="-34" width="68" height="72" rx="16" fill="#E6F8FF" ${S}/>
      <!-- pile of chocolate-chip cookies inside -->
      ${cookie(-14, 18, 12)}${cookie(13, 20, 12)}${cookie(0, 12, 12.5)}
      ${cookie(-15, -2, 11.5)}${cookie(14, -4, 11.5)}${cookie(0, -14, 11.5)}
      <!-- glass reflection -->
      <path d="M-24,-22 V24" stroke="#fff" stroke-width="5.5" opacity=".72" stroke-linecap="round"/>
      <!-- COOKIES label -->
      <rect x="-27" y="-8" width="54" height="22" rx="6" fill="#FFF4E0" stroke="${INK}" stroke-width="2.4"/>
      <text x="0" y="7" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="11.5" letter-spacing=".4" fill="${INK}">COOKIES</text>
      <!-- jar outline polish -->
      <rect x="-34" y="-34" width="68" height="72" rx="16" fill="none" ${S}/>`;
  }

  function bookSVG(b) {
    const hw = b.w / 2, hh = b.h / 2;
    return `
      <rect x="${-hw}" y="${-hh}" width="${b.w}" height="${b.h}" rx="5" fill="${b.fill}" ${S}/>
      <rect x="${-hw}" y="${-hh}" width="14" height="${b.h}" rx="4" fill="${b.spine}" stroke="${INK}" stroke-width="2.8"/>
      <rect x="${hw - 10}" y="${-hh + 4}" width="8" height="${b.h - 8}" rx="2" fill="${b.pages}" stroke="${INK}" stroke-width="2"/>
      <text x="2" y="4" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="9.8" fill="#fff" stroke="${INK}" stroke-width="2.2" paint-order="stroke">${b.title}</text>`;
  }

  function screwSVG() {
    return `<circle r="28" fill="#000" fill-opacity="0" pointer-events="all"/>` +
      `<circle r="9.5" fill="#D4DCE6" stroke="${INK}" stroke-width="2.8"/>` +
      `<circle cx="-2" cy="-2" r="3" fill="#fff" opacity=".65"/>` +
      `<path d="M-5.5,-5.5 L5.5,5.5" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>`;
  }

  function sceneSVG() {
    return `
<svg viewBox="0 0 390 630" xmlns="http://www.w3.org/2000/svg" aria-label="Noodle trying to reach a cookie jar on a very high shelf">
  <defs>
    <pattern id="l5-wallp" width="34" height="34" patternUnits="userSpaceOnUse">
      <path d="M17,12 L21,17 L17,22 L13,17 Z" fill="#F2DEB8"/>
    </pattern>
    <clipPath id="l5-mouseclip"><path d="M-16,14 V-4 A16,16 0 0,1 16,-4 V14 Z"/></clipPath>
  </defs>

  <g id="l5-room">
    <!-- warm kitchen wall + wood floor -->
    <rect data-tap="wall" x="-30" y="-200" width="450" height="690" fill="#FFF3D6"/>
    <rect x="-30" y="-200" width="450" height="690" fill="url(#l5-wallp)" pointer-events="none"/>
    <rect data-tap="floor" x="-30" y="490" width="450" height="520" fill="#E8A86C"/>
    <path d="M-30,536 H420 M-30,582 H420 M-30,628 H420 M-30,674 H420 M80,490 V536 M225,536 V582 M130,582 V628 M305,490 V536" stroke="#C77D4A" stroke-width="2.6" pointer-events="none"/>
    <rect x="-30" y="484" width="450" height="12" fill="#fff" ${S}/>

    <!-- kitchen rug -->
    <g data-tap="rug">
      <ellipse cx="195" cy="548" rx="142" ry="26" fill="#FF8FB1" ${S}/>
      <ellipse cx="195" cy="548" rx="120" ry="17" fill="none" stroke="#FFF4E0" stroke-width="3.2" stroke-dasharray="8 8"/>
    </g>

    <!-- wall height ruler marks (emphasizes how high the shelf is!) -->
    <g data-tap="ruler" opacity=".68">
      <path d="M108,196 V478 M102,196 H114 M104,242 H112 M102,288 H114 M104,334 H112 M102,380 H114 M104,426 H112" fill="none" stroke="#B68E65" stroke-width="2.6" stroke-linecap="round"/>
      <text x="98" y="200" text-anchor="end" font-family="Fredoka, sans-serif" font-weight="700" font-size="11" fill="#8C6744">6ft</text>
      <text x="98" y="292" text-anchor="end" font-family="Fredoka, sans-serif" font-weight="700" font-size="11" fill="#8C6744">4ft</text>
      <text x="98" y="384" text-anchor="end" font-family="Fredoka, sans-serif" font-weight="700" font-size="11" fill="#8C6744">2ft</text>
    </g>

    <!-- kitchen wall clock (top-left decoy) -->
    <g transform="translate(58,92)"><g data-tap="clock" class="fb">
      <circle r="32" fill="${PINK}" ${S}/>
      <circle r="24" fill="#fff" stroke="${INK}" stroke-width="2.8"/>
      <circle cx="0" cy="-18" r="2" fill="${INK}"/><circle cx="18" cy="0" r="2" fill="${INK}"/>
      <circle cx="0" cy="18" r="2" fill="${INK}"/><circle cx="-18" cy="0" r="2" fill="${INK}"/>
      <g id="l5-clock-h"><path d="M0,0 V-13" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/></g>
      <g id="l5-clock-m"><path d="M0,0 L11,6" stroke="${PINK}" stroke-width="2.8" stroke-linecap="round"/></g>
      <circle r="3.4" fill="${INK}"/>
    </g></g>

    <!-- diegetic "THIS SIDE UP ↑" hanging sign (hint on phones, rotatable gravity flip on desktop/no-sensor!) -->
    <g id="l5-upsign-pivot" transform="translate(${SIGN_NAIL.x},${SIGN_NAIL.y})">
      <g id="l5-upsign" transform="rotate(0)">
        <circle cy="34" r="44" fill="#000" fill-opacity="0" pointer-events="all"/>
        <path d="M-16,14 L0,0 L16,14" fill="none" stroke="${INK}" stroke-width="2.6" ${W}/>
        <rect x="-34" y="14" width="68" height="58" rx="9" fill="${YELLOW}" ${S}/>
        <path d="M0,24 V44 M-10,34 L0,23 L10,34" fill="none" stroke="${INK}" stroke-width="4.4" ${W}/>
        <text x="0" y="61" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="10.5" fill="${INK}">THIS SIDE UP</text>
      </g>
      <circle r="4.5" fill="#9AA3B2" stroke="${INK}" stroke-width="2.4" pointer-events="none"/>
    </g>

    <!-- tiny mouse hole in lower-left baseboard (comedy decoy) -->
    <g transform="translate(36,482)" data-tap="mousehole">
      <circle r="24" fill="#000" fill-opacity="0" pointer-events="all"/>
      <path d="M-14,12 V-2 A14,14 0 0,1 14,-2 V12 Z" fill="#2B2D6E" stroke="${INK}" stroke-width="3"/>
      <g clip-path="url(#l5-mouseclip)">
        <g id="l5-mouse" transform="translate(0,22)">
          <circle cx="-7" cy="-6" r="5" fill="#B8C0CC" stroke="${INK}" stroke-width="2"/>
          <circle cx="7" cy="-6" r="5" fill="#B8C0CC" stroke="${INK}" stroke-width="2"/>
          <circle cx="0" cy="0" r="8" fill="#C9D1DC" stroke="${INK}" stroke-width="2"/>
          <circle cx="-2.8" cy="-1" r="1.4" fill="${INK}"/><circle cx="2.8" cy="-1" r="1.4" fill="${INK}"/>
          <circle cx="0" cy="2" r="2" fill="${PINK}"/>
        </g>
      </g>
    </g>

    <!-- bolted kitchen side cabinet (right) -->
    <g data-tap="cabinet">
      <rect x="288" y="422" width="84" height="68" rx="4" fill="#E89A5E" ${S}/>
      <rect x="298" y="434" width="64" height="44" rx="4" fill="#F2B07A" stroke="${INK}" stroke-width="2.4"/>
      <circle cx="330" cy="456" r="4" fill="#fff" stroke="${INK}" stroke-width="2.4"/>
      <rect x="282" y="414" width="96" height="12" rx="4" fill="#C77D4A" ${S}/>
    </g>

    <!-- HIGH WALL SHELF + L-brackets (tilts when 1 screw removed, crashes when both removed!) -->
    <g id="l5-shelf-wrap" transform="translate(198,${SHELF_Y})">
      <g id="l5-shelf-inner">
        <!-- left & right metal L-brackets -->
        <path d="M-60,4 H-44 V34 H-60 Z M44,4 H60 V34 H44 Z" fill="#9AA3B2" ${S}/>
        <!-- wooden plank -->
        <rect x="-78" y="-12" width="156" height="18" rx="5" fill="#C77D4A" ${S}/>
        <rect x="-74" y="-10" width="148" height="6" rx="3" fill="#E89A5E"/>
      </g>
    </g>
    <!-- Two unscrewable screws holding up the shelf! -->
    <g id="l5-screw-l" transform="translate(${SCREW_L.x},${SCREW_L.y})" data-tap="screwL"><g class="fb">${screwSVG()}</g></g>
    <g id="l5-screw-r" transform="translate(${SCREW_R.x},${SCREW_R.y})" data-tap="screwR"><g class="fb">${screwSVG()}</g></g>

    <!-- THE COOKIE JAR (high up on the shelf!) -->
    <g id="l5-jar" transform="translate(${JAR0.x},${JAR0.y})"><g id="l5-jar-in" class="fb">
      <circle r="48" fill="#000" fill-opacity="0" pointer-events="all"/>
      ${jarSVG()}
    </g></g>

    <!-- 3 draggable heavy hardcover books -->
    <g id="l5-books">
      ${BOOKS.map((b) => `<g id="l5-book-${b.id}" transform="translate(${b.x0},${b.y0})"><g class="fb"><circle r="44" fill="#000" fill-opacity="0" pointer-events="all"/>${bookSVG(b)}</g></g>`).join('')}
    </g>

    <!-- Noodle standing below, longing for cookies -->
    <g id="l5-nd" transform="translate(${ND0.x},${ND0.y})" data-tap="noodle">
      <g id="l5-nd-boil" class="boil fb">
        ${ART.noodleLegs()}${ART.noodleBody()}
        <g id="l5-nd-arms">${ART.noodleArms('shrug')}</g>
        <g transform="translate(0,-14)"><g id="l5-nd-face">${ART.noodleFace({ eyes: 'open', mouth: 'o' })}</g></g>
      </g>
    </g>

    <g id="l5-fx" pointer-events="none"></g>
    <g id="l5-talk" pointer-events="none"></g>
  </g>
</svg>`;
  }

  const L = {
    id: 5,
    promptHTML: 'Get the <span class="pw" id="pw-jar">cookie jar</span>!',
    endings: [
      { id: 'flip', name: 'Brainflip!', line: 'Upside-down cookies taste BETTER!', rarity: 54, icon: 'l5flip', stamp: 'FLIPPED!' },
      { id: 'books', name: 'Bookworm Tower', line: 'Knowledge IS delicious!', rarity: 26, icon: 'l5books', stamp: 'SMART!' },
      { id: 'shelf', name: 'Loose Shelf', line: 'Nailed it! …Well, unscrewed it!', rarity: 15, icon: 'l5shelf', stamp: 'CRASH!' },
    ],
    hints(found) {
      const sensors = I.hasMotion;
      if (!found.includes('flip')) return sensors
        ? [
          { text: 'The shelf is way too high… what if gravity went the other way?' },
          { text: 'Turn your phone completely UPSIDE DOWN!', demo: 'upside' },
        ]
        : [
          { text: 'The shelf is way too high… look at that “THIS SIDE UP” sign!' },
          { text: 'Drag (or double-tap) the “THIS SIDE UP” sign upside down! (On a phone: flip the phone upside down!)', demo: 'sign' },
        ];
      if (!found.includes('books')) return [
        { text: 'Noodle just needs to be a little taller… see anything sturdy to stand on?' },
        { text: 'Stack all 3 heavy books right under the shelf!', demo: 'books' },
      ];
      if (!found.includes('shelf')) return [
        { text: 'How is that heavy shelf even staying on the wall?' },
        { text: 'Tap both screws under the shelf to unscrew them!', demo: 'screws' },
      ];
      return [{ text: 'All endings found! Save some cookies for later.' }];
    },
    demo(kind) {
      if (kind === 'upside') return { upsideDown: true };
      if (kind === 'sign') return [{ x: SIGN_NAIL.x, y: SIGN_NAIL.y + 42 }, { x: SIGN_NAIL.x + 36, y: SIGN_NAIL.y }, { x: SIGN_NAIL.x, y: SIGN_NAIL.y - 42 }];
      if (kind === 'books') return [{ x: BOOKS[0].x0, y: BOOKS[0].y0 }, { x: STACK_X, y: 468 }];
      if (kind === 'screws') return [{ x: SCREW_L.x, y: SCREW_L.y + 52 }, { x: SCREW_L.x, y: SCREW_L.y }];
      return null;
    },
    build,
  };

  // Level 5 stickers
  Object.assign(ART.stickers, {
    l5flip: (uid = 'a') => ART.stickerFrame(SKY,
      `<path d="M-38,-22 V-4 M38,-18 V0 M-28,16 V34" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".75"/>` +
      ART.noodle({ x: -12, y: -2, rot: 180, scale: 0.56, eyes: 'happy', mouth: 'grin', armType: 'up' }) +
      `<g transform="translate(24,8) rotate(180) scale(.52)">${jarSVG()}</g>`, 'l5fl' + uid),
    l5books: (uid = 'a') => ART.stickerFrame('#FFE1B3',
      `<g transform="translate(0,34) scale(.75)">${bookSVG(BOOKS[0])}</g>` +
      `<g transform="translate(0,12) scale(.75)">${bookSVG(BOOKS[1])}</g>` +
      `<g transform="translate(0,-10) scale(.75)">${bookSVG(BOOKS[2])}</g>` +
      `<g transform="translate(0,-38) scale(.42)">${jarSVG()}</g>`, 'l5bk' + uid),
    l5shelf: (uid = 'a') => ART.stickerFrame('#FF8FB1',
      `<g transform="translate(0,16) rotate(26)"><rect x="-46" y="-8" width="92" height="14" rx="4" fill="#C77D4A" stroke="${INK}" stroke-width="3.2"/></g>` +
      `<g transform="translate(-8,-16) rotate(-18) scale(.58)">${jarSVG()}</g>` +
      `<g transform="translate(-36,28) scale(.75)">${screwSVG()}</g><g transform="translate(36,-22) scale(.75)">${screwSVG()}</g>`, 'l5sh' + uid),
  });

  function build(ctx) {
    ctx.root.innerHTML = sceneSVG();
    const svg = ctx.root.querySelector('svg');
    const $ = (id) => svg.querySelector('#l5-' + id);

    const shelfWrap = $('shelf-wrap'), screwL = $('screw-l'), screwR = $('screw-r');
    const jar = $('jar'), jarIn = $('jar-in');
    const upsign = $('upsign');
    const nd = $('nd'), ndBoil = $('nd-boil'), ndFace = $('nd-face'), ndArms = $('nd-arms');
    const mouse = $('mouse'), clockH = $('clock-h'), clockM = $('clock-m');
    const fx = $('fx'), talkLayer = $('talk');

    const bookEls = BOOKS.map((b) => $('book-' + b.id));
    const bookState = BOOKS.map((b) => ({ ...b, x: b.x0, y: b.y0, stacked: false }));

    const st = {
      done: false, jumping: false, ndX: ND0.x, ndY: ND0.y,
      stacked: [], stackTopY: STACK_BASE,
      screwLOut: false, screwROut: false, shelfTilt: 0,
      signAngle: 0, signTaps: 0, signDragging: false,
      mouseBusy: false, clockSpin: 0,
      taps: {}, lastTouch: performance.now(),
    };
    const alive = () => ctx.alive;
    const count = (k) => (st.taps[k] = (st.taps[k] || 0) + 1);
    const setFace = (eyes, mouth) => { ndFace.innerHTML = ART.noodleFace({ eyes, mouth }); };
    const setArms = (t) => { ndArms.innerHTML = ART.noodleArms(t); };
    const talk = (text, ms = 1800, ax = st.ndX, ay = st.ndY - 64) => ctx.talk(talkLayer, ax, ay, text, ms, 0.5);

    function burst(text, x, y, color = YELLOW) {
      const g = U.svgEl('g', { transform: `translate(${x},${y})` }, fx);
      const inner = U.svgEl('g', { class: 'fb popin' }, g);
      let d = '';
      for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2, r = i % 2 ? 20 : 32; d += `${i ? 'L' : 'M'}${(Math.cos(a) * r * 1.48).toFixed(1)},${(Math.sin(a) * r).toFixed(1)} `; }
      U.svgEl('path', { d: d + 'Z', fill: color, stroke: INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, inner);
      const t = U.svgEl('text', { y: 6, 'text-anchor': 'middle', 'font-family': '"Lilita One", sans-serif', 'font-size': 15.5, fill: INK }, inner);
      t.textContent = text;
      setTimeout(() => g.remove(), 750);
    }

    function crumbs(x, y) {
      for (let i = 0; i < 10; i++) {
        const c = U.svgEl('circle', { cx: x, cy: y, r: U.rand(2.5, 4.8).toFixed(1), fill: U.pick(['#E69B49', '#4E2A14', YELLOW]), stroke: INK, 'stroke-width': 1.4 }, fx);
        const vx = U.rand(-52, 52), vy = U.rand(-48, -12);
        U.tween(680, (t) => {
          if (!alive()) return;
          c.setAttribute('cx', (x + vx * t).toFixed(1));
          c.setAttribute('cy', (y + vy * t + 90 * t * t).toFixed(1));
          c.setAttribute('opacity', (1 - t).toFixed(2));
        }, U.ease.linear).then(() => c.remove());
      }
    }

    /* ---------- Noodle futile jump decoy ---------- */
    const jumpLines = [
      'So close!! (Not even close.)',
      'My arms aren’t THAT stretchy!',
      'If only the ceiling was the floor…',
      'Need something tall to stand on!',
    ];
    async function noodleJump(msg) {
      if (st.jumping || st.done || !alive()) return;
      st.jumping = true;
      const n = count('jump');
      A.play('boing');
      setFace('wide', 'o'); setArms('up');
      const y0 = st.ndY;
      await U.tween(460, (t) => {
        if (!alive() || st.done) return;
        const arc = Math.sin(t * Math.PI);
        const y = y0 - arc * 66;
        const sx = t < 0.15 ? 1.12 : 1 - arc * 0.08;
        const sy = t < 0.15 ? 0.88 : 1 + arc * 0.1;
        nd.setAttribute('transform', `translate(${st.ndX.toFixed(1)},${y.toFixed(1)}) scale(${sx.toFixed(3)},${sy.toFixed(3)})`);
      }, U.ease.linear);
      if (!alive() || st.done) { st.jumping = false; return; }
      nd.setAttribute('transform', `translate(${st.ndX.toFixed(1)},${y0.toFixed(1)})`);
      A.play('thud');
      setFace('open', 'frown'); setArms('shrug');
      talk(msg || jumpLines[(n - 1) % jumpLines.length]);
      st.jumping = false;
    }

    /* ---------- MAIN ENDING: Brainflip! (Turn phone upside down, OR flip "THIS SIDE UP" sign on desktop) ---------- */
    async function upsideDownEnding(src) {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      A.play('flip'); A.play('whoosh');
      U.haptic([35, 50, 110]);

      // Flip the "THIS SIDE UP" wall sign upside down to punctuate gravity inverting!
      const s0 = st.signAngle;
      U.tween(320, (t) => {
        if (!alive()) return;
        upsign.setAttribute('transform', `rotate(${U.lerp(s0, 180, t).toFixed(1)})`);
      }, U.ease.outBack);

      // Comic upward speed lines
      const lines = [52, 128, 266, 338].map((lx) => {
        const p = U.svgEl('path', { d: `M${lx},440 V310`, stroke: '#fff', 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0.75 }, fx);
        U.tween(680, (t) => {
          if (!alive()) return;
          p.setAttribute('transform', `translate(0,${(-260 * t).toFixed(1)})`);
          p.setAttribute('opacity', (0.75 * (1 - t)).toFixed(2));
        }).then(() => p.remove());
        return p;
      });
      void lines;

      // Books float & tumble upward to the ceiling!
      bookState.forEach((b, idx) => {
        const el = bookEls[idx];
        const x0 = b.x, y0 = b.y;
        const tx = [62, 318, 320][idx], ty = [26, 24, 55][idx], rot = [170, -174, 185][idx];
        U.tween(720 + idx * 70, (t) => {
          if (!alive()) return;
          el.setAttribute('transform', `translate(${U.lerp(x0, tx, t).toFixed(1)},${U.lerp(y0, ty, t).toFixed(1)}) rotate(${(rot * t).toFixed(1)})`);
        }, U.ease.outBounce);
      });

      // Noodle yells WHOAAA!, flips 180°, and falls UP onto the ceiling right beside the falling cookie jar!
      setFace('wide', 'bigO'); setArms('up');
      talk('WHOAAA!!', 700);
      const nx0 = st.ndX, ny0 = st.ndY;
      const jm = /translate\(([-\d.]+),([-\d.]+)/.exec(jar.getAttribute('transform'));
      const jx0 = jm ? parseFloat(jm[1]) : JAR0.x, jy0 = jm ? parseFloat(jm[2]) : JAR0.y;

      await U.tween(780, (t) => {
        if (!alive()) return;
        const ny = U.lerp(ny0, 82, t), nx = U.lerp(nx0, 168, t);
        const nr = 180 * Math.min(1, t * 1.45);
        nd.setAttribute('transform', `translate(${nx.toFixed(1)},${ny.toFixed(1)}) rotate(${nr.toFixed(1)})`);
        const jy = U.lerp(jy0, 108, t), jx = U.lerp(jx0, 236, t);
        const jr = 180 * Math.min(1, t * 1.3);
        jar.setAttribute('transform', `translate(${jx.toFixed(1)},${jy.toFixed(1)}) rotate(${jr.toFixed(1)})`);
      }, U.ease.outBounce);
      if (!alive()) return;

      A.play('pop'); U.haptic(30);
      setFace('happy', 'grin'); setArms('hold');
      await U.wait(220);
      if (!alive()) return;
      A.play('crunch');
      crumbs(174, 104);
      // Upward-pointing speech bubble below upside-down Noodle & shelf so face + jar stay 100% clear!
      talkLayer.innerHTML = '';
      const bg = U.svgEl('g', { class: 'fb-top popin' }, talkLayer);
      U.svgEl('path', { d: 'M162,232 L170,214 L178,232 Z', fill: '#fff', stroke: INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }, bg);
      U.svgEl('rect', { x: 46, y: 230, width: 298, height: 36, rx: 16, fill: '#fff', stroke: INK, 'stroke-width': 3 }, bg);
      U.svgEl('rect', { x: 164, y: 229, width: 12, height: 6, fill: '#fff' }, bg);
      const bt = U.svgEl('text', { x: 195, y: 253.5, 'text-anchor': 'middle', 'font-family': 'Fredoka, sans-serif', 'font-weight': 600, 'font-size': 15.5, fill: INK }, bg);
      bt.textContent = 'Upside-down cookies taste BETTER!';
      ctx.say(src === 'sign' ? 'Gravity flipped! (On a phone, just turn it upside down!)' : 'And THAT’s why it’s called Brainflip!', 2600);
      await U.wait(1250);
      if (alive()) ctx.win('flip');
    }

    ctx.onCleanup(I.onUpsideDown((src) => upsideDownEnding(src)));

    /* ---------- "THIS SIDE UP ↑" hanging sign interaction (desktop fallback + phone hint) ---------- */
    let signGrab = null;
    I.drag(upsign, svg, {
      onStart(pt) {
        if (ctx.locked || st.done) return;
        st.lastTouch = performance.now();
        st.signDragging = true;
        const a0 = (Math.atan2(pt.y - SIGN_NAIL.y, pt.x - SIGN_NAIL.x) * 180) / Math.PI - 90;
        signGrab = { a0, base: st.signAngle };
        A.play('tap');
      },
      onMove(pt) {
        if (!signGrab || st.done) return;
        const a = (Math.atan2(pt.y - SIGN_NAIL.y, pt.x - SIGN_NAIL.x) * 180) / Math.PI - 90;
        let da = a - signGrab.a0;
        while (da > 180) da -= 360;
        while (da < -180) da += 360;
        st.signAngle = signGrab.base + da;
        upsign.setAttribute('transform', `rotate(${st.signAngle.toFixed(1)})`);
      },
      onEnd() {
        if (!signGrab) return;
        signGrab = null; st.signDragging = false;
        if (st.done) return;
        const norm = Math.abs(((st.signAngle % 360) + 540) % 360 - 180); // 0 = completely upside down!
        if (norm < 42) {
          if (I.hasMotion) {
            A.play('wobble');
            ctx.say('Haha, nice try! Flip your ACTUAL phone upside down!', 2600);
            const from = st.signAngle;
            U.tween(420, (t) => {
              if (!alive() || st.done) return;
              st.signAngle = U.lerp(from, 0, t);
              upsign.setAttribute('transform', `rotate(${st.signAngle.toFixed(1)})`);
            }, U.ease.outBack);
          } else {
            A.play('click');
            upsideDownEnding('sign');
          }
        } else {
          const from = st.signAngle;
          A.play('swish');
          U.tween(360, (t) => {
            if (!alive() || st.done) return;
            st.signAngle = U.lerp(from, 0, t);
            upsign.setAttribute('transform', `rotate(${st.signAngle.toFixed(1)})`);
          }, U.ease.outBack);
        }
      },
      onTap() {
        signGrab = null; st.signDragging = false;
        if (ctx.locked || st.done) return;
        st.signTaps++;
        if (I.hasMotion) {
          A.play('wobble');
          U.tween(460, (t) => {
            if (!alive() || st.done) return;
            upsign.setAttribute('transform', `rotate(${(Math.sin(t * Math.PI * 2) * 28).toFixed(1)})`);
          });
          ctx.say(st.signTaps === 1 ? '“This side up”… unless you flip your phone!' : 'Seriously — turn your phone upside down!');
        } else if (st.signTaps === 1) {
          A.play('creak');
          U.tween(320, (t) => {
            if (!alive() || st.done) return;
            st.signAngle = U.lerp(0, 95, t);
            upsign.setAttribute('transform', `rotate(${st.signAngle.toFixed(1)})`);
          }, U.ease.outBack);
          ctx.say('Ooh, it turns! Tap or drag it all the way upside down…');
        } else {
          A.play('click');
          upsideDownEnding('sign');
        }
      },
    });

    /* ---------- SECRET ENDING #1: Stack the 3 heavy books under the shelf! ---------- */
    let ndMovedAside = false;
    function moveNoodleAside() {
      if (ndMovedAside) return;
      ndMovedAside = true;
      const x0 = st.ndX, tx = 104;
      U.tween(360, (t) => {
        if (!alive() || st.done) return;
        st.ndX = U.lerp(x0, tx, t);
        nd.setAttribute('transform', `translate(${st.ndX.toFixed(1)},${st.ndY.toFixed(1)})`);
      }, U.ease.outBack);
    }

    BOOKS.forEach((b, idx) => {
      const el = bookEls[idx];
      const bs = bookState[idx];
      let grab = null;
      I.drag(el, svg, {
        onStart(pt) {
          if (ctx.locked || st.done || bs.stacked) return;
          st.lastTouch = performance.now();
          grab = { dx: pt.x - bs.x, dy: pt.y - bs.y };
          // Bring dragged book to top of #l5-books
          el.parentNode.appendChild(el);
          A.play('tap');
        },
        onMove(pt) {
          if (!grab) return;
          bs.x = U.clamp(pt.x - grab.dx, 44, 346);
          bs.y = U.clamp(pt.y - grab.dy, 120, 560);
          el.setAttribute('transform', `translate(${bs.x.toFixed(1)},${bs.y.toFixed(1)}) rotate(${U.clamp((bs.x - b.x0) * 0.04, -10, 10).toFixed(1)})`);
        },
        onEnd() {
          if (!grab) return;
          grab = null;
          if (st.done) return;
          const inDropZone = bs.x > 112 && bs.x < 284 && bs.y > 240 && bs.y < 560;
          if (inDropZone) {
            bs.stacked = true;
            st.stacked.push(idx);
            const targetY = st.stackTopY - b.h / 2;
            st.stackTopY -= b.h;
            const x0 = bs.x, y0 = bs.y;
            const jitterX = (st.stacked.length - 2) * 3;
            moveNoodleAside();
            A.play('thud'); U.haptic(25);
            U.tween(240, (t) => {
              if (!alive() || st.done) return;
              bs.x = U.lerp(x0, STACK_X + jitterX, t);
              bs.y = U.lerp(y0, targetY, t);
              el.setAttribute('transform', `translate(${bs.x.toFixed(1)},${bs.y.toFixed(1)})`);
            }, U.ease.outBounce);
            if (st.stacked.length === 1) ctx.say('Nice! Stack more books to make it taller!');
            else if (st.stacked.length === 2) ctx.say('Almost tall enough! One more book!');
            else if (st.stacked.length >= 3) setTimeout(() => booksEnding(), 280);
          } else {
            const x0 = bs.x, y0 = bs.y;
            A.play('swish');
            U.tween(380, (t) => {
              if (!alive() || st.done) return;
              bs.x = U.lerp(x0, b.x0, t); bs.y = U.lerp(y0, b.y0, t);
              el.setAttribute('transform', `translate(${bs.x.toFixed(1)},${bs.y.toFixed(1)})`);
            }, U.ease.outBack);
          }
        },
        onTap() {
          grab = null;
          if (ctx.locked || st.done) return;
          A.play('tap'); U.replay(el.firstElementChild, 'hop');
          ctx.say(bs.stacked
            ? 'Solid foundation! Keep stacking.'
            : b.title === 'GRAVITY 101'
              ? '“Gravity 101” — thick enough to stand on, and a decent hint too!'
              : `A super thick ${b.title.toLowerCase()}. Bet you can stack it!`);
        },
      });
    });

    async function booksEnding() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      A.play('boing'); U.haptic(25);
      setFace('happy', 'grin'); setArms('up');
      const nx0 = st.ndX, ny0 = st.ndY;
      const topY = st.stackTopY - 70; // feet rest squarely on top of the 3-book stack!
      // Hop smoothly onto top of the book tower
      await U.tween(520, (t) => {
        if (!alive()) return;
        const x = U.lerp(nx0, STACK_X, t);
        const y = U.lerp(ny0, topY, t) - Math.sin(t * Math.PI) * 58;
        nd.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);
      }, U.ease.outCubic);
      if (!alive()) return;
      st.ndX = STACK_X; st.ndY = topY;
      A.play('thud');

      // Stretch up on tippy-toes and pull the jar right down into Noodle's arms!
      const jm = /translate\(([-\d.]+),([-\d.]+)/.exec(jar.getAttribute('transform'));
      const jx0 = jm ? parseFloat(jm[1]) : JAR0.x, jy0 = jm ? parseFloat(jm[2]) : JAR0.y;
      await U.tween(240, (t) => {
        if (!alive()) return;
        nd.setAttribute('transform', `translate(${STACK_X},${(topY - 26 * t).toFixed(1)}) scale(${(1 - 0.06 * t).toFixed(3)},${(1 + 0.08 * t).toFixed(3)})`);
      }, U.ease.outCubic);
      A.play('pop');
      setArms('hold');
      // Bring jar in front of Noodle so the full COOKIES jar is proudly visible!
      nd.parentNode.insertBefore(jar, fx);
      await U.tween(320, (t) => {
        if (!alive()) return;
        nd.setAttribute('transform', `translate(${STACK_X},${U.lerp(topY - 26, topY, t).toFixed(1)})`);
        jar.setAttribute('transform', `translate(${U.lerp(jx0, STACK_X + 38, t).toFixed(1)},${U.lerp(jy0, topY + 22, t).toFixed(1)}) scale(${U.lerp(1, 0.74, t).toFixed(2)})`);
      }, U.ease.outBounce);
      if (!alive()) return;

      A.play('crunch');
      crumbs(STACK_X, topY - 4);
      talk('Knowledge IS delicious!', 2400, STACK_X, topY - 64);
      ctx.say('Who says reading never pays off?', 2500);
      await U.wait(1250);
      if (alive()) ctx.win('books');
    }

    /* ---------- SECRET ENDING #2: Unscrew both bolts holding up the high shelf! ---------- */
    async function unscrew(side) {
      if (st.done || !alive()) return;
      if (side === 'l' && st.screwLOut) return;
      if (side === 'r' && st.screwROut) return;

      const sEl = side === 'l' ? screwL : screwR;
      const p0 = side === 'l' ? SCREW_L : SCREW_R;
      if (side === 'l') st.screwLOut = true; else st.screwROut = true;

      A.play('clink'); U.haptic(25);
      // Spin & pop screw out, dropping it to the floor
      U.tween(560, (t) => {
        if (!alive()) return;
        const x = p0.x + (side === 'l' ? -36 : 36) * t;
        const y = p0.y - Math.sin(t * Math.PI) * 34 + (484 - p0.y) * t * t;
        sEl.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(540 * t).toFixed(1)})`);
      }, U.ease.linear);

      const bothOut = st.screwLOut && st.screwROut;
      if (!bothOut) {
        // First screw out → shelf tilts precariously on the remaining bolt!
        A.play('creak');
        const dir = side === 'l' ? -1 : 1; // left screw gone -> left end sags (-22deg)
        st.shelfTilt = dir * 22;
        const pivotX = side === 'l' ? 52 : -52;
        await U.tween(420, (t) => {
          if (!alive() || st.done) return;
          const a = st.shelfTilt * t;
          shelfWrap.setAttribute('transform', `translate(198,${SHELF_Y}) translate(${pivotX},14) rotate(${a.toFixed(1)}) translate(${-pivotX},-14)`);
          const jx = JAR0.x + dir * 32 * t;
          const jy = JAR0.y + 18 * t;
          jar.setAttribute('transform', `translate(${jx.toFixed(1)},${jy.toFixed(1)}) rotate(${a.toFixed(1)})`);
        }, U.ease.outBounce);
        if (!alive() || st.done) return;
        setFace('wide', 'o');
        talk('Uhh… careful!!', 1800);
        ctx.say('Whoa! Only ONE screw holding that shelf up now…');
      } else {
        shelfCollapseEnding();
      }
    }

    async function shelfCollapseEnding() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      A.play('whoosh'); U.haptic([30, 40, 60]);
      setFace('wide', 'bigO'); setArms('up');

      const jm = /translate\(([-\d.]+),([-\d.]+)/.exec(jar.getAttribute('transform'));
      const jx0 = jm ? parseFloat(jm[1]) : JAR0.x, jy0 = jm ? parseFloat(jm[2]) : JAR0.y;
      const a0 = st.shelfTilt || 0;
      const catchX = st.ndX, catchY = st.ndY + 18;
      // Bring jar in front of Noodle so the catch shows the whole COOKIES jar clearly
      nd.parentNode.insertBefore(jar, fx);

      // Shelf crashes down onto the floor while the cookie jar arcs smoothly right into Noodle's arms!
      await U.tween(620, (t) => {
        if (!alive()) return;
        const sy = U.lerp(SHELF_Y, 474, t * t);
        const sa = a0 + (a0 >= 0 ? 16 : -16) * t;
        shelfWrap.setAttribute('transform', `translate(${(198 + (a0 >= 0 ? 16 : -16) * t).toFixed(1)},${sy.toFixed(1)}) rotate(${sa.toFixed(1)})`);
        const jx = U.lerp(jx0, catchX + 36, t);
        const jy = U.lerp(jy0, catchY, t * t) - Math.sin(t * Math.PI) * 32;
        jar.setAttribute('transform', `translate(${jx.toFixed(1)},${jy.toFixed(1)}) rotate(${U.lerp(a0, 8, t).toFixed(1)}) scale(${U.lerp(1, 0.74, t).toFixed(2)})`);
      }, U.ease.linear);
      if (!alive()) return;

      A.play('crash'); U.haptic(50);
      U.replay(ndBoil, 'jolt');
      burst('CATCH!', catchX + 14, catchY - 46, MINT);
      setFace('happy', 'grin'); setArms('hold');
      await U.wait(260);
      if (!alive()) return;
      A.play('crunch');
      crumbs(catchX, st.ndY - 8);
      talk('Nailed it! …Well, unscrewed it!', 2400);
      ctx.say('Zero structural integrity. 100% cookies.', 2500);
      await U.wait(1250);
      if (alive()) ctx.win('shelf');
    }

    /* ---------- Jar decoy: tapping or trying to drag the jar directly says TOO HIGH! ---------- */
    I.drag(jar, svg, {
      onStart() { st.lastTouch = performance.now(); },
      onMove(pt, d) {
        if (st.done || Math.hypot(d.dx, d.dy) < 18) return;
        if (!st.taps.jarDragWarn) {
          st.taps.jarDragWarn = 1;
          A.play('clink'); U.replay(jarIn, 'wiggle');
          burst('TOO HIGH!', JAR0.x, JAR0.y - 38, '#FF8FB1');
          ctx.say('Hey, no fair! Noodle has to reach it himself!');
          ctx.attempt();
        }
      },
      onEnd() { st.taps.jarDragWarn = 0; },
      onTap() {
        if (ctx.locked || st.done) return;
        A.play('clink'); U.replay(jarIn, 'wiggle');
        ctx.attempt();
        noodleJump();
        ctx.say('Way out of reach! Think outside the room…');
      },
    });

    /* ---------- animation loop: live upside-down sensor feedback + idle reminders ---------- */
    const t0 = performance.now();
    (function loop(now) {
      if (!alive()) return;
      const t = (now - t0) / 1000;
      if (!st.done && I.hasMotion && !st.screwLOut && !st.screwROut) {
        const up = I.upProgress;
        if (up > 0.04) {
          // Jar visibly trembles & floats slightly as you rotate the phone toward upside-down!
          const lift = up * 16;
          const wob = Math.sin(t * 24) * up * 8;
          jar.setAttribute('transform', `translate(${JAR0.x},${(JAR0.y - lift).toFixed(1)}) rotate(${wob.toFixed(1)})`);
        } else {
          jar.setAttribute('transform', `translate(${JAR0.x},${JAR0.y})`);
        }
      }
      if (!st.done && now - st.lastTouch > 8500) {
        st.lastTouch = now;
        ctx.say(U.pick([
          I.hasMotion ? 'Psst… the game is called BrainFLIP for a reason!' : 'Psst… check out that “THIS SIDE UP” sign!',
          'Those books on the floor look pretty thick…',
          'Do those shelf screws look loose to you?',
        ]));
      }
      requestAnimationFrame(loop);
    })(t0);
    svg.addEventListener('pointerdown', () => { st.lastTouch = performance.now(); });

    /* ---------- reactions (no dead taps!) ---------- */
    const taps = {
      screwL: () => unscrew('l'),
      screwR: () => unscrew('r'),
      noodle() {
        ctx.attempt();
        noodleJump();
      },
      clock(node) {
        st.clockSpin += 90;
        A.play('clink'); U.replay(node, 'wiggle');
        clockH.setAttribute('transform', `rotate(${st.clockSpin})`);
        clockM.setAttribute('transform', `rotate(${st.clockSpin * 3})`);
        ctx.say('It’s cookie o’clock! (Just way too high up.)');
        ctx.attempt();
      },
      async mousehole() {
        if (st.mouseBusy) return;
        st.mouseBusy = true;
        A.play('squeak');
        await U.tween(200, (t) => mouse.setAttribute('transform', `translate(0,${U.lerp(22, 2, t).toFixed(1)})`), U.ease.outBack);
        ctx.say('Tiny mouse says: “Find your own crumbs!”');
        await U.wait(700);
        if (alive()) await U.tween(180, (t) => mouse.setAttribute('transform', `translate(0,${U.lerp(2, 22, t).toFixed(1)})`));
        st.mouseBusy = false;
      },
      cabinet() { A.play('bonk'); ctx.say('Bolted straight to the floor! Nice try.'); ctx.attempt(); },
      ruler() { A.play('tap'); ctx.say('Shelf: 6 feet. Noodle: 2 feet. Math checks out.'); ctx.attempt(); },
      rug() { A.play('tap'); ctx.say('Soft kitchen rug. Zero cookies under it.'); ctx.attempt(); },
      wall() { A.play('bonk'); ctx.say(U.pick(['Nope.', 'Think outside the screen.', 'What if gravity went up?'])); ctx.attempt(); },
      floor() { A.play('thud'); ctx.say('Solid floor. Definitely down here.'); ctx.attempt(); },
    };
    I.taps(svg, (name, node) => { if (ctx.locked || st.done) return; if (taps[name]) taps[name](node); });

    const jarWord = ctx.promptEl.querySelector('#pw-jar');
    ctx.promptEl.onclick = (e) => {
      if (ctx.locked) return;
      if (e.target === jarWord) {
        U.replay(jarWord, 'hop'); A.play('crunch');
        ctx.say('Nice try — those words aren’t edible.');
      } else {
        A.play('tap');
        ctx.say('Way up there on the top shelf!');
      }
    };
  }

  BF.levels = BF.levels || {};
  BF.levels[5] = L;
})(window.BF);
