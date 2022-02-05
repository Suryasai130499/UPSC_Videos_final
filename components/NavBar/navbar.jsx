import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/NavBar.module.css'

const NavBar = () => {
  const [subjects, setSubjects] = useState({});

  useEffect(() => {
    setSubjects(JSON.parse(localStorage.getItem('Subjects')));
  }, []);

  return (
    <nav className={styles.navbar}>
      <h4>UPSC Videos</h4>
      <ul className={styles.subjects}>
        {Object.keys(subjects).map((key, index) => {
          return <li key={index}>
            <Link href={`/${key}`}>
              <a>
                {key}
              </a>
            </Link>
          </li>
        })}
      </ul>
    </nav >
  );
};

export default NavBar;