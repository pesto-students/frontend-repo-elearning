import RecordedLectures from "@/components/RecordedLectures/RecordedLectures";
import { getOnlineClassesAction } from "../online-classes/page";

export const getRecordedSessionsAction = async () => {
    const allActiveRooms: { data: [] } = await getOnlineClassesAction()
    return allActiveRooms.data
}

export default async function Page() {
    const recordedAssets = await getRecordedSessionsAction()
    return <RecordedLectures recordedAssets={recordedAssets} ></RecordedLectures>
}