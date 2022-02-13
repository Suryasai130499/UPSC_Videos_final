import { useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as actions from '../../../redux/actions';
import styles from '../../../styles/subjectname.module.css';
import Navbar from "../../../components/NavBar/navbar";
import List from '../../../components/List/list';
import VideoSection from '../../../components/videoSection/videoSection';
import getAccessKey from '../../../api/getAccessKey';
import getVideoLibraries from "../../../api/getVideoLibraries";
import getCollections from "../../../api/getCollections";
import getSubjectVideos from "../../../api/getSubjectVideos";

const SubjectPage = ({
  libraryId,
  ids,
  videos,
  activeVideo,
  setActiveVideo,
  subjectVideos,
  setVideos,
  setNumber,
  subjectName,
  setSubject,
  institute,
  setInstitute,
}) => {
  useEffect(() => {
    setInstitute(institute);
    setVideos(subjectVideos);
    setNumber(subjectVideos.length);
    setSubject(subjectName);
    setActiveVideo(0);
  }, [setNumber, setSubject, setVideos, subjectName, subjectVideos, setActiveVideo, videos, setInstitute, institute]);

  return (
    <>
      <Navbar />
      <div className={styles.content}>
        <VideoSection key={uuidv4()} libraryId={libraryId} video={ids[activeVideo]} />
        <List />
      </div>
    </>
  );
};

export async function getServerSideProps({ params: { institute, subjectName } }) {
  const accessKey = await (await getAccessKey()).apiKey;
  const videoLibraries = await getVideoLibraries(accessKey);
  const videoLibrary = videoLibraries[0];
  const id = videoLibrary.Id;
  const apiKey = videoLibrary.ApiKey;
  const collections = await getCollections(id, apiKey);
  const institute_collections = collections.Collections.filter((collection) => (collection.name.split('__')[1] === institute));
  const subject = institute_collections.filter((collection) => (collection.name.split('__')[0] === subjectName));
  const subjectId = subject[0].guid;
  const subjectVideos = await getSubjectVideos(apiKey, subjectId, id);
  subjectVideos.sort(function (a, b) {
    return Number(a.title.split('.')[0]) - Number(b.title.split('.')[0])
  });
  const ids = subjectVideos.map((subject) => (subject.guid));
  return {
    props: {
      institute,
      subjectName,
      subjectVideos,
      libraryId: id,
      ids,
    }
  }
}

const mapStatetoProps = (state) => ({
  videos: state.videos,
  activeVideo: state.activeVideo,
});
const mapDispatchtoProps = (dispatch) => ({
  setInstitute: (value) => dispatch(actions.setInstitute(value)),
  setActiveVideo: (value) => dispatch(actions.setActiveVideo(value)),
  setNumber: (value) => dispatch(actions.setNumber(value)),
  setSubject: (value) => dispatch(actions.setSubject(value)),
  setVideos: (value) => dispatch(actions.setVideos(value)),
});


export default connect(mapStatetoProps, mapDispatchtoProps)(SubjectPage);