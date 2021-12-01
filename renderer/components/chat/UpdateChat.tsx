import { getFirestore, collection, onSnapshot, query, orderBy } from "firebase/firestore";
export function updateChats() {
    const db = getFirestore();
    const chatRef = collection(db, "messages");
    const chatQuery = query(chatRef, orderBy("Timestamp"));
    let updatedChatData: Array<{
        userEmail: string,
        name: string,
        receiver: string,
        message: string,
        time: string
    }> = [];
    const unsub = onSnapshot(chatQuery, (doc) => {
        doc.docs.map(doc => {
            try {
                updatedChatData.push(
                    {
                        userEmail: doc.data().userEmail,
                        name: doc.data().name,
                        message: doc.data().message,
                        receiver: doc.data().receiver,
                        time: new Date(doc.data().Timestamp.seconds * 1000.0197775).toISOString().replace("T", " ").replace(/\..*/, '')
                    }
                )

            } catch (e) {
                console.log(e);
            }
        }
        )
    });

    return updatedChatData;

}
