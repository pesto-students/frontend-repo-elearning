
import { AppShellLayout } from '@/components/AppShell/AppShell';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { theme } from '../theme';

export const metadata = {
  title: 'eLearning Next.js template',
  description: 'I am using eLearning with Next.js!',
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
          <AppShellLayout>{children}</AppShellLayout>

        </MantineProvider>
      </body>
    </html>
  );
}
