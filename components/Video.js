import React from 'react';
import VideoPlayer from 'react-native-video-controls';

const Video = ({onClose}) => {
  return (
    <VideoPlayer
      source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
      onBack={() => onClose()}
      fullscreenOrientation="all"
      onEnd={() => onClose()}
    />
  );
};

export default Video;
