
import React from 'react';
import './live-stream-widget.scss';

interface LiveStreamWidgetProps {
  onClose: () => void;
}

export const LiveStreamWidget: React.FC<LiveStreamWidgetProps> = ({ onClose }) => {
  return (
    <div className="live-stream-backdrop" onClick={onClose}>
      <div className="live-stream-widget" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="live-stream-content">
          <div className="live-stream-container">
            <iframe
              src="https://vidgrid.tk.gg/?layout=N4IgNgxiBcCcA0IBuMDaoCWATGzsFMB7ARhEQGcAnKaEACwBcGAHc6AenYE9CBXB3gCN8AOgiEAtuwDuAQwYQ6AfiQBeSgDsAGgEkAVmAD6AJQBeXACxkQG2RPy4AKhnvkABAGUAjr1mV8bgBy+NJuAJqElADW1pFY+JQwAEwAvvCYOLRIBIRJ1lQ09EysHNx8AsJikjLyiiqqXgASAOoAHFQeAAxcYITWtva4waEA8pRg+LIa5LGU8YnQxGkZuNnxhADM+dS4jCxsnDz8QqLiUnIKymobADJaAIrNAKoAbADsTwBmMYgDDrQ3QjuACCGgA5vgJu4AMKyMAYT6RDQYWRuZr4QQQOyzeYwDbLEDYVY5KwUHa0PYlTjSGkiI4VU7VeFIfDsABqdAA4lgANLQ8gAVh5OmBSnIGFUrV4Ny4nw8jWkjQwlDoI1kjRmvzs-xAHgYIjcAAV8AwEuRBLxKGCcQkYBYCUSsjkBdtCpSDjJafSTlUpMzWdJDAARMFJJDQzoMJ4AUTFEoAshtpHQ6C9PhAwvcngAxeNaJ7Sfra3AALVkYMihCwGi4bmBLI0vHw8E8+qNJrNFqtNoWLwdmTw6xert2xQ93sqZxql3qn0+T1M0ywAFpmAAPJ5Fwa0WHkWTkZfx3jkfC8NxB1GOWQYZiyFvx2RY3g9mCwfvE9ZvEcUselGnSOlyh9Kd-XYOhiGkMAuFgTpYAAITCaQ41UUx8DoAApCBAjACxmE+CRTBGEZPmHLVtxAYIkHIKIMFret8EbAI9QNY1TUoc1LWtRA4ltaABXfJ11lab8in2P8vSAycmQwFl2CQMAdECcgsD0INAiSVpkNkEs1xueN0LBCxPlMT49DZQgGGhLcdUaQhwTcHk7K4kAeIWVoBMHIhYBE91xIAidGT9GTWQgBgwjhYw1zeKIwgsZD0K4aFOQgT44SeShjGrEswFIMidRuPwK3PQhPAY2QsEIe9H1kZ9uLmXi3hSABdFIgA"
              className="live-stream-iframe"
              title="Live Stream Player"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};
