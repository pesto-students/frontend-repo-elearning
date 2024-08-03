"use client"
import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePathname } from 'next/navigation';
import React from 'react';
import AppLogo from '../AppLogo/AppLogo';
import { FooterMenu } from '../FooterMenu/FooterMenu';
import { HeaderMenu } from '../HeaderMenu/HeaderMenu';

export function AppShellLayout({ children }: { children: React.ReactNode }) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();

    const HeaderMenuWithSideBar = () => {
        return (
            <Group h="100%" px="md">
                <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                <AppLogo />
            </Group>
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
            <AppShell.Header>
                {isDashboard ? <HeaderMenuWithSideBar></HeaderMenuWithSideBar> : <HeaderMenu></HeaderMenu>}
            </AppShell.Header>
            <AppShell.Navbar p="md">
                {Array(15)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} h={28} mt="sm" animate={false} />
                    ))}
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
            <AppShell.Footer>
                <FooterMenu></FooterMenu>
            </AppShell.Footer>
        </AppShell>
    );
}