import { ReducerActionType } from '@nikshay-setu-v3-monorepo/types';
import { applyMiddleware, legacy_createStore, Store } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { rootReducer, RootState } from './reducers';
import { rootSaga } from './saga';
export interface SagaStore extends Store<RootState, ReducerActionType> {
  sagaTask?: Task;
}

export function initStore(): SagaStore {
  const sagaMiddleware = createSagaMiddleware();
  const store: SagaStore = legacy_createStore(
    rootReducer,
    {},
    applyMiddleware(sagaMiddleware)
  );
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}
