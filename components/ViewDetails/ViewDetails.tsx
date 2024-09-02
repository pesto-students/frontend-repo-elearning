import { Grid, Paper, Stack, Text } from "@mantine/core";

const ViewDetails = ({details}) => {
    return  <Paper p="md" withBorder>
    <Grid gutter="md">
        {details.map((detail, index) => (
            <Grid.Col key={index} span={6}>
                <Stack spacing="xs">
                    <Text fw={700} size="sm" c="dimmed">{detail.label}</Text>
                    <Text>{detail.value}</Text>
                </Stack>
            </Grid.Col>
        ))}
    </Grid>
</Paper>
}

export default ViewDetails;