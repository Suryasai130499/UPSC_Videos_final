import {
  useState,
  useEffect
} from "react";

const useOrientation = () => {
  const [orientation, setOrientation] = useState('portrait-primary');

  const handleOrientationChange = () => {
    setOrientation(screen.orientation.type);
  }

  useEffect(() => {
    window.addEventListener('orientationchange', handleOrientationChange);
    handleOrientationChange();
    return () => window.removeEventListener('orientationchange', handleOrientationChange);
  }, []);

  return orientation;
}

export default useOrientation;