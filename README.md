# Oficina Web

Sistema completo para gestão de oficinas mecânicas, desenvolvido com backend em .NET e frontend em React. O projeto permite gerenciar clientes, veículos, ordens de serviço e acompanhar as operações da oficina através de uma interface moderna e intuitiva.

## Principais funcionalidades

### Gestão de Clientes

* Cadastro de clientes
* Consulta e edição de informações
* Relacionamento entre clientes e veículos

### Gestão de Veículos

* Cadastro de veículos
* Associação de veículos aos clientes
* Consulta e atualização de dados

### Ordens de Serviço

* Abertura de ordens de serviço
* Registro de descrições e observações
* Controle de status
* Registro de datas de abertura e finalização
* Controle de valores dos serviços

### Dashboard

* Visualização de indicadores do sistema
* Acompanhamento das operações da oficina

## Arquitetura Geral

### Backend (.NET)

Responsável pelas regras de negócio, persistência dos dados e exposição da API REST.

#### Controllers

Gerenciam as requisições HTTP recebidas pelo sistema.

#### Models

Representam as entidades da aplicação.

#### Data

Responsável pela configuração e acesso ao banco de dados através do Entity Framework.

### Frontend (React)

Responsável pela interface do usuário e comunicação com a API.

#### Pages

Contém as telas principais do sistema.

#### Components

Componentes reutilizáveis utilizados na construção das páginas.

#### Services

Responsáveis pela comunicação com a API backend.

## Fluxo de Uso

### Cadastro Inicial

1. Cadastrar clientes
2. Cadastrar veículos vinculados aos clientes

### Operação da Oficina

1. Abrir uma ordem de serviço
2. Associar cliente e veículo
3. Registrar os serviços realizados
4. Atualizar o status da ordem
5. Finalizar o atendimento

### Acompanhamento

1. Consultar ordens de serviço
2. Visualizar clientes e veículos cadastrados
3. Acompanhar informações através do dashboard

## Tecnologias Utilizadas

### Backend

* .NET
* ASP.NET Core
* Entity Framework Core
* C#

### Frontend

* React
* JavaScript
* Vite
* Bootstrap

### Banco de Dados

* MySQL

## Requisitos e Execução

### Pré-requisitos

* .NET SDK
* Node.js
* MySQL

### Backend

```bash
cd backend/OficinaAPI
dotnet restore
dotnet run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Estrutura Resumida do Projeto

```text
backend/
 └─ OficinaAPI/
     ├─ Controllers/
     ├─ Data/
     ├─ Models/
     └─ ...

frontend/
 ├─ src/
 │   ├─ components/
 │   ├─ pages/
 │   └─ ...
 └─ public/
```

## Objetivo do Projeto

Este projeto foi desenvolvido com o objetivo de aplicar conceitos de desenvolvimento full stack em um cenário real, envolvendo integração entre frontend e backend, modelagem de banco de dados, arquitetura de software e boas práticas de desenvolvimento.

## Autor

Mikaella Correa

Desenvolvedor em formação, atuando na área de TI com foco em automação de processos e desenvolvimento de sistemas.
