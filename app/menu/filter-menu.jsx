import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, TouchableWithoutFeedback, Image } from 'react-native';
import Option from '@/components/Option';

const MenuFilter = ({ visible, togglePopup, selectedBanks, selectedType, setSelectedBanks, setSelectedType, banks, types }) => {
  const [shouldRender, setShouldRender] = useState(visible);
  const [darkMode, setDarkMode] = useState(false); 
  const slideAnim = useRef(new Animated.Value(-300)).current;

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

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
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

  const currentStyles = darkMode ? darkStyles : lightStyles; 

  return (
    <TouchableWithoutFeedback onPress={togglePopup}>
      <View style={currentStyles.modalOverlay}>
        <Animated.View style={[currentStyles.popupContainer, { transform: [{ translateX: slideAnim }] }]}>
        <TouchableOpacity onPress={togglePopup}>
            <Image
              style={baseStyles.closeButton}
              source={
                darkMode
                  ? require('@/assets/img/light_icon_close.png') 
                  : require('@/assets/img/close_btn.png') 
              }
            />
          </TouchableOpacity>

          <Text style={currentStyles.popupText}>Vali vajalik pank:</Text>
          <View style={currentStyles.optionsContainer}>
            {banks.map((bank) => (
              <Option
                key={bank.$id}
                option={bank.BankName}
                isSelected={selectedBanks.includes(bank.$id)}
                onPress={() => handleBankPress(bank)}
                darkMode={darkMode}
              />
            ))}
          </View>

          <Text style={currentStyles.popupText}>Valige makse tüüp:</Text>
          <View style={currentStyles.optionsContainer}>
            {types.map((type) => (
              <Option
                key={type.$id}
                option={type.TypeName}
                isSelected={selectedType === type.$id}
                onPress={() => handleTypePress(type)}
                darkMode={darkMode}
              />
            ))}
          </View>

          <View style={currentStyles.divider1} />
          <TouchableOpacity onPress={toggleDarkMode}>
            <Text style={currentStyles.mode}>{darkMode ? 'Hele režiim' : 'Tume režiim'}</Text>
          </TouchableOpacity>
          <View style={currentStyles.divider2} />

          <Text style={currentStyles.mode}>Sätted</Text>
          <Text style={currentStyles.mode}>Tingimused & teenused</Text>
          
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const baseStyles = {
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
  },
  popupText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40,
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
  },
};

const lightStyles = StyleSheet.create({
  ...baseStyles,
  popupContainer: {
    ...baseStyles.popupContainer,
    backgroundColor: '#fff',
  },
  popupText: {
    ...baseStyles.popupText,
    color: '#000',
  },
  divider1: {
    ...baseStyles.divider1,
    backgroundColor: '#000',
  },
  divider2: {
    ...baseStyles.divider2,
    backgroundColor: '#000',
  },
  mode: {
    ...baseStyles.mode,
    color: '#000',
  },
});

const darkStyles = StyleSheet.create({
  ...baseStyles,
  popupContainer: {
    ...baseStyles.popupContainer,
    backgroundColor: '#333',
  },
  popupText: {
    ...baseStyles.popupText,
    color: '#fff',
  },
  divider1: {
    ...baseStyles.divider1,
    backgroundColor: '#fff',
  },
  divider2: {
    ...baseStyles.divider2,
    backgroundColor: '#fff',
  },
  mode: {
    ...baseStyles.mode,
    color: '#fff',
  },
});

export default MenuFilter;
