'use client';
import { createQuestions, uploadDocument } from '@/app/dashboard/questionnaire/create-questions/page';
import { useAppSelector } from '@/app/lib/hooks';
import { MultiOptionPicker } from '@/components/multiOptionsPicker';
import { examplePrompt } from '@/constant';
import { Button, Flex, Tabs, Text, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconCloudUpload, IconTextPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DropzoneButton } from '../Components/DropZones/DropZones';
import style from './style.module.css';

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

const CreateQuestionnaire = () => {
  const [showExample, setShowExample] = useState(false);
  const [fileData, setFileData] = useState(null as any);
  const [htmlContent, setHtmlContent] = useState('');
  const form = useForm({
    initialValues: {
        notes: '',
        difficulty: '',
        questionType: '',
        example: ''
    },
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const { store } = useAppSelector((state) => state);
  const [, { close }] = useDisclosure(false);
  const {difficulty, questionType, notes, example} = form.getValues()
  const handleFile = async(file: any) => {
    if (file?.length) {
        const formData = new FormData();
        formData.append('file', file[0]);
        const resp =  await uploadDocument(formData);
        setFileData(resp as never);
    }
    
  }
  
  const getPrompts = () => {
    if(fileData){
        return [
            {
              fileData: {
                mimeType: fileData.file.mimeType,
                fileUri: fileData.file.uri
              }
            },
            { text: `Generate a ${questionType} for students based on the attached notes in fileData, with a difficulty level of ${difficulty}. Format the content as a question paper and send it in HTML, styled like this ${example || examplePrompt}. Include a button to print the questions on the top right, ensuring the answer keys are placed in a separate section or column that does not appear when printing.` },
          ]
    }
    if(notes){
        return `Create ${questionType} regarding for students with the following notes, it should of ${difficulty} difficulty, here are the notes ${notes}. Create it in a question paper format and send it in a html format like this ${examplePrompt}. Include a button to print the questions on the top right, ensuring the answer keys are placed in a separate section or column that does not appear when printing`
    }
    return ''
  }

   
  const handleCreateQuestion = async () => {
    const res = await createQuestions(getPrompts());
    setHtmlContent(res)
  }


  return (
    <main>
       
      <Text size="xl" fw="bold">Questionnaire</Text>
      <div>
        <Text size="md" fw="bold">Create Questions</Text>
      </div>
      <div>
      <Tabs defaultValue="upload">
      <Tabs.List>
        <Tabs.Tab value="upload" leftSection={<IconCloudUpload  />}>
          Upload
        </Tabs.Tab>
        <Tabs.Tab value="messages" leftSection={<IconTextPlus />}>
          Text
        </Tabs.Tab>
   
      </Tabs.List>

      <Tabs.Panel value="upload">
        <DropzoneButton onDrop={handleFile} />
      </Tabs.Panel>

      <Tabs.Panel value="messages">
      <Textarea
          placeholder="Add the notes here to create questions"
          label="Create questions with notes"
          autosize
          resize='both'
          style={{width: '60%'}}
         
          minRows={10}
          {...form.getInputProps('notes')}
        />{' '}
      </Tabs.Panel>

     
    </Tabs>
      </div>
     
      <Button onClick={() => setShowExample(!showExample)}>{ showExample? 'Hide Example' :'Add Example'}</Button>

      { showExample && <Textarea
          placeholder="Examples"
          label="Show examples here"
          autosize
          resize='both'
          style={{width: '30%'}}
         
          minRows={2}
          {...form.getInputProps('example')}
        />}
      <Flex align="center" gap="md" direction="row" wrap="wrap" mt="20px">
        <MultiOptionPicker onChange={(item) => form.setFieldValue('questionType', item)} data={questiontypeData as never} label="Question Type" />
        <MultiOptionPicker onChange={(item) => form.setFieldValue('difficulty', item)} data={difficultyData as never} label="Difficulty" />
        <Button onClick={handleCreateQuestion} mt="20px">Create Questionnaire</Button>
      </Flex>
      {htmlContent && <div style={{marginTop: '20px'}}>
        Preview: 
      <div >
         <iframe className={style.preview} srcDoc={htmlContent} />

       
      </div>
      </div>}
    </main>
  );
};

export default CreateQuestionnaire;
