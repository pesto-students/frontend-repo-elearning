"use client"
import restClient from '@/app/api/restClient';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { setLoginModal } from '@/app/lib/slice';
import { APIS } from '@/constant';
import {
    Anchor,
    Button,
    Checkbox,
    Group,
    Modal,
    Paper,
    PaperProps,
    PasswordInput,
    Stack,
    Text,
    TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useDisclosure, useLocalStorage, useToggle } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SCHEMA_APIS } from '../../constant/index';
import DynamicForm from '../common/DynamicForm/DynamicForm';

interface FormValues {
    email: string;
    name: string;
    password: string;
    terms: boolean;
}

const LoginFormModal = (props: PaperProps) => {
    const [type, toggle] = useToggle(['login', 'register']);
    const router = useRouter()
    const dispatch = useAppDispatch()
    const store = useAppSelector(state => state.store)
    const [, { close }] = useDisclosure(false);

    const [schemas, setSchemas] = useState<{ organization: any[] }>({ organization: [] })

    const [, setAccessToken] = useLocalStorage({ key: 'accessToken', defaultValue: null });

    useEffect(() => {
        getOrganizationSchema()
    }, []);

    const getOrganizationSchema = async () => {
        const { data } = await restClient.get(SCHEMA_APIS.ORGANIZATION)
        if (data) {
            setSchemas(prevState => ({ ...prevState, organization: data }))
        }
    }

    const form = useForm<FormValues>({
        initialValues: type === 'register' ? {
            email: '',
            name: '',
            password: '',
            terms: true,
        } : {
            email: '',
            name: '',
            password: '',
            terms: true,
        },
        validate: {
            email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val: string) => (val.length <= 2 ? 'Password should include at least 6 characters' : null),
        },
    });

    const handleLogin = async (values: { email: string; password: string }) => {
        try {
            const { email, password } = values;
            const { data } = await restClient.post(APIS.USER_LOGIN, { username: email, password });
            if (data.accessToken) {
                document.cookie = `token=${data.accessToken}; path=/; secure; HttpOnly`;
                setAccessToken(data.accessToken);
                dispatch(setLoginModal({ show: false }));
                router.push('/dashboard');
                notifications.show({
                    title: 'Success',
                    message: 'Logged in successfully',
                    color: 'green',
                });
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            console.error("Login error:", error);
            notifications.show({
                title: 'Error',
                message: error instanceof Error ? error.message : 'An unexpected error occurred',
                color: 'red',
            });
        }
    }

    return (
        <Modal opened={Boolean(store.loginModalState.show)} onClose={() => { dispatch(setLoginModal({ show: false })); close() }} title={type === "login" ? "Sign In" : "Sign up"} size={'l8g'} >
            <Paper radius="md" p="xl" withBorder {...props}>
                <Text size="lg" fw={500}>
                    Welcome to eLearning, {type} with
                </Text>

                <Stack>
                    {type === 'register' ? (
                        <>
                            <DynamicForm
                                formData={schemas.organization}
                                formSubmit={async (values = {}) => {
                                    await restClient.post(APIS.CREATE_ORGANIZATION, values)
                                }}
                                formSubmitButtonJsx={
                                    <>
                                        <Checkbox
                                            label="I accept terms and conditions"
                                            {...form.getInputProps('terms')}
                                        />
                                        <Group justify="space-between" mt="md">
                                            <Button type="submit" radius="xl" disabled={!form.values.terms}>
                                                {upperFirst(type)}
                                            </Button>
                                            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                                                Already have an account? Login
                                            </Anchor>
                                        </Group>
                                    </>
                                }
                            />
                        </>
                    ) :
                        <form onSubmit={form.onSubmit((values) => { handleLogin(values) })}>
                            <TextInput
                                required
                                label="Email"
                                placeholder="hello@mantine.dev"
                                value={form.values.email}
                                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                                error={form.errors.email && 'Invalid email'}
                                radius="md"
                            />

                            <PasswordInput
                                required
                                label="Password"
                                placeholder="Your password"
                                value={form.values.password}
                                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                                error={form.errors.password && 'Password should include at least 6 characters'}
                                radius="md"
                            />
                            <Group justify="space-between" mt="xl">
                                <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                                    {type === 'register'
                                        ? 'Already have an account? Login'
                                        : "Don't have an account? Register"}
                                </Anchor>
                                <Button type="submit" radius="xl">
                                    {upperFirst(type)}
                                </Button>
                            </Group>
                        </form>
                    }
                </Stack>
            </Paper>
        </Modal >
    );
}

export default LoginFormModal