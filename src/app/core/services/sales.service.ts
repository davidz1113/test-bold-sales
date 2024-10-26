import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ISale } from '../models/sale.interface';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private http: HttpClient = inject(HttpClient);
  private url: string = ' https://bold-fe-api.vercel.app/api';

  constructor() {}

  getSales(): Observable<ISale[]> {
    return this.http.get<any>(`${this.url}`).pipe(map((res) => res.data));
  }
}
