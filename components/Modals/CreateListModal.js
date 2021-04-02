import React, {} from 'react';
import {View, KeyboardAvoidingView} from "react-native";
import {Input} from "../Form/Input";
import Colors, {PickerColors} from "../../constants/Colors";
import {ItemsList} from "../ScrollViews/ItemsList";
import {Button} from "../Buttons/Button";
import {ColorPicker} from "../ScrollViews/ColorPicker";
import {Modal} from "./Modal";
import {useDispatch, useSelector} from "react-redux";
import Actions from "../../redux/Actions";

export const CreateListModal = () => {
    const dispatch = useDispatch();
    const modalState = useSelector(state => state.modal);
    const [list, setList] = React.useState(modalState.listData);

    React.useEffect(() => {
        setList(modalState.listData);
    },[modalState.listData]);

    const canSave = React.useMemo(() => {
        return !!(list.name.length > 0 && list.color.length > 0 && list.items[0].length > 0)
    }, [list]);

    const updateName = React.useCallback(text => {
        setList({
            ...list,
            name: text,
        });
    }, [list]);

    const addItem = React.useCallback(() => {
        setList(state => {
            const newList = {...state};
            newList.items = [...newList.items, ''];
            return newList;
        });
    }, []);

    const updateItem = React.useCallback((index, text) => {
        const newList = {...list};
        const items = [...newList.items];
        items[index] = text;
        newList.items = items;
        setList(newList);
    }, [list]);

    const deleteItem = React.useCallback(index => {
        const newList = {...list};
        const items = [...newList.items];
        items.splice(index, 1);
        newList.items = items;
        setList(newList);
    }, [list]);

    const updateColor = React.useCallback(color => {
        setList({
            ...list,
            color,
        });
    }, [list]);

    const save = React.useCallback(() => {
        dispatch(Actions.Lists[modalState.isEdit ? 'Update' : 'Create'](list));
    }, [list, modalState.isEdit]);

    return (
        <Modal
            show={modalState.visible}
            onPress={() => dispatch(Actions.UI.modalClose())}
            modalTitle={modalState.isEdit ? `Edit list ${list.name}` : 'Create shopping list'}
        >
            <View
                style={{
                    flex: 1,
                    paddingTop: 20,
                    paddingHorizontal: 10,
                }}
            >
                <Input
                    value={list.name}
                    placeholder={'List name'}
                    onChangeText={updateName}
                />
                <View style={{
                    marginVertical: 10,
                    borderWidth: 1,
                    borderColor: Colors.Gray,
                    borderRadius: 5,
                }}/>
                <ItemsList
                    inputs={list.items}
                    onChangeText={updateItem}
                    deleteButtonOnPress={deleteItem}
                />
                <Button
                    text={'Add one more item'}
                    color={Colors.CarrotRed}
                    onPress={addItem}
                />
                <ColorPicker
                    label={'Color'}
                    colors={PickerColors}
                    selectedColor={list.color}
                    onPressColorButton={updateColor}
                />
                <Button
                    disabled={!canSave}
                    color={canSave ? Colors.Primary : Colors.Gray}
                    text={'Save'}
                    onPress={save}
                />
            </View>
        </Modal>
    );
}
