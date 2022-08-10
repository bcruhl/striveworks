import React from 'react';

const ImageListItem = props => {
  return (
    <div className="image-list-item">
       <img src={props.src} />
    </div>
  );
};

export default ImageListItem;
