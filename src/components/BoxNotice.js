import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// import Colors from '../static/Colors';

const BoxNotice = props => {
    return (
    <View style={{...styles.box_notice, ...props.style}} {...props}>
        <Text style={styles.box_notice_txt}>{props.children}</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    box_notice: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
        // backgroundColor: 'orange'
    },
    box_notice_txt: {
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default BoxNotice;