import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';
import Login from '../Login/Login';
import { StyleSheet, Text, View, Image, Button,TouchableHighlight, TextInput, AppRegistry } from 'react-native';

import {
  toggleLoginWindow,
  toggleCreatePlaylistWindow,
  toggleRegisterWindow,
  toggleLogoutWindow,
  logOut,
  createPlaylist,
  verifyToken,
} from '../../../actions';


const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  username: state.auth.username,
  loggedIn: state.auth.loggedIn,
  loginOpen: state.windows.loginOpen,
  registerOpen: state.windows.registerOpen,
  logoutOpen: state.windows.logoutOpen,
  createPlaylistOpen: state.windows.createPlaylistOpen,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  verifyToken: () => {
    dispatch(verifyToken());
  },
  onOpenLoginClick: () => {
    dispatch(toggleLoginWindow());
  },
  onOpenRegisterClick: () => {
    dispatch(toggleRegisterWindow());
  },
  onOpenLogoutClick: () => {
    dispatch(toggleLogoutWindow());
  },
  onOpenCreatePlaylistClick: () => {
    dispatch(toggleCreatePlaylistWindow());
  },
  onLogoutClick: () => {
    dispatch(logOut());
  },
  onCreatePlaylistSubmit: (title, description) => {
    dispatch(createPlaylist(title, description, ownProps.history));
  },
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {opened: false};
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }
  toggleDropdown() {
    this.setState({
      opened: !this.state.opened
    })
  }
  render() {
    return (
      <View>
        <View style={styles.header}>
          <Link to='/'>
            <View style={styles.home}>
              <Image style={styles.logo}
                source={require('../../../img/logo.png')}
              />
              <Text style={styles.banner}>Balistos {this.props.username}</Text>
            </View>
          </Link>
          <TouchableHighlight onPress={this.toggleDropdown} style={styles.dropdown}>
            <Image  source={require('../../../img/dropdown.png')} />
          </TouchableHighlight> 
        </View>      
        {this.state.opened ?
          <Login /> : undefined }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: '100%',
    backgroundColor: '#212121',
    borderBottomColor: '#666',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginTop: 20
  },
  home: {
    display: 'flex',
    flexDirection: 'row'
  },
  logo: {
    width: 34,
    height: 40,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10
  },
  banner: {
    lineHeight: 50,
    fontWeight: '200',
    fontSize: 30,
    color: 'white'
  },
  dropdown: {
    width: 24,
    height: 24,
    marginTop: 16,
    position: 'absolute',
    right: 10
  },
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

/*
class Header extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.verifyToken();
    }
  }
  render() {
    return (
      <header>
        <div className="container">
          <Link to="/">
            <h1 className="logo">Balistos</h1>
          </Link>
          {this.props.loggedIn ?
            <div>
              <UserMenu
                onOpenLogoutClick={this.props.onOpenLogoutClick}
                onOpenCreatePlaylistClick={this.props.onOpenCreatePlaylistClick}
                username={this.props.username}
                loggedIn={this.props.loggedIn}
              />
              {this.props.logoutOpen ? <LogOut
                onLogoutClick={this.props.onLogoutClick}
              /> : undefined}

              {this.props.createPlaylistOpen ? <CreatePlaylist
                onCreatePlaylistSubmit={this.props.onCreatePlaylistSubmit}
              /> : undefined}
            </div> :
            <div>
              <UserMenu
                onOpenLoginClick={this.props.onOpenLoginClick}
                onOpenRegisterClick={this.props.onOpenRegisterClick}
                username={this.props.username}
                loggedIn={this.props.loggedIn}
              />
              {this.props.loginOpen ? <Login /> : undefined}
              {this.props.registerOpen ? <Register /> : undefined }
            </div>
          }
        </div>
        <div className="clearfix" />
      </header>
    );
  }
}

Header.propTypes = {
  verifyToken: PropTypes.func.isRequired,
  onOpenLoginClick: PropTypes.func.isRequired,
  onOpenRegisterClick: PropTypes.func.isRequired,
  onOpenLogoutClick: PropTypes.func.isRequired,
  onCreatePlaylistSubmit: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  createPlaylistOpen: PropTypes.bool,
  logoutOpen: PropTypes.bool.isRequired,
  registerOpen: PropTypes.bool,
  loginOpen: PropTypes.bool,
  onOpenCreatePlaylistClick: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  username: PropTypes.string,
};

Header.defaultProps = {
  registerOpen: false,
  username: undefined,
  loggedIn: false,
  createPlaylistOpen: false,
  logoutOpen: false,
  loginOpen: false,
};
*/

export default connect(mapStateToProps, mapDispatchToProps)(Header);
