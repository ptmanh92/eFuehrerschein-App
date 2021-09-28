import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import Colors from '../static/Colors';

const InputText = props => {
    return (
        <TextInput {...props} style={{...styles.textfield, ...props.style}} />
    );
};

const styles = StyleSheet.create({
    textfield: {
        height: 30,
        borderRadius: 15,
        marginVertical: 5,
        fontSize: 14,
        fontFamily: 'sairaRegular',
        color: Colors.tertiary,
        width: '100%',
        paddingVertical: 3,
        paddingHorizontal: 18,
        backgroundColor: Colors.primary
    }
});

export default InputText;