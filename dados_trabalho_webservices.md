## Objetivo: 
- Criar uma aplicação (Consumidor + API) relacionado à algum estudo de caso relacionado ao ramo financeiro​, seguros, pagamentos, previdência etc.​


## Pode ser de duas formas:​
1. Uma API que consuma outra API;: 
API Rest que prover recursos para consulta de produtos do tipo conta para pessoal física, a partir das informações do Open Banking. 


Deverá ser entregue (aqui ou no README do projeto) um texto contendo:​
1. O tema: 
API Rest que prover recursos para consulta de produtos do tipo conta para pessoal física, a partir das informações do Open Banking. 


2. As tecnologias escolhidas (linguagem, framework, aplicação etc.);​

- Nodejs 
  A API foi escrita em Nodejs

- Nestjs
  Utilizamos o framework [Nestjs](https://nestjs.com/) na construção da API. NestJS é um framework Node.js de código aberto destinado ao desenvolvimento de aplicativos do lado do servidor. Foi criado por Kamil Mysliwiec e lançado em 2017. Sob o capô, por padrão, o NestJS faz uso do framework Express.js, sendo também compatível com o Fastify. Sua arquitetura é fortemente inspirada no Angular.

- Redis
  Utilizamos o Redis para cachear as respostas das API's do OpenBanking. Utilizamos o [Redis Labs](https://redis.com/try-free) no plano free. 


3. Endereço do código-fonte (licença open source, se possível):
- https://github.com/grupojavafiap/fiap-products-banking-services



4. Página da documentação da API
- https://fiap-products-banking-services.herokuapp.com/


### Itens opcionais (adicionam valor à nota mínima):​
1. Código-fonte armazenado em um VCS (ex. GitHub e BitBucket):
- https://github.com/grupojavafiap/fiap-products-banking-services

2. Execução da aplicação em nuvem (ex. Heroku, GitHub Pages, AWS)
- https://fiap-products-banking-services.herokuapp.com/

3. Ferramenta de gestão de dependências;​
- NPM

4. Persistência e/ou caching;​
- Redis


### Credencias do Redis para rodar localmente.
#REDIS <br>
REDIS_HOST=redis-10295.c270.us-east-1-3.ec2.cloud.redislabs.com <br>
REDIS_PORT=10295 <br>
REDIS_PASSWORD=8vgJchUeJcHaYvmhebJqNW4otrrjgliO<br>


### Integrantes

| RM  | Aluno | Turma |
| ------------- |:-------------:| --------- | 
| 344792      | Benisson dos Santos Lopes     | 1SCJRBB-2022 |
| 344799      | Leonardo Guerra Torres Filho     | 1SCJRBB-2022 |
| 344801      | Lucas Eugenio Ribeiro     | 1SCJRBB-2022 |
| 344794      | César de Lira Santos     | 1SCJRBB-2022 |
| 344791      | Anderson Evangelista     | 1SCJRBB-2022 |