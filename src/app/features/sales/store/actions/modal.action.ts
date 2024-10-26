import { createAction, props } from '@ngrx/store';

export const openModal = createAction(
  '[Modal] Open Modal',
  props<{ data: any }>()
);
export const closeModal = createAction('[Modal] Close Modal');
