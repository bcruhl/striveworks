import * as actionTypes from '../actionTypes';

export const setImageListInState = (dispatch, imageList) => {
  dispatch({
    type: actionTypes.SET_IMAGES,
    payload: imageList,
  });
}

export const uploadImage = file => async (dispatch, _, api) => {
  //Build the request object
  const url = 'http://localhost:3000/api/uploadImage';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', file.name);
  try {
    //1. Upload the image 
    //2. Retrieve latest images from CDN and put into state.images[]
    const responseData = await api.post(url, formData, {
      'Content-Type': 'multipart/form-data',
    });

    //Update the list of images in state (FAKED)
    setImageListInState(dispatch, responseData);

    //Clear search Query string from state
    dispatch({
      type: actionTypes.SET_FILTER_IMAGES_BY_NAME,
      payload: '',
    });
  } catch (e) {
    console.error("There was an error while trying to upload your image", e);
  }
}

export const fetchImages = () => async (dispatch, getState, api) => {
  const state = getState();
  const responseData = await api.get(`http://localhost:3000/api/queryImageNames?query=${state.searchQuery}`);
  setImageListInState(dispatch, responseData);
}