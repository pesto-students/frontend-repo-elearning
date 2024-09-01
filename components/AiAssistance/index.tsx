'use client'
import { Grid } from "@mantine/core";
import ChatContainer from "./components/ChatContainer";
import ChatHistory from "./components/ChatHistory";

const AiAssistance = () => {
    return  <div>
        <Grid>
        <Grid.Col span={3} mih="75vh" ><ChatHistory /></Grid.Col>
        <Grid.Col span={9} mih="75vh" ><ChatContainer  /></Grid.Col>
        </Grid>
    </div>
}

export default AiAssistance;