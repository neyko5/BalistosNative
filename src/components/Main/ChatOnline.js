import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const ChatOnline = props => (
  <View className="users">
    <View className="header">
      <Text className="title">Users online</Text>
      <Text lassName="number">{props.users && props.users.length}</Text>
    </View>
    <View className="body">
      {props.users && props.users.length && props.users.map(user => (<Text
        key={user.username}
      >{user.username}</Text>))}
    </View>
  </View>
);


ChatOnline.propTypes = {
  username: PropTypes.string,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

ChatOnline.defaultProps = {
  username: undefined,
};

export default ChatOnline;
