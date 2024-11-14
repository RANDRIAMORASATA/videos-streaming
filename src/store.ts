import { combineReducers, legacy_createStore as createStore } from "redux";
import { storageReducers } from './redux/reducers/storageReducers';
import { devToolsEnhancer } from "redux-devtools-extension";

const rootReducers = combineReducers({
  storage: storageReducers
});

const store = createStore(
  rootReducers,
  devToolsEnhancer({}) as any
);

export default store;
