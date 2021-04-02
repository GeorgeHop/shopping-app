import React from 'react';
import Layouts from "../../constants/Layouts";
import {TouchableOpacity} from "react-native";

export const ColoredButton = ({color, activeColorStyles, opacity, ...rest}) => (
    <TouchableOpacity
        style={[
            activeColorStyles,
            {
                height: 50,
                width: 50,
                marginHorizontal: 5,
                backgroundColor: color,
                ...Layouts.BorderRadius.Regular
        }]}
        {...rest}
    />
)
