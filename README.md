## Aula 19 - Exibindo quantidade

Agora vamos exibir as quantidades que aparece no botão ADICIONAR AO CARRINHO na tela HOME.

Para isso vamos usar o `mapStateToProps`:

```
const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});
```

Aqui estou criando um objeto, que recebe vários valores, na verdade ele é uma mapa, com chave e valor, a chave é o id do produto e o valor é a quantidade do produto.

Esse reduce vai retornar um objeto com os valores: { 1 : 2 }

Vai ficar algo assim: 
```
{ 
	1: 2,
	2: 6,
	3: 0,
	4:15,
	...
}
```

E assim vai, o valor da esquerda é id do produto e o valor da direita é a quantidade do produto.

E depois só utilizar essa prop `amount`:

```
<div>
   <MdAddShoppingCart size={16} color="#fff" />{' '}
   {amount[product.id] || 0}
</div>
```
Com a chave do id do produto acesso sua respectiva quantidade!

Esse algoritmo ficou massa d+

Código: [https://github.com/tgmarinho/rocketshoes/tree/aula-19-exibindo-quantidades ](https://github.com/tgmarinho/rocketshoes/tree/aula-19-exibindo-quantidades )