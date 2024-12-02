import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import MenuButton from '@/components/menu-button';
import MenuFilter from '@/app/menu/filter-menu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { databaseID, endpoint, locationDBID, projectID, bankID, typeID } from '@/appwrite.config';
import { Client, Databases, Query } from 'appwrite';
import useAppwrite from '@/constants/useAppwrite';

export default function Map() {
  const [region, setRegion] = useState({
    latitude: 58.3784, 
    longitude: 26.7179, 
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [banks, setBanks] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [selectedType, setSelectedType] = useState(null); 
  const mapRef = useRef(null);

  const client = new Client().setEndpoint(endpoint).setProject(projectID);
  const databases = new Databases(client);

  const fetchLocations = async () => {
    let allLocations = [];
    let currentPage = 1;
    const pageSize = 100; 

    try {
      let hasMore = true;
      
      while (hasMore) {
        const locationsDocuments = await databases.listDocuments(
          databaseID,
          locationDBID,
          [
            Query.limit(pageSize),
            Query.offset((currentPage - 1) * pageSize),
          ]
        );
        
        const locations = locationsDocuments.results || locationsDocuments.documents || [];
        allLocations = [...allLocations, ...locations];
        
        hasMore = locations.length === pageSize;
        currentPage += 1;
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
    
    return allLocations;
  };

  const fetchBanks = async () => {
    const bankDocuments = await databases.listDocuments(databaseID, bankID);
    return bankDocuments.results || bankDocuments.documents || [];
  };

  const fetchTypes = async () => {
    const typeDocuments = await databases.listDocuments(databaseID, typeID);
    return typeDocuments.results || typeDocuments.documents || [];
  };

  const { data: locations, isLoading: locationsLoading } = useAppwrite(fetchLocations);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const bankData = await fetchBanks();
        const typeData = await fetchTypes();
  
        setBanks(bankData);
        setTypes(typeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAllData();
  }, []);
  


  useEffect(() => {
    applyFilters();
  }, [selectedBanks, selectedType, locations]); 
  

  const applyFilters = () => {
  
    if (!locations || locations.length === 0) {
      setFilteredLocations([]);
      return;
    }
  
    let filtered = [...locations];
  
    if (selectedBanks.length > 0) {
      filtered = filtered.filter((location) => {
        const matchesBank = location.banks.some((bank) =>
          selectedBanks.includes(bank.$id) 
        );
        
        return matchesBank;
      });
    }
  
    if (selectedType) {
      filtered = filtered.filter((location) => {
        const matchesType = location.aTMTypes?.$id === selectedType; 
        return matchesType;
      });
    }
  
    setFilteredLocations(filtered);
  };
  
  

  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', marginTop: -10, marginBottom: -50 }}>
      <View style={styles.container}>
        {locationsLoading || loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        ) : (
          <MapView
            ref={mapRef}
            style={styles.map}
            region={region}
            onRegionChangeComplete={onRegionChange}
          >
            {filteredLocations.map((location, index) => {
              const latitude = parseFloat(location.Longitude);
              const longitude = parseFloat(location.Latitude);

              if (isNaN(latitude) || isNaN(longitude)) {
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
