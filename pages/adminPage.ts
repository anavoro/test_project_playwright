import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class AdminPage extends BasePage {
  // ==================== NAVIGATION ELEMENTS ====================
  readonly adminPanel: Locator;
  readonly userPanel: Locator;
  readonly technicPanel: Locator;
  readonly technicCategories: Locator;
  readonly technicBrands: Locator;
  readonly servicePanel: Locator;

  // ==================== USER TABLE ELEMENTS ====================
  readonly userPageTitle: Locator;
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
  readonly sortedAscendingIndicator: Locator;
  readonly sortedDescendingIndicator: Locator;

  // ==================== PAGINATION ELEMENTS ====================
  readonly paginationDropdown: Locator;
  readonly paginationSelect: Locator;
  readonly paginationInfo: Locator;

  // ==================== LOGIN ELEMENTS ====================
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize navigation elements
    this.adminPanel = page.locator('a[href="/admin/"]');
    this.userPanel = page.locator('a[href="/admin/users/"]');
    this.technicPanel = page.getByText("Техніка");
    this.technicCategories = page.getByText('Категорії техніки');
    this.technicBrands = page.getByText('Виробники техніки');
    this.servicePanel = page.getByText("Сервіси");

    // Initialize user table elements
    this.userPageTitle = page.locator('div.AdminLayout_title__lqIgo');
    this.userRows = page.locator('[data-testid="userRow"]');
    this.tableContainer = page.locator('[data-testid="adminRowContainer"]');
    this.userContainer = page.getByTestId("userContainer");
    this.userRoleCells = page.locator('[data-testid="userRow"] td:nth-child(4)');
    this.searchField = page.getByTestId("input");

    // Initialize user form elements
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

    // Initialize edit user elements
    this.reviewBtn = page.getByTestId('adminOkoButton');
    this.userPage = page.getByText('Перегляд користувача');
    this.editBtn = page.getByTestId('adminPenBtn');
    this.editFirstName = page.locator('div[data-testid="customInputWrapper"]', { hasText: "Прізвище" })
      .locator('input[data-testid="custom-input"]');
    this.editLastName = page.locator('div[data-testid="customInputWrapper"]', { hasText: "Ім'я" })
      .locator('input[data-testid="custom-input"]');
    this.editPhone = page.getByTestId('OwnerProfileNumber');

    // Initialize sorting elements
    this.getSortButtonByName = (name: string) =>
      page.locator(`span[role="button"][data-testid="sortLabelContainer"]:has-text("${name}")`);
    this.sortedAscendingIndicator = page.locator('span.MuiBox-root:text("sorted ascending")');
    this.sortedDescendingIndicator = page.locator('span.MuiBox-root:text("sorted descending")');

    // Initialize pagination elements
    this.paginationSelect = page.locator('.MuiTablePagination-select');
    this.paginationDropdown = page.locator('.MuiTablePagination-select');
    this.paginationInfo = page.locator('.MuiTablePagination-displayedRows');

    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.getByRole('button', { name: 'Увійти' });
  }

  // ==================== NAVIGATION METHODS & VERIFICATION ====================
  async navigateToUsers(): Promise<void> {
    await this.userPanel.click();
    await this.page.waitForURL('**/admin/users/', { timeout: 5000 });
  }

  async openTechnicMenu(): Promise<void> {
    await this.technicPanel.click();
  }

  async verifyPageTitle(expectedTitle: string): Promise<void> {
    await this.userPageTitle.waitFor({ state: 'visible', timeout: 5000 });
    await expect(this.userPageTitle).toHaveText(expectedTitle);
  }

  // ==================== AUTHENTICATION METHODS ====================
  async login(email: string, password: string) {
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

  // ==================== USER MANAGEMENT METHODS & VERIFICATION ====================
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

  // ==================== FILTERING METHODS & VERIFICATION ====================
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

  // ==================== SORTING METHODS & VERIFICATION ====================
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

  // Date sorting verification methods
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

  // Login sorting helper methods
  isPhoneNumber(str: string): boolean {
    return /^[\d\s+\-()]+$/.test(str.trim());
  }
  
  normalizeLogin(login: string): string | number {
    const trimmed = login.trim();
    
    if (this.isPhoneNumber(trimmed)) {
      const digitsOnly = trimmed.replace(/\D/g, '');
      return digitsOnly ? parseInt(digitsOnly, 10) : 0;
    } else {
      return trimmed.toLowerCase();
    }
  }
  
  compareLogins(a: string, b: string, locale: string = 'uk'): number {
    const normalizedA = this.normalizeLogin(a);
    const normalizedB = this.normalizeLogin(b);
    if (typeof normalizedA === 'number' && typeof normalizedB === 'number') {
      return normalizedA - normalizedB;
    }
    if (typeof normalizedA === 'string' && typeof normalizedB === 'string') {
      const collator = new Intl.Collator(locale);
      return collator.compare(normalizedA, normalizedB);
    }
    if (typeof normalizedA === 'number' && typeof normalizedB === 'string') {
      return -1;
    }
    if (typeof normalizedA === 'string' && typeof normalizedB === 'number') {
      return 1;
    }
    
    return 0;
  }

  // Login sorting verification methods
  verifyLoginsAreSortedDescending(logins: string[], locale: string = 'uk'): boolean {
    for (let i = 0; i < logins.length - 1; i++) {
      if (this.compareLogins(logins[i], logins[i + 1], locale) < 0) {
        return false;
      }
    }
    return true;
  }
  
  verifyLoginsAreSortedAscending(logins: string[], locale: string = 'uk'): boolean {
    for (let i = 0; i < logins.length - 1; i++) {
      if (this.compareLogins(logins[i], logins[i + 1], locale) > 0) {
        return false;
      }
    }
    return true;
  }

  // Username sorting helper methods
  getUsernameType(username: string): 'ukrainian' | 'english' | 'symbols' {
    const trimmed = username.trim();
  
    const hasUkrainian = /[а-яё]/i.test(trimmed);
    const hasEnglish = /[a-z]/i.test(trimmed);
    const isOnlySymbols = !/[a-zA-Zа-яё0-9]/i.test(trimmed);
    
    if (isOnlySymbols) {
      return 'symbols';
    } else if (hasUkrainian) {
      return 'ukrainian';
    } else if (hasEnglish) {
      return 'english';
    } else {
      return 'symbols';
    }
  }

  normalizeUsername(username: string): string {
    const trimmed = username.trim();
    const type = this.getUsernameType(trimmed);
    
    switch (type) {
      case 'ukrainian':
        return trimmed.toLowerCase();
      case 'english':
        return trimmed.toLowerCase();
      case 'symbols':
        return trimmed;
      default:
        return trimmed.toLowerCase();
    }
  }
  
  compareUsernames(a: string, b: string): number {
    const typeA = this.getUsernameType(a);
    const typeB = this.getUsernameType(b);

    const typePriority = { ukrainian: 1, english: 2, symbols: 3 };
    
    if (typeA !== typeB) {
      return typePriority[typeA] - typePriority[typeB];
    }
    
    const normalizedA = this.normalizeUsername(a);
    const normalizedB = this.normalizeUsername(b);
    
    if (typeA === 'ukrainian') {
      const collator = new Intl.Collator('uk');
      return collator.compare(normalizedA, normalizedB);
    } else if (typeA === 'english') {
      const collator = new Intl.Collator('en');
      return collator.compare(normalizedA, normalizedB);
    } else {
      return normalizedA.localeCompare(normalizedB);
    }
  }

  // Username sorting verification methods
  verifyUsernamesAreSortedDescending(usernames: string[]): boolean {
    for (let i = 0; i < usernames.length - 1; i++) {
      if (this.compareUsernames(usernames[i], usernames[i + 1]) < 0) {
        return false;
      }
    }
    return true;
  }
  
  verifyUsernamesAreSortedAscending(usernames: string[]): boolean {
    for (let i = 0; i < usernames.length - 1; i++) {
      if (this.compareUsernames(usernames[i], usernames[i + 1]) > 0) {
        return false;
      }
    }
    return true;
  }

  // General sorting verification method
  verifyArrayIsSortedDescending(arr: string[], locale: string = 'uk'): boolean {
    const collator = new Intl.Collator(locale);
    for (let i = 0; i < arr.length - 1; i++) {
      if (collator.compare(arr[i], arr[i + 1]) < 0) return false;
    }
    return true;
  }

  // ==================== PAGINATION METHODS & VERIFICATION ====================
  async selectPaginationOption(option: number): Promise<void> {
    await this.paginationDropdown.click();
    await this.page.locator(`[data-value="${option}"]`).click();
  }

  async getUserRowsCount(): Promise<number> {
    await this.userRows.first().waitFor({ state: 'visible' });
    return await this.userRows.count();
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

  async verifyPaginationSelection(expectedValue: number): Promise<void> {
    const selectedValue = await this.getSelectedPaginationValue();
    expect(selectedValue).toBe(expectedValue.toString());
  }

  async verifyUserRowsCount(maxExpected: number): Promise<void> {
    const actualCount = await this.getUserRowsCount();
    expect(actualCount).toBeLessThanOrEqual(maxExpected);
    expect(actualCount).toBeGreaterThan(0);
  }

  async verifyPaginationInfo(expectedPerPage: number): Promise<void> {
    const paginationInfoLocator = this.paginationInfo;

    await expect(paginationInfoLocator).not.toHaveText(/з 0 по 0 з 0/);

    const paginationText = await paginationInfoLocator.textContent();
    const match = paginationText?.match(/з (\d+)$/);
    const userCount = match ? parseInt(match[1], 10) : 0;

    expect(paginationText).toContain('Показано з 1 по');
    expect(paginationText).toContain(`по ${Math.min(expectedPerPage, userCount)}`);
    expect(paginationText).toMatch(/з \d+$/);
  }

  async verifyPaginationDetails(expectedPerPage: number): Promise<void> {
    const details = await this.getPaginationDetails();
    const actualUserRows = await this.getUserRowsCount();

    expect(details.from).toBe(1);
    expect(details.to).toBe(Math.min(expectedPerPage, details.total));
    expect(actualUserRows).toBe(details.to - details.from + 1);
  }

  // ==================== HELPER METHODS ====================
  userRowByEmail(email: string): Locator {
    return this.userRows.filter({ hasText: email });
  }

  deleteButtonInRow(row: Locator): Locator {
    return row.locator('[data-testid="bucketBtn"]');
  }
}

// ==================== TYPE DEFINITIONS ====================
interface UserFormData {
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  password: string;
}

interface EditUserFormData {
  lastName: string;
  firstName: string;
  phone: string;
}

interface PaginationDetails {
  from: number;
  to: number;
  total: number;
}