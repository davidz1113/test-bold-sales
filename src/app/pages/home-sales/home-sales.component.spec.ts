import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import HomeSalesComponent from './home-sales.component';
import { AppState } from '../../features/sales/store/app.state';

describe('HomeSalesComponent', () => {
  let component: HomeSalesComponent;
  let fixture: ComponentFixture<HomeSalesComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSalesComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(HomeSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
