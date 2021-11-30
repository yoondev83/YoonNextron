import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { UserChatData } from './ChatMain';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chatMessage: {
            boxSizing: "border-box",
            padding: "0.5rem 1rem",
            margin: "1rem",
            background: "#E3F6FC",
            borderRadius: "1.125rem 1.125rem 1.125rem 0",
            minHeight: "2.25rem",
            // width: "-webkit-fit-content",
            // width: "-moz-fit-content",
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
        },
        messageTime: {
            fontSize: " 1.2rem",
            float: "right",
            // background: "#EEE",
            padding: "0.25rem 1rem",
            borderRadius: "2rem",
            color: "#999",
            // width: "-webkit-fit-content",
            // width: "-moz-fit-content",
            width: "fit-content",
            margin: "0 auto",

        },
    })
);

const ChatMessage: React.FC<{ userChatData: UserChatData }> = ({ userChatData }) => {
    const classes = useStyles({});
    return <>
        <Typography variant={"subtitle1"} color={"secondary"} className={clsx(classes.chatMessage, classes.you)}>
            {userChatData.message} <br />
            <Typography component={"span"} variant={"subtitle1"} color={"secondary"} className={clsx(classes.messageTime)}>
                {userChatData.time}
            </Typography>
        </Typography>
    </>

}

export default ChatMessage;