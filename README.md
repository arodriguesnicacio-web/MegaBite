# <MegaBite>
**Nicho:** <Confeitaria por encomenda> · **Grupo:** <nº 9>
**Dupla:** <Amanda Rodrigues Nicácio> (@arodriguesnicacio-web) · <Letícia Nascimento Souza> (@Lettyy09)
**Sistema no ar:** https://megabite-six.vercel.app/ 

## O que o sistema faz

O **MegaBite** é um sistema web para a gestão e venda de produtos artesanais de confeitaria. A plataforma permite que clientes naveguem pelo catálogo completo de doces, bolos e salgados, façam buscas, filtrem por categoria, consultem detalhes de ingredientes e alérgenos, e realizem pedidos de orçamento personalizados via formulário e integração com WhatsApp. O sistema conta ainda com um painel administrativo protegido para funcionários gerenciarem o catálogo de produtos, atualizarem o status de orçamentos e acompanharem os pedidos.

## Páginas para testar
 Pública: `/produtos` (Catálogo completo de produtos de confeitaria)
- Busca (exemplo que encontra algo): `/produtos?busca=bolo`
- Protegida (pede login): `/admin` (Painel restrito a funcionários para gestão de produtos e orçamentos)


## Banco de dados
O banco de dados foi modelado utilizando PostgreSQL e mapeado via Prisma ORM. As principais tabelas e suas relações são:

- **`User` / `Account` / `Session` / `Verification`**: Tabelas do ecossistema de autenticação (Better Auth). Armazenam dados de usuários, sessões e permissões (`role`: `CLIENTE` ou `FUNCIONARIO`).
- **`Product`**: Armazena os itens da confeitaria (nome, descrição, categoria, ingredientes, alergênicos, embalagem, fotos e flags `isActive`/`isAvailable`).
  - *Relação:* Um produto é criado por um `User` (`FUNCIONARIO`) e possui vários `ProductSize` e `OrderItem`.
- **`ProductSize`**: Define as opções de tamanhos, porções e preços específicos de cada produto.
  - *Relação:* Pertence a um `Product`.
- **`QuoteRequest`**: Registra as solicitações de orçamento personalizadas enviadas pelos clientes (dados de contato, data do evento, número de fatias/porções, sabor, observações e status `QuoteStatus`).
  - *Relação:* Associado opcionalmente a um `User` e a um `Product`.
- **`Order` & `OrderItem`**: Estrutura para gerenciamento de vendas e histórico comercial de compras e status do pedido.
  - *Relação:* `Order` pertence a um `User` e contém múltiplos `OrderItem`, cada um vinculado a um `Product`.


## Como rodar no computador

### 1. Pré-requisitos

Antes de começar, instale:

