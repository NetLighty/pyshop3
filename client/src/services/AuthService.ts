import { api } from '../boot/axios';
import { AxiosResponse } from 'axios';
import { AuthResponse } from 'src/models/AuthResponse';
import { LoginDto, RegistrationDto } from 'src/models/AuthDto';
import { lsKeys } from 'src/utils/lsKeys';
import { useStore } from '../stores/store';
import UserService from './UserService';

export default class AuthService {
  static async login(authDto: LoginDto): Promise<AuthResponse> {
    const response = api.post<AuthResponse>('/auth/login', authDto );
    const tokens = (await response).data;
    localStorage.setItem(lsKeys.access_token, tokens.access_token);
    localStorage.setItem(lsKeys.refresh_token, tokens.refresh_token);
    return tokens;
  }

  static async initUser() {
    try {
      const store = useStore();
      const response = await UserService.getUser();
      store.setIsAuth(true);
      store.setUser(response.data);
    } catch {
      // console.log('isAuth false');
    }
  }

  static async registration(authDto: RegistrationDto): Promise<AxiosResponse> {
    return api.post<AuthResponse>('/auth/registration', authDto);
  }

  static async logout(): Promise<void> {
    localStorage.clear();
    return api.post('/auth/logout');
  }
}
