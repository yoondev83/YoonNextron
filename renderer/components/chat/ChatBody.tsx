import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { faLaugh } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { getFirestore, serverTimestamp, addDoc, collection } from "firebase/firestore";
import { useAppSelector } from '../../store';
import ChatMessage from './ChatMessage';
import { UserChatData } from './ChatMain';
import { useDispatch } from 'react-redux';
import { chatActions } from '../../store/chatSlice';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'center',
            paddingTop: theme.spacing(25),
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
            // overflowY: "auto",
            overflowY: "scroll",
            boxShadow: "inset 0 2rem 2rem -2rem rgba(0, 0, 0, 0.05), inset 0 -2rem 2rem -2rem rgba(0, 0, 0, 0.05)",
        },

        time: {
            fontSize: " 1.2rem",
            background: "#EEE",
            padding: "0.25rem 1rem",
            borderRadius: "2rem",
            color: "#999",
            // width: "-webkit-fit-content",
            // width: "-moz-fit-content",
            width: "fit-content",
            margin: "0 auto",
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

const ChatBody: React.FC<{ userData: Array<string>; userChatData: Array<UserChatData> }> = (props) => {
    const classes = useStyles({});
    const db = getFirestore();
    const dispatch = useDispatch();
    const { userEmail, userName, userUid } = useAppSelector(state => state.auth);
    const { selectedUid, selectedUserName } = useAppSelector(state => state.chat);
    const [chatMsg, setChatMsg] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const date = new Date();
    let nowTime = "00000000000" + date.getHours() + ":" + date.getMinutes()
    const messageHandler = event => {
        setChatMsg(event.target.value);
    };

    const messageSendHandler = async (event: any) => {
        event.preventDefault();
        if (chatMsg === "") {
            return;
        }
        const userMessage = {
            userEmail,
            name: userName,
            message: chatMsg,
            receiver: selectedUid,
            Timestamp: serverTimestamp(),
        }
        try {
            const docRef = await addDoc(collection(db, "messages"), userMessage);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setAllMessages([...allMessages, {
            userEmail,
            name: userName,
            message: chatMsg,
            receiver: selectedUid,
            time: nowTime,
        }]);
        setChatMsg("");
    }
    const messageEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            messageSendHandler(event);
        }
    };

    useEffect(() => {
        setAllMessages(props.userChatData);
        dispatch(chatActions.logout());
    }, [dispatch]);

    return selectedUid === "" ?
        <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center" >
            <div className={classes.root}>
                <img src="/images/logo.png" alt="logo" />
                <Typography variant={"h1"} color={"primary"} >
                    대화 상대를 선택해주세요.
                </Typography>
            </div>
        </Grid> :

        <div className={classes.chat}>
            <div className={clsx(classes.chatContact, classes.bar)}>
                <div className={clsx(classes.pic, classes.chatUser)}></div>
                <Typography variant={"subtitle1"} color={"secondary"} className={classes.name}>
                    {selectedUserName}
                </Typography>
                <Typography variant={"subtitle1"} color={"secondary"} className={classes.seen}>
                    Today at 12: 56
                </Typography>
            </div>

            <Grid container spacing={0} direction="row" alignItems="flex-end" justifyContent="flex-start" className={classes.chatMessages}>
                {/* <div className={classes.chatMessages} id="chat"> */}
                <Typography variant={"subtitle1"} color={"secondary"} className={classes.time}>
                    대화시작
                </Typography>
                {allMessages.filter(filteredMsg => { return filteredMsg.receiver === userUid || filteredMsg.receiver === selectedUid })
                    .map(msgData => <ChatMessage userChatData={msgData} key={msgData.time + Math.random() * 10} />)}

            </Grid>
            <div className={classes.chatInput}>
                <FontAwesomeIcon icon={faFile} className={classes.faIcon} />
                <FontAwesomeIcon icon={faLaugh} className={classes.faIcon} />
                <input placeholder="Type a new message..." type="text" value={chatMsg} onChange={messageHandler} onKeyPress={messageEnterHandler} />
                <FontAwesomeIcon icon={faPaperPlane} className={clsx(classes.faIcon, classes.sendIcon)} onClick={messageSendHandler} />
            </div>
        </div>

};

export default ChatBody;