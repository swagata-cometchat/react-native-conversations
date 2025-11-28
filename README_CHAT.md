# CometChat React Native Conversation List + Message View

This React Native application demonstrates a **two-panel chat interface** similar to WhatsApp Web, Slack, and Microsoft Teams, built using the CometChat React Native UI Kit.

## Features

- ✨ **Two-Panel Layout**: Conversation list on the left, messages on the right (tablet/desktop)
- 📱 **Responsive Design**: Adaptive layout for mobile and tablet devices
- 🎯 **Real-time Messaging**: Live chat with message delivery receipts
- 👥 **Group & Individual Chats**: Support for both one-on-one and group conversations
- 🔍 **Search Conversations**: Find conversations quickly
- 🎨 **Modern UI**: Clean, professional interface with proper theming
- ⚡ **Performance Optimized**: Efficient rendering and state management

## Screenshots

### Tablet Layout (Two-Panel)
```
┌─────────────┬─────────────────────────┐
│             │                         │
│ Conversation│      Message View       │
│    List     │                         │
│             │                         │
└─────────────┴─────────────────────────┘
```

### Mobile Layout (Single Panel)
```
┌─────────────┐    ┌─────────────────────┐
│             │    │                     │
│ Conversation│ => │    Message View     │
│    List     │    │                     │
│             │    │                     │
└─────────────┘    └─────────────────────┘
```

## Setup Instructions

### Prerequisites

1. **React Native Development Environment**
   - Node.js (>= 14)
   - React Native CLI
   - Android Studio (for Android)
   - Xcode (for iOS, macOS only)

2. **CometChat Account**
   - Sign up at [CometChat Dashboard](https://app.cometchat.com/login)
   - Create a new app and note down:
     - App ID
     - Auth Key
     - Region

### Configuration

1. **Update CometChat Credentials**
   
   Open `src/config/cometchat.ts` and replace the placeholder values:
   
   ```typescript
   export const COMETCHAT_CONFIG = {
     APP_ID: "your-app-id", // Replace with your CometChat App ID
     AUTH_KEY: "your-auth-key", // Replace with your App Auth Key
     REGION: "your-region", // Replace with your App Region (us, eu, in)
     
     DEMO_USERS: [
       "cometchat-uid-1",
       "cometchat-uid-2", 
       "cometchat-uid-3",
       "cometchat-uid-4",
       "cometchat-uid-5"
     ]
   };
   ```

2. **Install Dependencies**
   
   All required dependencies are already included in `package.json`:
   
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

#### Android
```bash
# Start the Metro bundler
npm start

# Run on Android (in another terminal)
npm run android
```

#### iOS
```bash
# Install iOS dependencies (macOS only)
cd ios && pod install && cd ..

# Start the Metro bundler
npm start

# Run on iOS (in another terminal)
npm run ios
```

## Project Structure

```
ChattingApp/
├── src/
│   ├── components/
│   │   ├── ConversationSelector.tsx  # Conversation list component
│   │   └── Messages.tsx             # Messages view component
│   └── config/
│       └── cometchat.ts             # CometChat configuration
├── App.tsx                          # Main app component
└── package.json                     # Dependencies
```

## Key Components

### 1. App.tsx
- **Main Container**: Handles initialization and layout logic
- **Responsive Layout**: Automatically switches between mobile and tablet layouts
- **State Management**: Manages user login and conversation selection
- **Error Handling**: Displays appropriate error and loading states

### 2. ConversationSelector.tsx
- **Conversation List**: Displays all user conversations
- **Search Functionality**: Built-in search for conversations
- **Real-time Updates**: Live updates when new messages arrive
- **Selection Management**: Tracks and highlights active conversation

### 3. Messages.tsx
- **Message Display**: Shows chat messages with proper formatting
- **Message Input**: Composer with emoji, attachments, and send functionality
- **Header Information**: Displays conversation partner info and status
- **Navigation**: Back button for mobile layouts

## Customization

### Theme Customization
The app uses CometChat's theming system. You can customize colors, fonts, and styling:

```typescript
// In your component
import { CometChatTheme } from "@cometchat/chat-uikit-react-native";

const customTheme = new CometChatTheme({
  palette: {
    primary: "#6200ea",
    secondary: "#03dac6",
    // ... other colors
  }
});
```

### Layout Configuration
Modify layout breakpoints in `src/config/cometchat.ts`:

```typescript
export const LAYOUT_CONFIG = {
  TABLET_BREAKPOINT: 768,    // Minimum width for tablet layout
  SIDEBAR_WIDTH_TABLET: 350, // Sidebar width on tablets
  SIDEBAR_WIDTH_DESKTOP: 400, // Sidebar width on desktop
};
```

### Component Customization
Each CometChat component accepts custom styling and behavior props:

```typescript
<CometChatConversations
  style={{
    containerStyle: { backgroundColor: '#f5f5f5' },
    titleStyle: { fontSize: 18, fontWeight: 'bold' }
  }}
  searchPlaceholderText="Find conversations..."
  // ... other props
/>
```

## Troubleshooting

### Common Issues

1. **Build Errors on iOS**
   ```bash
   cd ios
   pod install
   cd ..
   npx react-native run-ios
   ```

2. **Android Build Issues**
   - Ensure Android SDK is properly installed
   - Check `ANDROID_HOME` environment variable
   - Clean build: `cd android && ./gradlew clean && cd ..`

3. **CometChat Initialization Failed**
   - Verify your App ID, Auth Key, and Region are correct
   - Check internet connectivity
   - Ensure the demo user UIDs exist in your CometChat app

4. **Metro Bundler Issues**
   ```bash
   npx react-native start --reset-cache
   ```

### Debug Logs
Enable verbose logging by checking the console output. All CometChat operations are logged with `[CometChatUIKit]` prefix.

## Production Considerations

### Security
- Replace Auth Key with Auth Token for production apps
- Implement proper user authentication
- Use secure storage for user credentials

### Performance
- Implement proper conversation pagination
- Add image optimization for message attachments
- Consider implementing conversation caching

### User Experience
- Add push notifications for new messages
- Implement typing indicators
- Add message reactions and replies
- Consider offline message support

## Additional Resources

- [CometChat React Native Documentation](https://www.cometchat.com/docs/ui-kit/react-native)
- [CometChat Sample Apps](https://github.com/cometchat)
- [React Native Documentation](https://reactnative.dev/docs)

## Support

For issues and questions:
- [CometChat Support](https://help.cometchat.com/)
- [GitHub Issues](https://github.com/cometchat/cometchat-chat-uikit-react-native)
- [Community Forum](https://forum.cometchat.com/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.