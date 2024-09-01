'use client'

import { setAddParentModalState } from "@/app/lib/slice";
import { Button, Group, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDispatch } from "react-redux";

const Parents = () => {
    const disptach = useDispatch()

    return (
        <div>
            <Group>
                <Text size="lg" fw={500}>Parents</Text>
                <Button variant="outline" leftSection={<IconPlus size={16} />} onClick={() => {
                    disptach(setAddParentModalState({ show: true }))
                }}>Add Parent</Button>
            </Group>

        </div>
    );
};

export default Parents;