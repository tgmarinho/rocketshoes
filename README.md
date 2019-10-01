## Aula 14 - Produto duplicado

Quando o usuário adicionar o mesmo produto no carrinho, vamos somar a quantidade em vez de duplicar.

Vamos utilizar uma lib [immerjs](https://github.com/immerjs/immer)  para lidar com objetos e arrays que são imutáveis.

```
yarn add immer
```

Com o immer nós importamos a função `produce` do `immer`, e essa função recebe o estado (state) atual e um rascunho (draftState) que podemos fazer qualquer coisa, programar sem utilizar os principios de imutabiliade, podemos fazer push no array, setar valor na mão mesmo, conforme o exemplo abaixo, ele vai pegar o rascunho e fazer as alterações do jeito certo (imutável) e disponibilizar no `nextState`.

> The basic idea is that you will apply all your changes to a temporary
> _draftState_, which is a proxy of the _currentState_. Once all your mutations are completed, Immer will produce the _nextState_ based on
> the mutations to the draft state. This means that you can interact
> with your data by simply modifying it while keeping all the benefits
> of immutable data.

Exemplo:
```
import produce from "immer"

const baseState = [
    {
        todo: "Learn typescript",
        done: true
    },
    {
        todo: "Try immer",
        done: false
    }
]

const nextState = produce(baseState, draftState => {
    draftState.push({todo: "Tweet about it"})
    draftState[1].done = true
})
```

Vamos ver na prática no nosso projeto.

Precisamos agora retornar o resultado próximo estado que o produce irá retornar, ele recebeu o state atual e o draft que é uma cópia do estado, com isso fizemos um verificação no array de carrinho para verificar se o produto já estava insererido, retornando a posição dele no array.

Se tem o produto, o productIndex recebe o id dele.

Verifico se é maior que zero, isso é, ele se ele tiver valor maior que zero então ele achou o produto. 

Portanto ele altera o valor do amount acrescetando mais um ao valor.

Se não tivesse o produto, ele colocaria amount igual a 1 mesmo e das proximas vezes que adicionaesse iria só incrementando esse valor.

```
import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.product.id);
        if (productIndex >= 0) {
          draft[productIndex].amount += 1;
        } else {
          draft.push({ ...action.product, amount: 1 });
        }
      });
    default:
      return state;
  }
}
```

Pronto, agora é só testar! O produto não duplica, mas aumenta o valor da quantidade.

Código: [https://github.com/tgmarinho/rocketshoes/tree/aula-14-produto-duplicado](https://github.com/tgmarinho/rocketshoes/tree/aula-14-produto-duplicado)