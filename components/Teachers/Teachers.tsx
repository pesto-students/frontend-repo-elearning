'use client'
import restClient from '@/app/api/restClient';
import { setAddTeacherModalState, setAssignToClassModalState } from '@/app/lib/slice';
import { APIS } from '@/constant';
import { getRandomMantineColor } from '@/constant/utils';
import { Avatar, Button, Group, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showConfirmation } from '../ConfirmationModal/ConfirmationModal';
import TableWithSelection from '../TableWithSelection/TableWithSelection';

interface Teacher {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    pincode: string;
    city: string;
    state: string;
    country: string;
    branch: string;
    _id: string;
}

interface TeacherResponse {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    pincode: string;
    city?: { name: string };
    state?: { name: string };
    country?: { name: string };
    branch?: { name: string };
    _id: string;
}

const Teachers = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const dispatch = useDispatch();
    const router = useRouter()

    useEffect(() => {
        getTeachers();
    }, []);

    const getTeachers = async () => {
        try {
            const { data } = await restClient.post<TeacherResponse[]>(APIS.FETCH_TEACHERS, {});
            if (data?.length) {
                const formattedData: Teacher[] = data.map(teacher => ({
                    firstName: teacher.firstName,
                    lastName: teacher.lastName,
                    email: teacher.email,
                    phone: teacher.phone,
                    address: teacher.address,
                    pincode: teacher.pincode,
                    city: teacher.city?.name || '',
                    state: teacher.state?.name || '',
                    country: teacher.country?.name || '',
                    branch: teacher.branch?.name || '',
                    _id: teacher._id,
                    classes: teacher.classes || []
                }));
                setTeachers(formattedData);
            }
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    const updateTeacher = async (teacherData: Teacher) => {
        try {
            const { data } = await restClient.post(APIS.UPDATE_TEACHER, teacherData);
            if (data) {
                // Refresh the teachers list after update
                getTeachers();
            }
        } catch (error) {
            console.error('Error updating teacher:', error);
        }
    };

    const handleEditTeacher = (teacher: Teacher) => {
        dispatch(setAddTeacherModalState({ show: true, teacherData: teacher }));
    };

    const handleRowClick = (teacher: Teacher) => {
        console.log('Row clicked:', teacher);
        router.push(`/dashboard/teachers/${teacher._id}`)
    };

    const columns = [
        {
            key: 'firstName', label: 'Name', render: (data: Teacher) => {
                const { firstName, lastName } = data
                return <Group gap={"sm"}>
                    <Avatar size={"sm"} color={getRandomMantineColor()}>{firstName.charAt(0) + lastName.charAt(0)}</Avatar>
                    <Text size="sm" fw={500}>{data.firstName + " " + data.lastName}</Text>
                </Group>
            }
        },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'address', label: 'Address' },
        { key: 'pincode', label: 'Pincode' },
        { key: 'city', label: 'City' },
        { key: 'state', label: 'State' },
        { key: 'country', label: 'Country' },
        { key: 'branch', label: 'Branch' }
    ];

    const menuItems = [
        { label: 'Edit', onClick: handleEditTeacher },
        {
            label: 'Delete', onClick: (teacher: Teacher) => {
                console.log('Delete', teacher)
                showConfirmation({
                    title: 'Delete a teacher', description: 'Are you sure you want to delete this entry?', onConfirm: async () => {
                        const { data } = await restClient.post(APIS.DELETE_TEACHER, { teacherIds: [teacher._id] })
                        if (data) {
                            notifications.show({ message: 'Teacher deleted successfully', color: 'green' })
                            getTeachers()
                        }
                    }
                })
            }
        },
        {
            label: 'Assign to Class', onClick: async (teacher: Teacher) => {
                dispatch(setAssignToClassModalState({ show: true, assigneeData: { ...teacher }, editType: "teacher", callBack: getTeachers }))
            }
        },
    ];

    return (
        <>
            <Group>
                <Text size="lg" fw={500}> Teachers</Text>
                <Button size={"xs"} leftSection={<IconPlus />} onClick={() => dispatch(setAddTeacherModalState({ show: true, teacherData: null }))}>Add Teacher</Button>
            </Group>

            <Group mt={"md"}>
                <TableWithSelection
                    rows={teachers}
                    columns={columns}
                    menuItems={menuItems}
                    updateItem={updateTeacher}
                    rowClick={handleRowClick}
                />
            </Group>
        </>
    );
};

export default Teachers;