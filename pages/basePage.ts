import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }

  async click(locator: Locator, options?: { timeout?: number }) {
    await expect(locator).toBeVisible({ timeout: options?.timeout || 5000 });
    await locator.click();
  }

  public getPage() {
    return this.page;
  }
}
