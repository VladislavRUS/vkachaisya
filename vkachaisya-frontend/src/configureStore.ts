import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createRootReducer, IApplicationState, rootSaga } from './store';
import createSagaMiddleware from 'redux-saga';

export default function configureStore(history: History, initialState: IApplicationState): Store<IApplicationState> {
  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    createRootReducer(history),
    // @ts-ignore
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
  );

  sagaMiddleware.run(rootSaga);

  // @ts-ignore
  return store;
}
