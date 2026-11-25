# Brainflip — prototype (Chapter 1: Levels 1–15)

*Tricky phone puzzles where the phone itself is part of the puzzle. Think outside the screen.*

## شروع سریع (فارسی)

- فایل `dist/brainflip-level1.html` را در Chrome باز کن (همه‌چیز داخل همین یک فایل است).
- برای تست «تکان دادن گوشی»، همین فایل را روی یک آدرس https بگذار (مثلاً Netlify Drop یا GitHub Pages) و با گوشی باز کن. روی دسکتاپ، تخت را بگیر و سریع چپ‌وراست تکان بده؛ همان پایان باز می‌شود.
- برای تست روی دسکتاپ: `?dev=1` به آخر آدرس اضافه کن؛ کلید `S` = تکان، `F` = برگرداندن رو به پایین (`Flip`)، `U` = وارونه کردن (`Upside Down`)، `B` = فوت کردن (`Blow`)، `M` = قطع صدا (`Volume Down`)، `←/→/↓` = کج کردن، `R` = شروع دوباره، `T` = صفحهٔ اول.

## What's in Level 1 — "Wake him up!"

| Ending | How | Verb taught |
| --- | --- | --- |
| **Rise & Shine** (main) | Drag the sleepy sun up from behind the hill | drag |
| **Earthquake Alarm** (secret) | Shake the phone — or grab the bed and wiggle it fast | shake |
| **Cold Feet** (secret) | Pull the blanket off | drag |

## Level 2 — "Pour him some tea!"

| Ending | How | Verb taught |
| --- | --- | --- |
| **Tea Time** (main) | Tilt the phone right so the teapot pours; straighten it once the cup is full | tilt |
| **Overflow** (secret) | Keep pouring after the cup is full | tilt + timing |
| **Sugar Rush** (secret) | Drag three sugar cubes from the bowl into Noodle's mouth | drag |

Clues: the hanging lamp always points at real "down", and the poster says KEEP CALM AND TILT ON. Without motion sensors (desktop, sandboxed browsers) the teapot can be dragged instead. Dev keys: ← / → tilt, ↓ level.

## Level 3 — "Find the hidden cat"

| Ending | How | Verb taught |
| --- | --- | --- |
| **Tiny Kitty** (main) | Pinch-zoom into the tiniest painting on the wall (desktop: scroll or double-click) | zoom |
| **Purr-ompt** (secret) | The "a" in "cat" has tiny ears: tap it, the cat jumps out of the sentence | read the UI |
| **Tuna Time** (secret) | Drag the tuna can off the shelf onto the floor; the cat comes out of the wiggling box | drag + wait |

Decoys: the dog portrait, the cat-shaped cushion, the striped "tail" behind the sofa (a scarf).

## Level 4 — "Turn off the light!"

| Ending | How | Verb taught |
| --- | --- | --- |
| **Hidden Switch** (main) | Drag the `"Turn off the light!"` prompt banner aside to uncover and tap the real wall switch | drag UI |
| **Brain Flip!** (secret) | Flip the phone face-down (desktop without sensors: hold the glowing bulb down to smother it) | flip |
| **Out of Sight** (secret) | Drag the sleep mask from the nightstand onto Noodle's eyes — the light stays ON | drag |

Decoys: a "useless machine" wall switch that flips itself back on (then falls off), a super-glued power plug, an orbiting moth, and a midnight window. Dev key: **F** flip.

## Level 5 — "Get the cookie jar!"

| Ending | How | Verb taught |
| --- | --- | --- |
| **Brainflip!** (main) | Turn your phone completely upside down so gravity flips and the jar & Noodle meet at the ceiling (desktop/no-sensor: drag or double-tap the `"THIS SIDE UP"` sign upside down, or dev key **U**) | upside-down flip |
| **Bookworm Tower** (secret) | Stack all 3 heavy books under the shelf so Noodle climbs up and grabs the jar | stack / drag |
| **Loose Shelf** (secret) | Unscrew both bolts under the high shelf so it collapses and drops the jar right into Noodle's arms | inspect / tap |

