import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, AsyncStorage, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import Image from 'react-native-scalable-image';

import WrapperQRCode from '../../components/WrapperQRCode';
import MainContent from '../../components/MainContent';

import Colors from '../../static/Colors';

const default_data = [];
const default_table = [
    { col9: '9.', col10: '10.', col11: '11.', col12: '12.' },
    { col9: 'AM', col10: '', col11: '', col12: '' },
    { col9: 'A1', col10: '', col11: '', col12: '' },
    { col9: 'A2', col10: '', col11: '', col12: '' },
    { col9: 'A', col10: '', col11: '', col12: '' },
    { col9: 'B1', col10: '', col11: '', col12: '' },
    { col9: 'B', col10: '', col11: '', col12: '' },
    { col9: 'C1', col10: '', col11: '', col12: '' },
    { col9: 'C', col10: '', col11: '', col12: '' },
    { col9: 'D1', col10: '', col11: '', col12: '' },
    { col9: 'D', col10: '', col11: '', col12: '' },
    { col9: 'BE', col10: '', col11: '', col12: '' },
    { col9: 'C1E', col10: '', col11: '', col12: '' },
    { col9: 'CE', col10: '', col11: '', col12: '' },
    { col9: 'D1E', col10: '', col11: '', col12: '' },
    { col9: 'DE', col10: '', col11: '', col12: '' },
    { col9: 'L', col10: '', col11: '', col12: '' },
    { col9: 'T', col10: '', col11: '', col12: '' },
];

