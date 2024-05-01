import { createEpicMiddleware } from 'redux-observable';
import { logger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import { rootEpic } from './epics/index';
import rootReducer from './reducers';

const configureStore = () => {
  const epicMiddleware = createEpicMiddleware();
  const middlewares = [epicMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  // to use with Chrome redux dev tool
  const composeEnhancers =    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    // , optional second argument for persisted state that will overwrite
    // any defaults from todoApp combined reducer
    // preloadedState,
    composeEnhancers(applyMiddleware(...middlewares)),
    // enhancer - applyMiddleware() uses middleware in reverse order of the array
  );

  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore();
