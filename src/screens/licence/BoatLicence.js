import React, { useState, useEffect } from 'react';
import Image from 'react-native-scalable-image';
import { StyleSheet, View, Text, ImageBackground, AsyncStorage, FlatList, TouchableOpacity, Dimensions } from 'react-native';

import WrapperQRCode from '../../components/WrapperQRCode';
import MainContent from '../../components/MainContent';

import Colors from '../../static/Colors';

const default_data = [];

const BoatLicence = props => {
    const [data_boat, set_data_boat] = useState(default_data);
    const [data_qr_code, set_data_qr_code] = useState(default_data);
    const [visibility, setVisibility] = useState(true);
    const [dark_mode, set_dark_mode] = useState(false);

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

    showHideComponent = () => {
        if (visibility == true) {
            setVisibility(false);
        } else {
            setVisibility(true);
        }
    };

    create_image_auto_height = (img_width, url) => {
        const Scale_Image = (
            <Image
                width={img_width}
                source={{ uri: url }}
            />
        );
        return Scale_Image;
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

    useEffect(() => {
        async function update_data() {
            try {
                // Get local storage for user
                const user = await AsyncStorage.getItem('user');
                let user_id_stored, local_host, local_port, boat_licence;
                let obj_boat = [], obj_boat_qrcode = [];
                let fetch_boat_needed = false;
                if (user != null) {
                    let parsed_user = JSON.parse(user);
                    user_id_stored = parsed_user.user_id;
                }

                // Get local storage for connection
                const connection = await AsyncStorage.getItem('connection');
                // console.log(connection);
                if (connection != null) {
                    console.log('getting connection...');
                    let parsed_connection = JSON.parse(connection);
                    local_host = parsed_connection.host;
                    local_port = parsed_connection.port;
                    car_licence = parsed_connection.car_licence;
                    boat_licence = parsed_connection.boat_licence;

                    if (user_id_stored !== undefined) {
                        // Start fetching data of boat
                        console.log('fetching data of boat...');
                        fetch_boat_needed == true;
                        let url_boat = local_host + ':' + local_port + boat_licence + user_id_stored;
                        fetch(url_boat, { method: 'GET' })
                            .then((response) => response.json())
                            .then((res) => {
                                if (res.statusCode === 200) {
                                    console.log('data of boat fetched.')
                                    obj_boat = [
                                        {
                                            first_name: res.licences[0].first_name,
                                            last_name: res.licences[0].last_name,
                                            birthdate: res.licences[0].birthdate,
                                            number: res.licences[0].number,
                                            photo_url: res.licences[0].photo_url,
                                            signature_photo_url: res.licences[0].signature_photo_url
                                        }
                                    ];

                                    obj_boat_qrcode = [
                                        {
                                            img_url: res.licences[0].qr_code_url,
                                        }
                                    ];
                                } else if (res.statusCode === 404) {
                                    console.log('User ' + user_id_stored + ' has no boat-licence');
                                } else {
                                    console.log('connection failed');
                                }
                                fetch_boat_needed = false;
                                if (obj_boat.length > 0) {
                                    set_data_boat(obj_boat);
                                }
                                if (obj_boat_qrcode.length > 0) {
                                    set_data_qr_code(obj_boat_qrcode);
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
        <WrapperQRCode style={this.set_wrapper_bkgr()}>
            <MainContent>
                {/* <Text style={styles.text_title}>Sportbootlizenz</Text> */}
                {visibility ?
                    <FlatList
                        style={styles.licence_list}
                        data={data_boat}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={1.0}
                                style={styles.card_style}
                                onPress={() => showHideComponent()}>
                                <ImageBackground
                                    source={require('../../../assets/boat-bkgr.png')}
                                    resizeMode='stretch'
                                    style={{ width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden', flexDirection: 'row' }}
                                >
                                    <View style={styles.main}>
                                        <View style={styles.licenceHead}>
                                            <Text style={styles.licenceTitle}>Sportbootführerschein</Text>
                                            <Text style={styles.licenceTitle}>Bundesrepublik Deutschland</Text>
                                        </View>
                                        <Text style={styles.licenceData}>1.  {item.first_name}</Text>
                                        <Text style={styles.licenceData}>2.  {item.last_name}</Text>
                                        <Text style={styles.licenceData}>3.  {item.birthdate}</Text>
                                        <Text style={styles.licenceData}>4.  05.03.18</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            <Text style={{ flex: 0.5, fontSize: 13, color: Colors.tertiary }}>7. </Text>
                                            <View style={{ flex: 6 }}>
                                                {create_image_auto_height(Dimensions.get('window').width / 4, item.signature_photo_url)}
                                            </View>
                                        </View>
                                        <Text style={styles.licenceData}>10. IWS 28.02.2010 IWM 30.05.2015</Text>
                                        <Text style={styles.licenceData}>11. IWS 12ms; Rhein 12m</Text>
                                        <Text style={styles.licenceData}>13. DSV/DIMYV</Text>
                                        <Text style={styles.licenceData}>14. BMVI</Text>
                                        <Text style={styles.licenceData}>15. Keine Sehhilfe notwendig</Text>
                                    </View>

                                    <View style={styles.side}>
                                        <View style={{ marginBottom: 10 }}>
                                            {create_image_auto_height(Dimensions.get('window').width / 8.5, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/licence/adler.png')}
                                        </View>
                                        <View style={{ marginBottom: 10 }}>
                                            {create_image_auto_height(Dimensions.get('window').width / 4.76, item.photo_url)}
                                        </View>
                                        <Text style={styles.licenceData}>5. {item.number}</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.number}
                    />
                    : null}
                {!visibility ?
                    <TouchableOpacity
                        activeOpacity={1.0}
                        style={styles.card_style_back}
                        onPress={() => showHideComponent()}>
                        <ImageBackground
                            source={require('../../../assets/boat-bkgr.png')}
                            resizeMode='stretch'
                            style={{ width: '100%', height: '100%', borderRadius: 24, overflow: 'hidden' }}
                        >
                            <View style={styles.licenceHead}>
                                <Text style={styles.licenceTitleBack}>International certificate for operators of pleasure craft</Text>
                                <Text style={styles.licenceTitleBack}>Certificato internazionale per operatori di imbarcazioni da diporto</Text>
                                <Text style={styles.licenceTitleBack}>Certificado internacional para operadores de embarcaciones de recreo</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.mainBack}>
                                    <Text style={styles.licenceData}>1. Name des Inhabers</Text>
                                    <Text style={styles.licenceData}>2. Vorname des Inhabers</Text>
                                    <Text style={styles.licenceData}>3. Geburtsdatum und Geburtsort</Text>
                                    <Text style={styles.licenceData}>4. Datum der Auslieferung</Text>
                                    <Text style={styles.licenceData}>5. Zertifikatnummer</Text>
                                    <Text style={styles.licenceData}>6. Lichtbild des Inhabers</Text>
                                    <Text style={styles.licenceData}>7. Unterschrift des Inhabers</Text>
                                    <Text style={styles.licenceData}>10.Gültig für: </Text>
                                    <Text style={styles.licenceData}>11.Sport und Freizeitfahrzeuge von nicht mehr als (Länge, Tragfähigkeit, Liestung)</Text>
                                    <Text style={styles.licenceData}>13.Zuständige Stelle</Text>
                                    <Text style={styles.licenceData}>14.Zugelassen durch</Text>
                                    <Text style={styles.licenceData}>15.Vermerke</Text>
                                </View>
                                <View style={styles.sideBack}>
                                    {create_image_auto_height(Dimensions.get('window').width / 5.5, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/licence/adler.png')}
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    : null}
            </MainContent>
            <FlatList
                style={{ margin: 15 }}
                data={data_qr_code}
                renderItem={({ item }) => (
                    <View style={{ padding: 15, borderRadius: 20, backgroundColor: 'white' }}>
                        {create_image_auto_height(200, item.img_url)}
                    </View>
                )}
                keyExtractor={item => item.img_url}
            />
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
        width: '100%',
        marginVertical: 5,
        flex: 1
    },
    card_style_back: {
        width: '85%',
        marginVertical: 5,
        flex: 1
    },
    main: {
        flex: 3,
        paddingLeft: 10,
        paddingVertical: 10,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    mainBack: {
        flex: 3,
        paddingLeft: 10,
        paddingBottom: 10,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    side: {
        flex: 1,
        paddingVertical: 10,
        paddingRight: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sideBack: {
        flex: 1,
        paddingRight: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    adler: {
        width: 50,
        height: 50
    },
    adlerBack: {
        padding: 10,
        width: 80,
        height: 80
    },
    user: {
        width: 70,
        height: 70,
        resizeMode: 'contain'
    },
    licenceTitle: {
        color: 'darkblue',
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'left'
    },
    licenceTitleBack: {
        color: 'darkblue',
        fontWeight: 'bold',
        fontSize: 8
    },
    licenceHead: {
        padding: 10
    },
    licenceData: {
        fontSize: 12
    },
    licence_list: {
        // backgroundColor: 'orange',
        width: '85%',
    },
    qr_style: {
        justifyContent: 'center',
        width: '68%',
        marginVertical: 20,
        // borderRadius: 10,
        // borderWidth: 5,
    },
});


export default BoatLicence;    