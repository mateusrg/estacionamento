# Adam Estacionamento

Este projeto é um sistema de gerenciamento de estacionamento que permite cadastrar, editar, visualizar e remover carros estacionados, desenvolvido para uma atividade de revisão do 3º ano do Ensino Médio. O sistema é composto por um frontend em HTML, CSS e JavaScript, e um backend em Node.js com Express.

## Índice

- [Requisitos Funcionais](#requisitos-funcionais)
- [Requisitos Não Funcionais](#requisitos-não-funcionais)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Prototipagem](#prototipagem)
- [API](#api)

## Requisitos Funcionais

1. **Cadastro de Carros**: O sistema deve permitir o cadastro de carros, incluindo informações como placa, marca, modelo, cor, data e hora de entrada.
2. **Edição de Carros**: O sistema deve permitir a edição das informações dos carros cadastrados.
3. **Remoção de Carros**: O sistema deve permitir a remoção de carros do estacionamento; entretanto, não deve permitir sua exclusão permanente, pois eles precisam ser exibidos no histórico.
4. **Visualização de Carros Estacionados**: O sistema deve exibir uma lista de todos os carros atualmente estacionados, agrupados por setor.
5. **Histórico de Carros**: O sistema deve permitir a visualização do histórico de todos os carros que já passaram pelo estacionamento, bem como o histórico específico de cada vaga.
6. **Validação de Dados**: O sistema deve validar os dados de entrada, garantindo que horários, datas e demais dados cadastrados sejam válidos.

## Requisitos Não Funcionais

1. **Desempenho**: O sistema deve ser capaz de lidar com um grande número de registros sem degradação significativa de desempenho.
2. **Usabilidade**: A interface do usuário deve ser intuitiva e fácil de usar.
3. **Portabilidade**: O sistema deve ser capaz de rodar em diferentes ambientes, desde que as dependências estejam instaladas.

## Instalação

### Passos para Instalação

1. Clone o repositório:

```sh
git clone https://github.com/mateusrg/estacionamento.git
cd estacionamento
```

2. Instale as dependências do backend:
```sh
cd server
npm install
```

## Configuração

1. Configure o banco de dados MySQL conforme o arquivo ./server/config/db.sql

2. Atualize o usuário e a senha em ./server/config/db.js

## Uso

### Iniciar o Backend

1. Digite no terminal:
```sh
cd server
npm start
```

### Iniciar o Frontend

1. Abra o arquivo index.html em um navegador web.

## Estrutura do Projeto
estacionamento/
├── client/
│   ├── css/
│   │   ├── bootstrap.min.css
│   │   ├── style.css
│   ├── html/
│   │   ├── index.html
│   ├── js/
│   │   ├── bootstrap.bundle.min.js
│   │   ├── main.js
├── server/
│   ├── config/
│   │   ├── db.js
│   ├── controllers/
│   │   ├── carroController.js
│   │   ├── vagaController.js
│   ├── models/
│   │   ├── carroModel.js
│   │   ├── vagaModel.js
│   ├── routes/
│   │   ├── carroRoutes.js
│   │   ├── vagaRoutes.js
│   ├── app.js
│   ├── package.json
├── .gitignore
└── README.md

## Prototipagem
O design e a prototipagem do sistema foram realizados no Figma. Você pode acessar o protótipo através do link abaixo:
[Figma - Adam Estacionamentos](https://www.figma.com/design/mrNgdlxbfWQXK4lN5N3dUm)

## API

### Endpoints

#### Carros

- `POST /carro`: Cadastrar um novo carro no estacionamento.
- `GET /carro`: Obter todos os carros já cadastrados, inclusive aqueles que não estão mais no estacionamento.
- `GET /carro/:id`: Obter um carro pelo ID.
- `GET /carro/vaga/:idVaga`: Obter todos os carros já cadastrados em uma vaga.
- `PUT /carro`: Para atualizar um carro no estacionamento.
- `PUT /carro/retirar/:id`: Retirar um carro de uma vaga. Isso não apaga o carro do banco, apenas acrescenta uma data de saída a ele, removendo-o do estacionamento.
- `DELETE /carro/:id`: Deletar um carro. Essa rota não é utilizada em nenhum momento, pois, conforme requisitos previamente estabelecidos, não se deve poder excluir um carro, pois isso também o apagaria do histórico do estacionamento. Entretanto, ela pode ser chamada via Thunder Client caso necessário.

#### Vagas

- `POST /vaga`: Cadastrar uma nova vaga. Essa rota não é utilizada, pois todas as rotas do estacionamento já vêm previamente cadastradas; entretanto, pode ser chamada via Thunder Client caso necessário e o sistema lida perfeitamente com essa adição de vagas sem problemas.
- `GET /vaga`: Obter todas as vagas.
- `PUT /vaga`: Atualizar uma vaga. Também não é utilizada em nenhum momento.
- `DELETE /vaga/:id`: Deletar uma vaga. Também não é utilizada em nenhum momento.