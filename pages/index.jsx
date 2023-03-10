/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { AES } from 'crypto-js'
import Frame from '../components/frame';
import styles from "../styles/Home.module.css";
import * as actions from "../redux/actions";
import getAccessKey from "../api/getAccessKey";
import getVideoLibraries from "../api/getVideoLibraries";
import getCollections from "../api/getCollections";

const Home = ({
  institutions,
  topics,
  setInstitutes,
  tokenKey,
}) => {
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', AES.encrypt(tokenKey, 'surya@123'));
    }
  })

  const formatted_institutes = [];

  useEffect(() => {
    institutions.map((institution) => {
      let temp = {};
      temp['name'] = institution;
      temp['subjects'] = topics[institution];
      formatted_institutes.push(temp);
    });
    setInstitutes(formatted_institutes);
  }, [institutions, setInstitutes, topics]);

  return (
    <Frame
      title='Welcome'
      description={'Welcome to UPSC Videos Website. Watch UPSC Videos of various coacing institutions for free'}
    >
      <section className={styles.homepage}>
        <section>
          <p className={styles.center}>Start Watching UPSC Videos by clicking on the Subject you need!</p>
        </section>
      </section>
    </Frame>
  );
}

export async function getServerSideProps() {
  const accessKey = await (await getAccessKey()).apiKey;
  const tokenKey = await (await getAccessKey()).tokenKey;
  const videoLibraries = await getVideoLibraries(accessKey);
  const videoLibrary = videoLibraries[0];
  const id = videoLibrary.Id;
  const apiKey = videoLibrary.ApiKey;
  const collections = await getCollections(id, apiKey);
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
      institutions: institutes,
      topics: subjects,
    }
  }
}

const mapStatetoProps = state => ({
  institutes: state.institutes,
});

const mapDispatchtoProps = dispatch => ({
  setInstitutes: (value) => dispatch(actions.setInstitutes(value)),
})

export default connect(mapStatetoProps, mapDispatchtoProps)(Home);