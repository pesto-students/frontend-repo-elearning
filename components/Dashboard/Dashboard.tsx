"use client"
import { useAppDispatch } from '@/app/lib/hooks';
import { setScheduleLiveClassModal } from '@/app/lib/slice';
import { Button, Group } from '@mantine/core';
import { useRouter } from 'next/navigation';
const Dashboard = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    return (
        <div>
            <h3>Dashboard</h3>
            <Group>
                <Button onClick={() => dispatch(setScheduleLiveClassModal(true))} >Schedule live class</Button>
                <Button onClick={() => router.push('/dashboard/live-classes')} >Live Classes</Button>
                {/* <Button onClick={() => router.push('/dashboard/join-class/')} >Join class</Button> */}
            </Group>
        </div>
    );
};

export default Dashboard;