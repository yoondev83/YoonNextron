import React from 'react';
import Head from 'next/head';
import Main from '../components/Main';


function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Yoon's Nextron with-typescript-material-ui</title>
      </Head>
      <Main />
    </React.Fragment >
  );
};

export default Home;
