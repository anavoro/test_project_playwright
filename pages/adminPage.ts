import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class AdminPage extends BasePage {
  adminPanel: Locator;
  userPanel: Locator;
  technicPanel: Locator;
  servicePanel: Locator;
  buttonSupport: Locator;

  constructor(page: Page) {
    super(page);
    this.adminPanel = page.locator('a[href="/admin/"]');
    this.userPanel = page.locator('a[href="/admin/users"]');
    this.technicPanel = page.getByText("Техніка");
    this.servicePanel = page.getByText("Сервіси");
    this.buttonSupport = page.locator('a[href="/admin/chat/"]');
  }

  async navigateToUsers(baseUrl: string) {
    await this.goto(baseUrl);
  }

  async login(email: string, password: string) {
    const emailInputs = this.page.locator("#email");
    const emailCount = await emailInputs.count();
    for (let i = 0; i < emailCount; i++) {
      const input = emailInputs.nth(i);
      if (await input.isVisible()) {
        await input.fill(email);
      }
    }

    const passwordInputs = this.page.locator("#password");
    const passwordCount = await passwordInputs.count();
    for (let i = 0; i < passwordCount; i++) {
      const input = passwordInputs.nth(i);
      if (await input.isVisible()) {
        await input.fill(password);
      }
    }

    const submitButtons = this.page.getByRole("button", { name: "Увійти" });

    for (let i = 0; i < (await submitButtons.count()); i++) {
      const btn = submitButtons.nth(i);
      if (await btn.isVisible()) {
        try {
          await btn.click({ force: true });
        } catch (e) {
          await btn.evaluate((b) => (b as HTMLElement).click());
        }
        break;
      }
    }
  }

  async clickButtonSupport() {
    await this.click(this.buttonSupport);
  }

  async getCertainMessage(page: Page, name: string, date: string) {
    return page.locator(
      `div.AdminChatsChannel_channel_user__BHzd5:has-text("${name}"):has-text("${date}")`
    );
  }
}
