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
    backgroundColor: 'rgba(239, 245, 253, 0.9)',
    borderRadius: 16,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonImage: {
    width: 24,
    height: 24,
  },
});

export { MenuButton };
