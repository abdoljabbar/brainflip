# Keep WebView @JavascriptInterface bridge methods for Brainflip
-keepattributes JavascriptInterface
-keepclassmembers class com.brainflip.game.MainActivity$BrainflipBridge {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep Capacitor bridge classes and plugins
-keep class com.getcapacitor.** { *; }
-keep class com.brainflip.game.MainActivity { *; }

# Keep Google Play Core Review API classes
-keep class com.google.android.play.core.review.** { *; }
-keep class com.google.android.play.core.common.** { *; }
