import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../static/Colors';

const ButtonMainDark = props => {
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
    paddingVertical: 5,
    paddingHorizontal: 30,
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 6},
    shadowOpacity: 0.8,
    borderRadius: 11,
    elevation: 5,
    backgroundColor: Colors.tertiary
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default ButtonMainDark;