const KFZlicence = props => {
    const [data_car, set_data_car] = useState(default_data);
    const [data_car_back, set_data_car_back] = useState(default_data);
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
                let user_id_stored, local_host, local_port, car_licence;
                let obj_car = [], obj_car_qrcode = [];

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

                    if (user_id_stored !== undefined) {
                        // Start fetching data of car
                        console.log('fetching data of car...');
                        
                        let url_car = local_host + ':' + local_port + car_licence + user_id_stored;
                        fetch(url_car, { method: 'GET' })
                            .then((response) => response.json())
                            .then((res) => {
                                if (res.statusCode === 200) {
                                    console.log('data of car fetched.');
                                    let car_server = res.licences;
                                    // Taking care of the table in the backside of the licence
                                    let sample_table = default_table;
                                    for (var i_table = 1; i_table < sample_table.length; i_table++) {
                                        let no_content = true;
                                        for (var i_res = 0; i_res < car_server.length; i_res++) {
                                            if (sample_table[i_table].col9 == car_server[i_res].class_name) {
                                                no_content = false;
                                                sample_table[i_table].col10 = reformatDate(car_server[i_res].issue_date);
                                                sample_table[i_table].col11 = reformatDate(car_server[i_res].valid_until);
                                                if (car_server[i_res].limitations != null)
                                                    sample_table[i_table].col12 = car_server[i_res].limitations;
                                            }
                                        }
                                        if (no_content) {
                                            sample_table[i_table].col10 = "-----";
                                            sample_table[i_table].col11 = "-----";
                                        }
                                    }
                                    set_data_car_back(sample_table);

                                    // Geting all the driving class for the front side of the licence (e.g. 9. AM/B/B1)
                                    let class_name = '';
                                    for (var i = 0; i < car_server.length; i++) {
                                        if (i != car_server.length - 1) class_name += car_server[i].class_name + '/';
                                        else class_name += car_server[i].class_name;
                                    }

                                    // All data for the front side of the licence
                                    obj_car = [
                                        {
                                            first_name: res.licences[0].first_name,
                                            last_name: res.licences[0].last_name,
                                            birthdate: reformatDate(res.licences[0].birthdate),
                                            issue_date: reformatDate(res.licences[0].licence_issuedate),
                                            expiration_date: reformatDate(res.licences[0].expiration_date),
                                            issue_authority: res.licences[0].issue_authority,
                                            number: res.licences[0].number,
                                            photo_url: res.licences[0].photo_url,
                                            signature_photo_url: res.licences[0].signature_photo_url,
                                            class_name: class_name,
                                            suspended: res.licences[0].suspended
                                        }
                                    ];

                                    obj_car_qrcode = [
                                        {
                                            img_url: res.licences[0].qr_code_url,
                                        }
                                    ];
                                } else if (res.statusCode === 404) {
                                    console.log('User ' + user_id_stored + ' has no Kfz-Lizenz');
                                } else {
                                    console.log('connection failed');
                                }

                                if (obj_car.length > 0) {
                                    set_data_car(obj_car);
                                }
                                if (obj_car_qrcode.length > 0) {
                                    set_data_qr_code(obj_car_qrcode);
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
                {visibility ?
                    <FlatList
                        style={styles.licence_list}
                        data={data_car}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.card_style}
                                onPress={() => showHideComponent()}>
                                <ImageBackground
                                    source={require('../../../assets/car-bkgr.png')}
                                    resizeMode='stretch'
                                    style={{ width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden' }}
                                >
                                    <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
                                        <View style={{ flex: 1.5, flexDirection: 'column', justifyContent: 'space-around' }}>
                                            {create_image_auto_height(Dimensions.get('window').width/5, 'https://manhphan.com/htw/19_WS/Praxisprojekt/dummy_data/resources/licence/kfz.png')}
                                            {create_image_auto_height(Dimensions.get('window').width/5, item.photo_url)}
                                            <Text style={{ fontSize: 9 }}>9. {item.class_name}</Text>
                                        </View>
                                        <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-around' }}>
                                            <Text style={{ color: "darkblue", fontSize: 25 }}>Führerschein</Text>
                                            <Text style={styles.kfz_font}>1. {item.first_name}</Text>
                                            <Text style={styles.kfz_font}>2. {item.last_name}</Text>
                                            <Text style={styles.kfz_font}>3. {item.birthdate}</Text>
                                            <Text style={styles.kfz_font}>4a. {item.issue_date}</Text>
                                            <Text style={styles.kfz_font}>4b. {item.expiration_date}</Text>
                                            <Text style={styles.kfz_font}>4c. {item.issue_authority}</Text>
                                            <Text style={styles.kfz_font}>5. {item.number}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                <Text style={{ flex: 0.5, fontSize: 13, color: Colors.tertiary}}>7. </Text>
                                                <View style={{ flex: 6 }}>
                                                    {create_image_auto_height(Dimensions.get('window').width/2.8, item.signature_photo_url)}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.number}
                    />
                : null }

                {!visibility ?
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => showHideComponent()}
                        style={styles.card_style_back}>
                        <ImageBackground
                            source={require('../../../assets/car-bkgr.png')}
                            resizeMode='stretch'
                            style={{ width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden' }}
                        >
                            <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <View style={{ height: '50%', justifyContent: 'flex-start' }}>
                                        <Text style={styles.text_back}>13.</Text>
                                        <Text> </Text>
                                        <Text style={styles.text_back}>14.(10.)</Text>
                                        <Text> </Text>
                                    </View>
                                    <View style={{ height: '50%', justifyContent: 'flex-end' }}>
                                        <Text style={styles.hinweis}>1. Name 2. Vorname</Text>
                                        <Text style={styles.hinweis}>3. Geburtsdatum und Ort</Text>
                                        <Text style={styles.hinweis}>4a. Ausstellungsdatum</Text>
                                        <Text style={styles.hinweis}>4b. Ablaufdatum</Text>
                                        <Text style={styles.hinweis}>4c. Ausstellungsbehörde</Text>
                                        <Text style={styles.hinweis}>5. Führerscheinnummer</Text>
                                        <Text style={styles.hinweis}>9. Fahrerlaubnisklasse</Text>
                                        <Text style={styles.hinweis}>10. Erteilungsdatum</Text>
                                        <Text style={styles.hinweis}>11. gültig bis 12.Beschränkungen/Zusatzangabe</Text>
                                    </View>
                                </View>

                                <View style={{ flex: 3, paddingLeft: 5 }}>
                                    <FlatList
                                        style={styles.licence_listback} data={data_car_back}
                                        renderItem={({ item }) => (
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <Text style={{ flex: 1.5, textAlign: 'center', textAlignVertical: 'center', fontSize: 8, borderColor: 'darkblue', borderWidth: 0.5 }}>{item.col9}</Text>
                                                <Text style={{ flex: 1.8, textAlign: 'center', textAlignVertical: 'center', fontSize: 8, borderColor: 'darkblue', borderWidth: 0.5 }}>{item.col10}</Text>
                                                <Text style={{ flex: 1.8, textAlign: 'center', textAlignVertical: 'center', fontSize: 8, borderColor: 'darkblue', borderWidth: 0.5 }}>{item.col11}</Text>
                                                <Text style={{ flex: 3, textAlign: 'center', textAlignVertical: 'center', fontSize: 8, borderColor: 'darkblue', borderWidth: 0.5 }}>{item.col12}</Text>
                                            </View>
                                        )}
                                        keyExtractor={item => item.col9}
                                    />
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                : null }

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
        height: 250
    },
    card_style_back: {
        justifyContent: 'center',
        width: '85%',
        marginVertical: 20,
        flex: 1
    },
    qr_style: {
        justifyContent: 'center',
        width: '68%',
        marginVertical: 20,
    },
    hinweis: {
        fontSize: 4.5,
        color: 'darkblue'
    },
    kfz_font: {
        fontSize: 14,
        color: Colors.tertiary
    },
    text_back: {
        fontSize: 8,
        color: Colors.tertiary
    },
    licence_list: {
        width: '85%'
    },
    licence_listback: {
        width: '100%',
        borderWidth: 0.5,
        borderColor: 'darkblue'
    },
});

export default KFZlicence;    