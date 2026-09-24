import { Page, Locator } from '@playwright/test';

export class ArticlePage {
  readonly page: Page;
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly bodyInput: Locator;
  readonly tagsInput: Locator;
  readonly publishButton: Locator;
  readonly articleTitleHeader: Locator;
  readonly articleBodyText: Locator;

  constructor(page: Page) {
    this.page = page;

    // formulario
    this.titleInput = page.getByPlaceholder(/Article Title/i);
    this.descriptionInput = page.getByPlaceholder(/What's this article about\?/i);
    this.bodyInput = page.getByPlaceholder(/Write your article/i);
    this.tagsInput = page.getByPlaceholder(/Enter tags/i);
    this.publishButton = page.getByRole('button', { name: /Publish Article/i });

    this.articleTitleHeader = page.locator('h1');
    this.articleBodyText = page.locator('.article-content p');
  }

  async gotoEditor() {
    await this.page.goto('/editor');
  }

  async createArticle(articleData: { title: string; description: string; body: string; tags?: string[] }) {
    await this.titleInput.fill(articleData.title);
    await this.descriptionInput.fill(articleData.description);
    await this.bodyInput.fill(articleData.body);

    if (articleData.tags) {
      for (const tag of articleData.tags) {
        await this.tagsInput.fill(tag);
        await this.tagsInput.press('Enter');
      }
    }

    await this.publishButton.click();
  }
}