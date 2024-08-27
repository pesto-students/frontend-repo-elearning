import RecordedLectures from "@/components/RecordedLectures/RecordedLectures";
import { getLiveClassesAction } from "../live-classes/page";

export const getRecordedSessionsAction = async () => {
    const allActiveRooms: { data: [] } = await getLiveClassesAction()
    return allActiveRooms.data
}



export default async function Page() {
    const recordedAssets = await getRecordedSessionsAction()
    return <RecordedLectures recordedAssets={recordedAssets} ></RecordedLectures>
}