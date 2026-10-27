'use client';

import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';

export function ImageUpload() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = async () => {
    const file = inputFileRef.current?.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    if (file.size > 2 * 1024 * 1024) {
      setErrorMsg('O limite é de 2MB.');
      if (inputFileRef.current) inputFileRef.current.value = '';
      return;
    }

    setIsUploading(true);
    try {
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });
      setBlobUrl(newBlob.url);
    } catch (error) {
      setErrorMsg('Erro no upload da foto.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setBlobUrl(null);
    setErrorMsg(null);
    if (inputFileRef.current) inputFileRef.current.value = '';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          border: '2px solid var(--mb-border)',
          backgroundColor: 'var(--mb-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {blobUrl ? (
          <img src={blobUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: '0.75rem', color: 'var(--mb-text-muted)' }}>Sem foto</span>
        )}
      </div>

      {errorMsg && <span style={{ fontSize: '0.75rem', color: 'var(--mb-danger)' }}>{errorMsg}</span>}

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <label className="file-upload-btn">
          {isUploading ? 'Enviando...' : blobUrl ? 'Alterar' : 'Selecionar'}
          <input
            type="file"
            ref={inputFileRef}
            onChange={handleFileChange}
            accept="image/*"
            disabled={isUploading}
            style={{ display: 'none' }}
          />
        </label>

        {blobUrl && (
          <button type="button" onClick={handleRemoveImage} className="btn-delete">
            Remover
          </button>
        )}
      </div>
    </div>
  );
} 