import { ActionReducerMap } from '@ngrx/store';
import { SaleState } from '../../../core/models/sale.state';
import { saleReducer } from './reducers/sale.reducer';
import { ModalState } from '../../../core/models/modal.state';
import { modalReducer } from './reducers/modal.reducer';

export interface AppState {
  sales: SaleState;
  modal: ModalState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  sales: saleReducer,
  modal: modalReducer,
};
