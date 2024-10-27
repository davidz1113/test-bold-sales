import { ISale } from './sale.interface';

export interface SaleState {
  loading: boolean;
  filter: string;
  filterDate: FilterDate;
  filterSalesType: FilterSalesType;
  sales: ReadonlyArray<ISale>;
  salesFiltered: ISale[];
  isOrderByAmountAsc: boolean;
}

export interface FilterDate {
  date: FrecuencyDate;
  textLabel?: string;
  frecuencyLabel?: string;
}

export interface FilterSalesType {
  paymentLink: boolean;
  paymentTerminal: boolean;
  viewAll: boolean;
}

export enum FrecuencyDate {
  TODAY = 'today',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export enum LabelFrecuencyDate {
  TODAY = 'hoy',
  WEEKLY = 'esta semana',
  MONTHLY = 'este mes',
}
