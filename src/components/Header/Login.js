import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { sendLoginRequest, toggleRegisterWindow } from '../../actions';

const mapDispatchToProps = dispatch => ({
  onOpenRegisterClick: () => {
    dispatch(toggleRegisterWindow());
  },
  onSubmit: (username, password) => {
    dispatch(sendLoginRequest(username, password));
  },
});
const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  error: state.auth.loginError,
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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
    this.props.onSubmit(this.state.username, this.state.password);
    this.setState({
      username: '',
      password: '',
    });
  }

  render() {
    return (
      <View style={styles.login}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.username}
          autoCapitalize="none"
          placeholder="Username"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          autoCapitalize="none"
          placeholder="Password"
        />
        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
    );
  }
}

Login.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onOpenRegisterClick: PropTypes.func.isRequired,
};

Login.defaultProps = {
  error: undefined,
};

const styles = StyleSheet.create({
  login: {
    backgroundColor: 'white',
    padding: 10
  },
  input: {
    backgroundColor: '#f7f9f9',
    borderColor: '#d9e0e2',
    borderWidth: 1,
    borderStyle: 'solid',
    width: '100%',
    height: 35,
    borderRadius: 3,
    fontSize: 13,
    lineHeight: 13,
    padding: 10,
    marginBottom: 7
  },
  label: {
    fontWeight: '700',
    fontSize: 13,
    color: '#3e414c',
    lineHeight: 24
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
