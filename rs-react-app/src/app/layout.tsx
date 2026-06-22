import type { Metadata } from 'next';
import { Providers } from './providers';
import '@/styles/global.css';

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
  },
  title: 'rs-react-app',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

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
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
