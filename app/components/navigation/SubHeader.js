import React from 'react';
import AutoSearchInput from '../search/AutoSearchInput';
import ImageUploader from '../upload/ImageUploader';

const SubHeader = () => {
  return (
    <div className="subHeader">
      <div>
        <AutoSearchInput />
      </div>
      <div>
        <ImageUploader />
      </div>
    </div>
  );
};

export default SubHeader;
