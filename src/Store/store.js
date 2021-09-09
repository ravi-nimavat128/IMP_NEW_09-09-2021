import {applyMiddleware, combineReducers, createStore} from 'redux';
import cartsItems from '../reducers/cartItems/cartItems';
import AsyncStorage from '@react-native-community/async-storage';
import UserReducer from '../reducers/UserReducer/UserReducer';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

const rootreducer = combineReducers({
  cartItems: cartsItems,
  userDetails: UserReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userDetails', 'cartItems'],
};
const persistedReducer = persistReducer(
  persistConfig,
  rootreducer,
  applyMiddleware(thunk),
);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return {store, persistor};
};

// export default store = createStore(rootreducer, applyMiddleware(thunk));
