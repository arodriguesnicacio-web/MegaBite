export interface MockProductSize {
    id: string;
    sizeName: string;
    price: number;
  }
  
  export interface MockProduct {
    id: string;
    name: string;
    description: string;
    image: string;
    category: {
      id: string;
      name: string;
    };
    sizes: MockProductSize[];
  }
  
  export const MOCK_PRODUCTS: MockProduct[] = [
    {
      id: 'prod-bolo-chocolate',
      name: 'Bolo de Chocolate Artesanal',
      description: 'Bolo fofinho de chocolate meio amargo com cobertura cremosa de brigadeiro e granulado nobre.',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=60',
      category: {
        id: 'cat-bolos',
        name: 'Bolos Especialidades',
      },
      sizes: [
        { id: 'size-1', sizeName: 'P (10 fatias)', price: 65.0 },
        { id: 'size-2', sizeName: 'M (20 fatias)', price: 110.0 },
        { id: 'size-3', sizeName: 'G (30 fatias)', price: 155.0 },
        { id: 'size-4', sizeName: 'Fatia Individual', price: 14.50 },
      ],
    },
    {
      id: 'prod-torta-limao',
      name: 'Torta de Limão Siciliano',
      description: 'Massa crocante sablée, recheio cremoso de limão siciliano e cobertura de merengue suíço maçaricado.',
      image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=600&auto=format&fit=crop&q=60',
      category: {
        id: 'cat-tortas',
        name: 'Tortas Finas',
      },
      sizes: [
        { id: 'size-5', sizeName: 'Tamanho Único', price: 85.0 },
        { id: 'size-6', sizeName: 'Fatia Individual', price: 12.0 },
      ],
    },
    {
      id: 'prod-cupcake-red-velvet',
      name: 'Cupcake Red Velvet',
      description: 'Massa aveludada de baunilha e cacau com recheio e cobertura tradicionais de cream cheese.',
      image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=600&auto=format&fit=crop&q=60',
      category: {
        id: 'cat-doces',
        name: 'Doces Finais',
      },
      sizes: [
        { id: 'size-7', sizeName: 'Tamanho Único', price: 12.50 },
      ],
    },
  ]; 