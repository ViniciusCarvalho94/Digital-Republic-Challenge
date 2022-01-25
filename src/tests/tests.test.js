const chai = require('chai');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const sinon = require('sinon');
const { expect } = require('chai');

chai.use(chaiHttp);

const app = require('../app');
const { mockConnectionMongo } = require('./mockConnectionMongo');

describe('POST /register', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await mockConnectionMongo();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Se o usuário é criado corretamente', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/register').send({
        name: 'Gabigol Santos',
        cpf: '123.123.123-99',
        password: '123456',
      });
    });

    it('Retorna o código 201', () => {
      expect(response).to.have.status(201);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém _id', () => {
      expect(response.body).to.have.a.property('_id');
    });

    it('Retorna objeto que contém name', () => {
      expect(response.body).to.have.a.property('name');
    });

    it('Retorna objeto que contém cpf', () => {
      expect(response.body).to.have.a.property('cpf');
    });
  });

  describe('Erro ao tentar cadastrar com apena um nome', () => {
    let response;

    before(async () => {
      const clients = connectionMock.db('Bank').collection('clients');
      await clients.insertOne({
        name: 'Gabriel',
        cpf: '123.123.123-99',
      });
      response = await chai.request(app).post('/register').send({
        name: 'Gabriel',
        cpf: '123.123.123-99',
        password: '123456',
      });
    });

    it('Retorna código 400', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém message', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('Retorna mensagem correta', () => {
      expect(response.body.message).to.be.equal('Digite o nome completo, cpf valido (xxx.xxx.xxx-xx) e senha de 6 caracteres');
    });
  });

  describe('Erro ao tentar cadastrar com cpf no formato errado', () => {
    let response;

    before(async () => {
      const clients = connectionMock.db('Bank').collection('clients');
      await clients.insertOne({
        name: 'Gabigol Santos',
        cpf: '12312312399',
      });
      response = await chai.request(app).post('/register').send({
        name: 'Gabigol Santos',
        cpf: '12312312399',
        password: '123456',
      });
    });

    it('Retorna código 400', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém message', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('Retorna mensagem correta', () => {
      expect(response.body.message).to.be.equal('Digite o nome completo, cpf valido (xxx.xxx.xxx-xx) e senha de 6 caracteres');
    });
  });

  describe('Erro ao tentar cadastrar a senha com menos de 6 caracteres', () => {
    let response;

    before(async () => {
      const clients = connectionMock.db('Bank').collection('clients');
      await clients.insertOne({
        name: 'Gabigol Santos',
        cpf: '123.123.123-99',
      });
      response = await chai.request(app).post('/register').send({
        name: 'Gabigol Santos',
        cpf: '123.123.123-99',
        password: '12345',
      });
    });

    it('Retorna código 400', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém message', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('Retorna mensagem correta', () => {
      expect(response.body.message).to.be.equal('Digite o nome completo, cpf valido (xxx.xxx.xxx-xx) e senha de 6 caracteres');
    });
  });

  describe('Erro ao tentar cadastrar com cpf já cadastrado', () => {
    let response;

    before(async () => {
      const clients = connectionMock.db('Bank').collection('clients');
      await clients.insertOne({
        name: 'Gabigol Santos',
        cpf: '123.123.123-99',
      });
      response = await chai.request(app).post('/register').send({
        name: 'Gabigol Santos',
        cpf: '123.123.123-99',
        password: '123456',
      });
    });

    it('Retorna código 400', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém message', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('Retorna mensagem correta', async () => {
      expect(response.body.message).to.be.equal('Úsuario já cadastrado');
    });
  });
});

