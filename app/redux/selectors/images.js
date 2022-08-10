import { createSelector } from 'reselect';

export const getListOfImages = state => state.images ?? [];

export const getNumberOfImages = createSelector(
  [getListOfImages],
  images => images?.length ?? 0,
);
