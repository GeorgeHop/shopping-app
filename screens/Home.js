import React from 'react';
import Swiper from "react-native-screens-swiper/Swiper";
import {ShoppingLists} from "./ShoppingLists";
import {Archive} from "./Archive";
import Colors from "../constants/Colors";
import Layouts from "../constants/Layouts";
import {useNavigation} from "@react-navigation/native";

export const Home = () => {
    const navigation = useNavigation();
    const screens = [
        {
            component: <ShoppingLists/>,
            tabLabel: 'Shopping Lists'
        },
        {
            component: <Archive/>,
            tabLabel: 'Archived Lists'
        }
    ];

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'ShopApp',
            headerTitleStyle: {
                color: Colors.White,
                textAlign:"center",
                flex:1
            },
            headerStyle: {
                backgroundColor: Colors.Primary,
                elevation: 0,
                shadowOpacity: 0,
            },
        });
    },[]);

    return(
        <Swiper
            data={screens}
            scrollEnabled={false}
            style={styles}
        />
    )
}

const styles = {
    pillButton: {
        backgroundColor: 'white',
        height: 35,
        width: Layouts.window.width / 2 - 15,
        borderRadius: 50,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    pillContainer: {
        height: 45,
    },
    pillActive: {
        backgroundColor: Colors.CarrotRed,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
}
