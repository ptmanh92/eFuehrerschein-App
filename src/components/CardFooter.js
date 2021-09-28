import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../static/Colors';

const CardFooter = props => {
    return (
    <View style={{...styles.card_footer, ...props.style}}>
        <Text style={styles.cardfooter_txt}>{props.children}</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    card_footer: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'orange'
    },
    cardfooter_txt: {
        color: Colors.tertiary,
        fontSize: 22,
        fontFamily: 'sairaRegular',
        textAlign: 'center'
    }
});

export default CardFooter;