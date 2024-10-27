import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { ROOT_REDUCERS } from './features/sales/store/app.state';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { SaleEffect } from './features/sales/store/effects/sale.effect';
import { LocalStorageEffect } from './features/sales/store/effects/localstorage.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'COP ' },
    provideStore(ROOT_REDUCERS),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([SaleEffect, LocalStorageEffect]),
    provideHttpClient(),
  ],
};
