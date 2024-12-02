import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, TouchableWithoutFeedback, Image } from 'react-native';
import Option from '@/components/Option';

const MenuFilter = ({ visible, togglePopup, selectedBanks, selectedType, setSelectedBanks, setSelectedType, banks, types }) => {
  const [shouldRender, setShouldRender] = useState(visible);
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
            <Image style={styles.closeButton} source={require('@/assets/img/close_btn.png')} />
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

          <Text style={styles.popupText}>Valige vajalik tüüp:</Text>
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
          <Text style={styles.mode}>Tume režiim</Text>
          <View style={styles.divider2} />

          <Text style={styles.mode}>Sätted</Text>
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
    backgroundColor: '#fff',
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
    color: 'black',
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  optionsContainer: {
    marginTop: 20,
  },
  divider1: {
    height: 1,
    backgroundColor: '#000',
    marginTop: 210,
  },
  divider2: {
    height: 1,
    backgroundColor: '#000',
    marginTop: 10,
  },
  mode: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default MenuFilter;
