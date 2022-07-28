import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { taskSlice } from './task/taskSlice';
import { uiSlice } from './ui/uiSlice';


export const store = configureStore({
    reducer: {
        auth:     authSlice.reducer,
        task:     taskSlice.reducer,
        ui:       uiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})