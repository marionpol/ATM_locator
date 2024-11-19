// components/filter-menu.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MenuFilter = ({ visible, togglePopup }) => {
  return (
    <View style={[styles.modalOverlay, { display: visible ? 'flex' : 'none' }]}>
      <View
        style={[
          styles.popupContainer,
          {
            transform: [{ translateX: visible ? 0 : -300 }], // Slide effect
          },
        ]}
      >
        <Text style={styles.popupText}>Filter Options</Text>
        {/* Add any filter options here */}
        <TouchableOpacity onPress={togglePopup} style={styles.closeButton}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start', // Left side alignment
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  popupContainer: {
    width: 250,
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  popupText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
});

export { MenuFilter };
