export interface CvModel {
  fullName: string;
  nameOther: string;
  avatarUrl: string;
  birthDay: Date;
  sex: string;
  email: string;
  phone: string;
  placeBirth: {
    city: string,
    district: string,
    guild: string
  };
  homeTown: {
    city: string,
    district: string,
    guild: string
  };
  placeNow: {
    city: string,
    district: string,
    guild: string,
    street: string,
    numberHome: string
  };
  hashNation: boolean;
  nation: string;
  identity: { identityNumber: string, dateRange: Date, placeRange: string };
  placeRegisterHouseHold: string;//noi dang ki ho khau thuong tru
  policyObject: string;
  bloodGroup: string
}
