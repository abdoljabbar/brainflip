# Brainflip v1.0 — Google Play Launch Guide

This guide has everything ready to copy-paste and publish **Brainflip (Chapter 1: Levels 1–15)** on Google Play cleanly, with zero ads and a compliant **“Rate & Ask for Chapter 2”** review funnel.

---

## 1. Host Privacy Policy (Free, 2 Minutes)

1. Push this repo to GitHub.
2. In GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / `/docs`**.
3. Your live Privacy Policy URL becomes:
   `https://<your-github-username>.github.io/<repo-name>/privacy.html`
4. Update `PRIVACY_URL` in `prototype/js/core/config.js` to match that exact URL before building your final `.aab`.

---

## 2. Generate Your Permanent Upload Keystore (One-Time)

Run this once locally and **back up `upload-keystore.jks` + passwords in 2 safe places** (if you lose it, updating the app requires a Google Play key reset):

```bash
keytool -genkeypair -v -storetype PKCS12 \
  -keystore upload-keystore.jks \
  -alias brainflip-upload \
  -keyalg RSA -keysize 2048 -validity 10000
```

Encode it for GitHub Actions:

```bash
base64 -w 0 upload-keystore.jks > keystore.b64
```

Add these 4 **Repository Secrets** in GitHub (**Settings → Secrets and variables → Actions**):

| Secret Name | Value |
| --- | --- |
| `BF_KEYSTORE_BASE64` | Contents of `keystore.b64` (delete `keystore.b64` afterward!) |
| `BF_STORE_PASSWORD` | Your keystore password |
| `BF_KEY_ALIAS` | `brainflip-upload` |
| `BF_KEY_PASSWORD` | Your key password |

---

## 3. Build Signed `.aab` Automatically (GitHub Actions)

1. Go to GitHub → **Actions → Build Android Release (AAB) → Run workflow** (or push a tag like `git tag v1.0.0 && git push --tags`).
2. Download the artifact **`brainflip-playstore-aab`** → `app-release.aab`.
3. Upload `app-release.aab` directly to **Google Play Console**.

> **Package ID safety note:** The default package ID is `com.brainflip.game` (no public Google Play app currently uses it). If Play Console ever says `com.brainflip.game` is reserved by a private draft, swap `com.brainflip.game` to e.g. `com.brainflip.noodle` in:
> 1. `capacitor.config.json` (`appId`)
> 2. `android/app/build.gradle` (`applicationId`)
> 3. `android/app/src/main/res/values/strings.xml` (`package_name`, `custom_url_scheme`)
> 4. `prototype/js/core/config.js` (`APP_ID`)

---

## 4. Store Listing (Copy-Paste ASO)

- **App Name (30 chars max):** `Brainflip: Tricky Brain Puzzle`
- **Short Description (80 chars max):**
  `Shake, flip & pinch your phone to solve tricky puzzles. Find all 45 endings!`
- **Full Description:**
  ```text
  Think outside the screen!

  In Brainflip, YOUR PHONE is part of every puzzle. Shake it, tilt it, flip it upside down, turn down the volume, plug in your real charger, or drag the UI itself to outsmart 15 hilarious, hand-drawn brain teasers!

  WHAT MAKES BRAINFLIP DIFFERENT?
  • 3 ENDINGS IN EVERY LEVEL (45 Total!) — Don’t just beat a level once. Hunt down 2 secret endings per stage with unique animations and stickers.
  • REAL PHONE VERBS — Shake, tilt, pinch, rotate, flip face-down, upside-down gravity, real charging cable, real calendar, and fourth-wall UI tricks.
  • ZERO FORCED ADS IN CHAPTER 1 — Play the entire 15-level Home Sweet Home chapter and the multi-step Final Boss without annoying pop-ups.
  • FUNNY REACTIONS EVERYWHERE — Every wrong tap gets a cheeky joke from Noodle or the mischievous narrator.
  • OFFLINE & TINY (~4 MB) — Instant load, crisp hand-drawn Doodle-Pop art, playable anywhere.

  Can you beat Boss Level 15 and unlock all 45 endings?
  Finish Chapter 1 and leave a review if you want Chapter 2!
  ```
- **Category:** Games → Puzzle
- **Tags:** Puzzle, Brain Teasers, Offline, Single player, Casual

---

## 5. Required Play Console Graphics

- **App Icon:** `512 × 512` PNG (32-bit, no transparency outside rounded frame — Doodle-Pop surprised upside-down Noodle on hot pink/yellow).
- **Feature Graphic (Mandatory):** `1024 × 500` PNG — Noodle waving beside bold `BRAINFLIP` logo + `"Think outside the screen."`.
- **Phone Screenshots (4–8 vertical `1080 × 1920`):**
  1. Level 1 (`SHAKE OR DRAG THE SUN!`)
  2. Level 4 (`DRAG THE TEXT ITSELF!`)
  3. Level 5 (`FLIP YOUR PHONE UPSIDE DOWN!`)
  4. Level 10 (`PLUG IN YOUR REAL CHARGER!`)
  5. Level 13 (`TWIST WITH TWO FINGERS!`)
  6. Boss Level 15 (`3-STEP FINAL BOSS!`)
  7. Ending Card (`45 SECRET ENDINGS TO FIND!`)

---

## 6. Play Console Forms (Exact Answers for v1.0)

- **App Access:** All functionality is available without special access (no login).
- **Ads:** **No, my app does not contain ads** (remember to flip this to *Yes* in any future update that adds AdMob!).
- **Content Rating (IARC):** All answers *No* (no violence, language, gambling, user-generated chat) → **Everyone / PEGI 3**.
- **Target Audience:** Select **`13–15`, `16–17`, `18+`** (do **not** select under-13 unless you intend to comply with Google Play’s Families Policy!).
- **Data Safety:**
  - *Does your app collect or share any of the required user data types?* → **No** (v1.0 has zero analytics, zero ads, zero servers; all progress is local-only!).
  - *Privacy Policy URL:* Paste your live `privacy.html` URL.

---

## 7. 14-Day Closed Testing (Personal Accounts)

1. Create a **Closed Testing** track and upload `app-release.aab`.
2. Recruit **20–25 testers** (above Google’s 12-tester minimum so dropouts don’t reset the 14-day clock).
3. Ask testers to open the game across multiple days and test:
   - Shake, tilt, upside-down flip, landscape rotation
   - Level 8 & 15 volume-down / sound mute
   - Level 10 real charger plug-in
   - Level 11 leaving & returning to the app
   - Chapter 1 Finale → **Rate & Ask for Chapter 2** button
4. After 14 continuous days → Apply for **Production Access** → Publish!
