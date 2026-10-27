'use server';

import { put } from '@vercel/blob';

export async function uploadImageAction(formData: FormData): Promise<string> {
  const file = formData.get('file') as File;

  if (!file || file.size === 0) {
    throw new Error('Nenhum ficheiro enviado.');
  }

  // Adicionado addRandomSuffix: true para evitar conflitos de nomes duplicados
  const blob = await put(file.name, file, {
    access: 'public',
    addRandomSuffix: true,
  });

  return blob.url;
} 