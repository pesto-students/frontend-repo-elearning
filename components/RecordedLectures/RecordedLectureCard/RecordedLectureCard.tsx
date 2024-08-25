'use client'
import { Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RecordedLectureCard = (props) => {
    const { data } = props
    const router = useRouter()
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
                    {/* {data.id} */}
                    {data?.name}
                </Text>
                <Badge color="pink">{data?.status}</Badge>
            </Group>

            <Text size="sm" c="dimmed">
                {data?.description}
            </Text>
            <Text size="sm" c="dimmed">
                {/* Recorded on:  {data?.created_at ? formatDate(data.created_at) : null} */}
                {data.assets?.map(asset => (
                    <div className='assets' style={{
                        border: '1px solid red',
                        padding: '1rem 0px',
                        margin: '1rem 0px',
                    }}>
                        <Text style={{
                            wordBreak: "break-word",
                            fontWeight: "bold",

                        }}>
                            {/* {JSON.stringify(asset, null, 2)} */}
                            {/* <Text>{} : {asset.urlDetails?.url}</Text> */}
                            <Link href={asset.urlDetails?.url} target='_blank'>{asset.type}</Link>
                        </Text>
                    </div>
                ))}
            </Text>

            {/* <Button color="blue" fullWidth mt="md" radius="md">
                Play
            </Button> */}
            <Button color="blue" fullWidth mt="md" radius="md" onClick={() => router.push('/dashboard/recorded-lectures/' + data.id)}>
                View Recording
            </Button>
        </Card>
    );
};

export default RecordedLectureCard;