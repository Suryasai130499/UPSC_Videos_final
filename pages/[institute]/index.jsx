import { useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as actions from '../../redux/actions';
import Navbar from "../../components/NavBar/navbar";
import styles from "../../styles/institute.module.css";
import SubjectCard from "..//../components/subjectCard";
import getAccessKey from "../../api/getAccessKey";
import getVideoLibraries from "../../api/getVideoLibraries";
import getCollections from "../../api/getCollections";

const Institute = ({ institute, subjects, setActiveVideo, setInstitute }) => {
  useEffect(() => {

  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        {
          subjects.map((subject) => (
            <SubjectCard key={uuidv4()} name={subject.name.split('__')[0]} count={subject.videoCount} institute={institute} />
          ))
        }
      </div>
    </>
  );
};

export async function getServerSideProps({ params: { institute } }) {
  const accessKey = await (await getAccessKey()).apiKey;
  const videoLibraries = await getVideoLibraries(accessKey);
  const videoLibrary = videoLibraries[0];
  const id = videoLibrary.Id;
  const apiKey = videoLibrary.ApiKey;
  const collections = await getCollections(id, apiKey);
  const institute_collections = collections.Collections.filter((collection) => (collection.name.split('__')[1] === institute));

  return {
    props: {
      institute,
      subjects: institute_collections,
    }
  }
}

const mapStatetoProps = (state) => ({
  activeVideo: state.activeVideo,
});

const mapDispatchtoProps = (dispatch) => ({
  setInstitute: (value) => dispatch(actions.setInstitute(value)),
});


export default connect(mapStatetoProps, mapDispatchtoProps)(Institute);
