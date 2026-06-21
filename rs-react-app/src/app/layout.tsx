import type { Metadata } from 'next';
import { Providers } from './providers';
import '@/styles/global.css';

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
  },
  title: 'rs-react-app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
