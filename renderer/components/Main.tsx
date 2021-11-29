import React from 'react';
import Head from 'next/head';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'center',
            paddingTop: theme.spacing(25),
        },
        mainImg: {
            paddingBottom: 15
        },
        mainTitle: {
            fontSize: "6rem",
            letterSpacing: "0.5rem",
        },
        btn: {
            fontSize: "2rem",
            width: "13%",
            margin: 10
        }
    })
);

const Main: React.FC = () => {
    const classes = useStyles({});

    return <React.Fragment>
        <Head>
            <title>Yoon's Nextron with-typescript-material-ui</title>
        </Head>
        <div className={classes.root}>
            <img src="/images/logo.png" className={classes.mainImg} />
            <Typography variant="h1" color="primary" gutterBottom className={classes.mainTitle}>
                환영합니다
            </Typography>
            <Link href="/members/signup">
                <Button variant="contained" color="primary" className={classes.btn}>
                    회원가입
                </Button>
            </Link>
            <Link href="/members/signin">
                <Button variant="contained" color="primary" className={classes.btn}>
                    로그인
                </Button>
            </Link>
            {/* <Link href="/service/chat">
                <Button variant="contained" color="primary" className={classes.btn}>
                    채팅
                </Button>
            </Link> */}
        </div>
    </React.Fragment >
}

export default Main;