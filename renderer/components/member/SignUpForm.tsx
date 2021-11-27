import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import useInput from '../hooks/use-input';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'center',
            paddingTop: theme.spacing(20),
        },
        welcomeMsg: {
            color: "black",
            paddingBottom: "30px"
        },
        textField: {
            backgroundColor: "#fff",
            boxShadow: "1px 1px 5px #000",
            border: "none",
            width: "100%"
        },
        textFieldTxt: {
            fontSize: "1.4rem",
            color: "#444",
            fontFamily: "TMONTium",
            fontWeight: "bold",
        },
        formBtn: {
            width: "100%",
            backgroundColor: "#1976d2",
            color: "#fff",
            fontSize: "2rem",
        }
    })
);

const SignUpForm: React.FC = props => {
    const classes = useStyles({});
    const { value: enteredLastName,
        isValid: isLastNameValid,
        valueChangeHandler: lastNameChangeHandler,
        reset: resetLastNameInput } = useInput(value => value.trim() !== "");
    const { value: enteredFirstName,
        isValid: isFirstNameValid,
        valueChangeHandler: firstNameChangeHandler,
        reset: resetFirstNameInput } = useInput(value => value.trim() !== "");
    const { value: enteredEmail,
        isValid: isEmailValid,
        valueChangeHandler: emailChangeHandler,
        reset: resetEmailInput } = useInput(value => value.trim() !== '' && value.includes('@'));
    const { value: enteredPass,
        isValid: isPassValid,
        valueChangeHandler: passwordChangeHandler,
        reset: resetPasswordInput } = useInput(value => value.trim() !== "" && value.length > 5);
    const { value: enteredConfirmPass,
        isValid: isPassConfirmValid,
        valueChangeHandler: passConfirmChangeHandler,
        reset: resetPassConfirmInput } = useInput(value => value.trim() !== "" && value.length > 5);
    const signInHandler = () => {
        resetLastNameInput();
        resetFirstNameInput();
        resetEmailInput();
        resetPasswordInput();
        resetPassConfirmInput();
    }

    return <Grid container spacing={0} direction="row" alignItems="center" justifyContent="space-around" className={classes.root}>
        <form noValidate autoComplete="off">
            <Typography variant={"h1"} className={classes.welcomeMsg}>모든 서비스가 무료입니다!</Typography>
            <Grid item xs={12} container spacing={3}>
                <Grid item xs={6}>
                    <TextField id="outlined-basic" className={classes.textField} label="성" variant="filled"
                        onChange={lastNameChangeHandler} value={enteredLastName} InputProps={{ className: classes.textFieldTxt }}
                        InputLabelProps={{ className: classes.textFieldTxt }} />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="outlined-basic" className={classes.textField} label="이름" variant="filled"
                        onChange={firstNameChangeHandler} value={enteredFirstName} InputProps={{ className: classes.textFieldTxt }}
                        InputLabelProps={{ className: classes.textFieldTxt }} />
                </Grid>
            </Grid>
            <Grid item xs={12} container spacing={3}>
                <Grid item xs={12}>
                    <TextField type="email" id="outlined-basic" className={classes.textField} label="이메일" variant="filled"
                        onChange={emailChangeHandler} value={enteredEmail} InputProps={{ className: classes.textFieldTxt }}
                        InputLabelProps={{ className: classes.textFieldTxt }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField type="password" id="outlined-basic" className={classes.textField} label="비밀번호" variant="filled"
                        onChange={passwordChangeHandler} value={enteredPass} InputProps={{ className: classes.textFieldTxt }}
                        InputLabelProps={{ className: classes.textFieldTxt }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField type="password" id="outlined-basic" className={classes.textField} label="비밀번호 확인" variant="filled"
                        onChange={passConfirmChangeHandler} value={enteredConfirmPass} InputProps={{ className: classes.textFieldTxt }}
                        InputLabelProps={{ className: classes.textFieldTxt }} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={signInHandler} className={classes.formBtn}>
                        회원가입
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Grid>
};

export default SignUpForm;