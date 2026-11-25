/* Brainflip — release config & native Android bridge helpers. */
(function (BF) {
  'use strict';

  const APP_ID = 'com.brainflip.game';
  const STORE_URL = `https://play.google.com/store/apps/details?id=${APP_ID}`;
  // Replace with your live hosted Privacy Policy URL (docs/privacy.html on GitHub Pages) before Play Store upload.
  const PRIVACY_URL = 'https://brainflip.game/privacy.html';

  BF.config = {
    appId: APP_ID,
    version: '1.0.0',
    chapterName: 'Home Sweet Home',
    storeUrl: STORE_URL,
    privacyUrl: PRIVACY_URL,
    // Set to true automatically by `node tools/bundle.mjs --prod` for Google Play builds.
    isProd: Boolean(window.BF_PROD),
  };

  /** Safe bridge to native Android MainActivity methods (falls back cleanly on web/desktop). */
  BF.native = {
    isAndroidApp() {
      return Boolean(window.BF_ANDROID && typeof window.BF_ANDROID.openStoreReview === 'function');
    },
    openStoreReview() {
      try {
        if (window.BF_ANDROID && window.BF_ANDROID.openStoreReview) {
          window.BF_ANDROID.openStoreReview();
          return true;
        }
      } catch (e) { /* fallback to web */ }
      try { window.open(STORE_URL, '_blank', 'noopener'); } catch (e) { /* ignore */ }
      return false;
    },
    requestInAppReview() {
      try {
        if (window.BF_ANDROID && window.BF_ANDROID.requestInAppReview) {
          window.BF_ANDROID.requestInAppReview();
          return true;
        }
      } catch (e) { /* ignore */ }
      return false;
    },
    openExternal(url) {
      try {
        if (window.BF_ANDROID && window.BF_ANDROID.openExternal) {
          window.BF_ANDROID.openExternal(url);
          return true;
        }
      } catch (e) { /* fallback to web */ }
      try { window.open(url, '_blank', 'noopener'); } catch (e) { /* ignore */ }
      return false;
    },
    async share(title, text, url) {
      const full = url ? `${text}\n${url}` : text;
      try {
        if (window.BF_ANDROID && window.BF_ANDROID.shareText) {
          window.BF_ANDROID.shareText(title, full);
          return 'native';
        }
      } catch (e) { /* fallback to web share */ }
      try {
        if (navigator.share) {
          await navigator.share({ title, text, url });
          return 'web';
        }
      } catch (err) {
        if (err && err.name === 'AbortError') return 'cancelled';
      }
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(full);
          return 'copied';
        }
      } catch (e) { /* ignore */ }
      return 'failed';
    },
  };
})(window.BF);
