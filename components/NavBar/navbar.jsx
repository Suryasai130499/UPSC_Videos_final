import Link from 'next/link';
import { connect } from 'react-redux';
import styles from '../../styles/NavBar.module.css';
import { useRouter } from 'next/router';

const NavBar = ({ subjects }) => {
  const Router = useRouter();
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

const mapStatetoProps = (state) => ({
  subjects: state.subjects,
})

export default connect(mapStatetoProps)(NavBar);
