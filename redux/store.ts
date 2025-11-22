import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user.slice'
import settingsReducer from './slices/settings.slice'
import drinksReducer from './slices/drinks.slice'

export const store = configureStore({
  reducer: {
    currentUser: userReducer,
    settings: settingsReducer,
    drinks: drinksReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
