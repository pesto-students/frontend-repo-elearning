'use client';
import hms from '@/app/api/hms';
import { getLiveClassesAction } from '@/app/dashboard/live-classes/page';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { resetActiveLiveClassFormData, setLiveClassFormData, setScheduleLiveClassModal } from '@/app/lib/slice';
import { APIS } from '@/constant';
import { isNotEmptyObject } from '@/constant/utils';
import { Autocomplete, Button, Group, Modal, TextInput, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';

const ScheduleLiveClass = () => {
    const { store } = useAppSelector(state => state)
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
        dispatch(setScheduleLiveClassModal(false))
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
        dispatch(setScheduleLiveClassModal(false))
        dispatch(resetActiveLiveClassFormData())
        getLiveClassesAction()
    }

    return (
        <div>
            <Modal opened={Boolean(store.scheduleLiveClassModal)} onClose={close} title="Schedule Live class">
                <form onSubmit={scheduleLiveClassForm.onSubmit(handleScheduleLiveClassFormSubmit)}>
                    <TextInput
                        withAsterisk
                        label="Title"
                        placeholder="Live Class- Subject"
                        key={scheduleLiveClassForm.key('name')}
                        {...scheduleLiveClassForm.getInputProps('name')}
                    />
                    <Textarea
                        label="Live Class description"
                        placeholder="About this live class"
                        {...scheduleLiveClassForm.getInputProps(scheduleLiveClassForm.key('liveClassDescription') ? "liveClassDescription" : 'description')}
                    />
                    <Autocomplete label="Select class"
                        data={['React', 'Angular', 'Vue', 'Svelte']}
                        {...scheduleLiveClassForm.getInputProps('subject')}>
                    </Autocomplete>
                    <DateTimePicker label="Pick date and time" placeholder="Pick date and time"
                        value={new Date()}
                        minDate={new Date()}
                        maxDate={dayjs(new Date()).add(1, 'month').toDate()}
                        {...scheduleLiveClassForm.getInputProps('dateTime')}
                        required
                    />
                    <Group justify="flex-end" mt="md">
                        <Button type="submit">{scheduleLiveClassForm.key("id") ? "Edit" : "Schedule"}</Button>
                    </Group>
                </form>
            </Modal>
        </div>
    );
};

export default ScheduleLiveClass;