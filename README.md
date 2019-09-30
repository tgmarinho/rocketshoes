## Aula 08 - Configurando a API

Configurar a API para consumir produtos.

Utilizamos a API [json-server](https://github.com/typicode/json-server) para criar uma API Fake, que simula o que aconteceria em uma API Real.

Só criar um json com os dados fake e rodar o json-server que vai simular a API, inclusive dá para configurar tempo de resposta e outras coisas mais.

Para instalar de forma global na máquina:

```
yarn add json-server -D
```
Depois criar um arquivo `server.json` na raiz do projeto e colocar os dados contendo o estoque  (stock) e os produtos (products), inclusive fazendo os relacionamentos com id.

Teremos uma rota stock que retorna o estoque dos produtos, e a rota products que retorna os produtos.

Vamos configurar o axios para consumir essa api.

```
yarn add axios
```

Veja o arquivo `api.js` no código fonte.

E para rodar a api fake, basta rodar:

```
yarn json-server server.json -p 3333 -w
```

E podemos também ter um script no package.json:

```
...
"server":  "json-server server.json -p 3333 -w"
...
```

E rodar `yarn server` para executar a api.

* json-server é o nome da lib
* server.json é o nome do arquivo que tem a api fake e está na raiz do projeto, por isso não passo o caminho, apenas o nome do arquivo. Está no mesmo nível do package.json
* -p 3333 é a porta que defini para rodar essa api
* -w é para ficar `watching` cada alteração que eu fizer na api, se eu mudar alguma coisa lá dentro não preciso rodar o comando novamente.

Pronto agora para acessar, só chamar a rota que deseja:

```
http://localhost:3333/stock
```

e 

```
http://localhost:3333/products
```

Ambas as rotas vão mostrar um array com seus respectivos objetos.

Legal, que se eu chamar o produto e passando o id, ele me traz apenas o produto com seu respectivo id informado:
```
[http://localhost:3333/products/4](http://localhost:3333/products/4)
```
Se eu passar um ID q não exisite ele retorna um objeto vazio.

Dá até para deletar e atualizar valores dentro dessa api, é muito legal!

Excelente para usar em modo de desenvolvimento no frontend quando um backend não foi feito ainda com a API.

Código: [https://github.com/tgmarinho/rocketshoes/tree/aula-08-configurando-api](https://github.com/tgmarinho/rocketshoes/tree/aula-08-configurando-api)