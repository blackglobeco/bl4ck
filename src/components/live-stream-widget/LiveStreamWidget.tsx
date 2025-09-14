
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
              src="https://vidgrid.tk.gg/?layout=N4IgNgxiBcCcA0IBuMDaoCWATGzsFMB7ARhEQGcAnKaEACwBcGAHc6AenYE9CBXB3gCN8AOgiEAtuwDuAQwYQ6AfiQBeSgDsAGgEkAVmAD6AJQBeXACxkQG2RPy4AorMoM6AYTsACADIYk+NBeXgAqGPbkXgDKAI68LvheGBpeFgDS1oSUWPiUMADMAL7wmDi0SASEAEzWVDT0TKwc3HwCwmKSMvKKKqoxABIA6gAcVFEADFxghNa29k4ubp4Svv6BXgBy+NJeAPKUYPiyGpFRDJT4+AxeAGoY25nZuTBVxaW4FTmE+bXUuIwsNicHj8ISicRSOQKZRqfI+LQARUGAFUAGwAdmRADMANazOwOWiAXg3ACy7vkIkQAghoAOb4Q6RPwBaLnI4rADtN3wGgwEESACEjopVszlrlZF52cEuTy+bcvP1CAx6SLElLPGAMFisjyJYN8IIIHZHjk8tBhm8QNgPpUrBQ-rQAU1ga0wR1Id0YaphlwIDSdHQAKw3WQhYb4+a0ZyuDzeJnraLiJjkCpgQ5eACysmSLIuVy8AAookmGCmMGn8PAvGluQIIDiuABKE3PaAWS3W8qVQO-epOoEtUHtCFdaG9G7DCQ6AAKdCxlAzvBpEcJIBrJ2SNIYhA0Ii8s-LshyYGYdAwsir08pe+WXh+iCyppgqI7ZTwX1Rvf+jQHILa4M6KEejUdEJA0QQGC0GIsAkShxhXBYY1veMvAAWi8fVyGVTQMNkNNggLAApXJeHIPD8AkKsdCoWR6WbB8njNdFXxtL50S-R0f2aJByFQugwF45hSLoVDpGkVDNQCERZBxOxs1MfAsBEDQrnYAAPVQLHYDBVF4TRoEEQ1oGYDAmnIXIKj5AzDUMFTpHIQxFGOFSjDoLB2AkQhBHLfBDGkLUMEMCRsw0QxyCwQxZEEShDCQKoRAkfJeHDRA5lXfl+XcTZtnIFszUDFiuy+FKQDqb9AWaP83RHICvWGVFUPRAARSh0S4fAbgRBCo0WWMVnjIIth2fZDmOSJ+Tw8QNC4W57mkPKYGIQr3yIWAOIaCqXSHACPTHNQbiiDAEXRfkfBxAAtfp5tSglEKWOM1iCaIjnIAgFXwDAaUYcgqw2Qi0M2LI3Fmh4GKfOBCgAXUKIA"
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
