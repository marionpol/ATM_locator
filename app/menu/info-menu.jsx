import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDarkMode } from '@/components/DarkMode';

export default function InfoModule({ visible, data, onClose }) {
  if (!data) return null;

  const { isDarkMode } = useDarkMode();

  const handleModalClose = () => {
    Keyboard.dismiss();
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleModalClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={[
                styles.modalContent,
                isDarkMode && styles.modalContentDark, 
              ]}
            >
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Image
                source={
                  isDarkMode
                    ? require('@/assets/img/light_icon_close.png')
                    : require('@/assets/img/close_btn.png')      
                }
                style={styles.closeButtonImage}
              />
              </TouchableOpacity>

              <Text
                style={[
                  styles.title,
                  isDarkMode && styles.textDark, 
                ]}
              >
                {data.Name || "Location Details"}
              </Text>
              <Text
                style={[
                  styles.bank,
                  isDarkMode && styles.textDark, 
                ]}
              >
                {data.banks?.[0]?.BankName || "Bank"}
              </Text>
              <View style={styles.row}>
                <Image
                  style={styles.locationImage}
                  source={require('@/assets/img/Location.png')}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.text,
                    isDarkMode && styles.textDark, 
                  ]}
                >
                  {data.Address || "Not available"}
                </Text>
              </View>
              <View style={styles.row}>
                <Image
                  style={styles.typeImage}
                  source={require('@/assets/img/Cardcash.png')}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.text,
                    isDarkMode && styles.textDark, 
                  ]}
                >
                  {data.aTMTypes?.TypeName || "Not available"}
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    styles.title2,
                    isDarkMode && styles.textDark, 
                  ]}
                >
                  Detailid:
                </Text>
                <Text
                  style={[
                    styles.details,
                    isDarkMode && styles.textDark, 
                  ]}
                >
                  {data.Details || "Not specified"}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
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
  modalContentDark: {
    backgroundColor: '#2C2C2C', 
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
    color: '#000', 
  },
  bank: {
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    flex: 1,
    alignSelf: 'center',
    margin: 20,
    color: '#000',
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: '#000',
  },
  text: {
    fontSize: 16,
    marginLeft: 5,
    color: '#000', 
  },
  details: {
    fontSize: 16,
    color: '#000', 
  },
  textDark: {
    color: '#FFF', 
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
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
