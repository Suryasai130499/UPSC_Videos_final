import Nav from "../components/NavBar/navbar";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <section className={styles.homepage}>
      <Nav />
      <section>
        <p className={styles.center}>Start Watching UPSC Videos by clicking on the Subject you need!</p>
      </section>
    </section>
  );
};

export default Home;