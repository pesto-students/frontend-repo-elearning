'use client'
import restClient from '@/app/api/restClient';
import { setAddTeacherModalState } from '@/app/lib/slice';
import { APIS } from '@/constant';
import { getRandomMantineColor } from '@/constant/utils';
import { Avatar, Group, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
}

const Teachers = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getTeachers();
    }, []);

    const getTeachers = async () => {
        try {
            const { data } = await restClient.post(APIS.GET_TEACHERS, {});
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
                    branch: teacher.branch?.name || ''
                }));
                setTeachers(formattedData);
            }
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    const updateTeacher = async (teacherData) => {
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

    const handleEditTeacher = (teacher) => {
        dispatch(setAddTeacherModalState({ show: true, teacherData: teacher }));
    };

    const columns = [
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
        { key: 'address', label: 'Address' },
        { key: 'pincode', label: 'Pincode' },
        { key: 'city', label: 'City' },
        { key: 'state', label: 'State' },
        { key: 'country', label: 'Country' },
        { key: 'branch', label: 'Branch' }
    ];

    const menuItems = [
        { label: 'Edit', onClick: handleEditTeacher },
        { label: 'Delete', onClick: (teacher) => console.log('Delete', teacher) },
        { label: 'View Details', onClick: (teacher) => console.log('View Details', teacher) },
        { label: 'Assign to Class', onClick: (teacher) => console.log('Assign to Class', teacher) },
    ];

    return (
        <div>
            <TableWithSelection
                rows={teachers}
                columns={columns}
                menuItems={menuItems}
                updateItem={updateTeacher}
            />
        </div>
    );
};

export default Teachers;