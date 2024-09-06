'use client'
import { getChatHistory, handleUpdateHistory } from "@/app/dashboard/ai-assistance/page";
import { useAppSelector } from "@/app/lib/hooks";
import { setChatBotData, setChatHistoryList, setChatHistoryListData, updateChatHistory } from "@/app/lib/slice";
import { Box, Button, Container, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import style from '../style.module.css';



const ChatHistory = () => {
    const dispatch = useDispatch();
    const { store } = useAppSelector((state) => state); 
    const { ChatHistoryData, chatBotData } = store;
     
    const handleFetchChatHistory = async () => {
         const data = await getChatHistory();
         if(data){
            dispatch(setChatHistoryList(data));

         }
    }

    useEffect(() => {
      handleFetchChatHistory();
      return () => {
         dispatch(updateChatHistory({data: chatBotData.data, id: chatBotData.chatId}));

         handleUpdateHistory(ChatHistoryData)

      } 
   },[])

    const handleChatClick = (id = '') => {
         const data = ChatHistoryData.find((chatHistory) => chatHistory.chatId === id);

         if(!data){
        
            const chatData = {chatId: uuidv4(), data: [], loading: false }
            if(chatBotData.chatId){
               dispatch(updateChatHistory({data: chatBotData.data, id: chatBotData.chatId}));

            }
            dispatch(setChatBotData(chatData));

            dispatch(setChatHistoryListData(chatData as never ));

         }else{
         
            dispatch(updateChatHistory({data: chatBotData.data, id: chatBotData.chatId}));
            dispatch(setChatBotData(data));
            
         }
         handleUpdateHistory(ChatHistoryData)

    }
    console.log(ChatHistoryData)
    return <Container pos="absolute" p="0" className={style.container} h="90vh" w="24%">
       <Text size="lg" fw={700}  >Chat History</Text>
       <Container h="75vh" mah="75vh" w="100%">
       {ChatHistoryData?.length === 0 ? 'No Chats': ChatHistoryData.map((chat) => {
        return <Box className={style.chatHistoryBox} key={uuidv4()} onClick={() => handleChatClick(chat.chatId)}>{chat.data.length ===0 ? 'New conversation' : chat.data[0].parts[0].text}</Box>
       } )}
       </Container>
       
       <Button onClick={() => handleChatClick()} radius="lg" pos="relative" bottom="10px" left="70%" ><IconPlus /></Button>
    </Container>
}

export default ChatHistory;