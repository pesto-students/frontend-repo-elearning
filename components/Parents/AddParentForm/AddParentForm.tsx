'use client';

import restClient from "@/app/api/restClient";
import { useAppSelector } from "@/app/lib/hooks";
import { setAddParentModalState } from "@/app/lib/slice";
import DynamicForm from "@/components/common/DynamicForm/DynamicForm";
import { APIS, SCHEMA_APIS } from "@/constant";
import { flattenObject } from "@/constant/utils";
import { Button, Divider, Group, Modal, Paper, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AddParentForm = (props) => {
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
        <Modal size='lg' opened={Boolean(store.addParentModalState.show)} onClose={() => { dispatch(setAddParentModalState({ show: false })); close() }} title={store.addParentModalState.parentData ? "Edit Parent" : "Add Parent"} >
            <Paper radius="md" p="xl" withBorder {...props}>
                <Text size="lg" fw={500}>
                    {store.addParentModalState.parentData ? "Edit" : "Add"} student's parent
                </Text>
                <Divider label="" labelPosition="center" my="lg" />
                <Stack>
                    <DynamicForm
                        formData={parentSchema}
                        formSubmit={async (values) => {
                            const payload = flattenObject(values)
                            const apiUrl = store.addParentModalState.parentData ? APIS.UPDATE_PARENT : APIS.CREATE_PARENT
                            await restClient.post(apiUrl, payload)
                        }}
                        formSubmitButtonJsx={
                            <>
                                <Group justify="space-between" mt="md">
                                    <Button type="submit" radius="xl">
                                        {store.addParentModalState.parentData ? "Edit Parent" : "Add Parent"}
                                    </Button>
                                </Group>
                            </>
                        }
                        formValues={store.addParentModalState.parentData}
                        isEdit={Boolean(store.addParentModalState.parentData)}
                    />

                </Stack>
            </Paper>
        </Modal >
    );
};

export default AddParentForm;