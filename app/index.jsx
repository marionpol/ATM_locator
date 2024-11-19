import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Map from './(tabs)/map';

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true); // Splash screen visibility state

  if (isSplashVisible) {
    return (

      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>Welcome to the App</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsSplashVisible(false)} 
        >
          <Text style={styles.buttonText}>Go to Map</Text>
        </TouchableOpacity>
      </View>

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
  splashText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: 'tomato',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
