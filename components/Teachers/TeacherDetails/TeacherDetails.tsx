'use client'
import { useFetchData } from '@/app/api/queryApiData';
import { useAppSelector } from '@/app/lib/hooks';
import { APIS } from '@/constant';
import { Grid, Paper, Skeleton, Stack, Text } from '@mantine/core';
import { useParams } from 'next/navigation';

const TeacherDetails = () => {
    const { teacherId } = useParams();
    const store = useAppSelector(state => state.store)

    const { data, isLoading } = useFetchData(`['FETCH_TEACHERS','${teacherId}']`, {
        url: APIS.FETCH_TEACHERS,
        method: 'POST',
        payload: { _id: teacherId }
    });

    const teacher = data?.[0];

    if (isLoading) {
        return <Skeleton height={400} />;
    }

    if (!teacher) {
        return <Text>No teacher data found.</Text>;
    }

    const details = [
        { label: 'Name', value: `${teacher.firstName} ${teacher.lastName}` },
        { label: 'Email', value: teacher.email },
        { label: 'Phone', value: teacher.phone },
        { label: 'Address', value: teacher.address },
        { label: 'Pincode', value: teacher.pincode },
        { label: 'City', value: teacher.city.name },
        { label: 'State', value: teacher.state.name },
        { label: 'Country', value: teacher.country.name },
    ];

    return (
        // <Card shadow="sm" padding="lg" radius="md" withBorder>
        //     <Title order={2} mb="xl">Teacher Details</Title>
        <Paper p="md" withBorder>
            <Grid gutter="md">
                {details.map((detail, index) => (
                    <Grid.Col key={index} span={6}>
                        <Stack spacing="xs">
                            <Text fw={700} size="sm" c="dimmed">{detail.label}</Text>
                            <Text>{detail.value}</Text>
                        </Stack>
                    </Grid.Col>
                ))}
            </Grid>
        </Paper>
        // </Card>
    );
};

export default TeacherDetails;