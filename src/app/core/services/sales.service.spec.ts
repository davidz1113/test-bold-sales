import { TestBed } from '@angular/core/testing';

import { SalesService } from './sales.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { DummySaleDataList } from '../../testing/mock';
describe('SalesService', () => {
  let service: SalesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(SalesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getSales() should get sales date from API GET', () => {
    
    service.getSales().subscribe({
      next: (data: any) => {
        expect(data.data).toEqual(DummySaleDataList);
      },
    });

    const req = httpMock.expectOne('https://bold-fe-api.vercel.app/api');
    expect(req.request.method).toBe('GET');
    req.flush({ data: DummySaleDataList });
  });
});
