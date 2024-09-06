'use client'
import restClient from '@/app/api/restClient';
import { useAppSelector } from '@/app/lib/hooks';
import { setAddTeacherModalState, setAssignToClassModalState } from '@/app/lib/slice';
import withAuth from '@/app/lib/withAuth';
import { APIS } from '@/constant';
import { getRandomMantineColor } from '@/constant/utils';
import { Avatar, Button, Group, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useConfirmation } from '../ConfirmationModal/ConfirmationModal';
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

    const store = useAppSelector(state => state.store)

    useEffect(() => {
        getTeachers();
    }, [])

    useEffect(() => {
        if ('callbackFunctionName' in store.addTeacherModalState) {
            const callbacks: { [key: string]: () => Promise<void> } = {
                getTeachers: getTeachers
            };
            const callbackName = store.addTeacherModalState.callbackFunctionName as keyof typeof callbacks;
            if (callbackName in callbacks) {
                callbacks[callbackName]();
                dispatch(setAddTeacherModalState({ callbackFunctionName: null }))
            }
        }
    }, [store.addTeacherModalState]);

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
        dispatch(setAddTeacherModalState({ show: true, teacherData: teacher, callback: getTeachers }));
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

    const confirmation = useConfirmation()

    const menuItems = [
        { label: 'Edit', onClick: handleEditTeacher },
        {
            label: 'Delete', onClick: (teacher: Teacher) => {
                console.log('Delete', teacher)
                confirmation({
                    title: 'Delete a teacher', description: 'Are you sure you want to delete this entry?', onConfirm: async () => {
                        try {
                            const { data } = await restClient.post(APIS.DELETE_TEACHER, { teacherIds: [teacher._id] })
                            if (data) {
                                notifications.show({ message: 'Teacher deleted successfully', color: 'green' })
                                getTeachers()
                            }
                        } catch (error) {
                            console.log(error)
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
                <Button size={"xs"} leftSection={<IconPlus />} onClick={() => dispatch(setAddTeacherModalState({ show: true, teacherData: null, callbackFunctionName: 'getTeachers' }))}>Add Teacher</Button>
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

export default withAuth(Teachers);