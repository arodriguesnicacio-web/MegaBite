'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from "@/lib/auth-client";
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();

  return (
    <header className="header">
      <div className="container header-container">
        <Link href="/" className="logo">
          <span className="logo-icon">🍰</span>
          <span>MegaBite</span>
          <span className="logo-tag">Artesanal</span>
        </Link>

        <nav className="nav-desktop">
          <Link href="/" className="nav-link">Início</Link>
          <Link href="/produtos" className="nav-link">Catálogo</Link>
          <Link href="/orcamento" className="nav-link">Encomendas</Link>
          <Link href="/sobre" className="nav-link">Sobre Nós</Link>
        </nav>

        <div className="header-actions">
          {isPending ? (
            <span style={{ fontSize: '0.85rem', color: '#666' }}>A carregar...</span>
          ) : session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.9rem' }}>
                Olá, <strong>{session.user.name || session.user.email}</strong>
              </span>
              <button
                onClick={() => signOut()}
                className="btn btn-outline"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Sair
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              Entrar
            </Link>
          )}

          <button
            className="mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir Menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="mobile-menu open">
          <Link href="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Início</Link>
          <Link href="/produtos" className="nav-link" onClick={() => setIsMenuOpen(false)}>Catálogo</Link>
          <Link href="/orcamento" className="nav-link" onClick={() => setIsMenuOpen(false)}>Encomendas</Link>
          <Link href="/sobre" className="nav-link" onClick={() => setIsMenuOpen(false)}>Sobre Nós</Link>
          
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
            {session ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span className="nav-link">Olá, <strong>{session.user.name || session.user.email}</strong></span>
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="btn btn-outline"
                  style={{ width: '100%', padding: '0.5rem' }}
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="btn btn-outline"
                style={{ display: 'block', textAlign: 'center', width: '100%', padding: '0.5rem' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}