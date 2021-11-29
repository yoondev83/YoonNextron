import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ChatMain from "../../components/chat/ChatMain";
import { authActions } from "../../store/authSlice";
import { getDatabase, ref, onValue, query, equalTo } from "firebase/database";
type AuthState = {
    auth: {
        isLoggedIn: boolean,
        userToken: string,
        userEmail: string,
    }
};

const Chat = () => {
    const router = useRouter();
    const auth = getAuth();
    const dispatch = useDispatch();
    const userInfo = useSelector<AuthState, any>(state => state.auth);
    useEffect(() => {
        const db = getDatabase();
        const topUserPostsRef = query(ref(db, 'members/'));
        onValue(topUserPostsRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val().name;
            });
        }, {
            onlyOnce: true
        });
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userToken = String(user.getIdTokenResult().then(res => { return res.token }));
                dispatch(authActions.logIn({
                    userToken: userToken,
                    userEmail: user.email.split("@")[0],
                }));
            } else {
                if (router.pathname === "/service/chat" && localStorage.getItem("userToken").length < 1) {
                    router.replace("/members/signin");
                }
            }
        });
    }, []);

    return <ChatMain />
};


// Chat.getInitialProps = async props => {
// }

export default Chat;
