// Map.js
import React, { useState, useRef, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { MenuButton } from '@/components/menu-button';
import { MenuFilter } from '@/app/menu/filter-menu';

export default function Map() {
  const [region, setRegion] = useState({
    latitude: 58.3784,
    longitude: 26.7179,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [isPopupVisible, setPopupVisible] = useState(false); 
  const mapRef = useRef(null);

  useEffect(() => {
    StatusBar.setHidden(true, 'fade');
  }, []);

  const minLatitude = 58.2;
  const maxLatitude = 58.5;
  const minLongitude = 26.5;
  const maxLongitude = 27.0;

  const maxZoomLevel = 0.2;

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setMapBoundaries(
        { latitude: maxLatitude, longitude: maxLongitude },
        { latitude: minLatitude, longitude: minLongitude }
      );
    }
  }, []);

  const onRegionChange = (newRegion) => {
    const clampedLatitude = Math.min(Math.max(newRegion.latitude, minLatitude), maxLatitude);
    const clampedLongitude = Math.min(Math.max(newRegion.longitude, minLongitude), maxLongitude);

    const clampedLatitudeDelta = Math.min(Math.max(newRegion.latitudeDelta), maxZoomLevel);
    const clampedLongitudeDelta = Math.min(Math.max(newRegion.longitudeDelta), maxZoomLevel);

    if (
      newRegion.latitude < minLatitude || newRegion.latitude > maxLatitude ||
      newRegion.longitude < minLongitude || newRegion.longitude > maxLongitude
    ) {
      setRegion({
        latitude: 58.3784,
        longitude: 26.7179,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } else {
      setRegion({
        ...newRegion,
        latitude: clampedLatitude,
        longitude: clampedLongitude,
        latitudeDelta: clampedLatitudeDelta,
        longitudeDelta: clampedLongitudeDelta,
      });
    }
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible); // Toggle popup visibility
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChange}
      />

      {!isPopupVisible && (
        <View style={styles.buttonContainer}>
          <MenuButton handlePress={togglePopup} />
        </View>
      )}

      <MenuFilter visible={isPopupVisible} togglePopup={togglePopup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    marginTop: -50,
    marginBottom: -50,
  },
  buttonContainer: {
    position: 'absolute',
    top: '2%',
    left: '15%',
    transform: [{ translateX: -50 }],
    zIndex: 10,
    width: '80%',
  },
});
