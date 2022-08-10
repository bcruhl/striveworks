import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../redux/utils';
import { fetchImages } from '../redux/actionCreators/images';
import { getNumberOfImages } from '../redux/selectors/images';
import MainHeader from './navigation/MainHeader';
import SubHeader from './navigation/SubHeader';
import ImageList from './images/ImageList';
import '../static/css/app.css';

const App = props => {
  const numberOfImages = useSelector(getNumberOfImages);
  const dispatch = useDispatch();
  // Populate the image list once mounted
  useEffect(() => {
    dispatch(fetchImages());
  });
  
  return (
    <>
      <MainHeader />
      <div className="image-library">
        <SubHeader />
        <div className="image-matches">{`${numberOfImages} Images`}</div>
        <section className="image-list">
          <ImageList />
        </section>
      </div>
    </>
  );
};

export default App;
