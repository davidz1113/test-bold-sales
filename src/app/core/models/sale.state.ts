import { ISale } from './sale.interface';

export interface SaleState {
  loading: boolean;
  filter: string;
  filterDate: FilterDate;
  sales: ReadonlyArray<ISale>;
  salesFiltered: ISale[];
}

export interface FilterDate {
  date: FrecuencyDate;
  textLabel?: string;
  frecuencyLabel?: string;
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