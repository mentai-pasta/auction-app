import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/molecules/Header';
import Footer from '@/components/molecules/Footer';

export const metadata: Metadata = {
  title: {
    default: 'クルマート KuruMart',
    template: '%s | クルマート'
  },
  description: 'hal-auction',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <Header/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
