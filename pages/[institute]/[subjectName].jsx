import { useEffect } from "react";
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styles from '../../styles/subjectname.module.css';
import VideoSection from "../../components/videoSection/videoSection";
import List from '../../components/List/list';
import Nav from '../../components/NavBar/navbar';
import * as actions from '../../redux/actions';

const SubjectPage = ({
  setSubject,
  setNumber,
  videos,
  setVideos,
  videoProp,
  activeVideo,
  subjectName,
}) => {
  useEffect(() => {
    setSubject(subjectName);
  }, [setSubject, subjectName])

  useEffect(() => {
    setVideos(videoProp);
    setNumber(videoProp.length);
  }, [setNumber, setVideos, videoProp]);

  return (
    <>
      <Nav />
      <div className={styles.content}>
        <VideoSection key={uuidv4()} src={videos[activeVideo]} />
        <List />
      </div>
    </>
  );
};

export function getServerSideProps({ params: { institute, subjectName } }) {
  const host = `https://d2079f16nbq7cw.cloudfront.net/${institute}`;
  const subjects = {
    'Modern_History': 21,
    'Geography': 18,
    'Ethics': 12,
    'Science_And_Technology': 23,
    'Environment': 20,
    'Economics': 9,
  };
  const videos = [];
  const number = subjects[subjectName];
  for (let i = 1; i <= number; i++) {
    if (subjectName === 'Modern_History') {
      videos.push(`${host}/${subjectName}/${i}.webm`);
    } else {
      videos.push(`${host}/${subjectName}/${i}.mp4`);
    }
  }

  return {
    props: {
      subjectName,
      videoProp: videos,
      number,
    }
  };
};

const mapStatetoProps = (state) => ({
  videos: state.videos,
  activeVideo: state.activeVideo,
});

const mapDispatchtoProps = (dispatch) => ({
  setNumber: (value) => dispatch(actions.setNumber(value)),
  setSubject: (value) => dispatch(actions.setSubject(value)),
  setVideos: (value) => dispatch(actions.setVideos(value)),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(SubjectPage);