# Oficina Web

Sistema completo para gestão de oficinas, com backend em .NET e frontend em React.

## Estrutura do Projeto

```
OFICINA WEB.sln
package.json
tsconfig.json
backend/
  OficinaAPI/
    Controllers/
    Data/
    Models/
    ...
frontend/
  src/
    components/
    pages/
    ...
```

---

## Funcionalidades

### Backend ([backend/OficinaAPI](backend/OficinaAPI))

API REST desenvolvida em .NET para gerenciar dados da oficina.

- **Gerenciamento de Clientes:**  
  CRUD completo de clientes via [`ClientesController`](backend/OficinaAPI/Controllers/ClientesController.cs).
- **Persistência de Dados:**  
  Utiliza Entity Framework Core, com contexto definido em [`AppDbContext`](backend/OficinaAPI/Data/AppDbContext.cs).
- **Migrations:**  
  Controle de versões do banco de dados na pasta [`Migrations`](backend/OficinaAPI/Migrations).
- **Configurações:**  
  Arquivos de configuração em [`appsettings.json`](backend/OficinaAPI/appsettings.json) e [`appsettings.Development.json`](backend/OficinaAPI/appsettings.Development.json).
- **Testes de API:**  
  Arquivo [`OficinaAPI.http`](backend/OficinaAPI/OficinaAPI.http) para testar endpoints.
- **Documentação e Lembretes:**  
  Notas em [`LEMBRETES.txt`](backend/OficinaAPI/LEMBRETES.txt).

### Frontend ([frontend](frontend))

Aplicação React para interação com a API e visualização dos dados.

- **Componentização:**  
  Componentes reutilizáveis em [`components`](frontend/src/components).
- **Páginas:**  
  Navegação entre páginas em [`pages`](frontend/src/pages).
- **Estilização:**  
  CSS modular em [`App.css`](frontend/src/App.css) e [`index.css`](frontend/src/index.css).
- **Integração com Backend:**  
  Consome a API para exibir e manipular dados de clientes e outros recursos.
- **Configuração do Vite:**  
  Build e desenvolvimento rápido com [`vite.config.js`](frontend/vite.config.js).

---

## Como rodar o projeto

### Pré-requisitos

- [.NET 7+](https://dotnet.microsoft.com/)
- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Backend

```sh
cd backend/OficinaAPI
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend

```sh
cd frontend
npm install
npm run dev
```

---

## Observações

- O backend roda por padrão em `https://localhost:5001`.
- O frontend roda por padrão em `http://localhost:5173`.
- Ajuste as URLs de integração conforme necessário nos arquivos de configuração.

---

## Licença

Este projeto é open-source e está sob a licença MIT.
