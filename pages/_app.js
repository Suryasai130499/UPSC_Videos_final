import '../styles/globals.css';
import 'video-react/dist/video-react.css';
import {
  useEffect
} from 'react';

function MyApp({
  Component,
  pageProps,
}) {
  useEffect(() => {
    const subjects = {
      'Modern_History': 21,
      'Geography': 18,
      'Ethics': 12,
      'Science_And_Technology': 23,
      'Environment': 21,
    }

    localStorage.setItem("Subjects", JSON.stringify(subjects));
  }, []);

  return <Component {
    ...pageProps
  }
  />
}

export default MyApp;