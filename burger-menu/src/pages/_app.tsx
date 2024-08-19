import '../styles/globals.css'
import { Provider } from 'react-redux';
import { store, persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ComponentType } from 'react';
import { ThemeProvider } from 'styled-components';
import { themes } from '../configs/themes'

function MyApp({ Component, pageProps }: { Component: ComponentType; pageProps: any }) {
  return (
    <ThemeProvider theme={themes.light}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
