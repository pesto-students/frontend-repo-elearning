import geminiClient from "@/app/api/gemini";
import CreateQuestionnaire from "@/components/Questionaire/CreateQuestionaire";
import { APIS } from "@/constant";

export const uploadDocument = async (data: FormData) => {
    try {
        const res = await geminiClient.post(APIS.UPLOAD_DOCUMENT, data, {
            headers: {
                'Content-Type': 'multipart/form-data',  
            },
        })
        return res.data.data
    } catch (error) {
        console.log(error)
    }
}

export const createQuestions = async (data: any) => {
    try {
        const res = await geminiClient.post(APIS.CREATE_QUESTIONS, {prompts: data})
        return res.data.data
    } catch (error) {
        console.log(error)
    }
}


export default async function Page() {
    // const recordedAssets = await getRecordedSessionsAction()
  

    return <CreateQuestionnaire />
}