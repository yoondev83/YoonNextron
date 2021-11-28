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

const SuccessMsgDialog: React.FC<{ isSuccessful: boolean; setIsSuccessful: (isSuccessful: boolean) => void }> = (props) => {
    const classes = useStyles({});

    const handleClose = () => {
        props.setIsSuccessful(false);
    };
    return (
        <div>
            <Dialog
                open={props.isSuccessful}
                onClose={props.setIsSuccessful}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Typography variant={"h3"}>회원가입을 축하드립니다!</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus className={classes.dialogBtn}>
                        로그인
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SuccessMsgDialog;