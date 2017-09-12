import React from 'react';
import { StyleSheet, Text, View, Image, Button,TouchableHighlight, TextInput, AppRegistry } from 'react-native';
import YouTube from 'react-native-youtube'

export default class BalistosNative extends React.Component {
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
          <Image style={styles.logo}
            source={require('./img/logo.png')}
          />
          <Text style={styles.banner}>Balistos</Text>
          <TouchableHighlight onPress={this.toggleDropdown} style={styles.dropdown}>
            <Image  source={require('./img/dropdown.png')} />
          </TouchableHighlight>
          
        </View>
        {this.state.opened ?
          <View style={styles.login}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({username: text})}
            value={this.state.username}
            placeholder="Username"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            placeholder="Password"
          />
          </View> : undefined }
          <View style={{position: 'relative'}}>
            <YouTube
              apiKey="AIzaSyDTSiaGdJ2xrGtvbTvZqXwdVPQmobiBPx0"
              videoId="KVZ-P-ZI6W4"   // The YouTube video ID
              play={true}             // control playback of video with true/false      // control whether the video should play in fullscreen or inline
              loop={true}             // control whether the video should loop when ended
              controls={0}
              onReady={e => this.setState({ isReady: true })}
              onChangeState={e => this.setState({ status: e.state })}
              onChangeQuality={e => this.setState({ quality: e.quality })}
              onError={e => this.setState({ error: e.error })}

              style={{ alignSelf: 'stretch', height: 300 }}
            />
            <View style={{position: 'absolute',width: '100%', height: '100%', backgroundColor: 'white', opacity: 0.1}} ></View>
          </View>
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

AppRegistry.registerComponent('BalistosNative', () => BalistosNative);