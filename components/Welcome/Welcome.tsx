import { Title, Text, Anchor } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          eLearning
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={'80%'} mx="auto" mt="xl">
        The eLearning aims to develop a comprehensive educational organization SaaS platform that enables them to efficiently manage administrative tasks and enhance communication with parents, teachers, and students through various modules.
      </Text>
    </>
  );
}
