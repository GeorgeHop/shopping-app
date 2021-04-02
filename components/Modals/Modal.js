import React from 'react';
import Layouts from "../../constants/Layouts";
import Colors from "../../constants/Colors";
import {Animated, Text, View, Platform, Keyboard} from "react-native";
import {CloseButton} from "../Buttons/CloseButton";
import {useKeyboardStatus} from "../../hooks/useKeyboardStatus";


export const Modal = ({show, onPress, children, modalTitle}) => {
    const [animationDriver] = React.useState(new Animated.Value(0));
    const keyboardStatus = useKeyboardStatus();

    React.useEffect(() => {
        if(show) {
            Animated.timing(animationDriver, {
                toValue: 1,
                duration: 400,
                useNativeDriver: false
            }).start();
        } else {
            closeModal()
        }
    }, [show]);

    const closeModal = () => {
        Animated.timing(animationDriver, {
            toValue: 0,
            duration: 400,
            useNativeDriver: false
        }).start();
    }

    const modalPosition = animationDriver.interpolate({
        inputRange: [0, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1],
        outputRange: [Layouts.window.height, 105, 75, 50, 30, 15, 5, 0],
        extrapolate: 'clamp',
        useNativeDriver: true,
    });

    return(
        <Animated.View
            style={[
                styles.modal,
                keyboardStatus && Platform.OS === 'ios' && {bottom: 120},
                {
                    transform: [
                        {
                            translateY: modalPosition,
                        }
                    ]
                }
            ]}
        >
            <View
                style={styles.modalHeader}
            >
                <View
                    style={{
                        flex: 1.3
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 15,
                            fontWeight: 'bold',
                        }}
                    >
                        {modalTitle}
                    </Text>
                </View>
                <View
                    style={{
                        flex: 0.1,
                    }}
                >
                    <CloseButton onPress={() => {
                        onPress()
                        Keyboard.dismiss()
                    }}/>
                </View>
            </View>
            {children}
        </Animated.View>
    )
};

const styles = {
    modal: {
        width: Layouts.window.width,
        maxHeight: Layouts.window.height / 1.2,
        backgroundColor: Colors.White,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        padding: 10,
        position: 'absolute',
        bottom: 0,
        ...Layouts.Shadows.ShadowToTop,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
};
