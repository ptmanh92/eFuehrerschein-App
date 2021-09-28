import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../static/Colors';

const CardHeader = props => {
    return (
    <View style={{...styles.card_header, ...props.style}}>
        <Text style={styles.cardheader_txt}>{props.children}</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    card_header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
    },
    cardheader_txt: {
        color: Colors.tertiary,
        fontSize: 22,
        fontFamily: 'sairaRegular',
        width: '100%',
        textAlign: 'right'
    }
});

export default CardHeader;