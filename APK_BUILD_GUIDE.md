# 📱 BowPaw APK Build Guide

This guide explains how to convert the BowPaw web app into an Android APK file.

## 🚀 Method 1: PWABuilder (Easiest - Recommended)

### Steps:

1. **Go to PWABuilder**
   - Visit: https://www.pwabuilder.com/

2. **Enter Your URL**
   - Enter: `https://thisai-bowpaw-e-commerce.web.app`
   - Click "Start"

3. **Wait for Analysis**
   - PWABuilder will analyze your PWA manifest and service worker
   - You should see a good score (the app is PWA-ready)

4. **Download Android Package**
   - Click "Package for stores"
   - Select "Android"
   - Choose "Google Play" option
   - Click "Generate"
   - Download the ZIP file

5. **Extract and Install**
   - Extract the ZIP file
   - Find the `.apk` file in the extracted folder
   - Transfer to your Android device
   - Enable "Install from unknown sources" in settings
   - Install the APK

---

## 🛠️ Method 2: Bubblewrap (Google's Official TWA Builder)

### Prerequisites:
- Node.js 14+ installed
- Java JDK 8+ installed
- Android Studio (for signing key)

### Steps:

```bash
# 1. Install Bubblewrap globally
npm install -g @pwabuilder/cli

# 2. Create a new directory for the APK project
mkdir bowpaw-apk
cd bowpaw-apk

# 3. Initialize Bubblewrap project
pwabuilder init --manifest https://thisai-bowpaw-e-commerce.web.app/manifest.json

# 4. Follow the prompts:
#    - App name: BowPaw
#    - Package ID: com.thisai.bowpaw
#    - Starting URL: https://thisai-bowpaw-e-commerce.web.app
#    - Theme color: #3B82F6
#    - Background color: #ffffff

# 5. Build the APK
pwabuilder build

# 6. Find your APK in the 'app/build/outputs/apk/' folder
```

---

## 🔧 Method 3: Capacitor (Full Native Features)

### Steps:

```bash
# 1. Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# 2. Initialize Capacitor
npx cap init "BowPaw" "com.thisai.bowpaw" --web-dir=out

# 3. Add Android platform
npx cap add android

# 4. Build the Next.js app
npm run build

# 5. Copy web assets to native project
npx cap copy android

# 6. Open in Android Studio
npx cap open android

# 7. Build APK from Android Studio
#    - Build > Build Bundle(s) / APK(s) > Build APK(s)
```

---

## 📋 APK Configuration (capacitor.config.ts)

If using Capacitor, create this file:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.thisai.bowpaw',
  appName: 'BowPaw',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    url: 'https://thisai-bowpaw-e-commerce.web.app',
    cleartext: false
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      showSpinner: true,
      spinnerColor: "#3B82F6"
    }
  }
};

export default config;
```

---

## 🎨 Required Icons

Make sure these icons exist in `public/icons/`:

| Size | Filename | Purpose |
|------|----------|---------|
| 72x72 | icon-72x72.png | Android legacy |
| 96x96 | icon-96x96.png | Android legacy |
| 128x128 | icon-128x128.png | Web |
| 144x144 | icon-144x144.png | Android |
| 152x152 | icon-152x152.png | iOS |
| 192x192 | icon-192x192.png | Android/PWA |
| 384x384 | icon-384x384.png | Android splash |
| 512x512 | icon-512x512.png | PWA/Store listing |
| 192x192 | maskable-icon-192x192.png | Android adaptive |
| 512x512 | maskable-icon-512x512.png | Android adaptive |

### Generate Icons:
Use https://www.pwabuilder.com/imageGenerator to generate all icon sizes from one 512x512 image.

---

## 📱 Testing the APK

### On Android Device:
1. Enable "Install from unknown sources" in Settings > Security
2. Transfer APK to device via USB/cloud
3. Tap APK file to install
4. Launch app from home screen

### On Emulator:
1. Open Android Studio
2. Tools > AVD Manager > Create Virtual Device
3. Drag APK file onto emulator window
4. App will install automatically

---

## 🏪 Publishing to Play Store

### Requirements:
1. Google Play Developer Account ($25 one-time fee)
2. Signed APK or AAB (Android App Bundle)
3. App listing assets:
   - Hi-res icon (512x512)
   - Feature graphic (1024x500)
   - Screenshots (min 2)
   - Short description (80 chars)
   - Full description (4000 chars)

### Digital Asset Links:
Add `.well-known/assetlinks.json` to your domain:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.thisai.bowpaw",
    "sha256_cert_fingerprints": ["YOUR_SIGNING_KEY_FINGERPRINT"]
  }
}]
```

---

## ⚡ Quick Start Command

Run this to generate APK instantly using PWABuilder CLI:

```bash
npx @pwabuilder/cli build --manifest https://thisai-bowpaw-e-commerce.web.app/manifest.json --platform android
```

---

## 📞 Support

For issues or questions:
- Email: support@thisai.com
- WhatsApp: +91 98765 43210

---

**Built with ❤️ by ThisAI for BowPaw**

