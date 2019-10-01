## Aula 12 - Reactotron + Redux

Vamos configurar o Reactotron para mostar os logs do Redux, vai ajudar bastante a debugar o Redux.

Para fazer isso na web em projetos com React e Redux adicionaremos as libs:

```
yarn add reactotron-react-js reactotron-redux
```

Depois criaremos  um arquivo `src/config/Reactotron.js` que conterá as configurações.

Embora ela seja uma ferramenta de fazer debug ela tem que ser instalada com dependência do projeto mesmo, pois o código de configuração dela é executado em produção também, porém o efetivo funcionamento dela só funciona em desenvolvimento, você vai ver agora porque:

```
import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .connect();

  tron.clear();

  console.tron = tron;
}
```

Importamos as duas libs instaladas, o CRA coloca nas variáveis de ambiente, o NODE_ENV, se estiver em ambiente de desenvolvimento o valor é 'development' se não é 'production' quando o site está no ar.
E se estiver em desenvolvimento, então a configuração é realizada.

Declaramos uma variável tron que recebe a configuração do reactotron o qual usa um plugin do redux para logar as actions e reducers.

Eu limpo o console toda vez que a aplicação reinicia e atribui a configuração de tron para a variável global console na propridade tron também. Com isso não preciso importar o tron para usar o reactotron em todos os arquivos que quero logar, basta invocar console.tron.log('meu log').

Depois só importar a configuração na raiz da aplicação, que pode ser na primeira linha do componente App.js:

```
import  './config/ReactotronConfig';
...
```

e por fim agora podemos usar o `console.tron.log('loguei');`.

Apenas com isso não é possível logar as actions e reducers, precisamos configurar no store:

```
import { createStore } from 'redux';
import rootReducer from './models/rootReducer';

const enhancer =
  process.env.NODE_ENV === 'development' ? console.tron.createEnhancer() : null;

const store = createStore(rootReducer, enhancer);

export default store;
```

Criaremos um middleware no redux que intercepta as chamadas das actions pra os reducers, então com isso o reactotron irá logar todas as actions para nós.

Portanto, se o enhancer estiver com valor de configuração, ele é passado para o createStore e a integração é realizada com sucesso!

![](https://github.com/tgmarinho/Images/blob/master/bootcamp-rocketseat/reacto-tron-com-actions-redux.png?raw=true)

Nesse caso nem precisa de colocar um console.tron.log(''), só com a integração o Reactotron vai ouvir as actions através do middleware.

Código: [https://github.com/tgmarinho/rocketshoes/tree/aula-12-reactotron-com-redux](https://github.com/tgmarinho/rocketshoes/tree/aula-12-reactotron-com-redux)