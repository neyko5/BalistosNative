import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NativeRouter, Route } from 'react-router-native';

import Header from '../Header/Header';
import Home from '../Home/Home';
import Playlist from '../Main/Playlist';
import { closeAllWindows } from '../../actions';

import { View } from 'react-native';

const mapDispatchToProps = dispatch => ({
  clickOutside: () => {
    dispatch(closeAllWindows());
  },
});

const App = props => (
    <NativeRouter>
      <View>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/playlist/:playlistId" component={Playlist} />
      </View>
    </NativeRouter>
);

App.propTypes = {
  clickOutside: PropTypes.func.isRequired,
};

export default connect(undefined, mapDispatchToProps)(App);

