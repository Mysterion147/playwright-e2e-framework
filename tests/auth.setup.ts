import { test as setup } from '@playwright/test';
import { AuthApi } from '../src/api/auth.api';
import { STORAGE_STATE } from '../playwright.config';

setup('Autenticar usuário via API', async ({ request, page }) => {
  const authApi = new AuthApi(request);

  const userData = await authApi.login({
    email: 'qa.playwright.demo@mail.com',
    password: 'Password123!',
  });

  await page.goto('/');

  await page.evaluate((user) => {
    localStorage.setItem('jwt', user.token);
    localStorage.setItem('jwtToken', user.token);
    localStorage.setItem('user', JSON.stringify(user));
  }, userData);

  // recarrega para validar que o Angular reconhece a secao invalida
  await page.reload();

  await page.context().storageState({ path: STORAGE_STATE });
});