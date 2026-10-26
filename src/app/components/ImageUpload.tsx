'use client';

import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';

export function ImageUpload() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!inputFileRef.current?.files?.[0]) {
      alert('Por favor, selecione um arquivo primeiro.');
      return;
    }

    const file = inputFileRef.current.files[0];
    setIsUploading(true);

    try {
      // Faz o upload seguro utilizando a rota da API que configuramos (/api/upload)
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload', // Aponta para a sua API Route
      });

      setBlobUrl(newBlob.url);
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      alert('Ocorreu um erro ao enviar a imagem.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-4 p-4 border rounded-lg">
      <input
        type="file"
        ref={inputFileRef}
        accept="image/jpeg, image/png, image/webp"
        disabled={isUploading}
      />

      <button
        onClick={handleUpload}
        disabled={isUploading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        {isUploading ? 'Enviando...' : 'Fazer Upload'}
      </button>

      {blobUrl && (
        <div className="mt-4">
          <p className="text-sm text-green-600 mb-2">Upload concluído com sucesso!</p>
          <img
            src={blobUrl}
            alt="Imagem enviada"
            className="max-w-xs rounded shadow"
          />
        </div>
      )}
    </div>
  );
} 