import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Animated, TouchableWithoutFeedback, Image } from 'react-native';
import Option from '@/components/Option';
import { useNavigation } from '@react-navigation/native';
import Settings from '@/app/menu/settings';

const MenuFilter = ({ visible, togglePopup, selectedBanks, selectedType, setSelectedBanks, setSelectedType, banks, types }) => {
  const [shouldRender, setShouldRender] = useState(visible);
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const navigation = useNavigation();

  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const handleBankPress = (bank) => {
    setSelectedBanks((prevSelected) => {
      if (prevSelected.includes(bank.$id)) {
        return prevSelected.filter((id) => id !== bank.$id);
      }
      return [...prevSelected, bank.$id];
    });
  };

  const handleTypePress = (type) => {
    setSelectedType((prevType) => (prevType === type.$id ? null : type.$id));
  };

  const handleSettingsPress = () => {
    setIsSettingsVisible(true); 
  };

  const closeSettings = () => {
    setIsSettingsVisible(false); 
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (!visible) setShouldRender(false);
    });

    if (visible) setShouldRender(true);
  }, [visible, slideAnim]);

  if (!shouldRender) return null;

  return (
    <TouchableWithoutFeedback onPress={togglePopup}>
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.popupContainer, { transform: [{ translateX: slideAnim }] }]}>
          <TouchableOpacity onPress={togglePopup}>
            <Image
              style={styles.closeButton}
              source={require('@/assets/img/close_btn.png')}
            />
          </TouchableOpacity>

          <Text style={styles.popupText}>Vali vajalik pank:</Text>
          <View style={styles.optionsContainer}>
            {banks.map((bank) => (
              <Option
                key={bank.$id}
                option={bank.BankName}
                isSelected={selectedBanks.includes(bank.$id)}
                onPress={() => handleBankPress(bank)}
              />
            ))}
          </View>

          <Text style={styles.popupText}>Valige makse tüüp:</Text>
          <View style={styles.optionsContainer}>
            {types.map((type) => (
              <Option
                key={type.$id}
                option={type.TypeName}
                isSelected={selectedType === type.$id}
                onPress={() => handleTypePress(type)}
              />
            ))}
          </View>

          <View style={styles.divider1} />
          <TouchableOpacity onPress={handleSettingsPress}>
            <Text style={styles.mode}>Tume režiim</Text>
          </TouchableOpacity>
          <View style={styles.divider2} />
          <TouchableOpacity onPress={handleSettingsPress}>
            <Text style={styles.mode}>Sätted</Text>
          </TouchableOpacity>

          <Modal
            visible={isSettingsVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={closeSettings}
          >
            <TouchableWithoutFeedback onPress={closeSettings}>
              <View style={styles.overlay}>
                <View style={styles.modalContent}>
                <TouchableOpacity onPress={closeSettings}>
                  <Image
                    style={styles.closeButton}
                    source={require('@/assets/img/close_btn.png')}
                  />
                </TouchableOpacity>
                  <Settings />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Text style={styles.mode}>Tingimused & teenused</Text>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'absolute',
    top: 15,
    bottom: -50,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  popupContainer: {
    width: 280,
    height: '100%',
    padding: 20,
    justifyContent: 'flex-start',
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: '5%',
    backgroundColor: '#EFF5FD', // Light background color for light mode
  },
  popupText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40,
    color: '#000', // Text color for light mode
  },
  closeButton: {
    position: 'absolute',
    top: 1,
    right: 1,
    zIndex: 20,
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  optionsContainer: {
    marginTop: 20,
  },
  divider1: {
    height: 1,
    marginTop: 210,
    backgroundColor: '#000',
  },
  divider2: {
    height: 1,
    marginTop: 10,
    backgroundColor: '#000',
  },
  mode: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay effect
  },
  modalContent: {
    width: 350,
    height: 150,
    padding: 20,
    backgroundColor: '#EFF5FD',
    borderRadius: 10,
  },
  closeText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default MenuFilter;
