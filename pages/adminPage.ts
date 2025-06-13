import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';
import type { UserFormData, EditUserFormData, PaginationDetails } from '../utils/types';

export class AdminPage extends BasePage {
  // ==================== NAVIGATION ELEMENTS ====================
  readonly adminPanel: Locator;
  readonly userPanel: Locator;
  readonly technicPanel: Locator;
  readonly technicCategories: Locator;
  readonly technicBrands: Locator;
  readonly servicePanel: Locator;
  readonly sideMenu: Locator;
  readonly generalPanel: Locator;
  readonly buttonSupport: Locator;
  readonly buttonMainPage: Locator;

  // ==================== USER TABLE ELEMENTS ====================
  readonly pageTitle: Locator;
  readonly userRows: Locator;
  readonly tableContainer: Locator;
  readonly userContainer: Locator;
  readonly userRoleCells: Locator;
  readonly searchField: Locator;

  // ==================== USER FORM ELEMENTS ====================
  readonly addUserBtn: Locator;
  readonly addUserPanel: Locator;
  readonly userGroupDropdown: Locator;
  readonly userGroupManagement: Locator;
  readonly userGroupClient: Locator;
  readonly lastName: Locator;
  readonly firstName: Locator;
  readonly phone: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly saveButton: Locator;
  readonly deleteButton: Locator;
  readonly confirmDeleteButton: Locator;

  // ==================== EDIT USER ELEMENTS ====================
  readonly editBtn: Locator;
  readonly reviewBtn: Locator;
  readonly userPage: Locator;
  readonly editFirstName: Locator;
  readonly editLastName: Locator;
  readonly editPhone: Locator;

  // ==================== SORTING ELEMENTS ====================
  readonly getSortButtonByName: (name: string) => Locator;

  // ==================== PAGINATION ELEMENTS ====================
  readonly paginationDropdown: Locator;
  readonly paginationSelect: Locator;
  readonly paginationInfo: Locator;

  // ==================== LOGIN ELEMENTS ====================
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly inputEmail: Locator;
  readonly inputPassword: Locator;
  readonly buttonLogin: Locator;

  // ==================== TENDER ELEMENTS ====================
  readonly buttonTenders: Locator;
  readonly tenderTitle: Locator;
  readonly adminEyeButton: Locator;
  readonly inputTenderName: Locator;
  readonly labelTenderCategory: Locator;
  readonly labelTenderService: Locator;
  readonly inputTenderInceptionDate: Locator;
  readonly inputTenderEndDate: Locator;
  readonly inputTenderPerfomanceDate: Locator;
  readonly inputTenderPrice: Locator;
  readonly inputTenderExtraInfo: Locator;
  readonly inputTenderCompanyInfo: Locator;
  readonly inputTenderLastNameInfo: Locator;
  readonly inputTenderFirstNameInfo: Locator;
  readonly inputTenderNumberInfo: Locator;
  readonly buttonClose: Locator;
  readonly buttonEditTender: Locator;
  readonly titleOfEditTenderPage: Locator;
  readonly inputEditTenderName: Locator;
  readonly buttonCloseEditPage: Locator;
  readonly formOfTenderOnTenderPage: Locator;

