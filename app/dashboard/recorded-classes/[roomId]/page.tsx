import hms from "@/app/api/hms";
import ViewLecture from "@/components/RecordedLectures/ViewLecture/ViewLecture";
import asyncLib from 'async';
import partition from 'lodash/partition';
import { redirect } from "next/navigation";

export const getRecordingAssetsAction = async (roomId = '') => {
    try {
        const recordingAssets: [] = await getRecordingAssetByRoomId(roomId)
        const processRecordingAssets = await asyncLib.mapLimit(recordingAssets, 5, async (asset = { id: '' }) => {
            const { id } = asset
            const urlDetails = await getRecordedLectureUrlAction(id)
            return { ...asset, urlDetails }
        })
        return JSON.parse(JSON.stringify(processRecordingAssets))
    } catch (error) {
        console.log('error getRecordingAssetsAction ===>', error)
        redirect('/dashboard/not-found')
    }
}

export const getRecordingAssetByRoomId = async (roomId = '') => {
    try {
        const apiUrl = '/recording-assets?room_id=:roomId'
        const { data } = await hms.get(apiUrl.replace(":roomId", roomId))
        return data.data
    } catch (error) {
        console.log('error getRecordingAssetByRoomId ===>', error)
    }
}

export const getRecordedLectureUrlAction = async (asset_id = '') => {
    try {
        const apiUrl = "/recording-assets/" + asset_id + "/presigned-url"
        const { data } = await hms.get(apiUrl)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getRecordingsDataByRoomId = async (roomId = '') => {
    try {
        const apiUrl = '/recordings?room_id=' + roomId
        const { data: recordings } = await hms.get(apiUrl)
        const processRecordings = await asyncLib.mapLimit(recordings.data || [], 5, async (recording = { id: "" }) => {
            const { id } = recording
            const recordingDetails = await getRecordingDetailsById(id)

            const [mediaAssets, nonMediaAssets] = partition(recordingDetails.recording_assets, (asset = { type: '' }) => asset.type === 'room-vod');
            const filteredNonMediaAssets = nonMediaAssets.filter((asset = { type: '' }) => ['summary', 'transcript'].includes(asset.type));
            return { ...recording, recording_assets: { mediaAssets: await getProcessedAssets(mediaAssets), nonMediaAssets: await getProcessedAssets(filteredNonMediaAssets) } }
        })
        return processRecordings || []
    } catch (error) {
        console.log(error)
    }
}

const getProcessedAssets = async (assets = []) => {
    try {
        const processAssets = await asyncLib.mapLimit(assets, 5, async (asset = { id: '' }) => {
            const { id } = asset
            const assetUrl = await getRecordedLectureUrlAction(id)
            return assetUrl ? { ...asset, urlDetails: assetUrl } : asset
        })
        return processAssets
    } catch (error) {
        console.log(error)
        return assets
    }

}

export const getRecordingDetailsById = async (recordingId = '') => {
    try {
        const apiUrl = '/recordings/' + recordingId
        const { data } = await hms.get(apiUrl)
        return data
    } catch (error) {
        console.log(error)
    }
}

export default async function Page(props = { params: { roomId: '' } }) {
    const { params } = props
    const sessionsRecordingAssets = await getRecordingsDataByRoomId(params.roomId)

    return <ViewLecture sessionsRecordingAssets={sessionsRecordingAssets}  {...props}></ViewLecture>
}