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
import styles from '../../styles/videoSection.module.css';

const VideoSection = ({ src }) => {
  return (
    <div className={styles.wrapper}>
      <Player>
        <source src={src} type="video/mp4" />
        <LoadingSpinner />
        <BigPlayButton position="center" />
        <ControlBar autoHide>
          <ReplayControl seconds={5} order={1.1} />
          <ForwardControl seconds={5} order={1.2} />
          <CurrentTimeDisplay order={4.1} />
          <TimeDivider order={4.2} />
          <PlaybackRateMenuButton rates={[2, 1.75, 1.5, 1.25, 1, 0.75, 0.5, 0.25]} order={7.1} />
          <VolumeMenuButton vertical />
        </ControlBar>
      </Player>
    </div>
  );
};

export default VideoSection;