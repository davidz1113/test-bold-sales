import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ISale } from '../models/sale.interface';
import { getTransactionByStatus } from '../../shared/utils/utils.utils';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private http: HttpClient = inject(HttpClient);
  private url: string = 'https://bold-fe-api.vercel.app/api';

  constructor() {}

  getSales(): Observable<ISale[]> {
    return this.http.get<any>(`${this.url}`).pipe(
      map((res) =>
        res.data.map((sale: ISale) => {
          return { ...sale, statusLabel: getTransactionByStatus(sale.status) };
        })
      )
    );
  }
}
