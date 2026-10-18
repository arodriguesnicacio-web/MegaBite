import Link from 'next/link';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3><span>🍰</span> MegaBite</h3>
            <p>Confeitaria artesanal em Alegre-ES. Bolos, doces e sobremesas feitas com amor e ingredientes selecionados para seus momentos especiais.</p>
          </div>

          <div className="footer-column">
            <h4>Navegação</h4>
            <ul className="footer-list">
              <li><Link href="/">Início</Link></li>
              <li><Link href="/produtos">Catálogo Completo</Link></li>
              <li><Link href="/orcamento">Solicitar Orçamento</Link></li>
              <li><Link href="/login">Área do Cliente / Admin</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Contato & Horários</h4>
            <ul className="footer-list">
              <li>📍 Centro, Alegre - ES</li>
              <li>📞 (28) 99999-8888</li>
              <li>🕒 Terça a Sábado: 09h às 18h</li>
              <li>🕒 Domingo: 08h às 12h</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MegaBite Confeitaria. Projeto acadêmico demonstrativo.</p>
        </div>
      </div>
    </footer>
  );
} 