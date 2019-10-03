## Aula 26  - Navegação no Saga

Agora quando adicionarmos um novo produto ao carrinho, vamos redirecionar para o carrinho, essa é apenas uma funcionalidade extra para entender a navegação de rotas usando o saga, do jeito que está a aplicação até agora é melhor.

Vamos utilizar a lib [history](https://github.com/ReactTraining/history) para para controlar a History API do navegador, as rotas que o react-router-dom utiliza.

```
yarn add history
```

Depois eu crio um arquivo `history.js` dentro da pasta services, com a seguinte configuração:

```
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default history;
```

E no App.js vamos utilizar essa lib:


```
import './config/ReactotronConfig';
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import GlobalStyle from './styles/globals';
import Header from './components/Header';
import store from './store';

import history from './services/history';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
```

Alteramos o BrowserRouter por Router e passamos o history como props. O react-router-dom está ouvindo tudo o que acontecer no history.

E por fim, no saga quando encerrar a requisição o usuário vai ser redirecinado:

```
...
import history from  '../../../services/history';
...

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));

    history.push('/cart');
  }
}
...
```

Como estamos forçando o navagador ir para tela `/cart/` o react-router-dom vai ouvir e atender a solicitação:

```
history.push('/cart');
```

E para testar podemos rodar o json-server com um delay de dois segundos a cada requisição:

```
json-server server.json -p 3000 -w -d 2000
```

Perceba que agora vai demorar um pouco mais a cada requisição a API e a página seria redirecionada para o carrinho, assim que adionar o produto.

Pronto, aplicação concluída, estamos manjando de React, Redux, Saga, React-router-dom, JsonServer, Reactotron, etc.


Código: [https://github.com/tgmarinho/rocketshoes/tree/aula-26-navegacao-no-sagas](https://github.com/tgmarinho/rocketshoes/tree/aula-26-navegacao-no-sagas)