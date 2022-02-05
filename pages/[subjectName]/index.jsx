import { useState, useEffect } from "react";
import VideoSection from "../../components/videoSection/videoSection";
import Nav from '../../components/NavBar/navbar';

const SubjectPage = ({ subject }) => {
  const [subjects, setSubjects] = useState({});
  const [number, setNumber] = useState(0);
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(0);
  const host = "https://upscvideos.s3.us-east-2.amazonaws.com/Insights";

  useEffect(() => {
    setSubjects(JSON.parse(localStorage.getItem('Subjects')));
  }, []);

  useEffect(() => {
    setNumber(subjects[subject]);
  }, [subject, subjects]);

  useEffect(() => {
    let array = [];
    for (let i = 1; i <= number; i++) {
      array.push(`${host}/${subject}/${i}.mp4`);
    }
    setVideos(array);
  }, [number, subject])

  console.log(videos);

  return (
    <>
      <Nav />
      <VideoSection src={videos[activeVideo]} />
    </>
  );
};

export function getServerSideProps({ params: { subjectName } }) {
  return {
    props: {
      subject: subjectName,
    }
  };
};

export default SubjectPage;