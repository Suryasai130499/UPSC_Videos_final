import { useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as actions from '../../../redux/actions';
import styles from '../../../styles/subjectname.module.css';
import Frame from '../../../components/frame';
import List from '../../../components/List/list';
import VideoSection from '../../../components/videoSection/videoSection';
import getAccessKey from '../../../api/getAccessKey';
import getVideoLibraries from "../../../api/getVideoLibraries";
import getCollections from "../../../api/getCollections";
import getSubjectVideos from "../../../api/getSubjectVideos";

// Main Page
const SubjectPage = ({
  libraryId,
  ids,
  videos,
  activeVideo,
  setActiveVideo,
  subjectVideos,
  setVideos,
  setNumber,
  subject,
  subjectName,
  setSubject,
  institute,
  institutions,
  topics,
  setInstitute,
  setInstitutes,
  lecture,
  titles,
}) => {
  useEffect(() => {
    const formatted_institutes = [];
    institutions.map((institution) => {
      let temp = {};
      temp['name'] = institution;
      temp['subjects'] = topics[institution];
      formatted_institutes.push(temp);
    });
    setInstitutes(formatted_institutes);
  }, [institutions, setInstitutes, topics]);

  useEffect(() => {
    setInstitute(institute);
    setVideos(subjectVideos);
    setNumber(subjectVideos.length);
    setSubject(subjectName);
    lecture ? setActiveVideo(lecture - 1) : setActiveVideo(0);
  }, [setNumber, setSubject, setVideos, subjectName, subjectVideos, setActiveVideo, videos, setInstitute, institute, lecture]);

  return (
    <>
      <Frame
        title={lecture ? `${subject.split('_').join(' ')} Lecture No: ${lecture}` : `${subject.split('_').join(' ')} Lecture No: ${Number(activeVideo + 1)}`}
        description={
          lecture ?
            `Lecture No: ${lecture} of ${subject.split('_').join(' ')} from Institute ${institute}. Watch it free in UPSC Videos.` :
            `Lecture No: ${Number(activeVideo + 1)} of ${subject.split('_').join(' ')} from Institute ${institute}. Watch it free in UPSC Videos.`
        }
        image={`https://vz-c578b78e-ef8.b-cdn.net/${ids[activeVideo]}/thumbnail.jpg`}
      >
        <div className={styles.content}>
          <VideoSection key={uuidv4()} libraryId={libraryId} video={ids[activeVideo]} />
          <List titles={titles} />
        </div>
      </Frame>
    </>
  );
};

export async function getServerSideProps({ params: { institute, subjectName }, query }) {
  const lecture = query.lecture;
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
    return Number(a.title.slice(0, -4)) - Number(b.title.slice(0, -4))
  });
  const ids = subjectVideos.map((subject) => (subject.guid));
  const titles = subjectVideos.map((subject) => (subject.title.slice(0, -4)));
  const institutes = [];
  const subjects = {};
  collections.Collections.forEach((collection) => {
    const seperated = collection.name.split('__');
    let inst = seperated[1];
    let sub = seperated[0];
    if (institutes.indexOf(inst) === -1)
      institutes.push(inst);
    if (subjects[inst] === undefined) {
      subjects[inst] = [sub];
    }
    else {
      subjects[inst].push(sub);
    }
  });

  return {
    props: {
      lecture: lecture || null,
      institute,
      subjectName,
      subjectVideos,
      libraryId: id,
      ids,
      institutions: institutes,
      topics: subjects,
      titles,
    }
  }
}

const mapStatetoProps = (state) => ({
  institutes: state.institutes,
  subject: state.subject,
  videos: state.videos,
  activeVideo: state.activeVideo,
});

const mapDispatchtoProps = (dispatch) => ({
  setInstitute: (value) => dispatch(actions.setInstitute(value)),
  setActiveVideo: (value) => dispatch(actions.setActiveVideo(value)),
  setNumber: (value) => dispatch(actions.setNumber(value)),
  setSubject: (value) => dispatch(actions.setSubject(value)),
  setVideos: (value) => dispatch(actions.setVideos(value)),
  setInstitutes: (value) => dispatch(actions.setInstitutes(value)),
});


export default connect(mapStatetoProps, mapDispatchtoProps)(SubjectPage);