// InfoModule.js
import React from 'react';
import { StyleSheet, View, Text, Modal, Button } from 'react-native';

export default function InfoModule({ visible, data, onClose }) {
  if (!data) return null;  // Only render if there is data to display


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        
          <Text style={styles.title}>{data.Name || "Location Details"}</Text>

          <Text>Aadress: {data.Address || "Not available"}</Text>

          <Text>Tüüp: {data.aTMTypes?.TypeName || "Not specified"}</Text>

          <Text>Detailid: {data.Details || "Not specified"}</Text>

          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
