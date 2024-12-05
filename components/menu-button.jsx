import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useDarkMode } from '@/components/DarkMode';

const MenuButton = ({ handlePress, containerStyles, isLoading }) => {
  const { isDarkMode } = useDarkMode(); 

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.buttonContainer,
        containerStyles,
        { backgroundColor: isDarkMode ? '#2C2C2C' : '#EFF5FD' }, 
        isLoading ? styles.disabledButton : {},
      ]}
      disabled={isLoading}
    >
      <Image
        source={
          isDarkMode
            ? require('@/assets/img/whitefilter.png')
            : require('@/assets/img/filter.png')      
        }
        style={styles.buttonImage}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 5,
    width: 50,
    height: 42,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonImage: {
    width: 35,
    height: 30,
    resizeMode: 'contain',
  },
});

export default MenuButton;