export class CatalogFacultyModel {
  _id: string;
  id: string;
  name: string;
  parent: CatalogFacultyModel;
  level: number;
}
