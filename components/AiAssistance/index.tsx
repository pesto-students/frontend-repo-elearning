'use client'

import { useAppSelector } from "@/app/lib/hooks";
import { Grid } from "@mantine/core";
import { useDispatch } from "react-redux";
import ChatContainer from "./components/ChatContainer";
import ChatHistory from "./components/ChatHistory";

const data =[{
    text: 'hii There',
    userType: 'user'
},{
    text: 'hii There, I am your chatbot',
    userType: 'chatbot'
}]

const AiAssistance = () => {
    const dispatch = useDispatch();
    const { store } = useAppSelector((state) => state); 
    const { ChatHistoryData } = store;

    return  <main>
        <Grid>
        <Grid.Col span={3} mih="75vh" ><ChatHistory /></Grid.Col>
        <Grid.Col span={9} mih="75vh" ><ChatContainer chatList={data} /></Grid.Col>
        </Grid>
    </main>
}

export default AiAssistance;