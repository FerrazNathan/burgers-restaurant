# Burgers Restaurant
![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)

## Descrição

Esta aplicação é uma solução para o desafio de Front End Developer. Ela exibe os dados de um restaurante e seu menu, permitindo que os clientes visualizem os itens e construam um carrinho de compras.

## Tecnologias Utilizadas

- React
- Typescript
- ES6+
- React Hooks
- Redux
- Jest
- Styled Components
- Axios (para requisições HTTP)

## Funcionalidades

- Exibição dos detalhes do restaurante
- Listagem de itens do menu
- Adição de itens ao carrinho
- Visualização e ajuste do conteúdo do carrinho
- Campo de busca de produtos
- Página de contatos

## Requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Configuração do Projeto

1. **Clone o repositório:**

   ```bash
   https://github.com/FerrazNathan/burgers-restaurant.git
   cd burger-menu

2. **Instalação das dependências**
   ```bash
   npm install
   # ou
   yarn

3. **Rodando o projeto**
   ```bash
   npm run dev
   # ou
   yarn dev

4. **Abra o navegador e acesse:**
   ```bash
   http://localhost:3000


## Estrutura do Projeto
src/components: Contém os componentes reutilizáveis da aplicação
src/pages: Contém as páginas principais da aplicação
src/sections: Contém seções de componentes que compõem as páginas principais da aplicação
src/redux: Configuração do Redux, incluindo slices e store
src/services: Configuração das chamadas de API
src/styles: Estilos globais e configuração de temas
src/utils: Funções utilitárias e helpers

## Decisões de Design
Componentização: Componentes foram criados para serem reutilizáveis e modulares, facilitando a manutenção e extensão da aplicação.
Gerenciamento de Estado: Redux foi utilizado para gerenciar o estado global da aplicação, garantindo consistência e facilitando o acesso aos dados em diferentes partes da aplicação.
Testes: Adicionei testes unitários utilizando React Testing Library para garantir a funcionalidade correta dos componentes.

## Dicas de Usabilidade
Para acessar todas as funcionalidades do sistema, faça login utilizando a conta de administrador. Com essa conta, você poderá gerenciar produtos e ter controle total sobre o sistema.
Recomendamos que ao fazer os testes como admin, crie novas categorias e produtos, e então edite e exclua como quiser, para que, ao fazer isso não exclua items demais da lista e assim deixe o layout vazio de produtos e categorias.

### Credenciais de Acesso
- E-mail: useradministrator@user.com.br
- Senha: SenhaDeUserAdmin
