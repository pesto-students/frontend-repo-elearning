import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { hideConfirmationModal, showConfirmationModal } from '@/app/lib/slice';
import { Button, Group, Modal, Text } from '@mantine/core';
import { useCallback } from 'react';

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

interface ConfirmationModalOptions {
    title: string;
    description: string;
    onConfirm: () => void;
}

export const useConfirmation = () => {
    const dispatch = useAppDispatch();

    const showConfirmation = useCallback(({ title, description, onConfirm }: ConfirmationModalOptions) => {
        dispatch(showConfirmationModal({ isOpen: true, title, description, onConfirm }));
    }, [dispatch]);

    return showConfirmation;
};