import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    var returnItems: any[];
    returnItems = items.filter(it => {
      return it.name.toString().toLocaleLowerCase().includes(searchText)
        || it.email.toString().toLocaleLowerCase().includes(searchText)
        || it.role.toString().toLocaleLowerCase().includes(searchText)
    });
    return returnItems;
  }

}
