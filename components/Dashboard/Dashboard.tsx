"use client"
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { Group } from '@mantine/core';
import { useRouter } from 'next/navigation';
import AddClassForm from '../AddClassForm/AddClassForm';
import AddStudentForm from '../AddStudentForm/AddStudentForm';
import AddTeacherForm from '../AddTeacherForm/AddTeacherForm';
import { DashboardCards } from '../DashboardCards/DashboardCards';
const Dashboard = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const store = useAppSelector(state => state);

    return (
        <div>
            <h3>Dashboard</h3>
            <Group>
                <DashboardCards></DashboardCards>
            </Group>
            {store.store.addTeacherModalState.show ? <AddTeacherForm></AddTeacherForm> : null}
            <AddStudentForm></AddStudentForm>
            <AddClassForm></AddClassForm>
        </div>
    );
};

export default Dashboard;