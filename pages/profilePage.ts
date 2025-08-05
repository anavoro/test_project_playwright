import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class ProfilePage extends BasePage {

  profileContainer: Locator;
  profileNumberInput: Locator;
  verifNumberText: Locator;
  logoutBtn: Locator;

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
    
  }

  async clickLogout() {
    await this.click(this.logoutBtn);
  }
}