import hms from "@/app/api/hms";
import RecordedLectures from "@/components/RecordedLectures/RecordedLectures";
import asyncLib from "async";

export const getRecordedSessionsAction = async () => {
    const apiUrl = '/recording-assets'
    const { data } = await hms.get(apiUrl)
    return data?.data ? processAssets(data.data) : []
}

export const getRecordedLectureUrlAction = async (asset_id) => {
    const apiUrl = "/recording-assets/" + asset_id + "/presigned-url"
    const { data } = await hms.get(apiUrl)
    return data
}

export const getRoomDetailsByRoomIdAction = async (room_id) => {
    const apiUrl = '/rooms/' + room_id
    const { data } = await hms.get(apiUrl)
    return data
}

export const processAssets = async (recordingAssets) => {
    const response = await asyncLib.mapLimit(recordingAssets, 5, async (asset) => {

        const [roomDetails, urlDetails] = await Promise.all([
            getRoomDetailsByRoomIdAction(asset.room_id),
            getRecordedLectureUrlAction(asset.id),
        ]);

        return {
            ...asset,
            roomDetails,
            urlDetails,
        };
    });
    return response
}

export default async function Page() {
    const recordedAssets = await getRecordedSessionsAction()
    return <RecordedLectures recordedAssets={recordedAssets} ></RecordedLectures>
}