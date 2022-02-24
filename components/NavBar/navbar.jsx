import { useState, useRef } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import cx from 'classnames';
import { isMobile } from 'react-device-detect';
import styles from '../../styles/NavBar.module.css';
import * as actions from '../../redux/actions';

const NavBar = ({ subject, subjects, institutes, setInstitute }) => {
  const Subjects = useRef(null);
  const DropdownRef = useRef([]);
  const [active, setActive] = useState(null);

  let Institutes = [];
  const subs = [];

  Institutes = institutes.map((institute) => (institute.name));
  institutes.map((institute) => (subs.push(institute.subjects)));

  const openMenu = () => {
    Subjects.current.classList.toggle(styles.show);
  }

  const closeMenu = () => {
    Subjects.current.classList.remove(styles.show);
    setActiveVideo(0);
  }

  const openDropDown = (index) => {
    if (isMobile) {
      Subjects.current.classList.remove(styles.show);
      return;
    }
    else {
      setInstitute(Institutes[index]);
      setActive(index);
    }
  }

  const closeDropDown = () => {
    if (isMobile) {
      return;
    } else {
      setActive(null);
    }
  }

  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/">
          <a>
            <h1>UPSC Videos</h1>
          </a>
        </Link>
        <ul ref={Subjects} className={styles.subjects}>
          {
            Institutes.map((institute, index) => (
              <li onMouseEnter={() => openDropDown(index)} className={styles.institute} key={uuidv4()}>
                <Link href={`/${institute}`}>
                  <a>
                    {institute}
                  </a>
                </Link>
                <span className={styles.caretdown} />
                <ul onMouseLeave={() => closeDropDown()} ref={dropdownRef => DropdownRef.current[index] = dropdownRef} className={cx(styles.dropdown, { [styles.active]: index === active })}>
                  {
                    institutes[index].subjects.map((subject) => (
                      <li onClick={() => closeDropDown()} key={uuidv4()}>
                        <Link href={`/${institute}/${subject}`}>
                          <a>
                            {subject.split('_').join(' ')}
                          </a>
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </li>
            ))
          }
          {
            Object.keys(subjects).map((key, index) => {
              return <Link key={uuidv4()} href={`/${key}`} passHref>
                <a>
                  <li onClick={() => closeMenu()}>
                    {key}
                  </li>
                </a>
              </Link>
            })
          }
        </ul>
        <div className={styles.menu} onClick={() => openMenu()}>
          <span className={styles.hamburger} />
        </div>
      </nav>
    </>
  );
};

const mapStatetoProps = (state) => ({
  selectedInstitute: state.institute,
  institutes: state.institutes,
  subject: state.subject,
  subjects: state.subjects,
});

const mapDispatchtoProps = (dispatch) => ({
  setActiveVideo: (value) => dispatch(actions.setActiveVideo(value)),
  setInstitute: (value) => dispatch(actions.setInstitute(value)),
  setSubjects: (value) => dispatch(actions.setSubjects(value)),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(NavBar);
