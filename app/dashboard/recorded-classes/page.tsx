import RecordedLectures from "@/components/RecordedLectures/RecordedLectures";
import { getOnlineClassesAction } from "../online-classes/page";

export const getRecordedSessionsAction = async () => {
    try {
        const { data } = await getOnlineClassesAction()
        return data
    } catch (error) {
        console.log(error)
    }
}

export default async function Page() {
    const recordedAssets = await getRecordedSessionsAction()
    return <RecordedLectures recordedAssets={recordedAssets} ></RecordedLectures>
}