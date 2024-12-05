import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // Stack navigator for navigation
import Map from './(tabs)/map'; // Your Map screen
import Settings from '@/app/menu/settings';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'InclusiveSans-Regular': require('@/assets/fonts/InclusiveSans-Regular.ttf'),
    'AbhayaLibre-Regular': require('@/assets/fonts/AbhayaLibre-Regular.ttf'),
  });

  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const prepareApp = async () => {
      await SplashScreen.preventAutoHideAsync(); 
      if (fontsLoaded) {
        await SplashScreen.hideAsync(); 
      }
    };
    prepareApp();
  }, [fontsLoaded]); 

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      console.log(location);
    } else {
      Alert.alert('Location Permission Denied', 'We need your location to show nearby ATMs.');
    }
  };

  const handleButtonPress = () => {
    Alert.alert(
      'Allow Location Access?',
      'Do you want to share your location to find nearby ATMs?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Location access denied'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => requestLocationPermission(),
        },
      ]
    );
  };

  if (!fontsLoaded) {
    return null; 
  }

  if (isSplashVisible) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white', marginTop: -50, marginBottom: -50 }}>
        <View style={styles.splashContainer}>
          <Text style={styles.maintext}>ATM</Text>
          <Text style={styles.secondtext}>Leidja</Text>
          <Image style={styles.image} source={require('@/assets/img/atmpilt.png')} />
          <Text style={styles.splashText}>
            Tere tulemast pangaautomaatide otsimise äppi!
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setIsSplashVisible(false);
              handleButtonPress(); 
            }}
          >
            <Text style={styles.buttonText}>Edasi</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Return your Stack Navigator
  return (
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Map} 
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings} 
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  maintext: {
    fontSize: 100,
    textAlign: 'center',
    marginTop: -100,
    fontFamily: 'AbhayaLibre-Regular',
  },
  secondtext: {
    textAlign: 'center',
    marginTop: -30,
    fontSize: 22,
    fontFamily: 'InclusiveSans-Regular',
  },
  image: {
    width: 300,
    height: 300,
  },
  splashText: {
    fontSize: 22,
    fontFamily: 'InclusiveSans-Regular',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#333',
    padding: 5
  },
  button: {
    backgroundColor: '#007CFD',
    padding: 10,
    borderRadius: 5,
    width: 250,
    height: 49,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'InclusiveSans-Regular',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
