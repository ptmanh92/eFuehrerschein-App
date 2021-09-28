import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Alert, AsyncStorage } from 'react-native';
import Wrapper from '../../components/Wrapper';
import MainContent from '../../components/MainContent';
import Box from '../../components/Box';
import BoxContent from '../../components/BoxContent';
import BoxHeader from '../../components/BoxHeader';
import InputText from '../../components/InputText';
import BoxFooter from '../../components/BoxFooter';
import ButtonMainLight from '../../components/ButtonMainLight';
import * as Localization from 'expo-localization';
import I18n from 'ex-react-native-i18n';

import Colors from '../../static/Colors';

const ForgetPasswordScreen = props => {
    // Translations
    I18n.fallbacks = true;
    I18n.translations = {
        en: {
            headertitle: 'You can reset your password here',
            headerdesc: 'Please enter your email and we will help you get your password back.',
            resetpassword: 'Reset password',
            reset: 'Reset',
        },
        de: {
            headertitle: 'Setzen Sie Ihr Passwort zurück',
            headerdesc: 'Geben Sie Ihre E-Mail Adresse ein und wir helfen Ihnen Ihr Passwort zurück zu setzen.',
            resetpassword: 'Passwort zurücksetzen',
            reset: 'Zurücksetzen',
        },
        vi: {
            headertitle: 'Bạn có thể đặt lại mật khẩu tại đây',
            headerdesc: 'Hãy nhập vào địa chỉ email để lấy lại mật khẩu',
            resetpassword: 'Đặt lại mật khẩu',
            reset: 'Gửi đi',
        }
    }
    I18n.locale = props.screenProps.locale;

    let user_id_stored, local_host, local_port, reset_password;
    getData = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            if (user != null) {
                let parsed_user = JSON.parse(user);
                user_id_stored = parsed_user.user_id;
                // console.log('Current user id: ' + user_id_stored);

                let connection = await AsyncStorage.getItem('connection');
                let parsed_connection = JSON.parse(connection);
                local_host = parsed_connection.host;
                local_port = parsed_connection.port;
                reset_password = parsed_connection.reset_password;
            }
        } catch (error) {
            alert(error);
        }
    }
    getData();

    const [email_input, setEmailInput] = useState('');
    const emailInputHandler = inputText => {
        setEmailInput (inputText);
    };

    const resetInput = () => {
        setEmailInput('');
        setUsernameInput('');
    }

    const updatePass = () => {
        if (username_input == '' || email_input == '') {
            Alert.alert('Bitte füllen Sie alle Felder aus.');
        } else {
            console.log('fetching data...');
            let url = local_host + ':' + local_port + reset_password;
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify ({
                    email: email_input
                })
            })
            .then((response) => response.json())
            .then((res) => {
                resetInput();
                if (res.statutsCode === 404) {
                    console.log('Email wrong.');
                    Alert.alert('Email ist falsch');
                } else if (res.statutsCode === 400) {
                    console.log('Account not yet activated.');
                    Alert.alert('Ihr Konto ist noch nicht aktiviert.');
                } else if (res.statutsCode === 200) {
                    console.log('Email sent!')
                    Alert.alert('In Kürze erhalten Sie eine E-Mail.\n Öffnen Sie die E-Mail und \n folgen Sie der Anleitung, \n um Passwort zurückzusetzen.');
                    props.navigation.navigate('Auth');
                } else {
                    console.log("connection failed");
                    Alert.alert('Verbindungsfehler');
                }
            })
            .done();
        }
    }

    return (
        <Wrapper>
            <MainContent style={{justifyContent: 'center', marginVertical: 30}}>
                <Box style={styles.box_title}>
                    <Text style={styles.header_title}>{I18n.t('headertitle')}</Text>
                    <BoxContent style={styles.box_content_instruction}>
                        <Text style={styles.box_content_instruction_txt}>{I18n.t('headerdesc')}</Text>
                    </BoxContent>
                </Box>
                <Box style={styles.box}>
                    <BoxHeader>{I18n.t('resetpassword')}</BoxHeader>
                    {/* <BoxNotice>Error here</BoxNotice> */}
                    <BoxContent>
                        <InputText style={styles.textfield} placeholder="E-Mail" autoCapitalize='none'
                            onChangeText={emailInputHandler} value={email_input} />
                    </BoxContent>
                    <BoxFooter>
                        <ButtonMainLight onPress={() => {updatePass();}}>{I18n.t('reset')}</ButtonMainLight>
                        {/* <Button title="zurücksetzen" onPress={() => Alert.alert('In Kürze erhalten Sie eine E-Mail. Öffnen Sie die E-Mail und folgen Sie der Anleitung, um Passwort zurücksetzen')} /> */}
                    </BoxFooter>
                </Box>
            </MainContent>
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    box_title: {
        paddingHorizontal: 0,
        width: '85%',
        alignItems: 'flex-start'
    },
    header_title: {
        fontSize: 22,
        fontFamily: 'sairaBold',
        color: Colors.tertiary,
        textAlign: 'left',
        width: '85%'
    },
    box_content_instruction: {
        alignItems: 'flex-start',
       
    },
    box_content_instruction_txt: {
        alignItems: 'flex-start',
        textAlign: 'left',
        fontSize: 18,
        fontFamily: 'sairaRegular',
        color: Colors.tertiary,
        marginBottom: '15%'
    },
    box: {
        width: '65%',
        borderRadius: 20,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
    },
    textfield: {
        fontSize: 15
    },
}

);

export default ForgetPasswordScreen;