import React from 'react';
import{StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../static/Colors';

const Card = props => {
    return(
        <TouchableOpacity {...props} style={{...styles.card_container, ...props.style}}>
            {props.children}
        </TouchableOpacity>
    );

};

const styles = StyleSheet.create({
    card_container: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '85%',
    }

})

export default Card;