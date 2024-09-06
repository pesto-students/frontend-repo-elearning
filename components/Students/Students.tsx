'use client'
import restClient from '@/app/api/restClient';
import { setAddStudentModalState, setAssignToClassModalState, showConfirmationModal } from '@/app/lib/slice';
import withAuth from '@/app/lib/withAuth';
import { APIS } from '@/constant';
import { getRandomMantineColor } from '@/constant/utils';
import { Avatar, Button, Group, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TableWithSelection from '../TableWithSelection/TableWithSelection';

interface Student {
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

const Students = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const dispatch = useDispatch();
    const router = useRouter()

    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = async () => {
        try {
            const { data } = await restClient.post(APIS.GET_STUDENTS, {});
            if (data?.length) {
                const formattedData: Student[] = data.map(student => ({
                    firstName: student.firstName,
                    lastName: student.lastName,
                    email: student.email,
                    phone: student.phone,
                    address: student.address,
                    pincode: student.pincode,
                    city: student.city?.name || '',
                    state: student.state?.name || '',
                    country: student.country?.name || '',
                    branch: student.branch?.name || '',
                    _id: student._id
                }));
                setStudents(formattedData);
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const updateStudent = async (studentData) => {
        try {
            const { data } = await restClient.post(APIS.UPDATE_STUDENTS, studentData);
            if (data) {
                // Refresh the students list after update
                getStudents();
            }
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    const handleEditStudents = (student: any) => {
        dispatch(setAddStudentModalState({ show: true, studentData: student, isEdit: true, makeRequest: updateStudent }));
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

    const handleDelete = async (studentData: any) => {
        try {
            const { data } = await restClient.delete(`${APIS.DELETE_STUDENTS}?id=${studentData._id}`);
            if (data) {
                // Refresh the students list after update
                getStudents();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleOnDeleteClick = (studentData) => {
        dispatch(
            showConfirmationModal({
                isOpen: true,
                title: `Are you sure?`,
                description: `You will be deleting ${studentData.firstName}`,
                onConfirm: () => handleDelete(studentData),
            })
        );
    };


    const handleViewDetail = (student: Student) => {
        router.push(`/dashboard/students/${student._id}`)
    };
    
    const menuItems = [
        { label: 'Edit', onClick: handleEditStudents },
        { label: 'Delete', onClick: handleOnDeleteClick },
        { label: 'View Details', onClick: handleViewDetail },
        { label: 'Assign to Class', onClick: (student: Student) => {
            dispatch(setAssignToClassModalState({ show: true, assigneeData: { ...student }, editType: "student", callBack: getStudents }))

        } },
    ];

    const handleAddStudent = () => {
        dispatch(setAddStudentModalState({ show: true, studentData: null, isEdit: false, makeRequest: null }));
    }

    return (
        <>
            <Group mb={"md"}>
                <Text fw={500} size="lg">Students</Text>
                <Button leftSection={<IconPlus />} onClick={handleAddStudent}>Add Student</Button>
            </Group>
            <div>
                <TableWithSelection
                    rows={students}
                    columns={columns}
                    menuItems={menuItems}
                    updateItem={updateStudent}
                    rowClick={handleViewDetail}
                />
            </div>
        </>
    );
};

export default withAuth(Students);