"use client"
import { useAppSelector } from '@/app/lib/hooks';
import { HMSRoomProvider } from '@100mslive/react-sdk';
import { AppShell, Burger, Flex, Group } from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import AppLogo from '../AppLogo/AppLogo';
import { FooterMenu } from '../FooterMenu/FooterMenu';
import { HeaderMenu } from '../HeaderMenu/HeaderMenu';
import Navbar from '../Navbar/Navbar';

export function AppShellLayout({ children }: { children: React.ReactNode }) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();
    const router = useRouter()
    const store = useAppSelector(state => state.store)
    const [value] = useLocalStorage({ key: 'accessToken' });

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

    const isDashboard = usePathname().includes("/dashboard");

    return (
        <HMSRoomProvider>
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: 'sm',
                    collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
                }}
                padding="md"
            >

                <AppShell.Header bg='#C9CEF5'>
                    {isDashboard ? <HeaderMenuWithSideBar></HeaderMenuWithSideBar> : <HeaderMenu></HeaderMenu>}
                </AppShell.Header>
                <AppShell.Navbar zIndex="0"  p="md">
                    {/* {Array(15)
                        .fill(0)
                        .map((_, index) => (
                            <Skeleton key={index} h={28} mt="sm" animate={false} />
                        ))} */}
                    <Navbar toggleDesktop={toggleDesktop} />
                </AppShell.Navbar>
                <AppShell.Main style={{ paddingLeft: isDashboard ? 24 : 16, paddingBottom: 94 }}>{children}</AppShell.Main>
                <AppShell.Footer >
                    {isDashboard ? null : <FooterMenu></FooterMenu>}
                </AppShell.Footer>
                {/* {store.loginModalState.show && <LoginFormModal></LoginFormModal>}
                {store.scheduleOnlineClassModalState.show ? <ScheduleOnlineClass></ScheduleOnlineClass> : null} */}
            </AppShell>
        </HMSRoomProvider>
    );
}