'use client'
import { getOnlineClassesApi } from '@/app/api/common';
import { Card, Grid, Group, List, rem, Tabs, Text, ThemeIcon } from '@mantine/core';
import { IconPlayerPause, IconPlayerPlay, IconScript, IconTextGrammar } from '@tabler/icons-react';
import classNames from 'classnames';
import uniqBy from "lodash/uniqBy";
import { useEffect, useState } from 'react';
import VODPlayer from '../RecordedLectureCard/VODPlayer';
import classes from './ViewLecture.module.css';

interface RecordingAsset {
    id: string;
    type: string;
    urlDetails: {
        url: string;
    };
}

interface Session {
    recording_assets: {
        mediaAssets: RecordingAsset[];
        nonMediaAssets: RecordingAsset[];
    };
}

interface HMSRoomDetails {
    title: string;
    description: string;
    scheduledDate: string;
    startTime: string;
    endTime: string;
    teacher: {
        firstName: string;
        lastName: string;
    };
    class: {
        className: string;
    };
}

interface ViewLectureProps {
    sessionsRecordingAssets: Session[];
    params: { roomId: string };
}

const ViewLecture: React.FC<ViewLectureProps> = ({ sessionsRecordingAssets = [], params = { roomId: '' } }) => {
    const [activeSession, setActiveSession] = useState<Session | {}>({});
    const [activeVideoUrl, setActiveVideoUrl] = useState('');
    const [hmsRoomDetails, setHMSRoomDetails] = useState<HMSRoomDetails[]>([]);

    useEffect(() => {
        getRoomDetails();
    }, []);

    const getRoomDetails = async () => {
        const hmsRoomDetails = await getOnlineClassesApi({ hmsRoomId: params.roomId });
        setHMSRoomDetails(hmsRoomDetails);
    };

    useEffect(() => {
        if (sessionsRecordingAssets?.length) {
            setActiveSession(sessionsRecordingAssets[0]);
            if (sessionsRecordingAssets[0]?.recording_assets?.mediaAssets[0]) {
                setActiveVideoUrl(sessionsRecordingAssets[0]?.recording_assets?.mediaAssets[0].urlDetails.url);
            }
        }
    }, [sessionsRecordingAssets]);

    const tabsPanelJsx: JSX.Element[] = [];

    const { title, description, scheduledDate, startTime, endTime, teacher, class: classInfo } = hmsRoomDetails[0] || {};

    const iconStyle = { width: rem(12), height: rem(12) };

    return (
        <div>
            {title && (
                <Card withBorder mb="md">
                    <Text size="xl" fw={700}>{title}</Text>
                    <Text>{description}</Text>
                    <Text>Date: {new Date(scheduledDate).toLocaleDateString()}</Text>
                    <Text>Time: {startTime} - {endTime}</Text>
                    <Text>Teacher: {teacher?.firstName} {teacher?.lastName}</Text>
                    <Text>Class: {classInfo?.className}</Text>
                </Card>
            )}
            <Grid>
                <Grid.Col span={9}>
                    <Card withBorder>
                        <VODPlayer url={activeVideoUrl} />
                    </Card>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Grid grow>
                        {sessionsRecordingAssets.map((session, index) => (
                            <Grid.Col key={index}>
                                <SessionCard
                                    session={session}
                                    activeSession={activeSession}
                                    setActiveVideoUrl={setActiveVideoUrl}
                                    activeVideoUrl={activeVideoUrl}
                                />
                            </Grid.Col>
                        ))}
                    </Grid>
                </Grid.Col>
            </Grid>
            <div style={{ marginTop: '1rem', border: "1px solid #9093a424" }}>
                {(activeSession as Session).recording_assets?.nonMediaAssets && (
                    <Tabs variant='outline' defaultValue={(activeSession as Session).recording_assets?.nonMediaAssets[0]?.type}>
                        <Tabs.List>
                            {(activeSession as Session).recording_assets.nonMediaAssets && uniqBy((activeSession as Session).recording_assets.nonMediaAssets, 'type').map((nonMediaAsset, index) => (
                                <Tabs.Tab key={`${nonMediaAsset.type}-${index}`} value={nonMediaAsset.type} leftSection={nonMediaAsset?.type?.includes('script') ? <IconScript style={iconStyle} /> : <IconTextGrammar />}>
                                    {nonMediaAsset.type}
                                </Tabs.Tab>
                            ))}
                        </Tabs.List>
                        {(activeSession as Session).recording_assets.nonMediaAssets && uniqBy((activeSession as Session).recording_assets.nonMediaAssets, 'type').map((nonMediaAsset, index) => (
                            <Tabs.Panel key={`panel-${nonMediaAsset.type}-${index}`} value={nonMediaAsset.type} className={classes.tabPanelContent}>
                                <div>
                                    <iframe src={nonMediaAsset.urlDetails?.url} className='' style={{ width: "100%", border: 'none' }}></iframe>
                                </div>
                            </Tabs.Panel>
                        ))}
                    </Tabs>
                )}
            </div>
        </div>
    );
};

export default ViewLecture;

interface SessionCardProps {
    session: Session;
    activeSession: Session | {};
    setActiveVideoUrl: (url: string) => void;
    activeVideoUrl: string;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, activeSession, setActiveVideoUrl, activeVideoUrl }) => {
    const { mediaAssets = [] } = session.recording_assets || {};

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
                    {mediaAssets?.map((asset, assetIndex) => (
                        <div key={`${asset.id}-${assetIndex}`}>
                            <List.Item
                                onClick={() => setActiveVideoUrl(asset.urlDetails.url)}
                                icon={
                                    <ThemeIcon>
                                        {activeVideoUrl === asset.urlDetails.url ? <IconPlayerPlay /> : <IconPlayerPause />}
                                    </ThemeIcon>
                                }
                                className={classNames(classes.assetContainerPadding, { [classes.activeVideoUrl]: activeVideoUrl === asset.urlDetails.url })}
                            >
                                <Text size='sm' fw={500}>Asset id: {asset.id}</Text>
                                <Text size='sm' fw={500}>Asset type: {asset.type}</Text>
                            </List.Item>
                        </div>
                    ))}
                </List>
                {/* <Badge color="pink">On Sale</Badge> */}
            </Group>

            {/* <Text size="sm" c="dimmed">
                With Fjord Tours you can
            </Text> */}
        </Card>
    );
};
