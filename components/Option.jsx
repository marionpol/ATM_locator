import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const Option = ({ option, isSelected, onPress, darkMode }) => {
  return (
    <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
      <View
        style={[
          styles.circle,
          darkMode && { borderColor: '#fff' }, // Change border color for dark mode
        ]}
      >
        {isSelected && (
          <View
            style={[
              styles.selectedCircle,
              darkMode && { backgroundColor: '#fff' }, // Change fill color for dark mode
            ]}
          />
        )}
      </View>
      <Text
        style={[
          styles.optionText,
          darkMode && { color: '#fff' }, // Change text color for dark mode
        ]}
      >
        {option}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000', // Default border color
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000', // Default fill color
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000', // Default text color
  },
});

export default Option;
