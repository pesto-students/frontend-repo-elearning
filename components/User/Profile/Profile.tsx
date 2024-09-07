"use client"

import restClient from "@/app/api/restClient";
import { useAppSelector } from "@/app/lib/hooks";
import { APIS } from "@/constant";
import { Avatar, Container, Group, List, Paper, Switch, Text } from "@mantine/core";
import { useEffect, useState } from "react";

const Profile = () => {
    const { userData } = useAppSelector(state => state.store);
    const [modules, setModules] = useState<any>([])

    useEffect(() => {
        const getModules = async () => {
            const { data } = await restClient.post(APIS.MODULE_MANAGEMENT_MODULES, {})
            if (data.modules) {
                setModules(data.modules)
            }
        }
        getModules()
    }, [])

    return (
        <Container size="lg" py="xl">
            <Paper shadow="sm" p="md" mb="xl">
                <Group>
                    <Avatar
                        size="xl"
                        src={userData.profilePicture}
                        color="blue"
                    >
                        {userData?.username?.[0]?.toUpperCase()}
                    </Avatar>
                    <div>
                        <Text size="xl" weight={700}>{userData.username}</Text>
                        <Text size="sm" color="dimmed">{userData.email}</Text>
                        <Text size="xs" color="dimmed">ID: {userData.userId}</Text>
                    </div>
                </Group>
            </Paper>

            <Text size="lg" fw={700} mb="md">Modules</Text>
            <List spacing="md" size="sm" center>
                {modules.map((module: { id: string; moduleName: string; isSubscribed: boolean }) => (
                    <List.Item
                        key={module.id}
                        icon={
                            <Switch
                                checked={module.isSubscribed}
                                readOnly
                                color={module.isSubscribed ? "blue" : "gray"}
                                size="md"
                            />
                        }
                    >
                        <div>
                            <Text fw={500}>{module.moduleName}</Text>
                            <Text size="xs" c="dimmed">
                                {module.isSubscribed ? 'Subscribed' : 'Not Subscribed'}
                            </Text>
                        </div>
                    </List.Item>
                ))}
            </List>
        </Container>
    );

};

export default Profile;