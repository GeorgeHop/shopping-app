import React from 'react';
import Colors from "../../constants/Colors";
import Layouts from "../../constants/Layouts";
import {Text, TouchableOpacity} from "react-native";
import {Bucket} from "../../constants/Images";

export const Delete = ({...rest}) => (
    <TouchableOpacity
        style={{
            width: 50,
            height: 40,
            marginLeft: 10,
            top: 4,
            backgroundColor: 'red',
            ...Layouts.BorderRadius.Regular,
            justifyContent: 'center',
            alignItems: 'center'
        }}
        {...rest}
    >
        <Bucket/>
    </TouchableOpacity>
)
