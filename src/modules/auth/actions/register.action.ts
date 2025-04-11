import { tesloApi } from '@/api/tesloApi';
import { isAxiosError } from 'axios';
import type { AuthResponse, User } from '../interfaces';

interface RegisterError {
  ok: false;
  message: string;
}

interface RegisterSucces {
  ok: true;
  user: User;
  token: string;
}

export const registerAction = async (
  fullName: string,
  email: string,
  password: string,
): Promise<RegisterError | RegisterSucces> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      fullName,
      email,
      password,
    });

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 400) {
      return {
        ok: false,
        message: 'Faltan campos requeridos',
      };
    }

    console.log(error);
    throw new Error('No se ha podido realizar la petición');
  }
};
