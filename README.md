## Aula 24 - React Toastify

Vamos utilizar a lib [React Toastify](https://github.com/fkhadra/react-toastify), ela é muito boa para dar um feedback visual para mensagens de sucesso, alerta e erro da aplicação.

```
yarn add react-toastify 
```

No arquivo `App.js` vamos importar o `ToastContainer` da `react-toastify`,  e repassar para o componente, dentro do `BrowserRouter`, e passamos um tempo de duração para ele fechar automaticamente após três segundos.
 
```
import { ToastContainer } from  'react-toastify';

...
 <Provider store={store}>
  <BrowserRouter>
     <Header />
     <GlobalStyle />
     <ToastContainer autoClose={3000} />
     <Routes />
  </BrowserRouter>
</Provider>
...
```

No arquivo `globals.js` importaremos os estilos do toastify:

```
...
import  'react-toastify/dist/ReactToastify.css';
...
```

E por fim agora só utilizar, no arquivo sagas.js do carrinho, vamos adicionar:

```
...
 if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }
 ...
```

Pronto, agora vamos ter um feedback visual quando o usuário adicionar mais produtos do que tem disponível em estoque.

Essa lib tem várias configurações legais para fazer, ela é muito boa para usar na web.



Código: [https://github.com/tgmarinho/rocketshoes/tree/aula-24-react-tostify](https://github.com/tgmarinho/rocketshoes/tree/aula-24-react-tostify)

