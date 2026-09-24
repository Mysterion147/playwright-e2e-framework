import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/home.page';

test.describe('Home Page - Usuário Autenticado', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('Deve visualizar os elementos do feed autenticado com sucesso', async () => {
    await expect(homePage.newArticleLink.or(homePage.yourFeedTab).first()).toBeVisible();
  });

  test('Deve alternar para o Global Feed e carregar os artigos', async () => {
    await homePage.selectGlobalFeed();
    
    await expect(homePage.articlesList.first()).toBeVisible({ timeout: 10000 });
  });
});