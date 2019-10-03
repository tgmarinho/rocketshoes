import './config/ReactotronConfig';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import GlobalStyle from './styles/globals';
import Header from './components/Header';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
