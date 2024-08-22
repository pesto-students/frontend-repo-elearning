'use client'
import { formatDate } from '@/constant/utils';
import { Badge, Button, Card, Group, Image, Text } from '@mantine/core';

const RecordedLectureCard = (props) => {
    const { data } = props
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                {
                    data.urlDetails?.url ?
                        <video src={data.urlDetails?.url} controls height={"100%"} width={"100%"} autoPlay={false} controlsList="nodownload noremoteplayback" ></video>
                        :
                        <Image
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                            height={160}
                            width={240}
                            alt="Norway"
                        />
                }


            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>
                    {data.id}
                    {data.roomDetails?.name}
                </Text>
                <Badge color="pink">{data?.status}</Badge>
            </Group>

            <Text size="sm" c="dimmed">
                {data.roomDetails?.description}
            </Text>
            <Text size="sm" c="dimmed">
                Recorded on:  {data?.created_at ? formatDate(data.created_at) : null}
            </Text>

            {/* <Button color="blue" fullWidth mt="md" radius="md">
                Play
            </Button> */}
            <Button color="blue" fullWidth mt="md" radius="md">
                View Transcript
            </Button>
        </Card>
    );
};

export default RecordedLectureCard;