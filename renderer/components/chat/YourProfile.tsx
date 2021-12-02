import { Typography } from '@material-ui/core';
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
            backgroundImage: `url(${"https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/7/7c/Cap.America_%28We_Don%27t_Trade_Lives_Vision%29.png"})`,
        },

    })
);

const YourProfile: React.FC<{ yourData: any; contactClass: string; }> = props => {
    const classes = useStyles({});
    return <div className={props.contactClass} key={props.yourData.uid}>
        <div className={clsx(classes.pic, classes.user1)}></div>
        <div>
            <Typography variant={"subtitle1"} className={classes.name}>
                {props.yourData} (You)
            </Typography>
        </div>
        <div className={classes.message}>
            <Typography variant={"subtitle1"}>
                나의 상태메시지는 여기에..
            </Typography>
        </div>
    </div>
};

export default YourProfile;