describe('POST /login', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await mockConnectionMongo();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Se consegue se logar corretamente', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/login').send({
        cpf: '123.123.123-99',
        password: '123456',
      });
    });

    it('Retorna o código 200', () => {
      expect(response).to.have.status(200);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém token', () => {
      expect(response.body).to.have.a.property('token');
    });
  });

  describe('Se não digitar o cpf', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/login').send({
        cpf: '',
        password: '123456',
      });
    });

    it('Retorna código 400', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém message', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('Retorna mensagem correta', async () => {
      expect(response.body.message).to.be.equal('Preencha os dois campos');
    });
  });

  describe('Se não digitar a senha', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/login').send({
        cpf: '123.123.123-99',
        password: '',
      });
    });

    it('Retorna código 400', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém message', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('Retorna mensagem correta', async () => {
      expect(response.body.message).to.be.equal('Preencha os dois campos');
    });
  });

  describe('Se digitar um cpf que não está cadastrado', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/login').send({
        cpf: '111.111.111-11',
        password: '123456',
      });
    });

    it('Retorna código 401', () => {
      expect(response).to.have.status(401);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém message', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('Retorna mensagem correta', async () => {
      expect(response.body.message).to.be.equal('CPF ou senha inválidos');
    });
  });

  describe('Se digitar a senha errado', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/login').send({
        cpf: '123.123.123-99',
        password: '111111',
      });
    });

    it('Retorna código 401', () => {
      expect(response).to.have.status(401);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém message', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('Retorna mensagem correta', async () => {
      expect(response.body.message).to.be.equal('CPF ou senha inválidos');
    });
  });
});

describe('Teste JWT middleware', async () => {
  describe('Se não existir um token de autorização', () => {
    let response;

    before(async () => {
      response = await chai.request(app).post('/deposit').send({
        cpf: '123.123.123-99',
        value: 500,
      });
    });
    it('Retorna código 401', () => {
      expect(response).to.have.status(401);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém message', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('Retorna mensagem correta', async () => {
      expect(response.body.message).to.be.equal('Está faltando o token de autorização');
    });
  });

  describe('Se o token estiver invalido', () => {
    let response;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJHYWJyaWVsIE9saXZhIiwiY3BmIjoiMTIzLjEyMy4xMjMtMTIifSwiaWF0IjoxNjQzMDYwNjUzLCJleHAiOjE2Njg5ODA2NTN9.bw92VUsveb7Zc9vATNsC_ZYvWZSpPoN8aK7yOX65G8w';

    before(async () => {
      response = await chai.request(app).post('/deposit').send({
        cpf: '123.123.123-99',
        value: 500,
      }).set('authorization', token);
    });
    it('Retorna código 401', () => {
      expect(response).to.have.status(401);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém message', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('Retorna mensagem correta', async () => {
      expect(response.body.message).to.be.equal('Token inválido');
    });
  });
});

describe('POST /deposit', () => {
  describe('Se depositar corretamente', () => {
    let response;

    before(async () => {
      const { token } = await chai.request(app).post('/login').send({
        cpf: '123.123.123-99',
        password: '123456',
      }).then((res) => res.body);
      response = await chai.request(app).post('/deposit').send({
        cpf: '123.123.123-99',
        value: 500,
      }).set('authorization', token);
    });
    it('Retorna código 200', () => {
      expect(response).to.have.status(200);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém message', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('Retorna mensagem correta', async () => {
      expect(response.body.message).to.be.equal('Depósito efetuado com sucesso!');
    });

    it('Retorna objeto que contém cpf', () => {
      expect(response.body).to.have.a.property('cpf');
    });

    it('Retorna objeto que contém value', () => {
      expect(response.body).to.have.a.property('value');
    });
  });

  describe('Se digitar um cpf inválido', () => {
    let response;

    before(async () => {
      const { token } = await chai.request(app).post('/login').send({
        cpf: '123.123.123-99',
        password: '123456',
      }).then((res) => res.body);
      response = await chai.request(app).post('/deposit').send({
        cpf: '',
        value: 500,
      }).set('authorization', token);
    });
    it('Retorna código 400', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém message', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('Retorna mensagem correta', async () => {
      expect(response.body.message).to.be.equal('CPF ou valor inválidos, cpf no formato (xxx.xxx.xxx-xx) e valor inteiro entre 1 e 2000');
    });
  });

  describe('Se digitar um valor inválido', () => {
    let response;

    before(async () => {
      const { token } = await chai.request(app).post('/login').send({
        cpf: '123.123.123-99',
        password: '123456',
      }).then((res) => res.body);
      response = await chai.request(app).post('/deposit').send({
        cpf: '123.123.123-99',
        value: 2001,
      }).set('authorization', token);
    });
    it('Retorna código 400', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém message', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('Retorna mensagem correta', async () => {
      expect(response.body.message).to.be.equal('CPF ou valor inválidos, cpf no formato (xxx.xxx.xxx-xx) e valor inteiro entre 1 e 2000');
    });
  });

  describe('Se digitar um cpf que não existe no banco de dados', () => {
    let response;

    before(async () => {
      const { token } = await chai.request(app).post('/login').send({
        cpf: '123.123.123-99',
        password: '123456',
      }).then((res) => res.body);
      response = await chai.request(app).post('/deposit').send({
        cpf: '123.123.123-10',
        value: 500,
      }).set('authorization', token);
    });
    it('Retorna código 400', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém message', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('Retorna mensagem correta', async () => {
      expect(response.body.message).to.be.equal('CPF ou valor inválidos, cpf no formato (xxx.xxx.xxx-xx) e valor inteiro entre 1 e 2000');
    });
  });
});

