import { Provider } from 'react-redux';
import { store, persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ComponentType } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { themes } from '../configs/themes';
import { ThemeProvider } from '../providers/ThemeContext';
import { useTheme } from '../hooks/useTheme';
import GlobalStyles from '../styles/globals.js';

function MyApp({ Component, pageProps }: { Component: ComponentType; pageProps: any }) {
  return (
    <ThemeProvider>
      <ThemedApp Component={Component} pageProps={pageProps} />
    </ThemeProvider>
  );
}

const ThemedApp = ({ Component, pageProps }: { Component: ComponentType; pageProps: any }) => {
  const { theme } = useTheme();
  
  return (
    <StyledThemeProvider theme={themes[theme]}>
      <GlobalStyles />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </StyledThemeProvider>
  );
};

export default MyApp;
