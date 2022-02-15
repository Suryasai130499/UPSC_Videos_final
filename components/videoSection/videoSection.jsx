import { connect } from 'react-redux';
import styles from '../../styles/videoSection.module.css';

const VideoSection = ({ libraryId, video, subject, activeVideo }) => {
  return (
    <>
      <div className={styles.flex}>
        <div className={styles.wrapper}>
          <iframe src={`https://iframe.mediadelivery.net/embed/${libraryId}/${video}`} loading="lazy"
            style={{
              border: 0,
              position: 'absolute',
              top: 0,
              height: `${100}%`,
              width: `${100}%`
            }}
            allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;" allowFullScreen="true" />
        </div>
        <p className={styles.title}>{`${subject} Lecture No: ${activeVideo + 1}`}</p>
      </div>
    </>
  );
};

const mapStatetoProps = (state) => ({
  subject: state.subject,
  activeVideo: state.activeVideo,
});

export default connect(mapStatetoProps)(VideoSection);
