## Aula 23 - Estoque na Adição

Vamos consultar o estoque antes de adicionar para ver se está disponível.

```
import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { addToCartSuccess, updateAmount } from './actions';
import { formatPrice } from '../../../util/format';

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    console.tron.warn('ERRO!');
    return;
  }

  if (productExists) {
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

Depois de verificar se o produto já existe no estado, 

Eu chamo a rota stock passando o id do produto, e armazeno na variável stocl.

Criei a variável stockAmout para guardar a quantidade do estoque.

Criei a variável currentAmount para pegar o valor da quantidade de produto atual que já está no carrinho.

Criei a variável amount para receber o valor atual com mais um.

Verifico se a nova quantidade de produtos é maior que o valor em estoque se for, envio uma mensagem de erro e paro a requisição com o `return`.

Agora só testar.

Código: [https://github.com/tgmarinho/rocketshoes/tree/aula-23-estoque-na-adicao](https://github.com/tgmarinho/rocketshoes/tree/aula-23-estoque-na-adicao)