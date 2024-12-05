import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Animated, TouchableWithoutFeedback, Image } from 'react-native';
import Option from '@/components/Option';
import { useNavigation } from '@react-navigation/native';
import Settings from '@/app/menu/settings';
import { useDarkMode } from '@/components/DarkMode';

const MenuFilter = ({ visible, togglePopup, selectedBanks, selectedType, setSelectedBanks, setSelectedType, banks, types }) => {
  const [shouldRender, setShouldRender] = useState(visible);
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const navigation = useNavigation();
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Access isDarkMode and toggleDarkMode

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
        <Animated.View
          style={[
            styles.popupContainer,
            { transform: [{ translateX: slideAnim }], backgroundColor: isDarkMode ? '#2C2C2C' : '#ffffff' },
          ]}
        >
          <TouchableOpacity onPress={togglePopup}>
          <Image
            source={
              isDarkMode
                ? require('@/assets/img/light_icon_close.png')
                : require('@/assets/img/close_btn.png')      
            }
            style={styles.closeButton}
          />
          </TouchableOpacity>

          <Text style={[styles.popupText, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
            Vali vajalik pank:
          </Text>
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

          <Text style={[styles.popupText, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
            Valige makse tüüp:
          </Text>
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

          <View style={[styles.divider1, { backgroundColor: isDarkMode ? '#ffffff' : '#000000' }]} />
          <TouchableOpacity onPress={toggleDarkMode}>
            <Text style={[styles.mode, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
              {isDarkMode ? 'Hele režiim' : 'Tume režiim'} {/* Dynamically change text */}
            </Text>
          </TouchableOpacity>
          <View style={[styles.divider2, { backgroundColor: isDarkMode ? '#ffffff' : '#000000' }]} />
          <TouchableOpacity onPress={handleSettingsPress}>
            <Text style={[styles.mode, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
              Sätted
            </Text>
          </TouchableOpacity>

          <Modal
            visible={isSettingsVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={closeSettings}
          >
            <TouchableWithoutFeedback onPress={closeSettings}>
              <View style={styles.overlay}>
                <TouchableOpacity onPress={closeSettings}>
                  <Image
                    source={
                      isDarkMode
                        ? require('@/assets/img/light_icon_close.png')
                        : require('@/assets/img/close_btn.png')      
                    }
                    style={styles.closeButton}
                  />
                </TouchableOpacity>
                  <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#2C2C2C' : '#ffffff' }]}>
                    <Settings />
                  </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Text style={[styles.mode, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
            Tingimused & teenused
          </Text>
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
    backgroundColor: useDarkMode ? '#121212' : '#ffffff', 
  },
  popupText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40,
    color: useDarkMode ? '#ffffff' : '#000000',
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
  },
  divider2: {
    height: 1,
    marginTop: 10,
  },
  mode: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: useDarkMode ? '#ffffff' : '#000000',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
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
