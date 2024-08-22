import {
  Card,
  Container,
  rem,
  SimpleGrid,
  Text,
  useMantineTheme
} from '@mantine/core';
import { IconCookie, IconGauge, IconUser } from '@tabler/icons-react';
import classes from "./DashboardCards.modules.css";

const mockdata = [
  {
    title: 'Branches',
    description:
      '1',
    icon: IconGauge,
  },
  {
    title: 'Teachers',
    description:
      '10',
    icon: IconUser,
  },
  {
    title: 'Students',
    description:
      '20',
    icon: IconCookie,
  },
];

export function DashboardCards() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      {/* <Group justify="center">
        <Badge variant="filled" size="lg">
          Best company ever
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Integrate effortlessly with any technology stack
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when
        hunger drives it to try biting a Steel-type Pokémon.
      </Text> */}

      <SimpleGrid cols={{ base: 1, md: 4 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}