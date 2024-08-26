import restClient from '@/app/api/restClient';
import { useAppSelector } from '@/app/lib/hooks';
import { setAddStudentModalState } from '@/app/lib/slice';
import { APIS, SCHEMA_APIS } from '@/constant';
import { Button, Divider, Group, Modal, Paper, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
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
    const { store } = useAppSelector(state => state)
    const [, { close }] = useDisclosure(false);
    const [studentSchema, setStudentSchema] = useState([]);

    useEffect(()=>{
        fetchStudentSchema();
    },[]);

    const fetchStudentSchema = async () => {
        try {
          const { data } = await restClient.get(SCHEMA_APIS.STUDENT);
          setStudentSchema(data);
        } catch (error) {
          console.error('Failed to fetch student schema:', error);
        }
      };

    return (
        <Modal opened={Boolean(store.addStudentModalState.show)} onClose={() => { dispatch(setAddStudentModalState({ show: false })); close() }} title={"Add student"} >
            <Paper radius="md" p="xl" withBorder {...props}>
                <Text size="lg" fw={500}>
                    Add Student
                </Text>
                <Divider label="" labelPosition="center" my="lg" />

                <Stack> 
                    <>
                        <DynamicForm
                            formData={studentSchema}
                            formSubmit={async (values = {}) => {
                                await restClient.post(APIS.CREATE_ORGANIZATION, values)
                            }}
                            formSubmitButtonJsx={
                                <> 
                                    <Group justify="space-between" mt="md">
                                        <Button type="submit" radius="xl">
                                            Add Student
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

export default AddStudentForm;