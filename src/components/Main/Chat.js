import React from 'react';
import PropTypes from 'prop-types';
import ChatMessage from './ChatMessage';
import ChatForm from './ChatForm';
import { View, Text, StyleSheet } from 'react-native';

const Chat = props => (
  <View>
    <View>
      <Text >Chat with your buddies</Text>
    </View>
    <View style={styles.chatbox}>
      {props.messages.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
        .map(message => (<ChatMessage
          message={message}
          username={props.username}
          key={message.id}
        />))
      }
    </View>
    {props.username ? <ChatForm sendMessage={props.sendMessage} /> : undefined}
  </View>
);

const styles = StyleSheet.create({
  chatbox: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: '100%',
    height: 300
  },
  message: {
      marginBottom: 3,
      color: $title;
      fontSize: 12
  },
  author: {
      marginRight: 3,
      fontWeight: '700'
  }
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
