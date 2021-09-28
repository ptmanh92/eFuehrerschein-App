import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, AsyncStorage, FlatList } from 'react-native';
import { AntDesign, Ionicons, SimpleLineIcons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import WrapperQRCode from '../../components/WrapperQRCode';
import MainContent from '../../components/MainContent';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import * as Localization from 'expo-localization';
import I18n from 'ex-react-native-i18n';

import Colors from '../../static/Colors';

const default_data = [];

const MainScreen = props => {
    I18n.fallbacks = true;
    I18n.translations = {
        en: {
            mylicences: 'My Licences',
            kfz: 'CAR LICENCE',
            boat: 'BOAT LICENCE',
            pilot: 'PILOT LICENCE',
        },
        de: {
            mylicences: 'Meine Führerscheine',
            kfz: 'KFZ-FÜHRERSCHEIN',
            boat: 'SPORTBOOTFÜHRERSCHEIN',
            pilot: 'PILOTENLIZENZ',
        },
        vi: {
            mylicences: 'Danh sách bằng lái',
            kfz: 'MÔ TÔ / Ô TÔ',
            boat: 'TÀU THUỶ',
            pilot: 'MÁY BAY',
        }
    }
    I18n.locale = props.screenProps.locale;

    const [data_car, set_data_car] = useState(default_data);
    const [data_boat, set_data_boat] = useState(default_data);
    const [data_pilot, set_data_pilot] = useState(default_data);

    // Get dark mode from local storage
    const [dark_mode, set_dark_mode] = useState(false);
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

    set_app_title_style = () => {
        if (dark_mode) {
            return {
                color: Colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 30,
                paddingTop: 0,
                paddingBottom: 20,
                fontSize: 32,
                fontFamily: 'sairaBold'
            };
        } else {
            return {
                color: Colors.tertiary,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 30,
                paddingTop: 0,
                paddingBottom: 20,
                fontSize: 32,
                fontFamily: 'sairaBold'
            };
        }
    }

    set_card_style = () => {
        if (dark_mode) {
            return {
                width: '100%',
                // borderColor: ''
                shadowColor: 'rgba(0,0,0,0.3)', // IOS
                shadowOffset: { height: 7, width: 0 }, // IOS
                shadowOpacity: 0.3, // IOS
                shadowRadius: 15, //IOS
                elevation: 3,
                backgroundColor: '#D8D8D8',
                borderColor: Colors.primary,
                borderRadius: 20,
                marginVertical: 20,
            };
        } else {
            return {
                width: '100%',
                shadowColor: 'rgba(0,0,0,0.3)', // IOS
                shadowOffset: { height: 4, width: 0 }, // IOS
                shadowOpacity: 0.7, // IOS
                shadowRadius: 3, //IOS
                elevation: 3,
                backgroundColor: '#D8D8D8',
                borderColor: Colors.tertiary,
                borderRadius: 20,
                marginVertical: 20,
            };
        }
    }

    set_cardheader_txt = () => {
        if (dark_mode) {
            return {
                color: '#979797',
                fontSize: 18,
                fontFamily: 'sairaRegular',
                // marginRight: 5,
                width: '100%',
                textAlign: 'right'
            };
        } else {
            return {
                color: '#979797',
                fontSize: 18,
                // marginRight: 5,
                fontFamily: 'sairaRegular',
                width: '100%',
                textAlign: 'right'
            };
        }
    }

    set_logo_style = () => {
        if (dark_mode) {
            return {
                paddingVertical: 13,
                color: Colors.tertiary,
            };
        } else {
            return {
                paddingVertical: 13,
                color: Colors.tertiary,
            };
        }
    }

    set_cardfooter_txt = () => {
        if (dark_mode) {
            return {
                color: Colors.tertiary,
                fontSize: 18,
                textAlign: 'center',
                fontFamily: 'sairaBold'
            };
        } else {
            return {
                color: Colors.tertiary,
                fontSize: 18,
                textAlign: 'center',
                fontFamily: 'sairaBold'
            };
        }
    }


    useEffect(() => {
        async function update_data() {
            try {
                // Get local storage for user
                const user = await AsyncStorage.getItem('user');
                let user_id_stored, local_host, local_port, car_licence, boat_licence, pilot_licence;
                let obj_car = [], obj_boat = [], obj_pilot = [];
                let fetch_car_needed = false, fetch_boat_needed = false, fetch_pilot_needed = false;
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
                    pilot_licence = parsed_connection.pilot_licence;

                    if (user_id_stored !== undefined) {
                        // Start fetching data of car
                        console.log('fetching data of car...');
                        fetch_car_needed == true;
                        let url_car = local_host + ':' + local_port + car_licence + user_id_stored;
                        fetch(url_car, { method: 'GET' })
                            .then((response) => response.json())
                            .then((res) => {
                                if (res.statusCode === 200) {
                                    console.log('data of car fetched.')
                                    obj_car = [
                                        {
                                            number: res.licences[0].number
                                        }
                                    ];
                                } else if (res.statusCode === 404) {
                                    console.log('User ' + user_id_stored + ' has no Kfz-Lizenz');
                                } else {
                                    console.log('connection failed');
                                }
                                fetch_car_needed = false;
                                if (obj_car.length > 0) {
                                    set_data_car(obj_car);
                                }
                            })
                            .done();


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
                                            number: res.licences[0].number,
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
                            })
                            .done();


                        // Start fetching data of pilot
                        console.log('fetching data of pilot...');
                        fetch_pilot_needed == true;
                        let url_pilot = local_host + ':' + local_port + pilot_licence + user_id_stored;
                        fetch(url_pilot, { method: 'GET' })
                            .then((response) => response.json())
                            .then((res) => {
                                if (res.statusCode === 200) {
                                    console.log('data of pilot fetched.')
                                    obj_pilot = [
                                        {
                                            number: res.licences[0].number,
                                        }
                                    ];
                                } else if (res.statusCode === 404) {
                                    console.log('User ' + user_id_stored + ' has no pilot-licence');
                                } else {
                                    console.log('connection failed');
                                }
                                fetch_pilot_needed = false;
                                if (obj_pilot.length > 0) {
                                    set_data_pilot(obj_pilot);
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
            <MainContent style={{ justifyContent: 'center', marginTop: '10%' }}>
                <Text style={this.set_app_title_style()}>{I18n.t('mylicences')}</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    style={styles.licence_list}
                    data={data_car}
                    renderItem={({ item }) => (
                        <Card
                            activeOpacity={0.5}
                            style={this.set_card_style()}
                            onPress={() => { props.navigation.navigate('KFZFuehrerschein'); }}>
                            <View style={styles.card_header}>
                                <Text style={this.set_cardheader_txt()}>{item.number}</Text>
                            </View>
                            <CardContent>
                                {/* <MaterialCommunityIcons name="car-hatchback" size={85} style={this.set_logo_style()} ></MaterialCommunityIcons> */}
                                <AntDesign name="car" size={75} style={this.set_logo_style()} />
                            </CardContent>
                            <View style={styles.card_footer}>
                                <Text style={this.set_cardfooter_txt()}>{I18n.t('kfz')}</Text>
                            </View>
                        </Card>
                    )}
                    keyExtractor={item => item.number}
                />

                <FlatList
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    style={styles.licence_list}
                    data={data_boat}
                    renderItem={({ item }) => (
                        <Card
                            activeOpacity={0.5}
                            style={this.set_card_style()}
                            onPress={() => { props.navigation.navigate('BoatFuehrerschein'); }}>
                            <View style={styles.card_header}>
                                <Text style={this.set_cardheader_txt()}>{item.number}</Text>
                            </View>
                            <CardContent>
                                {/* <Ionicons name="ios-boat" size={75} style={this.set_logo_style()} /> */}
                                <MaterialIcons name="directions-boat" size={75} style={this.set_logo_style()} />
                            </CardContent>
                            <View style={styles.card_footer}>
                                <Text style={this.set_cardfooter_txt()}>{I18n.t('boat')}</Text>
                            </View>
                        </Card>
                    )}
                    keyExtractor={item => item.number}
                />

                <FlatList
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    style={styles.licence_list}
                    data={data_pilot}
                    renderItem={({ item }) => (
                        <Card
                            activeOpacity={0.5}
                            style={this.set_card_style()}
                            onPress={() => { props.navigation.navigate('Pilotenlizen'); }}>
                            <View style={styles.card_header}>
                                <Text style={this.set_cardheader_txt()}>{item.number}</Text>
                            </View>
                            <CardContent>
                                {/* <MaterialCommunityIcons name ="airplane" size={75} style={this.set_logo_style()}></MaterialCommunityIcons> */}
                                <SimpleLineIcons name="plane" size={75} style={this.set_logo_style()} />
                            </CardContent>
                            <View style={styles.card_footer}>
                                <Text style={this.set_cardfooter_txt()}>{I18n.t('pilot')}</Text>
                            </View>
                        </Card>
                    )}
                    keyExtractor={item => item.number}
                />
            </MainContent>
        </WrapperQRCode>
    );
};

const styles = StyleSheet.create({
    licence_list: {
        // backgroundColor: 'orange',
        width: '85%',
        // padding: 5
    },
    card_header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        marginVertical: 10
    },
    card_footer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    cardfooter_txt: {
    }
});

export default MainScreen;