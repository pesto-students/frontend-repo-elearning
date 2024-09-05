import restClient from '@/app/api/restClient';
import { useAppSelector } from '@/app/lib/hooks';
import { setAddStudentModalState } from '@/app/lib/slice';
import { APIS, SCHEMA_APIS } from '@/constant';
import { Button, Divider, Group, Modal, Paper, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { isObject, mapValues } from 'lodash';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DynamicForm from '../common/DynamicForm/DynamicForm';

const AddStudentForm = (props) => {
    const form = useForm({
        initialValues: {}
    })
    const router = useRouter()
    const dispatch = useDispatch()
    const store = useAppSelector(state => state.store)
    const [, { close }] = useDisclosure(false);
    const [studentSchema, setStudentSchema] = useState([]);
    const {addStudentModalState} = store;
    const { show, studentData, isEdit, makeRequest } = addStudentModalState
    useEffect(() => {
        fetchStudentSchema();
    }, []);

    const fetchStudentSchema = async () => {
        try {
            const { data } = await restClient.get(SCHEMA_APIS.STUDENT);
            setStudentSchema(data);
        } catch (error) {
            console.error('Failed to fetch student schema:', error);
        }
    };

    return (
        <Modal size='lg' opened={Boolean(show)} onClose={() => { dispatch(setAddStudentModalState({ show: false })); close(); }} title={isEdit ?  'Edit Student':  'Add Student'} >
            <Paper radius="md" p="xl" withBorder {...props}>
                <Text size="lg" fw={500}>
                    {isEdit ?  'Edit Student':  'Add Student' }
                </Text>
                <Divider label="" labelPosition="center" my="lg" />

                <Stack>

                    <DynamicForm
                        formData={studentSchema}
                        formSubmit={async (values = {}) => {
                            const payload = mapValues(values, (value) => {
                                if (isObject(value) && value.id) {
                                    return value.id || value._id;
                                }
                                return value;
                            });
                            makeRequest ? makeRequest(payload) : await restClient.post(isEdit ? APIS.UPDATE_STUDENTS : APIS.CREATE_STUDENT, payload)
                        }}
                        formValues={studentData}
                        isEdit={isEdit}
                        formSubmitButtonJsx={
                            <>
                                <Group justify="space-between" mt="md">
                                    <Button type="submit" radius="xl">
                                        {isEdit? 'Edit Student' :'Add Student'}
                                    </Button>
                                </Group>
                            </>
                        }
                    />

                </Stack>
            </Paper>
        </Modal >
    );
};

export default AddStudentForm;