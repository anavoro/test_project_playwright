import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  emailInput: Locator;
  passwordInput: Locator;
  submitBtn: Locator;
  signUpLink: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page.locator("#email");
    this.passwordInput = page.locator("#password");
    this.submitBtn = page.getByRole("button", { name: "Увійти", exact: true });
    this.signUpLink = page.locator('[data-testid="switcher"]');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitBtn.click();
  }
}
