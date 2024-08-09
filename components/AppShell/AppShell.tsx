"use client"
import { AppShell, Burger, Button, Flex, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import AppLogo from '../AppLogo/AppLogo';
import { FooterMenu } from '../FooterMenu/FooterMenu';
import { HeaderMenu } from '../HeaderMenu/HeaderMenu';
import LoginFormModal from '../LoginForm/LoginForm';
import Navbar from '../Navbar/Navbar2';

export function AppShellLayout({ children }: { children: React.ReactNode }) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();
    const router = useRouter()

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

    const isDashboard = usePathname() === '/dashboard';

    return (
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
            <AppShell.Navbar >
                <Navbar/>
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
            <AppShell.Footer withBorder={false}>
                <FooterMenu></FooterMenu>
            </AppShell.Footer>
            <LoginFormModal></LoginFormModal>
        </AppShell>
    );
}