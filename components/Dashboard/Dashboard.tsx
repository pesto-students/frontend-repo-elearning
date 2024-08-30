"use client"
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { Group, } from '@mantine/core';
import { useRouter } from 'next/navigation';
import AddClassForm from '../AddClassForm/AddClassForm';
import AddStudentForm from '../AddStudentForm/AddStudentForm';
import AddTeacherForm from '../AddTeacherForm/AddTeacherForm';
import AppLoader from '../AppLoader/AppLoader';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
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
            {addTeacherModalState.show ? <AddTeacherForm></AddTeacherForm> : null}
            {addStudentModalState.show ? <AddStudentForm></AddStudentForm> : null}
            {addClassModalState.show ? <AddClassForm></AddClassForm> : null}
            {confirmationModal.isOpen ? <ConfirmationModal></ConfirmationModal> : null}
            <AppLoader></AppLoader>
        </div>
    );
};

export default Dashboard;