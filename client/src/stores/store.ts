import { defineStore } from 'pinia';
import { IUser } from 'src/models/IUser';

export const useStore = defineStore('main', {
  state: () => ({
    isAuth: false,
    user: {} as IUser,
  }),

  getters: {
    getIsAuth: (state): boolean => state.isAuth,
    getUser: (state): IUser => state.user,
  },

  actions: {
    setIsAuth( isAuth: boolean ) {
      this.isAuth = isAuth;
    },
    setUser(user: IUser) {
      this.user = user;
    }
  }
});
