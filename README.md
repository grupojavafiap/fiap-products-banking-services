# fiap-products-banking-services
API Rest que prover recursos para consulta de produtos do tipo conta para pessoal física, a partir das informações do Open Banking. 

## Pré requisitos
Nodejs - 12.x a 14.x
NPM    - 6.x.x


## Instalando dependencias. 

```bash
$ npm install
```

## Criando arquivo de variáveis de ambiente

- Criei o arquivo `.env` na raiz do projeto.

Adicine o conteudo abaixo no `.env`
```bash
#PARAMETROS APIS
URL_DIRETORY_PARTICIPANTS=https://data.directory.openbankingbrasil.org.br/participants
API_FAMILY_TYPE=products-services
PATTERN_ENDPOINT=products-services/v1/personal-accounts

#REDIS
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=

#NODEJS
PORT=3000
API_HOST=http://localhost:3000
```

## Como rodar?

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

- Acesse a URL http://localhost:3000


## Documentação da API
Usamos a espeficicação [OpenAPI](https://www.openapis.org/) para documentar a API e seus recursos.




## Cloud
O projeto foi deployado na Heroku e pode ser acessado na URL:
- https://fiap-products-banking-services.herokuapp.com



## Tecnologias Utilizadas
- Nodejs 
  A API foi escrita em Nodejs

- Nestjs
  Utilizamos o framework [Nestjs](https://nestjs.com/) na construção da API. NestJS é um framework Node.js de código aberto destinado ao desenvolvimento de aplicativos do lado do servidor. Foi criado por Kamil Mysliwiec e lançado em 2017. Sob o capô, por padrão, o NestJS faz uso do framework Express.js, sendo também compatível com o Fastify. Sua arquitetura é fortemente inspirada no Angular.

- Redis
  Utilizamos o Redis para cachear as respostas das API's do OpenBanking. Utilizamos o [Redis Labs](https://redis.com/try-free) no plano free. 


## Documentação das API OpenBanking utilizadas.

- API de Produtos e Servicos
  - https://openbankingbrasil.atlassian.net/wiki/spaces/OB/pages/1736880/Informa+es+T+cnicas+-+Produtos+e+Servi+os+-+v1.0.2

- API de Participantes 
  - https://data.directory.openbankingbrasil.org.br/participants


## Atualização do Cache
Criamos uma rotina que roda a cada 15 minutos e consume as informações das API's e armazenam em cache.


### Integrantes

| RM  | Aluno | Turma |
| ------------- |:-------------:| --------- | 
| 344792      | Benisson dos Santos Lopes     | 1SCJRBB-2022 |
| 344799      | Leonardo Guerra Torres Filho     | 1SCJRBB-2022 |
| 344801      | Lucas Eugenio Ribeiro     | 1SCJRBB-2022 |
| 344794      | César de Lira Santos     | 1SCJRBB-2022 |
| 344791      | Anderson Evangelista     | 1SCJRBB-2022 |