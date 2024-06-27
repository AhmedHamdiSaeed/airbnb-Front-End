export interface cityModelGet {
  id: number;
  name: string;
  countryId: number;
}
export interface cityModel {
  name: string;
  countryId: number;
}
export interface countryModelGet {
  id: number;
  name: string;
}
export interface countryModel {
  name: string;
}
export interface categoryModelGet {
  id: number;
  name: string;
  iconURL: any;
}
export interface categoryModel {
  name: string;
  iconURL: string;
  desc: string;
}
export interface PropertyUpdateAdminModel {
  PropertStatus: number;
}
