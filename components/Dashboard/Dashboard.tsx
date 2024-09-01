"use client"
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { Group, } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { DashboardCards } from '../DashboardCards/DashboardCards';

const Dashboard = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { addTeacherModalState, addStudentModalState, addClassModalState, confirmationModal, scheduleOnlineClassModalState } = useAppSelector(state => state.store);

    return (
        <div>
            <h3>Dashboard</h3>
            <Group>
                <DashboardCards></DashboardCards>
            </Group>
        </div>
    );
};

export default Dashboard;