import { APIS } from "@/constant";
import restClient from "../restClient";

export const getOnlineClassesApi = async (payload = {}) => {
    try {
        const { data } = await restClient.post(APIS.FETCH_ONLINE_CLASS, payload)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getRecordingsByRoomIdApi = async (roomId = '', retCount = false) => {
    const apiUrl = APIS.FETCH_RECORDINGS_BY_ROOM_ID
    try {
        const { data } = await restClient.post(apiUrl, { roomId })
        if (data?.data?.length) {
            return retCount ? data.data.length : data.data
        }
        return retCount ? 0 : []
    } catch (error) {
        console.log(error)
        return retCount ? 0 : []
    }
}