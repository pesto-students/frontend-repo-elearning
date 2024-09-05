"use client"

import { createAppTheme } from '@/theme';
import { ColorSwatch, Group, Select, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

const Settings = () => {
    const [settings, setSettings] = useState(() => ({
        primaryColor: localStorage.getItem('mantine-primary-color') || 'myColor',
        fontColor: localStorage.getItem('mantine-font-color') || 'dark.9',
        fontFamily: localStorage.getItem('mantine-font-family') || 'Roboto, sans-serif',
    }));

    const theme = createAppTheme();
    const colorOptions = Object.keys(theme.colors).map((color) => ({
        value: color,
        label: color.charAt(0).toUpperCase() + color.slice(1),
        color: theme.colors[color][6],
    }));

    const fontColorOptions = [
        { value: 'dark.9', label: 'Dark' },
        { value: 'gray.7', label: 'Gray' },
        { value: 'blue.9', label: 'Blue' },
        { value: 'green.9', label: 'Green' },
    ];

    const fontFamilyOptions = [
        { value: 'Roboto, sans-serif', label: 'Roboto' },
        { value: 'Arial, sans-serif', label: 'Arial' },
        { value: 'Verdana, sans-serif', label: 'Verdana' },
        { value: 'Georgia, serif', label: 'Georgia' },
    ];

    const updateSetting = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        localStorage.setItem(`mantine-${key}`, value);
        window.dispatchEvent(new StorageEvent('storage', {
            key: `mantine-${key}`,
            newValue: value,
        }));
    };

    useEffect(() => {
        // Update localStorage on component mount
        Object.entries(settings).forEach(([key, value]) => {
            localStorage.setItem(`mantine-${key}`, value);
        });
    }, []);

    return (
        <Stack spacing="md">
            <h1>Settings</h1>
            <Select
                label="Primary Color"
                value={settings.primaryColor}
                onChange={(value) => updateSetting('primaryColor', value || 'myColor')}
                data={colorOptions}
                renderOption={({ option, checked }) => (
                    <Group gap="xs">
                        <ColorSwatch color={option.color} size={20} />
                        <Text>{option.label}</Text>
                    </Group>
                )}
            />
            <Select
                label="Font Color"
                value={settings.fontColor}
                onChange={(value) => updateSetting('fontColor', value || 'dark.9')}
                data={fontColorOptions}
            />
            <Select
                label="Font Family"
                value={settings.fontFamily}
                onChange={(value) => updateSetting('fontFamily', value || 'Roboto, sans-serif')}
                data={fontFamilyOptions}
            />
        </Stack>
    );
};

export default Settings;