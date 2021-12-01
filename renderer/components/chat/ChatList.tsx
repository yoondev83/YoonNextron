import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx';
import { Grid, Typography } from '@material-ui/core';
import { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'next/router';
import UserContact from './UserContact';
import YourProfile from './YourProfile';
import { useAppSelector } from '../../store';
import { chatActions } from '../../store/chatSlice';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contacts: {
            position: "absolute",
            width: "16.7%",
            height: "100%",
            padding: "1rem 2rem 1rem 0.2rem",
            boxSizing: "border-box",
            borderRadius: "1rem 0 0 1rem",
            cursor: "pointer",
            backgroundColor: "#E3F6FC",
            boxShadow: "0 0 8rem 0 rgba(0, 0, 0, 0.1), 2rem 2rem 4rem -3rem rgba(0, 0, 0, 0.5)",
            transition: "transform 500ms",
            fontFamily: "TMONTium",
            fontSize: "1.4rem",
        },
        clickedContact: {
            background: "#b2e7f7",
            color: "black"
        },
        listTitle: {
            margin: "0.2rem 0 1.5rem 7rem",
            color: "black"
        },
        faBars: {
            position: "absolute",
            left: "2.25rem",
            color: "#999",
            transition: "color 200ms",

            '&:hover': {
                color: "#666",
            }
        },
        contact: {
            position: "relative",
            marginBottom: "1rem",
            paddingLeft: "5rem",
            height: "4.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        },
        simpleHr: {
            border: 0,
            height: "1px",
            backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))",
        },
        listGrid: {
            padding: 0
        },
        stark: {
            backgroundImage: `url(${"/images/user1.png"})`,
        },

    })
);

const ChatList: React.FC<{ userData: any }> = (props) => {
    const classes = useStyles({});
    const auth = getAuth();
    const dispatch = useDispatch();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isContactClicked, setIsContactClicked] = useState<boolean>(false);
    const [selectedUid, setSelectedUid] = useState<string>("");
    const { userName, userUid } = useAppSelector(state => state.auth);
    const selectedContact = clsx(classes.contact, classes.clickedContact);


    const barBtnHandler = (event: React.MouseEvent<any>) => {
        setAnchorEl(event.currentTarget);
    };
    const barBtnCloseHandler = () => {
        setAnchorEl(null);
    };
    const contactClickHandler = (userInfo: { uid: any; name: any; }) => {
        setIsContactClicked(true);
        setSelectedUid(userInfo.uid);
        dispatch(chatActions.passUid({
            selectedUid: userInfo.uid,
            selectedUserName: userInfo.name,
        }));

    };
    const logoutBtnHandler = () => {
        setAnchorEl(null);
        dispatch(chatActions.logout);
        dispatch(authActions.logOut);
        localStorage.clear();
        signOut(auth).then(() => {
            router.replace("/home");
        }).catch((error) => {
            console.log(error);
        });
    };

    return <div className={classes.contacts}>
        <FontAwesomeIcon icon={faBars} size="2x" className={classes.faBars} onClick={barBtnHandler} />
        <div>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={barBtnCloseHandler}>
                <MenuItem onClick={logoutBtnHandler}>로그아웃</MenuItem>
            </Menu>
        </div>
        <Typography variant={"h4"} className={classes.listTitle}>
            채팅 목록
        </Typography>
        <YourProfile key={userUid} yourData={userName} contactClass={selectedUid === userUid ? selectedContact : classes.contact} />
        <hr className={classes.simpleHr} />
        <Grid container spacing={0} className={classes.listGrid}>
            {props.userData.map(list => (
                list.uid !== userUid &&
                <UserContact key={list.uid} userData={list} contactClass={selectedUid === list.uid ? selectedContact : classes.contact} contactClickHandler={contactClickHandler} />
            ))}
        </Grid>
    </div>
}

export default ChatList;