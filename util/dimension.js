/* eslint-disable import/no-anonymous-default-export */
import {
  useState,
  useEffect,
}
from 'react';

export default () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  function handleResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};