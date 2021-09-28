import React, { useState, useEffect } from 'react';
import Image from 'react-native-scalable-image';
import { StyleSheet, View, Text, ImageBackground, AsyncStorage, FlatList, TouchableOpacity, Dimensions } from 'react-native';
// import { AntDesign, Ionicons, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import WrapperQRCode from '../../components/WrapperQRCode';
import MainContent from '../../components/MainContent';
import Card from '../../components/Card';

import Colors from '../../static/Colors';

const default_data = [];

const BoatLicence = props => {
    const [data_boat, set_data_boat] = useState(default_data);
    const [validity, set_validity] = useState('ungültig');
    const [visibility, setVisibility] = useState(true);

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

    reformatDate = (datum) => {
        let new_date = new Date(datum);
        let day = (new_date.getDate() < 10) ? '0' + new_date.getDate() : new_date.getDate();
        let month = (new_date.getMonth() < 9) ? '0' + (new_date.getMonth() + 1) : new_date.getMonth() + 1;
        let year = new_date.getFullYear();
        let output = day + '.' + month + '.' + year;
        return output;
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
                let owner_id_stored, local_host, local_port, boat_licence;
                let obj_boat = [];
                let fetch_boat_needed = false;
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
                    boat_licence = parsed_connection.boat_licence;

                    if (owner_id_stored !== undefined) {
                        // Start fetching data of boat
                        console.log('fetching data of boat...');
                        fetch_boat_needed == true;
                        let url_boat = local_host + ':' + local_port + boat_licence + owner_id_stored;
                        fetch(url_boat, { method: 'GET' })
                            .then((response) => response.json())
                            .then((res) => {
                                if (res.statusCode === 200) {
                                    console.log('data of boat fetched.')
                                    obj_boat = [
                                        {
                                            first_name: res.licences[0].first_name,
                                            last_name: res.licences[0].last_name,
                                            birthdate: reformatDate(res.licences[0].birthdate),
                                            number: res.licences[0].number,
                                            issuedate: reformatDate(res.licences[0].licence_issuedate),
                                            photo_url: res.licences[0].photo_url,
                                            signature_photo_url: res.licences[0].signature_photo_url,
                                            expiration_date: reformatDate(res.licences[0].expiration_date),
                                            suspended: res.licences[0].suspended,
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
                                    console.log('User ' + owner_id_stored + ' has no boat-licence');
                                } else {
                                    console.log('connection failed');
                                }
                                fetch_boat_needed = false;
                                if (obj_boat.length > 0) {
                                    set_data_boat(obj_boat);
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
            <MainContent style={{ justifyContent: 'center', marginTop: '20%' }}>
                {/* <Text style={styles.text_title}>Sportbootlizenz</Text> */}
                {visibility ?
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        style={styles.licence_list}
                        data={data_boat}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.card_style}
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
                                        <Text style={styles.licenceData}>4.  {item.issuedate}</Text>
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
                                    <Text style={styles.licenceData}>10.Gültig für</Text>
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

                <Text style={{ marginTop: '25%', fontFamily: 'sairaBold' }}>
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
        width: '100%',
        marginVertical: 5,
        flex: 1,
    },
    card_style_back: {
        width: '85%',
        marginVertical: 5,
        flex: 1,
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
        fontSize: 12
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
        paddingBottom: 10,
    },
    qr_style: {
        justifyContent: 'center',
        width: '68%',
        marginVertical: 20,
        // borderRadius: 10,
        // borderWidth: 5,
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
        backgroundColor: 'green',
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


export default BoatLicence;    