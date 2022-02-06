import {
  useEffect
} from 'react';
import {
  Provider
} from 'react-redux';
import '../styles/globals.css';
import 'video-react/dist/video-react.css';
import store from '../redux/store';

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

  return (
    <Provider store={store}>
      < Component {
        ...pageProps
      }
      />
    </Provider>
  )
}

export default MyApp;