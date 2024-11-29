import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Map from './(tabs)/map';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [fontsLoaded] = useFonts({
    'InclusiveSans-Regular': require('./../assets/fonts/InclusiveSans-Regular.ttf'),
    'AbhayaLibre-Regular': require('./../assets/fonts/AbhayaLibre-Regular.ttf'),
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

  if (!fontsLoaded) {
    return null; 
  }

  if (isSplashVisible) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white', marginTop: -50, marginBottom: -50 }}>
        <View style={styles.splashContainer}>
          <Text style={styles.maintext}>ATM</Text>
          <Text style={styles.secondtext}>Leidja</Text>
          <Image style={styles.image} source={require('./../assets/img/atmpilt.png')} />
          <Text style={styles.splashText}>
            Tere tulemast pangaautomaatide otsimise äppi!
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsSplashVisible(false)}
          >
            <Text style={styles.buttonText}>Edasi</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return <Map />;
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
