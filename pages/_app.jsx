import {
  Provider
} from 'react-redux';
import '../styles/globals.css';
import store from '../redux/store';
import ThemeContextWrapper from '../components/themeContextWrapper';

function MyApp({
  Component,
  pageProps,
}) {
  return (
    <Provider store={store}>
      <ThemeContextWrapper>
        <Component {
          ...pageProps
        }
        />
      </ThemeContextWrapper>
    </Provider>
  )
}

export default MyApp;