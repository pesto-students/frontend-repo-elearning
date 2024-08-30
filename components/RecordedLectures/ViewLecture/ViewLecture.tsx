'use client'
import { Card, Grid, Group, List, Tabs, Text, ThemeIcon } from '@mantine/core';
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';
import classNames from 'classnames';
import uniqBy from "lodash/uniqBy";
import { useEffect, useState } from 'react';
import VODPlayer from '../RecordedLectureCard/VODPlayer';
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
                        <VODPlayer url={activeVideoUrl} ></VODPlayer>
                    </Card>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Grid grow>
                        {
                            sessionsRecordingAssets.map(session => {
                                return (
                                    <Grid.Col >
                                        <SessionCard session={session} activeSession={activeSession} setActiveVideoUrl={setActiveVideoUrl}
                                            activeVideoUrl={activeVideoUrl}></SessionCard>
                                    </Grid.Col>)
                            })
                        }
                    </Grid>
                </Grid.Col>
            </Grid>
            <div style={{ marginTop: '1rem', border: "1px solid #9093a424" }}>
                {activeSession.recording_assets?.nonMediaAssets &&
                    <Tabs variant='outline' defaultValue={activeSession.recording_assets?.nonMediaAssets[0]?.type}>
                        <Tabs.List>
                            {activeSession.recording_assets.nonMediaAssets && uniqBy(activeSession.recording_assets.nonMediaAssets, 'type').map(nonMediaAsset => {
                                return (
                                    <>
                                        <Tabs.Tab value={nonMediaAsset.type}>{nonMediaAsset.type}</Tabs.Tab>
                                        {
                                            nonMediaAsset.type &&
                                            tabsPanelJsx.push(
                                                <Tabs.Panel value={nonMediaAsset.type} className={classes.tabPanelContent}>
                                                    <div>
                                                        {<iframe src={nonMediaAsset.urlDetails?.url} className='' style={{ width: "100%", border: 'none' }}></iframe>}
                                                    </div>
                                                </Tabs.Panel>)
                                        }
                                    </>)
                            })}
                        </Tabs.List>
                        {tabsPanelJsx}
                    </Tabs>}
            </div>
        </div >
    );
};

export default ViewLecture;


const SessionCard = ({ session, activeSession, setActiveVideoUrl, activeVideoUrl }) => {
    const { mediaAssets = [] } = session.recording_assets || {}


    return (
        <Card shadow="sm" padding="sm" radius="sm" withBorder>
            <Card.Section component="a" href="https://mantine.dev/">
                {/* <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={160}
                    alt="Norway"
                /> */}
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
                <List>
                    {
                        mediaAssets.map(asset => {
                            return (
                                <>
                                    <List.Item onClick={() => setActiveVideoUrl(asset.urlDetails.url)} icon={
                                        <ThemeIcon>
                                            {activeVideoUrl === asset.urlDetails.url ? <IconPlayerPlay /> : <IconPlayerPause />}
                                        </ThemeIcon>} className={classNames(classes.assetContainerPadding, { [classes.activeVideoUrl]: activeVideoUrl === asset.urlDetails.url })}>
                                        <Text size='sm' fw={500}>Assest id: {asset.id}</Text>
                                        <Text size='sm' fw={500}>Asset type: {asset.type}</Text>
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
