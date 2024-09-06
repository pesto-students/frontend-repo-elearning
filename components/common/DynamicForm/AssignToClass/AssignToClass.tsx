import restClient from '@/app/api/restClient';
import { useAppSelector } from '@/app/lib/hooks';
import { setAssignToClassModalState } from '@/app/lib/slice';
import { APIS } from '@/constant';
import { Button, Divider, Group, Modal, Paper, ScrollArea, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { upperFirst } from 'lodash';
import { useDispatch } from 'react-redux';
import DynamicMultiSelect from '../DynamicMultiSelect';

interface AssignToClassProps { }

const AssignToClass: React.FC<AssignToClassProps> = () => {
    const form = useForm({
        initialValues: { className: '', classIds: [] as string[] }
    });

    const dispatch = useDispatch();
    const { assignToClassModalState } = useAppSelector(state => state.store);
    const { show, assigneeData } = assignToClassModalState || {};


    const [, { close }] = useDisclosure(false);
    
    const getUpdateApi = (editType: string, classIds: any) => {
        switch(editType){
            case 'teacher': {
                return {url: APIS.UPDATE_TEACHER_ENROLLMENTS, body:  { teacherIds: [assigneeData?._id] || '', classIds }}
            }
            case 'student': {
                return {url: APIS.UPDATE_STUDENT_ENROLLMENTS, body:  { studentIds: [assigneeData?._id] || '', classIds }}

            }
            default: {
                return {url: '', body: {}}
            }
        }

    }
    return (
        <Modal opened={Boolean(show)} onClose={() => { dispatch(setAssignToClassModalState({ show: false, assigneeData: null })); close(); }} title="Add class" >
            <Paper radius="md" p="xl" withBorder>
                <Text size="lg" fw={500}>
                    <Text>{ }</Text>
                    Welcome to eLearning, assign class/classes to {assigneeData?.firstName || ''} {assigneeData?.lastName || ''}
                </Text>
                <Divider label="" labelPosition="center" my="lg" />
                <ScrollArea style={{ height: "20vh", paddingRight: '1rem' }} offsetScrollbars>
                    <Stack>
                        <form onSubmit={form.onSubmit(async (values) => {
                            const { classIds = [] } = values;
                            try {
                                const apiUrl = getUpdateApi(assignToClassModalState.editType, classIds).url;
                                const body = getUpdateApi(assignToClassModalState.editType, classIds).body
                                const { data } = await restClient.post(apiUrl, body);
                                if (data) {
                                    dispatch(setAssignToClassModalState({ show: false, assigneeData: null }));
                                    notifications.show({ message: 'Updated enrollments details', color: 'green' });
                                    assignToClassModalState.callBack && assignToClassModalState.callBack()
                                } else {
                                    notifications.show({ message: 'Failed to update enrollments details', color: 'red' });
                                }
                            } catch (error) {
                                console.log(error);
                                notifications.show({ message: 'Failed to update enrollments details', color: 'red' });
                            }
                        })}>
                            <DynamicMultiSelect
                                label="Select classes"
                                apiDetails={{ endpoint: APIS.FETCH_CLASS, onMount: true, resultKey: "className", body: {} }}
                                onSelect={(items: Record<string, string>[]) => {
                                    form.setFieldValue('classIds', items.map(item => (item.id || item._id)));
                                }}
                                values={assigneeData?.classes || []}
                                isEdit={true}
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
        </Modal>
    );
};

export default AssignToClass;