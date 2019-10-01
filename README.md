## Aula 16 - Refatorando as actions

Uma prática muito legal é separar as actions em um único arquivo por funcionalidade, e não deixar elas espalhadas no código como estão, e também criar uma variável onde armazenaremos o noma da action, para evitar erros de digitação e facilidar a manunteção dos nomes dessas actions.

Para fazer isso, vamos criar um arquivo `actions.js` dentro da pasta `store/models/cart`:

```
export function addToCart(product) {
  return {
    type: 'ADD_TO_CART',
    product,
  };
}

export function removeFromCart(id) {
  return {
    type: 'REMOVE_FROM_CART',
    id,
  };
}
```

Agoramos vamos usar essas funções nos componentes das telas Home e no Cart.

```
import  *  as CartActions from  '../../store/models/cart/actions';

 handleAddProduct = product => {
    const { dispatch } = this.props;

    dispatch(CartActions.addToCart(product));
  };
```

Pronto, dessa forma já podemos continuar adicionando produtos ao carrinho, mas podemos mudar um pouco mais para melhorar o código.

Importaremos o bindActionCreators do Redux:

```
import { bindActionCreators } from  'redux';
```

E assim como criamos o mapStateToProps, vamos criar o mapDispatchToProps:

```
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);
```

ele recebe o dispatch do redux, e o bindActionCreators faz a combinação de actions. Agora além de podermos ter o state nas props teremos também as actions.

E passamos como segundo parâmetro da função connect a função `mapDispatchToProps`.

Foi setado `null` na primeira posição pois esse componente não lida com estado.
```
export default connect(
  null,
  mapDispatchToProps
)(Home);
```

Pronto! Agora está funcionando, e o mesmo passo a passo vou fazer no carrinho também.

Legal também manter as actions com o nome da funcionalidade  + ação, então vou alterar:

```
export function addToCart(product) {
  return {
    type: '@cart/ADD',
    product,
  };
}

export function removeFromCart(id) {
  return {
    type: '@cart/REMOVE',
    id,
  };
}
```

E alterei também no reducer para ouvir corretamente, veja detalhes no código.

Código: [https://github.com/tgmarinho/rocketshoes/tree/aula-16-refatorando-as-actions](https://github.com/tgmarinho/rocketshoes/tree/aula-16-refatorando-as-actions)