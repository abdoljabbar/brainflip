/* Brainflip — UI icons, the sun character and ending stickers (SVG strings). */
(function (BF) {
  'use strict';
  const INK = '#1B1B2F';
  const W = 'stroke-linecap="round" stroke-linejoin="round"';
  const svg = (vb, inner, extra = '') => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" ${extra}>${inner}</svg>`;

  /* ---------- the sun (also a character: it sleeps, peeks, giggles) ---------- */
  function sunFace(mood) {
    const cheeks = `<ellipse cx="-15" cy="4" rx="5" ry="3" fill="#FF8FB1" opacity=".9"/><ellipse cx="15" cy="4" rx="5" ry="3" fill="#FF8FB1" opacity=".9"/>`;
    if (mood === 'sleep') return cheeks + `<path d="M-14,-9 Q-9,-4 -4,-9 M4,-9 Q9,-4 14,-9" fill="none" stroke="${INK}" stroke-width="2.8" ${W}/><ellipse cx="0" cy="6" rx="2.6" ry="2" fill="${INK}"/>`;
    if (mood === 'open') return cheeks + `<circle cx="-9" cy="-7" r="3.4" fill="${INK}"/><circle cx="9" cy="-7" r="3.4" fill="${INK}"/><ellipse cx="0" cy="7" rx="3.6" ry="4.2" fill="${INK}"/>`;
    return cheeks + `<path d="M-14,-5 Q-9,-13 -4,-5 M4,-5 Q9,-13 14,-5" fill="none" stroke="${INK}" stroke-width="2.8" ${W}/><path d="M-8,3 Q0,13 8,3 Z" fill="${INK}" stroke="${INK}" stroke-width="2" ${W}/>`;
  }
  function sunRays() {
    let s = '';
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2, a1 = a - 0.17, a2 = a + 0.17;
      const p = (r, t) => `${(Math.cos(t) * r).toFixed(1)},${(Math.sin(t) * r).toFixed(1)}`;
      s += `<path d="M${p(31, a1)} L${p(45, a)} L${p(31, a2)} Z" fill="#FFB23F" stroke="${INK}" stroke-width="2.6" ${W}/>`;
    }
    return s;
  }
  function sun(mood = 'happy', { spin = false } = {}) {
    return `<g class="o0 ${spin ? 'spin' : ''}" data-part="rays">${sunRays()}</g>` +
      `<circle r="27" fill="#FFD23F" stroke="${INK}" stroke-width="3.4"/>` +
      `<g data-part="sunface">${sunFace(mood)}</g>`;
  }

  /* ---------- small UI icons ---------- */
  const menu = svg('0 0 28 28', `<path d="M6,8 H22 M6,14 H22 M6,20 H22" stroke="${INK}" stroke-width="3.4" ${W}/>`);
  const bulb = svg('0 0 28 28', `<path d="M14,3 C8.5,3 5.5,7 5.5,11 C5.5,14.5 8,16.5 9.5,18.5 L18.5,18.5 C20,16.5 22.5,14.5 22.5,11 C22.5,7 19.5,3 14,3 Z" fill="#fff" stroke="${INK}" stroke-width="2.6" ${W}/><path d="M10,22 H18 M11.5,25 H16.5" stroke="${INK}" stroke-width="2.6" ${W}/><path d="M11,10 Q14,7 17,10" fill="none" stroke="${INK}" stroke-width="2" ${W}/>`);
  const soundOn = svg('0 0 28 28', `<path d="M5,11 H9 L15,6 V22 L9,17 H5 Z" fill="#fff" stroke="${INK}" stroke-width="2.6" ${W}/><path d="M19,10 Q22,14 19,18 M21.5,7.5 Q27,14 21.5,20.5" fill="none" stroke="${INK}" stroke-width="2.6" ${W}/>`);
  const soundOff = svg('0 0 28 28', `<path d="M5,11 H9 L15,6 V22 L9,17 H5 Z" fill="#fff" stroke="${INK}" stroke-width="2.6" ${W}/><path d="M19,11 L25,17 M25,11 L19,17" stroke="${INK}" stroke-width="2.6" ${W}/>`);
  const gear = svg('0 0 28 28', `<path d="M14,4 L16.2,6.4 L19.4,5.7 L20.2,8.8 L23.2,10.2 L22.2,13.3 L24,16 L21.4,18 L21.4,21.2 L18.2,21.4 L16.3,24 L13.4,22.4 L10.5,24 L8.6,21.4 L5.4,21.2 L5.4,18 L2.8,16 L4.6,13.3 L3.6,10.2 L6.6,8.8 L7.4,5.7 L10.6,6.4 Z" fill="#fff" stroke="${INK}" stroke-width="2.4" ${W}/><circle cx="14" cy="14" r="4.2" fill="#FFC93C" stroke="${INK}" stroke-width="2.4"/>`);
  const lock = svg('0 0 24 24', `<path d="M7.5,10 V7.5 A4.5,4.5 0 0,1 16.5,7.5 V10" fill="none" stroke="${INK}" stroke-width="2.6" ${W}/><rect x="5.5" y="10" width="13" height="10" rx="3" fill="#E3D7C4" stroke="${INK}" stroke-width="2.4"/><circle cx="12" cy="14.8" r="1.4" fill="${INK}"/>`);
  const star = svg('0 0 28 28', `<path d="M14,3 L17.3,9.8 L24.8,10.8 L19.3,16 L20.6,23.5 L14,19.9 L7.4,23.5 L8.7,16 L3.2,10.8 L10.7,9.8 Z" fill="#FFC93C" stroke="${INK}" stroke-width="2.4" ${W}/>`);
  const hand = svg('0 0 64 64', `<path d="M24,34 V9 C24,4 31,4 31,9 V27 C31,24 38,24 38,28 C38,25 45,25 45,29 C45,26 52,27 52,31 V44 C52,54 45,60 36,60 H32 C24,60 20,55 16,49 L10,40 C8,36 13,32 17,35 L24,41 Z" fill="#fff" stroke="${INK}" stroke-width="3.6" ${W}/><path d="M31,27 V35 M38,28 V36 M45,29 V37" stroke="${INK}" stroke-width="2.4" ${W}/>`);
  /* the narrator: "the Game" itself, a smug little brain */
  const brain = svg('-20 -20 40 40', `<path d="M-14,8 C-20,6 -20,-4 -15,-6 C-17,-13 -9,-17 -4,-14 C-1,-19 8,-18 9,-12 C16,-13 19,-5 15,-1 C20,3 17,11 10,11 C8,16 -1,17 -3,12 C-8,15 -14,13 -14,8 Z" fill="#FF8FB1" stroke="${INK}" stroke-width="2.6" ${W}/><path d="M-6,-9 Q-2,-5 -6,-1 M5,-10 Q9,-6 6,-2" fill="none" stroke="${INK}" stroke-width="1.6" ${W} opacity=".6"/><circle cx="-5" cy="3" r="2.1" fill="${INK}"/><path d="M3,3 Q5.5,0.5 8,3" fill="none" stroke="${INK}" stroke-width="2" ${W}/><path d="M-3,8 Q2,11 6,7" fill="none" stroke="${INK}" stroke-width="2" ${W}/>`);
  const tilt = svg('0 0 120 120', `<g transform="translate(60,62) rotate(24)"><rect x="-22" y="-40" width="44" height="80" rx="9" fill="#fff" stroke="${INK}" stroke-width="4"/><rect x="-15" y="-31" width="30" height="58" rx="3" fill="#5BC0EB" stroke="${INK}" stroke-width="2.5"/></g><path d="M20,30 Q8,60 22,90" fill="none" stroke="${INK}" stroke-width="4" ${W}/><path d="M14,82 L22,92 L30,84" fill="none" stroke="${INK}" stroke-width="4" ${W}/><path d="M100,30 Q112,60 98,90" fill="none" stroke="${INK}" stroke-width="4" ${W}/><path d="M92,38 L100,28 L108,36" fill="none" stroke="${INK}" stroke-width="4" ${W}/>`);
  const shake = svg('0 0 120 120', `<g transform="translate(60,62)"><rect x="-22" y="-40" width="44" height="80" rx="9" fill="#fff" stroke="${INK}" stroke-width="4"/><rect x="-15" y="-31" width="30" height="58" rx="3" fill="#FFC93C" stroke="${INK}" stroke-width="2.5"/></g><path d="M24,42 Q16,60 24,78 M14,34 Q4,60 14,86 M96,42 Q104,60 96,78 M106,34 Q116,60 106,86" fill="none" stroke="${INK}" stroke-width="4" ${W}/>`);
  const flip = svg('0 0 120 120', `<g transform="translate(60,54)"><rect x="-22" y="-36" width="44" height="72" rx="9" fill="#1B1B2F" stroke="${INK}" stroke-width="4"/><circle cx="0" cy="-22" r="5" fill="#5BC0EB" stroke="#fff" stroke-width="2"/><rect x="-14" y="-6" width="28" height="32" rx="4" fill="#2B2D6E" stroke="#fff" stroke-width="2"/></g><path d="M18,96 Q60,116 102,96" fill="none" stroke="${INK}" stroke-width="4.5" ${W}/><path d="M94,89 L104,96 L95,105" fill="none" stroke="${INK}" stroke-width="4.5" ${W}/>`);
  const upsideDown = svg('0 0 120 120', `<g transform="translate(60,60)"><rect x="-20" y="-36" width="40" height="72" rx="9" fill="#fff" stroke="${INK}" stroke-width="4"/><rect x="-13" y="-26" width="26" height="48" rx="3" fill="#FFC93C" stroke="${INK}" stroke-width="2.4"/><path d="M0,-14 V8 M-7,-5 L0,-14 L7,-5" fill="none" stroke="${INK}" stroke-width="3.2" ${W}/><circle cx="0" cy="29" r="2.8" fill="${INK}"/></g><path d="M22,26 A46,46 0 0,1 98,26" fill="none" stroke="${INK}" stroke-width="4" ${W}/><path d="M91,18 L99,26 L90,32" fill="none" stroke="${INK}" stroke-width="4" ${W}/><path d="M98,94 A46,46 0 0,1 22,94" fill="none" stroke="${INK}" stroke-width="4" ${W}/><path d="M29,102 L21,94 L30,88" fill="none" stroke="${INK}" stroke-width="4" ${W}/>`);
  const landscape = svg('0 0 120 120', `<g transform="rotate(90 60 60)"><rect x="40" y="18" width="40" height="72" rx="9" fill="#fff" stroke="${INK}" stroke-width="4"/><rect x="47" y="28" width="26" height="48" rx="3" fill="#5BC0EB" stroke="${INK}" stroke-width="2.4"/><circle cx="60" cy="83" r="3" fill="${INK}"/></g><path d="M16,60 A44,44 0 0,1 60,18" fill="none" stroke="${INK}" stroke-width="4" ${W}/><path d="M52,12 L62,18 L54,26" fill="none" stroke="${INK}" stroke-width="4" ${W}/><path d="M104,60 A44,44 0 0,1 60,102" fill="none" stroke="${INK}" stroke-width="4" ${W}/><path d="M68,108 L58,102 L66,94" fill="none" stroke="${INK}" stroke-width="4" ${W}/>`);

  /* ---------- ending stickers ---------- */
  function sticker(bg, inner, id) {
    return svg('-70 -70 140 140', `<defs><clipPath id="stk-${id}"><circle r="54"/></clipPath></defs>` +
      `<circle r="64" fill="#fff" stroke="${INK}" stroke-width="4"/>` +
      `<g clip-path="url(#stk-${id})"><circle r="54" fill="${bg}"/>${inner}</g>` +
      `<circle r="54" fill="none" stroke="${INK}" stroke-width="3.5"/>`);
  }
  const snowflake = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})" stroke="#fff" stroke-width="3" ${W}><path d="M0,-8 V8 M-7,-4 L7,4 M-7,4 L7,-4"/></g>`;

  const stickers = {
    sunrise: (uid = 'a') => sticker('#7FD3F7',
      `<g transform="translate(0,-6) scale(.95)">${sun('happy')}</g>` +
      `<path d="M-60,40 Q-20,18 20,34 Q44,42 60,30 V70 H-60 Z" fill="#3DDC97" stroke="${INK}" stroke-width="3.5" ${W}/>`, 'sun' + uid),
    quake: (uid = 'a') => sticker('#FF6B35',
      `<path d="M-60,44 L-30,40 L-22,50 L-8,38 L4,50 L18,40 L30,48 L60,40 V70 H-60 Z" fill="#C77D4A" stroke="${INK}" stroke-width="3.5" ${W}/>` +
      `<path d="M-46,-8 L-40,-2 L-46,4 M-38,-14 L-32,-8 M46,-8 L40,-2 L46,4 M38,-14 L32,-8" fill="none" stroke="#fff" stroke-width="3.5" ${W}/>` +
      BF.art.noodle({ x: 0, y: 6, scale: 0.6, rot: -8, eyes: 'spiral', mouth: 'o', armType: 'up' }), 'qk' + uid),
    cold: (uid = 'a') => sticker('#BDE7FF',
      snowflake(-38, -30, 1.1) + snowflake(40, -20, .9) + snowflake(-44, 22, .8) + snowflake(36, 30, 1) +
      BF.art.noodle({ x: 0, y: 12, scale: 0.6, eyes: 'wide', mouth: 'chatter', armType: 'hug', color: '#A8DDF7' }), 'cd' + uid),
  };

  /* level 2 stickers */
  const cup = (x, y, s, fill = '#B5651D') => `<g transform="translate(${x},${y}) scale(${s})">` +
    `<path d="M20,-22 Q34,-22 32,-10 Q30,0 18,-2" fill="none" stroke="${INK}" stroke-width="7" ${W}/><path d="M20,-22 Q34,-22 32,-10 Q30,0 18,-2" fill="none" stroke="#fff" stroke-width="3" ${W}/>` +
    `<path d="M-24,-30 H24 L18,4 H-18 Z" fill="#fff" stroke="${INK}" stroke-width="3.5" ${W}/>` +
    `<path d="M-22,-24 H22 L21,-18 H-21 Z" fill="${fill}"/>` +
    `<ellipse cx="0" cy="8" rx="34" ry="6" fill="#fff" stroke="${INK}" stroke-width="3"/></g>`;
  const cube = (x, y, r) => `<rect x="${x - 9}" y="${y - 9}" width="18" height="18" rx="3" transform="rotate(${r},${x},${y})" fill="#fff" stroke="${INK}" stroke-width="2.6"/>`;
  Object.assign(stickers, {
    tea: (uid = 'a') => sticker('#FFE1B3',
      `<path d="M-10,-36 q6,-8 0,-16 q-6,-8 0,-16 M10,-34 q6,-8 0,-16 q-6,-8 0,-16" fill="none" stroke="${INK}" stroke-width="3" opacity=".55" ${W}/>` +
      `<path d="M0,-58 C-6,-66 -16,-60 -10,-52 L0,-44 L10,-52 C16,-60 6,-66 0,-58 Z" fill="#FF5D8F" stroke="${INK}" stroke-width="2.4" ${W}/>` + cup(0, 18, 1.3), 'tea' + uid),
    spill: (uid = 'a') => sticker('#FF6B35',
      BF.art.noodle({ x: 0, y: 4, scale: 0.6, eyes: 'wide', mouth: 'bigO', armType: 'up', color: '#FFB08A' }) +
      `<path d="M-30,-44 q4,8 0,12 q-4,-4 0,-12 Z M30,-40 q4,8 0,12 q-4,-4 0,-12 Z M-40,0 q4,8 0,12 q-4,-4 0,-12 Z" fill="#B5651D" stroke="${INK}" stroke-width="2" ${W}/>` +
      `<path d="M-60,46 Q-20,36 0,44 Q30,52 60,42 V70 H-60 Z" fill="#B5651D" stroke="${INK}" stroke-width="3" ${W}/>`, 'sp' + uid),
    sugar: (uid = 'a') => sticker('#FF8FB1',
      BF.art.noodle({ x: 0, y: 8, scale: 0.6, eyes: 'wide', mouth: 'grin', armType: 'up' }) +
      cube(-38, -30, 14) + cube(38, -24, -10) + cube(-42, 22, -6) + cube(40, 28, 18) +
      `<path d="M-52,-6 h-8 M60,4 h-8 M-50,40 h-8" stroke="#fff" stroke-width="3.5" ${W}/>`, 'sg' + uid),
  });

  BF.art = Object.assign(BF.art || {}, { stickerFrame: sticker, cup, sun, sunFace, icons: { menu, bulb, soundOn, soundOff, gear, lock, star, hand, brain, tilt, shake, flip, upsideDown, landscape }, stickers, snowflake });
})(window.BF);
