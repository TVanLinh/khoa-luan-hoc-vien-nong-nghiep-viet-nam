import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {
  transform(value: any[], arg: any): any {
    if ((arg + "").trim() == '') {
      return value;
    }
    return value.filter(item => {
      return item.name && (item.name + "").toLowerCase().indexOf((arg + '').toLowerCase()) != -1 ||
        item.toString().toLowerCase().indexOf(arg.toLowerCase()) != -1 || (item.salary) && (item.salary + "").indexOf(arg) != -1
    });
  }

}
