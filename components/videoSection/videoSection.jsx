import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  BigPlayButton,
  LoadingSpinner,
} from 'video-react';

const VideoSection = ({ src }) => {
  return (
    <>
      <Player>
        <source src="https://upscvideos.s3.us-east-2.amazonaws.com/Insights/Geography/1.mp4" />
        <LoadingSpinner />
        <BigPlayButton position="center" />
        <ControlBar autoHide>
          <ReplayControl seconds={10} order={1.1} />
          <ForwardControl seconds={30} order={1.2} />
          <CurrentTimeDisplay order={4.1} />
          <TimeDivider order={4.2} />
          <PlaybackRateMenuButton rates={[2, 1.75, 1.5, 1.25, 1, 0.75, 0.5, 0.25]} order={7.1} />
          <VolumeMenuButton />
        </ControlBar>
      </Player>
    </>
  );
};

export default VideoSection;