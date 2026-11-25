/* Brainflip — boot, title screen, progression & settings. */
(function (BF) {
  'use strict';
  const U = BF.U, A = BF.audio, I = BF.input, G = BF.game, ART = BF.art;
  const isDev = () => !(BF.config && BF.config.isProd) && U.params.get('dev') === '1';
  let toastTimer = 0;

  function showTitleToast(msg) {
    const el = U.$('#title-toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2100);
  }

  function openSettings(onReset) {
    const ov = U.$('#title-overlay');
    if (!ov) return;
    let armedReset = false;
    const render = () => {
      const cfg = BF.config || { version: '1.0.0', privacyUrl: '' };
      ov.innerHTML = `
        <div class="card" role="dialog" aria-label="Settings">
          <span class="card-kicker">SETTINGS</span>
          <h2 style="font-size:32px;margin:8px 0 4px">Brainflip</h2>
          <div class="settings-list">
            <button class="btn btn-yellow" id="set-sound">Sound Effects: ${A.muted ? 'OFF' : 'ON'}</button>
            <button class="btn btn-pink btn-rate" id="set-rate">${ART.icons.star}<span>Rate &amp; Ask for Chapter 2</span></button>
            <button class="btn" id="set-privacy">Privacy Policy</button>
            <button class="btn btn-danger" id="set-reset">${armedReset ? 'Tap again to confirm reset!' : 'Reset Progress'}</button>
          </div>
          <button class="btn btn-mint" id="set-close" style="width:100%;font-size:20px">Done</button>
          <p class="settings-ver">Version ${cfg.version} · Chapter 1 (Home Sweet Home)</p>
        </div>`;
      ov.classList.remove('hidden');

      U.$('#set-sound').onclick = () => {
        A.unlock(); A.setMuted(!A.muted); A.play('tap');
        render();
      };
      U.$('#set-rate').onclick = () => {
        A.play('pop');
        if (BF.native) BF.native.openStoreReview();
      };
      U.$('#set-privacy').onclick = () => {
        A.play('tap');
        if (BF.native && cfg.privacyUrl) BF.native.openExternal(cfg.privacyUrl);
      };
      U.$('#set-reset').onclick = () => {
        if (!armedReset) {
          A.play('bonk');
          armedReset = true;
          render();
          return;
        }
        A.play('pop');
        U.store.clear('bf.');
        G.refreshHints();
        ov.classList.add('hidden');
        ov.innerHTML = '';
        if (onReset) onReset();
        showTitleToast('Progress reset!');
      };
      U.$('#set-close').onclick = () => {
        A.play('tap');
        ov.classList.add('hidden');
        ov.innerHTML = '';
      };
    };
    ov.onclick = (e) => {
      if (e.target === ov) { A.play('tap'); ov.classList.add('hidden'); ov.innerHTML = ''; }
    };
    render();
  }

  function buildTitle() {
    // logo: BRAIN / FLIP (FLIP hangs upside down until you tap it)
    const letters = (word, delay) => word.split('').map((c, i) => `<span class="ch" style="animation-delay:${(delay + i * 0.12).toFixed(2)}s">${c}</span>`).join('');
    U.$('#logo').innerHTML =
      `<span class="logo-row">${letters('BRAIN', 0)}</span>` +
      `<span class="logo-row"><span class="logo-flip" id="logo-flip" role="button" aria-label="Flip the logo">${letters('FLIP', 0.6)}</span></span>`;

    U.$('#title-hero').innerHTML =
      `<svg viewBox="-115 -125 230 250" xmlns="http://www.w3.org/2000/svg" aria-label="Noodle waving">
        <ellipse cx="0" cy="104" rx="62" ry="10" fill="#1B1B2F" opacity=".12"/>
        <g class="float"><g class="boil">${ART.noodle({ y: 20, scale: 1.05, eyes: 'open', mouth: 'grin', armType: 'wave', withLegs: true })}</g></g>
      </svg>`;

    // background doodles: question marks, sparkles, squiggles
    const INK = '#1B1B2F';
    const q = (x, y, r, s, c) => `<g transform="translate(${x},${y}) rotate(${r}) scale(${s})"><text font-family="Lilita One, sans-serif" font-size="46" fill="${c}" stroke="${INK}" stroke-width="3" paint-order="stroke" text-anchor="middle">?</text></g>`;
    const spark = (x, y, s, c) => `<path transform="translate(${x},${y}) scale(${s})" d="M0,-12 Q0,0 12,0 Q0,0 0,12 Q0,0 -12,0 Q0,0 0,-12 Z" fill="${c}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`;
    U.$('#title-doodles').innerHTML =
      `<svg viewBox="0 0 390 780" width="390" height="780" xmlns="http://www.w3.org/2000/svg">
        ${q(42, 92, -18, 1, '#5BC0EB')}${q(350, 236, 16, .8, '#3DDC97')}${q(36, 470, 10, .7, '#FF6B35')}${q(356, 560, -12, 1, '#FFC93C')}
        ${spark(330, 70, 1, '#FFC93C')}${spark(62, 300, .8, '#FF5D8F')}${spark(320, 420, .7, '#5BC0EB')}${spark(70, 640, .9, '#3DDC97')}
        <path d="M290,700 q10,-12 20,0 t20,0 t20,0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
        <path d="M24,200 q8,-10 16,0 t16,0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
      </svg>`;

    const flip = U.$('#logo-flip');
    let flipT = 0;
    flip.addEventListener('click', () => {
      A.unlock(); A.play('whoosh');
      flip.classList.add('unflipped');
      clearTimeout(flipT);
      flipT = setTimeout(() => { flip.classList.remove('unflipped'); A.play('swish'); }, 1300);
    });

    const snd = U.$('#btn-sound');
    const paintSound = () => { snd.innerHTML = A.muted ? ART.icons.soundOff : ART.icons.soundOn; snd.setAttribute('aria-label', A.muted ? 'Sound off' : 'Sound on'); };
    paintSound();
    A.onMuteChange(paintSound);
    snd.addEventListener('click', () => { A.unlock(); A.setMuted(!A.muted); A.play('tap'); });

    const setBtn = U.$('#btn-settings');
    if (setBtn) {
      setBtn.innerHTML = ART.icons.gear;
      setBtn.addEventListener('click', () => { A.unlock(); A.play('tap'); openSettings(paintPick); });
    }

    const start = async (n) => {
      A.unlock();
      A.play('tap');
      await I.requestMotion(); // iOS asks here, inside the tap
      G.startLevel(BF.levels[n] || BF.levels[1]);
    };

    const pick = U.$('#level-pick');
    const statsEl = U.$('#title-stats');
    const playBtn = U.$('#btn-play');

    const paintPick = () => {
      const p = G.getProgress();
      const devAll = isDev();
      const cur = U.clamp(U.store.get('bf.level', p.unlocked), 1, devAll ? p.maxLevel : p.unlocked);
      if (statsEl) {
        statsEl.innerHTML = `<span>${p.foundTotal}/${p.maxTotal} Endings</span><span class="ts-rank">${p.rank}</span>`;
      }
      if (playBtn) {
        playBtn.textContent = p.foundTotal > 0 ? `PLAY · LV ${cur}` : 'PLAY';
      }
      pick.innerHTML = p.ids.map((n) => {
        const def = BF.levels[n], valid = new Set(def.endings.map((e) => e.id));
        const found = U.store.get(`bf.l${n}.found`, []).filter((id) => valid.has(id));
        const locked = !devAll && n > p.unlocked;
        if (locked) {
          return `<button class="btn locked" data-n="${n}" data-locked="1" aria-label="Level ${n} locked"><span>Lv ${n}</span><span class="lp-lock">${ART.icons.lock}</span></button>`;
        }
        const dots = def.endings.map((e) => `<span class="lp-dot ${found.includes(e.id) ? 'f' : ''}"></span>`).join('');
        return `<button class="btn ${n === cur ? 'on' : ''}" data-n="${n}"><span>Lv ${n}</span><span class="lp-dots">${dots}</span></button>`;
      }).join('');
    };

    playBtn.addEventListener('click', () => {
      const p = G.getProgress();
      const cur = U.clamp(U.store.get('bf.level', p.unlocked), 1, isDev() ? p.maxLevel : p.unlocked);
      start(cur);
    });
    paintPick();
    pick.addEventListener('click', (e) => {
      const b = e.target.closest('[data-n]');
      if (!b) return;
      if (b.dataset.locked === '1') {
        A.unlock(); A.play('bonk'); U.haptic(25);
        U.replay(b, 'wiggle');
        const p = G.getProgress();
        showTitleToast(`Beat Level ${p.unlocked} to unlock more!`);
        return;
      }
      start(Number(b.dataset.n));
    });
    G.onTitle = paintPick;
  }

  function devMode() {
    // ?dev=1 (non-prod only) → keyboard shortcuts for desktop QA
    if (!isDev()) return;
    window.addEventListener('keydown', (e) => {
      const k = e.key.toLowerCase();
      if (k === 's') I.simulateShake();
      if (k === 'f') I.simulateFlip();
      if (k === 'u') I.simulateUpsideDown('debug');
      if (k === 'b') I.simulateBlow('debug');
      if (k === 'm') I.simulateVolumeDown('debug');
      if (k === 'l') I.simulateLandscape(1);
      if (k === 'c') I.simulateCharging(true);
      if (k === 'v') I.simulateAppReturn(5000);
      if (e.key === 'ArrowRight') I.simulateTilt(Math.min(80, (I.tilt || 0) + 10));
      if (e.key === 'ArrowLeft') I.simulateTilt(Math.max(-80, (I.tilt || 0) - 10));
      if (e.key === 'ArrowDown') I.simulateTilt(0);
      if (k === 'r') G.restart(true);
      if (k === 't') G.showTitle();
    });
  }

  function boot() {
    const prod = Boolean(BF.config && BF.config.isProd);
    if (!prod && U.params.get('reset') === '1') U.store.clear('bf.');
    G.init();
    buildTitle();
    devMode();
    if (!prod) {
      const lv = Number(U.params.get('level') || 0);
      if (U.params.get('skip') === '1' || lv) G.startLevel(BF.levels[lv] || BF.levels[1]);
    }
    window.BF_READY = true;
  }

  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, U.wait(1500)]).then(boot);
})(window.BF);
