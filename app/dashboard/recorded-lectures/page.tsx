import RecordedLectures from "@/components/RecordedLectures/RecordedLectures";
import { getLiveClassesAction } from "../live-classes/page";

export const getRecordedSessionsAction = async () => {
    const allActiveRooms: { data: [] } = await getLiveClassesAction()
    // const processAllActiveRooms = await asyncLib.mapLimit(allActiveRooms.data, 5, async (room = { id: '' }) => {
    //     const { id } = room
    //     const recordingAssets: [] = await getRecordingAssetByRoomId(id)
    //     const processRecordingAssets = await asyncLib.mapLimit(recordingAssets, 5, async (asset = { id: '' }) => {
    //         const { id } = asset
    //         const urlDetails = await getRecordedLectureUrlAction(id)
    //         return { ...asset, urlDetails }
    //     })
    //     return { ...room, assets: processRecordingAssets }
    // })
    // return JSON.parse(JSON.stringify(processAllActiveRooms))
    return allActiveRooms.data
}



export default async function Page() {
    const recordedAssets = await getRecordedSessionsAction()
    return <RecordedLectures recordedAssets={recordedAssets} ></RecordedLectures>
}