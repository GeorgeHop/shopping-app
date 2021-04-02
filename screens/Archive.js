import React from 'react';
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import Colors from "../constants/Colors";
import Actions from "../redux/Actions";
import {Alert, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {SwipeListView} from "react-native-swipe-list-view";
import Layouts from "../constants/Layouts";
import {Bucket, Repeat} from "../constants/Images";

export const Archive = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const data = useSelector(state => state.lists);

    const lists = React.useMemo(() => {
        return data.filter(list => list.isArchived);
    },[data]);

    const askBeforeDelete = item => {
        Alert.alert(
            "Delete ?",
            `Are you sure do you want to delete ${item.name}`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => dispatch(Actions.Lists.Delete(item.id))
                }
            ]
        );
    }

    return (
        <>
            <View
                style={{
                    flex: 1,
                    backgroundColor: Colors.White,
                }}
            >
                <SwipeListView
                    data={lists}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={data => (
                        <TouchableHighlight
                            underlayColor={Colors.Primary}
                            style={{
                                marginHorizontal: 10,
                                height: 90,
                                backgroundColor: data.item.color,
                                marginVertical: 5,
                                padding: 15,
                                ...Layouts.BorderRadius.Regular,
                                ...Layouts.Shadows.Regular
                            }}
                            onPress={() => navigation.navigate('ShoppingListDetails', data.item)}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: Colors.White
                                }}
                            >
                                {data.item.name}
                            </Text>
                        </TouchableHighlight>
                    )}
                    renderHiddenItem={data => (
                        <View
                            style={{
                                marginHorizontal: 10,
                                alignItems: 'center',
                                height: 90,
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    backgroundColor: Colors.Gray,
                                    height: 80,
                                    width: 80,
                                    right: 60,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderTopLeftRadius: 10,
                                    borderBottomLeftRadius: 10,
                                    position: 'absolute',
                                }}
                                onPress={() => dispatch(Actions.Lists.Unzip(data?.item.id))}
                            >
                                <Repeat/>
                                <Text
                                    style={{
                                        color: Colors.White
                                    }}
                                >
                                    Repeat
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'red',
                                    height: 80,
                                    width: 60,
                                    right: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderTopRightRadius: 10,
                                    borderBottomRightRadius: 10,
                                    position: 'absolute',
                                }}
                                onPress={() => askBeforeDelete(data?.item)}
                            >
                                <Bucket/>
                                <Text
                                    style={{
                                        color: Colors.White
                                    }}
                                >
                                    Delete
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    rightOpenValue={-140}
                />
            </View>
        </>
    );
}
