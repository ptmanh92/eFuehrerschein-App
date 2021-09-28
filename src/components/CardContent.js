import React from 'react';
import { StyleSheet, View } from 'react-native';

const CardContent = props => {
    return (
    <View {...props} style={{...styles.card_content, ...props.style}}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    card_content: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }
});

export default CardContent;