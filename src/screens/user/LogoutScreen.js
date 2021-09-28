import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import Wrapper from '../../components/Wrapper';
import MainContent from '../../components/MainContent';
import Box from '../../components/Box';
import BoxHeader from '../../components/BoxHeader';

import Colors from '../../static/Colors';

const LogoutScreen = props => {
    const logout = () => {
        let obj = { user_id: '', username: '', photo: 'https://efuehrerschein.s3.eu-central-1.amazonaws.com/passphoto/100-Admin.png', email: '' };
        AsyncStorage.mergeItem('user', JSON.stringify(obj));
        props.navigation.navigate('Auth');
    }

    logout();

    return (
        <Wrapper>
            <MainContent style={{justifyContent: 'center', marginVertical: 100}}>
                <Box style={styles.box}>
                    <BoxHeader>Einen Moment bitte...</BoxHeader>
                </Box>
            </MainContent>
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    box: {
        width: '65%',
        borderRadius: 20,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        // marginVertical: '20%'
    },
    textfield: {
        fontSize: 15
    },
}

);

export default LogoutScreen;