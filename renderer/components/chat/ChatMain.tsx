import Grid from '@material-ui/core/Grid';
import ChatBody from './ChatBody';
import ChatList from './ChatList';
export type UserChatData = {
    userEmail: string,
    name: string,
    message: string,
    time: string
}
const ChatMain: React.FC<{ userData: Array<string>; userChatData: Array<UserChatData> }> = (props) => {

    return <div>
        <Grid container spacing={0} direction="row" alignItems="stretch" justifyContent="flex-start">
            <Grid item xs={2}>
                <ChatList userData={props.userData} />
            </Grid>
            <Grid item xs={10}>
                <ChatBody userData={props.userData} userChatData={props.userChatData} />
            </Grid>
        </Grid >
    </div >;
}

export default ChatMain;


