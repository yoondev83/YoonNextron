import { useRouter } from "next/router";
import ChatMain from "../../components/chat/ChatMain";

const Chat = () => {
    const router = useRouter();
    if (router.pathname === "/service/chat") {
        console.log("fd");
        router.push("/home");
    }
    return <ChatMain />
};

export default Chat;
