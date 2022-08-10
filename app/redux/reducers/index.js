import * as imageListReducers from './images';
import * as searchImagesReducers from './searchImages';

export default {
  ...imageListReducers,
  ...searchImagesReducers,
}
