import React, { useState, useRef, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function Map() {
  const [region, setRegion] = useState({
    latitude: 58.3784,  
    longitude: 26.7179, 
    latitudeDelta: 0.05, 
    longitudeDelta: 0.05, 
  });

  const mapRef = useRef(null);


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

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChange} 
        
        minDelta={0.01}   
        maxDelta={maxZoomLevel}   
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
