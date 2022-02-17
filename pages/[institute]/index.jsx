/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { AES, enc } from 'crypto-js';
import * as actions from '../../redux/actions';
import Frame from '../../components/frame';
import styles from "../../styles/institute.module.css";
import SubjectCard from "..//../components/subjectCard";
import getAccessKey from "../../api/getAccessKey";
import getVideoLibraries from "../../api/getVideoLibraries";
import getCollections from "../../api/getCollections";

const Institute = ({ institute, subjects, institutions, topics, setInstitutes, tokenKey }) => {
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', AES.encrypt(tokenKey, 'surya@123'));
    }
  });

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

  return (
    <>
      <Frame
        title={`${institute} Videos`}
        description={`${institute} Videos, Watch them on UPSC videos for free.`}
      >
        <div className={styles.wrapper}>
          {
            subjects.map((subject) => (
              <SubjectCard key={uuidv4()} name={subject.name.split('__')[0]} count={subject.videoCount} institute={institute} />
            ))
          }
        </div>
      </Frame>
    </>
  );
};

export async function getServerSideProps({ params: { institute } }) {
  const accessKey = await (await getAccessKey()).apiKey;
  const tokenKey = await (await getAccessKey()).tokenKey;
  const videoLibraries = await getVideoLibraries(accessKey);
  const videoLibrary = videoLibraries[0];
  const id = videoLibrary.Id;
  const apiKey = videoLibrary.ApiKey;
  const collections = await getCollections(id, apiKey);
  const institute_collections = collections.Collections.filter((collection) => (collection.name.split('__')[1] === institute));
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
      tokenKey,
      institute,
      subjects: institute_collections,
      institutions: institutes,
      topics: subjects,
    }
  }
}

const mapStatetoProps = (state) => ({
  institutes: state.institutes,
  activeVideo: state.activeVideo,
});

const mapDispatchtoProps = (dispatch) => ({
  setInstitute: (value) => dispatch(actions.setInstitute(value)),
  setInstitutes: (value) => dispatch(actions.setInstitutes(value)),
});


export default connect(mapStatetoProps, mapDispatchtoProps)(Institute);
