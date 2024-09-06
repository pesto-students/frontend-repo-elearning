import restClient from "@/app/api/restClient";
import AiAssistance from "@/components/AiAssistance";
import { APIS } from "@/constant";
import { IdefaultMsgBody } from "@/constant/types";


export const handleChat = async (msg: string, history: [IdefaultMsgBody]) => {
    try {
        const reqBody = {msg, history}
        const res = await restClient.post(APIS.CHAT_BOT, reqBody);
        return res.data.data
    } catch (error) {
        console.log(error)
    }
}

export const handleUpdateHistory = async (history: [IdefaultMsgBody]) => {
    try {
        const reqBody = {data: history};
        const res = await restClient.post(APIS.SAVE_CHAT_HISTORY, reqBody);
        return res.data.data
    } catch (error) {
        console.log(error)
    }
}

export const getChatHistory = async () => {
    try {
        const reqBody = {data: history};
        const res = await restClient.get(APIS.FETCH_CHAT_HISTORY);
        return res.data.data
    } catch (error) {
        console.log(error)
    }
}

export default function Page() {
    return <AiAssistance /> ;
}