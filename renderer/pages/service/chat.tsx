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
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userToken = user.uid;
                dispatch(authActions.logIn({
                    userUid: userToken,
                    userEmail: user.email,
                }));
            } else {
                if (localStorage.getItem("userUid")) {
                    const q = query(collection(db, "users"), where("uid", "==", localStorage.getItem("userUid")));
                    const querySnapshot = await getDocs(q);
                    let userEmail;
                    querySnapshot.forEach((doc) => {
                        userEmail = doc.data().userEmail;
                    });
                    dispatch(authActions.logIn({
                        userUid: localStorage.getItem("userUid"),
                        userEmail: userEmail,
                    }));
                } else if (router.pathname === "/service/chat" && !localStorage.getItem("userToken")) {
                    router.replace("/members/signin");
                }
            }
        });
    }, []);

    return <ChatMain chatData={props.data} />
};

export default Chat;

export async function getStaticProps() {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "users"));
    let data = [];
    const chatData = querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        data.push(doc.data());
    });
    return {
        props: {
            data,
        },
        revalidate: 1 //해당 초 만큼 
    };

};