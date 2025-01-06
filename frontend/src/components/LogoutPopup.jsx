import React, { useEffect } from "react";
import "../styles/LogoutPopup.css";

const LogoutPopup = ({ onClose }) => {
  useEffect(() => {
    // Automatically close the popup after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <h3>You are logged out</h3>
        <button onClick={onClose} className="popup-close-btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default LogoutPopup;
