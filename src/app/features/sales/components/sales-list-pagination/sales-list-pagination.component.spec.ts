import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesListPaginationComponent } from './sales-list-pagination.component';

describe('SalesListPaginationComponent', () => {
  let component: SalesListPaginationComponent;
  let fixture: ComponentFixture<SalesListPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesListPaginationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesListPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
