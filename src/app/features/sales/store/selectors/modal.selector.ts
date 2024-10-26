import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectModalFeature = (state: AppState) => state.modal;

export const selectDataModal = createSelector(
  selectModalFeature,
  ({ data, isVisible }) => ({ data, isVisible })
);
