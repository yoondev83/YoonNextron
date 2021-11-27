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

    return <div className={classes.root}>
        <img src="/images/logo.png" className={classes.mainImg} />
        <Typography variant="h1" color="primary" gutterBottom className={classes.mainTitle}>
            환영합니다
        </Typography>
        <Button variant="contained" color="primary" className={classes.btn}>
            <Link href="/next">회원가입</Link>
        </Button>
        <Button variant="contained" color="primary" className={classes.btn}>
            <Link href="#">로그인</Link>
        </Button>
    </div>
}

export default Main;