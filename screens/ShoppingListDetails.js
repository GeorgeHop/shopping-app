import React from 'react';
import Colors from "../constants/Colors";
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import Actions from "../redux/Actions";
import Layouts from "../constants/Layouts";
import {Bucket, BucketBlack, GreenCheckmark, Pencil, Repeat} from "../constants/Images";

export const ShoppingListDetails = ({route}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const routeData = route?.params;
    const data = useSelector(state => state.modal);
    const lists = useSelector(state => state.lists);

    const listData = React.useMemo(() => {
        return lists.filter(list => list.id === routeData.id)
    },[data, lists]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: `List ${listData[0]?.name}`,
            headerBackTitle: null,
            headerRight: listData[0]?.isArchived ? null : () => (
                <TouchableOpacity
                    onPress={() => dispatch(Actions.UI.modalOpen({data: listData[0], isEdit: true}))}
                    style={{
                        marginRight: 20,
                        flexDirection: 'row'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 17,
                            color: Colors.White
                        }}
                    >
                        Edit
                    </Text>
                </TouchableOpacity>
            ),
            headerTintColor: Colors.White,
            headerBackTitleStyle: {
              color: Colors.White
            },
            tintColor: Colors.White,
            headerTitleStyle: {
                color: Colors.White,
                textAlign: "center",
                flex: 1
            },
            headerStyle: {
                backgroundColor: listData[0]?.color,
                elevation: 0,
                shadowOpacity: 0,
            },
        });
    },[listData]);

    const askBeforeDelete = () => {
        Alert.alert(
            "Delete ?",
            `Are you sure do you want to delete ${listData[0]?.name}`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        navigation.navigate('Home')
                        dispatch(Actions.Lists.Delete(listData[0]?.id))
                    }
                }
            ]
        );
    }

    return(
        <View
            style={{
                flex: 1,
                padding: 15,
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {listData[0]?.items.map((item, index) => (
                    <Text
                        key={index}
                        style={{
                            fontSize: 18,
                            marginVertical: 3,
                        }}
                    >
                        {item}
                    </Text>
                ))}
            </ScrollView>
            <View
                style={{
                    bottom: 0,
                    position: 'absolute',
                    height: 70,
                    width: Layouts.window.width,
                    flexDirection: 'row'
                }}
            >
                <TouchableOpacity
                    style={{
                        height: '100%',
                        width: Layouts.window.width / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}
                    onPress={() => listData[0]?.isArchived ? dispatch(Actions.Lists.Unzip(listData[0]?.id)) : dispatch(Actions.Lists.Archive(listData[0]?.id))}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            color: Colors.Primary
                        }}
                    >
                        {listData[0]?.isArchived ? 'Repeat' : 'Archive'}
                    </Text>
                    {listData[0]?.isArchived ? <Repeat/> : <GreenCheckmark/>}
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        height: '100%',
                        width: Layouts.window.width / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}
                    onPress={() => askBeforeDelete()}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            color: 'red'
                        }}
                    >
                        Delete
                    </Text>
                    <BucketBlack/>
                </TouchableOpacity>
            </View>
        </View>
    )
}
