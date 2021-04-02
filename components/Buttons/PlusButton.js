import React from 'react';
import Colors from "../../constants/Colors";
import Layouts from "../../constants/Layouts";
import {Text, TouchableOpacity} from "react-native";

export const PlusButton = ({...rest}) => (
    <TouchableOpacity
        style={{
            backgroundColor: Colors.CarrotRed,
            height: 70,
            width: 70,
            borderRadius: 50,
            ...Layouts.Shadows.Regular,
            position: 'absolute',
            right: 5,
            bottom: 15,
            justifyContent: 'center',
            alignItems: 'center'
        }}
        {...rest}
    >
        <Text
            style={{
                color: Colors.White,
                fontSize: 39,
            }}
        >
            +
        </Text>
    </TouchableOpacity>
)
