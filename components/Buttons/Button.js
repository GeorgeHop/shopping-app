import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import Colors from "../../constants/Colors";
import Layouts from "../../constants/Layouts";

export const Button = ({color, text, ...rest}) => (
    <TouchableOpacity
        style={{
            height: 40,
            backgroundColor: color,
            width: '100%',
            ...Layouts.BorderRadius.Regular,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        {...rest}
    >
        <Text
            style={{
                color: Colors.White,
                fontSize: 15
            }}
        >
            {text}
        </Text>
    </TouchableOpacity>
)
