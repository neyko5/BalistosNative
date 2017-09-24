import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-native-youtube'
import ReactSlider from 'react-slider';
import vTime from 'video-time';
import { View, Button, Text } from 'react-native';
import { youtubeParams } from '../../../settings';



class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: undefined,
      elapsed: 0,
      total: 0,
      volume: 100,
      previousVolume: 0,
      paused: false,
      start: 0,
    };
    this.onReady = this.onReady.bind(this);
    this.onSpeakerClick = this.onSpeakerClick.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.resumeVideo = this.resumeVideo.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.updateElapsed = this.updateElapsed.bind(this);
    this.finishCurrentVideo = this.finishCurrentVideo.bind(this);
    this.deleteCurrentVideo = this.deleteCurrentVideo.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.current && this.props.current &&
      prevProps.current.video.youtubeId !== this.props.current.video.youtubeId) {
      if (this.state.player) {
        this.state.player.seekTo(0);
      }
      this.resumeVideo(this.props.current.video.youtubeId);
      this.props.startVideo(this.props.current.id);
      this.props.getRelatedVideos(this.props.current.video.youtubeId);
    }
    if (!prevProps.current && this.props.current) {
      this.props.startVideo(this.props.current.id);
      this.props.getRelatedVideos(this.props.current.video.youtubeId);
      if (this.state.player) {
        this.state.player.seekTo(this.props.current.startedAt);
      }
    }
    if (this.props.current && (!prevProps.current ||
      prevProps.current.video.youtubeId !== this.props.current.video.youtubeId)) {
      const options = {
        body: this.props.current.video.title,
        icon: `https://img.youtube.com/vi/${this.props.current.video.youtubeId}/0.jpg`,
        tag: 'video',
        requireInteraction: false,
      };
      new Notification(`Balistos - ${this.props.playlistTitle}`, options);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onReady(event) {
    this.setState({
      player: event.target,
    });
    setTimeout(this.updateElapsed, 500);
  }
  onSpeakerClick() {
    if (this.state.volume === 0) {
      this.setState({
        volume: this.state.previousVolume,
        previousVolume: 0,
      });
      this.state.player.setVolume(this.state.previousVolume);
    } else {
      this.setState({
        volume: 0,
        previousVolume: this.state.volume,
      });
      this.state.player.setVolume(0);
    }
  }
  onSliderChange(value) {
    this.setState({
      volume: value,
    });
    this.state.player.setVolume(value);
  }
  resumeVideo(youtubeId) {
    this.setState({
      current: youtubeId,
      paused: false,
    });
  }
  finishCurrentVideo() {
    this.props.finishVideo(this.props.current.id);
  }
  deleteCurrentVideo() {
    this.props.deleteVideo(this.props.current.id);
  }
  play() {
    this.setState({
      paused: false,
    });
    this.state.player.playVideo();
  }
  pause() {
    this.setState({
      paused: true,
    });
    this.state.player.pauseVideo();
  }
  updateElapsed() {
    this.setState({
      elapsed: this.state.player.getCurrentTime(),
      total: this.state.player.getDuration(),
    });
    this.timeout = setTimeout(this.updateElapsed, 500);
  }

  render() {
    return (
        <View className="main_window">
          <View className="video_player">
            <View className="player">
              <View className="overlay" />
              {this.props.current ?
                <YouTube
                  videoId={this.props.current.video.youtubeId}
                  opts={youtubeParams}
                  onReady={this.onReady}
                  onEnd={this.finishCurrentVideo}
                />
                : <View className="video-empty">
                  <Text className="text-big">No video</Text>
                  <Text className="text-small">Make sure you add some new videos to the playlist</Text>
                </View>
              }
            </View>
            <View className="progress">
              <View className="bar" role="progressbar" style={{ width: `${this.state.elapsed / (this.state.total) * 100}%` }} />
            </View>
            <View className="toolbar">
              <View className="controls">
                {this.state.paused ?
                  <Button className="control play" onClick={this.play} onPress={() => {}} /> :
                  <Button className="control pause" onClick={this.pause} title="Pause" onPress={() => {}} />}
              </View>
              <View className="timer">
                <Text className="time elapsed">{vTime(this.state.elapsed)}</Text>
                <Text className="time total"> / {vTime(this.state.total)} </Text>
              </View>
              <View className="volume">
                <Button className="speaker" title="Speaker" onPress={this.onSpeakerClick} />
                
              </View>
            </View>
          </View>
        </View>
    );
  }
}

VideoPlayer.propTypes = {
  playlistTitle: PropTypes.string,
  deleteVideo: PropTypes.func.isRequired,
  finishVideo: PropTypes.func.isRequired,
  getRelatedVideos: PropTypes.func.isRequired,
  startVideo: PropTypes.func.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number.isRequired,
    startedAt: PropTypes.number,
    video: PropTypes.shape({
      youtubeId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    likes: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
      }),
    ).isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

VideoPlayer.defaultProps = {
  current: undefined,
  playlistTitle: '',
};

export default VideoPlayer;