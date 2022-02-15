import Link from "next/link";
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import cx from 'classnames';
import styles from '../styles/dropdown.module.css';

const Dropdown = ({ institute, subjects }) => {
  return (
    <>
      <ul className={cx(styles.dropdown)}>
        {
          Object.keys(subjects).map((subject) => (
            <Link href={`/${institute}/${subject}`} key={uuidv4()}>
              <a>
                {subject}
              </a>
            </Link>
          ))
        }
      </ul>
    </>
  )
};

const mapStatetoProps = (state) => ({
  subjects: state.subjects,
  institute: state.institute,
});

export default connect(mapStatetoProps)(Dropdown);