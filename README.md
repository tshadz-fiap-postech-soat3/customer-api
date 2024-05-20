## Descrição

Tech Challenge - Software Architecture

Acesse a [Wiki do Projeto](https://github.com/tshadz/soat3-tech-chalenge/wiki) para mais informações a respeito dos:

* Requisitos técnicos (business)
* Domain-Driven Design
* S-SDLC
* Arquitetura
* Vídeo explicativo postado no Vimeo

<p align="center">
  <a href="#tecnologias">Tecnologias</a> &#xa0; | &#xa0;
  <a href="#running">Como rodar a aplicação</a> &#xa0; | &#xa0;
  <a href="#docker-compose">Docker Compose</a> &#xa0; | &#xa0;
  <a href="#kubernetes">Kubernetes</a> &#xa0; | &#xa0;
</p>

<h2 id="tecnologias"> Tecnologias </h2>

As seguintes ferramentas foram usadas na construção do projeto:

* Typescript
* Node.js
* REST Api
* MySQL
* Swagger
* Nest Js
* Minikube
* k9s

<h2 id="running"> Como rodar a aplicação </h2>

Foi disponibilizado o passo-a-passo para rodar esse projeto localmente com o uso do docker-compose ou minikube e adicionalmente é possível conferir como utilizar o minikube dashboard e o k9s para gerenciamentos dos cluster aqui -> [k9s](docs/k9s.md) / [minikube](docs/minikube.md)

```bash
# Clone este repositório
$ git clone <https://github.com/tshadz-fiap-postech-soat3>

# Acesse a pasta do projeto no terminal
$ cd ./customer-api

# Crie um arquivo `.env` na pasta raíz do projeto com as suas informações:

MONGODB_PORT = 27017
MONGO_INITDB_DATABASE = fast-food
MONGODB_DB = fast-food
MONGODB_USER = root
MONGODB_PASSWORD = example
```
<h3 id="docker-compose"> Docker-compose </h3>

```bash
# Iniciar o projeto
$ docker compose up -d --build

# Acesse o container
$ docker exec -it fast-food sh

# Dentro do container rode as migrations
$ npx ts-node prisma/seed.ts

# O servidor inciará na porta:8080 - acesse <http://localhost:8080>
```
![docker compose up](https://github.com/tshadz/soat3-tech-chalenge/assets/80704054/7fa20867-2b2a-4bec-8ce2-02d886ce0897)

![docker exec](https://github.com/tshadz/soat3-tech-chalenge/assets/80704054/5ae747af-2371-439c-9bcf-1408cb2f9a6b)


### Testes

```bash
# unit tests
$ npm run test

```
<h3 id="kubernetes"> Kubernetes </h3>

```bash
# Iniciar o minikube
$ minikube start

# Deploy da aplicação
$ kubectl apply -f k8s/

# Port-forward para acessar a api
$  kubectl port-forward deployment/fast-food-deployment 8080:8080

# O servidor inciará na porta:8080 - acesse <http://localhost:8080>

```
## Swagger

### Após rodar o projeto, acesse http://localhost:8080/swagger
![swagger](https://github.com/tshadz/soat3-tech-chalenge/assets/80704054/f5ba4ca7-a7b4-4dc8-9d0c-3c3c2f7cd2c7)
