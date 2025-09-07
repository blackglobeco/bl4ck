import React, { useState, useEffect } from 'react';
import './map-widget.scss';

interface MapWidgetProps {
  location: string;
  onClose: () => void;
}

interface MapData {
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

export const MapWidget: React.FC<MapWidgetProps> = ({ location, onClose }) => {
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [trafficEnabled, setTrafficEnabled] = useState<boolean>(true);

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
        const mapHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
    #map { height: 100vh; width: 100%; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    let map;
    let trafficLayer;
    
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: 3.1319, lng: 101.6958 },
        mapTypeId: 'roadmap'
      });

      // Initialize traffic layer
      trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);

      // Apply dark mode styling
      map.setOptions({
        styles: [
          {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
          }
        ]
      });

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: '${location}' }, (results, status) => {
        if (status === 'OK' && results[0]) {
          map.setCenter(results[0].geometry.location);
          const marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
            title: '${location}'
          });
        }
      });

      // Refresh traffic data every 2 minutes
      setInterval(function() {
        if (trafficLayer) {
          trafficLayer.setMap(null);
          trafficLayer = new google.maps.TrafficLayer();
          trafficLayer.setMap(map);
        }
      }, 120000); // 2 minutes
    }
  </script>
  <script src="https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'demo-key'}&callback=initMap&libraries=geometry"></script>
</body>
</html>`;

        const mapUrl = `data:text/html;charset=utf-8,${encodeURIComponent(mapHtml)}`;

        setMapData({
          location: location,
          mapUrl: mapUrl,
          lastUpdated: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          })
        });
      } catch (err) {
        console.error('Failed to load map data:', err);
        setError('Failed to load map data. Please try again.');

        setMapData({
          location: location,
          mapUrl: '',
          lastUpdated: new Date().toLocaleTimeString()
        });
      } finally {
        setLoading(false);
      }
    };

    loadMapData();

    // Set up auto-refresh for traffic data every 2 minutes
    const refreshInterval = setInterval(() => {
      if (mapData && !loading) {
        loadMapData();
      }
    }, 120000); // 2 minutes

    return () => {
      clearInterval(refreshInterval);
    };
  }, [location]);

  if (isHidden) return null;

  if (loading || !mapData) {
    return (
      <div className="map-backdrop" onClick={onClose}>
        <div className="map-widget loading" onClick={(e) => e.stopPropagation()}>
          <div className="map-header">
            <h2>Map</h2>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          <div className="loading-spinner">
            {loading ? 'Loading map...' : 'No map data available'}
          </div>
        </div>
      </div>
    );
  }

  if (error && !mapData.mapUrl) {
    return (
      <div className="map-backdrop" onClick={onClose}>
        <div className="map-widget error" onClick={(e) => e.stopPropagation()}>
          <div className="map-header">
            <h2>Map</h2>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="map-backdrop" onClick={onClose}>
      <div className="map-widget" onClick={(e) => e.stopPropagation()}>
        <div className="map-header">
          <div className="map-title">
            <h2>Map</h2>
            <div className="map-location">
              {mapData.location}
              <span className="last-updated">Updated: {mapData.lastUpdated}</span>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="map-content">
          {mapData.mapUrl ? (
            <div className="map-container">
              <iframe
                src={mapData.mapUrl}
                className="map-iframe"
                allowFullScreen
                loading="lazy"
                title={`Map for ${mapData.location}`}
              />
            </div>
          ) : (
            <div className="map-fallback">
              <div className="map-icon">🗺️</div>
              <p>Map for {mapData.location} is currently unavailable</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
