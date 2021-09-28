import React from 'react';
import { AsyncStorage } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import * as Localization from 'expo-localization';
import I18n from 'ex-react-native-i18n';

import LoginScreen from '../screens/user/LoginScreen';
import ForgetPasswordScreen from '../screens/user/ForgetPasswordScreen';
import QRCodeScannerScreen from '../screens/user/QRCodeScannerScreen';
import QRCodeKFZLicenceScreen from '../screens/user/QRCodeKFZLicenceScreen';
import QRCodeBoatLicenceScreen from '../screens/user/QRCodeBoatLicenceScreen';
import QRCodePilotLicenceScreen from '../screens/user/QRCodePilotLicenceScreen';
import QRCodePilotLicenceDetailScreen from '../screens/user/QRCodePilotLicenceDetailScreen';
import UpdateDataScreen from '../screens/user/UpdateDataScreen';
import AuthLoadingScreen from '../screens/user/AuthLoadingScreen';
import MainScreen from '../screens/licence/MainScreen';
import SettingScreen from '../screens/settings/SettingsScreen';
import HelpScreen from '../screens/help/HelpScreen';
import LogoutScreen from '../screens/user/LogoutScreen';
import KFZLicence from '../screens/licence/KFZLicence';
import BoatLicence from '../screens/licence/BoatLicence';
import PilotLicence from '../screens/licence/PilotLicence';
import PilotLicenceDetail from '../screens/licence/PilotLicenceDetail';

import Colors from '../static/Colors';

I18n.fallbacks = true;
I18n.translations = {
    en: {
        initial: 'Change data',
        forgotpassword: 'Forgot password',
        qrcodescanner: 'QR-Code scanner',
        mylicences: 'My licences',
        kfzlicence: 'Car licence',
        sportboatlicence: 'Boat licence',
        pilotlicence: 'Pilot licence',
        pilotlicencedetails: 'Pilot licence details',
        homepage: 'Licences',
        settings: 'Settings',
        help: 'Help',
        logout: 'Logout'
    },
    de: {
        initial: 'Daten ändern',
        forgotpassword: 'Passwort vergessen',
        qrcodescanner: 'QR-Code Scanner',
        mylicences: 'Meine Führerschein',
        kfzlicence: 'Kfz-Führerschein',
        sportboatlicence: 'Sportbootführerschein',
        pilotlicence: 'Pilotenlizenz',
        pilotlicencedetails: 'Detail der Pilotenlizenz',
        homepage: 'Führerscheine',
        settings: 'Einstellungen',
        help: 'Hilfe',
        logout: 'Ausloggen'
    },
    vi: {
        initial: 'Đổi mật khẩu',
        forgotpassword: 'Quên mật khẩu',
        qrcodescanner: 'Quét mã QR',
        mylicences: 'Danh sách bằng lái',
        kfzlicence: 'Bằng lái mô tô / ô tô',
        sportboatlicence: 'Bằng lái tàu thuỷ',
        pilotlicence: 'Bằng lái máy bay',
        pilotlicencedetails: 'Chi tiết bằng lái máy bay',
        homepage: 'Trang chủ',
        settings: 'Cài đặt',
        help: 'Trợ giúp',
        logout: 'Đăng xuất'
    }
}
I18n.locale = Localization.locale;

// getDarkmode = async () => {
//     const [dark_mode, set_dark_mode] = useState(false);
//     try {
//         //Get dark mode from local storage
//         const get_darkmode = await AsyncStorage.getItem('darkmode');
//         if (get_darkmode !== null) {
//             let parsed_get_darkmode = JSON.parse(get_darkmode);
//             let is_on = parsed_get_darkmode.is_on;
//             set_dark_mode(is_on);
//             return dark_mode;
//         } else {
//             set_dark_mode(false);
//             return dark_mode;
//         }
//     } catch (error) {
//         alert(error);
//     }
// }

// setTabBarColor = () => {
//     console.log(getDarkmode())
//     if (getDarkmode()) {
//         return {
//             backgroundColor: Colors.tertiary,
//             zIndex: 100,
//             elevation: 0,
//             shadowOpacity: 0,
//             borderBottomWidth: 0,
//         };
//     } else {
//         return {
//             backgroundColor: Colors.primary,
//             zIndex: 100,
//             elevation: 0,
//             shadowOpacity: 0,
//             borderBottomWidth: 0,
//         }
//     }
// }

