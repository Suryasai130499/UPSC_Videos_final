/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import cx from 'classnames';
import { themes, ThemeContext } from '../themeContext';
import { isMobile } from 'react-device-detect';
import styles from '../../styles/NavBar.module.css';
import * as actions from '../../redux/actions';

const NavBar = ({ subjects, institutes, setInstitute, theme, setTheme }) => {
  const Subjects = useRef(null);
  const DropdownRef = useRef([]);
  const toggleRef = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('theme');
    t === 'light' ? setTheme(true) : setTheme(false);
  }, [theme]);

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

  const themeChange = (changeTheme) => {
    setTheme(!theme);
    changeTheme(!theme ? themes.light : themes.dark);
  }

  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/">
          <a>
            <h1>UPSC Videos</h1>
          </a>
        </Link>
        <div className={styles.wrapper}>
          <ThemeContext.Consumer>
            {({ changeTheme }) => (
              <button className={theme ? styles.light : null} ref={toggleRef} onClick={() => themeChange(changeTheme)} id={styles.theme_toggle} aria-label={`Switch to ${theme ? 'dark' : 'light'} theme`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="472.39" height="472.39" viewBox="0 0 472.39 472.39">
                  <g className={styles.toggle_sun}>
                    <path d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z" />
                  </g>
                  <g className={styles.toggle_circle}>
                    <circle className="cls-1" cx="236.2" cy="236.2" r="85.78" />
                  </g>
                </svg>
              </button>
            )}
          </ThemeContext.Consumer>
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
  theme: state.theme,
});

const mapDispatchtoProps = (dispatch) => ({
  setActiveVideo: (value) => dispatch(actions.setActiveVideo(value)),
  setInstitute: (value) => dispatch(actions.setInstitute(value)),
  setSubjects: (value) => dispatch(actions.setSubjects(value)),
  setTheme: (value) => dispatch(actions.setTheme(value)),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(NavBar);
