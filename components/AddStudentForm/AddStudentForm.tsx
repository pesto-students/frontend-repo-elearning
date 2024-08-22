import { useAppSelector } from '@/app/lib/hooks';
import { setAddStudentModalState } from '@/app/lib/slice';
import { Autocomplete, Button, Divider, Group, Modal, Paper, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const AddStudentForm = (props) => {
    const form = useForm({
        initialValues: {}
    })
    const router = useRouter()
    const dispatch = useDispatch()
    const { store } = useAppSelector(state => state)
    const [, { close }] = useDisclosure(false);

    return (
        <Modal opened={Boolean(store.addStudentModalState.show)} onClose={() => { dispatch(setAddStudentModalState({ show: false })); close() }} title={"Add student"} >
            <Paper radius="md" p="xl" withBorder {...props}>
                <Text size="lg" fw={500}>
                    Welcome to eLearning
                </Text>
                <Divider label="" labelPosition="center" my="lg" />

                <Stack>
                    {/* {type === 'register' ? (
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
                ) : */}
                    <form onSubmit={form.onSubmit(() => { dispatch(setAddStudentModalState({ show: false })); router.push('/dashboard/teachers') })}>
                        <TextInput
                            required
                            label="Name"
                            // placeholder="hello@mantine.dev"
                            value={form.values.name}
                            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid name'}
                            radius="md"
                        />

                        <Autocomplete
                            required
                            label="Select class"
                            data={['React', 'Angular', 'Vue', 'Svelte']}
                            {...form.getInputProps('subject')}
                        />
                        <Group justify="space-between" mt="xl">
                            <Button type="submit" radius="xl">
                                {upperFirst('Add')}
                            </Button>
                        </Group>
                    </form>
                </Stack>
            </Paper>
        </Modal >
    );
};

export default AddStudentForm;