import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MenuButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  }
});

export default MenuButton;
