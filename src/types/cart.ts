export interface CartItem {
    id: string; // Identificador único da linha do carrinho (ex: "prod1-fatia" ou "prod1-M")
    productId: string;
    productName: string;
    productImage: string;
    sizeName: string; // Ex: 'Tamanho Único', 'P', 'M', 'G', 'Fatia'
    price: number; // Preço unitário em Reais (R$)
    quantity: number;
    categoryName?: string;
  }
  
  export interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'id'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    subtotal: number;
    totalItems: number;
  } 