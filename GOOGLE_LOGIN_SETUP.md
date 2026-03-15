# Google Gmail Login Setup Guide

## Overview
This app now includes Google Sign-In functionality using the `@react-native-google-signin/google-signin` package integrated with Clerk authentication.

## Prerequisites
- Google Cloud Console account
- Clerk account (already configured)
- Your app's package name and SHA-1 certificate fingerprint (for Android)

## Step 1: Create Google OAuth Credentials

### For Web (Required)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Choose "Web application"
6. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - Your production domain
7. Copy your **Web Client ID** - you'll need this

### For iOS (Required)
1. In Google Cloud Console, go back to Credentials
2. Create a new OAuth 2.0 Client ID for "iOS"
3. Enter your iOS Bundle ID (from Xcode or app.json as `bundleIdentifier`)
4. Copy your **iOS Client ID**

### For Android (Recommended)
1. Create a new OAuth 2.0 Client ID for "Android"
2. Get your app's SHA-1 certificate fingerprint:
   ```bash
   cd android
   ./gradlew signingReport
   ```
3. Enter package name (`com.yourcompany.draflix` from app.json)
4. Enter the SHA-1 fingerprint

## Step 2: Update Configuration

### In `app/(auth)/sign-in.tsx`
Replace these placeholder values with your actual credentials:

```typescript
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID', // From Step 1
  iosClientId: 'YOUR_IOS_CLIENT_ID', // From Step 1
  scopes: ['profile', 'email'],
})
```

### In Clerk Dashboard (Backend)
1. Go to your Clerk Dashboard
2. Navigate to "Authenticators" → "Social"
3. Enable Google OAuth
4. Add your Web Client ID and Client Secret to Clerk settings

## Step 3: Configure Redirect URLs (for Clerk OAuth)

### In app/(auth)/_layout.tsx or app.json
Ensure your deep linking is configured:

```typescript
// In app.json
{
  "scheme": "draflix",
  "plugins": [
    [
      "@react-native-firebase/app",
      {
        "googleServicesFile": "./google-services.json"
      }
    ]
  ]
}
```

## Step 4: Platform-Specific Setup

### iOS Setup
1. Open `ios/Draflix.xcworkspace` in Xcode
2. Go to Signing & Capabilities
3. Add "Sign in with Apple" capability (if needed)
4. Ensure bundle identifier matches your Google OAuth config

### Android Setup
1. Place the `google-services.json` in `android/app/` (from Firebase Console)
2. Update `android/build.gradle`:
   ```gradle
   classpath 'com.google.gms:google-services:4.3.15'
   ```
3. Update `android/app/build.gradle`:
   ```gradle
   apply plugin: 'com.google.gms.google-services'
   ```

## Step 5: Test the Implementation

1. Start your app:
   ```bash
   npm start
   ```

2. Run on iOS:
   ```bash
   npm run ios
   ```

3. Run on Android:
   ```bash
   npm run android
   ```

4. Tap "🔐 Sign in with Google" button on the sign-in screen

## Troubleshooting

### "User cancelled the login flow"
- This is normal if user presses cancel on Google login dialog

### "Play Services not available" (Android)
- Install Google Play Services on your emulator/device
- Test on physical device

### "Invalid Client ID"
- Verify you've copied the correct Web Client ID
- Check it matches your package name and redirect URL

### OAuth Redirect Issues
- Ensure your Clerk instance has the correct redirect URLs configured
- For development: `http://localhost:3000`
- For native: `draflix://oauth-callback` or similar

## API Reference

### Google Sign-In Configuration
```typescript
GoogleSignin.configure({
  webClientId: string,           // Required
  iosClientId?: string,          // Required for iOS
  androidClientId?: string,      // Optional for Android
  scopes?: string[],             // Email, profile by default
  offlineAccess?: boolean,
  forceCodeForRefreshToken?: boolean,
})
```

### Sign-In Response
```typescript
const userInfo = await GoogleSignin.signIn()
// Returns:
{
  data: {
    user: {
      id: string,
      name: string,
      email: string,
      photo: string,
      familyName: string,
      givenName: string,
      serverAuthCode?: string
    },
    idToken: string,
    scopes: string[]
  }
}
```

## Security Best Practices

1. **Never expose Client Secret** - Only use Web Client ID on frontend
2. **Use HTTPS** - Always use HTTPS in production
3. **Validate tokens** - Server-side validation of ID tokens
4. **Secure storage** - Tokens are stored securely by Clerk
5. **Limit scopes** - Only request necessary permissions: `['profile', 'email']`

## Next Steps

After successful login:
1. User data is synced with Clerk
2. Navigate to home screen
3. User session is persisted securely
4. Can access protected routes

## Support

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [React Native Google Sign-In](https://github.com/react-native-google-signin/google-signin)
- [Clerk OAuth Documentation](https://clerk.com/docs/authentication/social-connections)
