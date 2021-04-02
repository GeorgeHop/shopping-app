import React from 'react';
import {View, Text, TouchableOpacity, TouchableHighlight, Alert} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import Colors, {PickerColors} from "../constants/Colors";
import Layouts from "../constants/Layouts";
import {PlusButton} from "../components/Buttons/PlusButton";
import { SwipeListView } from 'react-native-swipe-list-view';
import {useDispatch, useSelector} from "react-redux";
import Actions from "../redux/Actions";
import {Bucket, GreenCheckmark, Pencil, RedMinus, Sort} from "../constants/Images";

export const ShoppingLists = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const lists = useSelector(state => state.lists);
    const [isSortedFromNew, setIsSortedFromNew] = React.useState(false);

    const filteredArray = React.useMemo(() => {
        return lists.filter(list => !list.isArchived);
    },[lists]);

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

    const sortedList = React.useMemo(() => {
        return filteredArray.sort((a,b) => isSortedFromNew ? Number(b.date) - Number(a.date) : Number(a.date) - Number(b.date))
    },[lists, isSortedFromNew]);

    const showModal = React.useCallback(() => dispatch(Actions.UI.modalOpen()), []);

    return (
        <>
            <View
                style={{
                    flex: 1,
                    backgroundColor: Colors.White,
                }}
            >
                <SwipeListView
                    data={sortedList.length > 0 ? sortedList : filteredArray}
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
                                    right: 119,
                                    position: 'absolute',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderTopLeftRadius: 10,
                                    borderBottomLeftRadius: 10
                                }}
                                onPress={() => dispatch(Actions.Lists.Archive(data.item.id))}
                            >
                                <GreenCheckmark/>
                                <Text
                                    style={{
                                        color: Colors.White
                                    }}
                                >
                                    Complete
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: Colors.Yellow,
                                    height: 80,
                                    width: 60,
                                    right: 60,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'absolute',
                                }}
                                onPress={() => dispatch(Actions.UI.modalOpen({
                                    data: data?.item,
                                    isEdit: true,
                                }))}
                            >
                                <Pencil/>
                                <Text
                                    style={{
                                        color: Colors.White
                                    }}
                                >
                                    Edit
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
                    rightOpenValue={-199}
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: Colors.Primary,
                        height: 60,
                        width: 60,
                        borderRadius: 50,
                        ...Layouts.Shadows.Regular,
                        position: 'absolute',
                        right: 5,
                        bottom: 90,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => setIsSortedFromNew(!isSortedFromNew)}
                >
                    <Text
                        style={{
                            color: Colors.White
                        }}
                    >
                        Sort
                    </Text>
                </TouchableOpacity>
                <PlusButton onPress={showModal}/>
            </View>
        </>
    );
};
