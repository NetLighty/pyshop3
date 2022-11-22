import { AxiosResponse } from 'axios';
import { api } from '../boot/axios';
import { IUser } from 'src/models/IUser';
import { IProfileItem } from 'src/models/IProfileItem';

export default class UserService {
  static getUser(): Promise<AxiosResponse<IUser>> {
    return api.get<IUser>('/users/current');
  }
  static addProfileItem(profileItem: IProfileItem): Promise<AxiosResponse<string>> {
    return api.post<string>('/users/addProfileItem', profileItem);
  }
  static deleteProfileItem(profileItem: IProfileItem): Promise<AxiosResponse<IProfileItem[]>> {
    return api.post('/users/deleteProfileItem', profileItem);
  }
  static editProfileItem(profileItem: IProfileItem): Promise<AxiosResponse<IProfileItem[]>> {
    return api.post('/users/editProfileItem', profileItem);
  }
}
