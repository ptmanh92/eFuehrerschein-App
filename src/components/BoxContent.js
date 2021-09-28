import React from 'react';
import { StyleSheet, View } from 'react-native';

const BoxContent = props => {
    return (
    <View style={styles.box_content}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    box_content: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }
});

export default BoxContent;