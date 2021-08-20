export interface UserViewDTO {
  //_id?: string;
  name?: string;
  email?: string;
  password?: string;
  active?: boolean;
  view?: (responseView?: boolean) => UserViewDTO;
}
