"use client"
import { getLiveClassesAction, getRoomCodeByRoomIdAction, updateLiveClassByIdAction } from '@/app/dashboard/online-classes/page';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { setActiveLiveClassFormData, setRoomsCodeData, setScheduleOnlineClassModal } from '@/app/lib/slice';
import { APIS } from '@/constant';
import { Button, Grid, Group, useMatches } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ScheduledClassCard } from '../OnlineClassCard/OnlineClassCard';

const OnlineClasses = ({ rooms = { data: [] } }) => {
    const [roomsData, setRoomsData] = useState([])
    const store = useAppSelector(state => state.store);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (rooms?.data?.length) {
            setRoomsData(rooms.data)
        }
    }, [rooms])

    const cardStyle = useMatches({ sm: 1, md: 4, lg: 3 })

    const createRoomCodeByRoomId = async (roomId = '') => {
        if (roomId) {
            const data: {} = await getRoomCodeByRoomIdAction(roomId)
            return data
        }
    }

    const handleJoinLiveClass = async (roomId = '') => {
        if (roomId) {
            let roomCodeResponse = await createRoomCodeByRoomId(roomId)
            if (roomCodeResponse) {
                dispatch(setRoomsCodeData({ id: roomId, data: roomCodeResponse }))
                const { code = '' } = roomCodeResponse?.find((d = { role: '', code: '' }) => d.role === "broadcaster") || {}
                if (code) {
                    window.open(APIS.LIVE_CLASS.replace(":roomCode", code), '_blank', 'noopener noreferrer')
                }
            }
        }
    }

    const handleDeleteLiveClass = async (roomId = '') => {
        updateLiveClassByIdAction(roomId, { enabled: false })
        const response = await getLiveClassesAction()
        setRoomsData(response)
    }

    const handleEditLiveClass = (data: {}) => {
        dispatch(setActiveLiveClassFormData(data))
        dispatch(setScheduleOnlineClassModal({ show: true }))
    }

    return (
        <div>
            <Group>
                <h1>Scheduled classes</h1>
                <Button onClick={() => dispatch(setScheduleOnlineClassModal({ show: true }))} >Schedule online class</Button>
            </Group>
            <Grid >
                {
                    roomsData?.map((liveClass: { id: string }, liveClassIndex: number) => (
                        <Grid.Col span={cardStyle} key={"card-" + liveClassIndex + "-" + liveClass.id} >
                            <ScheduledClassCard data={liveClass}
                                roomsCodeData={store.roomsCodeData[liveClass.id]}
                                handleJoinLiveClass={handleJoinLiveClass}
                                handleDeleteLiveClass={handleDeleteLiveClass}
                                handleEditLiveClass={handleEditLiveClass}
                            ></ScheduledClassCard>

                        </Grid.Col>
                    ))
                }

            </Grid>
        </div>
    );
};

export default OnlineClasses;