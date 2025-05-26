// Loader.jsx
import React, { useEffect, useState } from 'react';
import './Loader.css';
import file from '../../constants/index' // path to your image

const Loader = () => {
  const [slideOut, setSlideOut] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setSlideOut(true), 2000); // after 2 sec, start slide out
    const timer2 = setTimeout(() => setHideLoader(true), 2600); // after 2.6 sec, hide loader

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (hideLoader) return null;

  return (
    <div className={`loader-wrapper ${slideOut ? 'slide-out' : ''}`}>
      <img src={file.display} alt="Loading..." className="loader-image" />
    </div>
  );
};

export default Loader;
