import produce from 'immer';
import * as actionTypes from '../actionTypes';
import initialState from './initialState';

export const images = produce((state = initialState.images || {}, action) => {
  switch (action.type) {
    case actionTypes.SET_IMAGES:
      return action.payload;
    default:
      return state;
  }
});
