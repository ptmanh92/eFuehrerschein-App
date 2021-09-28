import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import BoxHeader from '../../components/BoxHeader';
import BoxFooter from '../../components/BoxFooter';
import BoxContent from '../../components/BoxContent';



const LicenseCard = props => {
    
    
    const imageName = {
        car: {
          imgName: 'car', 
          uri: require('../assets/car.png')
        },
        airplane: {
          imgName: 'airplane', 
          uri: require('../assets/airplain.png')
        },
        boat: {
            imgName: 'boat', 
            uri: require('../assets/boat.png')
          }
    }
    export { assets };

    return(
        <View style={styles.container}>
        <BoxHeader>
        <TouchableOpacity style={StyleSheet.card}>
        </TouchableOpacity>
        <Text style={styles.cardText}>{props.children}</Text>
        </BoxHeader>

        <BoxContent>
        <Image style={styles.cardImage} source={this.props.imageName}></Image>
        </BoxContent>

        <BoxFooter>
        <Text style={styles.cardText}>{this.props.license_type}</Text>
        </BoxFooter>   
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.secondary,
        narginBottom: 10,
        narginLeft: '2%',
        width: '96%',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
            width: 3, 
            height: 3
        }
    },
        //alignItems: 'center',
        cardImage: {
            width: '100%',
            height: 200,
            resizeMode: 'cover'
    },
    cardText: {
        padding: 10,
        fontSize: 15
    }
}
);

export default LicenseCard;