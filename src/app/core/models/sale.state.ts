import { ISale } from './sale.interface';

export interface SaleState {
  loading: boolean;
  filter: string;
  filterDate: FilterDate;
  filterSalesType: FilterSalesType;
  sales: ISale[];
  salesFiltered: ISale[];
  salesPaginated: ISale[];
  isOrderByAmountAsc: boolean;
  pageOptions: PageOptions;
}

export interface FilterDate {
  date: FrecuencyDate;
  textLabel?: string;
  frecuencyLabel?: string;
}

export interface PageOptions {
  size: string;
  page: number;
  totalPages?: number;
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
