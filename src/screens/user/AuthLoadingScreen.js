import React from 'react';
import { StyleSheet, ActivityIndicator, StatusBar, View, AsyncStorage } from 'react-native';

import Colors from '../../static/Colors';

const AuthLoadingScreen = props => {
    let user_id_stored;
    getUserID = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            if (user !== null) {
                let parsed = JSON.parse(user);
                user_id_stored = parsed.user_id;
                if (user_id_stored != '') {
                    props.navigation.navigate('App');
                } else {
                    props.navigation.navigate('Auth');
                }
            } else {
                props.navigation.navigate('Auth');
            }
            console.log('Current user id: ' + user_id_stored);
        } catch (error) {
            alert(error);
        }
    }
    getUserID();

    return (
        <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary
    },
});

export default AuthLoadingScreen;