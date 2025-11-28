import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import {
  CometChatConversations,
  CometChatUIKit,
} from "@cometchat/chat-uikit-react-native";
import { CometChat } from "@cometchat/chat-sdk-react-native";

// Define the props for the ConversationSelector component
interface SelectorProps {
  onConversationItemClick?: (
    conversation: CometChat.Conversation,
    type: string
  ) => void;
  style?: any;
}

// ConversationSelector component
export const ConversationSelector: React.FC<SelectorProps> = ({ 
  onConversationItemClick = () => {},
  style 
}) => {
  // State to store the logged-in user
  const [loggedInUser, setLoggedInUser] = useState<CometChat.User | null>();

  // useEffect hook to fetch and set the logged-in user
  useEffect(() => {
    CometChatUIKit.getLoggedInUser()
      .then((user: CometChat.User | null) => {
        setLoggedInUser(user);
      })
      .catch((error: any) => {
        console.error("Error getting logged in user:", error);
        setLoggedInUser(null);
      });
  }, []);

  const handleConversationClick = (conversation: CometChat.Conversation) => {
    onConversationItemClick(conversation, "updateSelectedItem"); // Notify parent component
  };

  if (!loggedInUser) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Loading conversations...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <CometChatConversations
        onItemPress={handleConversationClick}
        style={{
          containerStyle: styles.conversationContainer,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  conversationContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default ConversationSelector;