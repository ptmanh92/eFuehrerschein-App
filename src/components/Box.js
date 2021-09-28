import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Colors from '../static/Colors';

const Box = props => {
    return (
        <View style={{...styles.box_container, ...props.style}}>{props.children}</View>
    );};

const styles = StyleSheet.create({
    box_container: {
        flexDirection: 'column',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'center'
    }
});

export default Box;