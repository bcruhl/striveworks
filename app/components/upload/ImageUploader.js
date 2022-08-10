import React from 'react';
import { useDispatch } from '../../redux/utils';
import { uploadImage } from '../../redux/actionCreators/images';
import Strings from '../../utils/strings';

const ImageUploader = () => {
  const dispatch = useDispatch();
  const triggerFileInput = () => {
    document.getElementById('getFile').click();
  }

  function submitImage(evt) {
    evt.preventDefault();
    dispatch(uploadImage(evt.target.files[0]));
  }


  return (
    <>
      <button onClick={triggerFileInput} className="file-button">{Strings.str('uploadImage')}</button>
      <input id="getFile" onChange={submitImage} type="file" name="Upload" accept=".webp, .jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*" className="hidden"/>
    </>
  );
};

export default ImageUploader;
