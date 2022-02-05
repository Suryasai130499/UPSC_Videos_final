import '../styles/globals.css';
import 'video-react/dist/video-react.css';

function MyApp({
  Component,
  pageProps
}) {
  return <Component {
    ...pageProps
  }
  />
}

export default MyApp