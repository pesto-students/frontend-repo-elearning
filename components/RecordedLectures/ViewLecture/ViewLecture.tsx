'use client'
import { Card, Grid, Group, Image, List, Stack, Tabs, Text, ThemeIcon } from '@mantine/core';
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';
import uniqBy from "lodash/uniqBy";
import { useEffect, useState } from 'react';
import VODPlayerV2 from '../RecordedLectureCard/VODPlayerv2';
import classes from './ViewLecture.module.css';

const ViewLecture = (props) => {
    const { sessionsRecordingAssets = [{ recording_assets: [] }], params } = props
    const [activeSession, setActiveSession] = useState({})

    const [activeVideoUrl, setActiveVideoUrl] = useState('')

    useEffect(() => {
        if (sessionsRecordingAssets[0]) {
            setActiveSession(sessionsRecordingAssets[0])
            if (sessionsRecordingAssets[0]?.recording_assets?.mediaAssets[0]) {
                setActiveVideoUrl(sessionsRecordingAssets[0]?.recording_assets?.mediaAssets[0].urlDetails.url)
            }
        }
    }, [sessionsRecordingAssets])

    const iconStyle = { width: "2rem", height: "2rem" };

    const tabsPanelJsx = []

    return (
        <div>
            <Grid >
                <Grid.Col span={9}>
                    <Card withBorder >
                        <VODPlayerV2 url={activeVideoUrl} ></VODPlayerV2>
                    </Card>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Grid grow>
                        {
                            sessionsRecordingAssets.map(session => {
                                return (
                                    <Grid.Col >
                                        <SessionCard session={session} activeSession={activeSession} setActiveVideoUrl={setActiveVideoUrl} activeVideoUrl></SessionCard>
                                    </Grid.Col>)
                            })
                        }
                    </Grid>
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


const SessionCard = ({ session, activeSession, setActiveVideoUrl, activeVideoUrl }) => {
    const { mediaAssets = [] } = session.recording_assets || {}


    return (
        <Card shadow="sm" padding="sm" radius="sm" withBorder>
            <Card.Section component="a" href="https://mantine.dev/">
                <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={160}
                    alt="Norway"
                />
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
                <List>
                    {
                        mediaAssets.map(asset => {
                            return (
                                <>
                                    <List.Item onClick={() => setActiveVideoUrl(asset.urlDetails.url)} icon={<ThemeIcon>
                                        {activeVideoUrl === asset.urlDetails.url ? <IconPlayerPlay /> : <IconPlayerPause />}
                                    </ThemeIcon>}>
                                        <Text size='sm' fw={500}>Session: {asset.id}</Text>
                                        <Text size='sm' fw={500}>Asset: {asset.type}</Text>
                                    </List.Item>
                                </>
                            )
                        })
                    }
                </List>
                {/* <Badge color="pink">On Sale</Badge> */}
            </Group>

            {/* <Text size="sm" c="dimmed">
                With Fjord Tours you can
            </Text> */}


        </Card>
    )
}