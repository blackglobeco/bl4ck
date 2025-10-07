import React from 'react';
import './spiderfoot-widget.scss';

interface SpiderFootWidgetProps {
  onClose: () => void;
}

export const SpiderFootWidget: React.FC<SpiderFootWidgetProps> = ({ onClose }) => {
  return (
    <div className="spiderfoot-backdrop" onClick={onClose}>
      <div className="spiderfoot-widget" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="spiderfoot-content">
          <div className="spiderfoot-container">
            <iframe
              src="https://wmngs7-5000.csb.app"
              className="spiderfoot-iframe"
              title="SpiderFoot OSINT Tool"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};
