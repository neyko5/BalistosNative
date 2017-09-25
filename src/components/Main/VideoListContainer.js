import React from 'react';
import PropTypes from 'prop-types';
import VideoList from './VideoList';
import SearchVideo from './SearchVideo';
import { View, StyleSheet } from 'react-native';

const VideoListContainer = props => (
  <View>
    <View style={styles.playlist}>
      <SearchVideo id={props.playlist.id} />
      <View style={styles.body}>
        <VideoList
          current={props.playlist.current}
          videos={props.playlist.videos}
        />
      </View>
    </View>
  </View>
);
const styles = StyleSheet.create({
  playlist: {
    backgroundColor: '#e1e1e1',
    width: '100%',
    marginTop: 25,
    marginBottom: 0
  },
  header: {
    height: 40,
    width: '100%',
    padding: 10,
    backgroundColor: '#e6e6e6',
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333'
  },
  createdBy: {
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'italic',
    color: '#333333'	         
  },
  body: {
    width: '100%',
    height: 400,
    overflow: 'scroll'
  },
  emptyItem: {
    color: '#3e414c',
    padding: 10
  }
});


VideoListContainer.propTypes = {
  playlist: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.title,
    videos: PropTypes.arrayOf(
      PropTypes.object.isRequired,
    ).isRequired,
    current: PropTypes.object,
  }).isRequired,

};

VideoListContainer.defaultProps = {
  playlist: {
    username: undefined,
    id: undefined,
    current: undefined,
  },
};

export default VideoListContainer;
