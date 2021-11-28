import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { faLaugh } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        center: {
        },
        chat: {
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "83.3%",
            height: "100%",
            zIndex: 2,
            boxSizing: "border-box",
            borderRadius: "1rem",
            background: "white",
            boxShadow: "0 0 8rem 0 rgba(0, 0, 0, 0.1), 0rem 2rem 4rem -3rem rgba(0, 0, 0, 0.5)",
        },
        chatContact: {
            transform: "translate(-1.2rem, -20%)",
            width: "100%",
            height: "50%",
            padding: "1rem 2rem 1rem 1rem",
            boxSizing: "border-box",
            borderRadius: "1rem 0 0 1rem",
            cursor: "pointer",
            background: "white",
            boxShadow: "0 0 8rem 0 rgba(0, 0, 0, 0.1), 2rem 2rem 4rem -3rem rgba(0, 0, 0, 0.5)",
            transition: "transform 500ms",
        },
        bar: {
            flexBasis: "5.5rem",
            flexShrink: 0,
            margin: "1rem",
            boxSizing: "border-box",
        },
        pic: {
            width: "5rem",
            height: "4rem",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "50%",
            position: "absolute",
            left: 0
        },
        chatUser: {
            backgroundImage: `url(${"/images/user1.png"})`,
        },
        name: {
            fontSize: "1.4rem",
            fontWeight: "bold",
            paddingLeft: "5rem",
        },
        message: {
            fontSize: "0.9rem",
            color: "#999",
        },
        seen: {
            fontSize: "1.1rem",
            paddingLeft: "5rem",
            color: "#999",
        },
        chatMessages: {
            fontSize: "1.3rem",
            padding: "1rem",
            verticalAlign: "end",
            height: "100%",
            background: "#F7F7F7",
            flexShrink: 2,
            overflowY: "auto",
            boxShadow: "inset 0 2rem 2rem -2rem rgba(0, 0, 0, 0.05), inset 0 -2rem 2rem -2rem rgba(0, 0, 0, 0.05)"
        },
        chatMessage: {
            boxSizing: "border-box",
            padding: "0.5rem 1rem",
            margin: "1rem",
            background: "#E3F6FC",
            borderRadius: "1.125rem 1.125rem 1.125rem 0",
            minHeight: "2.25rem",
            width: "-webkit-fit-content",
            width: "-moz-fit-content",
            width: "fit-content",
            maxWidth: "66%",
            boxShadow: "0 0 2rem rgba(0, 0, 0, 0.075), 0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.1)",
            fontWeight: 500,
            color: "#52585D"

        },
        time: {
            fontSize: " 1.2rem",
            background: "#EEE",
            padding: "0.25rem 1rem",
            borderRadius: "2rem",
            color: "#999",
            width: "-webkit-fit-content",
            width: "-moz-fit-content",
            width: "fit-content",
            margin: "0 auto",
        },
        messageTime: {
            fontSize: " 1.2rem",
            float: "right",
            // background: "#EEE",
            padding: "0.25rem 1rem",
            borderRadius: "2rem",
            color: "#999",
            width: "-webkit-fit-content",
            width: "-moz-fit-content",
            width: "fit-content",
            margin: "0 auto",

        },
        you: {
            margin: "1rem 1rem 1rem auto",
            borderRadius: "1.125rem 1.125rem 0 1.125rem",
            background: "#F3BA4A",
            color: "#FDFDFE",
        },
        typing: {
            display: "inline-block",
            width: "0.8rem",
            height: "0.8rem",
            marginRight: "0rem",
            boxSizing: "border-box",
            background: "#ccc",
            borderRadius: "50%",
        },
        chatInput: {
            boxSizing: "border-box",
            flexBasis: "4rem",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            padding: "0 0.5rem 0 1.5rem",

            '& $input': {
                border: "none",
                backgroundImage: "none",
                backgroundColor: "white",
                padding: "0.5rem 1rem",
                marginRight: "1rem",
                borderRadius: "1.125rem",
                flexGrow: 2,
                boxShadow: "0 0 1rem rgba(0, 0, 0, 0.1), 0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.2)",
                fontWeight: 400,
                letterSpacing: "0.025em",

                '&::placeholder': {
                    color: "#999",
                }
            },
        },
        faIcon: {
            fontSize: "1.8rem",
            marginRight: "1rem",
            color: "#666",
            cursor: "pointer",
            transition: "color 200ms",

            '&:hover': {
                color: "#1c70df"
            },
        },
        sendIcon: {
            fontSize: "2rem",
        }
    })
);

const ChatBody: React.FC = () => {
    const classes = useStyles({});
    return <div className={classes.chat}>
        <div className={clsx(classes.chatContact, classes.bar)}>
            <div className={clsx(classes.pic, classes.chatUser)}></div>
            <Typography variant={"subtitle1"} color={"secondary"} className={classes.name}>
                이용자1
            </Typography>
            <Typography variant={"subtitle1"} color={"secondary"} className={classes.seen}>
                Today at 12: 56
            </Typography>
        </div>

        <Grid container spacing={0} direction="column" alignItems="stretch" justifyContent="flex-end" className={classes.chatMessages}>
            {/* <div className={classes.chatMessages} id="chat"> */}
            <Typography variant={"subtitle1"} color={"secondary"} className={classes.time}>
                오늘 12: 56
            </Typography>
            <Typography variant={"subtitle1"} color={"secondary"} className={clsx(classes.chatMessage, classes.you)}>
                안녕하세요! 잘 지내시죠? 👋 <br />
                <Typography variant={"subtitle1"} color={"secondary"} className={clsx(classes.messageTime)}>
                    12: 56
                </Typography>
            </Typography>
            <Typography variant={"subtitle1"} color={"secondary"} className={clsx(classes.chatMessage, classes.chatUser)}>
                네! 잘 지내죠. 어떻게 도와드릴까요?<br />
                <Typography variant={"subtitle1"} color={"secondary"} className={clsx(classes.messageTime)}>
                    12: 57
                </Typography>
            </Typography>

        </Grid>
        <div className={classes.chatInput}>
            <FontAwesomeIcon icon={faFile} className={classes.faIcon} />
            <FontAwesomeIcon icon={faLaugh} className={classes.faIcon} />
            <input placeholder="Type a new message..." type="text" />
            <FontAwesomeIcon icon={faPaperPlane} className={clsx(classes.faIcon, classes.sendIcon)} />
        </div>
    </div>
};

export default ChatBody;