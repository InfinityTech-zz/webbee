import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'

import inventoryReducer from './reducer';
import { createStore } from 'redux'


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, inventoryReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)