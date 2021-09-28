import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, AsyncStorage, Alert, Image, Dimensions } from 'react-native';
import { AntDesign, Ionicons, SimpleLineIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import WrapperQRCode from '../../components/WrapperQRCode';
import MainContent from '../../components/MainContent';
import Box from '../../components/Box';
import BoxHeader from '../../components/BoxHeader';
import BoxNotice from '../../components/BoxNotice';
import BoxContent from '../../components/BoxContent';
import BoxFooter from '../../components/BoxFooter';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import InputText from '../../components/InputText';
import AppTitle from '../../components/AppTitle';
import AppText from '../../components/AppText';
import ButtonMainLight from '../../components/ButtonMainLight';
import * as Localization from 'expo-localization';
import I18n from 'ex-react-native-i18n';

import Colors from '../../static/Colors';

const LoginScreen = props => {
    I18n.fallbacks = true;
    I18n.translations = {
        en: {
            signin: 'Sign in',
            login: 'Login',
            usernameplaceholder: 'Username',
            passwordplaceholder: 'Password',
            forgotpassword: 'Forgot password?',
            qrcodescanner: 'Scan a licence',
            logotxt: 'Your licenses digital'
        },
        de: {
            signin: 'Anmelden',
            login: 'Einloggen',
            usernameplaceholder: 'Benutzername',
            passwordplaceholder: 'Passwort',
            forgotpassword: 'Passwort vergessen?',
            qrcodescanner: 'Führerschein scannen',
            logotxt: 'Deine Führerscheine digital'
        },
        vi: {
            signin: 'Đăng nhập',
            login: 'Truy cập',
            usernameplaceholder: 'Tên đăng nhập',
            passwordplaceholder: 'Mật khẩu',
            forgotpassword: 'Quên mật khẩu?',
            qrcodescanner: 'Giấy phép quét'
        }
    }
    // I18n.locale = Localization.locale;
    I18n.locale = props.screenProps.locale;
    
    const [app_lang, setAppLang] = useState('');
    const [lang_activated, setLangActivated] = useState('');
    const [dark_mode, set_dark_mode] = useState(false);

    let user_id_stored, local_host, local_port, login_request;
    getData = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user != null) {
                let parsed_user = JSON.parse(user);
                user_id_stored = parsed_user.user_id;
                // console.log('Current user id: ' + user_id_stored);
            }

            const connection = await AsyncStorage.getItem('connection');
            if (connection != null) {
                let parsed_connection = JSON.parse(connection);
                local_host = parsed_connection.host;
                local_port = parsed_connection.port;
                login_request = parsed_connection.login_request;
            }

            //Get dark mode from local storage
            // const get_darkmode = await AsyncStorage.getItem('darkmode');
            // if (get_darkmode !== null) {
            //     let parsed_get_darkmode = JSON.parse(get_darkmode);
            //     let is_on = parsed_get_darkmode.is_on;
            //     set_dark_mode(is_on);
            // } else {
            //     set_dark_mode(false);
            // }
        } catch (error) {
            alert(error);
        }
    }
    getData();

    const [username_input, setUsernameInput] = useState('');
    const usernameInputHandler = inputText => {
        setUsernameInput(inputText);
    };

    const [password_input, setPasswordInput] = useState('');
    const passwordInputHandler = inputText => {
        setPasswordInput(inputText);
    };

    const resetInput = () => {
        setUsernameInput('');
        setPasswordInput('');
    }

    // get_dark_mode = async () => {
    //     const get_darkmode = await AsyncStorage.getItem('darkmode');
    //     if (get_darkmode !== null) {
    //         let parsed_get_darkmode = JSON.parse(get_darkmode);
    //         let is_on = parsed_get_darkmode.is_on;
    //         set_dark_mode(is_on);
    //     } else {
    //         set_dark_mode(false);
    //     }
    // }
    // get_dark_mode();

    login = () => {
        console.log('fetching data...');
        if (username_input == '' || password_input == '') {
            Alert.alert('Bitte füllen Sie alle Felder aus.');
        } else {
            let url = local_host + ':' + local_port + login_request;
            console.log(url);
            fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username_input,
                    password: password_input,
                })
            })
            .then((response) => response.json())
            .then((res) => {
                if (res.statutsCode === 200) {
                    console.log('user_id from DB: ' + res.user.user_id);
                    let obj = { 
                                user_id: res.user.user_id, 
                                username: res.user.username,
                                photo: res.user.photo_url,
                                email: res.user.email_address
                            };
                    AsyncStorage.mergeItem('user', JSON.stringify(obj));
                    getData();
                    resetInput();
                    props.navigation.navigate('App');
                } else if (res.statutsCode === 204) {
                    let obj = { 
                                user_id: res.user.user_id, 
                                username: res.user.username,
                                photo: res.user.photo_url,
                                email: res.user.email_address
                            };
                    AsyncStorage.mergeItem('user', JSON.stringify(obj));
                    getData();
                    resetInput();
                    props.navigation.navigate('UpdateData');
                } else if (res.statutsCode === 401) {
                    console.log('Username/Passwort wrong!');
                    Alert.alert('Benutzername/Passwort ist falsch');
                } else {
                    console.log('connection failed');
                    Alert.alert('Verbindungsfehler');
                }
            })
            .done();
        }
    };

    // Customize theme
    set_wrapper_bkgr = () => {
        if (dark_mode) {
            return {
                backgroundColor: Colors.tertiary,
            };
        } else {
            return {
                backgroundColor: Colors.primary,
            };
        }
    }
    set_app_title_txt = () => {
        if (dark_mode) {
            return {
                textAlign: 'center',
                fontFamily: 'sairaRegular',
                color: Colors.primary
            };
        } else {
            return {
                textAlign: 'center',
                fontFamily: 'sairaRegular',
                color: Colors.tertiary
            };
        }
    }
    set_forgot_pass_style = () => {
        if (dark_mode) {
            return {
                marginTop: 10,
                fontFamily: 'sairaRegular',
                color: Colors.primary
            };
        } else {
            return {
                marginTop: 10,
                fontFamily: 'sairaRegular',
                color: Colors.tertiary
            };
        }
    }
    set_qr_text_style = () => {
        if (dark_mode) {
            return {
                marginTop: 5, 
                fontFamily: 'sairaRegular',
                color: Colors.primary
            };
        } else {
            return {
                marginTop: 5, 
                fontFamily: 'sairaRegular',
                color: Colors.tertiary
            };
        }
    }

    useEffect(() => {
        async function update_data() {
            try {
                // const language = await AsyncStorage.getItem('language');
                // if (language != null) {
                //     let parsed_lang = JSON.parse(language);
                //     let current_lang = parsed_lang.current_lang;
                //     console.log("=> From Login: Current lang is " + current_lang);
                //     console.log("=> From Login: Lang sets are " + parsed_lang.languages);
                //     for (lang_set of parsed_lang.languages) {
                //         if (lang_set.lang_code == current_lang) {
                //             setAppLang(lang_set);
                //             setLangActivated(current_lang);
                //         }
                //     }
                // } else {
                //     console.log("=> From Login: No language was set");
                // }
            } catch (error) {
                console.log(error);
            }
        }
        update_data();
    }, []);

    // create_image_auto_height = (img_width, url, curved, padd) => {
    //     let urlString = String(url)
    //     const Scale_Image = (
    //         <Image
    //             source={require('./my-icon.png')}
    //             width={img_width}
    //             source={require(urlString)}
    //             style={{ borderRadius: curved, padding: padd}}
    //         />
    //     );
    //     return Scale_Image;
    // }

    return (
        <WrapperQRCode style={this.set_wrapper_bkgr()}>
            <MainContent style={{ justifyContent: 'center', marginTop: '20%', height: '100%' }}>
                <View style={styles.app_title}>
                    {/* {create_image_auto_height(Dimensions.get('window').width * 0.5, '../../../assets/logo.png', 0, 0)} */}
                    <Image
                        resizeMode='contain'
                        style={{height: Dimensions.get('window').width * 0.2}}
                        source={require('../../../assets/logo.png')}                    
                    ></Image>
                    <Text style={this.set_app_title_txt()}>{I18n.t('logotxt')}</Text>
                </View>
                <Box style={styles.box}>
                    <BoxHeader>{I18n.t('signin')}</BoxHeader>
                    <BoxContent>
                        <InputText style={styles.textfield} placeholder={I18n.t('usernameplaceholder')} autoCapitalize='none'
                            onChangeText={usernameInputHandler} value={username_input} />
                        <InputText style={styles.textfield} placeholder={I18n.t('passwordplaceholder')} autoCapitalize='none' secureTextEntry={true}
                            onChangeText={passwordInputHandler} value={password_input} />
                    </BoxContent>
                    <BoxFooter>
                        <ButtonMainLight onPress={() => {login()}}>{I18n.t('login')}</ButtonMainLight>
                    </BoxFooter>
                </Box>
                {/* <Text style ={this.set_forgot_pass_style()} onPress={() => {props.navigation.navigate('ForgetPassword');}}>{I18n.t('forgotpassword')}</Text> */}
                <Card style={{ marginTop: 40 }} onPress={() => { props.navigation.navigate('QRCodeScanner'); }}>
                    <CardContent>
                        <AntDesign name="qrcode" size={50} color={'black'} style={styles.qr_code} />
                        <Text style={this.set_qr_text_style()}>{I18n.t('qrcodescanner')}</Text>
                    </CardContent>
                </Card>
            </MainContent>
        </WrapperQRCode>
    );
};

const styles = StyleSheet.create({
    box: {
        width: '65%',
        borderRadius: 20,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
    },
    textfield: {
        fontSize: 15
    },
    footer_login_wrapper: {
        display: 'flex',
        flexDirection: "row",
        width: '100%',
        height: 60,
        backgroundColor: Colors.tertiary,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    qr_code: {
        backgroundColor: 'white',
        borderColor: Colors.tertiary,
        borderRadius: 5,
        borderWidth: 1.2,
        paddingTop: 2,
        paddingHorizontal: 0,
        textAlign: 'center',
    },
    app_title: {
        marginBottom: '15%'
        // height: 5,
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingHorizontal: 30,
        // paddingTop: 0,
        // paddingBottom: 70,
        // backgroundColor: 'red',
    },
});

export default LoginScreen;