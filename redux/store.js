import AsyncStorage from "@react-native-async-storage/async-storage";
import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import listsReducer from "./reducers/listsReducer";
import modalReducer from "./reducers/modalReducer";

const reducer = combineReducers({
    lists: listsReducer,
    modal: modalReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: [
        'modal',
    ]
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            // must blacklist react-persist actions in react-toolkit
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store);
