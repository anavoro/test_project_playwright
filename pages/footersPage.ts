import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class FootersPage extends BasePage {
  privacyPolicyTitle: Locator;
  rulesOfUsingFilesOfCookiesTitle: Locator;
  termsOfAccessAndUsingTitle: Locator;
  searchInputAdvertisement: Locator;
  searchInputTenders: Locator;

  constructor(page: Page) {
    super(page);
    this.privacyPolicyTitle = page.locator(
      '[class*="PrivacyPolicy_title__FEiRV"]:has-text("Політика конфіденційності")'
    );
    this.rulesOfUsingFilesOfCookiesTitle = page.locator(
      '[class*="Cookies_title__BVLFo"]:has-text("Політика використання файлів cookie")'
    );
    this.termsOfAccessAndUsingTitle = page.locator(
      '[class*="TermsConditions_title__haW1D"]:has-text("Угода користувача")'
    );
    this.searchInputAdvertisement = page.locator(
      'input[data-testid="searchInput"][placeholder="Пошук оголошень або послуг"]'
    );
    this.searchInputTenders = page.locator(
      'input[data-testid="search"][placeholder="Пошук тендера за ключовими словами"]'
    );
  }

  async verifyFooterLink({
    clickFn,
    expectedUrl,
    expectedVisibleLocator,
    footer,
  }: {
    clickFn: () => Promise<void>;
    expectedUrl: string;
    expectedVisibleLocator: Locator;
    footer: Locator;
  }) {
    await footer.scrollIntoViewIfNeeded();
    await clickFn();
    await expect(this.page).toHaveURL(expectedUrl);
    await expect(expectedVisibleLocator).toBeVisible();
  }

  async verifyFooterLinkMaps({
    clickFn,
    expectedUrl,
    expectedVisibleLocator,
    logo

  }: {
    clickFn: () => Promise<void>;
    expectedUrl: string;
    expectedVisibleLocator: Locator;
    logo: () => Promise<void>;
  }) {
    await clickFn();
    await expect(this.page).toHaveURL(expectedUrl);
    await expect(expectedVisibleLocator).toBeVisible();
    await logo();
  }
}
