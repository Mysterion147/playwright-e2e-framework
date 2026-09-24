import { test, expect } from '@playwright/test';
import { ArticlePage } from '../../src/pages/article.page';

test.describe('Gestão de Artigos - Usuário Autenticado', () => {
  let articlePage: ArticlePage;

  test.beforeEach(async ({ page }) => {
    articlePage = new ArticlePage(page);
    await articlePage.gotoEditor();
  });

  test('Deve criar e publicar um novo artigo com sucesso', async () => {
    const uniqueTitle = `Artigo de Teste Playwright ${Date.now()}`;
    const articleData = {
      title: uniqueTitle,
      description: 'Descricao gerada automaticamente pelo teste com Playwright',
      body: 'Body gerado automaticamente pelo teste com Playwright.',
      tags: ['playwright', 'typescript', 'qa'],
    };

    await articlePage.createArticle(articleData);

    await expect(articlePage.articleTitleHeader).toHaveText(articleData.title);
    await expect(articlePage.articleBodyText).toContainText(articleData.body);
  });
});