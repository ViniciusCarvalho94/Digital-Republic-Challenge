## Digital-Republic-Challenge

Pré-requisitos: node LTS, e mongoDB

* Essa aplicação foi desenvolvida utilizando: Node.js, express, JWT, joi, bcrypt e mongoDB.
* Para facilitar o desenvolvimento da API foi utilizado o nodemon e eslint com base do airbnb e algumas modificações.
* Foi utilizada a arquitetura de software no padrão MSC (Model, Service, Controller).
* Para teste foi utilizado: chai, chai-http, mocha, mongodb-memory-server e sinon.
* Para facilitar os testes foi utilizado o nyc.


As opções que estão com * estão melhor explicadas no final.

1. **npm install**, para instalar dependências.
2. **npm start**, para rodar o servidor na porta 3000.
3. *Caso queira testar via software utilize o Insomnia.
4. ****npm test**, para testar via mocha.
5. **npm run test:coverage**, ele ira testar via mocha e irá criar uma pasta com o nome **coverage**, abra o **index.html** que está dentro dela para saber a cobertura que foi feita nos testes.

*. Baixe e instale o **Insomnia** pelo link: https://insomnia.rest/download e faça o import do arquivo que está na pasta **Insomnia-file** para o Insomnia. Link para a documentação sobre como importar uma coleção: https://docs.insomnia.rest/insomnia/import-export-data.

**. Deixe o npm start rodando de fundo antes de qualquer teste.