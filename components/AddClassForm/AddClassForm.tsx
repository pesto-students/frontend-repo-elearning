import restClient from '@/app/api/restClient';
import { useAppSelector } from '@/app/lib/hooks';
import { setAddClassModalState } from '@/app/lib/slice';
import { APIS } from '@/constant';
import { Button, Divider, Group, Modal, Paper, ScrollArea, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const AddClassForm = (props) => {
    const form = useForm({
        initialValues: { className: '' }
    })
    const router = useRouter()
    const dispatch = useDispatch()
    const store = useAppSelector(state => state.store)
    const [, { close }] = useDisclosure(false);

    return (
        <Modal opened={Boolean(store.addClassModalState.show)} onClose={() => { dispatch(setAddClassModalState({ show: false })); close() }} title={"Add class"} >
            <Paper radius="md" p="xl" withBorder {...props}>
                <Text size="lg" fw={500}>
                    Welcome to eLearning
                </Text>
                <Divider label="" labelPosition="center" my="lg" />
                <ScrollArea style={{ height: "20vh", paddingRight: '1rem' }} offsetScrollbars>
                    <Stack>
                        <form onSubmit={form.onSubmit(async (values) => {
                            const { className } = values
                            try {
                                const { data } = await restClient.post(APIS.CREATE_CLASS, { className })
                                if (data) {
                                    dispatch(setAddClassModalState({ show: false }));
                                    notifications.show({ title: 'Created class', color: 'green' })
                                } else {
                                    notifications.show({ title: 'Failed to create class', color: 'red' })
                                }
                            } catch (error) {
                                console.log(error)
                                notifications.show({ title: 'Failed to create class', color: 'red' })
                            }
                        })}>
                            <TextInput
                                required
                                label="Class Name"
                                radius="md"
                                {...form.getInputProps('className')}
                            />
                            <Group justify="space-between" mt="xl">
                                <Button type="submit" radius="xl">
                                    {upperFirst('Add')}
                                </Button>
                            </Group>
                        </form>
                    </Stack>
                </ScrollArea>
            </Paper>
        </Modal >
    );
};

export default AddClassForm;