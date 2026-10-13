import type { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'MegaBite | Confeitaria Artesanal',
  description: 'Catálogo e encomendas de bolos, doces e tortas artesanais.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
} 