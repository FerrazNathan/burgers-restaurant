# Burgers Restaurant

## Descrição

Esta aplicação é uma solução para o desafio de Front End Developer. Ela exibe os dados de um restaurante e seu menu, permitindo que os clientes visualizem os itens e construam um carrinho de compras.

## Tecnologias Utilizadas

- React
- Typescript
- ES6+
- React Hooks
- Redux
- Styled Components
- Axios (para requisições HTTP)

## Funcionalidades

- Exibição dos detalhes do restaurante
- Listagem de itens do menu
- Adição de itens ao carrinho
- Visualização e ajuste do conteúdo do carrinho

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

5. **Para Melhor experiência do usuário**
#### É recomendado usar a extensão "Allow CORS: Access-Control-Allow-Origin" disponível na Chrome Web Store, para obter a resposta correta da API.

## Estrutura do Projeto
src/components: Contém os componentes reutilizáveis da aplicação
src/pages: Contém as páginas principais da aplicação
src/redux: Configuração do Redux, incluindo slices e store
src/services: Configuração das chamadas de API
src/styles: Estilos globais e configuração de temas
src/utils: Funções utilitárias e helpers

## Decisões de Design
Componentização: Componentes foram criados para serem reutilizáveis e modulares, facilitando a manutenção e extensão da aplicação.
Gerenciamento de Estado: Redux foi utilizado para gerenciar o estado global da aplicação, garantindo consistência e facilitando o acesso aos dados em diferentes partes da aplicação.
Testes: Adicionei testes unitários utilizando React Testing Library para garantir a funcionalidade correta dos componentes.


## Tratamento de Cross-Origin Resource Sharing (CORS)
### Problema
Durante o desenvolvimento, você pode encontrar erros relacionados ao CORS (Cross-Origin Resource Sharing), que ocorrem quando uma aplicação tenta carregar recursos de um domínio diferente daquele onde está hospedada.

### Solução
Para resolver problemas de CORS durante o desenvolvimento local, recomenda-se usar uma extensão no navegador que permita desativar temporariamente as políticas CORS. Isso permite testar a integração com APIs e serviços externos sem ser bloqueado pelo navegador devido a restrições de segurança.

### Recomendação
Para o Google Chrome, você pode usar a extensão "Allow CORS: Access-Control-Allow-Origin" disponível na Chrome Web Store. Esta extensão permite desabilitar temporariamente as políticas CORS no navegador, facilitando o desenvolvimento e depuração de aplicações que dependem de integrações externas.
