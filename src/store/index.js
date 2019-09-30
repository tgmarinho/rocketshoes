import { createStore } from 'redux';
import rootReducer from './models/rootReducer';

const store = createStore(rootReducer);

export default store;
