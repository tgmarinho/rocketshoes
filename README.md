## Aula 15 - Remover produto

Quando o usuário clicar no botão com ícone de lixeira para  remover produto vamos remover do array do reducer do cart.

O carrinho já está conectado com o Redux, então só passar a função dispatch para disparar uma action para deletar o produto do carrinho informando o id do produto.

```
...
function  Cart({ cart, dispatch }) { ... }
...
```

```
<MdDelete
   size={20}
   color="#7169c1"
   onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: product.id })}
/>
```

Pronto, agora a action vai ser disparada pelo dipatch, agora só falta fazer o reducer tratar essa ação, pois ouvir ele já está ouvindo. Pode testar no reactotron e ver que o log já aparece.

Para isso no cart/reducer.js:

```
case 'REMOVE_FROM_CART':
  return produce(state, draft => {
    const productIndex = draft.findIndex(p => p.id === action.id);
    if (productIndex >= 0) {
      draft.splice(productIndex, 1);
    }
 });
```
Busco a posição do produto o produto pelo id, se tiver  removo um item do array usando slice, informando a posição e quantos items a partir da posição, no nosso caso apenas 1, o próprio produto.

Pronto, agora é só testar.


Código: [https://github.com/tgmarinho/rocketshoes/tree/aula-15-remover-produto](https://github.com/tgmarinho/rocketshoes/tree/aula-15-remover-produto)

