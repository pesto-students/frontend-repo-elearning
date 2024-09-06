'use client'
import { MODULES_MAPPING } from '@/constant';
import {
  Badge,
  Card,
  Container,
  Flex,
  Image,
  Text
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import classes from "./DashboardCards.module.css";

interface Module {
  moduleName: string;
  description: string;
  image: string;
  status: string;
  value: string;
  isSubscribed: boolean;
  id: string;
}

function DashboardCards({ data }: { data: Module }) {
  const router = useRouter()

  return (
    <Container size="sm" py="xl">
      <Card shadow="md" radius="lg" className={classes.card} padding="lg" onClick={() => {
        router.push(MODULES_MAPPING[data.value as keyof typeof MODULES_MAPPING])
      }}>
        <Card.Section>
          <Image
            src={data.image}
            height={160}
            alt={data.moduleName}
            withPlaceholder
            placeholder={<Text align="center">No image available</Text>}
          />
        </Card.Section>

        <Flex  justify="space-between"  mt="md" mb="xs">
          <Text fw={500} className={classes.cardTitle}>
            {data.moduleName}
          </Text>
          <Badge color={data.status === 'ACTIVE' ? 'green' : 'red'} variant="light">
            {data.status}
          </Badge>
        </Flex>

        <Text className={classes.cardDesc}  size="sm" c="dimmed" mb="md">
          {data.description}
        </Text>

        <Badge
          color={data.isSubscribed ? 'blue' : 'gray'}
          variant="outline"
          fullWidth
          className={classes.cardSubBadge}
        >
          {data.isSubscribed ? 'Subscribed' : 'Not Subscribed'}
        </Badge>
      </Card>
    </Container>
  );
}

export default DashboardCards