import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { setPageOptions } from '../../store/actions/sale.action';
import { Observable } from 'rxjs';
import {
  selectLoadingSales,
  selectPageOptions,
  selectTotalPages,
} from '../../store/selectors/sale.selector';
import { AsyncPipe } from '@angular/common';
import { SkeletonSquareComponent } from "../../../../shared/components/skeletons/skeleton-square/skeleton-square.component";

@Component({
  selector: 'bold-sales-list-pagination',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe, SkeletonSquareComponent],
  templateUrl: './sales-list-pagination.component.html',
  styleUrl: './sales-list-pagination.component.scss',
})
export class SalesListPaginationComponent implements OnInit {
  pageSizeList: string[] = ['5', '10', '15', '20', '50', 'Todos'];
  selectZiseForm: FormControl = new FormControl({
    value: '5',
    emitEvent: false,
  });
  private store: Store<AppState> = inject(Store);
  pageLength$: Observable<any | undefined> = new Observable<
    number | undefined
  >();
  currentPage: number = 1;
  totalPages: number = 0;
  loadSales$: Observable<boolean> = new Observable<boolean>();

  ngOnInit(): void {
    this.selectZiseForm.valueChanges.subscribe((value) => {
      this.currentPage = 1;
      this.dispatchPageOptions(value, this.currentPage);
    });

    this.pageLength$ = this.store.select(selectTotalPages);
    this.store
      .select(selectPageOptions)
      .subscribe(({ totalPages, page, size }) => {
        this.totalPages = totalPages || 0;
        this.currentPage = page;
        this.selectZiseForm.setValue(size, { emitEvent: false });
      });
    this.loadSales$ = this.store.select(selectLoadingSales);
  }

  nextPage(): void {
    if (this.currentPage == this.totalPages) return;
    this.currentPage++;
    this.dispatchPageOptions(this.selectZiseForm.value, this.currentPage);
  }

  previousPage(): void {
    if (this.currentPage == 1) return;
    this.currentPage--;
    this.dispatchPageOptions(this.selectZiseForm.value, this.currentPage);
  }

  dispatchPageOptions(pageSize: string, currentPage: number): void {
    this.store.dispatch(
      setPageOptions({
        pageOptions: {
          size: pageSize,
          page: currentPage,
        },
      })
    );
  }

  // changePage(page: number): void {}
}
