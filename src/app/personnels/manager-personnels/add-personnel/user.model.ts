import {CatalogFacultyModel} from "../../manager-catalog/catalog-faculty/catalog-faculty.model";

export class UserModel {
  username: String;
  hashedPass: String;
  salt: String;
  fullname: String;
  avatarUrl: String;
  organ: {
    level1: CatalogFacultyModel;
    level2: CatalogFacultyModel;
  };
  email: String;
  roles: any[];
  activated: boolean;
  createdOn: Date
}
