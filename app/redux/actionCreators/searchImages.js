import * as actionTypes from '../actionTypes';
import {setImageListInState} from './images';

export const searchImagesByName = query => async (dispatch, _, api) => {
  const responseData = await api.get(`http://localhost:3000/api/queryImageNames?query=${query}`);
  setImageListInState(dispatch, responseData);
  dispatch({
    type: actionTypes.SET_FILTER_IMAGES_BY_NAME,
    payload: query,
  });
};

export const clearImageQuery = () => dispatch => {
  dispatch({
    type: actionTypes.SET_FILTER_IMAGES_BY_NAME,
    payload: '',
  });
}
