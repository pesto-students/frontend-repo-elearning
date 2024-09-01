import geminiClient from "@/app/api/gemini";
import AiAssistance from "@/components/AiAssistance";
import { APIS } from "@/constant";
import { IdefaultMsgBody } from "@/constant/types";


export const handleChat = async (msg: string, history: [IdefaultMsgBody]) => {
    try {
        const reqBody = {msg, history}
        const res = await geminiClient.post(APIS.CHAT_BOT, reqBody);
        return res.data.data
    } catch (error) {
        console.log(error)
    }
}

export default async function Page() {
    return <AiAssistance /> ;
}