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

const Students = () => {
    const [students, setStudents] = useState<Teacher[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = async () => {
        try {
            const { data } = await restClient.post(APIS.GET_STUDENTS, {});
            if (data?.length) {
                const formattedData: Teacher[] = data.map(student => ({
                    firstName: student.firstName,
                    lastName: student.lastName,
                    email: student.email,
                    phone: student.phone,
                    address: student.address,
                    pincode: student.pincode,
                    city: student.city?.name || '',
                    state: student.state?.name || '',
                    country: student.country?.name || '',
                    branch: student.branch?.name || ''
                }));
                setStudents(formattedData);
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const updateTeacher = async (teacherData) => {
        try {
            const { data } = await restClient.post(APIS.UPDATE_TEACHER, teacherData);
            if (data) {
                // Refresh the students list after update
                getStudents();
            }
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    const handleEditTeacher = (student) => {
        dispatch(setAddTeacherModalState({ show: true, teacherData: student }));
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
        { label: 'Delete', onClick: (student) => console.log('Delete', student) },
        { label: 'View Details', onClick: (student) => console.log('View Details', student) },
        { label: 'Assign to Class', onClick: (student) => console.log('Assign to Class', student) },
    ];

    return (
        <div>
            <TableWithSelection
                rows={students}
                columns={columns}
                menuItems={menuItems}
                updateItem={updateTeacher}
            />
        </div>
    );
};

export default Students;