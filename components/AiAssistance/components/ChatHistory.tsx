'use client'

import { useAppSelector } from "@/app/lib/hooks";
import { Container } from "@mantine/core";
import { useDispatch } from "react-redux";
import style from '../style.module.css';

const ChatHistory = () => {
    const dispatch = useDispatch();
    const { store } = useAppSelector((state) => state); 
    const { ChatHistoryData } = store;
    const handleChatClick = (id: string) => {
         const data = ChatHistoryData.filter((chatHistory) => chatHistory.id === id);
    }
    return <Container className={style.container} h="75vh">
       <h1>Chat History</h1>
       {/* {ChatHistoryData.map((chatHistory) => {
        return <div>{chatHistory.label}</div>
       } )} */}
    </Container>
}

export default ChatHistory;