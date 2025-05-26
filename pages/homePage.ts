import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  // Logo element
  logo: Locator;

  // Navigation
  mainContainer: Locator;
  announcementsLink: Locator;
  requestsLink: Locator;
  tendersLink: Locator;
  createAnnouncementLink: Locator;

  // Authentication
  loginButton: Locator;
  avatarBlock: Locator;
  dropdownMenuContainer: Locator;
  dropdownProfileEmail: Locator;
  tendersBtn: Locator;
  profileBtn: Locator;
  logoutBtn: Locator;

  // Catalog
  catalogButton: Locator;

  // Search
  topSearchInput: Locator;
  bodySearchForm: Locator;
  bodySearchInput: Locator;

  // Telegram popup
  telegramBotContainer: Locator;
  goToTelegramButton: Locator;
  closeTelegramPopupButton: Locator;

  // Services section
  servicesTitle: Locator;
  servicesPopularButton: Locator;
  servicesAgriculturalButton: Locator;
  servicesConstructionButton: Locator;
  servicesOtherButton: Locator;

  // Equipment section
  equipmentTitle: Locator;
  equipmentPopularButton: Locator;
  equipmentAgriculturalButton: Locator;
  equipmentConstructionButton: Locator;
  equipmentOtherButton: Locator;

  // Contact section
  contactTitle: Locator;
  nameInput: Locator;
  phoneInput: Locator;
  orderConsultationButton: Locator;

  // Footer
  footer: Locator;

  constructor(page: Page) {
    super(page);

    this.logo = page.locator('[data-testid="logo"]');

    this.mainContainer = page.locator('[class^="Layouts_main__"]')
    this.announcementsLink = page.locator('a.Navbar_link__UhyJF[href="/products/"]');
    this.requestsLink = page.locator('a[href="/requests-map/"]');
    this.tendersLink = page.locator('a[href="/tenders-map/"]');
    this.createAnnouncementLink = page.locator('a[href="/create-unit/"]');

    this.loginButton = page.getByText('Вхід');
    this.avatarBlock = page.locator('[data-testid="avatarBlock"]');
    this.dropdownMenuContainer = page.locator('[class^="ProfileDropdownMenu_container__"]');
    this.dropdownProfileEmail = page.locator('[data-testid="email"]');
    this.tendersBtn = page.locator('[data-testid="tenders"]');
    this.profileBtn = page.locator('[data-testid="profile"]');
    this.logoutBtn = page.locator('[data-testid="logout"]');

    this.catalogButton = page.getByText('Каталог');

    this.topSearchInput = page.locator('header [data-testid="searchInput"]'); 
    this.bodySearchForm = page.locator('[data-testid="searchForm"]');
    this.bodySearchInput = this.bodySearchForm.locator('[data-testid="searchInput"]');

    this.telegramBotContainer = page.locator('[data-testid="completeTenderRectangle"]');
    this.goToTelegramButton = page.getByRole('button', { name: 'Перейти до Telegram-боту' });
    this.closeTelegramPopupButton = page.locator('[data-testid="crossButton"]');

    this.servicesTitle = page.getByRole('heading', { name: 'Послуги' });
    this.servicesPopularButton = page.locator('[data-testid="services__populyarni"]');
    this.servicesAgriculturalButton = page.locator('[data-testid="services__silskogospodarski"]');
    this.servicesConstructionButton = page.locator('[data-testid="services__budivelni"]');
    this.servicesOtherButton = page.locator('[data-testid="services__inshi"]');

    this.equipmentTitle = page.getByRole('heading', { name: 'Спецтехніка' });
    this.equipmentPopularButton = page.locator('[data-testid="specialEquipment__populyarna"]');
    this.equipmentAgriculturalButton = page.locator('[data-testid="specialEquipment__silskogospodarska"]');
    this.equipmentConstructionButton = page.locator('[data-testid="specialEquipment__budivelna"]');
    this.equipmentOtherButton = page.locator('[data-testid="specialEquipment__insha"]');

    this.contactTitle = page.getByRole('heading', { name: 'У Вас залишилися питання?' });
    this.nameInput = page.locator('input[name="name"]');
    this.phoneInput = page.locator('input#mobile');
    this.orderConsultationButton = page.getByRole('button', { name: 'Замовити консультацію' });

    this.footer = page.locator('[class*="Footer_container"]');
  }

  async navigateToHomePage(baseUrl: string) {
    await this.goto(baseUrl);
  }

  async clickLogo() {
    await this.click(this.logo);
  }

  async navigateToAnnouncements() {
    await this.click(this.announcementsLink);
  }

  async navigateToRequestsMap() {
    await this.click(this.requestsLink);
  }

  async navigateToTendersMap() {
    await this.click(this.tendersLink);
  }

  async navigateToCreateAnnouncement() {
    await this.click(this.createAnnouncementLink);
  }

  async clickLogin() {
    await this.click(this.loginButton);
  }

  async clickCatalog() {
    await this.click(this.catalogButton);
  }

  async searchInBody(searchText: string) {
    await this.bodySearchInput.fill(searchText);
    await this.bodySearchInput.press('Enter');
  }

  async searchInHeader(searchText: string) {
    await this.topSearchInput.fill(searchText);
    await this.topSearchInput.press('Enter');
  }

  async search(searchText: string, location: 'header' | 'body' = 'body') {
    const target = location === 'header' ? this.topSearchInput : this.bodySearchInput;
    await target.fill(searchText);
    await target.press('Enter');
  }

  async isTelegramBotPopupVisible() {
    return await this.telegramBotContainer.isVisible();
  }

  async closeTelegramBotPopup() {
    if (await this.isTelegramBotPopupVisible()) {
      await this.click(this.closeTelegramPopupButton);
    }
  }

  async goToTelegramBot() {
    await this.click(this.goToTelegramButton);
  }

  async selectServiceCategory(category: 'popular' | 'agricultural' | 'construction' | 'other') {
    const categoryMap = {
      popular: this.servicesPopularButton,
      agricultural: this.servicesAgriculturalButton,
      construction: this.servicesConstructionButton,
      other: this.servicesOtherButton,
    };
    await this.click(categoryMap[category]);
  }

  async selectEquipmentCategory(category: 'popular' | 'agricultural' | 'construction' | 'other') {
    const categoryMap = {
      popular: this.equipmentPopularButton,
      agricultural: this.equipmentAgriculturalButton,
      construction: this.equipmentConstructionButton,
      other: this.equipmentOtherButton,
    };
    await this.click(categoryMap[category]);
  }

  async requestConsultation(name: string, phone: string) {
    await this.nameInput.fill(name);
    await this.phoneInput.fill(phone);
    await this.click(this.orderConsultationButton);
  }

  async verifyHomePageLoaded() {
    await expect(this.announcementsLink).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.catalogButton).toBeVisible();
    await expect(this.servicesTitle).toBeVisible();
    await expect(this.equipmentTitle).toBeVisible();
    await expect(this.contactTitle).toBeVisible();
  }

  async clickAvatar() {
    await this.waitForElement(this.avatarBlock);
    await this.click(this.avatarBlock);
  }

  async goToTenders() {
    await this.click(this.avatarBlock);
    await this.click(this.tendersBtn);
  }

  async clickProfile() {
    await this.click(this.profileBtn);
  }

  async clickLogout() {
    await this.click(this.logoutBtn);
  }

}
