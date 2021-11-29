import React from 'react';
import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '../lib/theme';
import { wrapper } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import type { AppProps } from 'next/app';
import "../lib/global.css";

export default wrapper.withRedux(function (props: AppProps) {
  type AuthState = {
    auth: {
      isLoggedIn: boolean,
      userToken: string,
      userEmail: string,
      userPass: string,
    }
  };
  const { Component, pageProps } = props;
  let firebaseApp;
  const firebaseConfig = {
    databaseURL: "https://yoonnexttron-default-rtdb.firebaseio.com/",
    apiKey: "AIzaSyA5wc9YlEL-tUYg-BoWWhQ3Y_D9tbbS6b0",
    authDomain: "yoonnexttron.firebaseapp.com",
    projectId: "yoonnexttron",
    storageBucket: "yoonnexttron.appspot.com",
    messagingSenderId: "513803636188",
    appId: "1:513803636188:web:ab1907024d09ebdebd1319",
  };
  try {
    firebaseApp = getApp();
  } catch (e) {
    firebaseApp = initializeApp(firebaseConfig);
  }

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    const auth = getAuth();
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
