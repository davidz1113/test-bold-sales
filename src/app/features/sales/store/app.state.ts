import { ActionReducerMap } from '@ngrx/store';
import { SaleState } from '../../../core/models/sale.state';
import { saleReducer } from './reducers/sale.reducer';

export interface AppState {
  sales: SaleState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  sales: saleReducer,
};
