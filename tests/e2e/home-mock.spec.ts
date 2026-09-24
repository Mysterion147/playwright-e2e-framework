import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/home.page';

test.describe('Home Page - Resiliência e Mocks de API', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  test('Deve exibir estado amigável quando a API de artigos retornar Erro 500', async ({ page }) => {
    // intercepta o GET pra forcar 500
    await page.route('**/api/articles*', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ errors: { body: ['Erro interno do servidor'] } }),
      });
    });

    await homePage.goto();

    // valida tratamento do erro
    await expect(page.getByText(/No articles are here|Loading articles/i)).toBeVisible();
  });

  test('Deve carregar um Feed Mockado customizado', async ({ page }) => {
    // intercepta rota dos artigos e injeta um artigo customizado
    await page.route('**/api/articles*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          articles: [
            {
              slug: 'artigo-mockado-playwright',
              title: 'Artigo Injetado via Mock',
              description: 'Este artigo não existe no banco de dados real',
              body: 'Demonstração de controle de resposta de rede.',
              tagList: ['mock', 'playwright'],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              favorited: false,
              favoritesCount: 99,
              author: {
                username: 'qa_mock_user',
                bio: 'Robô QA',
                following: false,
              },
            },
          ],
          articlesCount: 1,
        }),
      });
    });

    await homePage.goto();

    await expect(page.getByText('Artigo Injetado via Mock')).toBeVisible();
  });
});