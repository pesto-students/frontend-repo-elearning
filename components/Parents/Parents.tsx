'use client'

import restClient from "@/app/api/restClient";
import { useAppSelector } from "@/app/lib/hooks";
import { setAddParentModalState } from "@/app/lib/slice";
import { APIS, ROUTES } from "@/constant";
import { getRandomMantineColor } from "@/constant/utils";
import { Avatar, Button, Group, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useConfirmation } from "../ConfirmationModal/ConfirmationModal";
import TableWithSelection from "../TableWithSelection/TableWithSelection";

interface Parent {
    fatherName: string;
    motherName: string;
    email: string;
    phone: string;
    address: string;
    pincode: string;
    _id: string;
    country?: { name: string };
    state?: { name: string };
    city?: { name: string };
    students: any[];
}

interface AddParentModalState {
    show: boolean;
    isEdit?: boolean;
    parentData?: Parent;
    callbackFunctionName?: string;
}

const Parents = () => {
    const dispatch = useDispatch()
    const [parents, setParents] = useState<Parent[]>([])
    const router = useRouter()
    const { addParentModalState } = useAppSelector((state) => state.store) || {}

    useEffect(() => {
        fetchParentData()
    }, [])

    useEffect(() => {
        const callbacks: Record<string, () => Promise<void>> = {
            fetchParentData: fetchParentData
        }
        if ('callbackFunctionName' in addParentModalState &&
            typeof addParentModalState.callbackFunctionName === 'string' &&
            callbacks[addParentModalState.callbackFunctionName]) {
            callbacks[addParentModalState.callbackFunctionName]()
        }
    }, [addParentModalState])

    const fetchParentData = async () => {
        const { data } = await restClient.post(APIS.FETCH_PARENT, {})
        if (data.length) {
            setParents(data)
        }
    }

    const handleAddParent = () => {
        dispatch(setAddParentModalState({ show: true }))
    }

    const handleEditParent = (parent: Parent) => {
        dispatch(setAddParentModalState({ show: true, isEdit: true, parentData: parent, callbackFunctionName: 'fetchParentData' }))
    }

    const getAvatarJsx = (data: Parent, keyName: 'fatherName' | 'motherName') => {
        return (
            <Group gap="sm">
                <Avatar size="sm" color={getRandomMantineColor()}>{data[keyName]?.charAt(0)}</Avatar>
                <Text size="sm" fw={500}>{data[keyName]}</Text>
            </Group>
        )
    }

    const columns = [
        {
            key: 'fatherName', label: 'Father Name', render: (data: Parent) => getAvatarJsx(data, 'fatherName')
        },
        { key: 'motherName', label: 'Mother Name', render: (data: Parent) => getAvatarJsx(data, 'motherName') },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'address', label: 'Address' },
        { key: 'pincode', label: 'Pincode' },
        { key: 'city', label: 'City', render: (data: Parent) => data.city?.name || '' },
        { key: 'state', label: 'State', render: (data: Parent) => data.state?.name || '' },
        { key: 'country', label: 'Country', render: (data: Parent) => data.country?.name || '' },
    ];

    const confirmation = useConfirmation()

    const handleDeleteParent = (parent: Parent) => {
        console.log(parent)
        confirmation({
            title: 'Delete Parent',
            description: 'Are you sure you want to delete this parent?',
            onConfirm: async () => {
                console.log('Deleted')
                try {
                    const { data } = await restClient.post(APIS.DELETE_PARENT, { parentId: parent._id })
                    if (data.success) {
                        fetchParentData()
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    const menuItems = [
        { label: 'Edit', onClick: handleEditParent },
        { label: 'Delete', onClick: handleDeleteParent },
        // Add more menu items as needed
    ];

    const handleRowClick = (parent: Parent) => {
        console.log(parent)
        router.push(ROUTES.PARENT_DETAILS.replace(':parentId', parent._id))
    }

    return (
        <div>
            <Group>
                <Text size="lg" fw={500}>Parents</Text>
                <Button variant="outline" leftSection={<IconPlus size={16} />} onClick={handleAddParent}>Add Parent</Button>
            </Group>
            <div style={{ marginTop: '2rem' }}>
                <TableWithSelection
                    rows={parents}
                    columns={columns}
                    menuItems={menuItems}
                    noCheckbox={true}
                    autoWidth={true}
                    rowClick={handleRowClick}
                // Add more props as needed, e.g., updateItem, rowClick, etc.
                />
            </div>
        </div>
    );
};

export default Parents;