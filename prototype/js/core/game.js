/* Brainflip — game shell: screens, HUD, narrator, hints, endings, juice.
   A level is a plain object { id, promptHTML, endings[], hints(found), build(ctx) }. */
(function (BF) {
  'use strict';
  const U = BF.U, A = BF.audio, ART = BF.art;
  const G = (BF.game = {});
  const el = {};
  let level = null, ctx = null, narrTimer = 0, boilTimer = 0, boilPaused = false;
  let hints = U.store.get('bf.hints', 5);
  let hintStage = 0, demoSeq = 0, confettiRAF = 0, inLevelHistory = false;

  const RANKS = [
    [45, 'Galaxy Brain'],
    [39, 'Chaos Mastermind'],
    [27, 'Certified Brainflipper'],
    [15, 'Plot Twister'],
    [5, 'Curious Bean'],
    [0, 'Sleepy Noodle'],
  ];

  G.getProgress = () => {
    const ids = Object.keys(BF.levels || {}).map(Number).sort((a, b) => a - b);
    let foundTotal = 0, maxTotal = 0, highestCompleted = 0, firstIncomplete = ids[0] || 1;
    let pickedIncomplete = false;
    ids.forEach((n) => {
      const def = BF.levels[n];
      const valid = new Set(def.endings.map((e) => e.id));
      const found = U.store.get(`bf.l${n}.found`, []).filter((id) => valid.has(id));
      foundTotal += found.length;
      maxTotal += def.endings.length;
      if (found.length > 0 && n > highestCompleted) highestCompleted = n;
      if (!pickedIncomplete && found.length < def.endings.length) { firstIncomplete = n; pickedIncomplete = true; }
    });
    const maxLevel = ids[ids.length - 1] || 15;
    const storedUnlocked = U.store.get('bf.unlocked', 1);
    const unlocked = U.clamp(Math.max(1, storedUnlocked, highestCompleted + 1), 1, maxLevel);
    const rank = (RANKS.find(([min]) => foundTotal >= min) || RANKS[RANKS.length - 1])[1];
    return { ids, foundTotal, maxTotal, highestCompleted, unlocked, maxLevel, firstIncomplete, rank };
  };
  G.refreshHints = () => {
    hints = U.store.get('bf.hints', 5);
    if (el.hintCount) el.hintCount.textContent = hints;
  };

  const STAGE_W = 390, MIN_H = 780, MAX_H = 900;
  const SCENE_TOP = 150; // scene y=0 sits 150px below the stage top
  let stageH = MIN_H;

  /* ---------- layout: 390px-wide design canvas; on phones the height follows the screen ---------- */
  function fit() {
    const desk = window.innerWidth >= 700 && window.innerHeight >= 600;
    document.body.classList.toggle('desk', desk);
    let s, H = MIN_H;
    if (desk) {
      s = Math.min(window.innerWidth / (STAGE_W + 80), window.innerHeight / (MIN_H + 90), 1.05);
    } else {
      s = window.innerWidth / STAGE_W;
      H = window.innerHeight / s;
      if (H < MIN_H) { s = window.innerHeight / MIN_H; H = MIN_H; } // short screens: letterbox the sides
      H = Math.min(H, MAX_H);
    }
    stageH = Math.round(H);
    el.stage.style.height = stageH + 'px';
    el.stage.style.transform = `translate(-50%, -50%) translateY(${desk ? -14 : 0}px) scale(${s})`;
    layoutScene();
  }
  function layoutScene() {
    const svg = el.scene && el.scene.querySelector('svg');
    if (!svg) return;
    svg.setAttribute('viewBox', `0 ${-SCENE_TOP} ${STAGE_W} ${stageH}`);
    svg.setAttribute('height', stageH);
    svg.setAttribute('width', STAGE_W);
  }

  G.init = () => {
    el.stage = U.$('#stage');
    el.title = U.$('#screen-title');
    el.level = U.$('#screen-level');
    el.prompt = U.$('#prompt');
    el.scene = U.$('#scene-wrap');
    el.narr = U.$('#narrator');
    el.overlay = U.$('#overlay');
    el.endings = U.$('#endings');
    el.hintBtn = U.$('#btn-hint');
    el.hintCount = U.$('#hint-count');
    el.levelNum = U.$('#level-num');
    el.levelSound = U.$('#btn-level-sound');
    el.fx = U.$('#fx-canvas');
    fit();
    window.addEventListener('resize', fit);
    U.$('#btn-menu').innerHTML = ART.icons.menu;
    el.hintBtn.insertAdjacentHTML('afterbegin', ART.icons.bulb);
    el.hintCount.textContent = hints;
    el.narr.querySelector('.nicon').innerHTML = ART.icons.brain;
    const paintLevelSound = () => {
      if (!el.levelSound) return;
      el.levelSound.innerHTML = A.muted ? ART.icons.soundOff : ART.icons.soundOn;
      el.levelSound.setAttribute('aria-label', A.muted ? 'Sound off' : 'Sound on');
    };
    paintLevelSound();
    A.onMuteChange(paintLevelSound);
    el.levelSound.addEventListener('click', () => {
      A.unlock();
      if (ctx && ctx.alive && !ctx.locked && ctx.onSoundButton && ctx.onSoundButton()) return;
      A.setMuted(!A.muted);
      A.play('tap');
    });
    U.$('#btn-menu').addEventListener('click', () => { A.play('tap'); G.showTitle(); });
    el.hintBtn.addEventListener('click', useHint);
    window.addEventListener('popstate', () => {
      if (!el.level.classList.contains('hidden')) {
        inLevelHistory = false;
        G.showTitle(true);
      }
    });
    window.BF_HANDLE_BACK = () => {
      const to = U.$('#title-overlay');
      if (to && !to.classList.contains('hidden')) {
        A.play('tap');
        to.classList.add('hidden');
        to.innerHTML = '';
        return true;
      }
      if (el.level && !el.level.classList.contains('hidden')) {
        A.play('tap');
        G.showTitle();
        return true;
      }
      return false;
    };
    startBoil();
  };

  /* ---------- line boil: cycle 3 turbulence seeds on visible .boil elements only ---------- */
  function startBoil() {
    if (U.params.get('boil') === '0' || U.reducedMotion()) return;
    let i = 0;
    clearInterval(boilTimer);
    boilTimer = setInterval(() => {
      if (document.hidden || boilPaused) return;
      const scope = el.level.classList.contains('hidden') ? el.title : el.level;
      i = (i + 1) % 3;
      U.$$('.boil', scope).forEach((n) => n.setAttribute('filter', `url(#boil${i})`));
    }, 130);
  }
  G.setBoilPaused = (p) => { boilPaused = !!p; };

  function clearDemos() {
    demoSeq++;
    U.$$('.ghost-hand, .pinch-dot, .tilt-demo, .shake-demo, .flip-demo, .upside-demo, .rock-demo, .hold-demo', el.level).forEach((n) => n.remove());
  }
  function clearTransient() {
    clearDemos();
    U.$$('.stamp', el.level).forEach((n) => n.remove());
    clearTimeout(narrTimer);
    el.narr.classList.remove('show');
    if (el.levelSound) el.levelSound.classList.remove('sound-blast');
    if (confettiRAF) { cancelAnimationFrame(confettiRAF); confettiRAF = 0; }
    if (el.fx) { const c2 = el.fx.getContext('2d'); if (c2) c2.clearRect(0, 0, el.fx.width, el.fx.height); }
  }
  function resetPrompt() {
    el.prompt.onclick = null;
    el.prompt.style.transform = '';
    el.prompt.style.left = '';
    el.prompt.style.top = '';
    el.prompt.style.transition = '';
    el.prompt.classList.remove('prompt-drag', 'prompt-moved');
  }

  /* ---------- screens ---------- */
  G.showTitle = (fromPop) => {
    if (ctx) { ctx.kill(); ctx = null; }
    boilPaused = false;
    clearTransient();
    resetPrompt();
    el.overlay.classList.add('hidden');
    el.overlay.innerHTML = '';
    el.level.classList.add('hidden');
    el.title.classList.remove('hidden');
    if (inLevelHistory && !fromPop) {
      inLevelHistory = false;
      try { history.back(); } catch (e) { /* ignore */ }
    }
    if (G.onTitle) G.onTitle();
  };

  G.startLevel = (def) => {
    level = def;
    U.store.set('bf.level', def.id);
    if (!inLevelHistory) {
      try { history.pushState({ bf: 'level', id: def.id }, ''); inLevelHistory = true; } catch (e) { /* ignore */ }
    }
    el.title.classList.add('hidden');
    el.level.classList.remove('hidden');
    el.levelNum.textContent = def.id;
    renderSlots();
    G.restart(true);
  };

  G.restart = (slam) => {
    if (ctx) ctx.kill();
    boilPaused = false;
    clearTransient();
    resetPrompt();
    el.overlay.classList.add('hidden');
    el.overlay.innerHTML = '';
    hintStage = 0;
    el.hintBtn.classList.remove('pulse');
    el.prompt.innerHTML = level.promptHTML;
    if (slam) { U.replay(el.prompt, 'slam'); A.play('slam'); }
    el.scene.innerHTML = '';
    ctx = makeCtx();
    level.build(ctx);
    layoutScene();
  };

  /* ---------- the context object a level talks to ---------- */
  function makeCtx() {
    const cleanups = [];
    let talkTimer = 0;
    const c = {
      alive: true,
      locked: false,
      attempts: 0,
      root: el.scene,
      promptEl: el.prompt,
      soundBtn: el.levelSound,
      found: () => foundEndings(),
      say: G.say,
      setBoilPaused: G.setBoilPaused,
      onCleanup: (fn) => cleanups.push(fn),
      /** Shared SVG speech bubble for Noodle, with automatic timer cleanup. */
      talk(layer, ax, ay, text, ms = 1800, bias = 0.5) {
        if (!c.alive || !layer) return;
        layer.innerHTML = '';
        const w = Math.max(70, text.length * 8.3 + 28), h = 36;
        const x = U.clamp(ax - w * bias, 8, 382 - w), y = ay - h - 12;
        const tx = U.clamp(ax, x + 14, x + w - 14);
        const g = U.svgEl('g', { class: 'fb-bottom popin' }, layer);
        U.svgEl('path', { d: `M${tx - 8},${y + h - 2} L${tx},${ay} L${tx + 8},${y + h - 2} Z`, fill: '#fff', stroke: '#1B1B2F', 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
        U.svgEl('rect', { x, y, width: w, height: h, rx: 16, fill: '#fff', stroke: '#1B1B2F', 'stroke-width': 3 }, g);
        U.svgEl('rect', { x: tx - 6, y: y + h - 5, width: 12, height: 6, fill: '#fff' }, g);
        const t = U.svgEl('text', { x: x + w / 2, y: y + 23.5, 'text-anchor': 'middle', 'font-family': 'Fredoka, sans-serif', 'font-weight': 600, 'font-size': 15.5, fill: '#1B1B2F' }, g);
        t.textContent = text;
        clearTimeout(talkTimer);
        talkTimer = setTimeout(() => { if (g.parentNode) g.remove(); }, ms);
      },
      /** a "wrong" poke: harmless, but after a few the hint button starts pulsing */
      attempt() {
        c.attempts++;
        if (c.attempts >= 4) el.hintBtn.classList.add('pulse');
      },
      win: (endingId) => win(endingId),
      kill() { c.alive = false; clearTimeout(talkTimer); cleanups.forEach((f) => { try { f(); } catch (e) { /* ignore */ } }); },
      stagePoint: (x, y) => ({ x, y: y + SCENE_TOP }),
      /** client (screen) px → scene coords, for hints that point at HTML (the prompt) */
      sceneFromClient(x, y) {
        const r = el.stage.getBoundingClientRect(), k = r.width / STAGE_W;
        return { x: (x - r.left) / k, y: (y - r.top) / k - SCENE_TOP };
      },
    };
    return c;
  }

  /* ---------- narrator (the Game talking to you) ---------- */
  G.say = (text, ms = 2300) => {
    if (!text) return;
    el.narr.querySelector('.ntext').textContent = text;
    el.narr.classList.toggle('big', text.length > 34);
    el.narr.classList.add('show');
    clearTimeout(narrTimer);
    narrTimer = setTimeout(() => el.narr.classList.remove('show'), ms);
  };

  /* ---------- endings ---------- */
  const key = () => `bf.l${level.id}.found`;
  function foundEndings() {
    const valid = new Set(level.endings.map((e) => e.id));
    return U.store.get(key(), []).filter((id) => valid.has(id));
  }
  function renderSlots(newId) {
    const found = foundEndings();
    el.endings.innerHTML = level.endings.map((e) => {
      const f = found.includes(e.id);
      return `<div class="slot ${f ? 'found' : ''} ${newId === e.id ? 'new' : ''}" title="${f ? e.name : 'Secret ending'}">${f ? ART.stickers[e.icon]('s' + e.id) : ''}</div>`;
    }).join('');
  }

  async function win(endingId) {
    if (!ctx || !ctx.alive) return;
    const myCtx = ctx;
    myCtx.locked = true;
    clearDemos();
    const found = foundEndings();
    const isNew = !found.includes(endingId);
    let bonusBulb = false;
    if (isNew) {
      found.push(endingId);
      U.store.set(key(), found);
      // Secret endings (anything other than the first/main ending) award +1 Hint Bulb!
      if (level.endings[0] && endingId !== level.endings[0].id) {
        hints++;
        U.store.set('bf.hints', hints);
        el.hintCount.textContent = hints;
        bonusBulb = true;
      }
    }
    // Unlock the next level in Chapter 1 progression.
    const nextId = level.id + 1;
    if (BF.levels[nextId] && U.store.get('bf.unlocked', 1) < nextId) {
      U.store.set('bf.unlocked', nextId);
    }
    // Politely invite an Android In-App Review once after clearing Level 6.
    if (level.id === 6 && !U.store.get('bf.reviewAsked6', false)) {
      U.store.set('bf.reviewAsked6', true);
      if (BF.native) BF.native.requestInAppReview();
    }
    renderSlots(isNew ? endingId : null);
    el.hintBtn.classList.remove('pulse');
    A.play('win');
    U.haptic([40, 60, 80]);
    confetti();
    const ed = level.endings.find((x) => x.id === endingId);
    stamp((ed && ed.stamp) || 'AWAKE!');
    await U.wait(1000);
    if (!myCtx.alive) return;
    showCard(endingId, isNew, found, bonusBulb);
  }

  function showCard(endingId, isNew, found, bonusBulb) {
    const e = level.endings.find((x) => x.id === endingId);
    const all = found.length === level.endings.length;
    const isFinalLevel = !BF.levels[level.id + 1];
    const kicker = all ? `ALL ${level.endings.length} ENDINGS FOUND!` : `LEVEL ${level.id} · ENDING ${found.length}/${level.endings.length}`;
    const slots = level.endings.map((x) => found.includes(x.id)
      ? `<div class="bigslot found" title="${x.name}">${ART.stickers[x.icon]('c' + x.id)}</div>`
      : '<div class="bigslot">?</div>').join('');
    el.overlay.innerHTML = `
      <div class="card" role="dialog" aria-label="Ending found">
        <span class="card-kicker">${kicker}</span>
        <div class="sticker">${ART.stickers[e.icon]('big')}</div>
        <h2>${e.name}</h2>
        <p class="quote">“${e.line}”</p>
        ${bonusBulb ? '<div class="bonus-pill">+1 💡 Secret ending bonus!</div>' : ''}
        <p class="rarity">${isNew ? 'New ending! ' : ''}<b>${e.rarity}%</b> of players found this one.</p>
        <div class="slots">${slots}</div>
        <div class="row">
          <button class="btn btn-yellow" id="c-more">${all ? 'Replay' : 'Find more'}</button>
          <button class="btn btn-pink" id="c-next">${isFinalLevel ? 'Finale ▸' : 'Next ▸'}</button>
        </div>
        <button class="btn btn-share" id="c-share">Share this ending</button>
      </div>`;
    el.overlay.classList.remove('hidden');
    U.$('#c-more').onclick = () => { A.play('tap'); G.restart(true); };
    U.$('#c-next').onclick = () => {
      A.play('tap');
      const next = BF.levels[level.id + 1];
      if (next) G.startLevel(next); else showChapter1Finale();
    };
    U.$('#c-share').onclick = () => { A.play('tap'); share(e, found.length); };
  }

  function showChapter1Finale() {
    const p = G.getProgress();
    const missing = Math.max(0, p.maxTotal - p.foundTotal);
    const crownNoodle = `
      <svg viewBox="-100 -122 200 218" xmlns="http://www.w3.org/2000/svg" aria-label="Noodle wearing the golden crown">
        <ellipse cx="0" cy="84" rx="54" ry="9" fill="#1B1B2F" opacity=".14"/>
        <g class="float">${ART.noodle({ y: 8, scale: 0.96, eyes: 'happy', mouth: 'grin', armType: 'up', withLegs: true })}
          <g transform="translate(0,-66) rotate(-6)">
            <path d="M-24,8 L-28,-14 L-10,-2 L0,-20 L10,-2 L28,-14 L24,8 Z" fill="#FFC93C" stroke="#1B1B2F" stroke-width="3.6" stroke-linejoin="round"/>
            <circle cx="-16" cy="-1" r="2.8" fill="#FF5D8F"/><circle cx="0" cy="-5" r="3.2" fill="#5BC0EB"/><circle cx="16" cy="-1" r="2.8" fill="#3DDC97"/>
          </g>
        </g>
      </svg>`;
    A.play('win');
    confetti();
    el.overlay.innerHTML = `
      <div class="card card-finale" role="dialog" aria-label="Chapter 1 Conquered">
        <span class="card-kicker">CHAPTER 1 CONQUERED!</span>
        <div class="finale-hero">${crownNoodle}</div>
        <h2>You Beat Brainflip!</h2>
        <div class="finale-stats">
          <span>${p.foundTotal}/${p.maxTotal} Endings</span>
          <span class="fs-rank">${p.rank}</span>
        </div>
        <div class="finale-cta-box">
          <p>Our tiny indie team is already sketching <b>Chapter 2</b>! Want more tricky levels faster? Rate us &amp; comment <b>“Chapter 2!”</b> on Google Play.</p>
          <button class="btn btn-pink btn-rate" id="f-rate">${ART.icons.star}<span>Rate &amp; Ask for Chapter 2</span></button>
        </div>
        <div class="row">
          <button class="btn btn-yellow" id="f-hunt">${missing > 0 ? `Hunt ${missing} More` : 'Replay Ch. 1'}</button>
          <button class="btn btn-mint" id="f-share">Share Score</button>
        </div>
        <button class="btn" id="f-title" style="width:100%;margin-top:10px;font-size:17px;padding:8px 10px">Back to Home</button>
      </div>`;
    el.overlay.classList.remove('hidden');
    U.$('#f-rate').onclick = () => {
      A.play('pop');
      U.store.set('bf.ratedClick', true);
      if (BF.native) BF.native.openStoreReview();
    };
    U.$('#f-hunt').onclick = () => {
      A.play('tap');
      G.startLevel(BF.levels[missing > 0 ? p.firstIncomplete : 1]);
    };
    U.$('#f-share').onclick = async () => {
      A.play('tap');
      const url = (BF.config && BF.config.storeUrl) || location.href;
      const text = `I conquered Brainflip Chapter 1 (${p.foundTotal}/${p.maxTotal} endings · ${p.rank})! Can you beat Boss Level 15? 🧠👑`;
      const res = BF.native ? await BF.native.share('Brainflip', text, url) : 'failed';
      if (res === 'copied') G.say('Score copied! Paste it to a friend.');
      else if (res === 'failed') G.say('Try sharing on your phone!');
    };
    U.$('#f-title').onclick = () => { A.play('tap'); G.showTitle(); };
  }

  async function share(e, count) {
    const url = (BF.config && BF.config.storeUrl) || location.href;
    const text = `I found the “${e.name}” ending in Brainflip Level ${level.id} (${count}/${level.endings.length}). Can you find all ${level.endings.length}? 🧠`;
    const res = BF.native ? await BF.native.share('Brainflip', text, url) : 'failed';
    if (res === 'copied') G.say('Copied! Paste it to a friend.');
    else if (res === 'failed') G.say('Sharing is unavailable here — try on your phone.');
  }

  /* ---------- hints: text first, then a ghost-hand or sensor demo ---------- */
  function useHint() {
    if (!level || !ctx || ctx.locked) return;
    const found = foundEndings();
    const stages = level.hints(found, ctx);
    const allFound = found.length >= level.endings.length;
    const idx = Math.min(hintStage, stages.length - 1);
    const h = stages[idx];
    const shouldCharge = !allFound && hintStage < stages.length;
    if (shouldCharge) {
      if (hints <= 0) {
        A.play('pop');
        hints = 3;
        U.store.set('bf.hints', hints);
        el.hintCount.textContent = hints;
        G.say('Free Chapter 1 refill (+3 💡)! Tip: secret endings give +1 💡 too.', 3400);
        return;
      }
      hints--; U.store.set('bf.hints', hints); el.hintCount.textContent = hints;
    }
    A.play('hint');
    el.hintBtn.classList.remove('pulse');
    G.say(h.text, 3600);
    clearDemos();
    if (h.demo && level.demo) {
      const path = level.demo(h.demo, ctx);
      if (path && path.tilt) tiltDemo(path.tilt);
      else if (path && path.shake) shakeDemo();
      else if (path && path.flip) flipDemo();
      else if (path && path.upsideDown) upsideDownDemo();
      else if (path && path.rock) rockDemo();
      else if (path && path.landscape) landscapeDemo();
      else if (path && path.hold) holdDemo(path.hold);
      else if (path && path.pinch) pinchDemo(path.pinch);
      else if (path) ghostHand(path);
    }
    hintStage++;
  }

  async function ghostHand(points) {
    const seq = demoSeq;
    const hand = document.createElement('div');
    hand.className = 'ghost-hand';
    hand.innerHTML = ART.icons.hand;
    el.level.appendChild(hand);
    const place = (p) => { hand.style.left = p.x + 'px'; hand.style.top = (p.y + SCENE_TOP) + 'px'; };
    for (let rep = 0; rep < 2 && seq === demoSeq; rep++) {
      place(points[0]);
      await U.wait(30);
      if (seq !== demoSeq) break;
      hand.classList.add('on');
      await U.wait(350);
      for (let i = 1; i < points.length && seq === demoSeq; i++) {
        const a = points[i - 1], b = points[i];
        await U.tween(points.length > 3 ? 160 : 800, (t) => {
          if (seq === demoSeq) place({ x: U.lerp(a.x, b.x, t), y: U.lerp(a.y, b.y, t) });
        }, U.ease.inOutCubic);
      }
      if (seq !== demoSeq) break;
      await U.wait(250);
      hand.classList.remove('on');
      await U.wait(300);
    }
    hand.remove();
  }

  /** hint for zoom puzzles: two fingertips spreading apart */
  async function pinchDemo(p) {
    const seq = demoSeq;
    const dots = [0, 1].map(() => { const d = document.createElement('div'); d.className = 'pinch-dot'; el.level.appendChild(d); return d; });
    for (let rep = 0; rep < 2 && seq === demoSeq; rep++) {
      await U.tween(900, (t) => {
        if (seq !== demoSeq) return;
        dots.forEach((d, i) => {
          const k = (i ? 1 : -1) * (10 + 46 * t);
          d.style.left = (p.x + k * 0.8) + 'px'; d.style.top = (p.y + SCENE_TOP + k * 0.6) + 'px'; d.style.opacity = t < 0.85 ? 1 : (1 - t) * 6;
        });
      }, U.ease.inOutCubic);
      await U.wait(250);
    }
    dots.forEach((d) => d.remove());
  }

  /** hint for hold-down puzzles: pulsing ring + fingertip */
  async function holdDemo(p) {
    const seq = demoSeq;
    const ring = document.createElement('div');
    ring.className = 'hold-demo';
    ring.style.left = p.x + 'px'; ring.style.top = (p.y + SCENE_TOP) + 'px';
    ring.innerHTML = ART.icons.hand;
    el.level.appendChild(ring);
    await U.wait(2600);
    if (seq === demoSeq || ring.parentNode) ring.remove();
  }

  /** hint for sensor puzzles: a phone rocking, shaking, or flipping */
  async function tiltDemo(dir) {
    const d = document.createElement('div');
    d.className = 'tilt-demo';
    d.innerHTML = ART.icons.tilt;
    d.style.setProperty('--dir', dir > 0 ? 1 : -1);
    el.level.appendChild(d);
    await U.wait(2600);
    d.remove();
  }
  async function shakeDemo() {
    const d = document.createElement('div');
    d.className = 'shake-demo';
    d.innerHTML = ART.icons.shake;
    el.level.appendChild(d);
    await U.wait(2200);
    d.remove();
  }
  async function flipDemo() {
    const d = document.createElement('div');
    d.className = 'flip-demo';
    d.innerHTML = ART.icons.flip;
    el.level.appendChild(d);
    await U.wait(2600);
    d.remove();
  }
  async function upsideDownDemo() {
    const d = document.createElement('div');
    d.className = 'upside-demo';
    d.innerHTML = ART.icons.upsideDown;
    el.level.appendChild(d);
    await U.wait(2800);
    d.remove();
  }
  async function rockDemo() {
    const d = document.createElement('div');
    d.className = 'rock-demo';
    d.innerHTML = ART.icons.tilt;
    el.level.appendChild(d);
    await U.wait(2800);
    d.remove();
  }
  async function landscapeDemo() {
    const d = document.createElement('div');
    d.className = 'landscape-demo';
    d.innerHTML = ART.icons.landscape;
    el.level.appendChild(d);
    await U.wait(2600);
    d.remove();
  }

  /* ---------- juice ---------- */
  function stamp(text) {
    const s = document.createElement('div');
    s.className = 'stamp';
    s.textContent = text;
    el.level.appendChild(s);
    setTimeout(() => s.remove(), 1400);
  }

  function confetti() {
    if (confettiRAF) { cancelAnimationFrame(confettiRAF); confettiRAF = 0; }
    const cv = el.fx, c2 = cv.getContext('2d');
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const STAGE_H = stageH;
    cv.width = STAGE_W * dpr; cv.height = STAGE_H * dpr;
    c2.setTransform(dpr, 0, 0, dpr, 0, 0);
    const colors = ['#FFC93C', '#FF5D8F', '#3DDC97', '#5BC0EB', '#FF6B35', '#ffffff'];
    const parts = Array.from({ length: 90 }, () => ({
      x: STAGE_W / 2 + U.rand(-40, 40), y: 330, vx: U.rand(-7, 7), vy: U.rand(-13, -4),
      w: U.rand(7, 13), h: U.rand(4, 8), r: U.rand(0, 6), vr: U.rand(-0.3, 0.3), c: U.pick(colors),
    }));
    const t0 = performance.now();
    (function frame(now) {
      const t = now - t0;
      c2.clearRect(0, 0, STAGE_W, STAGE_H);
      parts.forEach((p) => {
        p.vy += 0.38; p.vx *= 0.985; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        c2.save(); c2.translate(p.x, p.y); c2.rotate(p.r);
        c2.fillStyle = p.c; c2.strokeStyle = '#1B1B2F'; c2.lineWidth = 1.6;
        c2.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); c2.strokeRect(-p.w / 2, -p.h / 2, p.w, p.h);
        c2.restore();
      });
      if (t < 2600) confettiRAF = requestAnimationFrame(frame);
      else { confettiRAF = 0; c2.clearRect(0, 0, STAGE_W, STAGE_H); }
    })(t0);
  }
  G.confetti = confetti;
  G.stamp = stamp;
})(window.BF);
