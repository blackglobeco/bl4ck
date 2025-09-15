
import React, { useState, useEffect } from 'react';
import './lockscreen.scss';

interface LockscreenProps {
  onUnlock: () => void;
}

export const Lockscreen: React.FC<LockscreenProps> = ({ onUnlock }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [validPasscodes, setValidPasscodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load passcodes from the public directory
    fetch('/Passcodes.txt')
      .then(response => response.text())
      .then(text => {
        const codes = text.trim().split('\n').map(code => code.trim()).filter(code => code);
        setValidPasscodes(codes);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading passcodes:', error);
        setError('Failed to load passcode validation');
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (validPasscodes.includes(passcode)) {
      onUnlock();
    } else {
      setError('Invalid passcode. Access denied.');
      setPasscode('');
    }
  };

  if (loading) {
    return (
      <div className="lockscreen-overlay">
        <div className="lockscreen-container">
          <div className="lockscreen-content">
            <h1>BlackAI ⚛</h1>
            <div className="loading-text">Initializing security...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lockscreen-overlay">
      <div className="lockscreen-container">
        <div className="lockscreen-content">
          <h1>BlackAI ⚛</h1>
          <p>Enter passcode to access the system</p>
          
          <form onSubmit={handleSubmit} className="passcode-form">
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode"
              className="passcode-input"
              autoFocus
            />
            <button type="submit" className="unlock-button">
              Access
            </button>
          </form>
          
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
};
