## Aula 06 - Convertendo classe pra hooks

Vou converter o projeto rocketshoes do frontend com React para usar Hooks. Vou utilizar a última branch mais atual com classes.

Baixar o projeto: [https://github.com/tgmarinho/rocketshoes/tree/aula-26-navegacao-no-sagas](https://github.com/tgmarinho/rocketshoes/tree/aula-26-navegacao-no-sagas)

Primeiro eu baixo o plugin do eslint para lidar com hooks:

```
yarn add eslint-plugin-react-hooks -D
```

No arquivo `.eslintrc` adiciono o plugin `react-hoooks`:

```
plugins: ['react', 'prettier', 'react-hooks'],
```

E nas `rules`: adiciono:

```
...
'react-hooks/rules-of-hooks':  'error',
'react-hooks/exhaustive-deps':  'warn',
...
```

Pronto, agora vamos começar a refatorar o componente statefull Home:

Os imports vão ficar assim:
de:
```
import React, { Component } from  'react';
```
para:
```
import React, { useState, useEffect } from  'react';
```

Primeiro vamos alterar as declarações de estados.

de:
```
state = {
 products: []
}
```

para: 
```
const [products, setProducts] =  useState([])
```


Depois alteramos a class para function:
de: 
```
class  Home  extends  Component { ... }
```
para:
```
function  Home() { ... }
```

E agora vamos refatorar o `componentDidMount` e usar `useEffect`:

de:
```
async componentDidMount() {
    const response = await api.get('products');
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));
    this.setState({ products: data });
  }
```

para:
```
 useEffect(() => {
   async function loadProducts() {
    const response = await api.get('products');
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    setProducts(data)
   }

   loadProducts()
 }, [])
```

Confesso que fica mais complexo na primeira impressão, pois como estamos lidando com uma chamada assincrona, não podemos fazer como no código abaixo, e o que seria o mais óbivio no primeiro contato:

```
 useEffect( async () => {
    const response = await api.get('products');
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));
    setProducts(data)
   }

 }, [])
```

Acho que todos fariam assim na primeira vez, eu mesmo já fiz isso antes! lol

O jeito certo está lá em cima, então precisamos declarar uma função assíncrona, que executa toda a lógica anterior do mesmo jeito e inclui o dada no setProducts para alterar o estado, do jeito React Hook de se fazer. E no final invocamos a função.

Observe também que não passei nenhum estado no array de dependência `[]`, com isso esse useEffect vai ser executado apenas quando o componente estiver montando em tela, e só essa vez, então nesse caso só precisamos que carregue o produto na tela apenas uma única vez, igual fizemos com a classe usando o `componentDidMount`.

Agora vamos refatorar o método `render() { ... } `

de:
```
render() {
    const { products } = this.state;
    const { amount } = this.props;
    return (
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button
              type="button"
              onClick={() => this.handleAddProduct(product.id)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#fff" />{' '}
                {amount[product.id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
```

para:
```
return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>
          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" />{' '}
              {amount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
```

A função `handleAddProduct` pode ser removida, e a `addToCartRequest` pode ser passada na props do componente Home.
 
Podemos passar a prop dentro da `function Home({ amount, addToCartRequest }) {...}`

Tudo fica assim:
```
import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProductList } from './styles';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/models/cart/actions';

function Home({ amount, addToCartRequest }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');
      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>
          <button type="button" onClick={() => addToCartRequest(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" />{' '}
              {amount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
```

Pronto!

Agora está tudo usando funções e o único componente que gerencia estado está usando função com Hooks.

Código [https://github.com/tgmarinho/rocketshoes/tree/aula-27-convertendo-classes-para-hooks](https://github.com/tgmarinho/react-hooks/tree/aula-27-convertendo-classes-para-hooks)