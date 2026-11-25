/* Brainflip — tiny utility belt shared by every module. */
window.BF = window.BF || {};
(function (BF) {
  'use strict';
  const U = {};

  U.$ = (sel, root) => (root || document).querySelector(sel);
  U.$$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  U.clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  U.lerp = (a, b, t) => a + (b - a) * t;
  U.rand = (a, b) => a + Math.random() * (b - a);
  U.pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  U.ease = {
    linear: (t) => t,
    outCubic: (t) => 1 - Math.pow(1 - t, 3),
    inCubic: (t) => t * t * t,
    inOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    outBack: (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
    outElastic: (t) => { const c4 = (2 * Math.PI) / 3; return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1; },
    outBounce: (t) => {
      const n1 = 7.5625, d1 = 2.75;
      if (t < 1 / d1) return n1 * t * t;
      if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
      if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    },
  };

  /** Promise-based tween: onUpdate(easedT, rawT) every frame. */
  U.tween = (dur, onUpdate, ease) => new Promise((resolve) => {
    const e = ease || U.ease.outCubic;
    const t0 = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - t0) / dur);
      onUpdate(e(t), t);
      if (t < 1) requestAnimationFrame(frame); else resolve();
    }
    requestAnimationFrame(frame);
  });
  U.wait = (ms) => new Promise((r) => setTimeout(r, ms));

  function hex(c) { const n = parseInt(c.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  U.lerpColor = (a, b, t) => {
    const A = hex(a), B = hex(b);
    const c = A.map((v, i) => Math.round(U.lerp(v, B[i], t)));
    return '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('');
  };

  const NS = 'http://www.w3.org/2000/svg';
  U.svgEl = (tag, attrs, parent) => {
    const el = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) el.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(el);
    return el;
  };
  U.svgPoint = (svg, x, y) => {
    const pt = svg.createSVGPoint(); pt.x = x; pt.y = y;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  };

  U.haptic = (pattern) => { try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) { /* not supported */ } };

  /* localStorage can be missing or throw (private mode, sandboxed frames). */
  U.store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } },
    clear(prefix) { try { Object.keys(localStorage).filter((k) => k.startsWith(prefix)).forEach((k) => localStorage.removeItem(k)); } catch (e) { /* ignore */ } },
  };

  U.params = new URLSearchParams(location.search);
  U.reducedMotion = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Restart a CSS animation class on an element. */
  U.replay = (el, cls) => { el.classList.remove(cls); void el.getBoundingClientRect(); el.classList.add(cls); };

  BF.U = U;
})(window.BF);
