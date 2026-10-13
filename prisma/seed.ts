import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("🌱 Iniciando o povoamento do banco de dados (seed)...");

  // 1. Criar Usuário Administrador Principal
  const admin = await prisma.user.upsert({
    where: { email: "admin@megabite.com.br" },
    update: {},
    create: {
      name: "Confeitaria MegaBite",
      email: "admin@megabite.com.br",
      phone: "(28) 99999-8888",
      role: "FUNCIONARIO",
    },
  });

  console.log(`👤 Usuário administrador criado/encontrado: ${admin.email}`);

  // 2. Criar Categorias Iniciais
  const categoriesData = [
    { name: "Bolos", description: "Bolos recheados e confeitados para celebrações" },
    { name: "Cupcakes", description: "Mini bolos individuais decorados" },
    { name: "Brownies", description: "Brownies tradicionais e recheados" },
    { name: "Tortas", description: "Tortas doces e finas de diversos sabores" },
    { name: "Doces", description: "Brigadeiros gourmet, beijinhos e trufas" },
    { name: "Kits", description: "Kits completos para festas e aniversários" },
  ];

  const categoriesMap: Record<string, string> = {};

  for (const cat of categoriesData) { 
    const createdCat = await prisma.category.upsert({
      where: { name: cat.name },
      update: { description: cat.description },
      create: cat,
    });
    categoriesMap[cat.name] = createdCat.id;
  }

  console.log("📂 Categorias inseridas com sucesso.");

  // 3. Criar Produtos Realistas (8+ Registros)
  const products = [
    {
      name: "Bolo Trufado de Chocolate Nobre",
      description: "Bolo de massa fofinha de cacau 70% com recheio cremoso de trufa de chocolate meio amargo e cobertura de ganache artesanal.",
      ingredients: "Farinha de trigo, ovos, açúcar, cacau em pó 70%, creme de leite, chocolate meio amargo, manteiga.",
      allergens: "Contém glúten, lactose e ovos. Pode conter traços de nozes.",
      packaging: "Caixa reforçada com prato rígido para transporte seguro.",
      categoryName: "Bolos",
      sizes: [
        { sizeName: "P", price: 65.00, weight: "1,0 kg (serve ~8 pessoas)" },
        { sizeName: "M", price: 95.00, weight: "1,8 kg (serve ~15 pessoas)" },
        { sizeName: "G", price: 140.00, weight: "2,8 kg (serve ~25 pessoas)" },
      ],
    },
    {
      name: "Bolo Red Velvet com Cream Cheese",
      description: "Massa aveludada de cor vermelha vibrante com toque sutil de baunilha e recheio cremoso de cream cheese tradicional.",
      ingredients: "Farinha de trigo, açúcar, ovos, cream cheese, manteiga, cacau, corante alimentício vermelho, baunilha.",
      allergens: "Contém glúten, lactose e ovos.",
      packaging: "Caixa para bolo decorada e transparente.",
      categoryName: "Bolos",
      sizes: [
        { sizeName: "P", price: 70.00, weight: "1,0 kg (serve ~8 pessoas)" },
        { sizeName: "M", price: 105.00, weight: "1,8 kg (serve ~15 pessoas)" },
      ],
    },
    {
      name: "Cupcake de Red Velvet Ninho",
      description: "Mini bolo Red Velvet com recheio de Leite Ninho cremoso e cobertura em espiral de chantininho suave.",
      ingredients: "Farinha de trigo, leite em pó, cream cheese, ovos, açúcar, manteiga.",
      allergens: "Contém glúten, lactose e ovos.",
      packaging: "Caixa individual para presente.",
      categoryName: "Cupcakes",
      sizes: [
        { sizeName: "Unidade", price: 12.00, weight: "120g" },
        { sizeName: "Caixa c/ 4", price: 44.00, weight: "480g" },
      ],
    },
    {
      name: "Brownie Recheado com Doce de Leite",
      description: "Brownie tradicional americano com casquinha crocante, massa densa e recheio generoso de doce de leite caseiro.",
      ingredients: "Chocolate 50%, açúcar, manteiga, ovos, farinha de trigo, doce de leite artesanal.",
      allergens: "Contém glúten, lactose e ovos.",
      packaging: "Embalagem individual celofane selada.",
      categoryName: "Brownies",
      sizes: [
        { sizeName: "Unidade", price: 9.50, weight: "90g" },
        { sizeName: "Caixa c/ 6", price: 54.00, weight: "540g" },
      ],
    },
    {
      name: "Torta Holandesa de Baunilha",
      description: "Base crocante de biscoitos calipso com creme leve de baunilha e cobertura aveludada de ganache de chocolate.",
      ingredients: "Biscoito calipso, creme de leite, leite condensado, baunilha, chocolate meio amargo, gelatina.",
      allergens: "Contém glúten e lactose.",
      packaging: "Torta servida em embalagem plástica de alta resistência.",
      categoryName: "Tortas",
      sizes: [
        { sizeName: "Média", price: 80.00, weight: "1,2 kg" },
        { sizeName: "Grande", price: 120.00, weight: "2,0 kg" },
      ],
    },
    {
      name: "Torta de Limão com Merengue Suíço",
      description: "Massa sablée crocante, recheio cítrico de limão taiti cremoso e cobertura de merengue maçaricado.",
      ingredients: "Farinha de trigo, manteiga, suco de limão taiti, leite condensado, claras de ovos, açúcar.",
      allergens: "Contém glúten, lactose e ovos.",
      packaging: "Caixa reforçada para transporte.",
      categoryName: "Tortas",
      sizes: [
        { sizeName: "Média", price: 75.00, weight: "1,1 kg" },
      ],
    },
    {
      name: "Cento de Brigadeiros Gourmet Sortidos",
      description: "Seleção com 100 brigadeiros artesanais: 25 Ao Leite, 25 Ninho com Nutella, 25 Churros e 25 Meio Amargo.",
      ingredients: "Leite condensado, creme de leite, cacau em pó, Nutella, doce de leite, confeitos de chocolate.",
      allergens: "Contém lactose. Pode conter glúten e avelã.",
      packaging: "Caixa organizadora para festa com forminhas finas.",
      categoryName: "Doces",
      sizes: [
        { sizeName: "Cento (100 un)", price: 130.00, weight: "1,5 kg" },
        { sizeName: "Meio Cento (50 un)", price: 70.00, weight: "750g" },
      ],
    },
    {
      name: "Kit Festa Ouro (Servirá até 15 pessoas)",
      description: "Combinação perfeita contendo: 1 Bolo Trufado M (1,8kg), 50 Brigadeiros Sortidos e 6 Cupcakes decorados.",
      ingredients: "Ingredientes diversos dos produtos inclusos no kit.",
      allergens: "Contém glúten, lactose e ovos.",
      packaging: "Conjunto de caixas temáticas para presente e transporte.",
      categoryName: "Kits",
      sizes: [
        { sizeName: "Kit Completo", price: 230.00, weight: "Aprox. 3,5 kg" },
      ],
    },
  ];

  for (const prod of products) {
    const categoryId = categoriesMap[prod.categoryName];

    // Verificar se produto já existe
    const existingProduct = await prisma.product.findFirst({
      where: { name: prod.name },
    });

    if (!existingProduct) {
      await prisma.product.create({
        data: {
          name: prod.name,
          description: prod.description,
          ingredients: prod.ingredients,
          allergens: prod.allergens,
          packaging: prod.packaging,
          categoryId,
          createdById: admin.id,
          sizes: {
            create: prod.sizes,
          },
        },
      });
    }
  }

  console.log("🎂 Produtos e variações de tamanho inseridos com sucesso.");
  console.log("✅ Seed finalizado com êxito!");
}

main()
  .catch((e) => {
    console.error("❌ Erro durante o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 