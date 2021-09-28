import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, Vibration, AsyncStorage, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import Colors from '../../static/Colors';

const QRCodeScannerScreen = props => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    setData = async (id, type) => {
        if (type == 'car' || type == 'sportboat' || type == 'pilot') { 
            try {
                const licence_owner = await AsyncStorage.getItem('licence_owner');
            
                if (licence_owner !== null) {
                    let obj_owner = { owner_id: id, licence_type: type };
                    AsyncStorage.mergeItem('licence_owner', JSON.stringify(obj_owner));
                    console.log(licence_owner);
                } else {
                    let obj_owner = { owner_id: id, licence_type: type };
                    AsyncStorage.setItem('licence_owner', JSON.stringify(obj_owner));
                    console.log("licence owner created.");
                }
            } catch (error) {
            console.log(error);
            }

            if (type == 'car') {
                props.navigation.navigate('QRCodeKFZLicence');
            } else if (type == 'sportboat') {
                props.navigation.navigate('QRCodeBoatLicence');
            } else if (type == 'pilot') {
                props.navigation.navigate('QRCodePilotLicence');
            }
        }  else {
            Alert.alert('QR-Code ist nicht gültig');
            props.navigation.navigate('Login');
        }
    };
  
    useEffect(() => {
        (async () => {
            BarCodeScanner.req
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            setHasPermission(status === 'granted');
        })();
    }, []);
  
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
  
    return (
        <View style={{backgroundColor: Colors.primary }}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : ({type, data}) => {
                    // Vibration.vibrate();
                    // Alert.alert(`Barcode ‘${data}’ of type ‘${type}’ was scanned.`);
                    var qr_data = JSON.stringify(data);
                    var res1 = qr_data.split(".");
                    console.log("res1: " + res1);                       // e.g. "100_100_car"
                    var res2 = res1[0].split("_"); 
                    console.log("res2: " + res2);                       // e.g. "100, 100, car"
                    var userID = res2[0];
                    userID = userID.replace('"', '');                   // e.g. "100 => 100
                    console.log("userID: " + userID);                   // e.g. 100
                    var licenceType = res2.length < 3 ? '' : res2[2];   // e.g. car"
                    licenceType = licenceType.replace('"', '');         // e.g. car" => car
                    console.log("licenceType: " + licenceType);         // e.g. car
                    setData(userID, licenceType);
                }}
                style={{
                    width: Dimensions.get('screen').width,
                    height: "100%",
                }} />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
};

const styles = StyleSheet.create({
});

export default QRCodeScannerScreen;