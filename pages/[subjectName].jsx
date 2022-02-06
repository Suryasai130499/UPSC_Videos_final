import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import VideoSection from "../components/videoSection/videoSection";
import Nav from '../components/NavBar/navbar';
import * as actions from '../redux/actions';

const SubjectPage = ({
  subject,
  setSubject,
  videos,
  setVideos,
  videoProp,
  activeVideo,
  subjectName,
  setActiveVideo,
}) => {
  useEffect(() => {
    setSubject(subjectName);
  }, [setSubject, subjectName])

  useEffect(() => {
    setVideos(videoProp);
  }, [setVideos, videoProp]);

  return (
    <>
      <Nav />
      <VideoSection key={subject} src={videos[activeVideo]} />
    </>
  );
};

export function getServerSideProps({ params: { subjectName } }) {
  const host = "https://upscvideos.s3.us-east-2.amazonaws.com/Insights";
  const subjects = {
    'Modern_History': 21,
    'Geography': 18,
    'Ethics': 12,
    'Science_And_Technology': 23,
    'Environment': 21,
  };
  const videos = [];
  for (let i = 1; i <= subjects[subjectName]; i++) {
    videos.push(`${host}/${subjectName}/${i}.mp4`);
  }

  return {
    props: {
      subjectName,
      videoProp: videos,
    }
  };
};

const mapStatetoProps = (state) => ({
  subject: state.subject,
  videos: state.videos,
  activeVideo: state.activeVideo,
});

const mapDispatchtoProps = (dispatch) => ({
  setSubject: (value) => dispatch(actions.setSubject(value)),
  setVideos: (value) => dispatch(actions.setVideos(value)),
  setActiveVideo: (value) => dispatch(actions.setActiveVideo(value)),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(SubjectPage);