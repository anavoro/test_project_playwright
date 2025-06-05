import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class AdminPage extends BasePage {
  generalPanel: Locator;
  sideMenu: Locator;
  inputEmail: Locator;
  inputPassword: Locator;
  adminPanel: Locator;
  userPanel: Locator;
  technicPanel: Locator;
  servicePanel: Locator;
  buttonLogin: Locator;
  buttonSupport: Locator;
  buttonMainPage: Locator;
  buttonTenders: Locator;
  tenderTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.inputEmail = page.locator("#email");
    this.inputPassword = page.locator("#password");
    this.sideMenu = page.locator('[data-testid="navigationContainer"]');
    this.generalPanel = page.locator(
      '[class="AdminLayout_content_wrapper___EUUc"]'
    );
    this.adminPanel = page.locator('a[href="/admin/"]');
    this.userPanel = page.locator('a[href="/admin/users"]');
    this.technicPanel = page.getByText("Техніка");
    this.servicePanel = page.getByText("Сервіси");
    this.buttonLogin = page.getByRole("button", { name: "Увійти" });
    this.buttonSupport = page.locator('a[href="/admin/chat/"]');
    this.buttonMainPage = page.locator('[data-testid="homeButton"]');
    this.buttonTenders = page.locator('[href="/admin/tenders/"]');
    this.tenderTitle = page.locator('//div[@class="AdminLayout_title__lqIgo"]');
  }

  async navigateToUsers(baseUrl: string) {
    await this.goto(baseUrl);
  }

  async login(email: string, password: string) {
    const emailCount = await this.inputEmail.count();
    for (let i = 0; i < emailCount; i++) {
      const input = this.inputEmail.nth(i);
      if (await input.isVisible()) {
        await input.fill(email);
      }
    }

    const passwordCount = await this.inputPassword.count();
    for (let i = 0; i < passwordCount; i++) {
      const input = this.inputPassword.nth(i);
      if (await input.isVisible()) {
        await input.fill(password);
      }
    }

    for (let i = 0; i < (await this.buttonLogin.count()); i++) {
      const btn = this.buttonLogin.nth(i);
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

  async clickButtonTenders() {
    await this.click(this.buttonTenders);
  }

  async clickButtonMainPage() {
    await this.click(this.buttonMainPage);
  }

  async verifyWhetherAdminPageIsLoaded() {
    await this.page.waitForLoadState("networkidle");
    await expect(this.sideMenu).toBeVisible();
    await expect(this.generalPanel).toBeVisible();
  }
}
