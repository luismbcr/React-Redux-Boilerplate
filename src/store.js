
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import {createBrowserHistory as createHistory} from 'history';

// import rootReducer from './reducers';
import createRootReducer from './reducers'

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history),
];

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = window;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  createRootReducer(history),
  initialState,
  composedEnhancers
);

export default store;