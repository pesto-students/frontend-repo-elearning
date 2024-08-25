import hms from "@/app/api/hms";
import ViewLecture from "@/components/RecordedLectures/ViewLecture/ViewLecture";
import asyncLib from 'async';
import axios from "axios";
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
    const apiUrl = '/recording-assets?room_id=:roomId'
    const { data } = await hms.get(apiUrl.replace(":roomId", roomId))
    return data.data
}

export const getRecordedLectureUrlAction = async (asset_id = '') => {
    const apiUrl = "/recording-assets/" + asset_id + "/presigned-url"
    const { data } = await hms.get(apiUrl)
    return data
}

export const getSessionsByRoomId = async (roomId = '') => {
    const apiUrl = '/sessions?room_Id=' + roomId
    try {
        const sessions = await hms.get(apiUrl)
        const processSessions = asyncLib.mapLimit(sessions, 5, (session) => {

        })


        // return data.data        
    } catch (error) {
        console.log(error)
    }
}

export const getRecordingsDataByRoomId = async (roomId = '') => {
    const apiUrl = '/recordings?room_id=' + roomId
    const { data: recordings } = await hms.get(apiUrl)
    const processRecordings = await asyncLib.mapLimit(recordings.data, 5, async (recording) => {
        const { id } = recording
        const recordingDetails = await getRecordingDetailsById(id)
        const processRecordingDetails = await asyncLib.mapLimit(recordingDetails.recording_assets, 5, async (asset) => {
            const { id } = asset
            const assetUrl = await getRecordedLectureUrlAction(id)
            return { ...asset, urlDetails: assetUrl }
        })

        const mediaTypes = ['room-composite', 'room-vod'];

        const [mediaAssets = [], nonMediaAssets = []] = partition(processRecordingDetails, (asset) => mediaTypes.includes(asset.type));

        return { ...recording, recording_assets: { mediaAssets, nonMediaAssets } }
    })
    return processRecordings || []
}

export const getRecordingDetailsById = async (recordingId = '') => {
    const apiUrl = '/recordings/' + recordingId
    const { data } = await hms.get(apiUrl)
    return data
}

export const getChatCsvAction = async (url = '') => {
    const { data } = await axios.get(url)
    return data
}

export default async function Page(props) {
    const { params } = props
    // const recordingAssets = await getRecordingAssetsAction(params.roomId)
    const sessionsRecordingAssets = await getRecordingsDataByRoomId(params.roomId)
    return <ViewLecture sessionsRecordingAssets={sessionsRecordingAssets} ></ViewLecture>
}