  constructor(page: Page) {
    super(page);

    // ==================== NAVIGATION ELEMENTS ====================
    this.adminPanel = page.locator('a[href="/admin/"]');
    this.userPanel = page.locator('a[href="/admin/users/"]');
    this.technicPanel = page.getByText("Техніка");
    this.technicCategories = page.getByText('Категорії техніки');
    this.technicBrands = page.getByText('Виробники техніки');
    this.servicePanel = page.getByText("Сервіси");
    this.sideMenu = page.locator('[data-testid="navigationContainer"]');
    this.generalPanel = page.locator('[class="AdminLayout_content_wrapper___EUUc"]');
    this.buttonSupport = page.locator('a[href="/admin/chat/"]');
    this.buttonMainPage = page.locator('[data-testid="homeButton"]');

    // ==================== USER TABLE ELEMENTS ====================
    this.pageTitle = page.locator('div.AdminLayout_title__lqIgo');
    this.userRows = page.locator('[data-testid="userRow"]');
    this.tableContainer = page.locator('[data-testid="adminRowContainer"]');
    this.userContainer = page.getByTestId("userContainer");
    this.userRoleCells = page.locator('[data-testid="userRow"] td:nth-child(4)');
    this.searchField = page.getByTestId("input");

    // ==================== USER FORM ELEMENTS ====================
    this.addUserBtn = page.getByTestId("customButtonContainer");
    this.addUserPanel = page.getByTestId("content");
    this.userGroupDropdown = page.getByTestId("div_CustomSelect").first();
    this.userGroupManagement = page.getByText('Відділ менеджменту');
    this.userGroupClient = page.getByTestId('span-customSelect').filter({ hasText: 'Клієнт' });
    this.lastName = page.locator('input[name="last_name"]');
    this.firstName = page.locator('input[name="first_name"]');
    this.phone = page.locator('#mobile');
    this.email = page.getByTestId('custom-input');
    this.password = page.locator('#password');
    this.saveButton = page.getByRole('button', { name: 'Зберегти' });
    this.deleteButton = page.locator('[data-testid="bucketBtn"]');
    this.confirmDeleteButton = page.getByRole('button', { name: 'Так' });

    // ==================== EDIT USER ELEMENTS ====================
    this.reviewBtn = page.getByTestId('adminOkoButton');
    this.userPage = page.getByText('Перегляд користувача');
    this.editBtn = page.getByTestId('adminPenBtn');
    this.editFirstName = page.locator('div[data-testid="customInputWrapper"]', { hasText: "Прізвище" }).locator('input[data-testid="custom-input"]');
    this.editLastName = page.locator('div[data-testid="customInputWrapper"]', { hasText: "Ім\'я" }).locator('input[data-testid="custom-input"]');
    this.editPhone = page.getByTestId('OwnerProfileNumber');

    // ==================== SORTING ELEMENTS ====================
    this.getSortButtonByName = (name: string) =>
      page.locator(`span[role="button"][data-testid="sortLabelContainer"]:has-text("${name}")`);

    // ==================== PAGINATION ELEMENTS ====================
    this.paginationDropdown = page.locator('.MuiTablePagination-select');
    this.paginationSelect = page.locator('.MuiTablePagination-select');
    this.paginationInfo = page.locator('.MuiTablePagination-displayedRows');

    // ==================== LOGIN ELEMENTS (Both versions) ====================
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.getByRole('button', { name: 'Увійти' });
    this.inputEmail = page.locator("#email");
    this.inputPassword = page.locator("#password");
    this.buttonLogin = page.getByRole("button", { name: "Увійти" });

    // ==================== TENDER ELEMENTS ====================
    this.buttonTenders = page.locator('[href="/admin/tenders/"]');
    this.tenderTitle = page.locator('//div[@class="AdminLayout_title__lqIgo" and text() = "Teндери"]');
    this.adminEyeButton = page.locator('[data-testid="adminOkoButton"]');
    this.inputTenderName = page.locator('//div[contains(text(), "Назва тендера")]/following-sibling::div');
    this.labelTenderCategory = page.locator('//div[contains(text(), "Категорія")]/following-sibling::div');
    this.labelTenderService = page.locator('//div[contains(text(), "Послуга яку потрібно виконати")]/following-sibling::div');
    this.inputTenderInceptionDate = page.locator('//div[contains(text(), "Початок")]/following-sibling::div');
    this.inputTenderEndDate = page.locator('//div[contains(text(), "Кінець")]/following-sibling::div');
    this.inputTenderPerfomanceDate = page.locator('//div[contains(text(), "Період виконання робіт")]/following-sibling::div');
    this.inputTenderPrice = page.locator('//div[contains(text(), "Оголошений бюджет*")]/following-sibling::div');
    this.inputTenderExtraInfo = page.locator('//div[contains(text(), "Додаткова інформація")]/following-sibling::div');
    this.inputTenderCompanyInfo = page.locator('//div[contains(text(), "Інформація про компанію")]/following-sibling::div');
    this.inputTenderLastNameInfo = page.locator('//div[contains(text(), "Прізвище")]/following-sibling::div');
    this.inputTenderFirstNameInfo = page.locator(`//div[contains(text(), "Ім'я")]/following-sibling::div`);
    this.inputTenderNumberInfo = page.locator('//div[contains(text(), "Номер телефону")]/following-sibling::div');
    this.buttonClose = page.locator('[data-testid="closeBtn"]');
    this.buttonEditTender = page.locator('[data-testid="adminPenBtn"]').first();
    this.titleOfEditTenderPage = page.locator('//div[@class="AdminLayout_title__lqIgo" and text()="Редагування тендера"]');
    this.inputEditTenderName = page.locator('[data-testid="custom-input"]').first();
    this.buttonCloseEditPage = page.locator('//span[@data-testid="nameNextBtn"]/ancestor::button');
    this.formOfTenderOnTenderPage = page.locator('[data-testid="tendersRow"]').first();
  }

