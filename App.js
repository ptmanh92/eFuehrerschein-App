import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import * as Localization from 'expo-localization';
import I18n from 'ex-react-native-i18n';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import AppContainer from './src/components/Navigation';

const fetchFonts = () => {
  return Font.loadAsync({
    'sairaRegular': require('./assets/fonts/sairaRegular.ttf'),
    'sairaBold': require('./assets/fonts/sairaBold.ttf')
  });
}

let local_host = 'http://141.45.146.153';
let local_port = '8080';
let login_request = '/login/';
let login_initial = '/login/init';
let reset_password = '/reset_password/';
let get_car = '/licence/car/';
let get_pilot = '/licence/pilot/';
let get_boat = '/licence/boat/';
let get_user = '/user/';
let change_username = '/user/change_username';
let change_password = '/user/change_password';
let change_email = '/user/change_email';
let send_feedback = '/feedback';
let logout_request = '/logout'

const App = props => {
  setData = async () => {
    try {
      const connect_it = await AsyncStorage.getItem('connection');
      const user_value = await AsyncStorage.getItem('user');
      const licence_owner = await AsyncStorage.getItem('licence_owner');
      const darkmode = await AsyncStorage.getItem('darkmode');
      // const app_lang = await AsyncStorage.getItem('app_language');

      // Local storage for connection with server
      let obj_conn = {
        host: local_host, 
        port: local_port, 
        login_request: login_request, 
        login_initial: login_initial,
        reset_password: reset_password,
        car_licence: get_car,
        pilot_licence: get_pilot,
        boat_licence: get_boat,
        user_info: get_user,
        change_username: change_username,
        change_password: change_password,
        change_email: change_email,
        feedback: send_feedback,
        logout: logout_request
      }
      if (connect_it !== null) {
        AsyncStorage.mergeItem('connection', JSON.stringify(obj_conn));
        console.log("connection updated.");
        console.log(connect_it);
      } else {
        AsyncStorage.setItem('connection', JSON.stringify(obj_conn));
        console.log("connection created.");
      }

      // Local storage for user
      if (user_value !== null) {
        console.log(user_value);
      } else {
        let obj_user = { 
          user_id: '', 
          username: '', 
          photo: 'https://efuehrerschein.s3.eu-central-1.amazonaws.com/passphoto/100-Admin.png', 
          email: '' 
        };
        AsyncStorage.setItem('user', JSON.stringify(obj_user));
        console.log("user created.");
      }

      // Local storage for licence owner
      let obj_owner = { owner_id: '', licence_type: '' };
      if (licence_owner !== null) {
        AsyncStorage.mergeItem('licence_owner', JSON.stringify(obj_owner));
        console.log(licence_owner);
      } else {
        AsyncStorage.setItem('licence_owner', JSON.stringify(obj_owner));
        console.log("licence owner created.");
      }

      // Local storage for dark mode
      if (darkmode !== null) {
        console.log('Dark mode is now ' + darkmode);
      } else {
        let obj_darkmode = { is_on: false };
        AsyncStorage.setItem('darkmode', JSON.stringify(obj_darkmode));
        console.log("Dark mode is set.");
      }

      // Local storage for language
      // if (app_lang !== null) {
      //   let parsed_lang = JSON.parse(app_lang);
      //   locale_code = parsed_lang.lang_code;
      //   console.log('App Language is ' + locale_code);
      // } else {
      //   let obj_lang = { lang_code: 'de' };
      //   AsyncStorage.setItem('app_language', JSON.stringify(obj_lang));
      //   console.log("App language is set.");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  setData();
  //AsyncStorage.clear();
  // console.log(locale_code);
  const [dataLoaded, setDataLoaded] = useState(false);
  if(!dataLoaded){
    return <AppLoading startAsync={fetchFonts} 
    onFinish={() => setDataLoaded(true)} 
    onError={(err) => console.log(err)}/>
  }

  return <AppContainer screenProps={{
    locale: Localization.locale
  }} />;
}

export default App;