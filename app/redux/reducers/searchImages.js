import produce from 'immer';
import * as actionTypes from '../actionTypes';
import initialState from './initialState';

export const searchQuery = produce((state = initialState.searchQuery || {}, action) => {
  switch (action.type) {
    case actionTypes.SET_FILTER_IMAGES_BY_NAME:
      return action.payload;
    default:
      return state;
  }
});