const LoginNavigation = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                headerStyle: {
                    height: 0,
                    backgroundColor: Colors.primary,
                    zIndex: 100,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }
            }
        },
        UpdateData: {
            screen: UpdateDataScreen,
            navigationOptions: {
                title: I18n.t('initial'),
                headerStyle: {
                    backgroundColor: Colors.primary,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }
            }
        },
        ForgetPassword: {
            screen: ForgetPasswordScreen,
            navigationOptions: {
                title: I18n.t('forgotpassword'),
                headerStyle: {
                    backgroundColor: Colors.primary,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }
            }
        },
        QRCodeScanner: {
            screen: QRCodeScannerScreen,
            navigationOptions: {
                title: I18n.t('qrcodescanner'),
                headerStyle: {
                    backgroundColor: Colors.primary,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                // headerTintColor: Colors.QRCodepagetitle
            }
        },
        QRCodeKFZLicence: {
            screen: QRCodeKFZLicenceScreen,
            navigationOptions: {
                title: I18n.t('kfzlicence'),
                headerStyle: {
                    backgroundColor: Colors.primary,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                // headerTintColor: Colors.QRCodepagetitle
            }
        },
        QRCodeBoatLicence: {
            screen: QRCodeBoatLicenceScreen,
            navigationOptions: {
                title: I18n.t('sportboatlicence'),
                headerStyle: {
                    backgroundColor: Colors.primary,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                // headerTintColor: Colors.QRCodepagetitle
            }
        },
        QRCodePilotLicence: {
            screen: QRCodePilotLicenceScreen,
            navigationOptions: {
                title: I18n.t('pilotlicence'),
                headerStyle: {
                    backgroundColor: Colors.primary,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                // headerTintColor: Colors.QRCodepagetitle
            }
        },
        QRCodePilotLicenceDetail: {
            screen: QRCodePilotLicenceDetailScreen,
            navigationOptions: {
                title: I18n.t('pilotlicencedetails'),
                headerStyle: {
                    backgroundColor: Colors.primary,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                // headerTintColor: Colors.QRCodepagetitle
            }
        },
        // Logout: {
        //     screen: LogoutScreen,
        //     navigationOptions: {
        //         tabBarLabel: I18n.t('logout'),
        //         tabBarIcon: (tabInfo) => {
        //             return <Ionicons name="ios-log-out" size = {25} color = {tabInfo.tintColor}/>
        //         }
        //     }
        // }
    },
    {
        headerMode: 'screen',
        mode: 'card',
    }
);

const LicenceNavigator = createStackNavigator(
    {
        Main: {
            screen: MainScreen,
            navigationOptions: {
                title: I18n.t('mylicences'),
                headerShown: false,
                headerStyle: {
                    backgroundColor: Colors.primary,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }
            }
        },
        KFZFuehrerschein: {
            screen: KFZLicence,
            navigationOptions: {
                title: I18n.t('kfzlicence'),
                headerStyle: {
                    backgroundColor: Colors.primary,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }
            }
        },
        BoatFuehrerschein: {
            screen: BoatLicence,
            navigationOptions: {
                title: I18n.t('sportboatlicence'),
                headerStyle: {
                    backgroundColor: Colors.primary,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }
            }
        },
        Pilotenlizen: {
            screen: PilotLicence,
            navigationOptions: {
                title: I18n.t('pilotlicence'),
                headerStyle: {
                    backgroundColor: Colors.primary,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }
            }
        },
        PilotenlizenDetail: {
            screen: PilotLicenceDetail,
            navigationOptions: {
                title: I18n.t('pilotlicencedetails'),
                headerStyle: {
                    backgroundColor: Colors.primary,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }
            }
        },
    },
    {
        headerMode: 'screen',
        mode: 'card',
    }
);

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: LicenceNavigator,
            navigationOptions: {
                tabBarLabel: I18n.t('homepage'),
                tabBarIcon: (tabInfo) => {
                    return <FontAwesome name="drivers-license" size={30} color={tabInfo.tintColor} />
                    return <Ionicons name="ios-albums" size={30} color={tabInfo.tintColor} />
                }
            }
        },
        Settings: {
            screen: SettingScreen,
            navigationOptions: {
                tabBarLabel: I18n.t('settings'),
                tabBarIcon: (tabInfo) => {
                    return <Ionicons name="ios-settings" size={30} color={tabInfo.tintColor} />
                }
            }
        },
        Help: {
            screen: HelpScreen,
            navigationOptions: {
                tabBarLabel: I18n.t('help'),
                tabBarIcon: (tabInfo) => {
                    return <Ionicons name="ios-help-circle-outline" size={30} color={tabInfo.tintColor} />
                }
            }
        }
    },
    {
        tabBarOptions: {
            tintColor: Colors.primary,
            style: {
                backgroundColor: Colors.tertiary
            }
        }
    }
);

const AppContainer = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: TabNavigator,
        Auth: LoginNavigation,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));

export default AppContainer;