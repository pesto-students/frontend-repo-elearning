'use client';
import hms from '@/app/api/hms';
import restClient from '@/app/api/restClient';
import { getLiveClassesAction } from '@/app/dashboard/online-classes/page';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { hideLoader, resetActiveLiveClassFormData, setLiveClassFormData, setScheduleOnlineClassModal, showLoader } from '@/app/lib/slice';
import { APIS, SCHEMA_APIS } from '@/constant';
import { isNotEmptyObject } from '@/constant/utils';
import { Button, Divider, Group, Modal, Paper, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import isObject from "lodash/isObject";
import mapValues from "lodash/mapValues";
import { useEffect, useState } from 'react';
import DynamicForm from '../common/DynamicForm/DynamicForm';

const ScheduleOnlineClass = () => {
    const store = useAppSelector(state => state.store)
    const dispatch = useAppDispatch()
    const initialValues = isNotEmptyObject(store.activeEditLiveClassData) ? store.activeEditLiveClassData : {
        name: "React Demo class",
        subject: "React",
        liveClassDescription: '',
        dateTime: ''
    }

    const scheduleLiveClassForm = useForm({
        initialValues: initialValues
    })

    const close = () => {
        dispatch(setScheduleOnlineClassModal({ show: false }))
        dispatch(resetActiveLiveClassFormData())
    }

    const handleScheduleLiveClassFormSubmit = async (values: { name: string, liveClassDescription: string, id: string }) => {
        console.log(values)
        const { name = '', liveClassDescription = '', id = '' } = values
        const { data: newRoomData } = await hms.post(APIS.ROOMS, {
            name: name,
            description: liveClassDescription || "This is a sample description for the room",
            template_id: "66b71e309928c864eafbfcec",
            id: id
        })
        dispatch(setLiveClassFormData({ id: newRoomData.id, data: values }))
        dispatch(setScheduleOnlineClassModal({ show: false }))
        dispatch(resetActiveLiveClassFormData())
        getLiveClassesAction()
    }

    const [onlineClassSchema, setOnlineClassSchema] = useState([])

    useEffect(() => {
        getSchemaData()
    }, [])

    const getSchemaData = async () => {
        try {
            dispatch(showLoader())
            const { data } = await restClient.get(SCHEMA_APIS.ONLINE_CLASS)
            if (data) {
                setOnlineClassSchema(data)
            }
            dispatch(hideLoader())
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (values) => {
        const payload = mapValues(values, (value) => {
            if (isObject(value) && (value.id || value._id)) {
                return value.id || value._id;
            }
            return value;
        });

        try {
            const apiUrl = APIS.CREATE_ONLINE_CLASS
            const { data } = await restClient.post(apiUrl, payload)
            if (data) {
                notifications.show({ title: 'Added online class' })
            }
        } catch (error) {
            console.log(error)
            notifications.show({ title: 'Failed to create online class', color: 'red' })
        }
    }

    return (
        <div>
            <Modal size='lg' opened={Boolean(store.scheduleOnlineClassModalState.show)} onClose={close} title="Schedule Online class">
                <Paper radius="md" p="xl" withBorder >
                    <Text size="lg" fw={500}>
                        {store.scheduleOnlineClassModalState.onlineClassData ? "Edit Online class" : "Add Online Class"}
                    </Text>
                    <Divider label="" labelPosition="center" my="lg" />

                    <Stack>
                        <>
                            <DynamicForm
                                formData={onlineClassSchema}
                                formSubmit={handleSubmit}
                                formSubmitButtonJsx={
                                    <>
                                        <Group justify="space-between" mt="md">
                                            <Button type="submit" radius="xl">
                                                {store.scheduleOnlineClassModalState.onlineClassData ? "Update Online Class" : "Add Online Class"}
                                            </Button>
                                        </Group>
                                    </>
                                }
                            />
                        </>
                    </Stack>
                </Paper>
            </Modal>
        </div>
    );
};

export default ScheduleOnlineClass;