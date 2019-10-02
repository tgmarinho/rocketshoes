## Aula 22 - Separando as Actions

Vamos separar as responsabilidades do reducer e passar para o saga, o reducer vai apenas pegar os dados e armazenar na store, e quem vai validação vai ser o saga.

`cart/reducer`:
```
 case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const { product } = action;
        draft.push(product);
      });
```
Agora o ADD_SUCCESS vai receber apenas o produto com todas as modificações feita no saga e enviar para estado global.

```
import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { addToCartSuccess, updateAmount } from './actions';
import { formatPrice } from '../../../util/format';

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  if (productExists) {
    const amount = productExists.amount + 1;
    yield put(updateAmount(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);
    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
  }
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
```

E agora utilizamos o `select` para buscar o estado atual do reducer passando uma função e verificando se estive um produto conforme o id do produto que estamos adicionando.

Se existir, pegamos o produto exisitente adicionamos mais um  e chamamos o updateAmount que sabe atualizar a quantidade do produto, veja que chamamos uma action dentro do saga, antes da action que está executando concluir, e encerra-se o fluxo. Se não existir obtemos o produto e adicionamos o amount ao produto e o preço formatado. Por fim o AddToCartSuccess será chamado, encerrando o fluxo.


Código: [https://github.com/tgmarinho/rocketshoes/tree/aula-22-separando-actions](https://github.com/tgmarinho/rocketshoes/tree/aula-22-separando-actions)