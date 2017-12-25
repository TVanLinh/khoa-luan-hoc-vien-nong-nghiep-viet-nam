import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {
  transform(value: any[], arg: any): any {
    arg = (arg + '').trim().toLowerCase();
    if (arg == '') {
      return value;
    }
    return value.filter(item => {
      return item.name && (item.name + "").toLowerCase().indexOf(arg) != -1 ||
        item.toString().toLowerCase().indexOf(arg.toLowerCase()) != -1 || (item.salary) && (item.salary + "").indexOf(arg) != -1
        || item.city && item.city.name.trim().toLowerCase().indexOf(arg) != -1
    });
  }

}
