## Aula 17 - Alterando quantidade

Vamos adicionar ou remover a quantidade de items do produto.

Primeiro criamos uma action para atulizar a quantidade:

```
export function updateAmount(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT',
    id,
    amount,
  };
}
```

A action recebe o id do produto e a quantidade que deverá ser atualizada.

Depois conectamos essa função no componete do Carrinho:

```
import React from 'react';
import { connect } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { bindActionCreators } from 'redux';
import { Container, ProductTable, Total } from './styles';
import * as CartActions from '../../store/models/cart/actions';

function Cart({ cart, removeFromCart, updateAmount }) {
  function increment(product) {
    updateAmount(product.id, product.amount + 1);
  }
  function decrement(product) {
    updateAmount(product.id, product.amount - 1);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.price}</span>
              </td>
              <td>
                <div>
                  <button type="button">
                    <MdRemoveCircleOutline
                      size={20}
                      color="#7169c1"
                      onClick={() => decrement(product)}
                    />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button">
                    <MdAddCircleOutline
                      size={20}
                      color="#7169c1"
                      onClick={() => increment(product)}
                    />
                  </button>
                </div>
              </td>
              <td>
                <strong>R$ 258,80</strong>
              </td>
              <td>
                <div>
                  <button type="button">
                    <MdDelete
                      size={20}
                      color="#7169c1"
                      onClick={() => removeFromCart(product.id)}
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar Pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>R$ 1.920,28</strong>
        </Total>
      </footer>
    </Container>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

const mapStateToProps = state => ({
  cart: state.cart,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
```

Foi criado duas funções que foram utilizas nos botões de incrementar e decrementar a quantidade de produto no carrinho:

```
  function increment(product) {
    updateAmount(product.id, product.amount + 1);
  }
  function decrement(product) {
    updateAmount(product.id, product.amount - 1);
  }
```

Por fim criamos mais um case para tratar a chamada da action de atualizar quantidade:
```
...
    case '@cart/UPDATE_AMOUNT': {
      if (action.amount <= 0) {
        return state;
      }
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);
        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
 ...
```

Pronto, só testar.

Código: [https://github.com/tgmarinho/rocketshoes/tree/aula-17-alterando-quantidade](https://github.com/tgmarinho/rocketshoes/tree/aula-17-alterando-quantidade)