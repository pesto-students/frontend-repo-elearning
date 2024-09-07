'use client'
import withAuth from '@/app/lib/withAuth';
import { Grid } from "@mantine/core";
import ChatContainer from "./components/ChatContainer";
import ChatHistory from "./components/ChatHistory";

const AiAssistance = () => {
    return  <div>
        <Grid w="100%">
            <Grid.Col span={3} mih="80vh" ><ChatHistory /></Grid.Col>
            <Grid.Col span={9} mih="80vh" ><ChatContainer  /></Grid.Col>
        </Grid>
    </div>
}

export default withAuth(AiAssistance);