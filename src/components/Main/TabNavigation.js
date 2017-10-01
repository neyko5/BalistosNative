import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class TabNavigation extends React.Component {
  render() {
    return (
    <View style={styles.navBar}>
        <TouchableOpacity onPress={() => this.props.onTabSwitch('search')} style={[styles.tabButton, this.props.selectedTab === 'search' && styles.active]} >
            <Text style={styles.text}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.onTabSwitch('list')} style={[styles.tabButton, this.props.selectedTab === 'list' && styles.active]}>
            <Text style={styles.text}>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.onTabSwitch('chat')} style={[styles.tabButton, this.props.selectedTab === 'chat' && styles.active]}>
            <Text style={styles.text}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.onTabSwitch('related')} style={[styles.tabButton, this.props.selectedTab === 'related' && styles.active]}>
            <Text style={styles.text}>Related</Text>
        </TouchableOpacity>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  navBar: {
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#eaeaea',
  },
  active: {
    backgroundColor: '#dddddd'
  },
  tabButton: {
      flex: 1,
      borderColor: '#dcdcdc',
      borderWidth: 1
      
  },
  text: {
      textAlign: 'center',
      lineHeight: 30,
      fontSize: 12,
  }
});


export default TabNavigation;
