'use client'
import restClient from "@/app/api/restClient";
import { APIS } from "@/constant";
import { getRandomMantineColor } from "@/constant/utils";
import { Avatar, Badge, Button, Card, Grid, Group, Paper, Text } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TableWithSelection from '../TableWithSelection/TableWithSelection';

interface Teacher {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

interface Student {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

interface ClassObject {
    _id: string;
    className: string;
    teachers: Teacher[];
    students: Student[];
}

const Classes = () => {
    const [classes, setClasses] = useState<ClassObject[]>([]);
    const [selectedClass, setSelectedClass] = useState<ClassObject | null>(null);
    const router = useRouter();
    const { classId } = useParams();  // Get classId from the URL

    useEffect(() => {
        getClasses();
    }, []);

    useEffect(() => {
        if (classId) {
            const matchedClass = classes.find(c => c._id === classId);
            setSelectedClass(matchedClass || null);  // Automatically select class if classId is present
        }
    }, [classId, classes]);

    const getClasses = async () => {
        const { data } = await restClient.post<ClassObject[]>(APIS.GET_CLASSES, {});
        if (data?.length) {
            setClasses(data);
        }
    };

    const colSpan = 2; // Adjust based on your grid requirements

    const teacherColumns = [
        {
            key: 'firstName', label: 'Name', render: (data = { firstName: '', lastName: '' }) => {
                const { firstName, lastName } = data;
                return <Group gap={"sm"}>
                    <Avatar size={"sm"} color={getRandomMantineColor()}>{firstName.charAt(0) + lastName.charAt(0)}</Avatar>
                    <Text size="sm" fw={500}>{data.firstName + " " + data.lastName}</Text>
                </Group>;
            }
        },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
    ];

    const studentColumns = [
        {
            key: 'firstName', label: 'Name', render: (data = { firstName: '', lastName: '' }) => {
                const { firstName, lastName } = data;
                return <Group gap={"sm"}>
                    <Avatar size={"sm"} color={getRandomMantineColor()}>{firstName.charAt(0) + lastName.charAt(0)}</Avatar>
                    <Text size="sm" fw={500}>{data.firstName + " " + data.lastName}</Text>
                </Group>;
            }
        },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
    ];

    return (
        <div>
            {!classId ? (
                <>
                    <Text size="xl" fw={700} mb="md">Class List</Text>
                    <Grid>
                        {classes.map((classObj, classObjIndex) => (
                            <Grid.Col span={colSpan} key={classObj._id + "-" + classObjIndex}>
                                <ClassCard
                                    data={classObj}
                                    handleViewDetails={() => router.push(`/dashboard/classes/${classObj._id}`)}
                                />
                            </Grid.Col>
                        ))}
                    </Grid>
                </>
            ) : (
                selectedClass && (
                    <>
                        <Paper p="md" withBorder>
                            <Group >
                                {/* <Grid key={selectedClass._id} span={6}> */}
                                {/* <Stack spacing="xs"> */}
                                <Text>Class: </Text>
                                <Text fw={700} size="sm" c="dimmed">{selectedClass.className}</Text>
                                {/* <Text>{detail.value}</Text> */}
                                {/* </Stack> */}
                                {/* </Grid> */}
                            </Group>
                        </Paper>
                        {selectedClass.teachers?.length && (
                            <>
                                <Text size="lg" fw={600} mt="xl" mb="md">
                                    {selectedClass.className} - Teachers
                                </Text>
                                <TableWithSelection
                                    rows={selectedClass.teachers}
                                    columns={teacherColumns}
                                    autoWidth={true}
                                    rowClick={(teacher) => router.push(`/dashboard/teachers/${teacher._id}`)}
                                />
                            </>
                        )}

                        {selectedClass.students?.length && (
                            <>
                                <Text size="lg" fw={600} mt="xl" mb="md">
                                    {selectedClass.className} - Students
                                </Text>
                                <TableWithSelection
                                    rows={selectedClass.students}
                                    columns={studentColumns}
                                    autoWidth={true}
                                    rowClick={(student) => router.push(`/dashboard/students/${student._id}`)}
                                />
                            </>
                        )}
                    </>
                )
            )}
        </div>
    );
};

export default Classes;

interface ClassCardProps {
    data: ClassObject;
    handleViewDetails: (data: ClassObject) => void;
}

function ClassCard({ data, handleViewDetails }: ClassCardProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw={500}>{data.className}</Text>
            <Badge color="blue" variant="light">
                {data.teachers.length} Teachers
            </Badge>
            <Badge color="green" variant="light">
                {data.students.length} Students
            </Badge>
            <Button variant="outline" fullWidth mt="md" radius="md" onClick={() => handleViewDetails(data)}>
                View Details
            </Button>
        </Card>
    );
}
