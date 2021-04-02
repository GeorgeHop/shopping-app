import {createAction} from "@reduxjs/toolkit";

export default {
    Lists: {
        Create: createAction('lists/create'),
        Update: createAction('lists/update'),
        Delete: createAction('lists/delete'),
        Archive: createAction('lists/archive'),
        Unzip: createAction('lists/unzip')
    },
    UI: {
        modalOpen: createAction('modal/open'),
        modalClose: createAction('modal/close')
    }
};
