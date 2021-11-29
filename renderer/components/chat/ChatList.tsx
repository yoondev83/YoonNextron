import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'next/router';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contacts: {
            position: "absolute",
            width: "16.7%",
            height: "100%",
            padding: "1rem 2rem 1rem 1rem",
            boxSizing: "border-box",
            borderRadius: "1rem 0 0 1rem",
            cursor: "pointer",
            backgroundColor: "#E3F6FC",
            boxShadow: "0 0 8rem 0 rgba(0, 0, 0, 0.1), 2rem 2rem 4rem -3rem rgba(0, 0, 0, 0.5)",
            transition: "transform 500ms",
            fontFamily: "TMONTium",
            fontSize: "1.4rem",
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
        contactPic: {
            position: "absolute",
            left: 0,
            width: 1000
        },
        name: {
            fontWeight: "bold",
        },
        message: {
            fontSize: "1.1rem",
            color: "#999",
        },
        seen: {
            fontSize: "0.9rem",
            color: "#999",
        },
        badge: {
            boxSizing: "border-box",
            position: "absolute",
            width: "1.5rem",
            height: "1.5rem",
            textAlign: "center",
            fontSize: "0.9rem",
            paddingTop: "0.125rem",
            borderRadius: "1rem",
            top: 0,
            left: "2.5rem",
            background: "#333",
            color: "white",
        },
        pic: {
            width: "4rem",
            height: "4rem",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "50%",
            position: "absolute",
            left: 0
        },
        user1: {
            backgroundImage: `url(${"https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/7/7c/Cap.America_%28We_Don%27t_Trade_Lives_Vision%29.png"})`,
        },
        stark: {
            backgroundImage: `url(${"/images/user1.png"})`,
        },

    })
);

const ChatList: React.FC = () => {
    const classes = useStyles({});
    const auth = getAuth();
    const dispatch = useDispatch();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const barBtnHandler = (event: React.MouseEvent<any>) => {
        setAnchorEl(event.currentTarget);
    };
    const barBtnCloseHandler = () => {
        setAnchorEl(null);
    };
    const logoutBtnHandler = () => {
        setAnchorEl(null);
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
        <div className={classes.contact}>
            <div className={clsx(classes.pic, classes.user1)}></div>
            <div className={classes.badge}>
                14
            </div>
            <div>
                <Typography variant={"subtitle1"} className={classes.name}>
                    이용자 1
                </Typography>
            </div>
            <div className={classes.message}>
                <Typography variant={"subtitle1"}>
                    네! 잘 지내요. 어떻게...
                </Typography>
            </div>
        </div>
        <div className={classes.contact}>
            <div className={clsx(classes.pic, classes.stark)}></div>
            <div className={classes.name}>
                <Typography variant={"subtitle1"}>
                    Tony Stark
                </Typography>
            </div>
            <div className={classes.message}>
                Uh, he's from space, he came here to steal a necklace from a wizard.
            </div>
        </div>
    </div>
}

export default ChatList;