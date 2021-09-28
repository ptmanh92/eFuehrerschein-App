import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView } from 'react-native';

import Colors from '../static/Colors';

const WrapperQRCode = props => {
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <ScrollView style={{...styles.scrollen, ...props.style}}>
                <KeyboardAvoidingView 
                    style={{ flex: 1, justifyContent: 'center', /*backgroundColor: 'blue'*/}} 
                    keyboardVerticalOffset={10} 
                    behavior="padding" 
                    enabled>
                    <View style={styles.viewcontainer}>{props.children}</View>
                </KeyboardAvoidingView>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    scrollen: {
        width: '100%',
        // backgroundColor: Colors.QRCodepage,
    },
    viewcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        // backgroundColor: 'orange'
    }
});

export default WrapperQRCode;