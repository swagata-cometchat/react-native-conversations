/**
 * CometChat Conversation List + Message View App
 * Two-panel chat interface similar to WhatsApp Web, Slack, and Microsoft Teams
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { 
  StatusBar, 
  StyleSheet, 
  useColorScheme, 
  View, 
  Text,
  Dimensions,
  Platform,
  PermissionsAndroid
} from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {
  CometChatUIKit,
  UIKitSettings,
  CometChatUiKitConstants,
} from "@cometchat/chat-uikit-react-native";
import { CometChat } from "@cometchat/chat-sdk-react-native";

import Messages from "./src/components/Messages";
import ConversationSelector from "./src/components/ConversationSelector";
import { COMETCHAT_CONFIG, LAYOUT_CONFIG } from "./src/config/cometchat";

/**
 * App
 * ---
 * The root component:
 *  1. Initializes the CometChat UI Kit.
 *  2. Logs a demo user in.
 *  3. Shows either the conversation list or an active chat screen in two-panel layout.
 */
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const { width } = Dimensions.get('window');
  
  /* ------------------------------------------------------------------ */
  /* Local state                                                         */
  /* ------------------------------------------------------------------ */
  const [loggedIn, setLoggedIn] = useState(false);
  const [messageUser, setMessageUser] = useState<CometChat.User>();
  const [messageGroup, setMessageGroup] = useState<CometChat.Group>();
  const [isTablet, setIsTablet] = useState(width >= LAYOUT_CONFIG.TABLET_BREAKPOINT);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ------------------------------------------------------------------ */
  /* One-time initialization                                             */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const getPermissions = () => {
      if (Platform.OS === "android") {
        PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
      }
    };

    const init = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Request permissions first
        getPermissions();

        // 1️⃣  Configure the UI Kit.
        const uiKitSettings: UIKitSettings = {
          appId: COMETCHAT_CONFIG.APP_ID,
          authKey: COMETCHAT_CONFIG.AUTH_KEY,
          region: COMETCHAT_CONFIG.REGION,
          subscriptionType: CometChat.AppSettings
            .SUBSCRIPTION_TYPE_ALL_USERS as UIKitSettings["subscriptionType"],
        };

        console.log("[CometChatUIKit] Initializing with config:", uiKitSettings);
        await CometChatUIKit.init(uiKitSettings);
        console.log("[CometChatUIKit] initialized successfully");

        // 2️⃣  Login with demo user.
        const demoUID = COMETCHAT_CONFIG.DEMO_USER;
        console.log("[CometChatUIKit] Attempting to login with UID:", demoUID);
        await CometChatUIKit.login({ uid: demoUID }); // Use object format with uid property
        
        setLoggedIn(true);
        console.log("[CometChatUIKit] logged in successfully");
      } catch (err: any) {
        console.error("[CometChatUIKit] init/login error:", err);
        setError(err?.message || "Failed to initialize CometChat");
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  /* ------------------------------------------------------------------ */
  /* Handle screen dimension changes                                     */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setIsTablet(window.width >= LAYOUT_CONFIG.TABLET_BREAKPOINT);
    });

    return () => subscription?.remove();
  }, []);

  /* ------------------------------------------------------------------ */
  /* Handle conversation selection                                       */
  /* ------------------------------------------------------------------ */
  const handleConversationSelect = (conversation: CometChat.Conversation) => {
    const conversationWith = conversation.getConversationWith();
    
    if (
      conversation.getConversationType() ===
      CometChatUiKitConstants.ConversationTypeConstants.user
    ) {
      setMessageUser(conversationWith as CometChat.User);
      setMessageGroup(undefined);
    } else {
      setMessageGroup(conversationWith as CometChat.Group);
      setMessageUser(undefined);
    }
  };

  const handleBackToConversations = () => {
    setMessageUser(undefined);
    setMessageGroup(undefined);
  };

  /* ------------------------------------------------------------------ */
  /* Render methods                                                      */
  /* ------------------------------------------------------------------ */
  const renderConversationsList = () => (
    <View style={[
      styles.conversationsWrapper,
      isTablet ? styles.conversationsWrapperTablet : styles.conversationsWrapperMobile
    ]}>
      <ConversationSelector
        onConversationItemClick={handleConversationSelect}
      />
    </View>
  );

  const renderMessages = () => (
    <View style={styles.messagesWrapper}>
      <Messages
        user={messageUser}
        group={messageGroup}
        onBack={handleBackToConversations}
      />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyConversation}>
      <Text style={styles.emptyText}>Select a conversation to start chatting</Text>
      <Text style={styles.emptySubText}>
        Choose from your existing conversations or start a new one
      </Text>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Initializing CometChat...</Text>
      <Text style={styles.loadingSubText}>Please wait while we set up your chat</Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorTitle}>Connection Error</Text>
      <Text style={styles.errorText}>{error}</Text>
      <Text style={styles.errorSubText}>
        Please check your CometChat credentials and try again
      </Text>
    </View>
  );

  /* ------------------------------------------------------------------ */
  /* Main render                                                         */
  /* ------------------------------------------------------------------ */
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        {/* Show different states based on loading/error/success */}
        {isLoading ? (
          renderLoadingState()
        ) : error ? (
          renderErrorState()
        ) : loggedIn ? (
          isTablet ? (
            // Tablet layout: Two panels side by side
            <View style={styles.conversationsWithMessages}>
              {/* Left panel: Conversations list */}
              {renderConversationsList()}
              
              {/* Right panel: Messages or empty state */}
              {(messageUser || messageGroup) ? renderMessages() : renderEmptyState()}
            </View>
          ) : (
            // Mobile layout: Show either conversations or messages
            <View style={styles.conversationsWithMessages}>
              {(messageUser || messageGroup) ? (
                // Show messages in full screen on mobile
                renderMessages()
              ) : (
                // Show conversations in full screen on mobile
                <View style={styles.conversationsWrapperMobile}>
                  <ConversationSelector
                    onConversationItemClick={handleConversationSelect}
                  />
                </View>
              )}
            </View>
          )
        ) : (
          // Fallback state
          renderLoadingState()
        )}
      </View>
    </SafeAreaProvider>
  );
}

/* -------------------------------------------------------------------------- */
/* Styles                                                                     */
/* -------------------------------------------------------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  conversationsWithMessages: {
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  conversationsWrapper: {
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  conversationsWrapperTablet: {
    width: LAYOUT_CONFIG.SIDEBAR_WIDTH_TABLET,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  conversationsWrapperMobile: {
    width: '100%',
  },
  messagesWrapper: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  emptyConversation: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#333333',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubText: {
    color: '#666666',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#333333',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  loadingSubText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  errorTitle: {
    fontSize: 20,
    color: '#d32f2f',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },
  errorSubText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default App;
