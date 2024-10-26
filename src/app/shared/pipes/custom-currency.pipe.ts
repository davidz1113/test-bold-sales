import { inject, Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'customCurrency',
  standalone: true,
})
export class CustomCurrencyPipe implements PipeTransform {
  currencyPipe = inject(CurrencyPipe);

  constructor() {}

  transform(
    value: number,
    currencyCode: string = '',
    display: string | boolean = 'symbol',
    digitsInfo: string = '1.0-0',
    locale: string = 'en-US'
  ): string | null {
    const formattedValue = this.currencyPipe.transform(
      value,
      currencyCode,
      display,
      digitsInfo,
      locale
    );
    return formattedValue ? formattedValue.replace(/,/g, '.') : null;
  }
}
