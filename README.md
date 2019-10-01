## Aula 18 - Calculando totais

Vamos calcular o subtotal do produto que é a quantidade x preço do produto.

Não é uma boa prática fazer calculos dentro do render do React, pois a cada atualização do valor esse cálculo vai ser feito e onerar o site com vários processos que não são necessários em tela.

O melhor lugar de fazer calculo dos valores é quando está mapenando o estado para as props, onde o estado já foi atualizado e ele vai retornar o estado, podemos fazer algumas modificações adicionais.

Como queremos formatar o subtotal vamos utilizar a função `formatPrice` novamente:

```
import { formatPrice } from  '../../util/format';
```
E adicionar o calculo do subtotal para cada produto: 
```
const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
});
```

Para a prop cart: vamos retorna um array de produtos adionando a propriedade subtotal ao prodcut.

E depois só utilizar essa propriedade:

```
<td>
   <strong>{product.subtotal}</strong>
</td>
```

Pronto, a cada alteração no amount vai ser feito o cálculo do subtotal de todos os valores.

Vamos fazer agora o calculo do valor total do carrinho:

```
const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});
```
Criamos uma nova prop total que recebe o valor total dos items no carrinho.

Só acessar a prop total:
```
function  Cart({ cart, removeFromCart, updateAmount, total }) { ... }
```

E usar no seu devido lugar:

```
<Total>
	<span>TOTAL</span>
	<strong>{total}</strong>
</Total>

Pronto, só testar!

```
Código: [https://github.com/tgmarinho/rocketshoes/tree/aula-18-calculando-totais](https://github.com/tgmarinho/rocketshoes/tree/aula-18-calculando-totais)