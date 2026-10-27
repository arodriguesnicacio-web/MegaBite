import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'MegaBite - Confeitaria Artesanal',
  description: 'Os melhores bolos e doces para o seu evento',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: '#fcf8f5' }}>
        <CartProvider>
          <Header />
          <main style={{ minHeight: 'calc(100vh - 160px)' }}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
} 