  // ==================== NAVIGATION METHODS ====================
  async navigateToUsers(baseUrl?: string): Promise<void> {
    if (baseUrl) {
      await this.goto(baseUrl);
    } else {
      await this.userPanel.click();
      await this.page.waitForURL('**/admin/users/', { timeout: 5000 });
    }
  }

  async openTechnicMenu(): Promise<void> {
    await this.technicPanel.click();
  }

  async clickButtonSupport(): Promise<void> {
    await this.click(this.buttonSupport);
  }

  async clickButtonMainPage(): Promise<void> {
    await this.click(this.buttonMainPage);
  }

  async clickButtonTenders(): Promise<void> {
    await this.click(this.buttonTenders);
  }

  // ==================== AUTHENTICATION METHODS ====================
  async login(email: string, password: string): Promise<void> {
    const emailCount = await this.emailInput.count();
    for (let i = 0; i < emailCount; i++) {
      const input = this.emailInput.nth(i);
      if (await input.isVisible()) {
        await input.fill(email);
      }
    }

    const passwordCount = await this.passwordInput.count();
    for (let i = 0; i < passwordCount; i++) {
      const input = this.passwordInput.nth(i);
      if (await input.isVisible()) {
        await input.fill(password);
      }
    }

    for (let i = 0; i < await this.loginButton.count(); i++) {
      const btn = this.loginButton.nth(i);
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

  // ==================== USER MANAGEMENT METHODS ====================
  async addNewUser(): Promise<void> {
    await this.addUserBtn.click();
  }

  async selectUserGroupManagement(): Promise<void> {
    await this.userGroupDropdown.click();
    await this.userGroupManagement.click();
  }

  async selectGroupClient(): Promise<void> {
    await this.userGroupDropdown.click();
    await this.page.waitForTimeout(2000);
    await this.userGroupClient.click();
    await this.page.waitForTimeout(1000);
  }

  async fillUserForm(userData: UserFormData): Promise<void> {
    const { lastName, firstName, phone, email, password } = userData;

    await this.lastName.fill(lastName);
    await this.firstName.fill(firstName);
    await this.phone.fill(phone);
    await this.email.type(email, { delay: 10 });
    await expect(this.email).toHaveValue(email);
    await this.password.fill(password);
    await this.saveButton.click();
  }

  async editUserForm(userData: EditUserFormData): Promise<void> {
    const { lastName, firstName, phone } = userData;

    await expect(this.editLastName).toHaveValue(/.+/, { timeout: 5000 });
    await this.editLastName.fill(lastName);
    await this.editFirstName.fill(firstName);
    await this.editPhone.fill('');
    await this.editPhone.fill(phone);
    await this.saveButton.click();
  }

  async deleteUserByEmail(email: string): Promise<void> {
    const userRow = this.userRowByEmail(email);
    await expect(userRow).toBeVisible();
    const deleteBtn = this.deleteButtonInRow(userRow);
    await deleteBtn.click();
    await this.confirmDeleteButton.click();
  }

  async editUser(email: string): Promise<void> {
    const row = this.page.locator(`tr:has-text("${email}")`);
    await row.locator(this.editBtn).click();
  }

  async viewUser(): Promise<void> {
    await this.reviewBtn.first().click();
  }

  async waitForUserRowByEmail(email: string): Promise<void> {
    await this.page.locator(`tr:has-text("${email}")`).waitFor({ 
      state: 'visible', 
      timeout: 5000 
    });
  }

  getUserRowByEmailLocator(email: string): Locator {
    return this.page.locator(`tr:has-text("${email}")`);
  }

  async verifyUserPageTitle(): Promise<void> {
    await this.userPage.waitFor({ state: 'visible' });
    await expect(this.userPage).toBeVisible();
  }

  // ==================== FILTERING METHODS ====================
  async verifyAllFilteredUsersAreClients(): Promise<void> {
    await expect(this.userRows.first()).toBeVisible({ timeout: 10000 }); 
    await expect.poll(async () => {
      const allRoleTexts = await this.userRoleCells.allInnerTexts();
      return allRoleTexts.length > 0 && allRoleTexts.every(text => text.trim() === 'Клієнт');
    }, {
      timeout: 15000, 
      message: 'Expected all filtered users to have the role "Клієнт".'
    }).toBe(true);
  }

  async verifyAllFilteredUsersHaveName(expectedName: string): Promise<void> {
    const userNameCells = this.page.locator('[data-testid="userRow"] td:nth-child(3)');
    await expect(userNameCells.first()).toBeVisible();

    await expect.poll(async () => {
      const allNames = await userNameCells.allInnerTexts();
      return allNames.every(name => name.includes(expectedName));
    }).toBe(true);
  }

  // ==================== SORTING METHODS ====================
  async clickSort(columnName: string): Promise<void> {
    await this.getSortButtonByName(columnName).click();
    await this.page.locator('span.MuiBox-root', {
      hasText: /sorted (ascending|descending)/,
    }).first().waitFor({ state: 'visible', timeout: 5000 });
  }

  async getColumnDataByIndex(columnIndex: number): Promise<string[]> {
    const cells = this.userRows.locator(`td:nth-child(${columnIndex})`);

    await expect.poll(
      async () => {
        const count = await cells.count();
        return count > 0;
      },
      { timeout: 10000, message: 'Waiting for table data to load' }
    ).toBe(true);

    return cells.allTextContents();
  }

  async getColumnIndexByHeaderText(headerText: string): Promise<number> {
    const headers = await this.page.locator('thead th').allTextContents();
    const index = headers.findIndex(text => text.includes(headerText));
    if (index === -1) throw new Error(`Header "${headerText}" not found`);
    return index + 1;
  }

  async getColumnDataByHeaderText(headerText: string): Promise<string[]> {
    const index = await this.getColumnIndexByHeaderText(headerText);
    return this.getColumnDataByIndex(index);
  }

  verifyDatesAreSortedDescending(dateStrings: string[]): boolean {
    for (let i = 0; i < dateStrings.length - 1; i++) {
      if (new Date(dateStrings[i]) < new Date(dateStrings[i + 1])) {
        return false;
      }
    }
    return true;
  }

  verifyDatesAreSortedAscending(dateStrings: string[]): boolean {
    for (let i = 0; i < dateStrings.length - 1; i++) {
      if (new Date(dateStrings[i]) > new Date(dateStrings[i + 1])) {
        return false;
      }
    }
    return true;
  }

  // ==================== PAGINATION METHODS ====================
  async selectPaginationOption(option: number): Promise<void> {
    await this.paginationDropdown.click();
    await this.page.locator(`[data-value="${option}"]`).click();
    await this.page.waitForTimeout(500); 
  }

  async getUserRowsCount(): Promise<number> {
    await this.userRows.first().waitFor({ state: 'visible' });
    await this.page.waitForTimeout(200);
    return await this.userRows.count();
  }

  async waitForPaginationUpdate(): Promise<void> {
    await this.userRows.first().waitFor({ state: 'visible' });
    await expect(this.paginationInfo).not.toHaveText(/з 0 по 0 з 0/);
  }

  async waitForUserRowsToLoad(expectedMaxRows: number): Promise<void> {
    await this.page.waitForFunction(
      (maxRows) => {
        const rows = document.querySelectorAll('tbody tr');
        return rows.length > 0 && rows.length <= maxRows;
      },
      expectedMaxRows,
      { timeout: 10000 }
    );
  }

  async getSelectedPaginationValue(): Promise<string> {
    return await this.paginationSelect.textContent() || '';
  }

  async getPaginationInfoText(): Promise<string> {
    return await this.paginationInfo.textContent() || '';
  }

  async getPaginationDetails(): Promise<PaginationDetails> {
    const paginationText = await this.getPaginationInfoText();
    const match = paginationText.match(/Показано з (\d+) по (\d+) з (\d+)/);
    if (!match) {
      throw new Error(`Unable to parse pagination text: ${paginationText}`);
    }
    return {
      from: parseInt(match[1]),
      to: parseInt(match[2]),
      total: parseInt(match[3])
    };
  }

  // ==================== TENDER METHODS ====================
  async addValueToTenderName(basicValue: string): Promise<void> {
    await this.inputEditTenderName.fill(basicValue + "test");
  }

  async clickAdminEyeButton(): Promise<void> {
    await this.click(this.adminEyeButton.first());
  }

  async clickButtonClose(): Promise<void> {
    await this.click(this.buttonClose);
  }

  async clickButtonEditTender(): Promise<void> {
    await this.click(this.buttonEditTender);
  }

  async clickButtonCloseEditPage(): Promise<void> {
    await this.buttonCloseEditPage.scrollIntoViewIfNeeded();
    await this.click(this.buttonCloseEditPage);
  }

  // ==================== VERIFICATION METHODS ====================
  async verifyWhetherAdminPageIsLoaded(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
    await expect(this.sideMenu).toBeVisible();
    await expect(this.generalPanel).toBeVisible();
  }

  async verifyWhetherTendersPageContainsElements(): Promise<void> {
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

  // ==================== HELPER METHODS ====================
  userRowByEmail(email: string): Locator {
    return this.userRows.filter({ hasText: email });
  }
  deleteButtonInRow(row: Locator): Locator {
    return row.locator('[data-testid="bucketBtn"]');
  }
}
