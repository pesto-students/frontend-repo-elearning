'use client'
import { Grid, Stack, Tabs, Text } from '@mantine/core';
import classNames from 'classnames';
import uniqBy from "lodash/uniqBy";
import { useState } from 'react';
import VODPlayer from '../RecordedLectureCard/VODPlayer';
import classes from './ViewLecture.module.css';

const ViewLecture = (props) => {
    const { sessionsRecordingAssets = [{ recording_assets: [] }], params } = props
    const [activeSession, setActiveSession] = useState({})
    const [activeSessionVideoAsset, setActiveSessionVideoAsset] = useState({ urlDetails: { url: '' } })

    // useEffect(() => {
    //     setRecordingAssets(sessionsRecordingAssets)
    // }, [sessionsRecordingAssets])

    const iconStyle = { width: "2rem", height: "2rem" };

    const tabsPanelJsx = []

    return (
        <div>
            <Grid >
                <Grid.Col span={8}>
                    <VODPlayer url={activeSessionVideoAsset?.urlDetails?.url} ></VODPlayer>
                </Grid.Col>
                <Grid.Col span={4}>
                    <dl>
                        {
                            sessionsRecordingAssets.map(session => {
                                const { mediaAssets = [] } = session.recording_assets || {}
                                return <Grid className={classNames({ [classes.activeSession]: session.id === activeSession.id })}>
                                    <dt onClick={() => setActiveSession(session)}>Session: {session.id}</dt>

                                    {mediaAssets.map(asset => {
                                        return <dd key={session.id} onClick={() => setActiveSessionVideoAsset(asset)} className={classNames({
                                            [classes.activeAsset]: activeSessionVideoAsset.id === asset.id
                                        })} >
                                            <Text>{asset.type}:  {asset.id}</Text>
                                        </dd>
                                    })}
                                </Grid>
                            })
                        }
                    </dl>
                </Grid.Col>
            </Grid>
            <Stack >
                {console.log("activeSession", activeSession, activeSession.recording_assets?.nonMediaAssets)}
                {activeSession.recording_assets?.nonMediaAssets &&
                    <Tabs>
                        <Tabs.List>
                            {activeSession.recording_assets.nonMediaAssets && uniqBy(activeSession.recording_assets.nonMediaAssets, 'type').map(nonMediaAsset => {
                                return (
                                    <>
                                        <Tabs.Tab value={nonMediaAsset.type}>{nonMediaAsset.type}</Tabs.Tab>
                                        {
                                            nonMediaAsset.type &&
                                            tabsPanelJsx.push(
                                                <Tabs.Panel value={nonMediaAsset.type} className={classes.tabPanelContent}>
                                                    <Grid>
                                                        {/* <h3>Content:</h3> */}
                                                        {
                                                            // nonMediaAsset.type === 'chat' ?
                                                            //     <div>
                                                            //         <Link href={nonMediaAsset.urlDetails?.url}>{nonMediaAsset.urlDetails?.url}</Link>
                                                            //         <ShowChat csvUrl={nonMediaAsset.urlDetails?.url}></ShowChat>
                                                            //     </div>
                                                            //     :
                                                            //     <p>{nonMediaAsset.urlDetails?.url}</p>
                                                            <iframe src={nonMediaAsset.urlDetails?.url} className='' style={{ width: "100%" }}></iframe>
                                                        }

                                                    </Grid>
                                                </Tabs.Panel>)
                                        }
                                    </>)
                            })}
                        </Tabs.List>
                        {tabsPanelJsx}
                    </Tabs>}

                {/* <Tabs defaultValue="gallery">
                    <Tabs.List>
                        <Tabs.Tab value="gallery" leftSection={<IconPhoto style={iconStyle} />}>
                            Gallery
                        </Tabs.Tab>
                        <Tabs.Tab value="messages" leftSection={<IconMessageCircle style={iconStyle} />}>
                            Messages
                        </Tabs.Tab>
                        <Tabs.Tab value="settings" leftSection={<IconSettings style={iconStyle} />}>
                            Settings
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="gallery">
                        Gallery tab content
                    </Tabs.Panel>

                    <Tabs.Panel value="messages">
                        Messages tab content
                    </Tabs.Panel>

                    <Tabs.Panel value="settings">
                        Settings tab content
                    </Tabs.Panel>
                </Tabs> */}

            </Stack>
        </div >
    );
};

export default ViewLecture;