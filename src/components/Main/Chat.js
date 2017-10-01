import React from 'react';
import PropTypes from 'prop-types';
import ChatMessage from './ChatMessage';
import ChatForm from './ChatForm';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Chat = props => (
  <View style={styles.container}>
    <Text style={styles.title}>Chat with your buddies</Text>
    <ScrollView style={styles.chatbox}>
      {props.messages.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
        .map(message => (<ChatMessage
          message={message}
          username={props.username}
          key={message.id}
        />))
      }
    </ScrollView>
    {props.username ? <ChatForm sendMessage={props.sendMessage} /> : undefined}
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 5,
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1
  },
  title: {
    lineHeight: 20,
    fontSize: 16,
  },
  chatbox: {
    flexGrow: 1,
  },
});


Chat.propTypes = {
  username: PropTypes.string,
  sendMessage: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};


Chat.defaultProps = {
  username: undefined,
};

export default Chat;
