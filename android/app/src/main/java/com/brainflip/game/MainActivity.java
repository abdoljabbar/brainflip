package com.brainflip.game;

import android.content.ActivityNotFoundException;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.Uri;
import android.os.BatteryManager;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import androidx.activity.OnBackPressedCallback;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.getcapacitor.BridgeActivity;
import com.google.android.play.core.review.ReviewInfo;
import com.google.android.play.core.review.ReviewManager;
import com.google.android.play.core.review.ReviewManagerFactory;

/** Full-screen, portrait game shell around the web build. */
public class MainActivity extends BridgeActivity {
    private BroadcastReceiver powerReceiver = null;
    private Boolean lastCharging = null;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        if (getBridge() != null && getBridge().getWebView() != null) {
            WebView wv = getBridge().getWebView();
            wv.setBackgroundColor(0xFFFFF4E0);
            wv.setOverScrollMode(android.view.View.OVER_SCROLL_NEVER);
            wv.addJavascriptInterface(new BrainflipBridge(), "BF_ANDROID");
        }
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                WebView wv = getBridge() != null ? getBridge().getWebView() : null;
                if (wv == null) { finish(); return; }
                wv.evaluateJavascript("window.BF_HANDLE_BACK ? window.BF_HANDLE_BACK() : false", value -> {
                    if (!"true".equals(value)) {
                        runOnUiThread(() -> finish());
                    }
                });
            }
        });
        hideSystemBars();
        startPowerBridge();
    }

    /** Native JS bridge exposed as window.BF_ANDROID for Play Store review, external links & native share. */
    public class BrainflipBridge {
        @JavascriptInterface
        public void openStoreReview() {
            runOnUiThread(() -> {
                String pkg = getPackageName();
                try {
                    Intent market = new Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=" + pkg));
                    market.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY | Intent.FLAG_ACTIVITY_NEW_DOCUMENT | Intent.FLAG_ACTIVITY_MULTIPLE_TASK);
                    startActivity(market);
                } catch (ActivityNotFoundException e) {
                    Intent web = new Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=" + pkg));
                    startActivity(web);
                }
            });
        }

        @JavascriptInterface
        public void requestInAppReview() {
            runOnUiThread(() -> {
                try {
                    ReviewManager manager = ReviewManagerFactory.create(MainActivity.this);
                    manager.requestReviewFlow().addOnCompleteListener(task -> {
                        if (task.isSuccessful()) {
                            ReviewInfo info = task.getResult();
                            manager.launchReviewFlow(MainActivity.this, info);
                        }
                    });
                } catch (Exception ignored) {
                    // Review flow is best-effort and quota-managed by Google Play.
                }
            });
        }

        @JavascriptInterface
        public void openExternal(String url) {
            if (url == null || !url.startsWith("https://")) return;
            runOnUiThread(() -> {
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
                } catch (Exception ignored) { /* no browser installed */ }
            });
        }

        @JavascriptInterface
        public void shareText(String title, String text) {
            if (text == null || text.isEmpty()) return;
            runOnUiThread(() -> {
                try {
                    Intent send = new Intent(Intent.ACTION_SEND);
                    send.setType("text/plain");
                    send.putExtra(Intent.EXTRA_SUBJECT, title != null ? title : "Brainflip");
                    send.putExtra(Intent.EXTRA_TEXT, text);
                    startActivity(Intent.createChooser(send, title != null ? title : "Share Brainflip"));
                } catch (Exception ignored) { /* ignore */ }
            });
        }
    }

    /**
     * Forwards real charging state to the web game (Level 10 needs it).
     * Android's WebView exposes no Battery Status API, so the native side does the listening.
     * The initial reading is sent too: the JS layer only reacts to *transitions*, so it can
     * remember the baseline without auto-winning.
     */
    private void startPowerBridge() {
        if (powerReceiver != null) return;
        powerReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                int status = intent.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
                boolean charging = status == BatteryManager.BATTERY_STATUS_CHARGING
                        || status == BatteryManager.BATTERY_STATUS_FULL;
                if (lastCharging != null && lastCharging == charging) return;
                lastCharging = charging;
                WebView wv = getBridge() != null ? getBridge().getWebView() : null;
                if (wv != null) {
                    wv.evaluateJavascript("window.BF_NATIVE_CHARGING && window.BF_NATIVE_CHARGING(" + charging + ")", null);
                }
            }
        };
        IntentFilter filter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
        Intent sticky = registerReceiver(powerReceiver, filter);
        powerReceiver.onReceive(this, sticky); // baseline reading (also re-sent by the system)
    }

    @Override
    public void onDestroy() {
        if (powerReceiver != null) {
            try { unregisterReceiver(powerReceiver); } catch (IllegalArgumentException e) { /* already gone */ }
            powerReceiver = null;
        }
        super.onDestroy();
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_VOLUME_DOWN) {
            WebView wv = getBridge() != null ? getBridge().getWebView() : null;
            if (wv != null) {
                wv.evaluateJavascript("window.BF_VOLUME_DOWN && window.BF_VOLUME_DOWN()", null);
            }
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) hideSystemBars();
    }

    private void hideSystemBars() {
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        WindowInsetsControllerCompat c = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        c.hide(WindowInsetsCompat.Type.systemBars());
        c.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
    }
}
