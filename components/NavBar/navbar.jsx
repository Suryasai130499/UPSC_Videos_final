import { useRef } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import cx from 'classnames';
import styles from '../../styles/NavBar.module.css';
import * as actions from '../../redux/actions';

const NavBar = ({ subject, subjects, setActiveVideo }) => {
  const Subjects = useRef(null);

  const openMenu = () => {
    Subjects.current.classList.toggle(styles.show);
  }

  const closeMenu = () => {
    Subjects.current.classList.remove(styles.show);
    setActiveVideo(0);
  }

  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/">
          <a>
            <h4>UPSC Videos</h4>
          </a>
        </Link>
        <ul ref={Subjects} className={styles.subjects}>
          {Object.keys(subjects).map((key, index) => {
            return <Link key={uuidv4()} href={`/${key}`} passHref>
              <a>
                <li onClick={() => closeMenu()} className={cx({ [styles.active]: key === subject })}>
                  {key}
                </li>
              </a>
            </Link>
          })}
        </ul>
        <div className={styles.menu} onClick={() => openMenu()}>
          <span className={styles.hamburger} />
        </div>
      </nav>
    </>
  );
};

const mapStatetoProps = (state) => ({
  subjects: state.subjects,
  subject: state.subject,
});

const mapDispatchtoProps = (dispatch) => ({
  setActiveVideo: (value) => dispatch(actions.setActiveVideo(value)),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(NavBar);
