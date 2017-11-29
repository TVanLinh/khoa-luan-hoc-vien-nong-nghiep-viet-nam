export class DateUtil {
  static toString(date: any) {
    if (date == null) {
      return null;
    }
    // if(typeof date == 'string') {
    date = new Date(date);
    // }
    console.log(date+" 1 ");
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()+'   ';
  }
}
