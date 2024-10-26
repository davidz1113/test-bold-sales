import { createReducer, on } from '@ngrx/store';
import { ModalState } from '../../../../core/models/modal.state';
import { closeModal, openModal } from '../actions/modal.action';

export const initialState: ModalState = {
  isVisible: false,
  data: {
    id: '',
    status: '',
    paymentMethod: '',
    salesType: '',
    createdAt: 0,
    transactionReference: 0,
    amount: 0,
  },
};

export const modalReducer = createReducer(
  initialState,
  on(openModal, (state, { data }) => ({ ...state, isVisible: true, data })),
  on(closeModal, (state) => ({ ...state, isVisible: false }))
);
