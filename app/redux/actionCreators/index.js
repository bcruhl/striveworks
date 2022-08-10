import * as imageSearchActions from './searchImages';
import * as imageActions from './images';

const actionCreators = {
  ...imageSearchActions,
  ...imageActions,
};

export default actionCreators;
