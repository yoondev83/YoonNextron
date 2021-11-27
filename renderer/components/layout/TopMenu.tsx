import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        topMenu: {
            paddingTop: "20px",
            float: "right"
        },
        topMenuTxt: {
            verticalAlign: "bottom"
        },
        btn: {
            border: "solid 2px",
            marginLeft: "10px"
        },
        btnTxt: {
            color: "black",
            letterSpacing: "0.2rem",
        }
    })
);

const TopMenu: React.FC<{ message: string; hrefUrl: string; btnTxt: string }> = props => {
    const classes = useStyles({});
    return <div className={classes.topMenu}>
        <Typography component={"span"} variant={"h6"} color={"secondary"} align={"right"} className={classes.topMenuTxt}>
            {props.message}
        </Typography>
        <Button variant="outlined" className={classes.btn}>
            <Link href={props.hrefUrl}>
                <Typography variant={"h6"} align={"center"} className={classes.btnTxt}>
                    {props.btnTxt}
                </Typography>
            </Link>
        </Button>
    </div>
}

export default TopMenu;