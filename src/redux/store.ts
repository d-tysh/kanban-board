import { configureStore } from "@reduxjs/toolkit";
import { issuesReducer } from "./issues/slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const issuesPersistConfig = {
    key: 'issues',
    storage,
    whitelist: ['cachedData']
}

export const store = configureStore({
    reducer: {
        issues: persistReducer(issuesPersistConfig, issuesReducer)
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);