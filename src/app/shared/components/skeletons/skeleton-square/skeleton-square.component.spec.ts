import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonSquareComponent } from './skeleton-square.component';

describe('SkeletonSquareComponent', () => {
  let component: SkeletonSquareComponent;
  let fixture: ComponentFixture<SkeletonSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonSquareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkeletonSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
