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
          <View style={styles.row}>
            <Image
              style={styles.locationImage}
              source={require('@/assets/img/Location.png')}
              resizeMode="contain"
            />
            <Text style={styles.text}>{data.Address || "Not available"}</Text>
          </View>
          <View style={styles.row}>
            <Image
              style={styles.typeImage}
              source={require('@/assets/img/Cardcash.png')}
              resizeMode="contain"
            />
            <Text style={styles.text}>{data.aTMTypes?.TypeName || "Not available"}</Text>
          </View>
          <View>
            <Text style={styles.title2}>Detailid:</Text>
            <Text style={styles.details}>{data.Details || "Not specified"}</Text>
          </View>
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
    backgroundColor: '#EFF5FD',
    borderRadius: 10,
    padding: 20,
    paddingTop: 50,
    marginBottom: 20,
    height: 250,              
    width: '95%',          
    alignItems: 'flex-start', 
  },
  row: {
    flexDirection: 'row',  
    alignItems: 'center',  
    marginBottom: 5,       
  },
  title: {
    fontSize: 18,           
    fontWeight: 'bold',
    marginBottom: 10,  
  },
  title2: {
    fontSize: 18,           
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,  
  },
  text: {
    fontSize: 16, 
    marginLeft: 5,
  },
  details: {
    fontSize: 16,
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
  locationImage: {
    width: 30,   
    height: 30,
    right: 3,
  },
  typeImage: {
    width: 30,   
    height: 30,
  },
});