- [Node.js](https://nodejs.org/) — versão compatível com o projeto.
- [Git](https://git-scm.com/).
- PostgreSQL ou acesso a um banco PostgreSQL já configurado.

### 2. Clonar o repositório

Abra o terminal e execute:

```bash
git clone https://github.com/arodriguesnicacio-web/MegaBite.git
cd MegaBite
```

### 3. Instalar as dependências

Na pasta do projeto, execute:

```bash
npm install
```

### 4. Configurar as variáveis de ambiente

Crie um arquivo chamado `.env` na raiz do projeto, no mesmo nível do `package.json`, e configure as seguintes variáveis:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/megabite?schema=public"
BETTER_AUTH_SECRET="seu-segredo-aqui"
BETTER_AUTH_URL="http://localhost:3000"
BLOB_READ_WRITE_TOKEN="seu-token-vercel-blob"
```

**Importante:** substitua os valores de exemplo pelas credenciais correspondentes ao seu ambiente. O banco de dados `megabite` deve existir e estar acessível.

- `DATABASE_URL`: endereço de conexão com o banco PostgreSQL.
- `BETTER_AUTH_SECRET`: chave secreta utilizada pela autenticação.
- `BETTER_AUTH_URL`: endereço local da aplicação.
- `BLOB_READ_WRITE_TOKEN`: token de acesso ao armazenamento de arquivos da Vercel Blob, caso utilizado.

Não compartilhe o arquivo `.env` nem envie credenciais reais ao GitHub.

### 5. Configurar o banco de dados

Gere o Prisma Client:

```bash
npx prisma generate
```

Aplique as migrações existentes ao banco de dados:

```bash
npx prisma migrate dev
```

**Observação:** esses comandos pressupõem que o projeto esteja configurado para utilizar o Prisma CLI dessa forma. Se a versão instalada exigir configurações adicionais, siga as instruções específicas do projeto.

### 6. Popular o banco de dados (opcional)

Caso o projeto tenha um script de seed configurado, execute:

```bash
npx prisma db seed
```

Esse comando insere os dados iniciais definidos pelo projeto.

### 7. Iniciar o servidor

Execute:

```bash
npm run dev
```

### 8. Acessar a aplicação

Abra o navegador e acesse:

http://localhost:3000


## Como usamos a IA
- IA usada: ChatGPT e Gemini
- Os 3 pedidos (prompts) que mais ajudaram:

Prompt 1
    Sim. Eu faria um **questionário de levantamento completo**, mas organizado em blocos, para que depois as respostas possam ser transformadas em um **“prompt mestre” + prompts de implementação por etapa**.

A ideia é que a IA que receber os prompts consiga **construir praticamente todo o sistema**, mas de uma maneira organizada, modular e fácil de editar depois — e não gerar um código gigante impossível de entender.

O questionário abaixo também considera as exigências do trabalho: autenticação, Prisma/PostgreSQL/Neon, duas entidades do nicho, CRUD, autorização no servidor, Vercel Blob, página pública, busca por URL, responsividade, deploy e documentação. Markdown.md colado

# 📋 QUESTIONÁRIO COMPLETO — PROJETO DA CONFEITARIA

**Como responder:** você pode responder diretamente abaixo de cada pergunta.  
Se ainda não souber alguma coisa, coloque **“NÃO SEI”**. Nesse caso, depois eu posso definir uma opção adequada para o projeto.

---

## 🟣 BLOCO 1 — IDENTIDADE DO PROJETO

### 1. Nome do sistema

Qual será o nome do site/sistema?

> Ex.: Doce Encanto, Açúcar & Afeto, Confeitaria da Leh...

**Resposta:**

---

### 2. Nome da confeitaria

É o mesmo nome do sistema?

- [ ] Sim
- [ ] Não

Se não, qual?

**Resposta:**

---

### 3. O sistema será fictício ou baseado em uma confeitaria real?

- [ ] Totalmente fictício
- [ ] Baseado em uma confeitaria real
- [ ] Mistura dos dois

**Resposta:**

---

### 4. Qual será o estilo da confeitaria?

Escolha quantos quiser:

- [ ] Elegante/chique
- [ ] Minimalista
- [ ] Fofo/delicado
- [ ] Moderno
- [ ] Luxuoso
- [ ] Artesanal/rústico
- [ ] Colorido
- [ ] Romântico
- [ ] Jovem
- [ ] Outro: _______

**Resposta:**

---

### 5. Qual sensação o site deve passar?

Ex.:

> “Quero que pareça uma confeitaria cara e sofisticada, mas sem ficar exagerada.”

**Resposta:**

---

# 🎨 BLOCO 2 — IDENTIDADE VISUAL

### 6. Cores principais

Você já possui cores definidas?

- [ ] Sim
- [ ] Não

Se sim:

**Cor principal:**  
**Cor secundária:**  
**Cor de destaque:**  
**Cor do fundo:**  
**Cor dos textos:**

---

### 7. Existe uma referência visual?

Você possui:

- [ ] Imagem
- [ ] Site
- [ ] Instagram
- [ ] Pinterest
- [ ] Figma
- [ ] Nenhuma

Se tiver, envie posteriormente.

**Resposta:**

---

### 8. Como você quer os cards dos produtos?

- [ ] Foto grande + nome + preço
- [ ] Foto + nome + descrição + preço
- [ ] Card minimalista
- [ ] Card com bastante informação
- [ ] Outro: _______

**Resposta:**

---

### 9. Formato das imagens dos produtos

- [ ] Quadradas
- [ ] Retangulares
- [ ] 4:3
- [ ] 16:9
- [ ] Não sei

**Resposta:**

---

### 10. Você quer animações?

- [ ] Nenhuma
- [ ] Poucas e discretas
- [ ] Moderadas
- [ ] Bastante animação

Se quiser, quais?

**Resposta:**

---

# 🍰 BLOCO 3 — PRODUTOS

Esta será uma das principais entidades do sistema.

### 11. Quais tipos de produtos serão vendidos?

Ex.:

- Bolos
- Doces
- Brownies
- Cupcakes
- Tortas
- Kits
- Docinhos

**Resposta:**

---

### 12. Quais informações cada produto deverá possuir?

Marque:

- [ ] Nome
- [ ] Descrição
- [ ] Preço
- [ ] Imagem
- [ ] Categoria
- [ ] Peso/tamanho
- [ ] Quantidade
- [ ] Disponibilidade
- [ ] Ingredientes
- [ ] Alergênicos
- [ ] Outro: _______

**Resposta:**

---

### 13. O produto terá apenas um preço?

- [ ] Sim
- [ ] Não, varia conforme tamanho
- [ ] Não, varia conforme quantidade
- [ ] Outro

**Resposta:**

---

### 14. Haverá categorias?

- [ ] Sim
- [ ] Não

Se sim, quais?

**Resposta:**

---

### 15. Produto poderá ser desativado sem ser excluído?

Exemplo:

> Um bolo saiu temporariamente do catálogo, mas você não quer apagar o registro.

- [ ] Sim
- [ ] Não

**Resposta:**

---

### 16. Quantas imagens cada produto terá?

- [ ] 1
- [ ] 2
- [ ] Várias
- [ ] Não sei

**Resposta:**

**Minha recomendação para facilitar o projeto:** inicialmente **1 imagem por produto**.

---

# 📦 BLOCO 4 — ENCOMENDAS

A segunda entidade principal será **Encomenda**.

### 17. Como uma encomenda funcionará?

Escolha:

- [ ] Cliente escolhe um produto e faz uma encomenda
- [ ] Cliente solicita orçamento
- [ ] Cliente apenas informa interesse
- [ ] Outro

**Resposta:**

---

### 18. Uma encomenda poderá ter vários produtos?

- [ ] Sim
- [ ] Não
- [ ] Não sei

**Resposta:**

⚠️ Essa resposta é importante porque muda bastante a estrutura do banco.

---

### 19. Quais informações uma encomenda deverá possuir?

- [ ] Produto
- [ ] Quantidade
- [ ] Data de retirada
- [ ] Nome do cliente
- [ ] Telefone
- [ ] E-mail
- [ ] Observação
- [ ] Status
- [ ] Valor total
- [ ] Data da encomenda
- [ ] Outro: _______

**Resposta:**

---

### 20. Quais status uma encomenda poderá ter?

Exemplo:

- Pendente
- Confirmada
- Em produção
- Pronta
- Retirada
- Cancelada

**Resposta:**

---

### 21. O cliente poderá cancelar a encomenda?

- [ ] Sim
- [ ] Não
- [ ] Apenas administrador
- [ ] Não sei

**Resposta:**

---

### 22. Haverá pagamento pelo site?

- [ ] Não
- [ ] Sim, Pix
- [ ] Sim, cartão
- [ ] Sim, outro
- [ ] Apenas registro da encomenda

**Resposta:**

💡 **Para este trabalho, eu recomendaria não implementar pagamento real**, a menos que seja exigido. Isso adicionaria bastante complexidade desnecessária.

---

# 👤 BLOCO 5 — USUÁRIOS E LOGIN

O trabalho exige autenticação e proteção das operações de criação/edição/exclusão. Markdown.md colado

### 23. Quem poderá criar conta?

- [ ] Qualquer visitante
- [ ] Apenas funcionários
- [ ] Apenas administrador
- [ ] Outro

**Resposta:**

---

### 24. Quais dados serão solicitados no cadastro?

- [ ] Nome
- [ ] E-mail
- [ ] Senha
- [ ] Telefone
- [ ] Outro: _______

**Resposta:**

---

### 25. Haverá diferentes níveis de usuário?

Ex.:

- Administrador
- Funcionário
- Cliente

- [ ] Sim
- [ ] Não

**Resposta:**

---

### 26. Quem poderá cadastrar produtos?

- [ ] Qualquer usuário logado
- [ ] Administrador
- [ ] Funcionário
- [ ] Outro

**Resposta:**

---

### 27. Quem poderá editar produtos?

**Resposta:**

---

### 28. Quem poderá excluir produtos?

**Resposta:**

---

### 29. Quem poderá visualizar as encomendas?

**Resposta:**

---

### 30. Um usuário poderá alterar registros criados por outro usuário?

- [ ] Sim
- [ ] Não
- [ ] Depende do tipo de usuário

**Resposta:**

💡 O trabalho exige que a autorização seja verificada **no servidor**, não apenas escondendo botões na interface. Markdown.md colado

---

# 🌎 BLOCO 6 — PARTE PÚBLICA DO SITE

A atividade exige uma página pública com pelo menos 8 registros realistas e busca por URL. Markdown.md colado

### 31. O visitante sem login poderá fazer o quê?

Marque:

- [ ] Ver produtos
- [ ] Pesquisar produtos
- [ ] Filtrar por categoria
- [ ] Ver detalhes
- [ ] Fazer encomenda
- [ ] Criar conta
- [ ] Fazer login
- [ ] Outro

**Resposta:**

---

### 32. Qual será a página inicial?

- [ ] Catálogo de produtos
- [ ] Página institucional + catálogo
- [ ] Landing page
- [ ] Outra

**Resposta:**

---

### 33. Quais seções a Home terá?

Ex.:

- Header
- Banner
- Sobre a confeitaria
- Produtos
- Como encomendar
- Contato
- Footer

**Resposta:**

---

### 34. Terá página individual do produto?

Ex.:

`/produtos/bolo-chocolate`

- [ ] Sim
- [ ] Não

**Resposta:**

---

### 35. Como será a busca?

O visitante poderá pesquisar por:

- [ ] Nome
- [ ] Categoria
- [ ] Número/ID
- [ ] Descrição
- [ ] Todos

**Resposta:**

---

### 36. Haverá filtros?

- [ ] Categoria
- [ ] Preço
- [ ] Disponibilidade
- [ ] Nenhum
- [ ] Outro

**Resposta:**

---

# 🔐 BLOCO 7 — ÁREA ADMINISTRATIVA

### 37. Qual será o endereço da área administrativa?

Ex.:

`/dashboard`

- [ ] `/dashboard`
- [ ] `/admin`
- [ ] `/painel`
- [ ] Outro

**Resposta:**

---

### 38. O dashboard terá quais páginas?

Sugestão:

- `/dashboard`
- `/dashboard/produtos`
- `/dashboard/produtos/novo`
- `/dashboard/encomendas`
- `/dashboard/perfil`

**Resposta:**

---

### 39. O dashboard terá menu lateral?

- [ ] Sim
- [ ] Não
- [ ] Menu superior
- [ ] Não sei

**Resposta:**

---

### 40. O dashboard inicial mostrará indicadores?

Ex.:

- Total de produtos
- Encomendas pendentes
- Encomendas do dia
- Produtos cadastrados

- [ ] Sim
- [ ] Não

**Resposta:**

---

# 📱 BLOCO 8 — RESPONSIVIDADE

O trabalho exige que o site funcione em **375 px sem rolagem horizontal**. Markdown.md colado

### 41. O site será pensado para:

- [ ] Celular primeiro
- [ ] Desktop primeiro
- [ ] Ambos simultaneamente

**Resposta:**

---

### 42. Quais dispositivos precisam ser considerados?

- [ ] 375px
- [ ] 390px
- [ ] Tablet
- [ ] Notebook
- [ ] Desktop

**Resposta:**

---

### 43. O dashboard também precisa ser responsivo?

- [ ] Sim
- [ ] Não
- [ ] Apenas parcialmente

**Resposta:**

---

# 🗄️ BLOCO 9 — BANCO DE DADOS

Aqui vamos definir exatamente o que a IA deverá criar no Prisma.

### 44. Confirme as entidades:

**User**  
**Product**  
**Order**

- [ ] Sim
- [ ] Não

**Resposta:**

---

### 45. Relação User → Product

Um usuário poderá possuir vários produtos?

- [ ] Sim
- [ ] Não

**Resposta:**

---

### 46. Relação User → Order

Um usuário poderá possuir várias encomendas?

- [ ] Sim
- [ ] Não

**Resposta:**

---

### 47. Relação Product → Order

Um produto poderá aparecer em várias encomendas?

- [ ] Sim
- [ ] Não

**Resposta:**

---

### 48. Você quer adicionar outras entidades?

Ex.:

`Category`

`Customer`

`Address`

`Payment`

`Ingredient`

**Resposta:**

💡 Se não houver necessidade real, minha tendência será **não adicionar**, para manter o projeto mais simples e explicável.

---

# 🖼️ BLOCO 10 — IMAGENS / VERCEL BLOB

O trabalho exige upload real usando Vercel Blob, com validação de `image/*` e limite de 2 MB. Markdown.md colado

### 49. Onde as imagens serão utilizadas?

- [ ] Produtos
- [ ] Logo
- [ ] Banner
- [ ] Perfil
- [ ] Outros

**Resposta:**

---

### 50. O administrador poderá trocar a imagem de um produto?

- [ ] Sim
- [ ] Não

**Resposta:**

---

### 51. Ao excluir um produto, a imagem também deverá ser removida do Blob?

- [ ] Sim
- [ ] Não
- [ ] Não sei

**Resposta:**

---

# 🧩 BLOCO 11 — EXPERIÊNCIA DO USUÁRIO

### 52. O site terá mensagens de sucesso?

Ex.:

> “Produto cadastrado com sucesso!”

- [ ] Sim
- [ ] Não

---

### 53. Terá confirmação antes de excluir?

Ex.:

> “Tem certeza que deseja excluir este produto?”

- [ ] Sim
- [ ] Não

---

### 54. O que deverá acontecer durante carregamentos?

- [ ] Spinner
- [ ] Skeleton
- [ ] Texto
- [ ] Skeleton + texto
- [ ] Não sei

**Resposta:**

---

### 55. Como erros deverão aparecer?

- [ ] Toast
- [ ] Mensagem dentro do formulário
- [ ] Modal
- [ ] Outro

**Resposta:**

---

# ⚙️ BLOCO 12 — FUNCIONALIDADES EXTRAS

Marque apenas se realmente quiser:

### 56. Deseja:

- [ ] Favoritos
- [ ] Dark mode
- [ ] Compartilhar produto
- [ ] WhatsApp
- [ ] Página "Sobre nós"
- [ ] Contato
- [ ] FAQ
- [ ] Galeria
- [ ] Cupons
- [ ] Avaliações
- [ ] Outro

**Resposta:**

⚠️ Quanto mais funcionalidades, maior a chance de o projeto ficar difícil de explicar no seminário.

---

# 🧑‍💻 BLOCO 13 — PREFERÊNCIAS DE CÓDIGO

Essa parte é **muito importante** para fazer a IA gerar um projeto que vocês consigam editar.

### 57. Qual nível de programação vocês possuem?

- [ ] Iniciante absoluto
- [ ] Iniciante
- [ ] Intermediário
- [ ] Avançado

**Resposta:**

---

### 58. Quais tecnologias vocês já conhecem?

- [ ] HTML
- [ ] CSS
- [ ] JavaScript
- [ ] TypeScript
- [ ] React
- [ ] Next.js
- [ ] SQL
- [ ] Prisma
- [ ] Git/GitHub
- [ ] Nenhuma

**Resposta:**

---

### 59. A IA deve evitar código muito avançado?

- [ ] Sim
- [ ] Não
- [ ] Só quando houver alternativa simples

**Resposta:**

---

### 60. Como a IA deve explicar o código?

- [ ] Só explicar quando eu perguntar
- [ ] Explicar cada arquivo
- [ ] Explicar cada bloco importante
- [ ] Explicar linha por linha quando necessário

**Resposta:**

---

### 61. Você quer que a IA mantenha o código simples mesmo que fique um pouco maior?

- [ ] Sim
- [ ] Não
- [ ] Equilibrar simplicidade e organização

**Resposta:**

💡 **Eu recomendaria “equilibrar simplicidade e organização”.**

---

# 🧱 BLOCO 14 — ORGANIZAÇÃO DO PROJETO

### 62. Você quer componentes reutilizáveis?

Ex.:

```text
ProductCard
Button
Input
Modal
Header
Footer
```

- [ ] Sim
- [ ] Não
- [ ] Não sei

**Resposta:**

---

### 63. Você prefere:

- [ ] Poucos arquivos e código mais concentrado
- [ ] Muitos arquivos bem separados
- [ ] Equilíbrio

**Resposta:**

💡 Para vocês, eu recomendaria **equilíbrio**.

---

### 64. Você quer que a IA nunca misture:

- banco de dados
- regras de negócio
- interface

em um único arquivo?

- [ ] Sim
- [ ] Não
- [ ] Não sei

**Resposta:**

💡 **Sim** é o que eu escolheria.

---

### 65. A IA deverá evitar duplicação de código?

- [ ] Sim
- [ ] Não

**Resposta:**

---

# 🤖 BLOCO 15 — COMO A IA DEVERÁ TRABALHAR

Esta talvez seja a parte **mais importante de todas**.

### 66. Você quer que a IA:

- [ ] Gere tudo de uma vez
- [ ] Faça por etapas
- [ ] Faça por etapas, mas entregue código completo de cada etapa

**Resposta:**

💡 **Minha recomendação: terceira opção.**

---

### 67. Antes de modificar arquivos, a IA deverá:

- [ ] Explicar o que será feito
- [ ] Mostrar quais arquivos serão criados/modificados
- [ ] Esperar minha autorização
- [ ] Fazer tudo diretamente

**Resposta:**

---

### 68. Quando houver erro, a IA deverá:

- [ ] Apenas corrigir
- [ ] Explicar o erro + corrigir
- [ ] Explicar o erro + mostrar a causa + corrigir + ensinar como evitar

**Resposta:**

💡 Eu escolheria a **terceira**.

---

### 69. A IA deverá pedir para você testar cada etapa antes de continuar?

- [ ] Sim
- [ ] Não

**Resposta:**

---

### 70. A IA deverá executar uma auditoria depois de cada etapa?

- [ ] Sim
- [ ] Não

**Resposta:**

---

### 71. A IA deverá sempre verificar:

- [ ] TypeScript
- [ ] Prisma
- [ ] Responsividade
- [ ] Segurança
- [ ] Autenticação
- [ ] Permissões
- [ ] Build
- [ ] Variáveis de ambiente
- [ ] Requisitos do trabalho

**Resposta:**

---

# 🧪 BLOCO 16 — TESTES

### 72. Você quer que a IA crie uma lista de testes manuais?

- [ ] Sim
- [ ] Não

---

### 73. Você quer testes separados para:

- [ ] Cadastro
- [ ] Login
- [ ] Logout
- [ ] Produto
- [ ] Encomenda
- [ ] Upload
- [ ] Busca
- [ ] Permissões
- [ ] Mobile
- [ ] Deploy

**Resposta:**

---

# 🚀 BLOCO 17 — GITHUB / VERCEL / DEPLOY

A atividade exige GitHub + Vercel e deploy automático após push/merge. Markdown.md colado

### 74. Já existe um repositório GitHub?

- [ ] Sim
- [ ] Não

**Resposta:**

---

### 75. Já existe projeto na Vercel?

- [ ] Sim
- [ ] Não

**Resposta:**

---

### 76. Já existe banco Neon?

- [ ] Sim
- [ ] Não

**Resposta:**

---

### 77. Já existe Blob configurado?

- [ ] Sim
- [ ] Não

**Resposta:**

---

### 78. Quem será responsável pelo deploy?

- [ ] Pessoa 1
- [ ] Pessoa 2
- [ ] Ambos

**Resposta:**

---

# 👥 BLOCO 18 — DUPLA

O trabalho exige participação dos dois integrantes e commits em dias diferentes. Markdown.md colado

### 79. Nome do integrante 1:

**Resposta:**

### 80. Nome do integrante 2:

**Resposta:**

---

### 81. Quem possui mais facilidade com programação?

**Resposta:**

---

### 82. Quem possui mais facilidade com design?

**Resposta:**

---

### 83. Como vocês querem dividir o trabalho?

- [ ] Front-end / Back-end
- [ ] Funcionalidades
- [ ] Cada um faz partes completas
- [ ] Outra divisão

**Resposta:**

---

# 📚 BLOCO 19 — SEMINÁRIO

### 84. Vocês precisarão apresentar o código?

- [ ] Sim
- [ ] Não
- [ ] Não sei

---

### 85. A IA deverá preparar vocês para explicar:

- [ ] Next.js
- [ ] React
- [ ] TypeScript
- [ ] Prisma
- [ ] PostgreSQL
- [ ] Neon
- [ ] Better Auth
- [ ] Server Actions
- [ ] Vercel Blob
- [ ] GitHub
- [ ] Vercel
- [ ] Segurança
- [ ] Relações do banco

**Resposta:**

---

### 86. Quer que a IA simule perguntas do professor?

- [ ] Sim
- [ ] Não

---

### 87. Nível da simulação:

- [ ] Fácil
- [ ] Médio
- [ ] Difícil
- [ ] Professor tentando achar erros no projeto

**Resposta:**

---

# 📖 BLOCO 20 — README E DIÁRIO DE BORDO

A atividade exige documentação, incluindo como a IA foi utilizada, três prompts importantes e um erro específico da IA e sua correção. Markdown.md colado

### 88. Quer que a IA mantenha um diário de desenvolvimento?

- [ ] Sim
- [ ] Não

**Resposta:**

---

### 89. O diário deverá registrar:

- [ ] Data
- [ ] Etapa
- [ ] Prompt utilizado
- [ ] O que a IA fez
- [ ] Erros
- [ ] Correções
- [ ] O que vocês aprenderam
- [ ] Commit
- [ ] Alterações feitas manualmente

**Resposta:**

---

### 90. A IA deverá ajudar a criar o README?

- [ ] Sim
- [ ] Não

---

# 🧠 BLOCO 21 — LIMITES DO PROJETO

### 91. Existe alguma funcionalidade que você NÃO quer?

**Resposta:**

---

### 92. Existe alguma tecnologia que você NÃO quer usar além das obrigatórias?

**Resposta:**

---

### 93. Existe alguma coisa que você quer manter extremamente simples?

**Resposta:**

---

### 94. Qual é a prioridade?

Escolha **3**:

- [ ] Facilidade de desenvolver
- [ ] Facilidade de editar
- [ ] Visual bonito
- [ ] Funcionalidade
- [ ] Segurança
- [ ] Código fácil de explicar
- [ ] Nota
- [ ] Performance
- [ ] Organização
- [ ] Rapidez para terminar

**Resposta:**

---

# ⭐ BLOCO 22 — A PERGUNTA MAIS IMPORTANTE

Imagine que o site já esteja pronto.

### 95. Como você gostaria que fosse a experiência de usar o sistema?

Explique livremente:

> “Eu entro no site e vejo...  
> Depois clico em...  
> Se eu quiser encomendar...  
> Se eu for administrador...  
> No painel eu consigo...”

**Resposta:**

---

# 🚨 BLOCO 23 — O QUE VOCÊ NÃO SABE

### 96. Em quais partes você está mais insegura?

Marque:

- [ ] Next.js
- [ ] React
- [ ] TypeScript
- [ ] Prisma
- [ ] Banco de dados
- [ ] SQL
- [ ] Login
- [ ] Server Actions
- [ ] Upload
- [ ] Git
- [ ] GitHub
- [ ] Vercel
- [ ] Neon
- [ ] CSS
- [ ] Responsividade
- [ ] Tudo 😭
- [ ] Outro

**Resposta:**

---

# 🔥 BLOCO FINAL — DEFINIÇÕES RÁPIDAS

Para eu conseguir transformar tudo isso nos prompts depois, responda também:

| Pergunta | Resposta |
|---|---|
| Nome da confeitaria | |
| Nome do sistema | |
| Estilo visual | |
| Cores | |
| Produto principal | |
| Categorias | |
| Campos do produto | |
| Campos da encomenda | |
| Status da encomenda | |
| Terá pagamento? | |
| Terá cadastro público? | |
| Quem administra? | |
| Quem pode criar produto? | |
| Quem pode editar? | |
| Quem pode excluir? | |
| Relação Produto → Encomenda | |
| Página inicial | |
| Página pública | |
| Dashboard | |
| Funcionalidades extras | |
| Nível de programação | |
| Prioridade nº 1 | |
| Prioridade nº 2 | |
| Prioridade nº 3 | |
| GitHub já criado? | |
| Neon já criado? | |
| Vercel já criado? | |
| Blob já criado? | |
| Integrante 1 | |
| Integrante 2 | |

## 🎯 O que eu vou fazer com suas respostas

Depois que você responder, **não vou simplesmente gerar um prompt gigante**. Vou transformar as respostas em uma estrutura como esta:

**1. Documento Mestre do Projeto**  
→ regras definitivas do sistema  
→ banco de dados  
→ páginas  
→ permissões  
→ funcionalidades  
→ identidade visual  
→ arquitetura

**2. Prompt Mestre para a IA desenvolvedora**  
→ contexto completo do trabalho  
→ regras que ela nunca pode quebrar  
→ padrão de código  
→ organização dos arquivos  
→ comportamento esperado da IA

**3. Prompts de construção por etapa**  
→ configuração  
→ banco  
→ autenticação  
→ produtos  
→ página pública  
→ busca  
→ imagens  
→ encomendas  
→ permissões  
→ responsividade  
→ testes  
→ deploy

**4. Prompts de correção**  
→ erro de Prisma  
→ erro de TypeScript  
→ erro de build  
→ erro de autenticação  
→ erro de banco  
→ erro de Vercel  
→ erro de Blob

**5. Prompt de auditoria final**  
→ verifica o projeto inteiro contra os requisitos R1–R14 e a rubrica da atividade. Markdown.md colado

**6. Prompt de preparação para o seminário**  
→ a IA passa a agir como professora e pergunta sobre **o código que vocês realmente fizeram**, em vez de apenas entregar respostas prontas.

E uma regra que eu colocaria em **todos os prompts**: a IA deve priorizar **código modular, simples e editável**, indicar exatamente quais arquivos criou/modificou, não reescrever partes não relacionadas e, antes de avançar para a próxima funcionalidade, verificar se a etapa atual funciona. Isso combina diretamente com o fluxo de desenvolvimento recomendado na atividade. Markdown.md colado

**Você pode responder o questionário inteiro de uma vez ou por blocos.** Se quiser facilitar, pode começar só pelos **Blocos 1–6**, que já dá para definir a identidade e a estrutura principal da confeitaria.


Prompt 2

# DOCUMENTO MESTRE V2 — MEGABITE

## 1. Identificação

**Nome do sistema:** MegaBite  
**Nicho:** Confeitaria  
**Integrantes:** Letícia Nascimento e Amanda Nicácio  
**Tipo:** Sistema web de gerenciamento e catálogo para confeitaria  
**Objetivo:** Desenvolver um sistema web completo, funcional, responsivo, seguro, organizado e visualmente profissional, atendendo integralmente aos requisitos da atividade acadêmica.

> **Regra principal:** o PDF oficial da atividade é a fonte de verdade para os requisitos da avaliação. Este documento é a fonte de verdade para as decisões e especificações do MegaBite.

---

# 2. REQUISITOS OFICIAIS DA ATIVIDADE

O projeto deverá atender integralmente aos requisitos R1–R14.

## R1 — Dados realistas

O sistema deverá utilizar dados:

- fictícios;
- realistas;
- coerentes com uma confeitaria.

Não utilizar:

- lorem ipsum;
- "teste 1";
- "produto exemplo";
- dados pessoais reais;
- telefones reais;
- endereços reais;
- informações pessoais de terceiros.

Os produtos iniciais deverão possuir informações suficientemente realistas para parecerem registros reais de uma confeitaria.

---

## R2 — Autenticação

O sistema deverá possuir:

- cadastro;
- login;
- logout;
- autenticação por e-mail e senha.

Senhas **nunca** deverão ser armazenadas em texto puro.

A autenticação deverá utilizar a solução definida para o projeto, com **Better Auth**, respeitando as práticas atuais da biblioteca.

---

## R3 — Entidades e relacionamento 1:N

O sistema deverá possuir pelo menos:

- `User`;
- duas entidades pertencentes ao domínio da confeitaria;
- relação **1:N** clara entre duas entidades do domínio.

Para o MegaBite:

```text
Category 1 ───────── N Product
```

Essa será a relação principal utilizada para demonstrar o requisito.

Outras relações também existirão:

```text
User 1 ───────── N Product

User 1 ───────── N Order

Order 1 ───────── N OrderItem

Product 1 ───────── N OrderItem

Product 1 ───────── N ProductSize

User 1 ───────── N QuoteRequest
```

---

# 3. ENTIDADES DO SISTEMA

## User

Representa usuários do sistema.

Papéis:

- CLIENTE;
- FUNCIONARIO.

Relacionamentos:

- produtos cadastrados;
- pedidos;
- solicitações de orçamento.

---

## Category

Representa as categorias dos produtos.

Categorias iniciais:

- Bolos;
- Cupcakes;
- Brownies;
- Tortas;
- Doces;
- Kits.

Relação:

```text
Category 1:N Product
```

---

## Product

Representa os produtos da confeitaria.

Campos conceituais:

- id;
- nome;
- descrição;
- imagem;
- categoria;
- ingredientes;
- alergênicos;
- peso/tamanho;
- embalagem;
- disponibilidade;
- status;
- usuário responsável;
- datas de criação/alteração.

---

## ProductSize

Representa tamanhos e preços.

Exemplo:

```text
Bolo de Chocolate

P → R$45
M → R$65
G → R$85
```

Isso permite que o preço varie conforme o tamanho.

---

## Order

Representa uma encomenda realizada pelo cliente.

Informações:

- cliente;
- data;
- data de retirada;
- nome;
- telefone;
- e-mail;
- observação;
- valor total;
- status;
- pagamento.

---

## OrderItem

Resolve a relação entre pedidos e produtos.

```text
Order
   ↓
OrderItem
   ↓
Product
```

Cada item deverá registrar:

- produto;
- tamanho;
- quantidade;
- preço no momento da compra;
- subtotal.

O preço histórico deve ser preservado.

---

## QuoteRequest

Representa pedidos personalizados.

Possíveis dados:

- tipo de produto;
- quantidade;
- número de pessoas;
- data desejada;
- sabor;
- tamanho;
- tema;
- ingredientes;
- restrições;
- descrição;
- observações;
- status.

---

# 4. R4 — CRUD

## Entidade principal: Product

Deverá possuir CRUD completo:

### Create
Cadastrar.

### Read
Listar.

### Detail
Visualizar detalhes.

### Update
Editar.

### Delete
Excluir.

Também deverá existir a possibilidade de **desativar** um produto sem excluí-lo.

---

## Segunda entidade

A segunda entidade deverá possuir, no mínimo:

- criação;
- listagem.

Para fortalecer o sistema, `Category` também poderá possuir CRUD administrativo, caso isso não aumente desnecessariamente a complexidade.

---

# 5. R5 — AUTORIZAÇÃO

A autorização deverá ser realizada **no servidor**.

Nunca considerar suficiente apenas:

- esconder botão;
- esconder página;
- bloquear pelo frontend.

## Cliente

Pode:

- visualizar produtos;
- pesquisar;
- filtrar;
- favoritar;
- criar pedidos;
- visualizar os próprios pedidos;
- solicitar orçamento;
- visualizar as próprias solicitações;
- editar dados permitidos da própria conta.

Não pode:

- administrar produtos;
- acessar dashboard administrativo;
- acessar pedidos de outros clientes;
- modificar registros pertencentes a outros clientes.

## Funcionário

Pode:

- acessar `/admin`;
- gerenciar produtos;
- visualizar pedidos;
- atualizar pedidos;
- gerenciar solicitações de orçamento.

As Server Actions e rotas protegidas deverão verificar a autorização.

---

# 6. R6 — ÁREA PÚBLICA

A área pública deverá exibir produtos vindos do banco de dados.

Deverá possuir **pelo menos 8 registros realistas**.

Os produtos não poderão estar simplesmente escritos manualmente no JSX.

Fluxo:

```text
PostgreSQL
↓
Prisma
↓
Next.js
↓
Catálogo público
```

---

# 7. R7 — BUSCA E FILTROS

Pesquisa por:

- nome;
- categoria;
- ID;
- descrição.

Filtros:

- categoria;
- preço;
- disponibilidade;
- tamanho;
- ingredientes;
- alergênicos.

A pesquisa/filtro deverá utilizar parâmetros da URL.

Exemplos:

```text
/produtos?busca=chocolate
```

```text
/produtos?categoria=bolos
```

Quando não houver resultados, deverá aparecer uma mensagem clara.

---

# 8. R8 — VERCEL BLOB

As imagens dos produtos deverão utilizar **Vercel Blob**.

Regras:

- upload real;
- aceitar somente `image/*`;
- máximo de 2 MB;
- validação no servidor;
- URL armazenada no banco;
- possibilidade de substituir imagem;
- exclusão do Blob quando o produto for realmente excluído.

Logo e elementos puramente visuais poderão permanecer como assets estáticos se isso simplificar o projeto e não contrariar a atividade.

---

# 9. R9 — VALIDAÇÃO NO SERVIDOR

Toda informação recebida pelo sistema deverá ser validada no servidor.

Exemplos:

- campos obrigatórios;
- strings;
- números;
- preços positivos;
- quantidade positiva;
- datas válidas;
- tamanho válido;
- categoria válida;
- usuário autorizado;
- arquivo de imagem;
- limite de 2 MB.

As mensagens de erro deverão ser claras para o usuário.

---

# 10. R10 — RESPONSIVIDADE

O sistema deverá funcionar em:

- 375px;
- 390px;
- tablet;
- notebook;
- desktop.

### Regra obrigatória

**Não pode existir rolagem horizontal em 375px.**

Testar:

- home;
- catálogo;
- produto;
- login;
- cadastro;
- carrinho;
- checkout;
- pedidos;
- dashboard;
- formulários.

---

# 11. R11 — VERCEL E DEPLOY

O projeto deverá:

- estar publicado na Vercel;
- possuir ambiente de produção;
- possuir deploy automático conectado ao GitHub;
- realizar novo deploy quando houver push no `main`.

Também deverá possuir:

```text
/api/versao
```

Essa rota deverá permitir verificar a versão/commit do código que está em produção.

---

# 12. R12 — GITHUB E README

O repositório deverá ser público e estar na conta pessoal de uma integrante.

A outra integrante deverá ser adicionada como colaboradora.

Não utilizar:

- organização;
- GitHub Classroom.

O `.env` real nunca deverá ser enviado para o GitHub.

Deverá existir:

```text
.env.example
```

sem segredos reais.

---

# 13. README

O README deverá explicar:

- objetivo do projeto;
- funcionalidades;
- tecnologias;
- estrutura;
- banco;
- como executar;
- variáveis de ambiente;
- páginas principais;
- deploy;
- uso de IA;
- três prompts importantes;
- pelo menos um erro da IA;
- como o erro foi corrigido;
- o que as integrantes aprenderam.

---

# 14. R13 — COMMITS

As duas integrantes deverão realizar commits utilizando suas próprias contas do GitHub.

Os commits deverão ocorrer em **vários dias**, demonstrando participação real.

A divisão deverá ocorrer por funcionalidades.

Exemplo:

### Letícia

- frontend público;
- identidade visual;
- catálogo;
- responsividade.

### Amanda

- autenticação;
- banco;
- dashboard;
- pedidos.

Essa divisão é apenas inicial e poderá ser ajustada.

Ambas deverão compreender o projeto inteiro.

---

# 15. R14 — CONGELAMENTO

Depois do prazo oficial de entrega:

**não modificar o repositório nem o site.**

Antes do congelamento:

- executar todos os testes;
- corrigir erros;
- conferir GitHub;
- conferir Vercel;
- conferir banco;
- conferir Blob;
- conferir `.env`;
- conferir README;
- conferir `/api/versao`;
- conferir responsividade;
- conferir requisitos R1–R14.

Depois:

> último commit → último deploy → congelamento.

O projeto deverá permanecer disponível até a apresentação/avaliação.

---

# 16. IDENTIDADE VISUAL

O MegaBite deverá transmitir:

- confiança;
- desejo de consumo;
- aconchego;
- elegância;
- delicadeza;
- modernidade;
- aspecto artesanal;
- tecnologia.

A paleta deverá utilizar tons quentes e aconchegantes, com aparência sofisticada.

O design deverá ser inspirado nas referências fornecidas pela dupla, mas nunca copiado.

---

# 17. HOME

Fluxo sugerido:

```text
HEADER
↓
HERO
↓
CATEGORIAS
↓
SOBRE MEGABITE
↓
PRODUTOS EM DESTAQUE
↓
COMO FUNCIONA
↓
ENCOMENDAS PERSONALIZADAS
↓
AVALIAÇÕES
↓
CONTATO
↓
FOOTER
```

---

# 18. PRODUTOS

Card:

- imagem;
- nome;
- descrição curta;
- preço;
- categoria;
- favorito;
- acesso aos detalhes.

Página individual:

- imagem;
- nome;
- descrição;
- tamanhos;
- preços;
- ingredientes;
- alergênicos;
- embalagem;
- disponibilidade;
- favorito;
- compartilhar;
- adicionar ao carrinho.

---

# 19. CARRINHO

Fluxo:

```text
Produto
↓
Escolha do tamanho
↓
Quantidade
↓
Carrinho
↓
Checkout
↓
Pagamento simulado
↓
Pedido
```

Não será criada uma entidade Cart inicialmente.

O carrinho funcionará no cliente até a finalização.

---

# 20. PEDIDOS

Status:

```text
PENDENTE
↓
CONFIRMADA
↓
EM_PRODUCAO
↓
PRONTA
↓
RETIRADA
```

Também:

```text
CANCELADA
```

---

# 21. PIX SIMULADO

Não haverá integração financeira real.

Será exibido:

- QR Code fictício;
- chave fictícia;
- valor;
- botão "Simular pagamento".

O sistema deixará claro que o pagamento é apenas uma simulação acadêmica.

---

# 22. ORÇAMENTO PERSONALIZADO

Fluxo:

```text
SOLICITADO
↓
EM_ANALISE
↓
ORCAMENTO_ENVIADO
↓
APROVADO / RECUSADO
```

Página:

**"Crie algo do seu jeito"**

---

# 23. FUNCIONALIDADES EXTRAS

O projeto terá:

- favoritos;
- modo escuro;
- compartilhamento;
- Sobre Nós;
- Contato;
- avaliações.

Essas funcionalidades são secundárias.

Se alguma ameaçar o cumprimento dos requisitos obrigatórios, ela deverá ser simplificada antes de comprometer o núcleo do sistema.

---

# 24. UX

O sistema deverá ter:

- loading;
- skeleton;
- mensagens de sucesso;
- mensagens de erro;
- confirmação antes de exclusão;
- estados vazios;
- feedback de ações.

Mensagens temáticas podem ser utilizadas.

Exemplo:

> "🍰 O bolo está no forno..."

---

# 25. ANIMAÇÕES

Utilizar animações moderadas:

- hover;
- imagens;
- botões;
- menus;
- transições.

Evitar exageros.

---

# 26. TECNOLOGIAS

Stack:

- Next.js;
- React;
- TypeScript;
- Prisma;
- PostgreSQL;
- Neon;
- Better Auth;
- Server Actions;
- Vercel Blob;
- GitHub;
- Vercel.

---

# 27. ORGANIZAÇÃO DO CÓDIGO

O código deverá ser:

- modular;
- organizado;
- simples;
- reutilizável;
- fácil de explicar.

Evitar:

- arquivos gigantes;
- fragmentação exagerada;
- duplicação;
- abstrações desnecessárias.

---

# 28. TESTES

Testar:

### Autenticação
- cadastro;
- login;
- logout;
- senha inválida;
- acesso protegido.

### Produtos
- criar;
- listar;
- detalhe;
- editar;
- excluir;
- desativar;
- upload.

### Pedidos
- carrinho;
- checkout;
- criação;
- histórico;
- status.

### Permissões
- cliente → admin;
- cliente → pedido de outro cliente;
- cliente → produto;
- funcionário → administração.

### Busca
- resultados;
- nenhum resultado;
- URL.

### Responsividade
- 375px;
- 390px;
- tablet;
- desktop.

### Deploy
- produção;
- `/api/versao`;
- deploy automático.

---

# 29. DIÁRIO DE BORDO

Cada etapa deverá registrar:

- data;
- responsável;
- objetivo;
- prompt;
- arquivos alterados;
- ação da IA;
- erros;
- causa;
- correção;
- aprendizado;
- alterações manuais;
- commit.

---

# 30. AUDITORIA FINAL R1–R14

Antes da entrega:

```text
[ ] R1 — Dados realistas
[ ] R2 — Cadastro/Login/Logout
[ ] R3 — Entidades + relação 1:N
[ ] R4 — CRUD
[ ] R5 — Autorização no servidor
[ ] R6 — Página pública + 8 registros
[ ] R7 — Busca/filtro pela URL
[ ] R8 — Vercel Blob
[ ] R9 — Validação no servidor
[ ] R10 — 375px sem scroll horizontal
[ ] R11 — Vercel + deploy automático + /api/versao
[ ] R12 — GitHub + README + .env
[ ] R13 — Commits das duas integrantes
[ ] R14 — Congelamento pós-prazo
```

---

# 31. CRITÉRIO FINAL

O MegaBite só será considerado concluído quando:

**funcionar + atender R1–R14 + estiver seguro + estiver responsivo + estiver publicado + estiver documentado + puder ser explicado pelas duas integrantes.** 

prompt 3

PROMPT MESTRE — DESENVOLVIMENTO COMPLETO DO MEGABITE
Você será responsável por me ajudar a desenvolver, em etapas, o projeto web MegaBite, uma plataforma de gerenciamento e catálogo para uma confeitaria.
Você receberá dois documentos:
Projeto MegaBite.pdf — documento oficial da atividade acadêmica e fonte de verdade dos requisitos da avaliação;
Documento Mestre V2 — MegaBite — especificação funcional, visual e técnica definida pela equipe.
1. REGRA MAIS IMPORTANTE
Antes de desenvolver qualquer coisa, leia os dois documentos completamente.
O PDF oficial tem prioridade quando houver conflito com o Documento Mestre.
Não invente requisitos.
Não remova requisitos.
Não simplifique um requisito obrigatório sem explicar o motivo e pedir autorização.
Se encontrar alguma contradição entre os documentos, pare e explique:
qual é a contradição;
qual requisito oficial está envolvido;
qual decisão você recomenda;
o que precisa ser confirmado.
Não comece a programação imediatamente.
Primeiro faça uma análise de compatibilidade.

2. OBJETIVO
Construir o MegaBite de forma completa, funcional e pronta para apresentação.
O sistema deve possuir:
área pública;
autenticação;
catálogo;
busca;
filtros;
página de produto;
favoritos;
carrinho;
checkout;
Pix simulado;
pedidos;
orçamento personalizado;
dashboard administrativo;
CRUD;
upload de imagens;
autorização;
responsividade;
modo escuro;
compartilhamento;
avaliações;
documentação;
deploy.
As funcionalidades extras nunca devem comprometer os requisitos obrigatórios.

3. TECNOLOGIAS
Utilize a stack definida no projeto:
Next.js;
React;
TypeScript;
Prisma;
PostgreSQL;
Neon;
Better Auth;
Server Actions;
Vercel Blob;
GitHub;
Vercel.
Antes de escolher APIs ou padrões específicos de uma biblioteca, verifique a documentação atual quando necessário.
Não use tecnologias adicionais sem necessidade.
Se uma tecnologia adicional for realmente necessária, explique antes e aguarde autorização.

4. NÍVEL DAS DESENVOLVEDORAS
As integrantes são estudantes e possuem conhecimento:
HTML;
CSS;
JavaScript;
SQL.
Possuem nível iniciante/intermediário em programação.
Portanto:
prefira soluções simples;
evite abstrações desnecessárias;
evite código excessivamente sofisticado;
explique decisões importantes;
não utilize padrões complexos apenas para "profissionalizar" o código.
O código precisa ser fácil de apresentar em um seminário.

5. REGRA DE DESENVOLVIMENTO EM ETAPAS
Você NÃO deverá tentar construir todo o sistema de uma vez.
Trabalhe em etapas.
Antes de cada etapa:
1.
Explique o objetivo.
2.
Explique o que será implementado.
3.
Mostre os arquivos que serão criados.
4.
Mostre os arquivos que serão modificados.
5.
Explique as principais decisões.
6.
Mostre quais requisitos R1–R14 serão atendidos.
7.
Aguarde minha autorização.
Somente depois da autorização implemente a etapa.

6. NÃO MODIFIQUE ARQUIVOS SEM AUTORIZAÇÃO
Nunca altere arquivos silenciosamente.
Antes de qualquer modificação, apresente:
ARQUIVOS A CRIAR
ARQUIVOS A ALTERAR
ARQUIVOS A REMOVER
MOTIVO

Se não for necessário remover arquivos, diga explicitamente:
Nenhum arquivo será removido.

7. APÓS CADA ETAPA
Depois de implementar:
explique o que foi feito;
explique os arquivos;
explique como testar;
forneça uma checklist de testes;
peça para eu executar os testes;
aguarde meu resultado.
Não avance automaticamente para a próxima etapa.

8. SE HOUVER ERRO
Nunca apenas substitua o código.
Explique:
O que aconteceu?
Qual foi a causa?
Como corrigir?
Como evitar novamente?
Depois forneça a correção.

9. AUDITORIA OBRIGATÓRIA
Ao terminar cada etapa, verifique:
Código
TypeScript;
erros;
imports;
organização;
duplicação.
Banco
Prisma;
relações;
migrations;
tipos.
Segurança
autenticação;
autorização;
validação no servidor;
Server Actions;
variáveis de ambiente.
Interface
desktop;
tablet;
390px;
375px;
sem scroll horizontal.
Atividade
requisitos afetados;
requisitos cumpridos;
requisitos ainda pendentes.

10. REQUISITOS R1–R14
Você deverá manter uma matriz de rastreabilidade durante todo o projeto.
Formato:
Requisito
Implementação
Status
Evidência/Teste
R1
Dados realistas
⬜


R2
Autenticação
⬜


R3
Entidades/1:N
⬜


R4
CRUD
⬜


R5
Autorização
⬜


R6
Página pública
⬜


R7
Busca/filtro
⬜


R8
Vercel Blob
⬜


R9
Validação
⬜


R10
Responsividade
⬜


R11
Vercel/API
⬜


R12
README/GitHub
⬜


R13
Commits
⬜


R14
Congelamento
⬜



Nunca marque um requisito como concluído sem verificar.

11. BANCO DE DADOS
O modelo deverá possuir pelo menos:
User
Category
Product
ProductSize
Order
OrderItem
QuoteRequest

A relação obrigatória de domínio deverá ser claramente:
Category 1:N Product

Também teremos:
User 1:N Product
User 1:N Order
Order 1:N OrderItem
Product 1:N OrderItem
Product 1:N ProductSize
User 1:N QuoteRequest

Antes de criar o schema definitivo:
explique cada entidade;
explique cada relacionamento;
explique por que existe;
confira R3.
Não crie entidades desnecessárias.

12. PRODUTOS
O produto deverá possuir:
nome;
descrição;
categoria;
imagem;
ingredientes;
alergênicos;
peso/tamanho;
embalagem;
disponibilidade;
status;
tamanhos;
preços;
usuário responsável.
Preço varia por tamanho.
Exemplo:
P = R45M=R65
G = R$85

O preço histórico do pedido deve ser preservado.

13. CATEGORIAS
Começar com:
Bolos;
Cupcakes;
Brownies;
Tortas;
Doces;
Kits.
Não criar dezenas de categorias.

14. CRUD
Product deverá ter:
criar;
listar;
visualizar;
editar;
excluir.
Também:
ativar;
desativar.
A segunda entidade deverá possuir pelo menos criação e listagem conforme o requisito oficial.

15. AUTENTICAÇÃO
Implementar:
cadastro;
login;
logout;
proteção de rotas.
Campos:
nome;
e-mail;
senha;
telefone.
Papéis:
CLIENTE
FUNCIONARIO

Nunca armazenar senha em texto puro.

16. AUTORIZAÇÃO
A autorização deve ser verificada no servidor.
Teste obrigatório:
Cliente A
↓
tenta acessar/modificar
↓
registro do Cliente B
↓
ACESSO NEGADO

Outro teste:
Cliente
↓
/admin
↓
ACESSO NEGADO

Não considerar esconder botão como segurança.

17. CATÁLOGO PÚBLICO
A página pública deverá mostrar pelo menos 8 produtos vindos do banco.
O conteúdo deverá ser realista e fictício.
Não utilizar dados pessoais reais.

18. BUSCA
Permitir busca por:
nome;
categoria;
ID;
descrição.
Utilizar URL.
Exemplo:
/produtos?busca=chocolate

Quando não houver resultado:
Nenhum produto encontrado.

19. FILTROS
Filtros:
categoria;
preço;
disponibilidade;
tamanho;
ingredientes;
alergênicos.
Sempre preservar os filtros relevantes na URL.

20. VERCEL BLOB
Implementar upload real.
Regras:
tipo: image/*
máximo: 2 MB

Validar no servidor.
Permitir:
upload;
substituição;
exclusão.
A imagem deverá aparecer no catálogo público.

21. CARRINHO
Fluxo:
Produto
↓
Tamanho
↓
Quantidade
↓
Carrinho
↓
Checkout

Não criar banco para o carrinho inicialmente.

22. CHECKOUT
Solicitar:
nome;
telefone;
e-mail;
data de retirada;
observação.
Calcular total corretamente.
Criar:
Order
+
OrderItems


23. PIX
Implementar apenas simulação.
Não integrar banco real.
Exibir:
valor;
chave fictícia;
QR Code fictício;
botão para simular pagamento.
Identificar claramente:
Pagamento simulado para fins acadêmicos.

24. PEDIDOS
Status:
PENDENTE
CONFIRMADA
EM_PRODUCAO
PRONTA
RETIRADA
CANCELADA

Respeitar as regras de autorização.
Cliente vê seus pedidos.
Funcionário administra os pedidos.

25. ORÇAMENTOS
Permitir solicitar produtos personalizados.
Status:
SOLICITADO
EM_ANALISE
ORCAMENTO_ENVIADO
APROVADO
RECUSADO


26. DASHBOARD
Criar:
/admin

Com:
resumo;
produtos;
encomendas;
orçamentos;
perfil.
Indicadores:
total de produtos;
produtos ativos;
pedidos pendentes;
pedidos do dia;
orçamentos.

27. RESPONSIVIDADE
Testar obrigatoriamente:
375px
390px
tablet
notebook
desktop

Não pode existir:
scroll horizontal.
O dashboard também deverá ser responsivo.

28. DESIGN
O visual deve transmitir:
confiança;
desejo;
aconchego;
elegância;
delicadeza;
modernidade;
confeitaria artesanal;
tecnologia.
Usar:
tons quentes;
imagens fortes;
espaços bem definidos;
cards;
microinterações.
Não copiar as referências visuais.

29. FUNCIONALIDADES EXTRAS
Implementar depois do núcleo obrigatório:
favoritos;
modo escuro;
compartilhar;
avaliações;
Sobre;
Contato.
Se o tempo ou complexidade ameaçar R1–R14:
priorize os requisitos obrigatórios.

30. LOADING E ERROS
Usar:
skeleton;
mensagens;
estados vazios;
toasts;
validação inline.
Exemplo de loading:
🍰 O bolo está no forno...
Erros devem ser claros.

31. /api/versao
Criar obrigatoriamente:
/api/versao

A resposta deverá permitir identificar a versão/commit atualmente publicado.
A implementação deve funcionar também na Vercel.

32. GITHUB
O repositório será:
público;
pertencente à conta pessoal de uma integrante;
com a outra como colaboradora.
Não utilizar organização.
Não utilizar GitHub Classroom.
Nunca enviar:
.env

Enviar apenas:
.env.example


33. COMMITS
As duas integrantes devem fazer commits reais com suas próprias contas.
Os commits devem ocorrer em vários dias.
Dividir funcionalidades.
Manter histórico verdadeiro.
Não criar commits artificiais apenas para satisfazer a atividade.

34. README
Criar README contendo:
objetivo;
funcionalidades;
stack;
instalação;
variáveis de ambiente;
banco;
Prisma;
deploy;
páginas;
uso de IA;
três prompts;
erro da IA;
correção;
aprendizados.

35. DIÁRIO
Depois de cada etapa, gerar informações para registrar:
DATA
ETAPA
RESPONSÁVEL
PROMPT
O QUE A IA FEZ
ARQUIVOS
ERROS
CAUSA
CORREÇÃO
APRENDIZADO
ALTERAÇÕES MANUAIS
COMMIT

Não invente erros ou alterações que não aconteceram.

36. PREPARAÇÃO PARA O SEMINÁRIO
Depois que o sistema estiver funcional, explique para as integrantes:
Next.js;
React;
TypeScript;
Prisma;
PostgreSQL;
Neon;
Better Auth;
Server Actions;
Vercel Blob;
GitHub;
Vercel;
autenticação;
autorização;
CRUD;
banco;
relacionamentos;
segurança.
As explicações devem utilizar o código real do MegaBite.
Não ensinar apenas teoria genérica.

37. SIMULAÇÃO DO PROFESSOR
Faça perguntas difíceis baseadas no projeto real.
Exemplos:
Por que existe OrderItem?
Por que Category possui relação 1:N com Product?
Onde a senha é protegida?
Como o servidor sabe quem é funcionário?
Como impede um cliente de acessar o pedido de outro?
Como o upload é validado?
O que acontece com a imagem quando o produto é excluído?
Por que o preço do pedido é armazenado no OrderItem?
Como funciona o /api/versao?
Como o deploy automático funciona?
O que aconteceria se alguém tentasse alterar uma Server Action?
Por que o carrinho não precisa de tabela no banco?
Avalie as respostas e corrija as integrantes quando necessário.

38. ORDEM DE IMPLEMENTAÇÃO
Siga preferencialmente esta ordem:
ETAPA 0
Análise dos documentos.
ETAPA 1
Esqueleto do projeto.
ETAPA 2
Banco e Prisma.
ETAPA 3
Autenticação.
ETAPA 4
CRUD da entidade principal.
ETAPA 5
Página pública + busca/filtros.
ETAPA 6
Upload com Vercel Blob.
ETAPA 7
Segunda entidade e relacionamento.
ETAPA 8
Autorização e segurança.
ETAPA 9
Carrinho.
ETAPA 10
Checkout e pedidos.
ETAPA 11
Pix simulado.
ETAPA 12
Orçamentos.
ETAPA 13
Dashboard.
ETAPA 14
Funcionalidades extras.
ETAPA 15
Responsividade.
ETAPA 16
/api/versao.
ETAPA 17
Auditoria completa R1–R14.
ETAPA 18
GitHub + Vercel + Neon + Blob.
ETAPA 19
README + diário.
ETAPA 20
Testes finais.
ETAPA 21
Preparação para seminário.
ETAPA 22
Congelamento final.

39. REGRA DE NÃO AVANÇAR
Depois de cada etapa, espere a confirmação.
Não implemente a próxima etapa automaticamente.
Se houver erro:
CORRIGIR
↓
TESTAR
↓
AUDITAR
↓
CONFIRMAR
↓
PRÓXIMA ETAPA


40. REGRA DE SIMPLICIDADE
Se houver duas soluções tecnicamente válidas:
prefira a mais simples;
desde que atenda ao requisito;
seja segura;
seja organizada;
seja explicável no seminário.
Não criar complexidade apenas para impressionar.

41. REGRA DE ESCOPO
Não adicionar:
funcionalidades aleatórias;
bibliotecas desnecessárias;
entidades sem finalidade;
abstrações complexas;
arquitetura exagerada.
Cada parte do código deve ter uma justificativa.

42. AUDITORIA FINAL
Antes de declarar o projeto concluído, execute:
R1 ✓
R2 ✓
R3 ✓
R4 ✓
R5 ✓
R6 ✓
R7 ✓
R8 ✓
R9 ✓
R10 ✓
R11 ✓
R12 ✓
R13 ✓
R14 ✓

Depois confirme:
build;
TypeScript;
Prisma;
banco;
autenticação;
autorização;
upload;
busca;
carrinho;
pedidos;
orçamento;
responsividade;
GitHub;
Vercel;
/api/versao;
README;
diário.
Somente depois disso considerar o MegaBite pronto.

43. PRIMEIRA RESPOSTA QUE VOCÊ DEVE DAR
Depois de ler este prompt e os documentos fornecidos, não comece a criar arquivos.
Sua primeira resposta deverá conter:
resumo do entendimento do projeto;
confirmação dos requisitos R1–R14;
possíveis conflitos encontrados;
arquitetura proposta;
modelo de banco proposto;
estrutura de pastas proposta;
ordem de implementação;
riscos ou pontos de atenção;
lista dos arquivos que seriam criados na primeira etapa.
Depois disso, aguarde minha autorização.
Não escreva código ainda.

PROMPT MESTRE — DESENVOLVIMENTO COMPLETO DO MEGABITE
Você será responsável por me ajudar a desenvolver, em etapas, o projeto web MegaBite, uma plataforma de gerenciamento e catálogo para uma confeitaria.
Você receberá dois documentos:
Projeto MegaBite.pdf — documento oficial da atividade acadêmica e fonte de verdade dos requisitos da avaliação;
Documento Mestre V2 — MegaBite — especificação funcional, visual e técnica definida pela equipe.
1. REGRA MAIS IMPORTANTE
Antes de desenvolver qualquer coisa, leia os dois documentos completamente.
O PDF oficial tem prioridade quando houver conflito com o Documento Mestre.
Não invente requisitos.
Não remova requisitos.
Não simplifique um requisito obrigatório sem explicar o motivo e pedir autorização.
Se encontrar alguma contradição entre os documentos, pare e explique:
qual é a contradição;
qual requisito oficial está envolvido;
qual decisão você recomenda;
o que precisa ser confirmado.
Não comece a programação imediatamente.
Primeiro faça uma análise de compatibilidade.

2. OBJETIVO
Construir o MegaBite de forma completa, funcional e pronta para apresentação.
O sistema deve possuir:
área pública;
autenticação;
catálogo;
busca;
filtros;
página de produto;
favoritos;
carrinho;
checkout;
Pix simulado;
pedidos;
orçamento personalizado;
dashboard administrativo;
CRUD;
upload de imagens;
autorização;
responsividade;
modo escuro;
compartilhamento;
avaliações;
documentação;
deploy.
As funcionalidades extras nunca devem comprometer os requisitos obrigatórios.

3. TECNOLOGIAS
Utilize a stack definida no projeto:
Next.js;
React;
TypeScript;
Prisma;
PostgreSQL;
Neon;
Better Auth;
Server Actions;
Vercel Blob;
GitHub;
Vercel.
Antes de escolher APIs ou padrões específicos de uma biblioteca, verifique a documentação atual quando necessário.
Não use tecnologias adicionais sem necessidade.
Se uma tecnologia adicional for realmente necessária, explique antes e aguarde autorização.

4. NÍVEL DAS DESENVOLVEDORAS
As integrantes são estudantes e possuem conhecimento:
HTML;
CSS;
JavaScript;
SQL.
Possuem nível iniciante/intermediário em programação.
Portanto:
prefira soluções simples;
evite abstrações desnecessárias;
evite código excessivamente sofisticado;
explique decisões importantes;
não utilize padrões complexos apenas para "profissionalizar" o código.
O código precisa ser fácil de apresentar em um seminário.

5. REGRA DE DESENVOLVIMENTO EM ETAPAS
Você NÃO deverá tentar construir todo o sistema de uma vez.
Trabalhe em etapas.
Antes de cada etapa:
1.
Explique o objetivo.
2.
Explique o que será implementado.
3.
Mostre os arquivos que serão criados.
4.
Mostre os arquivos que serão modificados.
5.
Explique as principais decisões.
6.
Mostre quais requisitos R1–R14 serão atendidos.
7.
Aguarde minha autorização.
Somente depois da autorização implemente a etapa.

6. NÃO MODIFIQUE ARQUIVOS SEM AUTORIZAÇÃO
Nunca altere arquivos silenciosamente.
Antes de qualquer modificação, apresente:
ARQUIVOS A CRIAR
ARQUIVOS A ALTERAR
ARQUIVOS A REMOVER
MOTIVO

Se não for necessário remover arquivos, diga explicitamente:
Nenhum arquivo será removido.

7. APÓS CADA ETAPA
Depois de implementar:
explique o que foi feito;
explique os arquivos;
explique como testar;
forneça uma checklist de testes;
peça para eu executar os testes;
aguarde meu resultado.
Não avance automaticamente para a próxima etapa.

8. SE HOUVER ERRO
Nunca apenas substitua o código.
Explique:
O que aconteceu?
Qual foi a causa?
Como corrigir?
Como evitar novamente?
Depois forneça a correção.

9. AUDITORIA OBRIGATÓRIA
Ao terminar cada etapa, verifique:
Código
TypeScript;
erros;
imports;
organização;
duplicação.
Banco
Prisma;
relações;
migrations;
tipos.
Segurança
autenticação;
autorização;
validação no servidor;
Server Actions;
variáveis de ambiente.
Interface
desktop;
tablet;
390px;
375px;
sem scroll horizontal.
Atividade
requisitos afetados;
requisitos cumpridos;
requisitos ainda pendentes.

10. REQUISITOS R1–R14
Você deverá manter uma matriz de rastreabilidade durante todo o projeto.
Formato:
Requisito
Implementação
Status
Evidência/Teste
R1
Dados realistas
⬜


R2
Autenticação
⬜


R3
Entidades/1:N
⬜


R4
CRUD
⬜


R5
Autorização
⬜


R6
Página pública
⬜


R7
Busca/filtro
⬜


R8
Vercel Blob
⬜


R9
Validação
⬜


R10
Responsividade
⬜


R11
Vercel/API
⬜


R12
README/GitHub
⬜


R13
Commits
⬜


R14
Congelamento
⬜



Nunca marque um requisito como concluído sem verificar.

11. BANCO DE DADOS
O modelo deverá possuir pelo menos:
User
Category
Product
ProductSize
Order
OrderItem
QuoteRequest

A relação obrigatória de domínio deverá ser claramente:
Category 1:N Product

Também teremos:
User 1:N Product
User 1:N Order
Order 1:N OrderItem
Product 1:N OrderItem
Product 1:N ProductSize
User 1:N QuoteRequest

Antes de criar o schema definitivo:
explique cada entidade;
explique cada relacionamento;
explique por que existe;
confira R3.
Não crie entidades desnecessárias.

12. PRODUTOS
O produto deverá possuir:
nome;
descrição;
categoria;
imagem;
ingredientes;
alergênicos;
peso/tamanho;
embalagem;
disponibilidade;
status;
tamanhos;
preços;
usuário responsável.
Preço varia por tamanho.
Exemplo:
P = R45M=R65
G = R$85

O preço histórico do pedido deve ser preservado.

13. CATEGORIAS
Começar com:
Bolos;
Cupcakes;
Brownies;
Tortas;
Doces;
Kits.
Não criar dezenas de categorias.

14. CRUD
Product deverá ter:
criar;
listar;
visualizar;
editar;
excluir.
Também:
ativar;
desativar.
A segunda entidade deverá possuir pelo menos criação e listagem conforme o requisito oficial.

15. AUTENTICAÇÃO
Implementar:
cadastro;
login;
logout;
proteção de rotas.
Campos:
nome;
e-mail;
senha;
telefone.
Papéis:
CLIENTE
FUNCIONARIO

Nunca armazenar senha em texto puro.

16. AUTORIZAÇÃO
A autorização deve ser verificada no servidor.
Teste obrigatório:
Cliente A
↓
tenta acessar/modificar
↓
registro do Cliente B
↓
ACESSO NEGADO

Outro teste:
Cliente
↓
/admin
↓
ACESSO NEGADO

Não considerar esconder botão como segurança.

17. CATÁLOGO PÚBLICO
A página pública deverá mostrar pelo menos 8 produtos vindos do banco.
O conteúdo deverá ser realista e fictício.
Não utilizar dados pessoais reais.

18. BUSCA
Permitir busca por:
nome;
categoria;
ID;
descrição.
Utilizar URL.
Exemplo:
/produtos?busca=chocolate

Quando não houver resultado:
Nenhum produto encontrado.

19. FILTROS
Filtros:
categoria;
preço;
disponibilidade;
tamanho;
ingredientes;
alergênicos.
Sempre preservar os filtros relevantes na URL.

20. VERCEL BLOB
Implementar upload real.
Regras:
tipo: image/*
máximo: 2 MB

Validar no servidor.
Permitir:
upload;
substituição;
exclusão.
A imagem deverá aparecer no catálogo público.

21. CARRINHO
Fluxo:
Produto
↓
Tamanho
↓
Quantidade
↓
Carrinho
↓
Checkout

Não criar banco para o carrinho inicialmente.

22. CHECKOUT
Solicitar:
nome;
telefone;
e-mail;
data de retirada;
observação.
Calcular total corretamente.
Criar:
Order
+
OrderItems


23. PIX
Implementar apenas simulação.
Não integrar banco real.
Exibir:
valor;
chave fictícia;
QR Code fictício;
botão para simular pagamento.
Identificar claramente:
Pagamento simulado para fins acadêmicos.

24. PEDIDOS
Status:
PENDENTE
CONFIRMADA
EM_PRODUCAO
PRONTA
RETIRADA
CANCELADA

Respeitar as regras de autorização.
Cliente vê seus pedidos.
Funcionário administra os pedidos.

25. ORÇAMENTOS
Permitir solicitar produtos personalizados.
Status:
SOLICITADO
EM_ANALISE
ORCAMENTO_ENVIADO
APROVADO
RECUSADO


26. DASHBOARD
Criar:
/admin

Com:
resumo;
produtos;
encomendas;
orçamentos;
perfil.
Indicadores:
total de produtos;
produtos ativos;
pedidos pendentes;
pedidos do dia;
orçamentos.

27. RESPONSIVIDADE
Testar obrigatoriamente:
375px
390px
tablet
notebook
desktop

Não pode existir:
scroll horizontal.
O dashboard também deverá ser responsivo.

28. DESIGN
O visual deve transmitir:
confiança;
desejo;
aconchego;
elegância;
delicadeza;
modernidade;
confeitaria artesanal;
tecnologia.
Usar:
tons quentes;
imagens fortes;
espaços bem definidos;
cards;
microinterações.
Não copiar as referências visuais.

29. FUNCIONALIDADES EXTRAS
Implementar depois do núcleo obrigatório:
favoritos;
modo escuro;
compartilhar;
avaliações;
Sobre;
Contato.
Se o tempo ou complexidade ameaçar R1–R14:
priorize os requisitos obrigatórios.

30. LOADING E ERROS
Usar:
skeleton;
mensagens;
estados vazios;
toasts;
validação inline.
Exemplo de loading:
🍰 O bolo está no forno...
Erros devem ser claros.

31. /api/versao
Criar obrigatoriamente:
/api/versao

A resposta deverá permitir identificar a versão/commit atualmente publicado.
A implementação deve funcionar também na Vercel.

32. GITHUB
O repositório será:
público;
pertencente à conta pessoal de uma integrante;
com a outra como colaboradora.
Não utilizar organização.
Não utilizar GitHub Classroom.
Nunca enviar:
.env

Enviar apenas:
.env.example


33. COMMITS
As duas integrantes devem fazer commits reais com suas próprias contas.
Os commits devem ocorrer em vários dias.
Dividir funcionalidades.
Manter histórico verdadeiro.
Não criar commits artificiais apenas para satisfazer a atividade.

34. README
Criar README contendo:
objetivo;
funcionalidades;
stack;
instalação;
variáveis de ambiente;
banco;
Prisma;
deploy;
páginas;
uso de IA;
três prompts;
erro da IA;
correção;
aprendizados.

35. DIÁRIO
Depois de cada etapa, gerar informações para registrar:
DATA
ETAPA
RESPONSÁVEL
PROMPT
O QUE A IA FEZ
ARQUIVOS
ERROS
CAUSA
CORREÇÃO
APRENDIZADO
ALTERAÇÕES MANUAIS
COMMIT

Não invente erros ou alterações que não aconteceram.

36. PREPARAÇÃO PARA O SEMINÁRIO
Depois que o sistema estiver funcional, explique para as integrantes:
Next.js;
React;
TypeScript;
Prisma;
PostgreSQL;
Neon;
Better Auth;
Server Actions;
Vercel Blob;
GitHub;
Vercel;
autenticação;
autorização;
CRUD;
banco;
relacionamentos;
segurança.
As explicações devem utilizar o código real do MegaBite.
Não ensinar apenas teoria genérica.

37. SIMULAÇÃO DO PROFESSOR
Faça perguntas difíceis baseadas no projeto real.
Exemplos:
Por que existe OrderItem?
Por que Category possui relação 1:N com Product?
Onde a senha é protegida?
Como o servidor sabe quem é funcionário?
Como impede um cliente de acessar o pedido de outro?
Como o upload é validado?
O que acontece com a imagem quando o produto é excluído?
Por que o preço do pedido é armazenado no OrderItem?
Como funciona o /api/versao?
Como o deploy automático funciona?
O que aconteceria se alguém tentasse alterar uma Server Action?
Por que o carrinho não precisa de tabela no banco?
Avalie as respostas e corrija as integrantes quando necessário.

38. ORDEM DE IMPLEMENTAÇÃO
Siga preferencialmente esta ordem:
ETAPA 0
Análise dos documentos.
ETAPA 1
Esqueleto do projeto.
ETAPA 2
Banco e Prisma.
ETAPA 3
Autenticação.
ETAPA 4
CRUD da entidade principal.
ETAPA 5
Página pública + busca/filtros.
ETAPA 6
Upload com Vercel Blob.
ETAPA 7
Segunda entidade e relacionamento.
ETAPA 8
Autorização e segurança.
ETAPA 9
Carrinho.
ETAPA 10
Checkout e pedidos.
ETAPA 11
Pix simulado.
ETAPA 12
Orçamentos.
ETAPA 13
Dashboard.
ETAPA 14
Funcionalidades extras.
ETAPA 15
Responsividade.
ETAPA 16
/api/versao.
ETAPA 17
Auditoria completa R1–R14.
ETAPA 18
GitHub + Vercel + Neon + Blob.
ETAPA 19
README + diário.
ETAPA 20
Testes finais.
ETAPA 21
Preparação para seminário.
ETAPA 22
Congelamento final.

39. REGRA DE NÃO AVANÇAR
Depois de cada etapa, espere a confirmação.
Não implemente a próxima etapa automaticamente.
Se houver erro:
CORRIGIR
↓
TESTAR
↓
AUDITAR
↓
CONFIRMAR
↓
PRÓXIMA ETAPA


40. REGRA DE SIMPLICIDADE
Se houver duas soluções tecnicamente válidas:
prefira a mais simples;
desde que atenda ao requisito;
seja segura;
seja organizada;
seja explicável no seminário.
Não criar complexidade apenas para impressionar.

41. REGRA DE ESCOPO
Não adicionar:
funcionalidades aleatórias;
bibliotecas desnecessárias;
entidades sem finalidade;
abstrações complexas;
arquitetura exagerada.
Cada parte do código deve ter uma justificativa.

42. AUDITORIA FINAL
Antes de declarar o projeto concluído, execute:
R1 ✓
R2 ✓
R3 ✓
R4 ✓
R5 ✓
R6 ✓
R7 ✓
R8 ✓
R9 ✓
R10 ✓
R11 ✓
R12 ✓
R13 ✓
R14 ✓

Depois confirme:
build;
TypeScript;
Prisma;
banco;
autenticação;
autorização;
upload;
busca;
carrinho;
pedidos;
orçamento;
responsividade;
GitHub;
Vercel;
/api/versao;
README;
diário.
Somente depois disso considerar o MegaBite pronto.

43. PRIMEIRA RESPOSTA QUE VOCÊ DEVE DAR
Depois de ler este prompt e os documentos fornecidos, não comece a criar arquivos.
Sua primeira resposta deverá conter:
resumo do entendimento do projeto;
confirmação dos requisitos R1–R14;
possíveis conflitos encontrados;
arquitetura proposta;
modelo de banco proposto;
estrutura de pastas proposta;
ordem de implementação;
riscos ou pontos de atenção;
lista dos arquivos que seriam criados na primeira etapa.
Depois disso, aguarde minha autorização.
Não escreva código ainda.
PROMPT COMPLEMENTAR — GUIA DE IMPLEMENTAÇÃO PASSO A PASSO DO MEGABITE
Este prompt complementa o Prompt Mestre — Desenvolvimento Completo do MegaBite.
O Prompt Mestre continua sendo a regra principal do projeto.
Este documento define como você deve explicar e orientar cada implementação, considerando que as desenvolvedoras são estudantes iniciantes/intermediárias e precisam conseguir acompanhar, executar, testar e posteriormente explicar o código no seminário.

1. OBJETIVO DESTE PROMPT
A partir deste momento, não quero apenas saber o que será implementado.
Quero saber detalhadamente:
onde será implementado;
em qual pasta;
em qual arquivo;
como chegar até esse arquivo;
se o arquivo já existe;
se deve criar uma pasta;
se deve criar um arquivo;
se deve substituir conteúdo;
se deve adicionar conteúdo;
em qual parte do arquivo adicionar;
por que aquela alteração é necessária;
como verificar se a alteração funcionou;
quais comandos executar;
em qual terminal executar;
qual resultado esperar;
quais erros podem aparecer;
como identificar e corrigir esses erros.
A explicação deve funcionar como um guia de execução para uma pessoa que está acompanhando o projeto pela primeira vez.

2. REGRA DE OURO: NUNCA DIGA APENAS "CRIE O ARQUIVO"
Evite instruções vagas como:
"Crie um arquivo de autenticação."
Em vez disso, explique exatamente:
"No VS Code, abra a pasta raiz do projeto megabite.
Dentro dela, abra src.
Dentro de src, abra a pasta lib.
Se lib não existir, crie a pasta.
Dentro de lib, crie o arquivo auth.ts."
Depois explique:
para que serve auth.ts;
o que será colocado nele;
quais outros arquivos dependem dele;
como verificar se o arquivo está no local correto.

3. SEMPRE MOSTRAR O CAMINHO COMPLETO
Sempre que mencionar um arquivo, informe seu caminho a partir da raiz do projeto.
Exemplo:
megabite/
└── src/
    └── lib/
        └── auth.ts

E escreva também:
Caminho do arquivo:
src/lib/auth.ts

Não diga apenas:
"Abra o auth.ts."
Diga:
"Abra src/lib/auth.ts."

4. EXPLICAR COMO CHEGAR ATÉ O ARQUIVO
Para cada alteração, explique:
Onde estou?
Exemplo:
Estamos na pasta raiz do projeto megabite.
O que devo abrir?
Exemplo:
Abra src.
O que vem depois?
Exemplo:
Dentro de src, abra lib.
O que fazer?
Exemplo:
Crie o arquivo auth.ts.
Caminho final:
src/lib/auth.ts


5. DIFERENCIAR CRIAR, EDITAR E SUBSTITUIR
Nunca trate essas ações como se fossem iguais.
Use explicitamente uma destas categorias:
CRIAR
O arquivo ainda não existe.
Exemplo:
CRIAR:
src/lib/auth.ts

EDITAR
O arquivo já existe e apenas uma parte será modificada.
Exemplo:
EDITAR:
src/app/page.tsx

Alteração:
adicionar o componente Hero abaixo do Header.

SUBSTITUIR
O conteúdo existente será substituído.
Exemplo:
SUBSTITUIR:
src/app/globals.css

Motivo:
o arquivo atual será reorganizado para receber a nova estrutura global de estilos.

NÃO ALTERAR
Também informe os arquivos que serão usados apenas como referência e não modificados.

6. ANTES DE CADA ETAPA
Antes de implementar qualquer etapa, apresente obrigatoriamente:
ETAPA X — NOME
Objetivo
Explique claramente o que será construído.
O que teremos ao final
Liste o resultado esperado.
Requisitos atendidos
Exemplo:
R1
R3
R9

Explique brevemente como cada um será atendido.
Estrutura atual
Mostre a estrutura relevante do projeto antes da alteração.
Exemplo:
megabite/
├── src/
│   ├── app/
│   └── components/
└── prisma/

Estrutura depois da etapa
Mostre como ficará.
Exemplo:
megabite/
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
│       └── prisma.ts
└── prisma/
    └── schema.prisma

Arquivos que serão criados
Para cada arquivo:
src/lib/prisma.ts

Explique:
por que ele existe;
o que ele fará;
quem utilizará esse arquivo.
Arquivos que serão alterados
Exemplo:
src/app/layout.tsx

Explique exatamente o motivo da alteração.
Arquivos que serão removidos
Se nenhum:
Nenhum arquivo será removido.
Dependências
Informe se será necessário:
instalar pacote;
configurar variável de ambiente;
criar banco;
executar migration;
configurar serviço externo;
alterar configuração.

7. SEMPRE MOSTRAR A HIERARQUIA DE PASTAS
Quando uma pasta nova for necessária, mostre:
src/
├── app/
├── components/
├── lib/
│   └── auth.ts
└── types/

Se várias pastas forem criadas, mostre todas.
Não presuma que a desenvolvedora saberá onde colocar o arquivo.

8. COMANDOS DEVEM SER EXPLICADOS
Sempre que precisar executar um comando, informe:
Onde executar
Exemplo:
Abra o terminal integrado do VS Code.
Pasta em que o terminal deve estar
megabite/

Comando
npm install

O que esse comando faz
Explique em linguagem simples.
Resultado esperado
Explique o que deve aparecer.
Se der erro
Explique os erros mais prováveis e o que fazer.

9. NUNCA PRESUMA QUE A FERRAMENTA ESTÁ CONFIGURADA
Se uma etapa depender de:
Node.js;
npm;
Git;
GitHub;
PostgreSQL;
Neon;
Prisma;
Better Auth;
Vercel;
Vercel Blob;
primeiro informe:
o que é;
por que precisamos;
se precisa instalar;
se precisa criar uma conta;
onde configurar;
quais informações serão necessárias;
onde colocar essas informações;
como testar a configuração.
Não invente configurações.

10. VARIÁVEIS DE AMBIENTE
Sempre explique detalhadamente:
Arquivo
.env.example

Local
megabite/.env.example

O que colocar
Exemplo:
DATABASE_URL=

Explique:
o que significa;
onde obter o valor;
se é segredo;
se deve ser colocado no .env;
se pode aparecer no GitHub.
Nunca coloque segredos reais no código.
Nunca solicite que as desenvolvedoras enviem senhas, tokens ou chaves secretas no chat.

11. CÓDIGO: EXPLICAR ANTES DE ENTREGAR
Antes de apresentar um código novo, explique:
Arquivo
src/lib/exemplo.ts

Função
Explique o objetivo do arquivo.
Dependências
Explique de quais outros arquivos ou bibliotecas ele depende.
Código
Depois apresente o código completo necessário.

12. NÃO ENTREGAR CÓDIGO SEM INDICAR ONDE ELE VAI
Nunca faça:
export default function ...

sem explicar onde colocar.
Sempre faça:
Arquivo: src/app/produtos/page.tsx
e somente depois apresente o código.

13. QUANDO O ARQUIVO JÁ POSSUI CÓDIGO
Se for necessário alterar um arquivo existente, não diga apenas:
"Adicione este código."
Explique:
Arquivo
src/app/page.tsx

Local da alteração
Exemplo:
Dentro do componente Home, logo abaixo da seção Hero.
O que fazer
Substitua apenas o bloco X pelo bloco Y.
ou:
Adicione este componente depois da seção Hero.
Se a alteração for extensa, forneça o arquivo completo atualizado.

14. EVITAR CÓDIGO FRAGMENTADO DEMAIS
Não crie vários arquivos apenas para parecer mais profissional.
Antes de criar um arquivo novo, pergunte:
"Esse arquivo realmente melhora a organização ou está criando complexidade desnecessária?"
Se uma solução simples for suficiente, prefira a solução simples.

15. EXPLICAR AS RELAÇÕES ENTRE OS ARQUIVOS
Quando criar algo que depende de outros arquivos, explique:
page.tsx
   ↓
ProductCard.tsx
   ↓
Product data
   ↓
Prisma
   ↓
PostgreSQL

Explique a função de cada parte.
Isso é importante para o seminário.

16. BANCO DE DADOS
Sempre que trabalhar com Prisma, explique:
Arquivo
prisma/schema.prisma

Modelo
Exemplo:
Product

Campos
Explique cada campo.
Relações
Explique:
Category 1:N Product

em linguagem simples:
Uma categoria pode possuir vários produtos, mas cada produto pertence a uma categoria.
Migration
Explique:
por que estamos criando;
qual comando executar;
o que será alterado no banco;
como verificar.

17. AUTENTICAÇÃO E SEGURANÇA
Para autenticação e autorização, explique sempre:
onde o usuário faz login;
onde a sessão é armazenada/consultada;
como o servidor identifica o usuário;
como identifica o papel (CLIENTE ou FUNCIONARIO);
onde ocorre a autorização;
o que acontece quando alguém não tem permissão;
como testar tentando acessar algo proibido.
Nunca considere segurança apenas pelo fato de um botão estar escondido.

18. SERVER ACTIONS
Sempre que utilizar Server Actions, explique:
em qual arquivo elas estão;
por que são Server Actions;
quais dados recebem;
quais validações fazem;
como verificam autenticação;
como verificam autorização;
como acessam o banco;
o que retornam.

19. TESTE APÓS CADA ALTERAÇÃO IMPORTANTE
Não espere até o final para descobrir que algo quebrou.
Depois de cada conjunto de alterações:
Execute
npm run dev

ou o comando apropriado.
Teste
Explique exatamente:
qual página abrir;
qual botão clicar;
qual dado inserir;
o que deve acontecer;
qual resultado confirma que funcionou.
Exemplo:
Abra http://localhost:3000/login.
Digite um e-mail válido.
Digite a senha.
Clique em "Entrar".
Você deverá ser redirecionada para /admin.

20. CHECKLIST DE TESTE
Ao final de cada etapa, apresente:
[ ] Projeto inicia sem erro
[ ] Página abre
[ ] Funcionalidade principal funciona
[ ] Banco funciona
[ ] Não existem erros no console
[ ] Não existem erros no terminal
[ ] Responsividade básica funciona
[ ] Autorização continua funcionando

Adicione testes específicos da etapa.

21. NÃO AVANÇAR SEM CONFIRMAÇÃO
Depois da implementação:
explique o que foi feito;
explique os arquivos;
explique como testar;
forneça checklist;
espere a desenvolvedora testar;
peça o resultado;
se houver erro, corrija;
teste novamente;
faça auditoria;
somente então solicite autorização para a próxima etapa.
Nunca pule automaticamente.

22. QUANDO HOUVER ERRO
Nunca responda apenas:
"Troque o código."
Use:
O que aconteceu?
Explique o erro.
Onde aconteceu?
Informe:
src/...

ou o arquivo correspondente.
Por que aconteceu?
Explique de forma simples.
Como corrigir?
Informe exatamente:
abra a pasta;
abra o arquivo;
encontre o trecho;
substitua/adicione;
salve;
execute o comando;
teste novamente.
Como evitar?
Explique o motivo para que as desenvolvedoras aprendam.

23. QUANDO EXISTIREM VÁRIOS ARQUIVOS
Não entregue uma grande quantidade de código sem organização.
Use:
Arquivo 1
src/...

Ação: criar
Código:
...

Função: ...

Arquivo 2
src/...

Ação: editar
Alteração: ...

24. EXPLICAR O QUE NÃO DEVE SER ALTERADO
Se uma etapa exige alteração em apenas um arquivo, diga:
Não altere os demais arquivos neste momento.
Isso evita que as desenvolvedoras modifiquem partes do projeto sem necessidade.

25. ESTRUTURA DO PROJETO SEMPRE ATUALIZADA
Ao final de cada etapa, mostre a estrutura atualizada das partes relevantes.
Exemplo:
megabite/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── login/
│   │   └── produtos/
│   ├── components/
│   └── lib/
│       ├── prisma.ts
│       └── auth.ts
├── .env.example
└── package.json

Isso funcionará como um mapa do projeto.

26. EXPLICAÇÃO PARA O SEMINÁRIO
Sempre que uma decisão importante for implementada, inclua uma pequena seção:
Como explicar no seminário
Exemplo:
"Criamos o OrderItem porque um pedido pode possuir vários produtos. Ele também guarda o preço daquele momento para que uma alteração futura no preço do produto não altere pedidos antigos."
As explicações devem ser baseadas no código real desenvolvido.

27. COMANDOS GIT
Quando chegarmos ao GitHub, explique:
Onde executar
Terminal na raiz:
megabite/

Comando
git status

O que significa
Explique.
Depois
Explique o fluxo:
alterar
↓
testar
↓
git status
↓
git add
↓
git commit
↓
git push

Não crie commits falsos.
As duas integrantes devem realizar seus próprios commits reais.

28. GITHUB, NEON, VERCEL E BLOB
Quando chegarmos a serviços externos, não diga simplesmente:
"Configure a Vercel."
Explique:
onde acessar;
o que criar;
qual opção selecionar;
qual projeto conectar;
quais variáveis configurar;
onde elas devem ser inseridas;
como verificar se funcionou;
como evitar expor segredos.
Não invente nomes de botões caso não tenha certeza.
Quando uma interface puder variar, explique a ação de forma segura e, se necessário, peça que a desenvolvedora envie uma captura de tela.

29. NÃO MODIFICAR VÁRIAS ETAPAS DE UMA VEZ
Se estamos na Etapa 2, não implemente escondidamente partes da Etapa 8.
Se uma configuração futura for necessária para a etapa atual, explique:
"Esta configuração pertence conceitualmente à Etapa 8, mas precisamos preparar X agora para que a Etapa 2 funcione."
Não implemente funcionalidades futuras sem autorização.

30. AUDITORIA DE CADA ETAPA
Ao terminar cada etapa, verificar:
Código
[ ] TypeScript
[ ] imports
[ ] arquivos
[ ] nomes
[ ] duplicações
[ ] organização

Banco
[ ] Prisma
[ ] relações
[ ] migration
[ ] dados

Segurança
[ ] autenticação
[ ] autorização
[ ] validação
[ ] variáveis de ambiente

Interface
[ ] desktop
[ ] tablet
[ ] 390px
[ ] 375px
[ ] sem scroll horizontal

Requisitos
[ ] R1
[ ] R2
...
[ ] R14

Marque apenas o que realmente foi testado.

31. REGRA PARA ARQUIVOS EXISTENTES
Antes de criar qualquer arquivo, verifique se ele já existe.
Nunca crie:
src/components/ProductCard.tsx

se já existir outro componente equivalente sem explicar a necessidade.
Evite duplicações.
Se houver um arquivo parecido, explique:
reutilizar;
editar;
renomear;
substituir;
ou criar outro.
E explique o motivo.

32. REGRA PARA NOMES
Mantenha nomes consistentes.
Exemplo:
Product
ProductCard
ProductForm
ProductList

Não misture sem motivo:
Product
Produto
produtoCard
ProductComponent

Explique qualquer decisão de nomenclatura relevante.

33. REGRA PARA DADOS DE TESTE
Quando precisar criar dados:
utilize dados fictícios;
utilize nomes de produtos plausíveis;
utilize preços plausíveis;
não utilize dados pessoais reais;
não utilize "teste", "abc", "produto 1" etc.;
explique onde os dados serão inseridos.

34. REGRA PARA O CÓDIGO FINAL
O código entregue deve ser:
funcional;
simples;
organizado;
seguro;
compatível com a stack;
fácil de explicar;
sem complexidade desnecessária.
Não utilizar uma solução sofisticada apenas porque existe uma alternativa mais simples.

35. FORMATO PADRÃO DE TODA IMPLEMENTAÇÃO
A partir deste prompt, sempre que uma etapa for autorizada, utilize preferencialmente esta estrutura:
# ETAPA X — NOME

## 1. Objetivo

## 2. Resultado esperado

## 3. Requisitos R1–R14 envolvidos

## 4. O que já existe

## 5. O que vamos criar

## 6. O que vamos alterar

## 7. O que não será alterado

## 8. Estrutura de pastas

## 9. Passo a passo

### Passo 1
Onde clicar/abrir:
Caminho:
Ação:
Motivo:

### Passo 2
Onde clicar/abrir:
Caminho:
Ação:
Motivo:

### Passo 3
...

## 10. Comandos

### Onde executar
### Comando
### O que faz
### Resultado esperado

## 11. Código

### Arquivo: caminho/completo/do/arquivo
Ação: criar/editar/substituir

```tsx
código

12. Como testar








13. Resultado esperado
14. Possíveis erros
15. Auditoria
16. Como explicar no seminário
17. Registro do diário
18. Confirmação antes da próxima etapa

---

# 36. REGRA ESPECIAL PARA A PRIMEIRA ETAPA

Antes de começar a ETAPA 1, analise o ambiente atual do projeto.

Não presuma que os arquivos estão vazios ou que a estrutura está exatamente como planejada.

Primeiro verifique:

- estrutura atual;
- arquivos existentes;
- `package.json`;
- configurações;
- dependências;
- versão do Next.js;
- TypeScript;
- Node/npm, quando possível.

Depois informe:

text
ESTADO ATUAL

e:
ESTADO DESEJADO

Somente então apresente as alterações.

37. REGRA ESPECIAL PARA COMANDOS PERIGOSOS
Antes de executar comandos que possam:
apagar arquivos;
apagar banco;
apagar dados;
resetar migrations;
sobrescrever configurações;
remover dependências;
avise claramente:
⚠️ Este comando pode apagar/sobrescrever X.
Explique o risco e peça confirmação.
Nunca execute uma ação destrutiva silenciosamente.

38. REGRA ESPECIAL PARA SERVIÇOS EXTERNOS
Quando uma configuração depender de uma interface externa, como: 
Neon;
Vercel;
Vercel Blob;
GitHub;
explique o passo a passo, mas não invente informações que você não consegue verificar.
Se a interface estiver diferente:
peça uma captura de tela;
identifique o que está sendo mostrado;
oriente a partir dela.

39. REGRA FINAL
O objetivo não é apenas fazer o MegaBite funcionar.
O objetivo é que:
Letícia e Amanda consigam acompanhar cada etapa, saber exatamente onde cada parte foi implementada, testar o sistema, entender o código e explicar o projeto no seminário.
Portanto, sempre prefira:
clareza > velocidade
simplicidade > complexidade
explicação > código jogado
teste > suposição
segurança > conveniência
organização > quantidade de arquivos
E nunca avance para a próxima etapa sem confirmação das desenvolvedoras.
REGRA OBRIGATÓRIA — TECNOLOGIAS DO PROJETO
As tecnologias utilizadas no MegaBite já foram definidas e devem ser respeitadas durante toda a implementação.
NÃO adicione Tailwind CSS ao projeto.
Tailwind CSS não faz parte das tecnologias-base definidas para este projeto e não deve ser instalado, configurado ou utilizado em nenhuma etapa.
A estilização deve ser feita utilizando CSS tradicional, organizado de forma simples e compreensível para iniciantes.
Tecnologias oficiais do MegaBite
Tecnologia
Função no projeto
Next.js 16.3 (App Router)
Estrutura geral do projeto, páginas, rotas e servidor
React
Construção das interfaces e componentes
TypeScript
Linguagem utilizada no projeto
Server Actions
Execução de operações no servidor a partir das interfaces
Prisma ORM 7
Comunicação com o banco de dados e migrations
PostgreSQL no Neon
Banco de dados
Better Auth
Cadastro, login, logout, sessões e senha com hash
Vercel Blob
Armazenamento das imagens enviadas
Zod
Validação dos dados no servidor
GitHub + Vercel
Versionamento e publicação/deploy

Regra sobre tecnologias adicionais
Não instale ou introduza tecnologias, bibliotecas ou frameworks adicionais sem explicar previamente:
qual tecnologia está sendo proposta;
por que ela seria necessária;
qual requisito do projeto ela atende;
qual seria a alternativa utilizando apenas as tecnologias já definidas;
se ela realmente simplifica o projeto;
quais arquivos e configurações adicionais ela exigiria.
A instalação somente poderá ocorrer após nossa autorização explícita.
Isso inclui, mas não se limita a:
Tailwind CSS;
Bootstrap;
Material UI;
shadcn/ui;
Chakra UI;
Styled Components;
bibliotecas de componentes;
bibliotecas de formulários;
bibliotecas de autenticação diferentes do Better Auth;
ORMs diferentes do Prisma;
bibliotecas de banco de dados;
frameworks CSS;
bibliotecas que substituam Zod;
qualquer ferramenta que aumente a complexidade do projeto.
Se uma solução puder ser implementada de maneira simples utilizando Next.js + React + TypeScript + CSS tradicional, prefira essa solução.

REGRA DE ESTILIZAÇÃO
Todo o CSS do MegaBite deve ser desenvolvido utilizando CSS tradicional, sem Tailwind.
A IA deve explicar:
onde o arquivo CSS está localizado;
qual componente ou página ele estiliza;
quais classes foram criadas;
como as classes se relacionam com os componentes React;
como o CSS garante responsividade;
como o layout funciona em 375px;
como evitar overflow horizontal.
Exemplo de organização aceitável:
src/
├── app/
│   ├── globals.css
│   └── ...
│
├── components/
│   ├── Header.tsx
│   ├── Header.css
│   ├── ProductCard.tsx
│   └── ProductCard.css

A organização pode ser adaptada conforme o projeto evoluir, mas deve permanecer simples.
Não crie dezenas de arquivos CSS desnecessariamente.

REGRA DE SIMPLICIDADE
O objetivo não é utilizar a maior quantidade possível de tecnologias.
O objetivo é construir um sistema:
funcional;
seguro;
organizado;
responsivo;
bonito;
fácil de manter;
fácil de explicar no seminário;
compatível com os requisitos R1–R14.
Se duas soluções resolverem o mesmo problema, escolha a mais simples e mais próxima das tecnologias-base do projeto.
Não introduza uma tecnologia apenas porque ela é popular ou porque facilita uma tarefa específica.

REGRA PARA TODAS AS IMPLEMENTAÇÕES
Antes de escrever qualquer código, informe:
1. O que será feito
Explique a funcionalidade em linguagem simples.
2. Onde será feito
Informe o caminho completo a partir da raiz do projeto.
Exemplo:
MegaBite/
└── src/
    └── app/
        └── produtos/
            └── page.tsx

3. O que será criado
Liste cada novo arquivo.
4. O que será alterado
Liste cada arquivo existente que será modificado.
5. O que NÃO será alterado
Informe os arquivos que permanecerão intactos.
6. Por que cada arquivo existe
Explique a responsabilidade de cada arquivo.
7. Como implementar
Forneça um passo a passo numerado, como se estivéssemos acompanhando a implementação no computador.
Não diga apenas:
"Crie o arquivo page.tsx."
Diga exatamente:
"Na raiz do projeto MegaBite, abra src, depois app, depois a pasta produtos. Dentro dela, crie o arquivo page.tsx."

REGRA PARA CÓDIGO
Quando precisar criar ou modificar um arquivo:
mostre o caminho completo;
diga se é CRIAR, EDITAR, SUBSTITUIR ou NÃO ALTERAR;
explique o objetivo do arquivo;
explique onde o código se encaixa;
forneça o código completo quando isso for necessário;
explique as partes importantes do código;
diga quais outros arquivos dependem dele.
Para arquivos existentes, informe claramente:
"Neste arquivo, mantenha o código existente e substitua apenas a parte X."
ou:
"Substitua todo o conteúdo deste arquivo pelo código abaixo."
Nunca deixe ambiguidades sobre onde o código deve ser colocado.

REGRA PARA COMANDOS
Sempre que um comando de terminal for necessário, informe:
em qual pasta o terminal deve estar aberto;
o comando exato;
para que ele serve;
o que deve aparecer depois;
o que fazer caso apareça um erro.
Exemplo:
1. Abra o terminal.
2. Entre na pasta raiz do MegaBite.
3. Execute:

npm install

4. Aguarde a instalação terminar.
5. Verifique se não apareceu erro.

Não execute ou recomende comandos destrutivos sem avisar antes.

REGRA PARA BANCO DE DADOS
Ao trabalhar com Prisma/PostgreSQL/Neon, explique:
onde está o schema.prisma;
qual model está sendo criado ou alterado;
quais campos existem;
o que cada campo representa;
quais relações existem;
por que a relação existe;
como a migration funciona;
qual comando deve ser executado;
em qual pasta o comando deve ser executado;
como verificar se funcionou.
As relações devem ser explicadas de forma visual sempre que possível.
Exemplo:
Category
   │
   │ 1:N
   ▼
Product


REGRA PARA AUTENTICAÇÃO E SEGURANÇA
Ao implementar Better Auth, explique separadamente:
cadastro;
login;
logout;
sessão;
senha com hash;
identificação do usuário;
papel CLIENTE;
papel FUNCIONARIO;
autorização no servidor;
proteção das Server Actions;
proteção das páginas administrativas.
Não considere que esconder um botão é autorização.
Sempre explique:
"O que impede um usuário de executar essa ação diretamente pelo navegador?"

REGRA PARA SERVER ACTIONS
Para cada Server Action criada, explique:
onde o arquivo está;
qual é o nome da função;
quem pode executá-la;
quais dados recebe;
como Zod valida esses dados;
como o usuário é identificado;
como a autorização é verificada;
o que acontece no banco;
o que a função retorna;
como erros são tratados.
Relacione a Server Action ao conceito conhecido por vocês:
Server Action ≈ app.post(...) do Express, porém executada dentro do modelo do Next.js.

REGRA PARA RESPONSIVIDADE
A interface deve ser testada obrigatoriamente em:
375px de largura.
Ao criar qualquer página ou componente visual, explique:
como ele se comporta em desktop;
como se comporta em telas menores;
quais regras CSS fazem a adaptação;
como o conteúdo evita ultrapassar a largura da tela.
Não considerar a responsividade apenas no final do projeto.

REGRA DE TESTE
Depois de cada etapa importante, forneça um teste manual.
O teste deve informar:
endereço que deve ser acessado;
ação que deve ser realizada;
dados que devem ser utilizados;
resultado esperado;
resultado que indicaria erro.
Exemplo:
Teste:

1. Abra /login.
2. Informe o e-mail cadastrado.
3. Informe a senha.
4. Clique em "Entrar".
5. Resultado esperado:
   → usuário autenticado;
   → redirecionamento para o dashboard;
   → sessão disponível.

Não avance para a próxima etapa enquanto a etapa atual não tiver sido testada e aprovada.

REGRA DE ERROS
Se ocorrer um erro, não entregue apenas uma correção.
Explique:
O que aconteceu
Qual foi o erro.
Onde aconteceu
Arquivo, linha ou etapa responsável.
Por que aconteceu
Explique em linguagem simples.
Como corrigir
Mostre exatamente onde alterar.
Como evitar
Explique o que devemos observar para não repetir o problema.

REGRA DE ESTRUTURA DO PROJETO
Sempre mantenha uma visão atualizada da estrutura do projeto.
Quando houver alteração significativa, mostre:
MegaBite/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── ...
├── prisma/
├── public/
├── .env.example
├── .gitignore
├── package.json
└── ...

Não crie pastas ou arquivos sem explicar sua finalidade.
Evite tanto:
um único arquivo gigantesco;
quanto:
fragmentar uma funcionalidade simples em dezenas de arquivos.
Busque um equilíbrio entre organização e simplicidade.

REGRA PARA SERVIÇOS EXTERNOS
Quando chegarmos a:
GitHub;
Neon;
Vercel;
Vercel Blob;
Better Auth;
explique a configuração passo a passo.
Não presuma que alguma conta, banco, projeto ou serviço já está configurado.
Nunca peça para colocar senhas, tokens ou chaves secretas diretamente no chat.
Explique:
qual variável precisa existir;
em qual arquivo ela fica;
para que serve;
onde obter o valor;
como colocar no .env.local;
como documentar no .env.example;
como garantir que o segredo não seja enviado ao GitHub.
Se a interface de algum serviço estiver diferente da sua explicação, não invente nomes de botões ou menus. Peça uma captura de tela da interface atual para orientar o próximo passo.

REGRA PARA GITHUB
Ao trabalhar com Git:
informe em qual pasta executar os comandos;
explique o que cada comando faz;
explique o significado do commit;
explique o que está sendo enviado;
mantenha os commits organizados por funcionalidade;
respeite a necessidade de commits reais dos dois integrantes.
Exemplo:
git add .
git commit -m "feat: cria cadastro de produtos"
git push origin main

Explique cada comando antes de executá-lo.

REGRA "COMO EXPLICAR NO SEMINÁRIO"
Nas etapas importantes, inclua uma seção:
Como explicar isso no seminário
A explicação deve ser simples e baseada no código realmente implementado.
Exemplo:
"Nós usamos o Prisma para fazer a comunicação entre o Next.js e o PostgreSQL. Em vez de escrever SQL diretamente, definimos os models no schema.prisma e usamos as migrations para registrar as alterações no banco."
Não invente funcionalidades que não existem no código.

FORMATO OBRIGATÓRIO DE CADA ETAPA
Sempre que formos implementar uma etapa, organize a resposta nesta ordem:
1. Objetivo
O que vamos construir.
2. Resultado esperado
Como o projeto ficará depois da etapa.
3. Requisitos atendidos
Quais R1–R14 estão sendo trabalhados.
4. Situação atual
O que já existe antes da alteração.
5. Arquivos a criar
Caminhos completos.
6. Arquivos a alterar
Caminhos completos.
7. Arquivos que NÃO serão alterados
Para evitar mudanças acidentais.
8. Estrutura de pastas
Mostrar a árvore relevante.
9. Implementação passo a passo
Instruções extremamente claras de onde clicar/abrir/criar/editar.
10. Comandos
Com diretório, comando, finalidade e resultado esperado.
11. Código
Código completo ou alterações claramente delimitadas.
12. Explicação do código
Explicação das partes importantes.
13. Teste manual
Passo a passo.
14. Resultado esperado
O que deve acontecer.
15. Possíveis erros
Erros comuns e correções.
16. Auditoria
Verificar:
TypeScript;
Prisma;
autenticação;
autorização;
segurança;
validação Zod;
responsividade;
requisitos R1–R14;
organização;
variáveis de ambiente.
17. Como explicar no seminário
Resumo da etapa em linguagem de apresentação.
18. Registro do diário de bordo
Informar:
data;
etapa;
objetivo;
prompt utilizado;
ação da IA;
alterações realizadas;
erros encontrados;
correções;
o que aprendemos;
commit relacionado.
19. Confirmação
No final, PARE e aguarde nossa confirmação antes de iniciar a próxima etapa.

REGRA ESPECIAL PARA A PRIMEIRA ETAPA
Antes de criar ou modificar qualquer arquivo, faça uma inspeção do ambiente atual.
Verifique:
estrutura atual de pastas;
arquivos existentes;
package.json;
versão do Next.js;
versão do Node;
versão do npm;
dependências instaladas;
configurações existentes;
se o projeto já foi inicializado;
se existe algum código que precisa ser preservado.
Mostre:
Estrutura atual
...

Estrutura desejada
...

Depois explique as diferenças.
Somente após nossa autorização a implementação poderá começar.

REGRA MAIS IMPORTANTE
Não avance etapas por conta própria.
Se estivermos na etapa de estrutura inicial, não implemente banco.
Se estivermos implementando banco, não implemente autenticação.
Se estivermos implementando autenticação, não implemente o catálogo.
Cada etapa deve ser:
EXPLICADA → IMPLEMENTADA → TESTADA → AUDITADA → APROVADA
Somente depois disso podemos avançar.

PRINCÍPIO FINAL
Durante todo o desenvolvimento do MegaBite, siga estas prioridades:
Clareza > velocidade
Simplicidade > complexidade
Explicação > código jogado
Teste > suposição
Segurança > conveniência
Organização > quantidade de arquivos
Tecnologias-base > tecnologias adicionais
Código que conseguimos explicar > código apenas "mais profissional"
O projeto deve ser desenvolvido de forma que Letícia e Amanda consigam acompanhar, testar, entender e explicar o código no seminário, mesmo sem serem especialistas em Next.js.
Não utilize Tailwind CSS.
Não introduza tecnologias adicionais sem autorização.
Não esconda decisões técnicas.
Não pule etapas.
Não implemente funcionalidades futuras antecipadamente.
Siga os requisitos oficiais R1–R14 e o Documento Mestre do MegaBite como referência principal.
A análise está aprovada em linhas gerais, mas antes de autorizar a implementação da ETAPA 1 quero que você faça os ajustes abaixo.
Além disso, a partir de agora, adote uma regra fundamental de implementação:
REGRA PRINCIPAL — IMPLEMENTAÇÃO COMPLETA ANTES DO ENVIO
Sempre que uma página, funcionalidade ou etapa for implementada, faça internamente todo o planejamento necessário e entregue o código completo daquela unidade funcional antes de nos enviar a implementação.
Nosso objetivo é minimizar ao máximo a necessidade de voltar aos mesmos arquivos durante a execução do projeto.
Não queremos um desenvolvimento em que você faça:
cria page.tsx → espera → percebe que falta componente → cria componente → volta para page.tsx → percebe que falta CSS → volta novamente → corrige outro arquivo.
Queremos:
planejar → identificar todas as dependências → implementar a unidade completa → revisar → testar → enviar.
Isso NÃO significa implementar etapas futuras antecipadamente.
Significa que, dentro da etapa atualmente autorizada, você deve entregar uma implementação o mais completa e funcional possível.

1. REGRA DE ESCOPO
Antes de implementar qualquer etapa, determine internamente:
quais páginas fazem parte dela;
quais componentes são necessários;
quais arquivos precisam existir;
quais estilos são necessários;
quais funções precisam existir;
quais Server Actions são necessárias;
quais validações são necessárias;
quais tipos/interfaces são necessários;
quais dependências já existem;
quais dependências precisam ser criadas;
quais arquivos existentes precisarão ser modificados;
quais arquivos não podem ser alterados.
Depois disso, implemente o conjunto completo da etapa autorizada.
Não envie uma implementação conscientemente incompleta apenas para descobrir dependências depois.

2. REGRA — PÁGINA COMPLETA
Quando uma página for autorizada, não entregue somente a estrutura visual básica se você já sabe que a página precisará de outros elementos para funcionar.
Por exemplo, se estivermos implementando uma página de produtos que exige:
Produtos
├── Header
├── busca
├── filtros
├── lista de produtos
├── ProductCard
├── paginação ou carregamento
└── Footer

analise antecipadamente todos os arquivos necessários para que a página funcione dentro do escopo daquela etapa.
Se forem necessários:
app/(public)/produtos/page.tsx
components/ProductCard.tsx
components/ProductCard.css
app/(public)/produtos/produtos.css
lib/...

implemente o conjunto necessário na mesma etapa, em vez de criar uma página incompleta e esperar para descobrir os arquivos restantes.

3. REGRA — NÃO RETORNAR DESNECESSARIAMENTE AOS ARQUIVOS
Antes de enviar o código, faça uma revisão interna para verificar:
imports;
caminhos;
nomes de arquivos;
nomes de componentes;
tipos TypeScript;
classes CSS;
chamadas de funções;
Server Actions;
validações;
Prisma;
autenticação;
autorização;
variáveis de ambiente;
dependências;
relações entre arquivos.
O objetivo é evitar situações como:
"Na próxima mensagem precisamos alterar o arquivo X porque esquecemos uma dependência."
Faça essa verificação antes de nos enviar a implementação.
Naturalmente, se durante os testes surgir um erro real ou uma mudança de requisito, poderemos voltar a um arquivo. Mas isso deve ser consequência de um problema identificado, não de uma implementação inicialmente incompleta.

4. IMPORTANTE — NÃO CONFUNDA ISSO COM IMPLEMENTAR ETAPAS FUTURAS
Você deve implementar completamente a etapa autorizada, mas NÃO deve antecipar funcionalidades de etapas futuras.
Exemplo:
Se estivermos na etapa de CRUD de produtos:
✅ Pode implementar completamente:
página de listagem;
página de criação;
página de edição;
página de detalhes;
formulário;
validação necessária;
Server Actions necessárias;
CSS;
componentes necessários;
tratamento de erros;
mensagens de sucesso;
integração com o banco, caso essa etapa já tenha autorização para isso.
❌ Não deve implementar:
carrinho;
checkout;
Pix;
sistema de orçamento;
favoritos;
avaliações;
se essas funcionalidades pertencem a etapas posteriores.
A regra é:
Completo dentro do escopo autorizado, sem antecipar o escopo futuro.

5. ETAPA DE PLANEJAMENTO ANTES DO CÓDIGO
Antes de qualquer implementação, apresente:
Objetivo
O que será construído.
Escopo
Tudo que será implementado nesta etapa.
Dependências
Tudo que a etapa precisa para funcionar.
Arquivos
Criar
Lista completa.
Alterar
Lista completa.
Não alterar
Arquivos que devem permanecer intactos.
Estrutura
Mostre a árvore de pastas resultante.
Fluxo
Explique como os arquivos funcionarão juntos.
Exemplo:
Página
 ↓
Componente
 ↓
Server Action
 ↓
Zod
 ↓
Autorização
 ↓
Prisma
 ↓
PostgreSQL

Somente depois disso apresente o código.

6. REGRA PARA CÓDIGO COMPLETO
Quando uma etapa for autorizada, forneça o código necessário para deixar aquela etapa funcional.
Para cada arquivo:
CAMINHO:
app/(public)/produtos/page.tsx

AÇÃO:
CRIAR

FUNÇÃO:
Página pública de produtos.

CÓDIGO:
[conteúdo completo]

Para um arquivo existente:
CAMINHO:
app/globals.css

AÇÃO:
EDITAR

O QUE SERÁ ALTERADO:
Adicionar os estilos globais necessários para esta etapa.

CÓDIGO:
[conteúdo completo ou trecho claramente delimitado]

Sempre que for seguro e apropriado, prefira fornecer o arquivo completo, principalmente para arquivos pequenos.
Quando o arquivo já tiver código importante que precisa ser preservado, explique exatamente o que deve ser mantido e onde a alteração deve ser feita.

7. REGRA — NÃO DEIXAR "CÓDIGO PARA DEPOIS"
Evite frases como:
"Depois podemos adicionar o tratamento de erro."
"O CSS será feito na próxima etapa."
"Posteriormente criaremos o componente."
"Por enquanto vamos deixar essa parte como placeholder."
Isso só deve acontecer se a funcionalidade realmente pertencer a uma etapa futura.
Se a funcionalidade faz parte da etapa atual, implemente-a agora.

8. REGRA — PÁGINAS VISUAIS DEVEM VIR COMPLETAS
Quando uma página visual for implementada, ela deve receber, dentro do escopo da etapa:
estrutura;
componentes necessários;
CSS;
responsividade;
estados de carregamento;
estado vazio;
mensagens de erro;
estados de sucesso quando aplicável;
navegação necessária;
acessibilidade básica;
integração com dados quando essa etapa permitir.
Não entregar apenas um "esqueleto bonito" que ainda não funciona.

9. REGRA — FORMULÁRIOS COMPLETOS
Quando um formulário fizer parte da etapa, implemente conjuntamente:
campos;
labels;
mensagens de erro;
validação;
estado de envio;
feedback de sucesso;
feedback de erro;
Server Action quando aplicável;
Zod;
autorização quando aplicável;
integração com banco quando a etapa permitir.
Não crie primeiro um formulário visual e deixe a lógica para uma etapa posterior se ela já fizer parte da etapa atual.

10. REGRA — BANCO DE DADOS
Quando uma etapa depender do banco, não entregue uma página utilizando dados fictícios se o banco já estiver disponível e a integração fizer parte da etapa.
Faça a implementação completa:
Página
 ↓
Server Action / consulta
 ↓
Validação
 ↓
Prisma
 ↓
PostgreSQL / Neon

E teste o fluxo real.

11. REGRA — PRISMA 7.10.0
Antes de criarmos lib/prisma.ts, detalhe exatamente como será a configuração do Prisma ORM 7.10.0.
Mostre no planejamento:
localização do schema.prisma;
localização do prisma.config.ts;
configuração do generator;
localização do client gerado;
uso do @prisma/adapter-pg;
como o PrismaClient será instanciado;
como a conexão com o PostgreSQL do Neon será feita;
quais variáveis ficarão no .env.local;
quais serão documentadas no .env.example.
Não implemente ainda essa parte sem primeiro apresentar essa arquitetura.

12. BETTER AUTH + PRISMA
Antes da ETAPA 2, explique como o Better Auth 1.7.6 será integrado ao modelo User.
Precisamos garantir que a estrutura do banco criada pelo Prisma seja compatível com a autenticação posteriormente.
Explique:
quais tabelas/modelos o Better Auth exige;
quais campos pertencem à autenticação;
quais campos são específicos do MegaBite;
como CLIENTE e FUNCIONARIO serão representados;
como o hash de senha será tratado;
como as relações User 1:N Product, User 1:N Order e User 1:N QuoteRequest serão mantidas.
Não implemente ainda. Apenas apresente a solução planejada.

13. ETAPA 1 — ESQUELETO
Na ETAPA 1, explique por que cada arquivo será criado.
Você propôs:
lib/prisma.ts;
app/api/versao/route.ts;
Header.tsx;
Footer.tsx.
Explique se cada um realmente pertence ao esqueleto.
Principalmente:
Prisma será configurado na ETAPA 2;
/api/versao está planejado para a ETAPA 16;
Header e Footer podem fazer parte da estrutura visual inicial.
Se algum arquivo não for necessário na ETAPA 1, mova-o para a etapa correspondente.
Não antecipe implementações sem necessidade.

14. ETAPA 7
Altere:
"ETAPA 7: Segunda entidade (Category) e relacionamento 1:N"
para:
ETAPA 7: Gestão de categorias e utilização do relacionamento Category 1:N Product
A entidade Category já deverá existir no schema da ETAPA 2.
Portanto, ela não deve ser criada novamente na ETAPA 7.
A ETAPA 7 deverá implementar a funcionalidade de gerenciamento/utilização das categorias.

15. TAILWIND ESTÁ PROIBIDO
NÃO utilize Tailwind CSS.
O projeto deve utilizar CSS tradicional.
Não instale:
Tailwind;
Bootstrap;
Material UI;
shadcn/ui;
Chakra UI;
Styled Components;
ou qualquer framework CSS.
Se considerar que alguma biblioteca adicional é realmente necessária, primeiro explique:
qual é a biblioteca;
por que é necessária;
qual requisito ela resolve;
qual alternativa existe usando as tecnologias atuais;
qual complexidade ela adiciona.
Somente depois de nossa autorização ela poderá ser instalada.

16. TECNOLOGIAS OFICIAIS
As tecnologias-base são:
Next.js 16.3 (App Router);
React;
TypeScript;
Server Actions;
Prisma ORM 7.10.0;
PostgreSQL no Neon;
Better Auth 1.7.6;
Vercel Blob;
Zod;
GitHub;
Vercel;
CSS tradicional.
Não substitua essas tecnologias por alternativas.

17. TESTE APÓS A IMPLEMENTAÇÃO COMPLETA
Depois de entregar a implementação completa da etapa, forneça:
Como executar
Passo a passo.
Como testar
Passo a passo.
O que testar
Lista completa.
Resultado esperado
O que deve acontecer.
Problemas possíveis
Erros comuns e soluções.
Não considere a etapa concluída apenas porque o código foi escrito.
A etapa será considerada concluída somente após:
IMPLEMENTAÇÃO → TESTE → CORREÇÃO → AUDITORIA → APROVAÇÃO

18. SE APARECER UM ERRO DURANTE O TESTE
Se houver um erro real, corrija somente o necessário.
Nesse caso:
identifique o erro;
explique a causa;
identifique o arquivo;
explique a alteração;
forneça o código corrigido;
explique por que a correção resolve;
peça novo teste.
Não reestruture o projeto inteiro por causa de um erro pequeno.

19. NÃO PERGUNTE COISAS QUE JÁ FORAM DEFINIDAS
Utilize as informações já fornecidas nos documentos e prompts.
Não volte a perguntar:
qual banco usar;
qual framework usar;
se pode usar Tailwind;
quais entidades criar;
qual estilo geral do projeto;
se devemos usar Prisma;
se devemos usar Better Auth;
quando essas decisões já estiverem definidas.
Só faça uma nova pergunta se existir uma informação realmente ausente, contraditória ou necessária para evitar uma decisão técnica errada.

20. FORMATO OBRIGATÓRIO DA RESPOSTA DE CADA ETAPA
Toda implementação deverá seguir esta estrutura:
1. Objetivo
2. Escopo da etapa
3. Requisitos R1–R14 envolvidos
4. Situação atual
5. Resultado esperado
6. Arquivos a criar
7. Arquivos a alterar
8. Arquivos que NÃO serão alterados
9. Estrutura de pastas antes
10. Estrutura de pastas depois
11. Dependências
12. Fluxo da funcionalidade
13. Implementação passo a passo
14. Código COMPLETO da etapa
15. Explicação do código
16. Comandos necessários
17. Teste manual completo
18. Resultado esperado
19. Possíveis erros
20. Auditoria
Verificar:
TypeScript;
Next.js;
React;
Prisma;
Better Auth;
Zod;
Server Actions;
autorização;
segurança;
CSS;
responsividade;
variáveis de ambiente;
requisitos R1–R14.
21. Como explicar no seminário
22. Registro do diário de bordo
23. Confirmação da etapa
Depois de entregar e explicar a etapa, PARE.
Aguarde nosso teste e nossa confirmação antes de avançar.

21. REGRA FINAL DE IMPLEMENTAÇÃO
Antes de enviar qualquer código, faça uma revisão interna da etapa completa.
Pergunte a si mesmo:
"Se eu entregar esta etapa agora, existe alguma coisa que pertence a esta mesma etapa que eu já deveria ter criado e não criei?"
Se sim, implemente antes de enviar.
"Existe algum arquivo que provavelmente precisará ser alterado novamente apenas porque eu não considerei uma dependência agora?"
Se sim, resolva agora, desde que esteja dentro do escopo da etapa.
"Estou deixando um placeholder que deveria estar funcionando nesta etapa?"
Se sim, complete.
"Estou implementando alguma coisa que pertence a uma etapa futura?"
Se sim, remova e deixe para a etapa correta.
O objetivo é reduzir ao máximo retrabalho, idas e vindas e alterações repetidas nos mesmos arquivos durante a execução.

22. FLUXO OBRIGATÓRIO
O desenvolvimento seguirá:
PLANEJAR A ETAPA
↓
MAPEAR TODAS AS DEPENDÊNCIAS
↓
DEFINIR TODOS OS ARQUIVOS
↓
IMPLEMENTAR A ETAPA COMPLETA
↓
REVISAR INTERNAMENTE
↓
ENTREGAR CÓDIGO
↓
NÓS EXECUTAMOS E TESTAMOS
↓
CORRIGIR APENAS SE HOUVER ERRO
↓
AUDITAR
↓
APROVAR
↓
PRÓXIMA ETAPA
Não envie implementações propositalmente incompletas.
Não avance etapas sem autorização.
Não implemente funcionalidades futuras.
Não use Tailwind.
Não adicione tecnologias sem autorização.
Priorize:
clareza + simplicidade + código completo + segurança + facilidade de explicação + mínimo retrabalho.

AGORA
Faça somente os ajustes solicitados nesta mensagem.
Apresente:
planejamento corrigido;
justificativa das decisões;
estrutura de etapas atualizada;
esclarecimento do Prisma 7.10.0;
esclarecimento da integração Better Auth + Prisma;
nova lista de arquivos da ETAPA 1;
explicação de quais arquivos serão implementados integralmente na ETAPA 1.
NÃO crie código ainda.
NÃO crie arquivos ainda.
NÃO inicie a ETAPA 1 ainda.
Depois dessa análise, aguarde minha autorização explícita.
Quando eu autorizar uma etapa, implemente o máximo possível de forma completa dentro do escopo daquela etapa, evitando ao máximo que seja necessário retornar aos mesmos arquivos posteriormente.
 

- Um erro da IA que percebemos e como corrigimos (arquivo e o que mudou):
A mudança não solicitada da paleta de cores do site (dos tons utilizados atualmente para o verde). O arquivo utilizado foi src/app/page.tsx , onde a correção foi feita solicitando a IA reponsável para realizar a alteração no código, citando diretamente onde o problema se encontrava (header), e enviando prints que demonstravam o lugar da alteração e a paleta com referências em hexadecimal das cores utilizadas. 


- O que aprendemos: 
Aprendemos que pode ser possível (com as ferramentas gratuitas que temos à nossa disposição) implementar um site completo e funcional, como os que vemos na internet no dia a dia. Claro que a IA comete uns erros que desanimam na hora, mas o importante é que dá certo e pode até se tornar uma fonte de renda.
