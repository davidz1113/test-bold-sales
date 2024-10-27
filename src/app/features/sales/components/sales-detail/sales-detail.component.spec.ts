import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SalesDetailComponent } from './sales-detail.component';
import { AppState } from '../../store/app.state';
import { StoreModule } from '@ngrx/store';
import { CurrencyPipe } from '@angular/common';

describe('SalesDetailComponent', () => {
  let component: SalesDetailComponent;
  let fixture: ComponentFixture<SalesDetailComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesDetailComponent, StoreModule.forRoot({})],
      providers: [provideMockStore(), CurrencyPipe],
    })
    .compileComponents();
    
    store = TestBed.inject(MockStore);
    
    fixture = TestBed.createComponent(SalesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
