import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../Header/Header/Header';
import { closeAllWindows } from '../../actions';

import { View } from 'react-native';

const mapDispatchToProps = dispatch => ({
  clickOutside: () => {
    dispatch(closeAllWindows());
  },
});

const App = props => (
    <View>
      <Header />
    </View>
);

App.propTypes = {
  clickOutside: PropTypes.func.isRequired,
};

export default connect(undefined, mapDispatchToProps)(App);

