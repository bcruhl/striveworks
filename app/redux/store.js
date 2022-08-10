import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import initialState from './reducers/initialState';
import Api from '../services/api';
import actionCreators from './actionCreators';

const composeEnhancers = composeWithDevTools({
  name: `${document.title}: App Annie`,
  actionCreators: actionCreators,
});

const thunkWithApiFromState = parameters => {
  const { getState } = parameters;
  const apiInstance = new Api(getState);
  return ReduxThunk.withExtraArgument(apiInstance)(parameters);
};

export const createStoreInstance = () => {
  return createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(applyMiddleware(thunkWithApiFromState))
  );
};

const store = createStoreInstance();

export default store;
