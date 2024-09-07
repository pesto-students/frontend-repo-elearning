import { configureStore, Tuple } from '@reduxjs/toolkit';
import { logger, } from "./middleware/logger";
import storeSlice from "./slice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            store: storeSlice
        },
        middleware: () => new Tuple(logger,)
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']