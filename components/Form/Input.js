import React from 'react';
import Colors from "../../constants/Colors";
import {TextInput, View, Text, TouchableOpacity} from "react-native";
import Layouts from "../../constants/Layouts";
import {Delete} from "../Buttons/Delete";
import {useKeyboardStatus} from "../../hooks/useKeyboardStatus";

export const Input = ({customStyles, withDeleteButton, deleteButtonOnPress, ...rest}) => {
    const keyboardStatus = useKeyboardStatus();
    const [focused, setFocused] = React.useState(false);

    React.useEffect(() => {
        if (!keyboardStatus)
            setFocused(false)
    },[keyboardStatus]);

    return(
        <>
            <View
                style={{
                    flexDirection: 'row',
                }}
            >
                <View
                    style={[
                        customStyles,
                        withDeleteButton ? {width: Layouts.window.width - 100} : '',
                        styles.inputContainer,
                        {borderColor: focused ? Colors.CarrotRed : Colors.Gray}
                    ]}
                >
                    <TextInput
                        onFocus={() => setFocused(true)}
                        style={styles.input}
                        {...rest}
                    />
                </View>
                {!!withDeleteButton && (
                    <Delete
                        onPress={deleteButtonOnPress}
                    />
                )}
            </View>
        </>
    )
}

const styles = {
    inputContainer: {
        height: 40,
        flexDirection: 'row',
        backgroundColor: Colors.LightGray,
        ...Layouts.BorderRadius.Regular,
        borderWidth: 1
    },
    input: {
        padding: 10,
        height: '100%',
        width: '100%'
    }
}
