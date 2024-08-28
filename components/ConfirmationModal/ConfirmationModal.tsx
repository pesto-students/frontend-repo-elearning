import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { hideConfirmationModal } from '@/app/lib/slice';
import { Button, Group, Modal, Text } from '@mantine/core';

const ConfirmationModal = () => {
    const dispatch = useAppDispatch();
    const { isOpen, title, description, onConfirm } = useAppSelector(state => state.store.confirmationModal);

    const handleClose = () => {
        dispatch(hideConfirmationModal());
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        handleClose();
    };

    return (
        <Modal opened={isOpen} onClose={handleClose} title={title} centered>
            <Text>{description}</Text>
            <Group justify="flex-end" mt="xl">
                <Button variant="outline" onClick={handleClose}>
                    Cancel
                </Button>
                <Button color="red" onClick={handleConfirm}>
                    Delete
                </Button>
            </Group>
        </Modal>
    );
};

export default ConfirmationModal;

import { showConfirmationModal } from '@/app/lib/slice';

interface ConfirmationModalOptions {
    title: string;
    description: string;
    onConfirm: () => void;
}

export const showConfirmation = ({ title, description, onConfirm }: ConfirmationModalOptions) => {
    const dispatch = useAppDispatch()
    dispatch(showConfirmationModal({ isOpen: true, title, description, onConfirm }));
};