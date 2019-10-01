## Aula 13 - Listando no carrinho

Agora vamos listar os produtos do carrinho na listagem de produtos no carrinho.
Para fazer isso vamos conectar o carrinho `cart/index.js` nosso componente Cart com o Redux, portanto, vamos importar connect e exportar o Cart com esse high order function envolvendo-o.

Única coisa nova aqui é que vamos criar uma função e passar para dentro do connect a referência dela.

Quando usamos o connect do Redux,  por convenção nós criamos  uma função chamada `mapStateToProps` e passamos a referência como primeiro parâmetro da função `connect(mapStateToProps)`.

`mapStateToProps`: mapear o estado do reducer para uma prop do componente.

```
...
const  mapStateToProps  =  state  => ({
	cart: state.cart,
});

export  default  connect(mapStateToProps)(Cart);
```

A partir de agora continua a mesma coisa, o componente Cart terá uma prop `cart` com o estado do reducer cart que está na store do Redux.

E agora podemos alimentar o componente Cart com esses valores.

```
import React from 'react';
import { connect } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { Container, ProductTable, Total } from './styles';

function Cart({ cart }) {
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
                    <MdRemoveCircleOutline size={20} color="#7169c1" />
                  </button>
                  <input type="number" readOnly value={1} />
                  <button type="button">
                    <MdAddCircleOutline size={20} color="#7169c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>R$ 258,80</strong>
              </td>
              <td>
                <div>
                  <button type="button">
                    <MdDelete size={20} color="#7169c1" />
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

const mapStateToProps = state => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Cart);
```

Falta fazer funcionar a atualização da quantidade, remover item do carrinho, e deixar o preço formatado e calcular o valor total.

Para isso vamos alterar o reducer do carrinho: `cart/reducer.js`.

Primeiro vamos colocar uma propridade de quantidade do produto no carrinho, que é o `amount`.

```
export default function cart(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, { ...action.product, amount: 1 }];
    default:
      return state;
  }
}
```

Pronto, toda vez que for incluso o produto, vai ser criado um estado com os dados do produto e o valor do amount será 1.

Na próxima aula iremos resolver o problema de produto duplicado. Pois o comportamento esperado é atualizar a quantide de produto e não duplicar o mesmo produto quando adicionamos ele mais de uma vez no carrinho.

Código: [https://github.com/tgmarinho/rocketshoes/tree/aula-13-listando-no-carinho](https://github.com/tgmarinho/rocketshoes/tree/aula-13-listando-no-carinho)