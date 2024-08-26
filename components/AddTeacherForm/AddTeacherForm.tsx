import restClient from '@/app/api/restClient';
import { useAppSelector } from '@/app/lib/hooks';
import { setAddTeacherModalState } from '@/app/lib/slice';
import { SCHEMA_APIS } from '@/constant';
import { Button, Divider, Group, Modal, Paper, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
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
    },[]);

    const fetchTeacherSchema = async () => {
        try {
          const { data } = await restClient.get(SCHEMA_APIS.TEACHER);
          setTeacherSchema(data);
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
                                // await restClient.post(APIS.CREATE_ORGANIZATION, values)
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