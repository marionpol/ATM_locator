import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const MenuButton = ({ handlePress, containerStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.buttonContainer,
        containerStyles,
        isLoading ? styles.disabledButton : {},
      ]}
      disabled={isLoading}
    >
      <Image source={require('@/assets/img/filter.png')} style={styles.buttonImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#EFF5FD',
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
    width: 30,
    height: 21,
  },
});

export { MenuButton };
