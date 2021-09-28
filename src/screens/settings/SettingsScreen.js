import React, { useState, useEffect } from 'react';
import { AsyncStorage, StyleSheet, Text, View, Alert, TouchableOpacity, Dimensions, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import Image from 'react-native-scalable-image';
import Collapsible from 'react-native-collapsible';
import * as Localization from 'expo-localization';
import { Updates } from 'expo';
import I18n from 'ex-react-native-i18n';

import WrapperQRCode from '../../components/WrapperQRCode';
import MainContent from '../../components/MainContent';
import Box from '../../components/Box';
import BoxContent from '../../components/BoxContent';
import BoxHeader from '../../components/BoxHeader';
import InputText from '../../components/InputText';

import Colors from '../../static/Colors';

default_user_photo = 'https://efuehrerschein.s3.eu-central-1.amazonaws.com/passphoto/100-Admin.png';

const SettingsScreen = props => {
    I18n.fallbacks = true;
    I18n.translations = {
        en: {
            verified: 'Verified',
            changeusername: 'Change username',
            changeusernameempty: 'Please enter a new username',
            changeusernamesuccess: 'Username changed!',
            changepassword: 'Change password',
            changepasswordempty: 'Please enter new password',
            changepasswordsuccess: 'Password changed! Please login again.',
            passwordsnotmatch: 'Passwords do not match',
            newpassword: 'New password',
            oldpassword: 'Old password',
            repeatnewpassword: 'Retype password',
            changeemail: 'Update email',
            changeemailempty: 'Please enter a new email',
            changeemailsuccess: 'E-Mail updated!',
            chooselanguage: 'Languages',
            choosedarkmode: 'Dark mode',
            connectionfailed: 'Connection failed! Please try again later.',
            language_instruction: 'Please change language in your phone settings to get to your language',
            logout: 'Logout',
        },
        de: {
            verified: 'Verifiziert',
            changeusername: 'Benutzername ändern',
            changeusernameempty: 'Bitte geben Sie einen neuen Benutzername ein.',
            changeusernamesuccess: 'Benutzername aktualisiert!',
            changepassword: 'Passwort ändern',
            changepasswordempty: 'Bitte geben Sie neue Passwörter ein.',
            changepasswordsuccess: 'Passwort aktualisiert! Bitte loggen Sie sich nochmal ein.',
            passwordsnotmatch: 'Passwörter stimmen nicht überein.',
            newpassword: 'Neues Passwort',
            oldpassword: 'Aktuelles Passwort',
            repeatnewpassword: 'Neues Passwort erneut',
            changeemail: 'E-mail aktualisieren',
            changeemailempty: 'Bitte geben Sie eine neue E-mail  ein.',
            changeemailsuccess: 'E-mail aktualisiert!',
            chooselanguage: 'Sprachen',
            choosedarkmode: 'Dunkles Design',
            connectionfailed: 'Verbindungsfehler! Bitte versuchen Sie es erneut.',
            language_instruction: 'Bitte wählen Sie Ihre Sprache in den Einstellungen Ihres Handys aus.',
            logout: 'Abmelden',
        },
        vi: {
            verified: 'Đã xác thực',
            changeusername: 'Đổi tên người dùng',
            changeusernameempty: 'Vui lòng nhập tên người dùng',
            changeusernamesuccess: 'Đã cập nhật tên người dùng!',
            changepassword: 'Đổi mật khẩu',
            changepasswordempty: 'Vui lòng nhập mật khẩu mới',
            changepasswordsuccess: 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại.',
            passwordsnotmatch: 'Mật khẩu mới không khớp',
            newpassword: 'Mật khẩu mới',
            oldpassword: 'Mật khẩu hiện tại',
            repeatnewpassword: 'Nhập lại mật khẩu mới',
            changeemail: 'Cập nhật Email',
            changeemailempty: 'Vui lòng nhập email.',
            changeemailsuccess: 'Đã cập nhật địa chỉ email!',
            chooselanguage: 'Ngôn ngữ',
            choosedarkmode: 'Chế độ ban đêm',
            connectionfailed: 'Lỗi kết nối internet! Vui lòng thử lại sau.',
            language_instruction: 'Vui lòng chọn ngôn ngữ trong phần Cài đặt của điện thoại',
            logout: 'đăng xuất',
        }
    }
    I18n.locale = props.screenProps.locale;

    const [lang_activated, setLangActivated] = useState('');
    const [translations, set_translations] = useState(I18n.translations);

    const [username_input, setUsernameInput] = useState('');
    const usernameInputHandler = inputText => {
        setUsernameInput(inputText);
    };

    const [old_password_input, setOldPasswordInput] = useState('');
    const oldPasswordInputHandler = inputText => {
        setOldPasswordInput(inputText);
    };

    const [password_input, setPasswordInput] = useState('');
    const passwordInputHandler = inputText => {
        setPasswordInput(inputText);
    };

    const [repeatPassword_input, setRepeatPasswordInput] = useState('');
    const repeatPasswordInputHandler = inputText => {
        setRepeatPasswordInput(inputText);
    };

    const [email_input, setemailInput] = useState('');
    const emailInputHandler = inputText => {
        setemailInput(inputText);
    };

    const [user_name, set_user_name] = useState('');
    const [user_photo, setUserPhoto] = useState(default_user_photo);

    const [arrow_user, set_arrow_user] = useState(true);
    const [arrow_pass, set_arrow_pass] = useState(true);
    const [arrow_email, set_arrow_email] = useState(true);
    const [arrow_lang, set_arrow_lang] = useState(true);
    const [collapse_user, set_collapse_user] = useState(true);
    const [collapse_pass, set_collapse_pass] = useState(true);
    const [collapse_email, set_collapse_email] = useState(true);
    const [collapse_lang, set_collapse_lang] = useState(true);

    const [dark_mode, set_dark_mode] = useState(false);

    let user_id_stored, username_origin, email_origin, local_host, local_port, change_username, change_password, change_email, logout_request;
    getData = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user != null) {
                let parsed_user = JSON.parse(user);
                user_id_stored = parsed_user.user_id;
                username_origin = parsed_user.username;
                email_origin = parsed_user.email;
                set_user_name(username_origin);
            }
            const connection = await AsyncStorage.getItem('connection');
            if (connection != null) {
                let parsed_connection = JSON.parse(connection);
                logout_request = parsed_connection.logout;
                local_host = parsed_connection.host;
                local_port = parsed_connection.port;
                change_username = parsed_connection.change_username;
                change_password = parsed_connection.change_password;
                change_email = parsed_connection.change_email;
            }
        } catch (error) {
            alert(error);
        }
    }
    getData();

    update_username = () => {
        console.log('Sending POST-Request to change username...');
        if (username_input == '') {
            Alert.alert(I18n.t('changeusernameempty'));
        } else {
            let url = local_host + ':' + local_port + change_username;
            console.log(url);
            console.log("====>>>> UserID: " + user_id_stored);
            console.log("====>>>> User origin: " + username_origin);
            console.log("====>>>> User update: " + username_input);

            fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user_id_stored,
                    oldUsername: username_origin,
                    newUsername: username_input
                })
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.statusCode === 200) {
                        let obj = {
                            user_id: user_id_stored,
                            username: username_input,
                            photo: user_photo,
                            email: email_input
                        };
                        AsyncStorage.mergeItem('user', JSON.stringify(obj));
                        Alert.alert(I18n.t('changeusernamesuccess'));
                        getData();
                    } else if (res.statusCode === 404) {
                        console.log('UserID/Username wrong!');
                        Alert.alert(I18n.t('connectionfailed'));
                    } else {
                        console.log('connection failed');
                        Alert.alert(I18n.t('connectionfailed'));
                    }
                })
                .done();
        }
    };

    update_password = () => {
        console.log('Sending POST-Request to change password...');
        if (password_input == '' || repeatPassword_input == '' || old_password_input == '') {
            Alert.alert(I18n.t('changepasswordempty'));
        } else if (password_input != repeatPassword_input) {
            Alert.alert(I18n.t('passwordsnotmatch'));
        } else {
            let url = local_host + ':' + local_port + change_password;
            console.log(url);
            console.log("====>>>> UserID: " + user_id_stored);
            console.log("====>>>> Old password: " + old_password_input);
            console.log("====>>>> New password: " + password_input);
            fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user_id_stored,
                    oldPassword: old_password_input,
                    newPassword: password_input
                })
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.statusCode === 200) {
                        let obj = {
                            user_id: user_id_stored,
                            username: username_input,
                            photo: user_photo,
                            email: email_input
                        };
                        AsyncStorage.mergeItem('user', JSON.stringify(obj));
                        getData();
                        Alert.alert(I18n.t('changepasswordsuccess'));
                        props.navigation.navigate('Login');
                    } else if (res.statusCode === 404) {
                        console.log('Password wrong!');
                        Alert.alert(I18n.t('connectionfailed'));
                    } else {
                        console.log('connection failed');
                        Alert.alert(I18n.t('connectionfailed'));
                    }
                })
                .done();
        }
    };

    update_email = () => {
        console.log('Sending POST-Request to change email...');
        if (email_input == '') {
            Alert.alert(I18n.t('changeemailempty'));
        } else {
            let url = local_host + ':' + local_port + change_email;
            console.log(url);
            console.log("====>>>> UserID: " + user_id_stored);
            console.log("====>>>> Old Email: " + email_origin);
            console.log("====>>>> New Email: " + email_input);
            fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user_id_stored,
                    oldEmail: email_origin,
                    newEmail: email_input
                })
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.statusCode === 200) {
                        let obj = {
                            user_id: user_id_stored,
                            username: username_input,
                            photo: user_photo,
                            email: email_input
                        };
                        AsyncStorage.mergeItem('user', JSON.stringify(obj));
                        getData();
                        Alert.alert(I18n.t('changeemailsuccess'));
                    } else if (res.statusCode === 404) {
                        console.log('Email wrong!');
                        Alert.alert(I18n.t('connectionfailed'));
                    } else {
                        console.log('connection failed');
                        Alert.alert(I18n.t('connectionfailed'));
                    }
                })
                .done();
        }
    };

    logout = () => {
        console.log('Sending POST-Request to logout...');
        let url = local_host + ':' + local_port + logout_request;
        // let url = "http://141.45.250.39:8080/logout"
        console.log(url)
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user_id_stored
            })
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.statusCode === 200) {
                    console.log('logged out')
                    let obj = { user_id: '', username: '', photo: 'https://efuehrerschein.s3.eu-central-1.amazonaws.com/passphoto/100-Admin.png', email: '' };
                    AsyncStorage.mergeItem('user', JSON.stringify(obj));
                    props.navigation.navigate('Auth')
                } else if (res.statusCode === 404) {
                    console.log('Email wrong!');
                    Alert.alert(I18n.t('connectionfailed'));
                } else {
                    console.log('connection failed');
                    Alert.alert(I18n.t('connectionfailed'));
                }
            })
            .done();

    };


    // const logout = () => {
    //     let obj = { user_id: '', username: '', photo: 'https://efuehrerschein.s3.eu-central-1.amazonaws.com/passphoto/100-Admin.png', email: '' };
    //     AsyncStorage.mergeItem('user', JSON.stringify(obj));
    //     props.navigation.navigate('Auth');
    // }

    // Get dark mode from local storage
    get_dark_mode = async () => {
        const get_darkmode = await AsyncStorage.getItem('darkmode');
        if (get_darkmode !== null) {
            let parsed_get_darkmode = JSON.parse(get_darkmode);
            let is_on = parsed_get_darkmode.is_on;
            set_dark_mode(is_on);
        } else {
            set_dark_mode(false);
        }
    }
    get_dark_mode();

    toggleExpandedSettings = (item_type) => {
        if (item_type == "user") {
            if (arrow_user) { set_arrow_user(false) } else { set_arrow_user(true) };
            if (collapse_user) { set_collapse_user(false) } else { set_collapse_user(true) };
        } else if (item_type == "pass") {
            if (arrow_pass) { set_arrow_pass(false) } else { set_arrow_pass(true) };
            if (collapse_pass) { set_collapse_pass(false) } else { set_collapse_pass(true) };
        } else if (item_type == "email") {
            if (arrow_email) { set_arrow_email(false) } else { set_arrow_email(true) };
            if (collapse_email) { set_collapse_email(false) } else { set_collapse_email(true) };
        } else if (item_type == "lang") {
            if (arrow_lang) { set_arrow_lang(false) } else { set_arrow_lang(true) };
            if (collapse_lang) { set_collapse_lang(false) } else { set_collapse_lang(true) };
        }
    }

    create_image_auto_height = (img_width, url, curved, padd, bkgr) => {
        const Scale_Image = (
            <Image
                width={img_width}
                source={{ uri: url }}
                style={{ borderRadius: curved, padding: padd, backgroundColor: bkgr }}
            />
        );
        return Scale_Image;
    }

    set_language = async (lang) => {
        try {
            const language = await AsyncStorage.getItem('language');
            if (language != null) {
                let parsed_lang = JSON.parse(language);
                for (lang_set of parsed_lang.languages) {
                    if (lang_set.lang_code == lang) {
                        setAppLang(lang_set);
                        setLangActivated(lang);
                        let new_lang = {
                            default_lang: parsed_lang.default_lang,
                            current_lang: lang,
                            languages: parsed_lang.languages
                        };
                        AsyncStorage.mergeItem('language', JSON.stringify(new_lang));
                        console.log("Language set to " + lang);
                        Updates.reloadFromCache();
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    switch_to_dark_mode = async () => {
        let current_mode;

        if (!dark_mode) {
            set_dark_mode(true);
            current_mode = true;
        } else {
            set_dark_mode(false);
            current_mode = false;
        }

        let obj_darkmode = { is_on: current_mode };
        AsyncStorage.mergeItem('darkmode', JSON.stringify(obj_darkmode));
        Updates.reload();
    }

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
    set_username_style = () => {
        if (dark_mode) {
            return {
                fontSize: 18,
                fontFamily: 'sairaBold',
                color: Colors.primary,
            };
        } else {
            return {
                fontSize: 18,
                fontFamily: 'sairaBold',
                color: Colors.tertiary,
            };
        }
    }
    set_header_text = () => {
        if (dark_mode) {
            return {
                fontFamily: 'sairaBold',
                fontSize: 22,
                color: Colors.primary,
            };
        } else {
            return {
                fontFamily: 'sairaBold',
                fontSize: 22,
                color: Colors.tertiary
            };
        }
    }
    set_collapse_title = () => {
        if (dark_mode) {
            return {
                textAlign: 'left',
                fontFamily: 'sairaRegular',
                fontSize: 18,
                color: Colors.primary,
            };
        } else {
            return {
                textAlign: 'left',
                fontFamily: 'sairaRegular',
                fontSize: 18,
                color: Colors.tertiary,
            };
        }
    }
    set_about_txt = () => {
        if (dark_mode) {
            return {
                fontFamily: 'sairaRegular',
                color: Colors.primary,
            };
        } else {
            return {
                fontFamily: 'sairaRegular',
                color: Colors.tertiary,
            };
        }
    }
    set_logout_txt = () => {
        if (dark_mode) {
            return {
                fontFamily: 'sairaRegular',
                color: Colors.primary
            };
        } else {
            return {
                fontFamily: 'sairaRegular',
                color: Colors.tertiary
            };
        }
    }


    useEffect(() => {
        async function update_data() {
            try {
                // Get local storage for user
                const user = await AsyncStorage.getItem('user');
                let user_id_stored, username_stored, photo_stored, email_stored, local_host, local_port;
                if (user != null) {
                    let parsed_user = JSON.parse(user);
                    user_id_stored = parsed_user.user_id;
                    username_stored = parsed_user.username;
                    photo_stored = parsed_user.photo;
                    email_stored = parsed_user.email;

                    set_user_name(username_stored);
                    setUsernameInput(username_stored);
                    setUserPhoto(photo_stored);
                    setemailInput(email_stored);
                }

                // Update dark mode
                const darkmode = await AsyncStorage.getItem('darkmode');
                if (darkmode !== null) {
                    let parsed_darkmode = JSON.parse(darkmode);
                    let is_dark = parsed_darkmode.is_on;
                    set_dark_mode(is_dark);
                } else {
                    set_dark_mode(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        update_data();
    }, []);

    function Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <WrapperQRCode style={this.set_wrapper_bkgr()}>
            <MainContent style={{ justifyContent: 'center', marginTop: '30%' }}>
                <View style={{ width: '100%', marginBottom: '15%', backgroundColor: '#eae4c7' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ padding: '5%' }}>
                            {create_image_auto_height(Dimensions.get('window').width * 0.3, user_photo, 50, 10, 'lightskyblue')}
                        </View>
                        <View style={{}}>
                            <Text style={this.set_username_style()}>{Capitalize(user_name)}</Text>
                            <TouchableOpacity onPress={() => logout()}>
                                <Text style={this.set_logout_txt()}>{I18n.t('logout')}</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity onPress={() => { props.navigation.navigate('QRCodeScanner'); }}>
                                <Text style={this.set_logout_txt()}>QRCODE</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </View>

                <View style={{ width: '85%', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
                    <TouchableOpacity onPress={() => toggleExpandedSettings("pass")}>
                        <View style={styles.header}>
                            {/* <View style={styles.headerIcon}>{create_image_auto_height(16, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/pass.png', 0, 0, 'transparent')}</View> */}
                            <View style={styles.headerTitle}><Text style={this.set_collapse_title()}>{I18n.t('changepassword')}</Text></View>
                            <View style={styles.headerArrow}>
                                {arrow_pass == true ?
                                    create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/down.png', 0, 0, 'transparent') :
                                    create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/up.png', 0, 0, 'transparent')
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapse_pass} align="center">
                        <View style={styles.item_wrapper_long}>
                            <View style={styles.item}>
                                <View style={styles.item_main}>
                                    <InputText style={styles.textfield} autoCapitalize='none' secureTextEntry={true} placeholder={I18n.t('oldpassword')}
                                        onChangeText={oldPasswordInputHandler} value={old_password_input} />
                                </View>
                                <View style={styles.item_btn}>
                                </View>
                            </View>
                            <View style={styles.item}>
                                <View style={styles.item_main}>
                                    <InputText style={styles.textfield} autoCapitalize='none' secureTextEntry={true} placeholder={I18n.t('newpassword')}
                                        onChangeText={passwordInputHandler} value={password_input} />
                                </View>
                                <View style={styles.item_btn}>
                                </View>
                            </View>
                            <View style={styles.item}>
                                <View style={styles.item_main}>
                                    <InputText style={styles.textfield} autoCapitalize='none' secureTextEntry={true} placeholder={I18n.t('repeatnewpassword')}
                                        onChangeText={repeatPasswordInputHandler} value={repeatPassword_input} />
                                </View>
                                <View style={styles.item_btn}>
                                    <TouchableOpacity onPress={() => { update_password() }}>
                                        <AntDesign name="enter" size={15} style={styles.enter_btn} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Collapsible>
                </View>

                <View style={{ width: '85%', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
                    <TouchableOpacity onPress={() => toggleExpandedSettings("email")}>
                        <View style={styles.header}>
                            {/* <View style={styles.headerIcon}>{create_image_auto_height(16, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/email.png', 0, 0, 'transparent')}</View> */}
                            <View style={styles.headerTitle}><Text style={this.set_collapse_title()}>{I18n.t('changeemail')}</Text></View>
                            <View style={styles.headerArrow}>
                                {arrow_email == true ?
                                    create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/down.png', 0, 0, 'transparent') :
                                    create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/up.png', 0, 0, 'transparent')
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapse_email} align="center">
                        <View style={styles.item_wrapper}>
                            <View style={styles.item_main}>
                                <InputText style={styles.textfield} autoCapitalize='none'
                                    onChangeText={emailInputHandler} value={email_input} />
                            </View>
                            <View style={styles.item_btn}>
                                <TouchableOpacity onPress={() => { update_email() }}>
                                    <AntDesign name="enter" size={15} style={styles.enter_btn} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Collapsible>
                </View>

                {/* <View style={{ width: '85%', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
                    <View style={styles.header}>
                        <View style={styles.headerTitle}><Text style={this.set_collapse_title()}>{I18n.t('choosedarkmode')}</Text></View>
                        <View style={styles.headerArrow}>
                            <Switch value={dark_mode} onValueChange={() => { switch_to_dark_mode(); }} />
                        </View>
                    </View>
                </View> */}

                <View style={{ width: '85%' }}>
                    <View style={{ marginTop: '15%' }}>
                        <Text style={this.set_header_text()}>Team</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={styles.header_abt}>
                            <View style={styles.abtIcon}>{create_image_auto_height(19, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/manh.png', 0, 0, 'transparent')}</View>
                            <View style={styles.headerTitle}><Text style={this.set_about_txt()}>Manh: Fullstack - manhphan.com</Text></View>
                        </View>
                        <View style={styles.header_abt}>
                            <View style={styles.abtIcon}>{create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/darwin.png', 0, 0, 'transparent')}</View>
                            <View style={styles.headerTitle}><Text style={this.set_about_txt()}>Darwin: Backend</Text></View>
                        </View>
                        <View style={styles.header_abt}>
                            <View style={styles.abtIcon}>{create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/jan.png', 0, 0, 'transparent')}</View>
                            <View style={styles.headerTitle}><Text style={this.set_about_txt()}>Jan: Backend</Text></View>
                        </View>
                        <View style={styles.header_abt}>
                            <View style={styles.abtIcon}>{create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/andreas.png', 0, 0, 'transparent')}</View>
                            <View style={styles.headerTitle}><Text style={this.set_about_txt()}>Andrea: Backend</Text></View>
                        </View>
                        <View style={styles.header_abt}>
                            <View style={styles.abtIcon}>{create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/nhidangeo.png', 0, 0, 'transparent')}</View>
                            <View style={styles.headerTitle}><Text style={this.set_about_txt()}>Nhi: Frontend - phamnhi.com</Text></View>
                        </View>
                        <View style={styles.header_abt}>
                            <View style={styles.abtIcon}>{create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/rey.png', 0, 0, 'transparent')}</View>
                            <View style={styles.headerTitle}><Text style={this.set_about_txt()}>Rey: Frontend, Design</Text></View>
                        </View>
                        <View style={styles.header_abt}>
                            <View style={styles.abtIcon}>{create_image_auto_height(19, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/zhasmina.png', 0, 0, 'transparent')}</View>
                            <View style={styles.headerTitle}><Text style={this.set_about_txt()}>Zhasmina: Frontend</Text></View>
                        </View>
                    </View>
                    <View>
                        {/* Yes this is not a collapsible but the styling fits here */}
                        <Text style={this.set_collapse_title()}>Betreuer</Text>
                        <View style={styles.header_firstabt}>
                            <View style={styles.abtIcon}>{create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/mochol.png', 0, 0, 'transparent')}</View>
                            <View style={styles.headerTitle}><Text style={this.set_about_txt()}>Dr.Mochól: Projektleiterin</Text></View>
                        </View>
                        <View style={styles.header_abt}>
                            <View style={styles.abtIcon}>{create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/mustafa.png', 0, 0, 'transparent')}</View>
                            <View style={styles.headerTitle}><Text style={this.set_about_txt()}>Herr Zein: Projektleiter</Text></View>
                        </View>
                    </View>
                </View>
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
        fontSize: 18,
        backgroundColor: 'white',
        borderWidth: 1
    },
    part: {
        flexDirection: 'column',
        paddingBottom: 20,
        justifyContent: 'center',
        width: '85%',
        borderStyle: 'dotted',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    part_title: {
        fontSize: 18,
        color: Colors.tertiary,
        textAlign: 'left',
        width: '100%'
    },
    title: {
        fontSize: 20,
        color: Colors.tertiary,
        textAlign: 'center',
        width: '100%',
        marginBottom: 20
    },
    header: {
        paddingVertical: 15,
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'blue'
    },
    headerIcon: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerTitle: {
        flex: 8,
        // backgroundColor: 'yellow'
    },
    headerArrow: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        // backgroundColor: 'orange'
    },
    bodyContent: {
        padding: 15,
        // backgroundColor: '#fff',
    },
    langItemWrapper: {
        width: '100%',
        // backgroundColor: 'blue'
    },
    langItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        // backgroundColor: 'magenta'
    },
    langItemText: {
        flex: 9,
        alignItems: 'flex-start',
        justifyContent: 'center',
        // backgroundColor: 'green'
    },
    langItemActivated: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        // backgroundColor: 'orange'
    },
    enter_btn: {
        backgroundColor: 'rgba(0,0,0,0.0)',
        color: Colors.tertiary,
        borderColor: Colors.tertiary,
        borderRadius: 7,
        borderWidth: 1,
        paddingVertical: 7,
        paddingHorizontal: 7,
        textAlign: 'center',
    },
    item_wrapper_long: {
        flexDirection: 'column',
        padding: 15
    },
    item_wrapper: {
        flexDirection: 'row',
        padding: 15
    },
    item: {
        flexDirection: 'row',
    },
    item_main: {
        width: '87%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    item_btn: {
        width: '13%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    abtIcon: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    header_abt: {
        // paddingVertical: 5,
        // flex: 1,
        flexDirection: 'row',

    },
    header_abt_last: {
        paddingVertical: 5,
        marginBottom: '5%',
        flex: 1,
        flexDirection: 'row',
    },
    header_firstabt: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'blue'
    },
});

export default SettingsScreen;