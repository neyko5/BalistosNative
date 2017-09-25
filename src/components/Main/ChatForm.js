import React from 'react';
import PropTypes from 'prop-types';


class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.message.trim()) {
      return;
    }
    this.props.sendMessage(this.state.message);
    this.setState({
      message: '',
    });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Send a message"
          name="message"
          value={this.state.message}
          onTextChange={this.handleChange}
        />
        <Button title="Chat" />
      </View>
    );
  }
}

ChatForm.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default ChatForm;
