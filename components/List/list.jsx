/* eslint-disable @next/next/link-passhref */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styles from '../../styles/list.module.css';
import * as actions from '../../redux/actions';


const List = ({
  titles,
  number,
  subject,
  activeVideo,
  setActiveVideo,
}) => {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const vl = [];
    for (let i = 1; i <= number; i++) {
      vl.push(`${subject.split('_').join(' ')} Lecture No: ${titles[i - 1]}`);
    };
    setVideoList(vl);
  }, [number, setActiveVideo, subject, titles]);

  const handleLinkClick = (index) => {
    setActiveVideo(index);
    scrollTo(0, 0);
  };

  return (
    <div className={styles.list}>
      <ul>
        {
          videoList.map((item, index) => (
            <li key={uuidv4()} className={
              cx(styles.listItem,
                { [styles.active]: index === activeVideo })
            } onClick={() => handleLinkClick(index)}>
              <a>
                {item}
              </a>
            </li>
          ))
        }
      </ul>
    </div >
  );
};

const mapStatetoProps = (state) => ({
  number: state.number,
  subject: state.subject,
  institute: state.institute,
  activeVideo: state.activeVideo,
});

const mapDispatchtoProps = (dispatch) => ({
  setActiveVideo: (value) => dispatch(actions.setActiveVideo(value)),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(List);
