import React, { useState, useRef, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, StatusBar, ActivityIndicator } from 'react-native';
import MenuButton from '@/components/menu-button';
import MenuFilter from '@/app/menu/filter-menu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { databaseID, endpoint, locationDBID, projectID, bankDBID, typeDBID, bankID, typeID } from '@/appwrite.config';
import { Client, Databases } from 'appwrite';

export default function Map() {
  const [region, setRegion] = useState({
    latitude: 58.3784, 
    longitude: 26.7179, 
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [banks, setBanks] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [selectedType, setSelectedType] = useState('Välja');
  const mapRef = useRef(null);

  const client = new Client().setEndpoint(endpoint).setProject(projectID);
  const databases = new Databases(client);

  useEffect(() => {
    StatusBar.setHidden(true, 'fade');
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

     
      const locationsDocuments = await databases.listDocuments(databaseID, locationDBID);
      const locationData = locationsDocuments.results || locationsDocuments.documents || [];

   
      const bankDocuments = await databases.listDocuments(databaseID, bankID);
      const bankData = bankDocuments.results || bankDocuments.documents || [];


      const typeDocuments = await databases.listDocuments(databaseID, typeID);
      const typeData = typeDocuments.results || typeDocuments.documents || [];

      setLocations(locationData);
      setBanks(bankData);
      setTypes(typeData);

      // Apply filters
      applyFilters(locationData, bankData, typeData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };


  const applyFilters = (locations, banks, types) => {
    let filtered = locations;

    if (selectedBanks.length > 0) {
      filtered = filtered.filter((location) =>
        selectedBanks.includes(location.Bank) 
      );
    }

    if (selectedType !== 'Välja') {
      filtered = filtered.filter((location) => location.Type === selectedType);
    }

    setFilteredLocations(filtered);
  };

  // Trigger filter updates when selected banks or type changes
  useEffect(() => {
    if (locations.length > 0) {
      applyFilters(locations, banks, types);
    }
  }, [selectedBanks, selectedType, locations, banks, types]);

  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', marginTop: -50, marginBottom: -50 }}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        ) : (
          <MapView
            ref={mapRef}
            style={styles.map}
            region={region}
            onRegionChangeComplete={onRegionChange}
          >
            {filteredLocations.map((location, index) => {
              const latitude = parseFloat(location.Longitude); // Swap Longitude and Latitude
              const longitude = parseFloat(location.Latitude); // Swap Latitude and Longitude

              if (isNaN(latitude) || isNaN(longitude)) {
                console.log("Invalid location data:", location);
                return null;
              }

              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude,
                    longitude,
                  }}
                  pinColor="red"
                />
              );
            })}
          </MapView>
        )}

        {!isPopupVisible && (
          <View style={styles.buttonContainer}>
            <MenuButton handlePress={togglePopup} />
          </View>
        )}

        <MenuFilter
          visible={isPopupVisible}
          togglePopup={togglePopup}
          selectedBanks={selectedBanks}
          selectedType={selectedType}
          setSelectedBanks={setSelectedBanks}
          setSelectedType={setSelectedType}
          banks={banks}
          types={types}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
