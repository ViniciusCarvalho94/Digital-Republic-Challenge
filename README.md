# Digital-Republic-Challenge

### API para realizar registro de clientes e transações financeiras

## Estrutura de diretórios
- Insomnia-file: Contém o arquivo de projeto do Insomnia
- src: Source da API
- - auth: Módulo de geração do JWT
- - controllers: Controladores de acesso a API
- - functions: Funções de uso comum no projeto
- - lib: Constantes do projeto
- - middlewares: Middlewares de requisições
- - models: Repositórios do banco de dados
- - routes: Rotas da API
- - schemas: Regras de validações de objetos
- - services: Código de domínio
- - tests: Testes unitários e integrados

## Dependências
- Node v16
- MongoDB v5

## Bibliotecas
- bcrypt: Biblioteca para criptografia
- express: Framework web
- joi: Biblioteca pra auxiliar em validações
- jsonwebtoken: Biblioteca para trabalhar com JWT
- mongodb: MongoDB driver

## Bibliotecas de desenvolvimento
- chai: Ferramenta para asserções de testes unitários
- chai-http: Ferramenta para asserções de testes integrados
- eslint: Ferramenta para validação de padrões de escrita do código
- eslint-config-airbnb-base: Plugin do padrão de escrita do airbnb
- esling-plugin-import: Plugin para permitir importação de padrões de escrita
- mocha: Bliblioteca para testes
- mongodb-memory-server: Mock do MongoDB
- nodemon: HTTP Server para desenvolvimento local
- nyc: Ferramenta para verificação de cobertura de testes
- sinon: Ferramenta que habilita mocks e stubs nos testes

## Como rodar a aplicação?
- Instale as dependências: `npm install`
- Inicie o servidor http: `npm start`
- O servidor estará disponível em `http://localhost:3000`
- Já tem um data do Insomnia com a API mapeada: `./Insomnia-file/Insomnia-digital-republic-challenge.json`
- Link para download do Insomnia `https://insomnia.rest/download`
- Link da documentação de como dar import no data `https://docs.insomnia.rest/insomnia/import-export-data`

## Como rodar os testes?
- Inicie o servidor http: `npm start`
- Rodar os testes: `npm test`
- Rodar os testes com cobertura de cógido: `npm run test:coverage`
