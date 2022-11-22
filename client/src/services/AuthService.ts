import { api } from '../boot/axios';
import { AxiosResponse } from 'axios';
import { IAuthResponse } from 'src/models/IAuthResponse';
import { ILoginDto, IRegistrationDto } from 'src/models/IAuthDto';
import { lsKeys } from 'src/utils/consts';
import { useStore } from '../stores/store';
import UserService from './UserService';

export default class AuthService {
  static async login(authDto: ILoginDto): Promise<IAuthResponse> {
    const response = api.post<IAuthResponse>('/auth/login', authDto );
    const tokens = (await response).data;
    localStorage.setItem(lsKeys.access_token, tokens.access_token);
    localStorage.setItem(lsKeys.refresh_token, tokens.refresh_token);
    return tokens;
  }

  static async initUser() {
    console.log('initUSer');
    try {
      const store = useStore();
      const response = await UserService.getUser();
      store.setIsAuth(true);
      store.setUser(response.data);
    } catch {
      // console.log('isAuth false');
    }
  }

  static async registration(authDto: IRegistrationDto): Promise<AxiosResponse> {
    return api.post<IAuthResponse>('/auth/registration', authDto);
  }

  static async logout(): Promise<void> {
    localStorage.clear();
    return api.post('/auth/logout');
  }
}
