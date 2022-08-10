import React from 'react';
import { useMemo } from 'react';
import { useDispatch } from '../../redux/utils'
import { searchImagesByName } from '../../redux/actionCreators/searchImages'
import Strings from '../../utils/strings';
import {debounce} from '../../utils/utilities';

const AutoSearchInput = () => {
  const dispatch = useDispatch();
  const searchImages = evt => {
    // With React 17+, Event Pooling is not used as events work as expected
    dispatch(searchImagesByName(evt.target.value));
  };

  const imageSearchWithDebounce = useMemo(
    () => debounce(searchImages, 300)
  , []);

  return (
    <>
        <div><input type="text" placeholder={Strings.str('searchImages')} onChange={imageSearchWithDebounce}/></div>
    </>
  );
};

export default AutoSearchInput;
