import { fromJS } from 'immutable';
import { makeActionTypes } from './helpers';
import products_mock from './products_mock';

const resource = 'PRODUCTS';

const {
  FETCH: FETCH,
  CREATE: CREATE,
  UPDATE: UPDATE,
  REMOVE: REMOVE
} = makeActionTypes(resource);

// Action Creators
export function fetchAllProducts() {
  return { type: FETCH };
}

export function createProducts(product) {
  return { type: CREATE, product };
}

export function updateProduct(product) {
  return { type: UPDATE, product };
}

export function removeProduct(product) {
  return { type: REMOVE, product };
}

const initialState = {
  isFetching: false,
  items: []
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH:
      return {...state, ...{ items: products_mock} };
    default: return state;
  }
}