describe('POST /transfer', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await mockConnectionMongo();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('Se transferir corretamente', () => {
    let response;

    before(async () => {
      const clients = connectionMock.db('Bank').collection('clients');
      await clients.insertOne({
        name: 'Gabriel Barbosa',
        cpf: '123.123.123-80',
      });
      const { token } = await chai.request(app).post('/login').send({
        cpf: '123.123.123-99',
        password: '123456',
      }).then((res) => res.body);
      response = await chai.request(app).post('/transfer').send({
        cpf: '123.123.123-80',
        value: 500,
      }).set('authorization', token);
    });
    it('Retorna código 200', () => {
      expect(response).to.have.status(200);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém message', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('Retorna mensagem correta', async () => {
      expect(response.body.message).to.be.equal('Transferência realida com sucesso!');
    });

    it('Retorna objeto que contém cpf', () => {
      expect(response.body).to.have.a.property('cpf');
    });

    it('Retorna objeto que contém value', () => {
      expect(response.body).to.have.a.property('value');
    });
  });

  describe('Se digitar um valor inválido', () => {
    let response;

    before(async () => {
      const clients = connectionMock.db('Bank').collection('clients');
      await clients.insertOne({
        name: 'Gabriel Barbosa',
        cpf: '123.123.123-80',
      });
      const { token } = await chai.request(app).post('/login').send({
        cpf: '123.123.123-99',
        password: '123456',
      }).then((res) => res.body);
      response = await chai.request(app).post('/transfer').send({
        cpf: '123.123.123-80',
        value: 0,
      }).set('authorization', token);
    });
    it('Retorna código 400', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém message', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('Retorna mensagem correta', async () => {
      expect(response.body.message).to.be.equal('CPF ou valor inválidos, cpf no formato (xxx.xxx.xxx-xx)');
    });
  });

  describe('Se digitar um cpf inválido', () => {
    let response;

    before(async () => {
      const clients = connectionMock.db('Bank').collection('clients');
      await clients.insertOne({
        name: 'Gabriel Barbosa',
        cpf: '123.123.123-80',
      });
      const { token } = await chai.request(app).post('/login').send({
        cpf: '123.123.123-99',
        password: '123456',
      }).then((res) => res.body);
      response = await chai.request(app).post('/transfer').send({
        cpf: '123.123.123-50',
        value: 500,
      }).set('authorization', token);
    });
    it('Retorna código 400', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém message', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('Retorna mensagem correta', async () => {
      expect(response.body.message).to.be.equal('CPF ou valor inválidos, cpf no formato (xxx.xxx.xxx-xx)');
    });
  });

  describe('Se não tiver saldo sulficiente', () => {
    let response;

    before(async () => {
      const clients = connectionMock.db('Bank').collection('clients');
      await clients.insertOne({
        name: 'Gabriel Barbosa',
        cpf: '123.123.123-80',
      });
      const { token } = await chai.request(app).post('/login').send({
        cpf: '123.123.123-99',
        password: '123456',
      }).then((res) => res.body);
      response = await chai.request(app).post('/transfer').send({
        cpf: '123.123.123-80',
        value: 90000,
      }).set('authorization', token);
    });
    it('Retorna código 400', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('Retorna objeto que contém message', () => {
      expect(response.body).to.have.a.property('message');
    });

    it('Retorna mensagem correta', async () => {
      expect(response.body.message).to.be.equal('Saldo insuficiente');
    });
  });
});
