import {createReducer} from "@reduxjs/toolkit";
import Actions from "../Actions";
import {generateId} from "../../helper/generateId";
import moment from 'moment';

const generateInitialList = () => {
    return {
        id: generateId(10),
        name: '',
        color: '',
        date: (moment().unix()).toString(),
        isArchived: false,
        items: [''],
    }
}

const initialState = {
    visible: false,
    isEdit: false,
    listData: generateInitialList()
};

export default createReducer(initialState, builder => {
   builder
       .addCase(Actions.UI.modalOpen,(state, action) => {
           state.listData = action.payload?.data || generateInitialList();
           state.visible = true;
           state.isEdit = !!action.payload?.isEdit;
       })
       .addCase(Actions.UI.modalClose,(state) => {
           state.listData = generateInitialList();
           state.visible = false;
       })
       .addCase(Actions.Lists.Create, (state) => {
           state.listData = generateInitialList();
           state.visible = false;
       })
       .addCase(Actions.Lists.Update, (state) => {
           state.listData = generateInitialList();
           state.visible = false;
       });
});
