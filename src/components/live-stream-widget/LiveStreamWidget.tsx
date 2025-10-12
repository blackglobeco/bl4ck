
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
              src="https://vidgrid.tk.gg/?layout=N4IgNgxiBcCcA0IBuMDaoCWATGzsFMB7ARhEQGcAnKaEACwBcGAHc6AenYE9CBXB3gCN8AOgiEAtuwDuAQwYQ6AfiQBeSgDsAGgEkAVmAD6AJQBeXACxkQG2RPy4AKhnvkABAGUAjr1mV8bgBy+NJuAJqElGDWkVj4lDAATAC+8Jg4tEgEhInWVDT0TKwc3HwCwmKSMvKKKqpeABIA6gAcVB4ADFxghNa29rjBoQDyUfiyGu4eDP74DG4AahghMZRxCdDEqem4WXGEAMx51LiMLGycPPxCouJScgrKagcAMloAik0AqgBsAOxfABmAGs+nYHLQXoR3ABBDQAc3wYHw7gAwrIwBhAZENBhZG4mvhBBA7Kt1jALNsQNhdtkrBQTrQzsVLmUbpV7jUnqoWlwIPCdHQAKwLWSOFpgga0DziJjkLJgZFuACysgwGk8M3wczcAAoZYQ5QrkfA3ABpfAaAQQYFcACUZPiMAOVJpmWyQuOBWZF1K1wqd2qjzqCxaEh0AAU6IDKMrePDJRCQBbJur4QxCBoRG4oxgwLI4mBmHQ8Y6Nj9XRk8Psfl7cIncC9ZO4Fvh4c3NbN5ksQm4XhgkA5ELEnXBK7T9n860yir6kOQALR0MCL5i8ch0BfSaQLzGDkSyYF2NWmfBYEQaObsAAeqgs7Awql4mmggmJ0GYGGK5HiWQg+FfYlDEvaRyEMRQJkvIw6CwdgJEIQQ83wQxpCxDBDAkNUNEMcgsEMWRBEoQwkESEQJAOXgJUQfokwAIVo1EghCcgyxgIVx3dfYqJAfJ62o8FcBhRU2zxK1NQLDBeAkPsO1bdtyFNQIFgdYc1lHFoOOrIhYGnEAG2lcZyAINwGnwDB4UYBSggAKVY6A-mSABdZIgA"
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
