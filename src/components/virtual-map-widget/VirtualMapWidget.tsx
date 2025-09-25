import React, { useState, useEffect } from 'react';
import './virtual-map-widget.scss';

interface VirtualMapWidgetProps {
  location: string;
  onClose: () => void;
}

interface VirtualMapData {
  location: string;
  mapUrl: string;
  lastUpdated: string;
}

const isWebView = () => {
  const ua = navigator.userAgent || navigator.vendor || '';
  const standalone = (window.navigator as any).standalone === true;

  const isIOSWebView = /iPhone|iPod|iPad/.test(ua) && !standalone && !/Safari/.test(ua);
  const isAndroidWebView = /\bwv\b/.test(ua) || (/Android.*Version\/[\d.]+.*Chrome/.test(ua) && !/Chrome\/\d{2,}/.test(ua));

  return isIOSWebView || isAndroidWebView;
};

export const VirtualMapWidget: React.FC<VirtualMapWidgetProps> = ({ location, onClose }) => {
  const [mapData, setMapData] = useState<VirtualMapData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState<boolean>(false);

  useEffect(() => {
    if (isWebView()) {
      setIsHidden(true);
      return;
    }

    const loadMapData = async () => {
      if (!location) return;

      setLoading(true);
      setError(null);

      try {
        let f4mapUrl = 'https://demo.f4map.com/';

        // Check if location is GPS coordinates (lat,lng format) or special case
        const coordPattern = /^-?\d+\.?\d*,-?\d+\.?\d*$/;
        if (location === 'current-location-unavailable') {
          // Default to world view
          f4mapUrl = 'https://demo.f4map.com/#lat=0&lon=0&zoom=2';
        } else if (coordPattern.test(location)) {
          const [lat, lng] = location.split(',').map(Number);
          // F4Map URL format with coordinates and zoom level for 3D view
          f4mapUrl = `https://demo.f4map.com/#lat=${lat}&lon=${lng}&zoom=17&camera.theta=60`;
        } else {
          // For address-based locations, use geocoding to get coordinates
          try {
            const geocodeResponse = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`
            );
            const geocodeData = await geocodeResponse.json();

            if (geocodeData && geocodeData.length > 0) {
              const lat = parseFloat(geocodeData[0].lat);
              const lng = parseFloat(geocodeData[0].lon);
              f4mapUrl = `https://demo.f4map.com/#lat=${lat}&lon=${lng}&zoom=17&camera.theta=60`;
            } else {
              // Fallback to default location if geocoding fails
              f4mapUrl = 'https://demo.f4map.com/#lat=48.8566&lon=2.3522&zoom=17&camera.theta=60'; // Paris
            }
          } catch (geocodeError) {
            console.warn('Geocoding failed, using default location');
            f4mapUrl = 'https://demo.f4map.com/#lat=48.8566&lon=2.3522&zoom=17&camera.theta=60'; // Paris
          }
        }

        setMapData({
          location: location,
          mapUrl: f4mapUrl,
          lastUpdated: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          })
        });
      } catch (err) {
        console.error('Failed to load 3D map data:', err);
        setError('Failed to load 3D map data. Please try again.');

        setMapData({
          location: location,
          mapUrl: '',
          lastUpdated: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          })
        });
      } finally {
        setLoading(false);
      }
    };

    loadMapData();

    // Set up auto-refresh every 5 minutes for updated 3D data
    const refreshInterval = setInterval(() => {
      if (mapData && !loading) {
        loadMapData();
      }
    }, 300000); // 5 minutes

    return () => {
      clearInterval(refreshInterval);
    };
  }, [location]);

  if (isHidden) return null;

  if (loading || !mapData) {
    return (
      <div className="virtual-map-backdrop" onClick={onClose}>
        <div className="virtual-map-widget loading" onClick={(e) => e.stopPropagation()}>
          <div className="virtual-map-header">
            <h2 style={{ color: 'white' }}>Virtual Map</h2>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          <div className="loading-spinner">
            {loading ? 'Loading 3D map...' : 'No 3D map data available'}
          </div>
        </div>
      </div>
    );
  }

  if (error && !mapData.mapUrl) {
    return (
      <div className="virtual-map-backdrop" onClick={onClose}>
        <div className="virtual-map-widget error" onClick={(e) => e.stopPropagation()}>
          <div className="virtual-map-header">
            <h2 style={{ color: 'white' }}>Virtual Map</h2>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="virtual-map-backdrop" onClick={onClose}>
      <div className="virtual-map-widget" onClick={(e) => e.stopPropagation()}>
        <div className="virtual-map-header">
          <div className="virtual-map-title">
            <h2 style={{ color: 'white' }}>Virtual Map</h2>
            <div className="virtual-map-location">
              {/^-?\d+\.?\d*,-?\d+\.?\d*$/.test(mapData.location) ? 'Your Current Location' : mapData.location}
              <span className="last-updated">Updated: {mapData.lastUpdated}</span>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="virtual-map-content">
          {mapData.mapUrl ? (
            <div className="virtual-map-container">
              <iframe
                src={mapData.mapUrl}
                className="virtual-map-iframe"
                allowFullScreen
                loading="lazy"
                title={`3D Virtual Map for ${/^-?\d+\.?\d*,-?\d+\.?\d*$/.test(mapData.location) ? 'Your Current Location' : mapData.location}`}
              />
            </div>
          ) : (
            <div className="virtual-map-fallback">
              <div className="virtual-map-icon">🌍</div>
              <p>Virtual Map for {/^-?\d+\.?\d*,-?\d+\.?\d*$/.test(mapData.location) ? 'your current location' : mapData.location} is currently unavailable</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
