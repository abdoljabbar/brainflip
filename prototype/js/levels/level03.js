/* Brainflip — Level 3: "Find the hidden cat"
   Main ending : pinch-zoom into the TINY painting: the cat lives in it  (verb: pinch / zoom)
   Secret #1   : the "a" in the prompt has tiny ears; tap it and the cat jumps out of the text
   Secret #2   : drop the tuna can on the floor; the cat comes out of the box  (verb: drag + wait)
   Decoys: a cat cushion, a striped "tail" behind the sofa, a dog portrait.
   Without pinch (desktop): mouse wheel or double-tap zooms. */
(function (BF) {
  'use strict';
  const U = BF.U, A = BF.audio, I = BF.input, ART = BF.art;
  const INK = '#1B1B2F', YELLOW = '#FFC93C', PINK = '#FF5D8F', ORANGE = '#FF9F43';
  const W = 'stroke-linecap="round" stroke-linejoin="round"';
  const S = `stroke="${INK}" stroke-width="3.4" ${W}`;
  const ND = { x: 128, y: 404 };
  const PAINT = { x: 266, y: 150 };   // the tiny painting's centre
  const MAXZ = 6;

  /** Whiskers the cat. Origin = bottom centre, about 64 x 84. */
  function cat({ eyes = 'open', wave = false, stroke = 3 } = {}) {
    const sw = `stroke="${INK}" stroke-width="${stroke}" ${W}`;
    const e = eyes === 'happy'
      ? `<path d="M-11,-52 Q-7,-57 -3,-52 M3,-52 Q7,-57 11,-52" fill="none" ${sw}/>`
      : `<circle cx="-7" cy="-53" r="3.4" fill="${INK}"/><circle cx="7" cy="-53" r="3.4" fill="${INK}"/><circle cx="-6" cy="-54.5" r="1.1" fill="#fff"/><circle cx="8" cy="-54.5" r="1.1" fill="#fff"/>`;
    const paw = wave
      ? `<path d="M15,-30 Q30,-38 30,-58" fill="none" stroke="${INK}" stroke-width="10" ${W}/><path d="M15,-30 Q30,-38 30,-58" fill="none" stroke="${ORANGE}" stroke-width="5" ${W}/><circle cx="30" cy="-61" r="6" fill="${ORANGE}" ${sw}/>`
      : `<ellipse cx="9" cy="-2" rx="8" ry="5" fill="${ORANGE}" ${sw}/>`;
    return `<path d="M16,-8 C42,-8 44,-36 30,-46" fill="none" stroke="${INK}" stroke-width="10" ${W}/>` +
      `<path d="M16,-8 C42,-8 44,-36 30,-46" fill="none" stroke="${ORANGE}" stroke-width="5" ${W}/>` +
      `<ellipse cx="0" cy="-22" rx="22" ry="23" fill="${ORANGE}" ${sw}/>` +
      `<path d="M-12,-30 h6 M-14,-20 h6 M8,-30 h6" stroke="#E07B20" stroke-width="3" stroke-linecap="round"/>` +
      `<ellipse cx="-9" cy="-2" rx="8" ry="5" fill="${ORANGE}" ${sw}/>${paw}` +
      `<path d="M-18,-60 L-15,-81 L-3,-70 Z M18,-60 L15,-81 L3,-70 Z" fill="${ORANGE}" ${sw}/>` +
      `<path d="M-14,-66 L-13,-75 L-7,-70 Z M14,-66 L13,-75 L7,-70 Z" fill="#FF8FB1"/>` +
      `<circle cx="0" cy="-52" r="20" fill="${ORANGE}" ${sw}/>` +
      `<path d="M-4,-71 v6 M4,-71 v6" stroke="#E07B20" stroke-width="2.6" stroke-linecap="round"/>` + e +
      `<path d="M-2.5,-47 h5 l-2.5,3 Z" fill="${PINK}"/><path d="M-5,-42 q2.5,3 5,0 q2.5,3 5,0" fill="none" stroke="${INK}" stroke-width="1.8" ${W}/>` +
      `<path d="M-12,-46 h-10 M-12,-43 l-9,3 M12,-46 h10 M12,-43 l9,3" stroke="${INK}" stroke-width="1.4" stroke-linecap="round"/>`;
  }

  function frame(x, y, w, h, inner, tap, rot = 0) {
    return `<g transform="translate(${x},${y}) rotate(${rot})"><g data-tap="${tap}" class="fb">
      <path d="M${-w * 0.25},${-h / 2} L0,${-h / 2 - Math.max(6, h * 0.25)} L${w * 0.25},${-h / 2}" fill="none" stroke="${INK}" stroke-width="2" ${W}/>
      <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${Math.max(2, w * 0.06)}" fill="#C77D4A" stroke="${INK}" stroke-width="${Math.max(1.4, w * 0.035)}"/>
      <g>${inner}</g></g></g>`;
  }

  function sceneSVG() {
    const dog = `<rect x="-42" y="-32" width="84" height="64" fill="#FFF4E0" stroke="${INK}" stroke-width="2.4"/>
      <ellipse cx="0" cy="14" rx="26" ry="16" fill="#C77D4A" stroke="${INK}" stroke-width="2.4"/>
      <circle cx="0" cy="-6" r="17" fill="#E8A06A" stroke="${INK}" stroke-width="2.4"/>
      <path d="M-15,-14 Q-26,-4 -18,8 L-12,-6 Z M15,-14 Q26,-4 18,8 L12,-6 Z" fill="#8A5A3B" stroke="${INK}" stroke-width="2.2" ${W}/>
      <circle cx="-6" cy="-9" r="2.4" fill="${INK}"/><circle cx="6" cy="-9" r="2.4" fill="${INK}"/>
      <ellipse cx="0" cy="-1" rx="4" ry="3" fill="${INK}"/><path d="M0,2 v4" stroke="${INK}" stroke-width="1.8"/>
      <path d="M-4,8 q4,6 8,0" fill="${PINK}" stroke="${INK}" stroke-width="1.6"/>`;
    const hills = `<rect x="-26" y="-20" width="52" height="40" fill="#BDE7FF" stroke="${INK}" stroke-width="2"/>
      <path d="M-26,12 L-10,-8 L2,6 L12,-4 L26,12 V20 H-26 Z" fill="#8A84C8" stroke="${INK}" stroke-width="2" ${W}/>
      <path d="M-14,-3 L-10,-8 L-6,-3 Z" fill="#fff"/><circle cx="16" cy="-12" r="4" fill="${YELLOW}" stroke="${INK}" stroke-width="1.4"/>`;
    const tiny = `<rect x="-9" y="-7" width="18" height="14" fill="#BDE7FF" stroke="${INK}" stroke-width=".7"/>
      <path d="M-9,4 Q0,0 9,3 V7 H-9 Z" fill="#3DDC97" stroke="${INK}" stroke-width=".6"/>
      <g id="l3-pcat" transform="translate(1.5,4.6) scale(.105)">${cat({ stroke: 4 })}</g>`;
    return `
<svg viewBox="0 0 390 630" xmlns="http://www.w3.org/2000/svg" aria-label="Noodle looking for his cat in the living room">
  <defs>
    <pattern id="l3-wallp" width="34" height="34" patternUnits="userSpaceOnUse"><circle cx="17" cy="17" r="3" fill="#BDEFD8"/></pattern>
    <pattern id="l3-stripe" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="6" height="12" fill="#E07B20"/></pattern>
    <clipPath id="l3-boxclip"><rect x="-46" y="-140" width="92" height="140"/></clipPath>
  </defs>
  <g id="l3-zoom">
    <rect data-tap="wall" x="-30" y="-200" width="450" height="680" fill="#D8F7E8"/>
    <rect x="-30" y="-200" width="450" height="680" fill="url(#l3-wallp)" pointer-events="none"/>
    <rect data-tap="floor" x="-30" y="470" width="450" height="560" fill="#E8A06A"/>
    <path d="M-30,520 H420 M-30,570 H420 M-30,620 H420 M-30,670 H420 M-30,720 H420 M60,470 V520 M200,520 V570 M120,570 V620 M300,470 V520 M280,620 V670 M30,670 V720" stroke="#C77D4A" stroke-width="2.6" pointer-events="none"/>
    <rect x="-30" y="464" width="450" height="12" fill="#fff" ${S}/>
    <ellipse cx="200" cy="560" rx="150" ry="30" fill="#8A84C8" ${S} data-tap="rug"/>
    <ellipse cx="200" cy="560" rx="128" ry="20" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="8 8" pointer-events="none"/>

    <!-- gallery wall: one big decoy, one medium, one TINY -->
    ${frame(92, 96, 104, 84, dog, 'dog', -3)}
    ${frame(206, 74, 64, 52, hills, 'hills', 4)}
    <g id="l3-paint">${frame(PAINT.x, PAINT.y, 22, 18, tiny, 'tiny', 0)}</g>

    <!-- shelf: tuna + plant -->
    <path d="M306,226 l7,9 M368,226 l-7,9" stroke="${INK}" stroke-width="3" ${W}/>
    <g transform="translate(356,218)"><g data-tap="plant" class="fb">
      <path d="M0,-14 C-14,-34 -12,-44 -2,-50 C0,-38 2,-30 0,-14 Z M0,-14 C12,-30 18,-36 22,-38 C18,-26 10,-18 0,-14 Z" fill="#3DDC97" ${S}/>
      <path d="M-11,-14 H11 L8,0 H-8 Z" fill="${PINK}" ${S}/>
    </g></g>
    <rect x="298" y="217" width="80" height="9" rx="3" fill="#C77D4A" ${S}/>

    <!-- floor lamp -->
    <g data-tap="lamp">
      <path d="M352,464 V316" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="352" cy="466" rx="20" ry="5" fill="#C77D4A" ${S}/>
      <path id="l3-lampshade" d="M330,318 L338,284 H366 L374,318 Z" fill="${YELLOW}" ${S}/>
    </g>

    <!-- sofa with decoys -->
    <g id="l3-scarf" data-tap="scarf"><g class="fb">
      <path d="M196,350 C186,330 190,300 206,290" fill="none" stroke="${INK}" stroke-width="15" stroke-linecap="round"/>
      <path d="M196,350 C186,330 190,300 206,290" fill="none" stroke="${ORANGE}" stroke-width="9" stroke-linecap="round"/>
      <path d="M196,350 C186,330 190,300 206,290" fill="none" stroke="#E07B20" stroke-width="9" stroke-dasharray="5 7"/>
    </g></g>
    <g data-tap="sofa">
      <rect x="196" y="330" width="176" height="80" rx="22" fill="#5BC0EB" ${S}/>
      <rect x="196" y="398" width="176" height="44" rx="12" fill="#7FD3F7" ${S}/>
      <rect x="182" y="370" width="30" height="78" rx="14" fill="#5BC0EB" ${S}/>
      <rect x="356" y="370" width="30" height="78" rx="14" fill="#5BC0EB" ${S}/>
      <rect x="204" y="446" width="10" height="20" fill="#8A5A3B" ${S}/><rect x="354" y="446" width="10" height="20" fill="#8A5A3B" ${S}/>
    </g>
    <g transform="translate(300,384)"><g data-tap="cushion" class="fb">
      <path d="M-24,-20 L-20,-34 L-10,-24 H10 L20,-34 L24,-20 Q28,12 0,14 Q-28,12 -24,-20 Z" fill="${PINK}" ${S}/>
      <path d="M-10,-8 q3,-3 6,0 M4,-8 q3,-3 6,0" fill="none" stroke="${INK}" stroke-width="2.2" ${W}/>
      <path d="M-2,0 h4 l-2,2.5 Z" fill="${INK}"/><path d="M-12,4 h-8 M12,4 h8" stroke="${INK}" stroke-width="1.4"/>
    </g></g>

    <!-- the box (it wiggles sometimes…) -->
    <g transform="translate(52,470)"><g id="l3-box" data-tap="box" class="fb-bottom">
      <path d="M-44,-62 L-58,-80 L-34,-80 L-22,-62 Z" fill="#D9A066" ${S}/>
      <g clip-path="url(#l3-boxclip)"><g id="l3-boxcat" transform="translate(0,80)"></g></g>
      <rect x="-44" y="-62" width="88" height="62" rx="3" fill="#E8B57A" ${S}/>
      <path d="M44,-62 L58,-80 L34,-80 L22,-62 Z" fill="#D9A066" ${S}/>
      <path d="M-20,-40 H20 M-20,-30 H8" stroke="#B5803D" stroke-width="3" stroke-linecap="round"/>
    </g></g>

    <!-- Noodle, standing -->
    <g id="l3-nd" transform="translate(${ND.x},${ND.y})" data-tap="noodle">
      <g id="l3-nd-boil" class="boil fb">
        ${ART.noodleLegs()}${ART.noodleBody()}
        <g id="l3-nd-arms">${ART.noodleArms('shrug')}</g>
        <g transform="translate(0,-14)"><g id="l3-nd-face">${ART.noodleFace({ eyes: 'open', mouth: 'frown' })}</g></g>
      </g>
    </g>

    <!-- tuna on the shelf (draggable, with generous touch hitbox) -->
    <g id="l3-tuna" transform="translate(324,206)"><g id="l3-tuna-in">
      <circle r="28" fill="#000" fill-opacity="0" pointer-events="all"/>
      <rect x="-14" y="-11" width="28" height="22" rx="4" fill="#D7DCE6" ${S}/>
      <rect x="-14" y="-4" width="28" height="9" fill="#5BC0EB" stroke="${INK}" stroke-width="2"/>
      <path d="M-6,0 q4,-4 8,0 q-4,4 -8,0 Z M2,0 l4,-3 v6 Z" fill="#fff" stroke="${INK}" stroke-width="1.2"/>
    </g></g>

    <g id="l3-fx" pointer-events="none"></g>
    <g id="l3-talk" pointer-events="none"></g>
  </g>
</svg>`;
  }

  const L = {
    id: 3,
    promptHTML: 'Find the hidden c<span class="cat-a" id="pw-a">a<svg class="ears" viewBox="0 0 20 7" aria-hidden="true"><path d="M1,7 L3,0 L8,6 M12,6 L17,0 L19,7" fill="#1B1B2F" stroke="#1B1B2F" stroke-width="1.6" stroke-linejoin="round"/></svg><svg class="tail" viewBox="0 0 8 14" aria-hidden="true"><path d="M1,13 C8,12 8,4 4,1" fill="none" stroke="#1B1B2F" stroke-width="2.2" stroke-linecap="round"/></svg></span>t',
    endings: [
      { id: 'zoom', name: 'Tiny Kitty', line: 'Meow! (You found me.)', rarity: 61, icon: 'zoomcat', stamp: 'FOUND!' },
      { id: 'word', name: 'Purr-ompt', line: 'I was in the sentence the whole time.', rarity: 8, icon: 'wordcat', stamp: 'WHAT?!' },
      { id: 'fish', name: 'Tuna Time', line: 'Nom nom nom.', rarity: 19, icon: 'tunacat', stamp: 'GOTCHA!' },
    ],
    hints(found) {
      const touch = (window.matchMedia && matchMedia('(pointer: coarse)').matches) || ('ontouchstart' in window && navigator.maxTouchPoints > 0);
      if (!found.includes('zoom')) return [{ text: 'Some things are just too small to see.' },
        { text: touch ? 'Pinch to zoom into the tiniest painting.' : 'Scroll or double-click to zoom into the tiniest painting.', demo: 'pinch' }];
      if (!found.includes('word')) return [{ text: 'Read the task again. Closely.' }, { text: 'One letter in “cat” has ears.', demo: 'word' }];
      if (!found.includes('fish')) return [{ text: 'No cat can resist a snack.' }, { text: 'Drop the tuna on the floor… and wait.', demo: 'tuna' }];
      return [{ text: 'All three cats found. Wait, it\'s one cat.' }];
    },
    demo(kind, ctx) {
      if (kind === 'pinch') return { pinch: { x: PAINT.x, y: PAINT.y } };
      if (kind === 'tuna') return [{ x: 324, y: 200 }, { x: 220, y: 520 }];
      if (kind === 'word') {
        const a = ctx.promptEl.querySelector('#pw-a');
        if (!a) return null;
        const r = a.getBoundingClientRect(), p = ctx.sceneFromClient(r.left + r.width / 2, r.top + r.height * 0.55);
        return [{ x: p.x + 10, y: p.y + 70 }, { x: p.x, y: p.y }];
      }
      return null;
    },
    build,
  };

  // ending stickers for this level
  Object.assign(ART.stickers, {
    zoomcat: (uid = 'a') => ART.stickerFrame('#BDE7FF', `<g transform="translate(0,40) scale(1.05)">${cat({ wave: true })}</g>` +
      `<circle cx="-34" cy="-30" r="16" fill="#fff" fill-opacity=".5" stroke="${INK}" stroke-width="4"/><path d="M-46,-18 L-58,-6" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`, 'zc' + uid),
    wordcat: (uid = 'a') => ART.stickerFrame(YELLOW, `<text x="-30" y="22" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="58" fill="#fff" stroke="${INK}" stroke-width="3" paint-order="stroke">c</text>` +
      `<g transform="translate(6,42) scale(.7)">${cat({ eyes: 'happy' })}</g><text x="40" y="22" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="58" fill="#fff" stroke="${INK}" stroke-width="3" paint-order="stroke">t</text>`, 'wc' + uid),
    tunacat: (uid = 'a') => ART.stickerFrame('#3DDC97', `<g transform="translate(-8,40) scale(.95)">${cat({ eyes: 'happy' })}</g>` +
      `<g transform="translate(34,30)"><rect x="-14" y="-11" width="28" height="22" rx="4" fill="#D7DCE6" stroke="${INK}" stroke-width="3"/><rect x="-14" y="-4" width="28" height="9" fill="#5BC0EB" stroke="${INK}" stroke-width="2"/></g>`, 'tc' + uid),
  });

  function build(ctx) {
    ctx.root.innerHTML = sceneSVG();
    const svg = ctx.root.querySelector('svg');
    const $ = (id) => svg.querySelector('#l3-' + id);
    const zoomG = $('zoom'), fx = $('fx'), talkLayer = $('talk');
    const nd = $('nd'), ndFace = $('nd-face'), ndArms = $('nd-arms'), ndBoil = $('nd-boil');
    const box = $('box'), boxcat = $('boxcat'), tuna = $('tuna'), pcat = $('pcat');
    const st = { done: false, z: { s: 1, x: 0, y: 0 }, zoomAnim: 0, tunaFalling: false, warm: false, taps: {}, lastTouch: performance.now() };
    const alive = () => ctx.alive;
    const count = (k) => (st.taps[k] = (st.taps[k] || 0) + 1);
    const setFace = (eyes, mouth) => { ndFace.innerHTML = ART.noodleFace({ eyes, mouth }); };
    const setArms = (t) => { ndArms.innerHTML = ART.noodleArms(t); };

    const talk = (text, ms = 1800) => ctx.talk(talkLayer, ND.x + 10, ND.y - 64, text, ms, 0.35);

    /* ---------- zoom: pinch, wheel, double-tap, pan ---------- */
    function bounds() { const vb = svg.viewBox.baseVal; return { y0: vb.y, y1: vb.y + vb.height }; }
    function applyZoom() {
      const z = st.z, b = bounds();
      z.s = U.clamp(z.s, 1, MAXZ);
      z.x = U.clamp(z.x, 390 - 390 * z.s, 0);
      z.y = U.clamp(z.y, b.y1 - b.y1 * z.s, b.y0 - b.y0 * z.s);
      zoomG.setAttribute('transform', `translate(${z.x.toFixed(1)},${z.y.toFixed(1)}) scale(${z.s.toFixed(3)})`);
      ctx.setBoilPaused(z.s > 1.05);
      checkPainting();
    }
    async function resetZoom(dur = 480) {
      st.zoomAnim++;
      if (st.z.s <= 1.02 && Math.abs(st.z.x) < 1 && Math.abs(st.z.y) < 1) { ctx.setBoilPaused(false); return; }
      const from = { ...st.z };
      await U.tween(dur, (t) => {
        st.z.s = U.lerp(from.s, 1, t); st.z.x = U.lerp(from.x, 0, t); st.z.y = U.lerp(from.y, 0, t);
        zoomG.setAttribute('transform', `translate(${st.z.x.toFixed(1)},${st.z.y.toFixed(1)}) scale(${st.z.s.toFixed(3)})`);
      }, U.ease.inOutCubic);
      ctx.setBoilPaused(false);
    }
    function zoomAt(root, s) {
      st.zoomAnim++;
      const z = st.z, lx = (root.x - z.x) / z.s, ly = (root.y - z.y) / z.s;
      z.s = U.clamp(s, 1, MAXZ); z.x = root.x - lx * z.s; z.y = root.y - ly * z.s;
      applyZoom();
    }
    const toLocal = (p) => ({ x: (p.x - st.z.x) / st.z.s, y: (p.y - st.z.y) / st.z.s });
    function checkPainting() {
      if (st.done) return;
      const z = st.z, b = bounds();
      const px = z.x + PAINT.x * z.s, py = z.y + PAINT.y * z.s;
      const onScreen = px > 30 && px < 360 && py > b.y0 + 190 && py < b.y1 - 60;
      if (onScreen && z.s >= 2 && !st.warm) { st.warm = true; ctx.say('Getting warmer… keep zooming!'); }
      if (onScreen && z.s >= 3.6) zoomEnding();
    }

    const ptrs = new Map();
    let pinch = null, pan = null, lastTap = null;
    svg.addEventListener('pointerdown', (e) => {
      st.lastTouch = performance.now();
      const p = U.svgPoint(svg, e.clientX, e.clientY);
      ptrs.set(e.pointerId, { p, t0: performance.now(), start: p, onDrag: !!e.target.closest('[data-drag]') });
      if (ptrs.size === 2) {
        st.zoomAnim++;
        const [a, b] = [...ptrs.values()];
        const mid = { x: (a.p.x + b.p.x) / 2, y: (a.p.y + b.p.y) / 2 };
        pinch = { d0: Math.hypot(a.p.x - b.p.x, a.p.y - b.p.y) || 1, s0: st.z.s, local: toLocal(mid) };
        pan = null;
      } else if (ptrs.size === 1 && st.z.s > 1.01 && !e.target.closest('[data-drag]')) {
        st.zoomAnim++;
        pan = { start: p, zx: st.z.x, zy: st.z.y };
      }
    });
    svg.addEventListener('pointermove', (e) => {
      const rec = ptrs.get(e.pointerId);
      if (!rec) return;
      rec.p = U.svgPoint(svg, e.clientX, e.clientY);
      if (st.done) return;
      if (pinch && ptrs.size >= 2) {
        const [a, b] = [...ptrs.values()];
        const mid = { x: (a.p.x + b.p.x) / 2, y: (a.p.y + b.p.y) / 2 };
        const s = U.clamp(pinch.s0 * Math.hypot(a.p.x - b.p.x, a.p.y - b.p.y) / pinch.d0, 1, MAXZ);
        st.z.s = s; st.z.x = mid.x - pinch.local.x * s; st.z.y = mid.y - pinch.local.y * s;
        applyZoom();
      } else if (pan) {
        st.z.x = pan.zx + (rec.p.x - pan.start.x); st.z.y = pan.zy + (rec.p.y - pan.start.y);
        applyZoom();
      }
    });
    const up = (e) => {
      const rec = ptrs.get(e.pointerId);
      ptrs.delete(e.pointerId);
      if (ptrs.size < 2) pinch = null;
      if (ptrs.size === 0) pan = null;
      if (!rec || rec.onDrag || st.done) return;
      // double-tap toggles a 4x zoom at that point (accessible alternative to pinching)
      const now = performance.now();
      if (Math.hypot(rec.p.x - rec.start.x, rec.p.y - rec.start.y) < 10 && now - rec.t0 < 300) {
        if (lastTap && now - lastTap.t < 330 && Math.hypot(rec.p.x - lastTap.p.x, rec.p.y - lastTap.p.y) < 40) {
          lastTap = null;
          const anim = ++st.zoomAnim;
          const from = { ...st.z }, target = st.z.s > 1.5 ? 1 : 4, at = rec.p;
          const lx = (at.x - from.x) / from.s, ly = (at.y - from.y) / from.s;
          A.play('whoosh');
          U.tween(320, (t) => {
            if (st.zoomAnim !== anim || st.done || !alive()) return;
            const s = U.lerp(from.s, target, t); st.z.s = s; st.z.x = at.x - lx * s; st.z.y = at.y - ly * s; applyZoom();
          });
        } else lastTap = { t: now, p: rec.p };
      }
    };
    svg.addEventListener('pointerup', up);
    svg.addEventListener('pointercancel', up);
    svg.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (st.done) return;
      zoomAt(U.svgPoint(svg, e.clientX, e.clientY), st.z.s * Math.exp(-e.deltaY * 0.0022));
    }, { passive: false });
    svg.style.touchAction = 'none';

    /* ---------- idle life ---------- */
    const boxTimer = setInterval(() => {
      if (st.done || !alive() || document.hidden) return;
      U.replay(box, 'wiggle');
      if (Math.random() < 0.5) A.play('mrrp');
    }, 5200);
    ctx.onCleanup(() => clearInterval(boxTimer));
    (function loop(now) {
      if (!alive()) return;
      if (!st.done && now - st.lastTouch > 8000) {
        st.lastTouch = now;
        ctx.say(U.pick(['Psst… look at the paintings. ALL of them.', 'That box keeps moving…', 'Stuck? The bulb up top can help.']));
      }
      requestAnimationFrame(loop);
    })(performance.now());

    /* ---------- endings ---------- */
    function catEl(parent, x, y, s, opts) {
      const g = U.svgEl('g', { transform: `translate(${x},${y}) scale(${s})` }, parent);
      g.innerHTML = cat(opts);
      return g;
    }
    async function catToNoodle(c, from, s0) {
      // hop into Noodle's arms
      A.play('boing');
      const to = { x: ND.x + 4, y: ND.y + 56 };
      await U.tween(650, (t) => {
        const x = U.lerp(from.x, to.x, t), y = U.lerp(from.y, to.y, t) - Math.sin(t * Math.PI) * 90;
        c.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${U.lerp(s0, 0.62, t).toFixed(3)})`);
      }, U.ease.inOutCubic);
      setArms('hug'); setFace('happy', 'grin');
      A.play('meow');
      talk('Whiskers! There you are!', 2200);
    }
    async function zoomEnding() {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      pinch = null; pan = null; st.zoomAnim++;
      pcat.innerHTML = cat({ wave: true, stroke: 4 });
      A.play('meow'); U.haptic(30);
      await U.wait(900);
      await resetZoom(650);
      if (!alive()) return;
      pcat.innerHTML = '';
      const c = catEl(fx, PAINT.x + 2, PAINT.y + 8, 0.1, {});
      await U.tween(300, (t) => c.setAttribute('transform', `translate(${PAINT.x + 2},${(PAINT.y + 8 + 20 * t).toFixed(1)}) scale(${U.lerp(0.1, 0.6, t).toFixed(3)})`), U.ease.outBack);
      await catToNoodle(c, { x: PAINT.x + 2, y: PAINT.y + 28 }, 0.6);
      await U.wait(1200);
      if (alive()) ctx.win('zoom');
    }
    async function wordEnding(span) {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      pinch = null; pan = null;
      A.play('meow');
      span.classList.add('jump');
      const r = span.getBoundingClientRect(), p = ctx.sceneFromClient(r.left + r.width / 2, r.bottom);
      await resetZoom(350);
      if (!alive()) return;
      span.style.visibility = 'hidden';
      const c = catEl(fx, p.x, p.y, 0.3, { eyes: 'happy' });
      ctx.say('The cat was IN THE SENTENCE.', 2600);
      await catToNoodle(c, p, 0.3);
      await U.wait(1300);
      if (alive()) ctx.win('word');
    }
    async function fishEnding(at) {
      if (st.done || !alive()) return;
      st.done = true; ctx.locked = true;
      pinch = null; pan = null;
      await resetZoom(420);
      if (!alive()) return;
      ctx.say('Tuna! Who could resist?');
      await U.wait(700);
      // the box shakes, a cat peeks out, then trots over
      U.replay(box, 'wiggle'); A.play('mrrp');
      await U.wait(400);
      boxcat.innerHTML = cat({});
      await U.tween(450, (t) => boxcat.setAttribute('transform', `translate(0,${(80 - 70 * t).toFixed(1)})`), U.ease.outBack);
      A.play('meow');
      await U.wait(500);
      boxcat.innerHTML = '';
      const c = catEl(fx, 52, 460, 1, {});
      await U.tween(700, (t) => {
        const x = U.lerp(52, at.x - 34, t), y = U.lerp(460, at.y + 6, t) - Math.sin(t * Math.PI) * 50;
        c.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(.8)`);
      }, U.ease.inOutCubic);
      c.innerHTML = cat({ eyes: 'happy' });
      for (let i = 0; i < 3 && alive(); i++) {
        const n = U.svgEl('text', { x: at.x - 20 + i * 14, y: at.y - 70, 'font-family': '"Lilita One", sans-serif', 'font-size': 16, fill: '#fff', stroke: INK, 'stroke-width': 2.4, 'paint-order': 'stroke' }, fx);
        n.textContent = 'nom';
        U.tween(900, (t) => { n.setAttribute('y', (at.y - 70 - 30 * t).toFixed(1)); n.setAttribute('opacity', 1 - t); }).then(() => n.remove());
        A.play('pop');
        await U.wait(260);
      }
      setFace('happy', 'grin'); setArms('up');
      talk('Whiskers! You were in the box!', 2200);
      await U.wait(1300);
      if (alive()) ctx.win('fish');
    }

    /* tuna: drag it off the shelf, it drops to the floor */
    let grab = null;
    I.drag(tuna, svg, {
      onStart(pt) {
        if (ctx.locked || st.done || st.tunaFalling) return;
        const lp = toLocal(pt), m = /translate\(([-\d.]+),([-\d.]+)/.exec(tuna.getAttribute('transform'));
        grab = { dx: lp.x - parseFloat(m[1]), dy: lp.y - parseFloat(m[2]) };
        A.play('tap');
      },
      onMove(pt) { if (!grab) return; const lp = toLocal(pt); tuna.setAttribute('transform', `translate(${(lp.x - grab.dx).toFixed(1)},${(lp.y - grab.dy).toFixed(1)})`); },
      onEnd() {
        if (!grab) return;
        grab = null;
        const m = /translate\(([-\d.]+),([-\d.]+)/.exec(tuna.getAttribute('transform'));
        const x0 = U.clamp(parseFloat(m[1]), 120, 360), y0 = parseFloat(m[2]), floorY = 512;
        if (x0 > 300 && y0 < 240) { tuna.setAttribute('transform', 'translate(324,206)'); return; } // put back on the shelf
        st.tunaFalling = true; ctx.locked = true;
        U.tween(500, (t) => {
          if (!alive()) return;
          tuna.setAttribute('transform', `translate(${x0.toFixed(1)},${U.lerp(y0, floorY, t).toFixed(1)})`);
        }, U.ease.outBounce).then(() => {
          if (st.done || !alive()) return;
          A.play('bonk');
          fishEnding({ x: x0, y: floorY });
        });
      },
      onTap() { grab = null; if (!ctx.locked && !st.tunaFalling) { A.play('tap'); ctx.say('Tuna. Somebody\'s favourite snack.'); } },
    });

    /* ---------- reactions (decoys included) ---------- */
    const lines = ['Whiskers? Here, kitty kitty!', 'Where IS that cat?', 'She hides when she\'s hungry…', 'Help me look!'];
    const taps = {
      noodle() { const n = count('noodle'); A.play('wobble'); U.replay(ndBoil, 'wiggle'); talk(lines[(n - 1) % lines.length]); ctx.attempt(); },
      dog(node) { A.play('bonk'); U.replay(node, 'wiggle'); ctx.say('That is a dog. Very different animal.'); ctx.attempt(); },
      hills(node) { A.play('tap'); U.replay(node, 'wiggle'); ctx.say('Mountains. No cats. Probably.'); ctx.attempt(); },
      tiny(node) { A.play('squeak'); U.replay(node, 'wiggle'); ctx.say(st.z.s < 2 ? 'A tiny painting. Squint harder.' : 'Closer… closer…'); },
      cushion(node) { A.play('squeak'); U.replay(node, 'hop'); ctx.say('A cushion. With ears. Not a cat.'); ctx.attempt(); },
      scarf(node) {
        A.play('swish');
        U.tween(500, (t) => node.setAttribute('transform', `translate(0,${(-60 * Math.sin(t * Math.PI)).toFixed(1)})`));
        ctx.say('A striped scarf. Nice try.'); ctx.attempt();
      },
      box(node) { A.play('mrrp'); U.replay(node, 'wiggle'); ctx.say(count('box') > 1 ? 'Did the box just purr?' : 'Just a box. Probably.'); },
      sofa() { A.play('tap'); ctx.say('Sofa. Cat hair everywhere, no cat.'); ctx.attempt(); },
      plant(node) { A.play('tap'); U.replay(node, 'wiggle'); ctx.say('A plant. Definitely not a cat.'); ctx.attempt(); },
      lamp() {
        const sh = $('lampshade'), on = sh.getAttribute('fill') === YELLOW;
        sh.setAttribute('fill', on ? '#FFF4C2' : YELLOW); A.play('tap'); ctx.say(on ? 'Click. Still no cat.' : 'Click.');
      },
      rug() { A.play('tap'); ctx.say('Nobody under the rug.'); ctx.attempt(); },
      wall() { A.play('bonk'); ctx.say(U.pick(['Nope.', 'Think outside the screen.', 'Look closer. Much closer.'])); ctx.attempt(); },
      floor() { taps.wall(); },
    };
    I.taps(svg, (name, node) => { if (ctx.locked) return; if (taps[name]) taps[name](node); });

    const a = ctx.promptEl.querySelector('#pw-a');
    ctx.promptEl.onclick = (e) => {
      if (ctx.locked) return;
      if (e.target.closest('#pw-a')) wordEnding(a);
      else { A.play('tap'); ctx.say('Yes. A cat. Somewhere.'); }
    };
  }

  BF.levels = BF.levels || {};
  BF.levels[3] = L;
})(window.BF);