Decoys: Noodle jumping futilely, bolted kitchen cabinet, kitchen clock, mouse hole, height ruler. (Note: `"Shhh! Baby's asleep!"` is preserved in `prototype/js/levels/level08.js` per GDD v0.1 Chapter 1 order.)

## Level 6 — "How many sheep?"

| Ending | How | Verb taught |
| --- | --- | --- |
| **Slow-Mo Counter** (main) | Hold your finger down on the sky/meadow to enter Slow-Mo, then tap all 5 real jumping sheep directly (taps at normal speed don't count!) | hold + tap |
| **Wolf in Wool** (secret) | While in Slow-Mo, spot & tap Jumper #4 — the sneaky wolf disguised in wool — to unmask the impostor! | hold + observe |
| **Sneaky Sheep** (secret) | Discover & tap the sleepy hidden sheep behind the `"How many sheep?"` prompt banner (drag the banner aside or tap its peeking pink nightcap) | inspect UI |

Decoys: sleepy Noodle in pajamas, smiling moon, drifting clouds, wooden pasture fence, and normal-speed supersonic blurry sheep.

## Level 7 — "Make him sneeze!" (sunny kitchen table)

Noodle sits at the kitchen table clutching a tissue, agonizingly stuck on the edge of a sneeze ("Ah… ah… nope!").

| Ending | How | Verb taught |
| --- | --- | --- |
| **Pepper Storm** (main) | Drag the black **PEPPER** (`P`) shaker over Noodle's nose and shake your phone (or wiggle the shaker fast back-and-forth!) | drag + shake |
| **Bright Idea!** (secret) | Pull the striped kitchen window **roller blinds** all the way up so Brainflip's grinning Sun blasts sunlight into Noodle's eyes (Photic Sneeze Reflex!) | pull / light |
| **1998 Dust Storm** (secret) | Scrub or tap the cobwebbed top-right **1998 kitchen shelf** 3 times — or tap the revealed mic button and blow (dev key **B**) | blow / scrub |

Decoys: fluffy pink feather duster (only makes him giggle!), white **SALT** (`S`) shaker ("Wrong shaker, chef!"), steaming soup bowl, pop-up tissue box, swinging ceiling lamp, ticking wall clock, tapping the blinds for a peek, and shaking the phone before moving the pepper over Noodle.

## Level 8 — "Shhh! Baby's asleep!"

| Ending | How | Verb taught |
| --- | --- | --- |
| **Dead Silent** (main) | Tap the game's own Sound button (or press the phone's volume-down key on Android) to mute the blasting boombox | system mute |
| **Window Toss** (secret) | Open the window, then drag the boombox right out into the night | drag + order |
| **Rock-a-Bye** (secret) | Rock the cradle gently (or rock the whole phone slowly — shaking wakes the baby!) | gentle rock |

Decoys: welded volume dial, jammed power button, battery-powered boombox (no cord to unplug), cuckoo clock, hanging mobile, duck.

## Level 9 — "Stop the rain!" (indoors, cozy living room)

It is 100% sunny outside Noodle's living room window, yet a single grumpy personal storm cloud has moved indoors right over his armchair — soaking his rug, his inside-out umbrella, and filling a living-room puddle where a rubber duck is thriving.

| Ending | How | Verb taught |
| --- | --- | --- |
| **Sideways Exit** (main) | Turn the phone **sideways (landscape)** — gravity drags the indoor storm cloud out of the room (desktop/no-sensor fallback: swing the framed **HOME** spirit-level on the right wall 90° sideways, or dev key **L**) | rotate phone |
| **Storm Vacuumed** (secret) | Drag the retro living-room **Vacuum Cleaner nozzle** straight up onto the rain cloud to suck the entire storm into the dust bag | drag appliance |
| **Two-Hand Eviction** (secret) | Put **two fingers on the cloud** and push them together in one direction (desktop: scroll wheel on the cloud) | two-finger push |

Decoys: tapping or 1-finger dragging the cloud makes it rain **harder**, inside-out pink umbrella, sunny outdoor window, overflowing floor bucket, thriving potted fern, and a delighted rubber duck in the living-room puddle.

