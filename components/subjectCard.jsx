import Link from 'next/link';
import styles from '../styles/subjectCard.module.css';

const SubjectCard = ({ name, count, institute }) => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.wrapper}>
          <div className={styles.card_content}>
            <p className={styles.card_title}>{name}</p>
            <p className={styles.card_count}>{`${count} Videos`}</p>
          </div>
          <Link href={`/${institute}/${name}`}>
            <a className={styles.card_link}>
              Visit
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SubjectCard;
