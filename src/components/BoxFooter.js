import React from 'react';
import { StyleSheet, View } from 'react-native';

const BoxFooter = props => {
    return (
    <View style={{...styles.box_footer, ...props.style}}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    box_footer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    }
});

export default BoxFooter;