import React from 'react';
import {Text, TouchableOpacity} from "react-native";
import Colors from "../../constants/Colors";

export const CloseButton = ({onPress}) => (
    <TouchableOpacity
        style={styles.closeButton}
        onPress={onPress}
    >
        <Text
            style={{
                fontSize: 18,
                color: Colors.White,
            }}
        >
            x
        </Text>
    </TouchableOpacity>
);

const styles = {
    closeButton: {
        height: 30,
        width: 30,
        backgroundColor: Colors.Black,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
};
