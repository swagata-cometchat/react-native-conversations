# Quick Start Guide

## 🚀 Ready to Run!

Your CometChat Conversation List + Message View app is ready to use! I've configured it with demo credentials that should work out of the box.

### Current Configuration

The app is configured with the following demo credentials in `src/config/cometchat.ts`:

- **App ID**: `26425dfd7ed3c7cc`
- **Auth Key**: `a20d9d7aad3f86bb7e9f5f8e8a326a79d41f9ea8`
- **Region**: `us`
- **Demo User**: `cometchat-uid-1`

### 🎯 What You'll See

1. **Loading Screen**: The app initializes CometChat and logs in the demo user
2. **Conversation List**: Shows existing conversations (if any)
3. **Two-Panel Layout**: On tablets/wide screens, you'll see conversations on the left and messages on the right
4. **Mobile Layout**: On phones, you'll see either conversations or messages in full screen

### 📱 Run the App

```bash
# Install dependencies (if not already done)
npm install

# Start Metro bundler
npm start

# Run on Android (in another terminal)
npm run android

# Or run on iOS (macOS only, in another terminal)
npm run ios
```

### 🛠 Replace with Your Credentials

To use your own CometChat app:

1. Go to [CometChat Dashboard](https://app.cometchat.com/)
2. Create a new app or use an existing one
3. Get your App ID, Auth Key, and Region
4. Create some test users in the dashboard
5. Update `src/config/cometchat.ts` with your credentials:

```typescript
export const COMETCHAT_CONFIG = {
  APP_ID: "your-app-id",
  AUTH_KEY: "your-auth-key", 
  REGION: "your-region", // us, eu, or in
  
  DEMO_USERS: [
    "your-test-user-1",
    "your-test-user-2",
    // ... more test users
  ]
};
```

### 🎨 Features Included

- ✅ Real-time messaging
- ✅ Conversation list with search
- ✅ Message composer with media support
- ✅ Responsive layout (mobile/tablet)
- ✅ User avatars and status
- ✅ Message delivery receipts
- ✅ Group chat support
- ✅ Modern Material Design UI
- ✅ Error handling and loading states
- ✅ Android back button support

### 🐛 Troubleshooting

If you see "Connection Error":
1. Check your internet connection
2. Verify the credentials are correct
3. Ensure the demo user exists in your CometChat app
4. Check the console logs for detailed error messages

### 📚 Next Steps

1. **Add More Users**: Create additional test users in CometChat Dashboard
2. **Customize UI**: Modify colors, fonts, and layouts in the components
3. **Add Features**: Implement push notifications, message reactions, etc.
4. **Production Setup**: Replace Auth Key with Auth Token for security

### 🎉 You're All Set!

The app demonstrates a complete two-panel chat interface similar to WhatsApp Web. You can select conversations from the list and start chatting immediately!

For detailed documentation, see `README_CHAT.md`.