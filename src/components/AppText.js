//Custom text component to apply the custom font as default 

import React from 'react';
import { StyleSheet, Text } from 'react-native';

const AppText = props => {
    return (
        <Text style={styles.defaultFont}>
            {props.children}
        </Text>
    );
};

const styles = StyleSheet.create({
    defaultFont: {
        fontFamily: 'sairaRegular'
    }
});

export default AppText;