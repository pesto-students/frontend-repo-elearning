'use client'

import { Grid, useMatches } from "@mantine/core";
import { useEffect, useState } from "react";
import RecordedLectureCard from "./RecordedLectureCard/RecordedLectureCard";
const RecordedLectures = (props) => {
    const { recordedAssets = [] } = props
    const [state, setState] = useState({ assets: [] })

    useEffect(() => {
        if (recordedAssets.length) {
            setState(prevState => ({ ...prevState, assets: recordedAssets }))
        }
    }, [recordedAssets])



    const cardStyle = useMatches({ sm: 1, md: 6, lg: 3 })

    return (
        <div>
            Recorded Lectures
            {/* <div>
                <h1>Video on Demand</h1>
                <VODPlayerV2 url={"https://vod-in.100ms.live/66b2186633ce74ab9be938e8/66b2186633ce74ab9be938e9/66b71e309928c864eafbfcec/room-vod/20240817/66c048d24b92b6b97503e283/master.m3u8"} />
            </div> */}
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