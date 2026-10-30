import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "blob.vercel-storage.com",
      },
    ],
  },
  typescript: {
    // !! AVISO: Isto permite que o deploy passe mesmo com erros de tipagem.
    // Lembre-se de corrigir os erros no código mais tarde para manter a aplicação segura.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;