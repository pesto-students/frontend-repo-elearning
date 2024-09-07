'use client';

import { useFetchData } from '@/app/api/queryApiData';
import ViewDetails from '@/components/ViewDetails/ViewDetails';
import { APIS } from "@/constant";
import { getRandomMantineColor } from '@/constant/utils';
import { Avatar, Group, Skeleton, Text } from '@mantine/core';
import { useParams, useRouter } from "next/navigation";
import TableWithSelection from '../../TableWithSelection/TableWithSelection';

const ViewParentDetails = () => {
    const { parentId } = useParams();
    const router = useRouter();

    const { data, isLoading } = useFetchData(`['FETCH_PARENT','${parentId}']`, {
        url: APIS.FETCH_PARENT,
        method: 'POST',
        payload: { _id: parentId }
    });

    const parent = data?.[0];

    if (isLoading) {
        return <Skeleton height={400} />;
    }

    if (!parent) {
        return <Text>No parent data found.</Text>;
    }

    const details = [
        { label: 'Father Name', value: parent.fatherName },
        { label: 'Mother Name', value: parent.motherName },
        { label: 'Email', value: parent.email },
        { label: 'Phone', value: parent.phone },
        { label: 'Address', value: parent.address },
        { label: 'Pincode', value: parent.pincode },
        { label: 'City', value: parent.city.name },
        { label: 'State', value: parent.state.name },
        { label: 'Country', value: parent.country.name },
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
        { key: 'gender', label: 'Gender' },
        { key: 'dateOfBirth', label: 'Date of Birth' },
    ];

    return (
        <>
            <ViewDetails details={details} />
            {parent.students?.length > 0 && (
                <>
                    <Text size="lg" fw={600} mt="xl" mb="md">
                        Students
                    </Text>
                    <TableWithSelection
                        rows={parent.students}
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

export default ViewParentDetails;