'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn, signUp, useSession } from '@/lib/auth-client';

function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const redirectTo = searchParams.get('redirect') || '/checkout';

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Verifica se já está logado ao carregar a página
  useEffect(() => {
    if (!isPending && session) {
      const userRole = (session.user as any)?.role;
      if (userRole === 'ADMIN') {
        router.replace('/admin');
      } else {
        router.replace(redirectTo);
      }
    }
  }, [session, isPending, router, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        // Cria a conta
        const signUpRes = await signUp.email({
          email,
          password,
          name,
        });

        if (signUpRes.error) {
          setError(signUpRes.error.message || 'Erro ao realizar cadastro.');
          setLoading(false);
          return;
        }

        // Autentica automaticamente
        const signInRes = await signIn.email({
          email,
          password,
        });

        if (signInRes.error) {
          setError('Cadastro concluído! Por favor, informe seus dados para entrar.');
        } else {
          // 2. Redirecionamento inteligente após cadastro + login
          const userRole = (signInRes.data?.user as any)?.role;
          if (userRole === 'ADMIN') {
            window.location.href = '/admin';
          } else {
            router.replace(redirectTo);
          }
        }
      } else {
        // Login normal
        const res = await signIn.email({
          email,
          password,
        });

        if (res.error) {
          setError(res.error.message || 'E-mail ou senha incorretos.');
        } else {
          // 3. Redirecionamento inteligente após login
          const userRole = (res.data?.user as any)?.role;
          if (userRole === 'ADMIN') {
            // Usamos window.location.href para forçar o recarregamento total da página 
            // e garantir que o Header atualize o botão de Admin
            window.location.href = '/admin';
          } else {
            router.replace(redirectTo);
          }
        }
      }
    } catch (err) {
      setError('Ocorreu um erro ao processar sua solicitação.');
    } finally {
      setLoading(false);
    }
  };

  if (isPending || session) {
    return (
      <div style={{ maxWidth: '400px', margin: '80px auto', textAlign: 'center', padding: '20px' }}>
        <p style={{ color: '#6B3E2E', fontWeight: 'bold', fontSize: '18px' }}>
          {isPending ? 'Verificando sessão...' : 'Sessão iniciada! Direcionando...'}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '60px auto',
        padding: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}
    >
      <h1
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#6B3E2E',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        {isSignUp ? 'Criar Conta no MegaBite' : 'Entrar no MegaBite'}
      </h1>

      {error && (
        <div
          style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '10px 14px',
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '14px',
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {isSignUp && (
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 'bold' }}>
              Nome Completo
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
            />
          </div>
        )}

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 'bold' }}>
            E-mail
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: 'bold' }}>
            Senha
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#6B3E2E',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '8px',
          }}
        >
          {loading ? 'Processando...' : isSignUp ? 'Cadastrar e Continuar' : 'Entrar'}
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError('');
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#6B3E2E',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          {isSignUp ? 'Já tem uma conta? Entrar' : 'Não tem conta? Cadastre-se'}
        </button>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div style={{ maxWidth: '400px', margin: '60px auto', textAlign: 'center', padding: '20px' }}>
          <p style={{ color: '#666' }}>Carregando formulário...</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}