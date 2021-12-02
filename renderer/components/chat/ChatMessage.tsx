import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { UserChatData } from './ChatMain';
import { useAppSelector } from '../../store';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chatMessage: {
            boxSizing: "border-box",
            padding: "0.5rem 1rem",
            margin: "1rem",
            background: "#E3F6FC",
            borderRadius: "1.125rem 1.125rem 1.125rem 0",
            minHeight: "2.25rem",
            width: "fit-content",
            maxWidth: "66%",
            boxShadow: "0 0 2rem rgba(0, 0, 0, 0.075), 0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.1)",
            fontWeight: 500,
            color: "#52585D"

        },
        you: {
            margin: "1rem 1rem 1rem auto",
            borderRadius: "1.125rem 1.125rem 0 1.125rem",
            background: "#F3BA4A",
            color: "#FDFDFE",
            textAlign: "right"
        },
        messageTime: {
            fontSize: " 1.2rem",
            float: "right",
            // background: "#EEE",
            padding: "0.25rem 1rem",
            borderRadius: "2rem",
            color: "#999",
            width: "fit-content",
            margin: "0 auto",

        },
    })
);

const ChatMessage: React.FC<{ userChatData: UserChatData }> = ({ userChatData }) => {
    const classes = useStyles({});
    const { userName } = useAppSelector(state => state.auth);
    const messageDate = new Date(userChatData.time.seconds * 1000.0197775).toISOString().replace("T", " ").replace(/\..*/, '');
    let messageClass = userName === userChatData.name ? clsx(classes.chatMessage, classes.you) : clsx(classes.chatMessage)

    return <Grid item md={12} sm={12} xs={12}>
        <Typography variant={"subtitle1"} color={"secondary"} className={messageClass}>
            {userChatData.message} <br />
            <Typography component={"span"} variant={"subtitle1"} color={"secondary"} className={clsx(classes.messageTime)}>
                {messageDate.substring(11, 16)}
            </Typography>
        </Typography>
    </Grid>

}

export default ChatMessage;