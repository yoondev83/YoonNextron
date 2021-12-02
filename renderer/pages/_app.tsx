import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '../lib/theme';
import { wrapper } from '../store';
import type { AppProps } from 'next/app';
import "../lib/global.css";

const firebaseConfig = {
  databaseURL: "https://yoonnexttron-default-rtdb.firebaseio.com/",
  apiKey: "AIzaSyA5wc9YlEL-tUYg-BoWWhQ3Y_D9tbbS6b0",
  authDomain: "yoonnexttron.firebaseapp.com",
  projectId: "yoonnexttron",
  storageBucket: "yoonnexttron.appspot.com",
  messagingSenderId: "513803636188",
  appId: "1:513803636188:web:ab1907024d09ebdebd1319",
};

let firebaseApp;
try {
  firebaseApp = getApp();
  const db = getFirestore();
} catch (e) {
  firebaseApp = initializeApp(firebaseConfig);
}
export default wrapper.withRedux(function (props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
})
