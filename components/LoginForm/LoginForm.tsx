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
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SCHEMA_APIS } from '../../constant/index';
import DynamicForm from '../common/DynamicForm/DynamicForm';

const LoginFormModal = (props: PaperProps) => {
    const [type, toggle] = useToggle(['login', 'register']);
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { store } = useAppSelector(state => state)
    const [, { close }] = useDisclosure(false);

    const [schemas, setSchemas] = useState({ organization: [] })

    const [userData, setUserData] = useLocalStorage({ key: 'accessToken', defaultValue: null });

    useEffect(() => {
        getOrganizationSchema()
    }, []);

    const getOrganizationSchema = async () => {
        const { data } = await restClient.get(SCHEMA_APIS.ORGANIZATION)
        if (data) {
            setSchemas(prevState => ({ ...prevState, organization: data }))
        }
    }

    const form = useForm({
        initialValues: type === 'register' ? schemas.organization : {
            email: '',
            name: '',
            password: '',
            terms: true,
        },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 2 ? 'Password should include at least 6 characters' : null),
        },
    });

    const handleLogin = async () => {
        const { email, password } = form.values;
        const { data } = await restClient.post(APIS.USER_LOGIN, { username: email, password });
        if (data.accessToken) {
            setUserData(data.accessToken);
        } else {
            console.log("Login res: ", data);
        }

    }

    return (
        <Modal opened={Boolean(store.loginModal)} onClose={() => { dispatch(setLoginModal(false)); close() }} title={type === "login" ? "Sign In" : "Sign up"} size={'l8g'} >
            <Paper radius="md" p="xl" withBorder {...props}>
                <Text size="lg" fw={500}>
                    Welcome to eLearning, {type} with
                </Text>

                {/* <Group grow mb="md" mt="md"> */}
                {/* <GoogleButton radius="xl">Google</GoogleButton> */}
                {/* <Button leftSection={<IconBrandGoogle></IconBrandGoogle>} radius={"xl"} variant='outline'>
                        Google
                    </Button>
                    <Button leftSection={<IconBrandTwitter ></IconBrandTwitter>} radius={"xl"}>
                        Twitter
                    </Button>
                </Group>

                <Divider label="Or continue with email" labelPosition="center" my="lg" /> */}


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
                                            key={form.key('terms')}
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
                        <form onSubmit={form.onSubmit(() => { dispatch(setLoginModal(false)); router.push('/dashboard') })}>
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
                                <Button type="submit" radius="xl" onClick={handleLogin}>
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