import { AxiosResponse } from 'axios';
import { api } from '../boot/axios';
import { IUser } from 'src/models/IUser';
import { ProfileItem } from 'src/models/ProfileItem';

export default class UserService {
  static getUser(): Promise<AxiosResponse<IUser>> {
    return api.get<IUser>('/users/current');
  }
  static addProfileItem(profileItem: ProfileItem): Promise<AxiosResponse<string>> {
    return api.post<string>('/users/addProfileItem', profileItem);
  }
  static deleteProfileItem(profileItem: ProfileItem): Promise<AxiosResponse<ProfileItem[]>> {
    return api.post('/users/deleteProfileItem', profileItem);
  }
  static editProfileItem(profileItem: ProfileItem): Promise<AxiosResponse<ProfileItem[]>> {
    return api.post('/users/editProfileItem', profileItem);
  }
}
