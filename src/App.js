import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { hot } from 'react-hot-loader';
import ProductsDashboardContainer from './features/products-dashboard/ProductsDashboardContainer';
import './App.scss';

import * as reducers from './ducks';

const rootReducer = combineReducers(reducers);
const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <div className="App container">
      <div className="row titleBox">
        <div className="col-6">
          <h1>
            {'Que haces, Imbecill!'}
          </h1>
        </div>
      </div>
      <div className="row">
        <ProductsDashboardContainer />
      </div>
    </div>
  </Provider>
);


export default hot(module)(App);
