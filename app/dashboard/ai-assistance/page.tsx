import geminiClient from "@/app/api/gemini";
import AiAssistance from "@/components/AiAssistance";
import { APIS } from "@/constant";


export const handleChat = async (data: string) => {
    try {
        const res = await geminiClient.get(`${APIS.CHAT_BOT}?prompt=${data}`)
        return res.data.data
    } catch (error) {
        console.log(error)
    }
}

export default async function Page() {
    return <AiAssistance /> 
}