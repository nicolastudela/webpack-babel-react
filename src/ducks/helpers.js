
const FETCH   = 'FETCH';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const REMOVE = 'REMOVE';

export function makeActionTypes(resource) {
  return {
    FETCH: `${resource}_${FETCH}`,
    CREATE: `${resource}_${CREATE}`,
    UPDATE: `${resource}_${UPDATE}`,
    REMOVE: `${resource}_${REMOVE}`
  };
};
