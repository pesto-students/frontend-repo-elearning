import restClient from '@/app/api/restClient';
import { useAppSelector } from '@/app/lib/hooks';
import { hideLoader, setAddTeacherModalState, showLoader } from '@/app/lib/slice';
import { APIS, SCHEMA_APIS } from '@/constant';
import { flattenObject } from '@/constant/utils';
import { Button, Divider, Group, Modal, Paper, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DynamicForm from '../common/DynamicForm/DynamicForm';

const AddTeacherForm = (props) => {
    const store = useAppSelector(state => state.store)

    const router = useRouter()
    const dispatch = useDispatch()
    const [, { close }] = useDisclosure(false);
    const [teacherSchema, setTeacherSchema] = useState([]);

    useEffect(() => {
        fetchTeacherSchema();
    }, [])

    const fetchTeacherSchema = async () => {
        try {
            dispatch(showLoader())
            const { data } = await restClient.get(SCHEMA_APIS.TEACHER);
            if (data) {
                setTeacherSchema(data)
            }
            dispatch(hideLoader())
        } catch (error) {
            console.error('Failed to fetch teacher schema:', error);
        }
    };

    const handleSubmit = async (values) => {
        const payload = flattenObject(values)

        try {
            const apiUrl = payload._id ? APIS.UPDATE_TEACHER : APIS.CREATE_TEACHER;
            const { data } = await restClient.post(apiUrl, payload);
            if (data) {
                dispatch(setAddTeacherModalState({ show: false }));
                notifications.show({ title: payload._id ? 'Updated teacher' : 'Added teacher', color: 'green' });
                setAddTeacherModalState.callback && setAddTeacherModalState.callback()
            } else {
                notifications.show({ title: `Failed to ${payload._id ? 'update' : 'add'} teacher`, color: 'red' });
            }
        } catch (error) {
            console.error('Error:', error);
            notifications.show({ title: `Failed to ${payload._id ? 'update' : 'add'} teacher`, color: 'red' });
        }
    };

    return (
        <Modal size={"lg"} opened={Boolean(store.addTeacherModalState.show)} onClose={() => { dispatch(setAddTeacherModalState({ show: false, teacherData: null })); close() }} title={store.addTeacherModalState.teacherData ? "Edit teacher" : "Add teacher"} >
            <Paper radius="md" p="xl" withBorder >
                <Text size="lg" fw={500}>
                    {store.addTeacherModalState.teacherData ? "Edit Teacher" : "Add Teacher"}
                </Text>
                <Divider label="" labelPosition="center" my="lg" />

                <Stack>
                    <>
                        <DynamicForm
                            formData={teacherSchema}
                            formSubmit={handleSubmit}
                            formSubmitButtonJsx={
                                <>
                                    <Group justify="space-between" mt="md">
                                        <Button type="submit" radius="xl">
                                            {store.addTeacherModalState.teacherData ? "Edit Teacher" : "Add Teacher"}
                                        </Button>
                                    </Group>
                                </>
                            }
                            formValues={store.addTeacherModalState.teacherData}
                            isEdit={Boolean(store.addTeacherModalState.teacherData)}
                        />
                    </>
                </Stack>
            </Paper>
        </Modal >
    );
};

export default AddTeacherForm;