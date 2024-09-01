'use client'
import restClient from "@/app/api/restClient";
import { APIS } from "@/constant";
import { getRandomMantineColor } from "@/constant/utils";
import { Avatar, Badge, Button, Card, Grid, Group, Text, useMatches } from "@mantine/core";
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

    useEffect(() => {
        getClasses()
    }, [])

    const getClasses = async () => {
        const { data } = await restClient.post<ClassObject[]>(APIS.GET_CLASSES, {})
        if (data?.length) {
            setClasses(data)
        }
    }
    const colSpan = useMatches({ sm: 1, md: 1, lg: 2 }) as number

    const handleViewDetails = (classObj: ClassObject) => {
        setSelectedClass(classObj);
    };

    const teacherColumns = [
        {
            key: 'firstName', label: 'Name', render: (data = { firstName: '', lastName: '' }) => {
                const { firstName, lastName } = data
                return <Group gap={"sm"}>
                    <Avatar size={"sm"} color={getRandomMantineColor()}>{firstName.charAt(0) + lastName.charAt(0)}</Avatar>
                    <Text size="sm" fw={500}>{data.firstName + " " + data.lastName}</Text>
                </Group>
            }
        },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
    ];

    const studentColumns = [
        {
            key: 'firstName', label: 'Name', render: (data = { firstName: '', lastName: '' }) => {
                const { firstName, lastName } = data
                return <Group gap={"sm"}>
                    <Avatar size={"sm"} color={getRandomMantineColor()}>{firstName.charAt(0) + lastName.charAt(0)}</Avatar>
                    <Text size="sm" fw={500}>{data.firstName + " " + data.lastName}</Text>
                </Group>
            }
        },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
    ];

    const menuItems = [
        { label: 'Edit', onClick: (item: Teacher | Student) => console.log('Edit', item) },
        { label: 'Delete', onClick: (item: Teacher | Student) => console.log('Delete', item) },
    ];

    return (
        <div>
            <Text size="xl" fw={700} mb="md">Class List</Text>
            <Grid>
                {
                    classes.map((classObj, classObjIndex) => (
                        <Grid.Col span={colSpan} key={classObj._id + "-" + classObjIndex}>
                            <ClassCard
                                data={classObj}
                                handleViewDetails={() => handleViewDetails(classObj)}
                            />
                        </Grid.Col>
                    ))
                }
            </Grid>

            {selectedClass && (
                <>
                    {selectedClass.teachers?.length &&
                        <>
                            <Text size="lg" fw={600} mt="xl" mb="md">
                                {selectedClass.className} - Teachers
                            </Text>
                            <TableWithSelection
                                rows={selectedClass.teachers}
                                columns={teacherColumns}
                                menuItems={menuItems}
                                updateItem={() => { }}
                                autoWidth={true}
                            />
                        </>
                    }

                    {selectedClass.students?.length &&
                        <>
                            <Text size="lg" fw={600} mt="xl" mb="md">
                                {selectedClass.className} - Students
                            </Text>
                            <TableWithSelection
                                rows={selectedClass.students}
                                columns={studentColumns}
                                menuItems={menuItems}
                                updateItem={() => { }}
                                autoWidth={true}
                            />
                        </>
                    }
                </>
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