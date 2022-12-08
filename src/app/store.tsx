import {configureStore} from "@reduxjs/toolkit";
 import userReducer from "../features/userSlice";
// import companyReducer from "../services/features/companySlice";
import { API } from "../features/api/API";
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';



export const store = configureStore({
    reducer: {
        [API.reducerPath]: API.reducer,
        userState: userReducer,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(API.middleware),
})   
// {immutableCheck: false, serializableCheck: false }

export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
setupListeners(store.dispatch);
