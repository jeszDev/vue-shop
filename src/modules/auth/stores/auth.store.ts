import { defineStore } from 'pinia';
import { AuthStatus, type User } from '../interfaces';
import { computed, ref } from 'vue';
import { checkAuthAction, loginAction, registerAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const loginResp = await loginAction(email, password);
      if (!loginResp.ok) {
        logout();
        return false;
      }

      user.value = loginResp.user;
      token.value = loginResp.token;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch (error) {
      console.log(error);

      return logout();
    }
  };

  const register = async (fullName: string, email: string, password: string): Promise<boolean> => {
    try {
      const registerResp = await registerAction(fullName, email, password);
      if (!registerResp.ok) {
        logout();
        return false;
      }

      user.value = registerResp.user;
      token.value = registerResp.token;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch (error) {
      console.log(error);

      return logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    authStatus.value = AuthStatus.Unauthenticated;
    user.value = undefined;
    token.value = '';

    return false;
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResp = await checkAuthAction();

      if (!statusResp.ok) {
        logout();
        return false;
      }

      authStatus.value = AuthStatus.Authenticated;
      user.value = statusResp.user;
      token.value = statusResp.token;
      return true;
    } catch (error) {
      logout();
      console.log(error);
      return false;
    }
  };

  return {
    user,
    token,
    authStatus,

    // Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    isAdmin: computed(() => user.value?.roles.includes('admin') ?? false),
    username: computed(() => user.value?.fullName),

    // Actions
    login,
    logout,
    register,
    checkAuthStatus,
  };
});
