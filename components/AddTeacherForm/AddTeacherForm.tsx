import restClient from '@/app/api/restClient';
import { useAppSelector } from '@/app/lib/hooks';
import { hideLoader, setAddTeacherModalState, showLoader } from '@/app/lib/slice';
import { APIS, SCHEMA_APIS } from '@/constant';
import { Button, Divider, Group, Modal, Paper, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import isObject from "lodash/isObject";
import mapValues from "lodash/mapValues";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DynamicForm from '../common/DynamicForm/DynamicForm';

const AddTeacherForm = (props) => {
    const form = useForm({
        initialValues: {}
    })
    const router = useRouter()
    const dispatch = useDispatch()
    const store = useAppSelector(state => state.store)
    const [, { close }] = useDisclosure(false);
    const [teacherSchema, setTeacherSchema] = useState([]);

    useEffect(() => {

        if (store.addTeacherModalState.teacherData) {
            form.setValues(store.addTeacherModalState.teacherData);
        }
    }, [store.addTeacherModalState.teacherData]);

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
        const payload = mapValues(values, (value) => {
            if (isObject(value) && value.id) {
                return value.id;
            }
            return value;
        });

        try {
            const apiUrl = payload._id ? APIS.UPDATE_TEACHER : APIS.CREATE_TEACHER;
            const { data } = await restClient.post(apiUrl, payload);
            if (data) {
                dispatch(setAddTeacherModalState({ show: false }));
                notifications.show({ title: payload._id ? 'Updated teacher' : 'Added teacher', color: 'green' });
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
                                            {store.addTeacherModalState.teacherData ? "Update Teacher" : "Add Teacher"}
                                        </Button>
                                    </Group>
                                </>
                            }
                        />
                    </>
                </Stack>
            </Paper>
        </Modal >
    );
};

export default AddTeacherForm;