// almacenamos los datos que recogemos de redux
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

//importamos la api que hemos creado para utilizarla
import { cryptoApi } from '../services/cryptoApi';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});