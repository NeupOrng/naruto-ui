import { defineStore } from "pinia";
import { IAuthStoreState } from "./interface/auth";

export const useAuthStore = defineStore('auth-store', {
  state: () => {
    return {
      Token: '',
      Status: -1,
      Username: '',
      IsAuth: false,
    }
  },
  actions: {
    UpdateToken(token: string): void {
      const tokenCookie = useCookie('access-token', { maxAge: 10 * 60 });
      this.Token = token;
      tokenCookie.value = token;
      this.IsAuth = true;
    },
    RemoveToken(): void {
      this.Token = '';
      this.IsAuth = false;
      const tokenCookie = useCookie('access-token');
      tokenCookie.value = '';
    }
  },
  getters: {
    GetToken(state): string {
      return state.Token;
    },
    GetIsAuth(state): boolean {
      return state.IsAuth && state.Token.length > 0;
    }
  },
})