## Level 10 — "His phone is at 1%!" (late-night couch crisis)

Noodle is in the middle of a final boss fight on the couch with 1% battery left. There *is* a charger plugged into the left wall — except the cord is two painful inches too short to reach the couch, and moving Noodle kills his Wi-Fi.

| Ending | How | Verb taught |
| --- | --- | --- |
| **Real Outlet** (main) | Plug your **real phone** into a charger — a surge cable shoots up from the bottom edge of the screen! Only reacts to the transition into charging (dev key **C** simulates it) | real charging |
| **Portable Outlet** (secret) | Grab the loose, crooked **wall outlet** and drag it across the wall (trailing live wires!) so the short charger cord reaches Noodle's phone | drag wall / physics |
| **Hamster Power** (secret) | Drag Noodle's steaming **Turbo Espresso** mug over to Bolt, the sleeping hamster in the dynamo wheel | multi-step drag |

Decoys: pulling the charger cord taut (2 inches short, rattles the outlet!), trying to drag Noodle closer (loses Wi-Fi!), a dead `0%` power bank on the side table, manually spinning the hamster wheel (0.2V spark), Wi-Fi router, stormy night window, poster, cactus, and sofa.

Note: the real-charging ending only fires on the *transition* into charging, so a phone that was already on a charger (or a plugged-in laptop) never auto-wins the level.

## Level 11 — "Wait for sunrise!" (midnight bedroom window nook)

Noodle sits on his cozy window bench at `11:55 PM` waiting for sunrise (`6:00 AM`). There is no skip-time button anywhere.

| Ending | How | Verb taught |
| --- | --- | --- |
| **Back By Dawn** (main) | Leave the app or switch to another tab for ≥1 second and come back (`visibilitychange`, dev key **V**) — morning arrives while you were away | leave & return |
| **Pure Patience** (secret) | Do **literally nothing** for 15 seconds — stay hands-off and watch night gradually melt into sunrise | patience / idle |
| **Time Traveler** (secret) | Grab the big analog **Wall Clock** (`11:55 PM`) and spin its hand clockwise to `6:00 AM` to fast-forward time | circular drag |

Decoys: dragging the crescent moon down (Level 1 callback — boings back up!), bedside lamp ("not a sunrise"), desk calendar (flips pages that still say `NIGHT` / `STILL`), warm cocoa, BRB wall hanger, pillow, and bunny slippers.

## Level 12 — "Make him taller!" (home hallway growth chart)

Noodle stands at `3 FT` in front of his hallway growth chart trying to reach the `5 FT ★` Tall Club line.

| Ending | How | Verb taught |
| --- | --- | --- |
| **Growth Spurt** (main) | Put **two fingers on Noodle** and spread them apart (pinch-out) until his head reaches the `5 FT`–`6 FT` green zone, then release (desktop: scroll wheel UP on Noodle) | object pinch |
| **Over-Noodled** (secret) | Keep stretching Noodle **past `6 FT`** into the ceiling so his spaghetti body snaps into a giant pretzel knot | over-stretch |
| **Pumped Up!** (secret) | Drag the **bicycle air-pump nozzle** onto Noodle, then push/tap the yellow pump handle 3 times to inflate him into a 5 FT balloon-Noodle | attach + pump |

Decoys: 1-finger vertical drag on Noodle only makes him jump ("feet on the floor!"), tall top hat ("no hats!"), glass of milk ("+2mm — takes 12 years!"), pumping the air pump before attaching the hose, giraffe poster, and Tall Club trophy.

## Level 13 — "Open the jar!" (kitchen counter & sink)

Noodle stands behind his tiled kitchen counter staring desperately at a factory-sealed jar of crunchy **PICKLES**.

| Ending | How | Verb taught |
| --- | --- | --- |
| **Lefty Loosey** (main) | Put **two fingers on the red lid** and twist **counter-clockwise** to unscrew it (desktop: scroll wheel UP over the jar lid) | two-finger twist |
| **Noodle Jaws** (secret) | Drag the **pickle jar body** over to Noodle — he clamps down and bites the metal lid right off with his teeth | drag to character |
| **Hot Water Trick** (secret) | Turn on the **RED hot tap (`H`)** and hold/park the pickle jar under the steaming water (either order!) so the metal lid expands and pops off | hot water physics |

