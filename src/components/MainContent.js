import React from 'react';
import { StyleSheet, View } from 'react-native';

const MainContent = props => {
    return (
        <View style={{...styles.main_content, ...props.style}}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    main_content: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%'
        // paddingTop: 60
    }
});

export default MainContent;