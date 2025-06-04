import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class ProfilePage extends BasePage {

  profileContainer: Locator;
  profileNumberInput: Locator;
  verifNumberText: Locator;
  logoutBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.profileContainer = page.locator('[class^="OwnerLayout_container__"]')
    this.profileNumberInput = page.locator('[data-testid="input_OwnerProfileNumber"]');
    this.verifNumberText = page.locator('[data-testid="verification_OwnerProfileNumber"]');
    this.logoutBtn = page.locator('[data-testid="logOut"]');
  }

  async clickLogout() {
    await this.click(this.logoutBtn);
  }
}