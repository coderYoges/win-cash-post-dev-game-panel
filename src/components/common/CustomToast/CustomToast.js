import React, { useState, useEffect } from 'react';
import './CustomToast.css';

const CustomToast = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="custom-toast-overlay">
      <div className="custom-toast-container">
        <div className="custom-toast-message">{message}</div>
      </div>
    </div>
  );
};

export default CustomToast;
