import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, ActivityIndicator, StatusBar, Dimensions, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MenuButton from '@/components/menu-button';
import MenuFilter from '@/app/menu/filter-menu';
import InfoModule from '@/app/menu/info-menu';
import { Client, Databases, Query } from 'appwrite';
import { databaseID, endpoint, locationDBID, projectID, bankID, typeID } from '@/appwrite.config';
import useAppwrite from '@/constants/useAppwrite';
import Header from '@/components/mainheader';
import * as Location from 'expo-location';  

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
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isInfoVisible, setInfoVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
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

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const getPinImage = (bankName) => {
    switch (bankName.toLowerCase()) {
      case 'swedbank':
        return require('@/assets/img/swedpin.png');
      case 'seb':
        return require('@/assets/img/SEBpin.png');
      case 'lhv':
        return require('@/assets/img/LHVpin.png');
      default:
        return 'black'; 
    }
  };

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
  };

  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    } else {
      Alert.alert('Location Permission Denied', 'Please enable location services to find nearby ATMs.');
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <SafeAreaView
    edges={"top"}
      style={{
        flex: 1,
      }}
    >
      <StatusBar
        translucent={false} 
        backgroundColor="#ffffff" 
        barStyle="dark-content" 
      />
      <Header/>
      <View style={styles.container}>
        {locationsLoading || loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        ) : (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={region}  
            region={region} 
            onRegionChangeComplete={onRegionChangeComplete} 
            rotateEnabled={true}
            scrollEnabled={true} 
            zoomEnabled={true} 
            maxDelta={2}
          >
            {userLocation && (
              <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="Your Location"
              description="This is your current location"
            >
              <Image
                source={require('@/assets/img/yourlocation.png')}
                style={{ width: 35, height: 35 }}
              />
            </Marker>
            )}

            {filteredLocations.map((location, index) => {
              const latitude = parseFloat(location.Longitude);
              const longitude = parseFloat(location.Latitude);

              if (isNaN(latitude) || isNaN(longitude)) {
                return null;
              }

              const primaryBank = location.banks?.[0]?.BankName || '';

              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude,
                    longitude,
                  }}
                  image={getPinImage(primaryBank)} 
                  onPress={() => {
                    setSelectedLocation(location);
                    setInfoVisible(true);
                  }}
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

        <InfoModule
          visible={isInfoVisible}
          data={selectedLocation}
          onClose={() => setInfoVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');

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
    top: height * 0.02,
    left: width * 0.04, 
    zIndex: 10,
    width: width * 0.8, 
  },
});
