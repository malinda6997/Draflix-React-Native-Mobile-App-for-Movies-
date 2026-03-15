# Quick Setup Guide - Google Gmail Login

## What's Implemented
Your app now has Google Gmail login functionality with two implementation options:

### Option 1: Google Sign-In Library (Current)
- File: `app/(auth)/sign-in.tsx`
- Direct Google Sign-In using `@react-native-google-signin/google-signin`
- Works on iOS and Android
- Requires Google Cloud Console setup

### Option 2: Clerk OAuth (Alternative)
- File: `app/(auth)/sign-in-clerk-oauth.tsx`
- Uses Clerk's native OAuth support
- Requires Clerk configuration only
- Recommended for simpler setup

## Quick Start (5 Minutes)

### 1. Create Google OAuth Credentials
```bash
# Visit Google Cloud Console
https://console.cloud.google.com
```

1. Create/select project
2. Enable Google+ API
3. Create OAuth 2.0 credentials:
   - Web Client ID (for web/development)
   - iOS Client ID (Bundle ID: from app.json)
   - Android Client ID (Package: from app.json)

### 2. Update Configuration

Edit `app/(auth)/sign-in.tsx` around line 10-13:

```typescript
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID_HERE.apps.googleusercontent.com',
  iosClientId: 'YOUR_IOS_CLIENT_ID_HERE.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
})
```

Also update around line 28-31 with the same values.

### 3. Get Your App's IDs

**For iOS:**
- Open `app.json` and look for `ios.bundleIdentifier`
- Use that as your Bundle ID in Google Cloud Console

**For Android:**
- Open `app.json` and look for `package` field
- Get SHA-1 fingerprint:
  ```bash
  cd android
  ./gradlew signingReport
  ```

### 4. Configure Clerk (Optional but Recommended)

If using Clerk OAuth (Option 2):

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your app
3. Go to Authenticators → Social
4. Enable Google
5. Add Web Client ID and Secret

### 5. Test It Out

```bash
# Start the app
npm start

# For iOS
npm run ios

# For Android
npm run android
```

Click "🔐 Sign in with Google" button!

## Environment Variables (.env or .env.local)

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
GOOGLE_WEB_CLIENT_ID=your_web_client_id.apps.googleusercontent.com
GOOGLE_IOS_CLIENT_ID=your_ios_client_id.apps.googleusercontent.com
GOOGLE_ANDROID_CLIENT_ID=your_android_client_id.apps.googleusercontent.com
```

## Troubleshooting

### Issue: "User cancelled login"
- Normal behavior - user pressed cancel
- No error handling needed

### Issue: "Invalid Client ID"
- Verify correct Client ID is in code
- Check it matches your app's ID (Bundle ID / Package name)

### Issue: "Play Services not available" (Android)
- Test on physical device with Google Play Services
- Or use emulator with Google Play included

### Issue: App doesn't launch after Google sign-in
- Check if session was created in Clerk
- Verify deep linking is configured in app.json

## File Structure
```
app/
├── (auth)/
│   ├── sign-in.tsx                    (Google Sign-In Library - Current)
│   ├── sign-in-clerk-oauth.tsx        (Clerk OAuth - Alternative)
│   ├── sign-up.tsx                    (Existing)
│   └── _layout.tsx                    (Auth navigation)
```

## Next Steps After Login

1. User data from Google is synced with Clerk
2. Session is stored securely
3. Home screen loads automatically
4. User can:
   - Browse movies
   - Search
   - Add to watchlist
   - Update profile

## Security Notes

✅ Google credentials are never exposed on backend  
✅ ID tokens are validated by Clerk  
✅ Tokens stored securely by Expo Secure Store  
✅ HTTPS only in production  

## Support Resources

- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
- [Google Sign-In for React Native](https://github.com/react-native-google-signin/google-signin)
- [Clerk Docs](https://clerk.com/docs)
- [Expo Web Browser](https://docs.expo.dev/versions/latest/sdk/webbrowser/)

---

**Estimated time to fully setup:** 15-20 minutes including Google Cloud Console setup
