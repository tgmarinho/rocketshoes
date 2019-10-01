## Aula 11 - Adicionando ao carrinho

Vamos adicionar o produto ao Carrinho,  todos os dados da tela serão passados para o reducer de carrinho que vamos criar.

Vamos utilizar o Redux agora no component da Home

Para conectar o componente com Redux vamos utilizar a função `connect` do `react-redux`.

`Home/index.js`:
```
import { connect } from  'react-redux';
```

O connect retorna outra função, e com essa função de retorno, nós chamamos ela passando o componente como parâmetro:

`Home/index.js`:
```
...
class  Home  extends  Component { ... }
...
export  default  connect()(Home);
```

connect() recebe alguns parametros, que vamos falar pra frente:

Para disparar uma action para o redux, precisamos de uma função, então quando o usuário clicar no botão de adicionar ao carrinho, vamos disparar um action.

```
 <button
   type="button"
   onClick={() => this.handleAddProduct(product)}  
>
```

Quando usamos o `connect`, ele passa para o componente um `prop` chamada `dispatch` que serve para chamar uma **ação**, ou seja, disparar uma ação.

```
this.props.dispatch
```

**Dispatch** é uma função que recebe uma action e a action tem um tipo e o valor que ela carrega com ela, o tipo (*type*) é obrigatório

Exemplo de uma action:
```
// action
{
	type: 'ADD_TO_CART',
	product,
}
```

Então quando o usuário clicar no botão vai ser chamado essa função `handleAddProduct` que vai utilizar a prop `dispatch` para executar a função com parametro infomando o type: 'ADD_TO_CART' que algum reducer (cart reducer) vai ouvir e tratar o valor `product` que está sendo enviado como parâmetro:

```
...
  handleAddProduct = product => {
    const { dispatch } = this.props;
    dispatch({
      type: 'ADD_TO_CART',
      product,
    });
  };
...
```

Agora vamos testar a chamada dessa função, adicionando um log no `cart/reducer.js`:

```
export default function cart() {
	console.log('teste');
	return [];
}
```

Agora abrindo console do navegador, vamos ver que apareceu ***teste*** três vezes, ou seja, a função foi chamada mesmo sem termos clicado no botão adicionar carrinho, vou explicar depois, e logo quando clicamos no adicionar carrinho a função dispatch é disparada e o log  ***teste*** aparece no navegador.

Toda vez que um *dispatch* é disparado todos os reducers escutam e executam a função. Fique com isso em mente. Agora qual reducer vai lidar com a chamada, depende do type e do reducer que escuta esse type, já vamos ver isso melhor.

E para receber os valores do paramêtro enviado no dispatch? 

Todo o reducer, recebe por padrão uma variável `state` e outra variável chamada `action`.

```
export default function cart(state, action) {
  console.log(action);
  return [];
}
```

E agora se executarmos essa função, vamos ver as actions sendo logadas no console:

```
{type: "@@redux/INITp.i.5.b.k.v"}type: "@@redux/INITp.i.5.b.k.v"__proto__: Object
reducer.js:2 {type: "@@redux/PROBE_UNKNOWN_ACTIONv.t.j.3.7"}type: "@@redux/PROBE_UNKNOWN_ACTIONv.t.j.3.7"__proto__: Object
reducer.js:2 {type: "@@redux/INITp.i.5.b.k.v"}
reducer.js:2 {type: "ADD_TO_CART", product: {…}}
reducer.js:2 {type: "ADD_TO_CART", product: {…}}
reducer.js:2 {type: "ADD_TO_CART", product: {…}}
```

E olha que legal, os três primeiros logs é a inicialização e integração do React com Redux. E os outros três sou eu clicando no botão adicionar ao carrinho.

Veja que a **action** trouxe nosso objeto com o **type** e o **product**.

O state é o estado anterior à chamada do dispatch, então sempre que está vindo alguma action, provavelmente vai ser alterado o estado de alguma variável, então o reducer recebe o estado atual e a action traz um estado que irá mudar o estado atual, essa alteração é feita de forma que respeite a imutabiliade do store, onde temos que recriar o estado passando o novo valor para ele.

Agora vamos ver a cara completa de um reducer:

```
export default function cart(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [];
    default:
      return state;
  }
}
```

Esse é o template de um reducer, ele é uma função, que recebe o estado (state) atual e uma action, ele possui um if ( que no caso por padrão é um switch mesmo) com o valor do type da action.
Caso o type da action é igual ao case do switch do reducer, então ele faz algo com o state e retorna o novo state. Se não tiver nenhum um type para ele, ele retorna o state atual.

Como eu disse acima, todo os reducers ouvem a chamada do dispatch, então o que faz um reducer alterar o estado é ele ter o mesmo type do action.type no switch, caso contrário não faz nada, simplesmente devolver o estado atual. Sim, se eu disparar uma action do type: DELETE_CATEGORY_PRODUCT, que provalvemente outro reducer de categoryProduct estaria na aplicação iria ouvir e tratar essa action, mas ela seria ouvida pelo nosso reducer cart também mas ele só devolveria o state atual, pois ele não lida com essa action.

