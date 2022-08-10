import React from 'react';
import ImageListItem from './ImageListItem';
import { useSelector } from '../../redux/utils';
import { getSearchQuery } from '../../redux/selectors/searchImages';
import { getListOfImages } from '../../redux/selectors/images';
import Strings from '../../utils/strings';

const ImageList = props => {
  const searchQuery = useSelector(getSearchQuery);
  const imagesList = useSelector(getListOfImages);

  return (
    <>
      {/*{searchQuery && <b>ImageList.js find the search Query? {searchQuery}</b>}*/}
      {!imagesList?.length && <div className="empty">
          <p>{searchQuery ? `${Strings.str('noImagesFoundForQuery')} '${searchQuery}'` : Strings.str('noImagesFound')}</p>
          <span>{Strings.str('clickButtonToUpload')}</span>
        </div>
      }
      {imagesList?.map((imageItem, ind) => {
        return (
          <ImageListItem key={`${imageItem.src}${ind}`} src={imageItem.src} />
        )
      })}
    </>
  );
};

export default ImageList;
