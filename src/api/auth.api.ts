import { APIRequestContext } from '@playwright/test';

export class AuthApi {
  constructor(private request: APIRequestContext) {}

  async login(user: { email: string; password: string }) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const baseUrl = 'https://api.realworld.show/api';

    // 1. Tenta o login
    let response = await this.request.post(`${baseUrl}/users/login`, {
      headers,
      data: { user },
    });

    // 2. Registar se não existir
    if (response.status() === 401 || response.status() === 422) {
      await this.request.post(`${baseUrl}/users`, {
        headers,
        data: {
          user: {
            username: `user_${Date.now()}`,
            email: user.email,
            password: user.password,
          },
        },
      });

      response = await this.request.post(`${baseUrl}/users/login`, {
        headers,
        data: { user },
      });
    }

    if (!response.ok()) {
      throw new Error(`Falha na autenticação via API (${response.status()}): ${await response.text()}`);
    }

    const body = await response.json();
    return body.user;
  }
}