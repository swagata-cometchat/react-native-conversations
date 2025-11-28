import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Platform, BackHandler } from "react-native";
import {
  CometChatMessageHeader,
  CometChatMessageList,
  CometChatMessageComposer,
} from "@cometchat/chat-uikit-react-native";
import { CometChat } from "@cometchat/chat-sdk-react-native";

/**
 * Messages
 * --------
 * A self-contained chat screen that combines the **CometChatMessageHeader**, **CometChatMessageList**,
 * and **CometChatMessageComposer** provided by the CometChat React-Native UI Kit.
 *
 * Props
 * -----
 * • `user`  – (CometChat.User, optional) Target user for a 1-to-1 conversation.
 * • `group` – (CometChat.Group, optional) Target group for a group conversation.
 * • `onBack`— () ⇒ void Callback fired when the back button in the header is pressed.
 *
 */
interface MessagesProps {
  user?: CometChat.User;
  group?: CometChat.Group;
  onBack: () => void;
}

const Messages: React.FC<MessagesProps> = ({ user, group, onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle Android back button
  useEffect(() => {
    if (Platform.OS === 'android') {
      const backAction = () => {
        onBack();
        return true; // Prevent default behavior
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }
  }, [onBack]);

  // Simulate loading state for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [user, group]);

  // Get the conversation name
  const getConversationName = (): string => {
    if (user) {
      return user.getName() || user.getUid();
    } else if (group) {
      return group.getName() || group.getGuid();
    }
    return "Unknown";
  };

  // Validate props
  if (!user && !group) {
    return (
      <View style={[styles.root, styles.errorContainer]}>
        <Text style={styles.errorText}>
          No conversation selected. Please select a user or group to chat with.
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.root, styles.errorContainer]}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={[styles.root, styles.loadingContainer]}>
        <Text style={styles.loadingText}>
          Loading conversation with {getConversationName()}...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {/* Top bar: avatar, name & back button */}
      <CometChatMessageHeader
        user={user}
        group={group}
        onBack={onBack}
        showBackButton={true}
        style={{
          containerStyle: styles.headerContainer,
        }}
      />

      {/* Scrollable list of chat messages */}
      <CometChatMessageList 
        user={user} 
        group={group}
        style={{
          containerStyle: styles.messageListContainer,
        }}
      />

      {/* Input field + action buttons (emoji, attach, send, etc.) */}
      <CometChatMessageComposer 
        user={user} 
        group={group}
        style={{
          containerStyle: styles.composerContainer,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  /** Root container that ensures the component stretches to use all available space */
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  /** Loading state styles */
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  
  /** Error state styles */
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff5f5',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    lineHeight: 24,
  },
  
  /** Header styles */
  headerContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  
  /** Message list styles */
  messageListContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 8,
  },
  
  /** Composer styles */
  composerContainer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 60,
  },
});

export default Messages;