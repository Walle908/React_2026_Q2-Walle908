import type { Metadata } from 'next';
import { Providers } from './providers';
import { type ReactNode } from 'react';
import '@/styles/global.css';

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
  },
  title: 'rs-react-app',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const themeInitializerScript = `
    (function() {
      try {
        var savedTheme = localStorage.getItem('theme_walle908');
        if (savedTheme && (savedTheme === '"dark"' || savedTheme === 'dark')) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
