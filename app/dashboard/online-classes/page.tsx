import hms from "@/app/api/hms";
import OnlineClasses from "@/components/OnlineClasses/OnlineClasses";
import { APIS } from "@/constant";

export const getOnlineClassesAction = async () => {
    try {
        const { data } = await hms.get(APIS.ROOMS + "?enabled=true")
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getRoomCodeByRoomIdAction = async (roomId = '') => {
    const apiUrl = APIS.ROOMS_CODE.replace(":roomId", roomId)
    try {
        let { data } = await hms.post(apiUrl)
        return data?.data
    } catch (error) {
        console.log(error)
    }
};

export const updateLiveClassByIdAction = async (roomId = '', payload = {}) => {
    if (roomId && payload) {
        try {
            const { data } = await hms.post(APIS.ROOM_BY_ID.replace(":roomId", roomId), payload)
            return data
        } catch (error) {
            console.log(error)
        }
    }
}

export const getActiveSessionByRoomIdAction = async (roomId = '') => {
    try {
        const { data } = await hms.get(APIS.SESSIONS_BY_ROOM_ID.replace(":roomId", roomId))
        return data
    } catch (error) {
        console.log(error)
    }
}


export default async function Page() {
    let rooms = await getOnlineClassesAction() || []
    return <OnlineClasses rooms={rooms} />;
}