'use client'

import { getRoomDetailsByRoomIdAction } from "@/app/dashboard/recorded-lectures/page";
import { Grid, useMatches } from "@mantine/core";
import { useEffect, useState } from "react";
import RecordedLectureCard from "./RecordedLectureCard/RecordedLectureCard";
const RecordedLectures = (props) => {
    const { recordedAssets = [] } = props
    const [state, setState] = useState({ assets: [] })

    useEffect(() => {
        if (recordedAssets.length) {
            // const data = _.groupBy(recordedAssets, 'room_id')

            // getRoomById(recordedAssets)
            setState(prevState => ({ ...prevState, assets: recordedAssets }))
        }
    }, [recordedAssets])

    const getRoomById = async (assets) => {
        const sessionsPromises = await assets.map(async (asset) => {
            const { id, room_id } = asset
            console.log("id, room_id===>", id, room_id)
            return { roomDetails: await getRoomDetailsByRoomIdAction(room_id), ...asset }
        })
        const response = await Promise.all(sessionsPromises)
        console.log('response', response)
        setState((prevState) => ({ ...prevState, assets: response }))
    }

    const cardStyle = useMatches({ sm: 1, md: 6, lg: 4 })

    return (
        <div>
            RecordedLectures
            <Grid>
                {
                    state.assets.map(asset => (
                        <Grid.Col key={asset.id} span={cardStyle}>
                            <RecordedLectureCard data={asset}></RecordedLectureCard>
                        </Grid.Col>
                    ))
                }
            </Grid>
        </div>
    );
};

export default RecordedLectures;