## Aula 10 - Configurando o Redux

Nessa Aula vamos configuar o Redux na aplicação.

```
yarn add redux react-redux
```
Instalamos o redux em si e a integração do React com Redux.

Vamos criar uma pasta `store` de dentro da `src` com o arquivo `index.js`:

```
import { createStore } from 'redux';

const store = createStore();

export default store;
```

Agora no App.js vamos importar o `Provider` do `react-redux` para poder deixar disponível o `store` em toda a aplicação, portanto o `Provider` tem que envolver todos os componentes. E o provider recebe uma prop chamada store, que é a store que criamos, no código acima.

```
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import GlobalStyle from './styles/globals';
import Header from './components/Header';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <GlobalStyle />
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
```

Pronto agora o store está disponível na aplicação, e o projeto *crashou*.

```
Error: Expected the reducer to be a function.
```

Isso ocorreu, porque sempre que criamos um store, temos que passar uma função que é **reducer**.

Vamos criar o nosso primeiro reducer para deixar disponível no store.

```
import { createStore } from 'redux';

function cart() {
  return [];
}

const store = createStore(cart);

export default store;
```
Pronto agora o app volta a funcionar.

Porém se aplicação crescer demais, é interessente separar os reducers em outro arquivo, por módulo e funcionalidade.

Então vamos criar uma pasta `models` e dentro dela outra pasta `cart` com o arquivo `reducers.js`:

E dentro dela colocar o reducer de carrinho.

```
export  default  function  cart() {
	return [];
}
```

E importamos no index.js do store:

```
import { createStore } from 'redux';
import reducer from './models/cart/reducer';

const store = createStore(reducer);

export default store;
```

Mas como vamos ter vários reducers vamos ter que mudar o store novamente, vamos criar um arquivo `rootReducer.js` dentro de `models`, e esse arquivo vai conter todas as funções dos reducers e vamos combiná-las para que o store tenha acesso em um único estado.

`rootReducer.js`: 
```
import { combineReducers } from 'redux';

import cart from './cart/reducer';

export default combineReducers({
  cart,
});
```

e no `index.js` da store, importamos o `rootReducer` que contém os reducers:

```
import { createStore } from 'redux';
import rootReducer from './models/rootReducer';

const store = createStore(rootReducer);

export default store;
```

Até aqui a aplicação está funcionando, mas ainda não estamos utulizando os reducers, apenas configuramos o store e reducers, ainda falta as actions e o acesso aos stores.


Código: [https://github.com/tgmarinho/rocketshoes/tree/aula-10-configurando-redux ](https://github.com/tgmarinho/rocketshoes/tree/aula-10-configurando-redux )