import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class AdminPage extends BasePage {
  generalPanel: Locator;
  sideMenu: Locator;
  adminPanel: Locator;
  inputEmail: Locator;
  inputPassword: Locator;
  buttonLogin: Locator;
  userPanel: Locator;
  technicPanel: Locator;
  servicePanel: Locator;
  buttonSupport: Locator;
  buttonMainPage: Locator;
  buttonTenders: Locator;
  tenderTitle: Locator;
  adminEyeButton: Locator;
  inputTenderName: Locator;
  labelTenderCategory: Locator;
  labelTenderService: Locator;
  inputTenderInceptionDate: Locator;
  inputTenderEndDate: Locator;
  inputTenderPerfomanceDate: Locator;
  inputTenderPrice: Locator;
  inputTenderExtraInfo: Locator;
  inputTenderCompanyInfo: Locator;
  inputTenderLastNameInfo: Locator;
  inputTenderFirstNameInfo: Locator;
  inputTenderNumberInfo: Locator;
  buttonClose: Locator;
  buttonEditTender: Locator;
  titleOfEditTenderPage: Locator;
  inputEditTenderName: Locator;
  buttonCloseEditPage: Locator;
  formOfTenderOnTenderPage: Locator;

  constructor(page: Page) {
    super(page);
    this.sideMenu = page.locator('[data-testid="navigationContainer"]');
    this.inputEmail = page.locator("#email");
    this.inputPassword = page.locator("#password");
    this.buttonLogin = page.getByRole("button", { name: "Увійти" });
    this.generalPanel = page.locator(
      '[class="AdminLayout_content_wrapper___EUUc"]'
    );
    this.adminPanel = page.locator('a[href="/admin/"]');
    this.userPanel = page.locator('a[href="/admin/users"]');
    this.technicPanel = page.getByText("Техніка");
    this.servicePanel = page.getByText("Сервіси");
    this.buttonSupport = page.locator('a[href="/admin/chat/"]');
    this.buttonMainPage = page.locator('[data-testid="homeButton"]');
    this.buttonTenders = page.locator('[href="/admin/tenders/"]');
    this.tenderTitle = page.locator(
      '//div[@class="AdminLayout_title__lqIgo" and text() = "Teндери"]'
    );
    this.adminEyeButton = page.locator('[data-testid="adminOkoButton"]');
    this.inputTenderName = page.locator(
      '//div[contains(text(), "Назва тендера")]/following-sibling::div'
    );
    this.labelTenderCategory = page.locator(
      '//div[contains(text(), "Категорія")]/following-sibling::div'
    );
    this.labelTenderService = page.locator(
      '//div[contains(text(), "Послуга яку потрібно виконати")]/following-sibling::div'
    );
    this.inputTenderInceptionDate = page.locator(
      '//div[contains(text(), "Початок")]/following-sibling::div'
    );
    this.inputTenderEndDate = page.locator(
      '//div[contains(text(), "Кінець")]/following-sibling::div'
    );
    this.inputTenderPerfomanceDate = page.locator(
      '//div[contains(text(), "Період виконання робіт")]/following-sibling::div'
    );
    this.inputTenderPrice = page.locator(
      '//div[contains(text(), "Оголошений бюджет*")]/following-sibling::div'
    );
    this.inputTenderExtraInfo = page.locator(
      '//div[contains(text(), "Додаткова інформація")]/following-sibling::div'
    );
    this.inputTenderCompanyInfo = page.locator(
      '//div[contains(text(), "Інформація про компанію")]/following-sibling::div'
    );
    this.inputTenderLastNameInfo = page.locator(
      '//div[contains(text(), "Прізвище")]/following-sibling::div'
    );
    this.inputTenderFirstNameInfo = page.locator(
      `//div[contains(text(), "Ім'я")]/following-sibling::div`
    );
    this.inputTenderNumberInfo = page.locator(
      '//div[contains(text(), "Номер телефону")]/following-sibling::div'
    );
    this.buttonClose = page.locator('[data-testid="closeBtn"]');
    this.buttonEditTender = page.locator('[data-testid="adminPenBtn"]').first();
    this.titleOfEditTenderPage = page.locator(
      '//div[@class="AdminLayout_title__lqIgo" and text()="Редагування тендера"]'
    );
    this.inputEditTenderName = page
      .locator('[data-testid="custom-input"]')
      .first();
    this.buttonCloseEditPage = page.locator(
      '//span[@data-testid="nameNextBtn"]/ancestor::button'
    );
    this.formOfTenderOnTenderPage = page
      .locator('[data-testid="tendersRow"]')
      .first();
  }

  async navigateToUsers(baseUrl: string) {
    await this.goto(baseUrl);
  }

  async addValueToTenderName(basicValue: string) {
    await this.inputEditTenderName.fill(basicValue + "test");
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

  async clickButtonCloseEditPage() {
    await this.buttonCloseEditPage.scrollIntoViewIfNeeded();
    await this.click(this.buttonCloseEditPage);
  }

  async clickButtonEditTender() {
    await this.click(this.buttonEditTender);
  }

  async clickButtonClose() {
    await this.click(this.buttonClose);
  }

  async clickAdminEyeButton() {
    await this.click(this.adminEyeButton.first());
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

  async verifyWhetherTendersPageContainsElements() {
    await expect(this.inputTenderName).toBeVisible();
    await expect(this.labelTenderCategory).toBeVisible();
    await expect(this.labelTenderService).toBeVisible();
    await expect(this.inputTenderInceptionDate).toBeVisible();
    await expect(this.inputTenderEndDate).toBeVisible();
    await expect(this.inputTenderPerfomanceDate).toBeVisible();
    await expect(this.inputTenderPrice).toBeVisible();
    await expect(this.inputTenderExtraInfo).toBeVisible();
    await expect(this.inputTenderCompanyInfo).toBeVisible();
    await expect(this.inputTenderLastNameInfo).toBeVisible();
    await expect(this.inputTenderFirstNameInfo).toBeVisible();
    await expect(this.inputTenderNumberInfo).toBeVisible();
  }
}
