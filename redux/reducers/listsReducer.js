import {createReducer} from "@reduxjs/toolkit";
import Actions from "../Actions";
import Colors, {PickerColors} from "../../constants/Colors";

export default createReducer([], builder => {
    builder
        .addCase(Actions.Lists.Create, (state, action) => {
            state.push(action.payload);
        })
        .addCase(Actions.Lists.Update, (state, action) => {
            for (let [index, list] of state.entries()) {
                if (list.id === action.payload.id) {
                    state[index] = action.payload;
                    return;
                }
            }
        })
        .addCase(Actions.Lists.Delete, (state, action) => {
            return state.filter(list => list.id !== action.payload);
        })
        .addCase(Actions.Lists.Archive,(state, action) => {
            for (let [index, list] of state.entries()) {
                if (list.id === action.payload) {
                    state[index].isArchived = true;
                    state[index].color = Colors.Gray
                    return;
                }
            }
        })
        .addCase(Actions.Lists.Unzip, (state, action) => {
            for (let [index, list] of state.entries()) {
                if (list.id === action.payload) {
                    state[index].isArchived = false;
                    state[index].color = PickerColors[Math.floor(Math.random() * PickerColors.length)];
                    return;
                }
            }
        });
});
