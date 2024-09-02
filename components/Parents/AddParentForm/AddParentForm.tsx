'use client'

import restClient from "@/app/api/restClient";
import { useAppSelector } from "@/app/lib/hooks";
import { setAddParentModalState } from "@/app/lib/slice";
import DynamicForm from "@/components/common/DynamicForm/DynamicForm";
import { APIS, SCHEMA_APIS } from "@/constant";
import { Button, Divider, Group, Modal, Paper, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { isObject, mapValues } from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AddParentForm = (props) => {

    const form = useForm({
        initialValues: {}
    })
    const router = useRouter()
    const dispatch = useDispatch()
    const store = useAppSelector(state => state.store)
    const [, { close }] = useDisclosure(false);
    const [parentSchema, setParentSchema] = useState([]);

    useEffect(() => {
        fetchParentSchema();
    }, []);

    const fetchParentSchema = async () => {
        try {
            const { data } = await restClient.get(SCHEMA_APIS.PARENT);
            setParentSchema(data);
        } catch (error) {
            console.error('Failed to fetch parent schema:', error);
        }
    };

    return (
        <Modal size='lg' opened={Boolean(store.addParentModalState.show)} onClose={() => { dispatch(setAddParentModalState({ show: false })); close() }} title={"Add student"} >
            <Paper radius="md" p="xl" withBorder {...props}>
                <Text size="lg" fw={500}>
                    Add Student
                </Text>
                <Divider label="" labelPosition="center" my="lg" />

                <Stack>

                    <DynamicForm
                        formData={parentSchema}
                        formSubmit={async (values = {}) => {
                            const payload = mapValues(values, (value) => {
                                if (isObject(value) && value.id) {
                                    return value.id || value._id;
                                }
                                return value;
                            });
                            await restClient.post(APIS.CREATE_STUDENT, payload)
                        }}
                        formSubmitButtonJsx={
                            <>
                                <Group justify="space-between" mt="md">
                                    <Button type="submit" radius="xl">
                                        Add Parent
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

export default AddParentForm;