import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly globalFeedTab: Locator;
  readonly yourFeedTab: Locator;
  readonly newArticleLink: Locator;
  readonly articlesList: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.globalFeedTab = page.getByRole('button', { name: /Global Feed/i }).or(page.getByText(/Global Feed/i));
    this.yourFeedTab = page.getByRole('button', { name: /Your Feed/i }).or(page.getByText(/Your Feed/i));
    this.newArticleLink = page.getByRole('link', { name: /New Article|Novo Artigo/i });
    this.articlesList = page.locator('.article-preview, app-article-preview, article-list-item');
  }

  async goto() {
    await this.page.goto('/');
  }

  async selectGlobalFeed() {
    await this.globalFeedTab.click();
  }

  async selectYourFeed() {
    await this.yourFeedTab.click();
  }
}