Agora vou mostrar a alteração do estado:

```
export default function cart(state = [], action) {
  console.log(state);

  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.product];
    default:
      return state;
  }
}
```

Sempre o estado começa com um array vazio, por isso passamos um array fazio como default para o state.

Olha que legal, quando eu clico em adionar ao carrinho, na primeira vez loga um array vazio, pq estou logando o estado atual, antes de alterar o store, mas quando eu clico novamente, ele me mostra o store com produto dentro dele:

```
[]
reducer.js:2 [{…}]0: {id: 1, title: "Tênis de Caminhada Leve Confortável", price: 179.9, image: "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg", priceFormatted: "R$ 179,90"}length: 1__proto__: Array(0)
```

E conforme eu vou clicando ele vai adionando ao carrinho.

E agora como acessar os dados do carrinho, da store de cart no componente de **Header**:

Como queremos acessar os reducers, então vamos importar o connect dentro do `Header/index.js`:

```
...
import { connect } from 'react-redux';
...
```

Ok, agora queremos acessar o reducer, o **connect** recebe dois parâmetros, o primeiro é o estado e o segundo vou falar depois.

O primeiro parâmetro é uma função que recebe o state e retorna o state do reducer que queremos para dentro de uma variável que passamos para o React.

```
export  default  connect(state  => ({
	cart: state.cart,
}))(Header);
```

Veja que passamos uma função com parâmetro state, que retorna um objeto com a propriedade cart, que possui o estado do reducer cart. **cart** foi o nome que demos lá no `rootReducer.js`

Só para lembrar:
```
import { combineReducers } from 'redux';
import cart from './cart/reducer';

export default combineReducers({
  cart,
});
```

Agora vamos ver na prática o código completo:

```
import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import { connect } from 'react-redux';
import { Container, Cart } from './styles';
import logo from '../../assets/images/logo.svg';

function Header({ cart }) {
  console.log(cart);

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>3 items</span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
}

export default connect(state => ({
  cart: state.cart,
}))(Header);
```

O **Header** recebe como `props` uma prop chamada **cart** que possui todos os valores de `state.cart`.

Agora quando clicamos em **adicionar ao carrinho**, vemos no *console.log* o estado atual, a cada clique. Legal que isso está em outro componente diferente do Cart, lembra, estamos no Header, onde podemos mostrar a quantidade de produtos no carrinho de compras.

Então todo componente que tem o **connect** ouvindo os reducers, e quando um reducer altera o componente é recriado com o novo valor do reducer, lembrando que no React a cada alteração no estado é chamado o ***render*** que recria todo o componente do zero.

Mas no Header eu não preciso do carrinho todo, apenas da quantidade de items no array de carrinho.

Então eu mudo um pouco:

```
export  default  connect(state  => ({
	cartSize: state.cart.length,
}))(Header);
```
Em vez de pegar o carrinho todo, pego apenas o tamanho do carrinho e adiciono na prop `cartSize`.

```
...
function  Header({ cartSize }) {
console.log(cartSize);
...
<div>
	<strong>Meu carrinho</strong>
	<span>{cartSize} items</span>
</div>
...
}
```

E utilizo a variável `cartSize` para mostrar a quantidade de items no carrinho, e agora a cada alteração no carrinho, adicionando ou removendo items do carrinho, o **Header** é recriado com o novo valor de quantidade total no carrinho.

Então vamos recapitulzar sintetizando tudo que aconteceu:

Tudo começou na index.js da Home, a gente conectou a Home com redux, usando o **connect**, e quando fazemos isso, o componente tem acesso ao `dispatch` nas `props`.

**dispatch** serve para disparar as actions do redux, actions são responsáveis para dizer ao redux que queremos altrear o estado, e ela carrega um tipo de ação e um valor. O type é obrigatório, e passamos o product para o carrinho.

E no arquivo `reducer.js` ouve todas as actions, e ele ouve e trata a action do type: 'ADD_TO_CART' e recria um estado com o valor que a action traz para ele, que é o produto.  A função cart recebe um estado se não tiver nada pode ser um array vazio por padrão, e recebe também as actions.

Quando é feito a alteração, o Redux avisou todos os componentes que possuem o connect, e que estão necessitando do state que está no cart que essa informação foi atualizada, e ele executa novamente a função que está no connect passando para o o componente o novo valor do estado que ele precisa renderizar na tela.

Então, nosso componente dispara uma action, a action avisa o reducer, o reducer faz as alterações, o redux avisa todos os componentes que possuem connect, e os componentes se atualizem com essa alteração.

Código: [https://github.com/tgmarinho/rocketshoes/tree/aula-11-adicionando-ao-carrinho](https://github.com/tgmarinho/rocketshoes/tree/aula-11-adicionando-ao-carrinho)