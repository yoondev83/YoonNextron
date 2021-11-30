import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ChatMain from "../../components/chat/ChatMain";
import { authActions } from "../../store/authSlice";
import { getFirestore, where } from "firebase/firestore";
import { collection, getDocs, query } from "firebase/firestore";

const Chat = (props) => {
    const router = useRouter();
    const auth = getAuth();
    const dispatch = useDispatch();
    const db = getFirestore();
    useEffect(() => {
        let userUid;
        let userEmail;
        let userName;
        //새로고침 시 Firebase의 auth 정보가 사라짐.
        //아래 onAuthStateChanged는 로그인하고 새로고침 버튼을 누르는 경우가 아니면 정상적으로 작동함
        onAuthStateChanged(auth, async (user) => {
            const q = query(collection(db, "users"), where("uid", "==", localStorage.getItem("userUid")));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                userEmail = doc.data().userEmail;
                userName = doc.data().name;
            });
            if (user) {
                userUid = user.uid;
                userEmail = user.email;
                dispatch(authActions.logIn({
                    userUid: userUid,
                    userEmail: user.email,
                    userName: userName,
                }));
                //새로고침으로 인하여 onAuthStateChanged의 user를 찾을 수 없는 경우 로그인 시 생성되는 localStorage를 바탕으로 다시 로그인 세션을 유지함.
            } else {
                if (localStorage.getItem("userUid")) {
                    dispatch(authActions.logIn({
                        userUid: localStorage.getItem("userUid"),
                        userEmail: userEmail,
                        userName: userName,
                    }));
                    //로그인 기록도 없는데 chat 부분에 있으면 로그인 페이지로 이동됨.
                } else if (router.pathname === "/service/chat" && !localStorage.getItem("userUid")) {
                    router.replace("/members/signin");
                }
            }
        });
    }, []);

    return <ChatMain userData={props.userListData} userChatData={props.userChatData} />
};

export default Chat;

export async function getStaticProps() {
    const db = getFirestore();
    const queryUserSnapshot = await getDocs(collection(db, "users"));
    const queryChatSnapshot = await getDocs(collection(db, "messages"));
    let userListData = [];
    let userChatData: Array<{
        userEmail: string,
        name: string,
        message: string,
        time: string
    }> = [];
    const userData = queryUserSnapshot.forEach((doc) => {
        userListData.push(doc.data());
    });
    const chatData = queryChatSnapshot.forEach((doc) => {
        userChatData.push(
            {
                userEmail: doc.data().userEmail,
                name: doc.data().name,
                message: doc.data().message,
                time: new Date(doc.data().Timestamp.seconds * 1000).toISOString().replace("T", " ").replace(/\..*/, '')
            }
        );
    });
    return {
        props: {
            userListData,
            userChatData,
        },
        revalidate: 1 //해당 초 만큼 
    };

};