// InfoModule.js
import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image } from 'react-native';

export default function InfoModule({ visible, data, onClose }) {
  if (!data) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image
              style={styles.closeButtonImage}
              source={require('@/assets/img/close_btn.png')} 
              resizeMode="contain" 
            />
          </TouchableOpacity>

          <Text style={styles.title}>{data.Name || "Location Details"}</Text>
          <Text style={styles.text}>Aadress: {data.Address || "Not available"}</Text>
          <Text style={styles.text}>Tüüp: {data.aTMTypes?.TypeName || "Not specified"}</Text>
          <Text style={styles.text}>Detailid: {data.Details || "Not specified"}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', 
    alignItems: 'center',      
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    paddingTop: 50,
    marginBottom: 20,
    height: 250,              
    width: '95%',          
    alignItems: 'flex-start',  // Changed from 'start' to 'flex-start'
  },
  title: {
    fontSize: 24,           
    fontWeight: 'bold',
    marginBottom: 10,  // Reduced margin to bring text closer
  },
  text: {
    fontSize: 16,  // Added a consistent font size for other text
    marginBottom: 8,  // Added margin for spacing between lines
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  closeButtonImage: {
    width: 15,   
    height: 15,  
  },
});
