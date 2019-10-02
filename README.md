## Aula 21 - Integrando o Rectotron com Saga

Vamos configurar o plugin do Reactotron no Redux Saga.

Adicionamos o plugin:
```
 yarn add reactotron-redux-saga  
```

E no arquivo de configuração adicionamos:

```
import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  tron.clear();

  console.tron = tron;
}
```

Pronto, agora é só testar!

Veja, que o log aparece, SAGA, e os métodos que são chamados a cada `yield` do saga com seus respectivos parâmetros e valores:

![](https://github.com/tgmarinho/Images/blob/master/bootcamp-rocketseat/reactotron-redux-saga-working-well.png?raw=true)


Código: [https://github.com/tgmarinho/rocketshoes/tree/aula-21-reactotron-com-saga](https://github.com/tgmarinho/rocketshoes/tree/aula-21-reactotron-com-saga)