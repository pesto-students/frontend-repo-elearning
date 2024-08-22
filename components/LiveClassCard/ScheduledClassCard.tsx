import { useAppSelector } from '@/app/lib/hooks';
import { APIS } from '@/constant';
import { ActionIcon, Badge, Button, Card, Group, Stack, Text } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { formatDate } from "../../constant/utils";
import classes from './ScheduledClassCard.module.css';

const mockdata = {
    image:
        'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    title: 'Verudela Beach',
    country: 'Croatia',
    description:
        'Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.',
    badges: [
        { emoji: '☀️', label: 'Sunny weather' },
        { emoji: '🦓', label: 'Onsite zoo' },
        { emoji: '🌊', label: 'Sea' },
        { emoji: '🌲', label: 'Nature' },
        { emoji: '🤽', label: 'Water sports' },
    ],
};

interface ScheduledClassCardPropsType {
    data: { name: string; id: string, description: string, created_at: Date };
    key: React.Key;
    handleJoinLiveClass: (roomId: string) => void;
    roomsCodeData: any;
    handleDeleteLiveClass: (roomId: string) => void;
    handleEditLiveClass: (data: object) => void;
}

interface LiveClassFormData {
    [id: string]: {
        [key: string]: Date;
    };
}

interface AppState {
    store: {
        liveClassFormData: LiveClassFormData;
    };
}

export function ScheduledClassCard(props: ScheduledClassCardPropsType) {
    const { data, key, handleJoinLiveClass, roomsCodeData, handleDeleteLiveClass, handleEditLiveClass } = props
    const { country, badges } = mockdata;

    const { store } = useAppSelector((state: AppState) => state)

    const getLiveClassFormData = (id = '', key = '') => {
        if (id && key) {
            return store.liveClassFormData?.[id]?.[key]
        }
    }

    return (
        <Card withBorder radius="md" p="md" className={classes.card} key={key}>
            {/* <Card.Section>
                <Image src={image} alt={title} height={180} />
            </Card.Section> */}

            <Card.Section className={classes.section} mt="md">
                <Group justify="apart">
                    <Text fz="lg" fw={500}>
                        {data.name}
                    </Text>
                    <ActionIcon variant='white' size={'xs'} onClick={() => handleEditLiveClass(data)}>
                        <IconPencil></IconPencil>
                    </ActionIcon>
                    <ActionIcon variant='white' size={'xs'} onClick={() => handleDeleteLiveClass(data.id)}>
                        <IconTrash></IconTrash>
                    </ActionIcon>
                    <Badge size="sm" variant="light">
                        {country}
                    </Badge>
                </Group>
                <Text fz="sm" mt="xs">
                    {data.description} {data.id}
                </Text>
            </Card.Section>

            <Card.Section className={classes.section}>
                {/* <Text mt="md" className={classes.label} c="dimmed">
                    Perfect for you, if you enjoy
                </Text>
                <Group gap={7} mt={5}>
                    {features}
                </Group> */}
                <Stack >
                    <Text mt="md" className={classes.label} c="dimmed">
                        Room id: {data.id}
                    </Text>
                    <Text mt="md" className={classes.label} c="dimmed">
                        Created at: {formatDate(data.created_at)}
                    </Text>
                    <Text mt="md" className={classes.label} c="dimmed">
                        Schedule on: {formatDate(getLiveClassFormData(data.id, "dateTime"))}
                    </Text>
                    {roomsCodeData?.[0]?.code ? <Text mt="md" c="dimmed">
                        Link: <Link target='_blank' referrerPolicy='no-referrer' href={APIS.LIVE_CLASS.replace(":roomCode", roomsCodeData?.[0]?.code)}>{roomsCodeData?.[0]?.code ? APIS.LIVE_CLASS.replace(":roomCode", roomsCodeData?.[0]?.code) : ''} </Link>
                    </Text> : null}
                </Stack>
            </Card.Section>

            <Group mt="xs">
                {/* <Button radius="md" style={{ flex: 1 }} onClick={() => createRoomCodeByRoomId(data.id)}>
                    Generate room code
                </Button> */}
                {dayjs(new Date()).isAfter(getLiveClassFormData(data.id, "dateTime")) ? <Button onClick={() => handleJoinLiveClass(data.id)}>
                    Join class
                </Button> : null}
                {/* <ActionIcon variant="default" radius="md" size={36}>
                    <IconHeart className={classes.like} stroke={1.5} />
                </ActionIcon> */}
            </Group>
        </Card >
    );
}