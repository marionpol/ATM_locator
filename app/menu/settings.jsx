import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { useDarkMode } from '@/components/DarkMode'; // Assuming this hook exists

const Settings = () => {
  const { isDarkMode } = useDarkMode(); // Get the dark mode status

  const handlePress = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else if (Platform.OS === 'android') {
      Linking.openSettings();
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.title, isDarkMode && styles.textDark]}>Sätted</Text>
      <View style={styles.row}>
        <Text style={[styles.text, isDarkMode && styles.textDark]}>Asukoha jagamine:</Text>
        <TouchableOpacity style={[styles.button, isDarkMode && styles.buttonDark]} onPress={handlePress}>
          <Text style={[styles.buttonText, isDarkMode && styles.buttonTextDark]}>Muuda</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#2C2C2C', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000', 
  },
  textDark: {
    color: '#FFF', 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
    marginRight: 25,
    color: '#000', 
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007CFD',
    borderRadius: 5,
  },
  buttonDark: {
    backgroundColor: '#1E88E5', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextDark: {
    color: '#BBDEFB',
  },
});

export default Settings;
