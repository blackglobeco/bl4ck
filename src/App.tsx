/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useRef, useState } from "react";
import "./App.scss";
import { LiveAPIProvider } from "./contexts/LiveAPIContext";

import { Altair } from "./components/altair/Altair";
import ControlTray from "./components/control-tray/ControlTray";
import { AnimatedBackground } from "./components/animated-background/AnimatedBackground";
import { MapWidget } from "./components/map-widget/MapWidget";
import { YouTubeWidget } from "./components/youtube-widget/YouTubeWidget";
import { CyberThreatMapWidget } from "./components/cyber-threat-map/CyberThreatMapWidget";
import { EmailSpooferWidget } from "./components/email-spoofer-widget/EmailSpooferWidget";
import { CreditCardWidget } from "./components/credit-card-widget/CreditCardWidget";
import { LiveStreamWidget } from "./components/live-stream-widget/LiveStreamWidget";
import { Lockscreen } from "./components/lockscreen/Lockscreen";
import cn from "classnames";
import { LiveClientOptions } from "./types";


const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;
if (typeof API_KEY !== "string") {
  throw new Error("set REACT_APP_GEMINI_API_KEY in .env");
}

const apiOptions: LiveClientOptions = {
  apiKey: API_KEY,
};

function App() {
  // this video reference is used for displaying the active stream, whether that is the webcam or screen capture
  // feel free to style as you see fit
  const videoRef = useRef<HTMLVideoElement>(null);
  // either the screen capture, the video or null, if null we hide it
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  // lockscreen state
  const [isLocked, setIsLocked] = useState<boolean>(true);
  // map widget state
  const [showMapWidget, setShowMapWidget] = useState<boolean>(false);
  const [mapLocation, setMapLocation] = useState<string>("");
  // youtube widget state
  const [showYouTubeWidget, setShowYouTubeWidget] = useState<boolean>(false);
  const [youTubeQuery, setYouTubeQuery] = useState<string>("");
  // cyber threat map widget state
  const [showCyberThreatWidget, setShowCyberThreatWidget] = useState<boolean>(false);
  // email spoofer widget state
  const [showEmailSpooferWidget, setShowEmailSpooferWidget] = useState<boolean>(false);
  // credit card widget state
  const [showCreditCardWidget, setShowCreditCardWidget] = useState<boolean>(false);
  // live stream widget state
  const [showLiveStreamWidget, setShowLiveStreamWidget] = useState<boolean>(false);

  // Close all widgets function to ensure clean state
  const closeAllWidgets = () => {
    setShowMapWidget(false);
    setShowYouTubeWidget(false);
    setShowCyberThreatWidget(false);
    setShowEmailSpooferWidget(false);
    setShowCreditCardWidget(false);
    setShowLiveStreamWidget(false);
    setMapLocation('');
    setYouTubeQuery('');
  };

  // Handle unlock
  const handleUnlock = () => {
    setIsLocked(false);
  };

  // Show lockscreen if locked
  if (isLocked) {
    return <Lockscreen onUnlock={handleUnlock} />;
  }

  return (
    <div className="App">
      <AnimatedBackground />
      <LiveAPIProvider options={apiOptions}>
        <div className="streaming-console">
          <main>
            <div className="main-app-area">
              {/* APP goes here */}
              <Altair 
                onShowMap={(location) => {
                  closeAllWidgets();
                  setTimeout(() => {
                    setMapLocation(location);
                    setShowMapWidget(true);
                  }, 100);
                }}
                onSearchYouTube={(query) => {
                  closeAllWidgets();
                  setTimeout(() => {
                    setYouTubeQuery(query);
                    setShowYouTubeWidget(true);
                  }, 100);
                }}
                onShowCyberThreatMap={() => {
                  closeAllWidgets();
                  setTimeout(() => {
                    setShowCyberThreatWidget(true);
                  }, 100);
                }}
                onShowEmailSpoofer={() => {
                  closeAllWidgets();
                  setTimeout(() => {
                    setShowEmailSpooferWidget(true);
                  }, 100);
                }}
                onShowCreditCard={() => {
                  closeAllWidgets();
                  setTimeout(() => {
                    setShowCreditCardWidget(true);
                  }, 100);
                }}
                onShowLiveStream={() => {
                  closeAllWidgets();
                  setTimeout(() => {
                    setShowLiveStreamWidget(true);
                  }, 100);
                }}
              />
              <video
                className={cn("stream", {
                  hidden: !videoRef.current || !videoStream,
                })}
                ref={videoRef}
                autoPlay
                playsInline
              />
            </div>

            <ControlTray
              videoRef={videoRef}
              supportsVideo={true}
              onVideoStreamChange={setVideoStream}
              enableEditingSettings={false}
            >
              {/* put your own buttons here */}
            </ControlTray>
          </main>
        </div>

        {showMapWidget && (
          <MapWidget 
            location={mapLocation}
            onClose={closeAllWidgets}
          />
        )}

        {showYouTubeWidget && (
          <YouTubeWidget 
            searchQuery={youTubeQuery}
            onClose={closeAllWidgets}
          />
        )}

        {showCyberThreatWidget && (
          <CyberThreatMapWidget 
            onClose={closeAllWidgets}
          />
        )}

        {showEmailSpooferWidget && (
          <EmailSpooferWidget 
            onClose={closeAllWidgets}
          />
        )}

        {showCreditCardWidget && (
          <CreditCardWidget 
            onClose={closeAllWidgets}
          />
        )}

        {showLiveStreamWidget && (
          <LiveStreamWidget 
            onClose={closeAllWidgets}
          />
        )}

      </LiveAPIProvider>
    </div>
  );
}

export default App;
