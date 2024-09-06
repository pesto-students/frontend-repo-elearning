'use client';

import { createAppTheme } from '@/theme';
import { MantineProvider } from '@mantine/core';
import { useEffect, useState } from 'react';

export function DynamicThemeProvider({ children }: { children: React.ReactNode }) {
    const [themeSettings, setThemeSettings] = useState(() => {
        if (typeof window !== 'undefined') {
            return {
                primaryColor: localStorage.getItem('mantine-primary-color') || 'myColor',
                fontColor: localStorage.getItem('mantine-font-color') || 'dark.9',
                fontFamily: localStorage.getItem('mantine-font-family') || 'Roboto, sans-serif',
            };
        }
        return {
            primaryColor: 'myColor',
            fontColor: 'dark.9',
            fontFamily: 'Roboto, sans-serif',
        };
    });

    const [currentTheme, setCurrentTheme] = useState(createAppTheme(
        themeSettings.primaryColor,
        themeSettings.fontColor,
        themeSettings.fontFamily
    ));

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key?.startsWith('mantine-') && event.newValue) {
                const key = event.key.replace('mantine-', '') as keyof typeof themeSettings;
                setThemeSettings(prev => ({
                    ...prev,
                    [key]: event.newValue,
                }));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const newTheme = createAppTheme(
            themeSettings.primaryColor,
            themeSettings.fontColor,
            themeSettings.fontFamily
        );
        setCurrentTheme(newTheme);
        // Apply global styles
        document.documentElement.style.setProperty('--mantine-font-family', newTheme.fontFamily || '');

        // Update this line to directly set the color value
        const [colorName, shade] = themeSettings.fontColor.split('.');
        const colorValue = newTheme.colors?.[colorName as keyof typeof newTheme.colors]?.[Number(shade) || 9];
        if (colorValue) {
            document.documentElement.style.setProperty('--mantine-color-text', colorValue);
        }
    }, [themeSettings]);

    return (
        <MantineProvider theme={currentTheme}>
            {children}
        </MantineProvider>
    );
}
