import React from 'react';
import {ScrollView, Text, View} from "react-native";
import {ColoredButton} from "../Buttons/ColoredButton";
import Colors from "../../constants/Colors";

export const ColorPicker = ({selectedColor, label, colors, onPressColorButton}) => (
    <View
        style={{
            paddingTop: 10,
        }}
    >
        <Text>
            {label}
        </Text>
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
                paddingVertical: 10,
            }}
        >
            {colors?.map((item, index) => (
                <ColoredButton
                    key={index}
                    color={item}
                    activeColorStyles={selectedColor === item && {borderWidth: 4, borderColor: Colors.Primary}}
                    onPress={() => onPressColorButton(item)}
                />
            ))}
        </ScrollView>
    </View>
)
