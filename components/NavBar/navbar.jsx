import { useState, useRef } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import cx from 'classnames';
import Dropdown from '../dropdown';
import styles from '../../styles/NavBar.module.css';
import * as actions from '../../redux/actions';

const NavBar = ({ subject, subjects, selectedInstitute, institutes, setActiveVideo, setInstitute, setSubjects }) => {
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

  const openDropDown = (index) => {
    setInstitute(Institutes[index]);
    setActive(index);
  }

  const closeDropDown = (index) => {
    setActive(null);
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
          {
            Institutes.map((institute, index) => (
              <li onMouseEnter={() => openDropDown(index)} className={styles.institute} key={uuidv4()}>
                <Link href={`/${institute}`}>
                  <a>
                    {institute}
                  </a>
                </Link>
                <span className={styles.caretdown} />
                <ul onMouseLeave={() => closeDropDown(index)} ref={dropdownRef => DropdownRef.current[index] = dropdownRef} className={cx(styles.dropdown, { [styles.active]: index === active })}>
                  {
                    Object.keys(institutes[index].subjects).map((subject) => (
                      <li key={uuidv4()}>
                        <Link href={`/${institute}/${subject}`}>
                          <a>
                            {subject}
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
                  <li onClick={() => closeMenu()} className={cx({ [styles.active]: key === subject })}>
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
