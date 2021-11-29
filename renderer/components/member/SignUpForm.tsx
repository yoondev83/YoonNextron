import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import useInput from '../hooks/use-input';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import SignUpDialog from '../layout/SignUpDialog';
import SuccessMsgDialog from '../layout/SuccessMsgDialog';
import { getDatabase, ref, set } from "firebase/database";

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
    const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
    const [infoWrong, setInfoWrong] = useState<boolean>(false);
    const router = useRouter();
    const auth = getAuth();
    const db = getDatabase();
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
    const signInHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsSuccessful(false);
        event.preventDefault();
        if (!isLastNameValid || !isFirstNameValid || !isEmailValid || !isPassValid || (enteredConfirmPass !== enteredPass)) {
            setInfoWrong(true);
            return;
        } else {
            createUserWithEmailAndPassword(auth, enteredEmail, enteredPass)
                .then(async (userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const userInfo = {
                        userEmail: enteredEmail,
                        name: enteredLastName + enteredFirstName,
                        uid: user.uid
                    }
                    setIsSuccessful(true);
                    await set(ref(db, 'members/' + userInfo.uid), {
                        userEmail: userInfo.userEmail,
                        name: userInfo.name,
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
            resetLastNameInput();
            resetFirstNameInput();
            resetEmailInput();
            resetPasswordInput();
            resetPassConfirmInput();
            router.push("/members/signin");

        }
    }

    return <Grid container spacing={0} direction="row" alignItems="center" justifyContent="space-around" className={classes.root}>
        <form noValidate autoComplete="off" onSubmit={signInHandler}>
            {infoWrong === true && <SignUpDialog isInfoWrong={infoWrong} setInfoWrong={setInfoWrong} />}
            {isSuccessful === true && <SuccessMsgDialog isSuccessful={isSuccessful} setIsSuccessful={setIsSuccessful} />}
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
                    <Button variant="contained" type="submit" className={classes.formBtn}>
                        회원가입
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Grid>
};

export default SignUpForm;