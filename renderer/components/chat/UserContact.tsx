import { Grid, Typography } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
        clickedContact: {
            background: "#b2e7f7",
            color: "black"
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
            backgroundImage: `url(${"/images/user1.png"})`,
            // backgroundImage: `url(${"https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/7/7c/Cap.America_%28We_Don%27t_Trade_Lives_Vision%29.png"})`,
        },

    })
);

const UserContact: React.FC<{ userData: any; contactClass: string; contactClickHandler: (userInfo: { uid: any; name: any; }) => void }> = props => {
    const classes = useStyles({});
    const userInfo = {
        uid: props.userData.uid,
        name: props.userData.name
    }

    return <Grid>
        <div className={props.contactClass} key={props.userData.uid} onClick={e => props.contactClickHandler(userInfo)}>
            <div className={clsx(classes.pic, classes.user1)}></div>
            {/* <div className={classes.badge}>
                {props.userData.length}
            </div> */}
            <div>
                <Typography variant={"subtitle1"} className={classes.name}>
                    {props.userData.name}
                </Typography>
            </div>
            <div className={classes.message}>
                <Typography variant={"subtitle1"}>
                    마지막 메시지를 보여주겠...
                </Typography>
            </div>
        </div>
    </Grid>
};

export default UserContact;