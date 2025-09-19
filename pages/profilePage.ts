import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class ProfilePage extends BasePage {

  profileContainer: Locator;
  profileNumberInput: Locator;
  verifNumberText: Locator;
  logoutBtn: Locator;
  saveBtn: Locator;
  phoneNumberError: Locator;
  customerTypeSelection: Locator;
  customerTypeOptions: Locator;
  customInputWrapper: Locator;

  //----- Left sidebar -----
  myProfileLeftSideBarLink: Locator;

  // ---- Owner profile form -----
  myProfileName: Locator;
  myProfileSurname: Locator;
  myProfileFatherName: Locator;
  myProfileEdrpou: Locator;
  myProfileEmail: Locator;
  

  constructor(page: Page) {
    super(page);
    this.profileContainer = page.locator('[class^="OwnerLayout_container__"]')
    this.profileNumberInput = page.locator('[data-testid="input_OwnerProfileNumber"]');
    this.verifNumberText = page.locator('[data-testid="verification_OwnerProfileNumber"]');
    this.logoutBtn = page.locator('[data-testid="logOut"]');

    this.myProfileLeftSideBarLink = page.locator('div[class*=LeftSideOwnCabinet_categoriesWrapper]>div:nth-child(4)')

    this.myProfileName = page.locator('div[class*="OwnerProfileForm_nameWrapper"]>div:nth-child(2)>div>input')
    this.myProfileSurname = page.locator('div[class*="OwnerProfileForm_nameWrapper"]>div:nth-child(1)>div>input')
    this.myProfileFatherName = page.locator('div[class*="OwnerProfileForm_nameWrapper"]>div:nth-child(3)>div>input')
    this.myProfileEdrpou = page.locator('div[class*="OwnerProfileLegalType_companyWrapper"]>div:nth-child(1)>div:nth-child(2)>input')
    this.myProfileEmail = page.locator('//div[@data-testid="OwnerProfileEmail"]//input')
    
    this.saveBtn = page.getByTestId('nextButton');
    this.phoneNumberError = page.getByTestId('phoneError_OwnerProfileNumber');
    this.customerTypeSelection = page.getByTestId('div_CustomSelect');
    this.customerTypeOptions = page.locator('[data-testid="item-customSelect"]');
    this.customInputWrapper = page.locator('div[data-testid="customInputWrapper"]');

  }

  async clickLogout() {
    await this.click(this.logoutBtn);
  }

  async clickSave() {
    await this.click(this.saveBtn);
  }

  async selectCustomerType(optionText?: string): Promise<void> {
    await this.click(this.customerTypeSelection);
    await this.customerTypeOptions.first().waitFor({ state: 'visible' });
    
    let selectedOption: Locator;
    
    if (optionText) {
        selectedOption = this.customerTypeOptions.filter({ hasText: optionText });
    } else {
        const optionsCount = await this.customerTypeOptions.count();
        const randomIndex = Math.floor(Math.random() * optionsCount);
        selectedOption = this.customerTypeOptions.nth(randomIndex);
    }
    await this.click(selectedOption);
}

getCustomInputByLabel(labelText: string): Locator {
  return this.customInputWrapper
      .filter({ hasText: labelText })
      .locator('input[data-testid="custom-input"]');
}

getCustomInputErrorByLabel(labelText: string): Locator {
  return this.customInputWrapper
      .filter({ hasText: labelText })
      .locator('div[data-testid="descriptionError"]');
}

async fillInputByLabel(labelText: string, value: string) {
  const input = this.getCustomInputByLabel(labelText);
  await input.fill(value);
}

async clearAllFields(): Promise<void> {
  try {
      await this.profileNumberInput.clear();
      const allInputs = this.customInputWrapper.locator('input[data-testid="custom-input"]');
      const inputs = await allInputs.all();
      
      for (const input of inputs) {
          if (await input.isVisible() && await input.isEnabled()) {
              await input.clear();
          }
      }
  } catch (error) {
    console.warn('Some fields could not be cleared:', error);
  }
}

async clearInputByLabel(labelText: string): Promise<void> {
  const input = this.getCustomInputByLabel(labelText);
  await input.clear();
}

async fillPhoneNumber(phoneNumber: string): Promise<void> {
  await this.profileNumberInput.fill(phoneNumber);
}

async clearPhoneNumber(): Promise<void> {
  await this.profileNumberInput.clear();
}
}
