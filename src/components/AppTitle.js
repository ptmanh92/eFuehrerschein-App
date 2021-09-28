import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const AppTitle = props => {
    return (
        <View style={styles.app_title}>
            <Text style={styles.app_title_txt}>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    app_title: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingTop: 0,
        paddingBottom: 70,
        // backgroundColor: 'red',
    },
    app_title_txt: {
        textAlign: 'center',
        fontSize: 38,
        // backgroundColor: 'orange'
    }
});

export default AppTitle;