import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import TopMenu from '../../components/layout/TopMenu';
import SignInForm from '../../components/member/SignInForm';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'center',
            paddingTop: theme.spacing(25),
        },

    })
);

const SignIn: React.FC = () => {
    const classes = useStyles({});

    return <Container maxWidth="lg">
        <TopMenu message="계정이 없으신가요?" hrefUrl={"/members/signup"} btnTxt={"회원가입"} />
        <SignInForm />
    </Container>;
}

export default SignIn;