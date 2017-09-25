import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addVideo, getRelatedVideos } from '../../actions';
import { View, Text, TouchableOpacity } from 'react-native';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  id: state.playlist.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addVideo: () => {
    dispatch(addVideo(ownProps.video.id.videoId, ownProps.video.snippet.title, ownProps.id, false));
    dispatch(getRelatedVideos(ownProps.video.id.videoId));
  },
});

const RelatedVideoItem = props => (
  <View>
    <Image source={{ uri: `https://img.youtube.com/vi/${props.video.id.videoId}/0.jpg`}} />
    <View>
      <TouchableOpacity
        href={`https://www.youtube.com/watch?v=${props.video.id.videoId}`}
      >{props.video.snippet.title}</TouchableOpacity>
    </View>
    <TouchableOpacity className="button-add" onPress={props.addVideo}> Add</TouchableOpacity>
  </View>
);

RelatedVideoItem.propTypes = {
  addVideo: PropTypes.func.isRequired,
  video: PropTypes.shape({
    id: PropTypes.shape({
      videoId: PropTypes.string.isRequired,
    }).isRequired,
    snippet: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RelatedVideoItem);
