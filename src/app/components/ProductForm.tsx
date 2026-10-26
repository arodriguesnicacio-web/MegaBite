'use client';

import { useState } from 'react';
import { upload } from '@vercel/blob/client';

export function ProductForm() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validação no cliente antes do envio
    if (file.size > 2 * 1024 * 1024) {
      setError('O arquivo deve ter no máximo 2 MB.');
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Formato inválido. Envie apenas JPG, PNG ou WEBP.');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });

      setImageUrl(newBlob.url);
    } catch (err) {
      setError('Falha ao enviar imagem. Verifique as credenciais do Blob.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-sm">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Imagem do Produto (Máx. 2MB)
      </label>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        disabled={uploading}
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
      />

      {uploading && <p className="mt-2 text-sm text-gray-500">A enviar imagem...</p>}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      
      {imageUrl && (
        <div className="mt-4">
          <p className="text-xs text-green-600 mb-1">Upload realizado com sucesso!</p>
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-40 object-cover rounded-md border border-gray-200"
          />
          <input type="hidden" name="imageUrl" value={imageUrl} />
        </div>
      )}
    </div>
  );
} 