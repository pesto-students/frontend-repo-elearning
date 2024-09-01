'use client'
import { useFetchData } from '@/app/api/queryApiData';
import { useAppSelector } from '@/app/lib/hooks';
import { APIS } from '@/constant';
import { getRandomMantineColor } from '@/constant/utils';
import { Avatar, Grid, Group, Paper, Skeleton, Stack, Text } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import TableWithSelection from '../../TableWithSelection/TableWithSelection';

const TeacherDetails = () => {
    const { teacherId } = useParams();
    const store = useAppSelector(state => state.store);
    const router = useRouter();

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

    const classColumns = [
        { key: 'className', label: 'Class Name' },
    ];

    const studentColumns = [
        {
            key: 'firstName', label: 'Name', render: (data = { firstName: '', lastName: '' }) => {
                const { firstName, lastName } = data;
                return (
                    <Group gap={"sm"}>
                        <Avatar size={"sm"} color={getRandomMantineColor()}>{firstName.charAt(0) + lastName.charAt(0)}</Avatar>
                        <Text size="sm" fw={500}>{data.firstName + " " + data.lastName}</Text>
                    </Group>
                );
            }
        },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
    ];

    return (
        <>
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
            {teacher.classes?.length > 0 && (
                <>
                    <Text size="lg" fw={600} mt="xl" mb="md">
                        Classes
                    </Text>
                    <TableWithSelection
                        rows={teacher.classes}
                        columns={classColumns}
                        autoWidth={true}
                        rowClick={(classObj) => { router.push('/dashboard/classes/' + classObj._id) }}
                        noCheckbox={true}
                    />
                </>
            )}

            {teacher.students?.length > 0 && (
                <>
                    <Text size="lg" fw={600} mt="xl" mb="md">
                        Students
                    </Text>
                    <TableWithSelection
                        rows={teacher.students}
                        columns={studentColumns}
                        autoWidth={true}
                        rowClick={(student) => { router.push('/dashboard/students/' + student._id) }}
                        noCheckbox={true}
                    />
                </>
            )}
        </>
    );
};

export default TeacherDetails;