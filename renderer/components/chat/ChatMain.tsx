import Grid from '@material-ui/core/Grid';
import ChatBody from './ChatBody';
import ChatList from './ChatList';


const ChatMain: React.FC = () => {
    return <div>
        <Grid container spacing={0} direction="row" alignItems="stretch" justifyContent="flex-start">
            <Grid item xs={2}>
                <ChatList />
            </Grid>
            <Grid item xs={10}>
                <ChatBody />
            </Grid>
        </Grid >
    </div >;
}

export default ChatMain;