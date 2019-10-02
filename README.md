## Aula 20 - Configurando o Redux Saga

Vamos aprender o conceito novo de middleware no redux, middleware é um interceptador de actions no Redux, é o mesmo conceito lá no nodejs com express só que aplicado aqui para o Redux, o middleware intercepta uma action, faz alguma coisa e chama uma action para o reducer, o estado é alterado e o componente atualiza na tela.

Sempre que a gente dispara uma action, o Saga pode fazer um *side effect* nessa actions, e vamos ver algumas funções de efeito colateral.

No nosso app, quando adicionamos um tênis no carrinho, enviamos o produto cheio, que já estava na tela do usuário, porém precisavamos ver se tem em estoque, pegar mais inforamações desse produto, e vamos utilizar o redux saga para interceptar essa chamada a ação e fazer algo pra gente. Mas por enquanto vamos só pegar o ID do produto lá no frontend do componente React e passar para a chamada de uma action.

Vamos adicionar o redux saga na aplicação:

```
yarn add redux-saga
```

Vamos criar o saga e depois integrar o saga com o redux.

Vamos criar um arquivo `sagas.js` dentro de `models/cart`, então esse saga vai ser responsável apenas pelo carrinho de compras, podemos ter outros sagas para cada model, isto é, cada funcionalidade da aplicação, lembra que seperamos assim para ficar mais organizado.

Vamos criar uma (função generator](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/function*) que é uma função assíncrona, o generator é tem mais funcionalidades do que o async/await que é bastante usado também, e é obrigatório o generator aqui no redux-saga.

```
import { call, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { addToCartSuccess } from './actions';

function* addToCart({ id }) {
  const response = yield call(api.get, `/products/${id}`);
  yield put(addToCartSuccess(response.data));
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
```

Vamos mudar a estrutura atual, adicionando mais um passo adicional no fluxo de adicionar produto ao carrinho.

Nesse código, usamos os métodos do `redux-saga/effects`:

`call`: que é responsável por chamar a api externa, onde passamos a referência da função `get` de dentro da constante `api`, e passamos os parâmetros por `,`. É uma forma estranha de fazer mas é assim que tem que ser.

`put`: Que é responsável por executar uma função, para chamar o reducer.

`all`: É um agrupador de sagas, igual ao combineReducers do Redux
 
 `takeLatest`: é uma função que executa na última requisição do usuário, se o usuário clicar três vezes no adicionar carrinho e action for disparada três vezes, as duas primeiras serão canceladas, apenas a última que vai continuar, isso é uma maneira excelente para lidar com duplicade de requisição.

Então, criamos uma função assíncrona: `addToCart`, que chama a nossa api que configuramos no arquivo `api.js`, e depois dispara uma action para que o reducer possa receber o produto que veio dessa requisição.

E por fim exportamos o nosso saga com a possibilidade de adicionar mais sagas nesse arquivo e usando a função `takeLatest` para lidar com as actions.

Agora no arquivo `cart/actions.js`, vamos mudar a estrutura:

`addToCart` passa a ser `addToCartRequest` e recebe apenas o ID do produto, essa action é disparada no componente React da Home:

```
export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
  };
}

E criamos uma nova função `addToCartSuccess` que é a action disparada lá no saga quando finaliza a requisição de buscar produto da API e repassar para o reducer. Essa action que vai ser ouvida pelo reducer:

export function addToCartSuccess(product) {
  return {
    type: '@cart/ADD_SUCCESS',
    product,
  };
}
```

E lá no `cart/reducer.js` alteramos `@cart/ADD_TO_CART` para `@cart/ADD_SUCCESS`:

```
...
case  '@cart/ADD_SUCCESS':
...
```

Agora quando os dados que estão no saga serão enviados para o reducer.

Agora para funcionar temos que integrar o Saga com Store do Redux:

```
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './models/rootReducer';
import rootSaga from './models/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const enhancer =
  process.env.NODE_ENV === 'development'
    ? compose(
        console.tron.createEnhancer(),
        applyMiddleware(sagaMiddleware)
      )
    : applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
```

Importamos `applyMiddleware` que serve para aplicar os middlewares que informos para store e `compose` para agrupar as funções dentro do enhancer.

Importamos o `createSagaMiddleware` que configura o middleware de saga.

Importamos os nossos rootSaga também.

declarei uma constante sagaMiddleware que recebe as configurações do redux-saga, e no enhancer se estivermos em desenvolvimento vamos comport o Reactoton e sagaMiddleware, senão, apenas o sagaMiddleware para funcionar em desenvolvimento e produção.

Por fim, executamos o sagaMiddleware com todos os sagas que temos na aplicação.

Essa configuração é penosa, mesmo, díficil de decorar, mas no scripts da rockectseat tem os snniptes para gerar tudo isso ai. Bom mesmo é apenas aprender os conceitos por trás e depois só copy/paste =)

Agora sim, lá no componente Home alteremos a função handleAddProduct para receber apenas o id e não o produto.

```
 ...
 handleAddProduct = id => {
    const { addToCartRequest } = this.props;
    addToCartRequest(id);
  };
  
 ...
 <button type="button" onClick={() => this.handleAddProduct(product.id)}>
 ...
```
 
Pronto só testar, tudo está funcionando.

Veja os logs no Reactotron, vai perceber as actions que são disparada no saga não está sendo exibida, vamos na próxima aula configurar isso!

Veja os commits para entender melhor as configurações

Código: [https://github.com/tgmarinho/rocketshoes/tree/aula-20-configurando-redux-saga](https://github.com/tgmarinho/rocketshoes/tree/aula-20-configurando-redux-saga)