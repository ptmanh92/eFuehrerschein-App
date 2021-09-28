import React, { useState } from 'react';
import { StyleSheet, AsyncStorage, View, TouchableOpacity, Text, Alert } from 'react-native';
import Image from 'react-native-scalable-image';
import Collapsible from 'react-native-collapsible';
import * as Localization from 'expo-localization';
import I18n from 'ex-react-native-i18n';

import WrapperQRCode from '../../components/WrapperQRCode';
import MainContent from '../../components/MainContent';
import BoxContent from '../../components/BoxContent';
import BoxHeader from '../../components/BoxHeader';
import InputText from '../../components/InputText';
import ButtonMainDark from '../../components/ButtonMainDark';

import Colors from '../../static/Colors';
import ButtonMainLight from '../../components/ButtonMainLight';

const HelpScreen = props => {
    I18n.fallbacks = true;
    I18n.translations = {
        en: {
            faq: 'Frequently Asked Questions',
            questionOne: 'How can I scan a QR code?',
            questionTwo: 'How can I see the back of my driver\'s license?',
            questionThree: 'How can I change my personal information?',
            questionFour: 'How can I add a new license?',
            questionFive: 'Can I have a international licenses added?',
            answerOne: 'You must first click on the picture with the QR code located under the username and password before logging in. Then the camera is started and then you have to position the image with the QR code you want to scan in front of the camera. The QR code for the scan is under your digital driver\'s license.',
            answerTwo: 'When you select the digital driver\'s license you want, the front of the document is displayed. Click on the front and the back will then be visible.',
            answerThree: 'You can change your user name, password and e-mail address at any time using the settings.',
            answerFour: 'You can not add a new licence. This is done centrally by the responsible authority.',
            answerFive: 'No, PEF is a mobile application that works centrally with the German authorities and therefore only contains documents issued in Germany.',
            feedback: 'Your feedback',
            feedback_txt: 'Your message here...',
            feedback_empty: 'Please enter your message.',
            feedback_success: 'Thank you! Your feedback was sent.',
            send_btn: 'Send',
            connectionfailed: 'Connection failed! Please try again later.',
        },
        de: {
            faq: 'Häufige Fragen',
            questionOne: 'Wie kann ich einen QR Code scannen?',
            questionTwo: 'Wie kann ich die Rückseite von meinem Führerschein sehen?',
            questionThree: 'Wie kann ich meine persönlichen Daten ändern?',
            questionFour: 'Wie kann ich eine neue Lizenz hinzufügen?',
            questionFive: 'Kann ich auch internationale Lizenzen hinzufügen lassen?',
            answerOne: 'Sie müssen zuerst auf das Bild mit dem QR-code klicken, der sich unter den Benutzername und Passwort befindet, bevor man sich anmeldet. Dann wird die Kamera gestartet und danach müssen Sie das Bild mit dem QR-Code, den Sie scannen möchten, vor der Kamera positionieren. Der QR-Code für den Scan befindet sich unter Ihrem digitalen Führerschein.',
            answerTwo: 'Wenn Sie den gewünschte digitale Führerschein auswählen, wird die Vorderseite des Dokuments angezeigt. Klicken Sie auf die Vorderseite und die Rückseite wird danach sichtbar.',
            answerThree: 'Sie können jeder Zeit Ihren Benutzernamen, Ihr Passwort und Ihre E-Mail-Adresse über die Einstellungen ändern.',
            answerFour: 'Sie können keine neue Lizenz hinzufügen. Dies erfolgt zentral durch die zuständige Behörde.',
            answerFive: 'Nein, PEF ist eine mobile Anwendung, die mit den deutschen Behörden zentral zusammenarbeitet und daher nur in Deutschland ausgestellte Dokumente enthält.',
            feedback: 'Ihr Feedback',
            feedback_txt: 'Schreiben sie eine Nachricht',
            feedback_empty: 'Bitte geben Sie Ihre Nachrichten ein.',
            feedback_success: 'Vielen Dank! Ihre Nachrichten wurden gesendet.',
            send_btn: 'Absenden',
            connectionfailed: 'Verbindungsfehler! Bitte versuchen Sie es erneut.',
        },
        vi: {
            faq: 'Câu hỏi thường gặp',
            questionOne: 'Câu hỏi',
            feedback: 'Phản hồi',
            feedback_txt: 'Tin nhắn của bạn...',
            feedback_empty: 'Vui lòng nhập tin nhắn.',
            feedback_success: 'Cám ơn bạn! Phản hồi của bạn đã được gửi đi.',
            send_btn: 'Gửi đi',
            connectionfailed: 'Lỗi kết nối internet! Vui lòng thử lại sau.',
        }
    }
    I18n.locale = props.screenProps.locale;

    const [feedback_input, setFeedbackInput] = useState('');
    const feedbackInputHandler = inputText => {
        setFeedbackInput(inputText);
    };

    const [arrow_1, set_arrow_1] = useState(true);
    const [arrow_2, set_arrow_2] = useState(true);
    const [arrow_3, set_arrow_3] = useState(true);
    const [arrow_4, set_arrow_4] = useState(true);
    const [arrow_5, set_arrow_5] = useState(true);
    const [collapse_1, set_collapse_1] = useState(true);
    const [collapse_2, set_collapse_2] = useState(true);
    const [collapse_3, set_collapse_3] = useState(true);
    const [collapse_4, set_collapse_4] = useState(true);
    const [collapse_5, set_collapse_5] = useState(true);

    const [dark_mode, set_dark_mode] = useState(false);
    const [user_name, set_user_name] = useState('');
    let user_id_stored, username_origin, email_origin, local_host, local_port, send_out_feedback;
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
                local_host = parsed_connection.host;
                local_port = parsed_connection.port;
                send_out_feedback = parsed_connection.feedback;
            }
        } catch (error) {
            alert(error);
        }
    }
    getData();

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

    toggleExpandedHelp = (item_type) => {
        if (item_type == "question_1") {
            if (arrow_1) { set_arrow_1(false) } else { set_arrow_1(true) };
            if (collapse_1) { set_collapse_1(false) } else { set_collapse_1(true) };
        } else if (item_type == "question_2") {
            if (arrow_2) { set_arrow_2(false) } else { set_arrow_2(true) };
            if (collapse_2) { set_collapse_2(false) } else { set_collapse_2(true) };
        } else if (item_type == "question_3") {
            if (arrow_3) { set_arrow_3(false) } else { set_arrow_3(true) };
            if (collapse_3) { set_collapse_3(false) } else { set_collapse_3(true) };
        } else if (item_type == "question_4") {
            if (arrow_4) { set_arrow_4(false) } else { set_arrow_4(true) };
            if (collapse_4) { set_collapse_4(false) } else { set_collapse_4(true) };
        } else if (item_type == "question_5") {
            if (arrow_5) { set_arrow_5(false) } else { set_arrow_5(true) };
            if (collapse_5) { set_collapse_5(false) } else { set_collapse_5(true) };
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

    send_feedback = () => {
        console.log('Sending POST-Request to email feedback...');
        if (feedback_input == '') {
            Alert.alert(I18n.t('feedback_empty'));
        } else {
            let url = local_host + ':' + local_port + send_out_feedback;
            console.log(url);
            console.log("====>>>> to: " + 'appfuehrerschein@gmail.com');
            console.log("====>>>> subject: " + 'Feedback von Benutzer ' + username_origin);
            console.log("====>>>> text: " + feedback_input);
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: 'appfuehrerschein@gmail.com',
                    subject: 'Feedback von Benutzer ' + username_origin,
                    text: feedback_input
                })
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.statusCode === 200) {
                        Alert.alert(I18n.t('feedback_success'));
                        setFeedbackInput('');
                    } else if (res.statusCode === 400) {
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
    set_header_text = () => {
        if (dark_mode) {
            return {
                textAlign: 'left',
                fontFamily: 'sairaBold',
                fontSize: 18,
                color: Colors.primary,
            };
        } else {
            return {
                textAlign: 'left',
                fontFamily: 'sairaBold',
                fontSize: 18,
                color: Colors.tertiary,
            };
        }
    }
    set_question_text = () => {
        if (dark_mode) {
            return {
                textAlign: 'left',
                fontFamily: 'sairaRegular',
                color: Colors.primary,
            };
        } else {
            return {
                textAlign: 'left',
                fontFamily: 'sairaRegular',
                color: Colors.tertiary,
            };
        }
    }
    set_part_title = () => {
        if (dark_mode) {
            return {
                textAlign: 'left',
                fontSize: 22,
                fontFamily: 'sairaBold',
                color: Colors.primary,
            };
        } else {
            return {
                textAlign: 'left',
                fontSize: 22,
                fontFamily: 'sairaBold',
                color: Colors.tertiary,
            };
        }
    }

    return (
        <WrapperQRCode style={this.set_wrapper_bkgr()}>
            <MainContent style={{ justifyContent: 'center', marginTop: '30%' }}>
                <View style={{ width: '85%' }}>
                    <Text style={this.set_part_title()}>{I18n.t('faq')}</Text>
                </View>
                <View style={{ width: '85%', borderBottomColor: 'lightgrey', borderBottomWidth: 1, marginTop: '5%' }}>
                    <TouchableOpacity onPress={() => toggleExpandedHelp("question_1")}>
                        <View style={styles.header}>
                            {/* <View style={styles.headerIcon}>{create_image_auto_height(16, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/question.png', 0, 0, 'transparent')}</View> */}
                            <View style={styles.headerTitle}><Text style={this.set_header_text()}>{I18n.t('questionOne')}</Text></View>
                            <View style={styles.headerArrow}>
                                {arrow_1 == true ?
                                    create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/down.png', 0, 0, 'transparent') :
                                    create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/up.png', 0, 0, 'transparent')
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapse_1} align="center">
                        <View style={styles.bodyContent}>
                            <BoxContent>
                                <Text style={this.set_question_text()}>
                                    {I18n.t('answerOne')}
                                </Text>
                            </BoxContent>
                        </View>
                    </Collapsible>
                </View>

                <View style={{ width: '85%', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
                    <TouchableOpacity onPress={() => toggleExpandedHelp("question_2")}>
                        <View style={styles.header}>
                            {/* <View style={styles.headerIcon}>{create_image_auto_height(16, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/question.png', 0, 0, 'transparent')}</View> */}
                            <View style={styles.headerTitle}><Text style={this.set_header_text()}>{I18n.t('questionTwo')}</Text></View>
                            <View style={styles.headerArrow}>
                                {arrow_2 == true ?
                                    create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/down.png', 0, 0, 'transparent') :
                                    create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/up.png', 0, 0, 'transparent')
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapse_2} align="center">
                        <View style={styles.bodyContent}>
                            <BoxContent>
                                <Text style={this.set_question_text()}>
                                    {I18n.t('answerTwo')}
                                </Text>
                            </BoxContent>
                        </View>
                    </Collapsible>
                </View>

                <View style={{ width: '85%', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
                    <TouchableOpacity onPress={() => toggleExpandedHelp("question_3")}>
                        <View style={styles.header}>
                            {/* <View style={styles.headerIcon}>{create_image_auto_height(16, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/question.png', 0, 0, 'transparent')}</View> */}
                            <View style={styles.headerTitle}><Text style={this.set_header_text()}>{I18n.t('questionThree')}</Text></View>
                            <View style={styles.headerArrow}>
                                {arrow_3 == true ?
                                    create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/down.png', 0, 0, 'transparent') :
                                    create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/up.png', 0, 0, 'transparent')
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapse_3} align="center">
                        <View style={styles.bodyContent}>
                            <BoxContent>
                                <Text style={this.set_question_text()}>
                                    {I18n.t('answerThree')}
                                </Text>
                            </BoxContent>
                        </View>
                    </Collapsible>
                </View>

                <View style={{ width: '85%', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
                    <TouchableOpacity onPress={() => toggleExpandedHelp("question_4")}>
                        <View style={styles.header}>
                            {/* <View style={styles.headerIcon}>{create_image_auto_height(16, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/question.png', 0, 0, 'transparent')}</View> */}
                            <View style={styles.headerTitle}><Text style={this.set_header_text()}>{I18n.t('questionFour')}</Text></View>
                            <View style={styles.headerArrow}>
                                {arrow_4 == true ?
                                    create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/down.png', 0, 0, 'transparent') :
                                    create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/up.png', 0, 0, 'transparent')
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapse_4} align="center">
                        <View style={styles.bodyContent}>
                            <BoxContent>
                                <Text style={this.set_question_text()}>
                                    {I18n.t('answerFour')}
                                </Text>
                            </BoxContent>
                        </View>
                    </Collapsible>
                </View>

                <View style={{ width: '85%', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>
                    <TouchableOpacity onPress={() => toggleExpandedHelp("question_5")}>
                        <View style={styles.header}>
                            {/* <View style={styles.headerIcon}>{create_image_auto_height(16, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/question.png', 0, 0, 'transparent')}</View> */}
                            <View style={styles.headerTitle}><Text style={this.set_header_text()}>{I18n.t('questionFive')}</Text></View>
                            <View style={styles.headerArrow}>
                                {arrow_5 == true ?
                                    create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/down.png', 0, 0, 'transparent') :
                                    create_image_auto_height(20, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/general/up.png', 0, 0, 'transparent')
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapse_5} align="center">
                        <View style={styles.bodyContent}>
                            <BoxContent>
                                <Text style={this.set_question_text()}>
                                    {I18n.t('answerFive')}
                                </Text>
                            </BoxContent>
                        </View>
                    </Collapsible>
                </View>


                <View style={{ width: '85%', borderBottomColor: 'lightgrey', borderBottomWidth: 1, paddingTop: 40, paddingBottom: 15 }}>
                    <Text style={this.set_part_title()}>{I18n.t('feedback')}</Text>
                </View>
                <View style={{ width: '85%', paddingVertical: 10 }}>
                    <InputText style={styles.textarea} autoCapitalize='none' multiline={true} placeholder={I18n.t('feedback_txt')}
                        onChangeText={feedbackInputHandler} value={feedback_input} />
                </View>
                <View style={{ width: '85%', paddingVertical: 10, alignItems: 'flex-end' }}>
                    {dark_mode ?
                        <ButtonMainLight onPress={() => send_feedback()}>{I18n.t('send_btn')}</ButtonMainLight> :
                        <ButtonMainDark onPress={() => send_feedback()}>{I18n.t('send_btn')}</ButtonMainDark>
                    }
                </View>

            </MainContent>
        </WrapperQRCode>
    );
};

const styles = StyleSheet.create({
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
        // padding: 15,
        // backgroundColor: '#fff',
    },
    textarea: {
        fontSize: 18,
        backgroundColor: 'white',
        borderWidth: 1,
        height: 200,
        width: '100%',
        textAlignVertical: 'top'
    },
}

);

export default HelpScreen;