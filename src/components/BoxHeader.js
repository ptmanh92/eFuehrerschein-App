import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// import Colors from '../static/Colors';

const BoxHeader = props => {
    return (
    <View style={{...styles.box_header, ...props.style}}>
        <Text style={styles.boxheader_txt}>{props.children}</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    box_header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
        // backgroundColor: 'orange'
    },
    boxheader_txt: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'sairaBold',
        textAlign: 'center'
    }
});

export default BoxHeader;