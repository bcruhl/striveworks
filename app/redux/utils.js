import React from 'react';
import {
  createStoreHook,
  createDispatchHook,
  createSelectorHook,
  batch,
} from 'react-redux';

export const appContext = React.createContext(null);

export { batch };
export const useStore = createStoreHook(appContext);
export const useDispatch = createDispatchHook(appContext);
export const useSelector = createSelectorHook(appContext);
