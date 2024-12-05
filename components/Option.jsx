import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useDarkMode } from '@/components/DarkMode';

const Option = ({ option, isSelected, onPress }) => {
  
  const { isDarkMode } = useDarkMode();

  return (
    <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
      <View
        style={[
          styles.circle,
          isDarkMode && { borderColor: '#fff' },
        ]}
      >
        {isSelected && (
          <View
            style={[
              styles.selectedCircle,
              isDarkMode && { backgroundColor: '#fff' }, 
            ]}
          />
        )}
      </View>
      <Text
        style={[
          styles.optionText,
          isDarkMode && { color: '#fff' }, 
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
    borderColor: '#000', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000', 
  },
});

export default Option;
