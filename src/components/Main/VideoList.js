import React from 'react';
import PropTypes from 'prop-types';
import VideoListItem from './VideoListItem';
import { View, Text, StyleSheet } from 'react-native';

const VideoList = (props) => {
  if (props.videos.empty) {
    return <Text style={styles.emptyItem} >Playlist is empty. Please search and add a video.</Text>;
  }

  return (
    <View className="video-list">
      {props.current ? <VideoListItem
        video={props.current}
        key={props.current.id}
        index={0}
      /> : undefined }
      {props.videos.sort((a, b) => {
        const diff = b.likes.reduce((total, like) => total + like.value, 0) -
          a.likes.reduce((total, like) => total + like.value, 0);
        return diff === 0 ? a.id - b.id : diff;
      }).map((video, index) => <VideoListItem video={video} key={video.id} index={index + 1} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyItem: {
    color: '#3e414c',
    padding: 10
  }
});

VideoList.propTypes = {
  current: PropTypes.shape({
    id: PropTypes.number.isRequired,
    likes: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
      }),
    ).isRequired,
  }),
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      likes: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.number,
        }),
      ).isRequired,
    }),
  ),
};

VideoList.defaultProps = {
  videos: [],
  current: undefined,
};

export default VideoList;
