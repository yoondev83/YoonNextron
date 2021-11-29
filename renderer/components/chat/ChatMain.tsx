import Grid from '@material-ui/core/Grid';
import ChatBody from './ChatBody';
import ChatList from './ChatList';

const ChatMain: React.FC<{ chatData: any }> = (props) => {

    return <div>
        <Grid container spacing={0} direction="row" alignItems="stretch" justifyContent="flex-start">
            <Grid item xs={2}>
                <ChatList chatData={props.chatData} />
            </Grid>
            <Grid item xs={10}>
                <ChatBody />
            </Grid>
        </Grid >
    </div >;
}

export default ChatMain;


