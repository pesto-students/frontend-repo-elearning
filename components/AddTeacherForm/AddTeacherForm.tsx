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
    const { store } = useAppSelector(state => state)
    const [, { close }] = useDisclosure(false);
    const [teacherSchema, setTeacherSchema] = useState([]);

    useEffect(() => {
        fetchTeacherSchema();
    }, []);

    const fetchTeacherSchema = async () => {
        try {
            dispatch(showLoader())
            const { data } = await restClient.get(SCHEMA_APIS.TEACHER);
            setTeacherSchema(data);
            dispatch(hideLoader())
        } catch (error) {
            console.error('Failed to fetch teacher schema:', error);
        }
    };

    return (
        <Modal size={"lg"} opened={Boolean(store.addTeacherModalState.show)} onClose={() => { dispatch(setAddTeacherModalState({ show: false })); close() }} title={"Add teacher"} >
            <Paper radius="md" p="xl" withBorder {...props}>
                <Text size="lg" fw={500}>
                    Add Teacher
                </Text>
                <Divider label="" labelPosition="center" my="lg" />

                <Stack>
                    <>
                        <DynamicForm
                            formData={teacherSchema}
                            formSubmit={async (values = {}) => {
                                console.log(values);
                                const payload = mapValues(values, (value) => {
                                    // Check if the value is an object and has an 'id' property
                                    if (isObject(value) && value.id) {
                                        return value.id; // Return the 'id' if it exists
                                    }
                                    return value; // Otherwise, return the value as is
                                });
                                try {
                                    const { data } = await restClient.post(APIS.CREATE_TEACHER, payload)
                                    if (data) {
                                        dispatch(setAddTeacherModalState({ show: false }))
                                        notifications.show({ title: 'Added teacher' })
                                    }
                                } catch (error) {
                                    console.log('error')
                                    notifications.show({ title: 'Failed to add teacher', color: 'red' })
                                }

                            }}

                            formSubmitButtonJsx={
                                <>
                                    <Group justify="space-between" mt="md">
                                        <Button type="submit" radius="xl">
                                            Add Teacher
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