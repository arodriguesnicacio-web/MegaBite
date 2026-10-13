'use client';

import { useState } from 'react';
import Link from 'next/link';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Link href="/login" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            Entrar
          </Link>
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
        </div>
      )}
    </header>
  );
} 