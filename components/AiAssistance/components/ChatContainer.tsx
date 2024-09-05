'use client';

import { handleChat } from '@/app/dashboard/ai-assistance/page';
import { useAppSelector } from '@/app/lib/hooks';
import { setChatBotData } from '@/app/lib/slice';
import typingAnimation from '@/app/public/typingAnimation.json';
import { cleanChatData } from '@/constant/utils';
import { Button, Container, Flex, Text, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSend2 } from '@tabler/icons-react';
import Lottie from 'react-lottie';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import style from '../style.module.css';
import ChatBox from './Chatbox';

const defaultMsgBody = {
  parts: [{ text: "" }],
  role: 'user',
};

const ChatContainer = () => {
  const form = useForm({
    initialValues: {
      chat: '',
    },
  });
  const dispatch = useDispatch();
  const { store } = useAppSelector((state) => state);
  let { chatBotData: {data: chatData, chatId ,loading} } = store;
  const { chat } = form.getValues();
  const option ={
    loop: true,
    autoplay: true, 
    animationData: typingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const handleSubmit = async () => {
    const msgBody = {...defaultMsgBody, parts: [{text: chat}], id: uuidv4() }
    const updatedData = [...chatData, msgBody] 
    dispatch(setChatBotData(  {chatId , data: updatedData, loading: true}));
    form.setFieldValue('chat', '');
    const res = await handleChat(msgBody.parts[0].text, cleanChatData(chatData) as never);
    dispatch(setChatBotData( {chatId, data: [...updatedData, res], loading: false} ))
  };

  return (
    <main>
      <Text size="lg" fw={700}>Ai Assistant</Text>
      <Container p="0" mah="75vh" mih="75vh" className={style.chatContainer}>
        {!chatId ? <h1 className={style.startChatMsg}>Start Chat</h1> : chatData.map((chat) => {
          return <ChatBox key={chat.id} role={chat.role} text={chat.parts[0].text} />;
        })}
        { loading? <Lottie height={50}
              width={50} options={option}/> : null}
      </Container>
      {chatId && <Flex direction="row" align="center" gap="sm">
        <Textarea placeholder='Please type your query here...' {...form.getInputProps('chat')} resize="none" h="auto" w="90%" />
        <Button onClick={handleSubmit}>
          <IconSend2 />
        </Button>
      </Flex>}
    </main>
  );
};

export default ChatContainer;
