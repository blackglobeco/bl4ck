
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
              src="https://vidgrid.tk.gg/?layout=N4IgNgxiBcCcA0IBuMDaoCWATGzsFMB7ARhEQGcAnKaEACwBcGAHc6AenYE9CBXB3gCN8AOgiEAtuwDuAQwYQ6AfiQBeSgDsAGgEkAVmAD6AJQBeXACxkQG2RPy4AKhnvkABAGUAjr1mV8bgBy+NJuAJqElGDWkVj4lDAATAC+8Jg4tEgEhInWVDT0TKwc3HwCwmKSMvKKKqpeABIA6gAcVB4ADFxghNa29rjBoQDyUfiyGu4eDP74DG4AahghMZRxCdDEqem4WXGEAMx51LiMLGycPPxCouJScgrKagcAMloAik0AqgBsAOxfABmAGs+nYHLQXoR3ABBDQAc3wYHw7gAwrIwBhAZENBhZG4mvhBBA7Kt1jALNsQNhdtkrBQTrQzsVLmUbpV7jUnqoWlwIPCdHQAKwLWSOFpgga0DziJjkLJgZFuACysgwGk8M3wczcAAoZYQ5QrkfA3ABpfAaAQQYFcACUZPiMAOVJpmWyQuOBWZF1K1wqd2qjzqCxaEh0AAU6IDKMrePDJRCQBbJur4QxCBoRG4oxgwLI4mBmHQ8Y6Nj9XRk8Psfl7TkVfVdyrcqg9amo9AwkBJpHpTAAtMIdKCIfpJl6ydwLfDwyea2bzJYhNwvDBIByIWJOuCV2n7P51pkNkpIcgAWjoYHPzF45DoZ+k0jPmPXIlkwLsatM+CwIg0c3YAAPVQLHYDBVF4TRoEEYloGYDBinIeIsggfBoOJQx-2kchDEUCZ-yMOgsHYCRCEEPN8EMaQsQwQwJDVDRDHILBDFkQRKEMJBEhECQDl4CVR3BXAACFhNRIIQnIMsYCFXd3X2ASQHyetzhKJt2UDNtuQsRwdHghgIx0cgIxhRNcBhRUZzxK1NQLDBeAkFc52nWdyFNQIFgdTc1m3Fo5OrIhYEPQpVNZf0W05YM1AWDwMHeP5hJeYF+waaQzOlcZyAINwGnwDB4UYNyggAKWk6A-mSABdZIgA"
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