Decoys: tapping or 1-finger dragging the lid ("too tight!"), twisting clockwise ("wrong way!"), running the blue cold tap (`C`) on the jar ("shrinks metal!"), banging the wooden spoon on the lid, slipping the oven mitt on the lid, kitchen timer, potted basil, and spice jars.

## Level 14 — "What day is it today?" (home study desk & corkboard)

Noodle sits confused behind his home study desk staring at a corkboard covered in seven day-of-the-week sticky notes.

| Ending | How | Verb taught |
| --- | --- | --- |
| **Real Calendar** (main) | Tap the sticky note on the corkboard matching **today's real-world day of the week** (`new Date().getDay()`) | real-world date |
| **Technically Correct** (secret) | Tap the literal word **`today`** right inside the `"What day is it today?"` prompt banner | read the UI |
| **Caught Up!** (secret) | Tear off the **3 outdated pages** from the red wall calendar on the left (drag down or tap 3 times) until it catches up to today's real date | tear / swipe down |

Decoys: the red wall calendar starts 3 days behind as misdirection, wrong sticky notes get a red crayon `✕`, folded `OLD NEWS` newspaper, blinking `??:??` digital clock, and potted succulent.

## Level 15 — "BOSS: Rescue Noodle!" (Chapter 1 Finale Fortress)

The smug Pink Brain Narrator has hijacked Noodle's living room, locked Noodle inside a laser-guarded glass cage, mounted a live pointer-tracking CCTV camera, shielded himself in an energy dome, and confiscated Chapter 1 artifacts behind a sonic-locked display cabinet. Every ending is a **multi-step finale chain** combining verbs from Levels 1–14:

