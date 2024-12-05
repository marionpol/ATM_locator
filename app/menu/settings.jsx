import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';

const Settings = () => {
  const handlePress = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else if (Platform.OS === 'android') {
      Linking.openSettings();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sätted</Text>
      <View style={styles.row}>
        <Text style={styles.text}>Asukoha jagamine:</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Muuda</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Vertically center the items
    marginTop: 20, // Add some space between the title and the row
  },
  text: {
    fontSize: 16,
    textAlign: 'left', // Align the text to the left
    marginRight: 25, // Increase the space between the text and the button
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007CFD', // Button background color
    borderRadius: 5, // Rounded corners
  },
  buttonText: {
    color: '#fff', // Text color
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Center the button text
  },
});

export default Settings;
