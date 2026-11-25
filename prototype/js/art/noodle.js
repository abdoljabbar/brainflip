/* Brainflip — Noodle, the mascot. Pure SVG strings so the same art feeds the game,
   the ending stickers and the style board.
   Body coords: a 76x104 bean centred on (0,0).  Face coords: centred on the face anchor. */
(function (BF) {
  'use strict';
  const INK = '#1B1B2F';
  const YELLOW = '#FFC93C';
  const HAIR = '#FFE6A0';
  const CHEEK = '#FF8FB1';
  const W = 'stroke-linecap="round" stroke-linejoin="round"';

  const EYES = {
    open: (x, y) => `<circle cx="${x}" cy="${y}" r="9.5" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="${x + 1.5}" cy="${y + 1}" r="4.6" fill="${INK}"/><circle cx="${x + 3.2}" cy="${y - 1.2}" r="1.6" fill="#fff"/>`,
    closed: (x, y) => `<path d="M${x - 7},${y - 1} Q${x},${y + 6} ${x + 7},${y - 1}" fill="none" stroke="${INK}" stroke-width="3.2" ${W}/>`,
    happy: (x, y) => `<path d="M${x - 7},${y + 3} Q${x},${y - 7} ${x + 7},${y + 3}" fill="none" stroke="${INK}" stroke-width="3.4" ${W}/>`,
    squint: (x, y) => `<path d="M${x - 7},${y + 1} L${x + 7},${y - 1}" fill="none" stroke="${INK}" stroke-width="3.4" ${W}/>`,
    wide: (x, y) => `<circle cx="${x}" cy="${y}" r="11" fill="#fff" stroke="${INK}" stroke-width="3"/><circle cx="${x}" cy="${y}" r="2.8" fill="${INK}"/>`,
    spiral: (x, y) => `<circle cx="${x}" cy="${y}" r="10.5" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M${x - 1},${y} a1.5,1.5 0 1,1 3,0 a3,3 0 1,1 -6,0 a4.5,4.5 0 1,1 9,0 a6,6 0 1,1 -12,0" fill="none" stroke="${INK}" stroke-width="1.8"/>`,
    wink: (x, y, side) => side < 0 ? EYES.open(x, y) : EYES.happy(x, y),
  };

  const MOUTHS = {
    smile: (x, y) => `<path d="M${x - 8},${y} Q${x},${y + 8} ${x + 8},${y}" fill="none" stroke="${INK}" stroke-width="3.2" ${W}/>`,
    grin: (x, y) => `<path d="M${x - 10},${y - 2} Q${x},${y + 15} ${x + 10},${y - 2} Z" fill="${INK}" stroke="${INK}" stroke-width="2.5" ${W}/><path d="M${x - 5},${y + 6.5} Q${x},${y + 2.5} ${x + 5},${y + 6.5} Q${x},${y + 10} ${x - 5},${y + 6.5}Z" fill="${CHEEK}"/>`,
    o: (x, y) => `<ellipse cx="${x}" cy="${y + 2}" rx="4.5" ry="5.5" fill="${INK}"/>`,
    bigO: (x, y) => `<ellipse cx="${x}" cy="${y + 3}" rx="7" ry="9" fill="${INK}"/><ellipse cx="${x}" cy="${y + 7}" rx="4" ry="3" fill="${CHEEK}"/>`,
    yawn: (x, y) => `<ellipse cx="${x}" cy="${y + 3}" rx="8" ry="10.5" fill="${INK}"/><ellipse cx="${x}" cy="${y + 8}" rx="5" ry="3.5" fill="${CHEEK}"/>`,
    sleep: (x, y) => `<ellipse cx="${x}" cy="${y + 1}" rx="3.6" ry="2.6" fill="${INK}"/>`,
    frown: (x, y) => `<path d="M${x - 7},${y + 4} Q${x},${y - 3} ${x + 7},${y + 4}" fill="none" stroke="${INK}" stroke-width="3.2" ${W}/>`,
    chatter: (x, y) => `<rect x="${x - 12}" y="${y - 5}" width="24" height="11" rx="4" fill="#fff" stroke="${INK}" stroke-width="2.6"/><path d="M${x - 10},${y + 1} l4,-4 l4,4 l4,-4 l4,4 l4,-4" fill="none" stroke="${INK}" stroke-width="2" ${W}/>`,
    flat: (x, y) => `<path d="M${x - 6},${y + 2} L${x + 6},${y + 2}" stroke="${INK}" stroke-width="3.2" ${W}/>`,
  };

  function face({ eyes = 'open', mouth = 'smile', blush = true } = {}) {
    let s = '';
    if (blush) s += `<ellipse cx="-24" cy="6" rx="6.5" ry="3.8" fill="${CHEEK}" opacity=".85"/><ellipse cx="24" cy="6" rx="6.5" ry="3.8" fill="${CHEEK}" opacity=".85"/>`;
    s += EYES[eyes](-13, -6, -1) + EYES[eyes](13, -6, 1);
    s += MOUTHS[mouth](0, 11);
    return s;
  }

  function arm(d, hx, hy, color) {
    return `<path d="${d}" fill="none" stroke="${INK}" stroke-width="9" ${W}/><path d="${d}" fill="none" stroke="${color}" stroke-width="4" ${W}/><circle cx="${hx}" cy="${hy}" r="6.5" fill="${color}" stroke="${INK}" stroke-width="3"/>`;
  }

  /** Arms are drawn as stretchy noodles: ink outline + body-colour core. */
  function arms(type, color = YELLOW) {
    switch (type) {
      case 'wave': return arm('M33,-4 Q52,-10 55,-34', 55, -38, color) + arm('M-33,6 Q-46,20 -48,34', -48, 38, color);
      case 'up': return arm('M-31,-16 Q-50,-36 -47,-60', -47, -64, color) + arm('M31,-16 Q50,-36 47,-60', 47, -64, color);
      case 'hug': return arm('M-33,2 Q-8,26 18,12', 20, 10, color) + arm('M33,4 Q8,30 -16,18', -18, 16, color);
      case 'relax': return arm('M-33,4 Q-46,20 -47,36', -47, 40, color) + arm('M33,4 Q46,20 47,36', 47, 40, color);
      case 'reach': return arm('M-33,6 Q-52,14 -64,36', -64, 40, color) + arm('M33,4 Q46,20 47,36', 47, 40, color);
      case 'hold': return arm('M-33,6 Q-44,26 -22,30', -20, 30, color) + arm('M33,6 Q34,30 4,32', 2, 32, color);
      case 'shrug': return arm('M-33,0 Q-52,-6 -56,-22', -56, -26, color) + arm('M33,0 Q52,-6 56,-22', 56, -26, color);
      default: return '';
    }
  }

  function legs(color = YELLOW) {
    return `<path d="M-14,46 L-15,68 M14,46 L15,68" stroke="${INK}" stroke-width="4.5" ${W}/>` +
      `<ellipse cx="-20" cy="70" rx="10" ry="5.5" fill="${color}" stroke="${INK}" stroke-width="3"/>` +
      `<ellipse cx="20" cy="70" rx="10" ry="5.5" fill="${color}" stroke="${INK}" stroke-width="3"/>`;
  }

  const HAIR_D = 'M1,-51 C0,-62 -12,-68 -15,-60 C-18,-51 -5,-48 -3,-57 C-1,-66 10,-74 20,-66';
  function body({ color = YELLOW, pillId = '' } = {}) {
    return `<path d="${HAIR_D}" fill="none" stroke="${INK}" stroke-width="8" ${W}/>` +
      `<path d="${HAIR_D}" fill="none" stroke="${HAIR}" stroke-width="3.6" ${W}/>` +
      `<rect ${pillId ? `id="${pillId}"` : ''} x="-38" y="-52" width="76" height="104" rx="38" fill="${color}" stroke="${INK}" stroke-width="3.6"/>` +
      `<path d="M-26,-26 Q-30,-6 -26,14" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" opacity=".55"/>`;
  }

  /** Complete, static Noodle (title screen, stickers, style board). */
  function noodle({ x = 0, y = 0, rot = 0, scale = 1, eyes = 'open', mouth = 'smile', armType = 'none', withLegs = false, color = YELLOW, extra = '' } = {}) {
    return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${scale})">` +
      (withLegs ? legs(color) : '') + body({ color }) + arms(armType, color) +
      `<g transform="translate(0,-14)">${face({ eyes, mouth })}</g>${extra}</g>`;
  }

  BF.art = Object.assign(BF.art || {}, { noodle, noodleBody: body, noodleFace: face, noodleArms: arms, noodleLegs: legs, INK, YELLOW });
})(window.BF);
