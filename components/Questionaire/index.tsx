'use client';

import { useAppSelector } from '@/app/lib/hooks';
import { Button, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const questiontypeData = [
  {
    label: 'Multiple Choice',
  },
];

const difficultyData = [
  {
    label: 'Easy',
  },
  {
    label: 'Medium',
  },
  {
    label: 'Difficult',
  },
];

const Questionnaire = (props) => {
  const form = useForm({
    initialValues: {},
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const { store } = useAppSelector((state) => state);
  const [, { close }] = useDisclosure(false);
  return (
    <main>
        <Flex direction="row" align="center" justify="space-between">
            <h1>Questionnaire</h1>
            <Button onClick={() => router.push('/dashboard/questionnaire/create-questions')} >Create Questionnaire</Button>
        </Flex>
        
        
    </main>
  );
};

export default Questionnaire;
