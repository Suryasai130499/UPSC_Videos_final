import { useEffect, useState } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styles from '../../styles/list.module.css';
import * as actions from '../../redux/actions';


const List = ({
  number,
  subject,
  activeVideo,
  setActiveVideo,
}) => {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const vl = [];
    for (let i = 1; i <= number; i++) {
      console.log(i);
      vl.push(`${subject} Lecture No: ${i}`);
    };
    setVideoList(vl);
  }, [number, setActiveVideo, subject]);

  return (
    <div className={styles.list}>
      <ul>
        {
          videoList.map((item, index) => (
            <li className={
              cx(styles.listItem,
                { [styles.active]: index === activeVideo })
            } key={uuidv4()} onClick={() => setActiveVideo(index)}>{item}</li>
          ))
        }
      </ul>
    </div >
  );
};

const mapStatetoProps = (state) => ({
  number: state.number,
  subject: state.subject,
  activeVideo: state.activeVideo,
});

const mapDispatchtoProps = (dispatch) => ({
  setActiveVideo: (value) => dispatch(actions.setActiveVideo(value)),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(List);
