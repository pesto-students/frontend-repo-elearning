"use client"
import { useAppSelector } from '@/app/lib/hooks';
import { HMSRoomProvider } from '@100mslive/react-sdk';
import { AppShell, Burger, Flex, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import AddClassForm from '../AddClassForm/AddClassForm';
import AddStudentForm from '../AddStudentForm/AddStudentForm';
import AddTeacherForm from '../AddTeacherForm/AddTeacherForm';
import AppLogo from '../AppLogo/AppLogo';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { FooterMenu } from '../FooterMenu/FooterMenu';
import { HeaderMenu } from '../HeaderMenu/HeaderMenu';
import { LandingPage } from '../LandingPage/LandingPage';
import LoginFormModal from '../LoginForm/LoginForm';
import Navbar from '../Navbar/Navbar';
import ScheduleOnlineClass from '../ScheduleOnlineClass/ScheduleOnlineClassModal';

export function AppShellLayout({ children }: { children: React.ReactNode }) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, setDesktopOpened] = useState(true);
    const router = useRouter()
    const pathname = usePathname()
    const store = useAppSelector(state => state.store)

    const isDashboard = pathname.includes("/dashboard");

    React.useEffect(() => {
        setDesktopOpened(false);
    }, [pathname]);

    const toggleDesktop = () => {
        setDesktopOpened(!desktopOpened);
    };

    const HeaderMenuWithSideBar = () => {
        return (
            <Flex justify="space-between">
                <Group h="100%" px="md">
                    <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                    <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                    <AppLogo />
                </Group>
                <Group px="md">
                    D.A.V School
                </Group>
            </Flex>
        )
    }

    return (
        <HMSRoomProvider>
            {isDashboard ? <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 235,
                    breakpoint: 'sm',
                    collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
                }}
                padding="md"
            >
                <AppShell.Header bg='#C9CEF5'>
                    {isDashboard ? <HeaderMenuWithSideBar /> : <HeaderMenu />}
                </AppShell.Header>
                {isDashboard ?
                    <AppShell.Navbar >
                        <Navbar toggleDesktop={toggleDesktop} />
                    </AppShell.Navbar> : null
                }
                <AppShell.Main
                    style={{
                        paddingLeft: isDashboard && desktopOpened ? 235 : 24,
                        paddingBottom: 94
                    }}
                >
                    {children}
                </AppShell.Main>
                <AppShell.Footer >
                    {isDashboard ? null : <FooterMenu></FooterMenu>}
                </AppShell.Footer>
                {store.loginModalState.show && <LoginFormModal></LoginFormModal>}
                {store.scheduleOnlineClassModalState.show ? <ScheduleOnlineClass></ScheduleOnlineClass> : null}
                {store.addTeacherModalState.show ? <AddTeacherForm></AddTeacherForm> : null}
                {store.addStudentModalState.show ? <AddStudentForm></AddStudentForm> : null}
                {store.addClassModalState.show ? <AddClassForm></AddClassForm> : null}
                {store.confirmationModal.isOpen ? <ConfirmationModal></ConfirmationModal> : null}
            </AppShell> : <LandingPage></LandingPage>}
        </HMSRoomProvider>
    );
}