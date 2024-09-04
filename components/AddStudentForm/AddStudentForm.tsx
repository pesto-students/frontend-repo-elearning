import restClient from '@/app/api/restClient';
import { useAppSelector } from '@/app/lib/hooks';
import { setAddStudentModalState } from '@/app/lib/slice';
import { APIS, SCHEMA_APIS } from '@/constant';
import { flattenObject } from '@/constant/utils';
import { Button, Divider, Group, Modal, Paper, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DynamicForm from '../common/DynamicForm/DynamicForm';

interface AddStudentFormProps {
    // Add any props if needed
}

const AddStudentForm: React.FC<AddStudentFormProps> = () => {
    const form = useForm({
        initialValues: {}
    });
    const router = useRouter();
    const dispatch = useDispatch();
    const store = useAppSelector(state => state.store);
    const [, { close }] = useDisclosure(false);
    const [studentSchema, setStudentSchema] = useState<any[]>([]);
    const { addStudentModalState } = store;
    const { show, studentData, isEdit, makeRequest } = addStudentModalState;

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

    console.log(studentData, 'studentData');

    return (
        <Modal size='lg' opened={Boolean(show)} onClose={() => { dispatch(setAddStudentModalState({ show: false })); close(); }} title={isEdit ? 'Edit Student' : 'Add Student'} >
            <Paper radius="md" p="xl" withBorder>
                <Text size="lg" fw={500}>
                    {isEdit ? 'Edit Student' : 'Add Student'}
                </Text>
                <Divider label="" labelPosition="center" my="lg" />

                <Stack>
                    <DynamicForm
                        formData={studentSchema}
                        formSubmit={async (values: Record<string, unknown> = {}) => {
                            const payload = flattenObject(values);
                            if (makeRequest) {
                                await makeRequest(payload);
                            } else {
                                await restClient.post(isEdit ? APIS.UPDATE_STUDENTS : APIS.CREATE_STUDENT, payload);
                            }
                        }}
                        formValues={studentData}
                        isEdit={isEdit}
                        formSubmitButtonJsx={
                            <>
                                <Group justify="space-between" mt="md">
                                    <Button type="submit" radius="xl">
                                        {isEdit ? 'Edit Student' : 'Add Student'}
                                    </Button>
                                </Group>
                            </>
                        }
                    />
                </Stack>
            </Paper>
        </Modal>
    );
};

export default AddStudentForm;