import React, {forwardRef, useRef} from 'react';
import {ScrollView, View} from "react-native";
import {Input} from "../Form/Input";

export const ItemsList = props => {
    const scrollView = useRef(null);

    React.useEffect(() => {
        scrollView?.current?.scrollToEnd({duration: 500, animated: true});
    },[props.inputs]);

    return(
        <View
            style={{
                maxHeight: 200,
            }}
        >
            <ScrollView
                ref={scrollView}
                showsVerticalScrollIndicator={false}
            >
                {props.inputs?.map((item, index) => (
                    <Input
                        key={index}
                        value={item}
                        placeholder={'Item name'}
                        customStyles={{
                            marginVertical: 5,
                        }}
                        onChangeText={text => props.onChangeText(index, text)}
                        withDeleteButton={props.inputs.length > 1 && true}
                        deleteButtonOnPress={() => props.deleteButtonOnPress(index)}
                    />
                ))}
            </ScrollView>
        </View>
    )
}
