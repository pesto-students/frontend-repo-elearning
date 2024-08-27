
import { AppShellLayout } from '@/components/AppShell/AppShell';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { theme } from '../theme';
import StoreProvider from './lib/storeprovider';

export const metadata = {
  title: 'eLearning- manage your education organization',
  description: 'The eLearning aims to develop a comprehensive educational organization SaaS platform that enables them to efficiently manage administrative tasks and enhance communication with parents, teachers, and students through various modules.',
};

export default function RootLayout({ children }: { children: any }) {

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <StoreProvider>
            <AppShellLayout>{children}</AppShellLayout>.
          </StoreProvider>
          <Notifications />
        </MantineProvider>
      </body>
    </html>
  );
}
