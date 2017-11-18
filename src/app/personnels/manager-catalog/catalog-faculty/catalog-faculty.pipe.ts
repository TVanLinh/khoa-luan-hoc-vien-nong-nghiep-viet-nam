import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'level'
})
export class CatalogFacultyPipe implements PipeTransform {
  transform(value: any, level: number) {
    return value.filter(item => item.level == level);
  }

}
