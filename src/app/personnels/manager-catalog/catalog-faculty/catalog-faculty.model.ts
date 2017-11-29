export class CatalogFacultyModel {
  _id: string;
  id: string;
  name: string;
  type: string;
  parent: CatalogFacultyModel;
  level: number;
  url: string;
}
