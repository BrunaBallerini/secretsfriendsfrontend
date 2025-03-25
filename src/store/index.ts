import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import nameSlice from './reducers/name.ts';
import emailSlice from './reducers/email.ts';
import isSignedSlice from './reducers/isSigned.ts';
import tokenSlice from './reducers/token.ts';
import presentListSlice from './reducers/presentsList.ts';
import secretFriendSlice from './reducers/secretFriend.ts';
import idDrawSlice from './reducers/idDraw.ts'
import idUserSlice from './reducers/idUser.ts'
import storage from 'redux-persist/es/storage';
import participantListSlice from './reducers/participantsList.ts'
import emailResetPasswordSlice from './reducers/emailResetPassword.ts'
import drawNameSlice from './reducers/drawName.ts'
import drawStatusSlice from './reducers/drawStatus.ts'

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    name: nameSlice,
    email: emailSlice,
    isSigned: isSignedSlice,
    token: tokenSlice,
    presentsList: presentListSlice,
    secretFriend: secretFriendSlice,
    idDraw: idDrawSlice,
    participantList: participantListSlice,
    idUser: idUserSlice,
    emailResetPassword: emailResetPasswordSlice,
    drawName: drawNameSlice,
    drawStatus: drawStatusSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export const clearPersistedStore = () => {
    persistor.purge().then(() => {
    });
};

export type RootState = ReturnType<typeof store.getState>;
export default store;
