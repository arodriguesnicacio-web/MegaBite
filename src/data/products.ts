export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Bolo Red Velvet",
    slug: "bolo-red-velvet",
    description: "Massa aveludada com toque sutil de cacau e recheio cremoso de cream cheese tradicional.",
    price: 85.0,
    category: "Bolos de Festa",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=500&q=80",
  },
  {
    id: "2",
    name: "Brigadeiros Gourmet (Caixa c/ 12)",
    slug: "brigadeiros-gourmet",
    description: "Seleção de brigadeiros artesanais feitos com chocolate belga 70% e confeitos finos variados.",
    price: 36.0,
    category: "Doces Tradicionais",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=80",
  },
  {
    id: "3",
    name: "Torta de Limão Siciliano",
    slug: "torta-limao-siciliano",
    description: "Massa crocante sablé, recheio de limão siciliano cremoso e merengue suíço maçaricado.",
    price: 65.0,
    category: "Bolos de Festa",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=500&q=80",
  },
  {
    id: "4",
    name: "Empadão de Frango com Requeijão",
    slug: "empadao-frango",
    description: "Massa podre tradicional que derrete na boca com recheio cremoso e generoso de frango desfiatado.",
    price: 55.0,
    category: "Salgados",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80",
  },
  {
    id: "5",
    name: "Brownie Recheado com Ninho e Nutella",
    slug: "brownie-ninho-nutella",
    description: "Brownie denso e chocolatudo com casquinha crocante e recheio duplo de Leite Ninho e Nutella original.",
    price: 14.0,
    category: "Doces Tradicionais",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80",
  },
  {
    id: "6",
    name: "Kit Festa Aniversário (Serva 15 pessoas)",
    slug: "kit-festa-aniversario",
    description: "Inclui 1 Bolo de 1,5kg (Chocolate ou Baunilha), 50 Salgados sortidos e 30 Brigadeiros Gourmet.",
    price: 180.0,
    category: "Kits Festa",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=500&q=80",
  },
]; 