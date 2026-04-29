# DvorasProject

A React Native app built with Expo for appointment booking and SMS forwarding.

---

## Tech Stack

- **Framework:** React Native 0.81.5 + Expo SDK 54
- **Navigation:** Expo Router (file-based) + Drawer
- **State:** Zustand (with AsyncStorage persist)
- **Auth:** React Context + AsyncStorage
- **Backend:** Firebase Firestore
- **Language:** TypeScript

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [Android Studio](https://developer.android.com/studio) (for Android builds)
- Android SDK with a connected device or emulator running
- Java 17+

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd DvorasProject
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add Firebase config

Place your `google-services.json` file inside `android/app/`:

```
android/
  app/
    google-services.json   ← required
```

> Get this file from the [Firebase Console](https://console.firebase.google.com) under Project Settings → Your Apps → Android app.

---

## Running the App

### First run (or after adding native modules)

A full native build is required when running for the first time, or after any native dependency is added (Firebase, AsyncStorage, expo-contacts, etc.):

```bash
npx expo run:android
```

This will:
1. Link all native modules
2. Build and install the APK on your connected device/emulator
3. Start the Metro bundler

### Subsequent runs (JS changes only)

Once the native app is installed, you can start just the Metro bundler for faster iteration:

```bash
npm run start
```

Then press `a` to open on Android.

### Clear Metro cache (if you see stale module errors)

```bash
npm run fresh
```

---

## Building an APK

### Option 1 — EAS Build (no Android Studio required)

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```

Make sure `eas.json` has `"buildType": "apk"` under the `preview` profile:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

### Option 2 — Local release build

```bash
cd android
./gradlew assembleRelease
```

Output: `android/app/build/outputs/apk/release/app-release.apk`

---

## Project Structure

```
app/                        # Expo Router screens (routes)
  _layout.tsx               # Root layout with auth gate + drawer
  index.tsx                 # Home screen
  login.tsx                 # Login screen
  appointmentBooking/
    index.tsx               # Booking wizard (3-step)

packages/
  component/                # Reusable UI components
    appointmentBooking/     # Wizard step components (StepField, StepDate, StepConfirm)
    UIButton.tsx
    UICalendar.tsx
    UISelectDropdown.tsx
    UIStepIndicator.tsx
    UIText.tsx
    UITextInput.tsx
  data/                     # Static data
    appointment.tsx         # Medical fields list
    availability.tsx        # Available dates & time slots per field
  services/                 # Business logic
    authService.tsx         # Auth context + AsyncStorage persistence
    appointmentService.tsx  # Availability query functions
    smsForwardService.tsx   # Firestore CRUD for SMS rules
  store/                    # Zustand stores
    appointmentStore.tsx    # Confirmed booking (persisted to AsyncStorage)
  types/                    # TypeScript types & enums
    appointment.ts
    smsRule.ts
```

---

## Path Aliases

| Alias | Maps to |
|---|---|
| `@appTypes/*` | `packages/types/*` |
| `@services/*` | `packages/services/*` |
| `@component/*` | `packages/component/*` |
| `@data/*` | `packages/data/*` |
| `@store/*` | `packages/store/*` |

---

## Login

The app accepts any non-empty username and password combination (demo mode).
Login state is persisted via AsyncStorage — the user stays logged in across app restarts.
