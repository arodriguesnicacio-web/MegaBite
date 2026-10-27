'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth-client';

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut();
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Erro ao encerrar sessão:', error);
      alert('Ocorreu um erro ao sair da conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      style={{
        padding: '10px 20px',
        backgroundColor: '#dc3545',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: loading ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        opacity: loading ? 0.7 : 1,
        transition: 'background-color 0.2s',
      }}
    >
      <span>🚪</span>
      <span>{loading ? 'Saindo da conta...' : 'Sair da Conta'}</span>
    </button>
  );
} 