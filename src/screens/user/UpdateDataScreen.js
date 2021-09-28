import React, {useState} from 'react';
import { StyleSheet, Text, Alert, AsyncStorage } from 'react-native';
import Wrapper from '../../components/Wrapper';
import MainContent from '../../components/MainContent';
import Box from '../../components/Box';
import BoxContent from '../../components/BoxContent';
import InputText from '../../components/InputText';
import Colors from '../../static/Colors';
import BoxFooter from '../../components/BoxFooter';
import ButtonMainLight from '../../components/ButtonMainLight';

const UpdateData = props => {
    let user_id_stored, username, local_host, local_port, login_initial;
    getData = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            if (user != null) {
                let parsed_user = JSON.parse(user);
                user_id_stored = parsed_user.user_id;
                username = parsed_user.username;
                // console.log('Current user id: ' + user_id_stored);

                let connection = await AsyncStorage.getItem('connection');
                let parsed_connection = JSON.parse(connection);
                local_host = parsed_connection.host;
                local_port = parsed_connection.port;
                login_initial = parsed_connection.login_initial;
            }
        } catch (error) {
            alert(error);
        }
    }
    getData();

    const [newPassword_input, setNewPasswordInput] = useState('');
    const newPasswordInputHandler = inputText => {
        setNewPasswordInput(inputText);
    };

    const [newPasswordW_input, setNewPasswordWInput] = useState('');
    const newPasswordWInputHandler = inputText => {
        setNewPasswordWInput(inputText);
    };

    const resetInput = () => {
        setNewPasswordInput('');
        setNewPasswordWInput('');
    }

    const confirm = () => {
        if (newPassword_input == '' || newPasswordW_input == '') {
            Alert.alert('Bitte füllen Sie alle Felder aus.');
        } else if (newPassword_input != newPasswordW_input) {
            Alert.alert('Neue Passwörte stimmen nicht überein.');
        } else {
            let url = local_host + ':' + local_port + login_initial;
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify ({
                    user_id: user_id_stored,
                    username: username, 
                    password: newPassword_input,
                })
            })
            .then((response) => response.json())
            .then((res) => {
                if (res.statutsCode === 404) {
                    resetInput();
                    Alert.alert('Konto ist nicht gefunden.');
                } else if (res.statutsCode === 400) {
                    resetInput();
                    props.navigation.navigate('App');
                } else if (res.statutsCode === 200) {
                    resetInput();
                    console.log("update successfully.");
                    props.navigation.navigate('App');
                } else {
                    resetInput();
                    console.log("update failed.");
                    Alert.alert('Verbindungsfehler');
                }
            })
            .done();

        }
    };

    return (
        <Wrapper>
            <MainContent style={{justifyContent:'center', marginBottom: 50}}>
                <Box style={styles.box_title}>
                    <Text style={styles.header_title}>Bitte ändern Sie Ihr Passwort</Text>
                    <BoxContent style={styles.box_content_instruction}>
                        <Text style={styles.box_content_instruction_txt}>Von einer zuständigen Behörde haben Sie Ihre einmaligen Login-Daten zugeschickt bekommen. Bitte ändern Sie jetzt Ihr Passwort</Text>
                    </BoxContent>
                </Box>
                <Box style={styles.box_form}>
                    <BoxContent>
                        <Text style={styles.part_title}>Neues Passwort</Text>
                        <InputText style={styles.textfield} autoCapitalize='none' secureTextEntry={true}
                            onChangeText={newPasswordInputHandler} value={newPassword_input} />
                        <Text style={styles.part_title}>Neues Passwort wiederholen</Text>
                        <InputText style={styles.textfield} autoCapitalize='none' secureTextEntry={true}
                            onChangeText={newPasswordWInputHandler} value={newPasswordW_input} />
                    </BoxContent>
                    <BoxFooter>
                        <ButtonMainLight onPress={() => {confirm();}}>Bestätigen</ButtonMainLight>
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
    box_content_instruction: {
        alignItems: 'flex-start',
    },
    box_content_instruction_txt: {
        alignItems: 'flex-start',
        fontSize: 18,
        fontFamily: 'sairaRegular',
        color: Colors.tertiary,
        marginBottom: 5,
        marginBottom: '15%'
    },
    header_title: {
        fontSize: 22,
        fontFamily: 'sairaBold',
        color: Colors.tertiary,
        textAlign: 'left',
        width: '85%'
    },
    box_form: {
        width: '85%',
        borderRadius: 20,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        marginBottom: 30
    },
    part_title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left',
        width: '100%'
    },
    textfield: {
        fontSize: 15
    },
}

);

export default UpdateData;