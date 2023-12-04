import Providers from '@/lib/Providers';
import '@smastrom/react-rating/style.css';
import type { Metadata as NextMetadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

interface Metadata extends NextMetadata {
  favicon?: string;
}

export const metadata: Metadata = {
  title: 'ALyals',
  description: 'Alyals provide trusted product',
  favicon: '../../favicon.ico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Providers>
  );
}
