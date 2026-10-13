import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        backgroundColor: '#fdf6f0',
        padding: '4rem 0',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          <div>
            <span style={{
              color: 'var(--secondary)',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontSize: '0.85rem'
            }}>
              Sabor & Tradição Artesanal
            </span>
            <h1 style={{
              fontSize: '2.5rem',
              color: 'var(--primary)',
              margin: '0.5rem 0 1rem 0',
              lineHeight: '1.2'
            }}>
              Momentos inesquecíveis pedem doces extraordinários.
            </h1>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '1.1rem',
              marginBottom: '2rem'
            }}>
              Bolos recheados, brownies crocantes, cupcakes decorados e kits exclusivos preparados diariamente com ingredientes nobres.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/produtos" className="btn btn-primary">
                Ver Catálogo
              </Link>
              <Link href="/orcamento" className="btn btn-outline">
                Encomenda Especial
              </Link>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--accent)',
            height: '320px',
            borderRadius: 'var(--radius)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '5rem',
            boxShadow: 'var(--shadow)'
          }}>
            🎂
          </div>
        </div>
      </section>

      {/* Destaques de Categorias */}
      <section className="container" style={{ padding: '4rem 1.25rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--primary)' }}>Nossas Especialidades</h2>
          <p style={{ color: 'var(--text-muted)' }}>Feito à mão para adoçar o seu dia</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.5rem'
        }}>
          {[
            { title: 'Bolos', icon: '🎂' },
            { title: 'Cupcakes', icon: '🧁' },
            { title: 'Brownies', icon: '🍫' },
            { title: 'Tortas', icon: '🥧' },
            { title: 'Doces', icon: '🍬' },
            { title: 'Kits Festa', icon: '🎁' }
          ].map((cat, idx) => (
            <div key={idx} style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '1.5rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow)',
              transition: 'transform 0.2s'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{cat.icon}</div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>{cat.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 