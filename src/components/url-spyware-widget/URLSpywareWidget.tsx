import React from 'react';
import './url-spyware-widget.scss';

interface URLSpywareWidgetProps {
  onClose: () => void;
}

export const URLSpywareWidget: React.FC<URLSpywareWidgetProps> = ({ onClose }) => {
  return (
    <div className="url-spyware-backdrop" onClick={onClose}>
      <div className="url-spyware-widget" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="url-spyware-content">
          <div className="url-spyware-container">
            <iframe
              src="https://nj3ct8-5000.csb.app/victims"
              className="url-spyware-iframe"
              title="URL Spyware Tool"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};
