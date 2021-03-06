import React, { useState, useEffect } from 'react';
import Image from 'react-native-scalable-image';
import { StyleSheet, View, Text, Modal, AsyncStorage, FlatList, TouchableOpacity,Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WrapperQRCode from '../../components/WrapperQRCode';
import MainContent from '../../components/MainContent';
import Card from '../../components/Card';

import Colors from '../../static/Colors';

const default_data = [];

const PilotLicence = props => {
    const [data_pilot_pagetwo, set_data_pilot_pagetwo] = useState(default_data);
    const [data_pilot_pagethree, set_data_pilot_pagethree] = useState(default_data);
    const [validity, set_validity] = useState('ungültig');
    const [visibility, setVisibility] = useState(false);

    reformatDate = (datum) => {
        let new_date = new Date(datum);
        let day = (new_date.getDate() < 10) ? '0' + new_date.getDate() : new_date.getDate();
        let month = (new_date.getMonth() < 9) ? '0' + (new_date.getMonth() + 1) : new_date.getMonth() + 1;
        let year = new_date.getFullYear();
        let output = day + '.' + month + '.' + year;
        return output;
    }

    create_image_auto_height = (img_width, url) => {
        const Scale_Image = (
            <Image
                width={img_width}
                source={{ uri: url }}
            />
        );
        return Scale_Image;
    }

    validity_card = () => {
        if (validity == 'gültig') {
            return (<Text style={styles.valid_card}>{validity.toUpperCase()}</Text>);
        } else {
            return (<Text style={styles.invalid_card}>{validity.toUpperCase()}</Text>);
        }
    }

    valid_color = () => {
        if (validity == 'gültig') {
            return {
                backgroundColor: 'green',
            };
        } else {
            return {
                backgroundColor: 'red',
            };
        }
    }

    useEffect(() => {
        async function update_data() {
            try {
                // Get local storage for user
                const licence_owner = await AsyncStorage.getItem('licence_owner');
                let owner_id_stored, local_host, local_port, pilot_licence;
                let obj_pilot_pagetwo = [], obj_pilot_pagethree = [];
                let fetch_pilot_needed = false;
                if (licence_owner != null) {
                    let parsed_owner = JSON.parse(licence_owner);
                    owner_id_stored = parsed_owner.owner_id;
                }

                // Get local storage for connection
                const connection = await AsyncStorage.getItem('connection');
                // console.log(connection);
                if (connection != null) {
                    console.log('getting connection...');
                    let parsed_connection = JSON.parse(connection);
                    local_host = parsed_connection.host;
                    local_port = parsed_connection.port;
                    pilot_licence = parsed_connection.pilot_licence;

                    if (owner_id_stored !== undefined) {
                        // Start fetching data of pilot
                        console.log('fetching data of pilot...');
                        fetch_pilot_needed == true;
                        let url_pilot = local_host + ':' + local_port + pilot_licence + owner_id_stored;
                        fetch(url_pilot, { method: 'GET' })
                            .then((response) => response.json())
                            .then((res) => {
                                if (res.statusCode === 200) {
                                    console.log('data of pilot fetched.');
                                    obj_pilot_pagetwo = [
                                        {
                                            nr: 'I',
                                            title_de: 'Ausstellendes Land ', title_en: '(State of Issue)',
                                            content_de: res.licences[0].country, content_en: '',is_image: false
                                        },
                                        {
                                            nr: 'III',
                                            title_de: 'Lizenynummer', title_en: '(Licence number)',
                                            content_de: res.licences[0].number, content_en: '',is_image: false
                                        },
                                        {
                                            nr: 'IV',
                                            title_de: 'Name und Vorname des Inhabers', title_en: '(Last and first name of holder)',
                                            content_de: res.licences[0].last_name + ', ' + res.licences[0].first_name, content_en: '',is_image: false
                                        },
                                        {
                                            nr: 'IVa',
                                            title_de: 'Geburtsdatum', title_en: '(Date of birth)',
                                            content_de: reformatDate(res.licences[0].birthdate), content_en: '', is_image: false
                                        },
                                        {
                                            nr: 'XIV',
                                            title_de: 'Geburtsort', title_en: '(Place of birth)',
                                            content_de: res.licences[0].birth_place, content_en: '', is_image: false
                                        },
                                        {
                                            nr: 'V',
                                            title_de: 'Anschrift des Inhabers', title_en: '(Address of holder)',
                                            content_de: res.licences[0].street + ' ' + res.licences[0].street_number + ', ' + res.licences[0].postal_code + ' ' + res.licences[0].locality, content_en: '', is_image: false
                                        },
                                        {
                                            nr: 'VI',
                                            title_de: 'Staatsangehörigkeit', title_en: '(Nationality)',
                                            content_de: res.licences[0].nationality, content_en: '', is_image: false
                                        },
                                        {
                                            nr: 'VII',
                                            title_de: 'Unterschrift des Inhabers', title_en: '(Signature of holder)',
                                            content_de: res.licences[0].signature_photo_url, content_en: '', is_image: true
                                        },
                                        {
                                            nr: 'VIII',
                                            title_de: 'Ausstellende zuständige Behörde', title_en: '(Issuing competent authority)',
                                            content_de: res.licences[0].issue_authority, content_en: '', is_image: false
                                        },
                                        {
                                            nr: 'X',
                                            title_de: 'Unterschrift des Ausstellers und Datum', title_en: '(Signature of issuing officer and date)',
                                            content_de: res.licences[0].authority_signature_url, content_en: '', is_image: true
                                        },
                                        {
                                            nr: 'XI',
                                            title_de: 'Siegel oder Stempel der zuständigen Behörde', title_en: '(Seal or stamp of issuing competent authority)',
                                            content_de: res.licences[0].authority_stamp_url, content_en: '', is_image: true
                                        },
                                    ];

                                    obj_pilot_pagethree = [
                                        {
                                            nr: 'II',
                                            title_de: 'Titel von Lizenzen, Datum der Ersterteilung und Ländercode', title_en: '(Title of licences, date of initial issue and country code)',
                                            content_de_1: res.licences[0].licence_type + ', ' + reformatDate(res.licences[0].licence_issuedate) + ', ' + res.licences[0].land_code, content_en_1: '',
                                            content_1_center: '',
                                            title_de_2: '', title_en_2: '',
                                            content_de_2: '', content_en_2: '',
                                            content_2_center: '',
                                        },
                                        {
                                            nr: 'IX',
                                            title_de: 'Gültigkeit', title_en: '(Validity)',
                                            content_de_1: reformatDate(res.licences[0].expiration_date) + '. Die mit der Lizenz verbundenen Rechte dürfen nur ausgeübt werden, wenn der Inhaber im Besitz eines gültigen Tauglichkeitszeugnisses für die jeweiligen Rechte ist.', content_en_1: '',
                                            content_1_center: '',
                                            title_de_2: '', title_en_2: '',
                                            content_de_2: 'Zum Zwecke der Identifizierung des Lizenzinhabers muss ein Dokument mit einem Foto mitgeführt werden.', content_en_2: '',
                                            content_2_center: '',
                                        },
                                        {
                                            nr: 'XII',
                                            title_de: 'Sprechfunkrechte', title_en: '(Radiotelephony privileges)',
                                            content_de_1: 'Der Inhaber dieser Lizenz besitz die nachgewiesene Kompetenz für die Bedienung von Sprechfunkausrüstung an Bord von Luftfahrzeugen in deutscher Sprache für Flüge nach Sichtflugregeln.', content_en_1: '',
                                            content_de_2: '', content_en_2: '',
                                            content_1_center: '',
                                            title_de_2: '', title_en_2: '',
                                            content_de_2: '', content_en_2: '',
                                            content_2_center: '',
                                        },
                                        {
                                            nr: 'XIII',
                                            title_de: 'Bemerkungen', title_en: '(Remarks)',
                                            content_de_1: res.licences[0].remarks, content_en_1: '',
                                            content_1_center: '***** keine weiteren Eintragungen / no further entries *****',
                                            title_de_2: 'Sprachkenntnisse', title_en_2: '(Languagespro Proficiency)',
                                            content_de_2: 'Deutsch/Niveau 6/unbefristed', content_en_2: '(German/level 6/not limited)',
                                            content_2_center: '***** keine weiteren Eintragungen / no further entries *****',
                                        }
                                    ];
                                    
                                    let today = new Date();
                                    let expire = new Date(res.licences[0].expiration_date);
                                    if (expire >= today && res.licences[0].suspended == 0) {
                                        set_validity('gültig');
                                    } else {
                                        set_validity('ungültig');
                                    }
                                } else if (res.statusCode === 404) {
                                    console.log('User ' + owner_id_stored + ' has no Pilot-Lizenz');
                                } else {
                                    console.log('connection failed');
                                }

                                fetch_pilot_needed = false;
                                if (obj_pilot_pagetwo.length > 0) {
                                    set_data_pilot_pagetwo(obj_pilot_pagetwo);
                                }
                                if (obj_pilot_pagethree.length > 0) {
                                    set_data_pilot_pagethree(obj_pilot_pagethree);
                                }
                            })
                            .done();
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        update_data();
    }, []);


    return (
        <WrapperQRCode style={this.valid_color()}>
            <MainContent style={{ justifyContent: 'center' }}>
                {/* <Text style={styles.text_title}>KFZ-Führerschein</Text> */}
                <TouchableOpacity
                    onPress={() => {props.navigation.navigate('QRCodePilotLicenceDetail');}}
                    style={styles.card_styleback}>
                    <View style={{ paddingTop: 30, paddingBottom: 10 }}>
                        <Text style={styles.header}>Bundesrepublik Deutschland</Text>
                        <Text style={styles.textheader}>Federal Republic of Germany</Text>
                        <View style={{ paddingTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            {create_image_auto_height(102, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/licence/adler_color.png')}
                            <View style={{ paddingTop: 40 }}>
                                <Text style={styles.textmain}>EUROPEAN UNION</Text>
                                <Text style={styles.textmain1}>PILOTENLIZENZ</Text>
                                <Text style={styles.textmain2}>(Flight Crew Licence)</Text>
                                <Text style={styles.textmain3}>Erteilt gemäß Teil-FCL</Text>
                                <Text style={styles.textmain3}>Diese Lizenz entspricht ICAO-Standards,</Text>
                                <Text style={styles.textmain3}>außer bei LAPL-Rechten</Text>
                                <Text style={styles.textmain4}>(issued in accordance with Part-FCL</Text>
                                <Text style={styles.textmain4}>This licence complies with ICAO standards,</Text>
                                <Text style={styles.textmain4}>except for the LAPL privileges</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <Text style={{ marginTop: '25%', fontFamily: 'sairaBold'}}>
                    {this.validity_card()}
                </Text>
            </MainContent>
        </WrapperQRCode>
    );

};

const styles = StyleSheet.create({
    text_title: {
        color: Colors.tertiary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingTop: 0,
        paddingBottom: 20,
        fontSize: 32
    },
    card_style: {
        justifyContent: 'center',
        width: '100%',
        marginVertical: 20,
        backgroundColor: 'white'
    },
    qr_style: {
        justifyContent: 'center',
        width: '68%',
        marginVertical: 20,
        // borderRadius: 10,
        // borderWidth: 5,
    },
    kfz_font: {
        fontSize: 17,
        color: Colors.tertiary
    },
    licence_list: {
        width: '85%'
    },
    header: {
        color: Colors.secondary,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textheader: {
        color: Colors.secondary,
        fontSize: 9,
        textAlign: 'center'
    },
    textmain: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.secondary
    },
    textmain1: {
        fontSize: 16,
        color: Colors.secondary,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 30
    },
    textmain2: {
        fontSize: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.secondary,
        paddingBottom: 15
    },
    textmain3: {
        fontSize: 13,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.secondary
    },
    textmain4: {
        fontSize: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.secondary,
    },
    footer: {
        fontSize: 13,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.secondary,
        paddingTop: 40
    },
    textfooter: {
        fontSize: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.secondary,
    },
    card_styleback: {
        width: '85%',
        backgroundColor: 'white',
        marginVertical: 20
    },
    valid_card: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
        color: 'white',
    },
    invalid_card: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'red',
    }
});


export default PilotLicence;