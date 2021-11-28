import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogBtn: {
            color: "black",
            fontSize: "2rem",
        }
    })
);

const SignUpDialog: React.FC<{ isInfoWrong: boolean; setInfoWrong: (infoWrong: boolean) => void }> = (props) => {
    const classes = useStyles({});

    const handleClose = () => {
        props.setInfoWrong(false);
    };
    return (
        <div>
            <Dialog
                open={props.isInfoWrong}
                onClose={props.setInfoWrong}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Typography variant={"h3"}>정보가 제대로 입력되지 않았습니다!</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus className={classes.dialogBtn}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SignUpDialog;