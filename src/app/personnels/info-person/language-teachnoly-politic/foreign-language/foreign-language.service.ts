export class ForeignLanguageService {

  getLevelTitle(num: number): string {
    switch (num) {
      case 0:
        return "Yếu";
      case 1:
        return "Trung bình";
      case 2:
        return "Khá";
      case 3:
        return "Tốt";
      case 4:
        return "Thành thạo";
      default:
        return "Trung bình";
    }
  }
}
