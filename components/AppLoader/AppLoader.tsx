import { useAppSelector } from '@/app/lib/hooks';
import { Center, Loader } from '@mantine/core';

function AppLoader() {
    const { isLoading } = useAppSelector(state => state.store)
    return (
        isLoading ?
            <Center style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 1000 }}>
                <Loader size="lg" type='dots' />
            </Center>
            : null
    )
}

export default AppLoader