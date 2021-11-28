import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformatter'
})
export class DateformatterPipe implements PipeTransform {

  transform(value : string): string {
    const date = new Date(value)
    const formattedDate = formatDate(date, "dd/MM/yyyy hh:mm a", 'en-US').toString()
    return formattedDate;
  }

}
