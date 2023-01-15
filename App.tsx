import React from 'react';
import { Text } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import Entry from './src/Entry';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <NavigationContainer>
            <PaperProvider>
                <Entry />
            </PaperProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