| Ending | Multi-Step Chain | Chapter 1 Verbs Combined |
| --- | --- | --- |
| **System Shutdown** (main — 4 steps) | ① Unscrew both bolts on the `⚡ POWER` breaker box → ② Flip Master Breaker OFF (kills lasers & shield) → ③ Shake phone (or wiggle the Boss's hanging perch / dev key **S**) to drop his Golden Key → ④ Drag the Golden Key onto Noodle's padlock | unscrew (Lv5) + switch (Lv4) + shake (Lv1) + drag |
| **Brainflipped!** (secret — 3 steps) | ① Drag the `"BOSS: Rescue Noodle!"` prompt banner down over the live CCTV camera to blind it (`NO SIGNAL`) → ② Drag the `"GREAT BRAIN"` portrait aside & unlock the hidden `GRAVITY LOCK` → ③ Turn phone **180° upside down** (or tap `FLIP 180°` / dev key **U**) to literally flip the Brain Boss! | drag UI (Lv4) + secret + upside-down flip (Lv5) |
| **Spicy KO!** (secret — 3 steps) | ① Tap the top-left HUD Sound button (or Volume Down / dev key **M**) to mute the Boss & disable the `SONIC LOCK` → ② Open the overhead Air Vent above his shield → ③ Drag the confiscated `HOT` pepper over the open vent & shake/wiggle 3 times to sneeze-shatter his shield from inside! | HUD mute (Lv8) + vent + drag & shake pepper (Lv7) |

Defenses / Cameos: live energy shield (`ZAP!`), laser cage bars, CCTV alarm when touching the portrait unblinded, sonic-locked display case with Level 5 Cookie Jar & Level 13 Pickle Jar cameos.

In every level, everything else reacts with a joke (clock + stretchy snooze arm, snot bubble, cactus, curtains, moon, books, the word "up"…) so no tap is ever dead. Hints come in two steps: a text clue, then a ghost hand or sensor animation that shows the move.

## Run it

- **Single file:** open `dist/brainflip-level1.html` in Chrome or Safari.
- **Source:** open `prototype/index.html` directly (no build step, no server needed).
- **Rebuild the single file:** `node tools/bundle.mjs`

URL flags: `?dev=1` (keys: **S** shake · **F** flip · **U** upside-down · **B** blow · **L** landscape · **C** charging · **V** leave/return · **M** mute/vol-down · **←/→/↓** tilt · **R** restart · **T** title) · `?level=11` open a level · `?reset=1` clear saved endings · `?skip=1` jump straight into the level · `?boil=0` turn off the hand-drawn line wobble.

### Testing on a phone
Motion sensors only work on **https** pages (iOS also asks for permission when you tap PLAY). Easiest: drag `dist/brainflip-level1.html` onto [Netlify Drop](https://app.netlify.com/drop) or push it to GitHub Pages / itch.io and open the link on your phone. The bed-wiggle, teapot-drag, hold-bulb, and cradle-rock alternatives work everywhere, including desktop.

## Android app (Capacitor)

- Ready-made test build: `apk/brainflip-1.0.0-debug.apk` (debug-signed, sideload only — not for Google Play).
- Rebuild: needs Node 22+, JDK 21 and the Android SDK (platform 36). Then:
  ```
  npm install
  npm run android:apk        # bundle → www/ → cap sync → gradlew assembleDebug
  ```
  Output: `android/app/build/outputs/apk/debug/app-debug.apk`. Or open `android/` in Android Studio and press Run.
- App id `com.brainflip.game` (change it in `capacitor.config.json` and `android/app/build.gradle` before the first Play upload — it can never change after).
- Native shell: portrait-locked, full-screen (system bars hidden, swipe to show), screen kept on, vibration permission. Shake works here because the app runs on a secure origin.

## Structure

```
prototype/
  index.html            screens + line-boil SVG filters
  css/game.css          Doodle-Pop styles, palette, animations
  js/core/util.js       tweens, easing, colour lerp, storage, svg helpers
  js/core/audio.js      synthesized SFX (Web Audio, no sound files)
  js/core/input.js      drag/tap on SVG, shake detector, iOS motion permission
  js/core/game.js       screen flow, HUD, narrator, hints, endings, card, confetti
  js/art/noodle.js      Noodle the mascot (body / face / arms as SVG)
  js/art/icons.js       sun character, UI icons, ending stickers
  js/levels/level01.js  Level 1: scene SVG + every reaction + 3 endings
  js/levels/level02.js  Level 2: teapot physics, tilt, sugar cubes
  js/levels/level03.js  Level 3: pinch/wheel/double-tap zoom, the cat in the prompt
  js/levels/level04.js  Level 4: draggable prompt switch, phone flip, sleep mask
  js/levels/level05.js  Level 5: upside-down gravity flip, 3-book stack tower, unscrewable shelf
  js/levels/level06.js  Level 6: hold to slow time, sneaky sheep behind prompt, wolf in wool
  js/levels/level08.js  Level 8 (reserved per GDD v0.1): HUD mute/volume-down, window toss, cradle rock
  js/main.js            boot + title screen
  assets/fonts/         Lilita One, Fredoka (SIL OFL 1.1, via Fontsource)
tools/bundle.mjs        inlines CSS/JS/fonts → dist/brainflip-level1.html
```

## The level contract

A level is one object, so adding a level never touches the engine:

```js
BF.levels[2] = {
  id: 2,
  promptHTML: 'Pour him some tea',
  endings: [{ id, name, line, rarity, icon }],   // first = main ending
  hints(foundIds) { return [{ text }, { text, demo }]; },
  demo(kind) { return [{ x, y }, …]; },          // ghost-hand path in scene coords
  build(ctx) { /* draw scene, wire input, call ctx.win(endingId) */ },
};
```

`ctx` gives the level: `say()` (narrator), `attempt()` (wrong poke → hint button pulses after 4), `win(id)`, `onCleanup(fn)`, `locked`, `alive`.

## Prototype notes

- Player percentages on the ending card are placeholders.
- The design canvas is 390 px wide; on phones the height follows the screen (780–900 px).
- Production plan (see the GDD): TypeScript + PixiJS + Capacitor, canvas rendering so fail/ending clips can be recorded and shared.
