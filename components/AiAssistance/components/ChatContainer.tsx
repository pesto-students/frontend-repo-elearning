'use client';

import { handleChat } from '@/app/dashboard/ai-assistance/page';
import { useAppSelector } from '@/app/lib/hooks';
import { setChatBotData } from '@/app/lib/slice';
import typingAnimation from '@/app/public/typingAnimation.json';
import { IdefaultMsgBody } from '@/constant/types';
import { Button, Container, Flex, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSend2 } from '@tabler/icons-react';
import Lottie from 'react-lottie';
import { useDispatch } from 'react-redux';
import style from '../style.module.css';
import ChatBox from './Chatbox';

const defaultMsgBody = {
  text: '',
  userType: 'user',
};

const ChatContainer = () => {
  const form = useForm({
    initialValues: {
      chat: '',
    },
  });
  const dispatch = useDispatch();
  const { store } = useAppSelector((state) => state);
  let { chatBotData: {data, loading} } = store;
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
    const msgBody = {...defaultMsgBody, text: chat }
    data = [...data, msgBody] 
    dispatch(setChatBotData(  {data: data, loading: true}));
    form.setFieldValue('chat', '');
    const res = await handleChat(msgBody.text);
    dispatch(setChatBotData( {data: [...data, res], loading: false} ))
  };
  console.log(data, 'chatBotData')

  return (
    <main>
      <h1>Chat</h1>
      <Container mah="60vh" mih="60vh" className={style.chatContainer}>
        {data.map((chat) => {
          return <ChatBox key={chat.text} {...chat as IdefaultMsgBody} />;
        })}
        { loading? <Lottie height={50}
              width={50} options={option}/> : null}
      </Container>
      <Flex direction="row" align="center" gap="sm">
        <Textarea {...form.getInputProps('chat')} resize="none" h="auto" w="90%" />
        <Button onClick={handleSubmit}>
          <IconSend2 />
        </Button>
      </Flex>
    </main>
  );
};

export default ChatContainer;
