import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  // Logo element
  logo: Locator;

  // Navigation
  announcementsLink: Locator;
  requestsMapLink: Locator;
  tendersMapLink: Locator;
  createAnnouncementLink: Locator;

  // Authentication
  loginButton: Locator;

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

    this.announcementsLink = page.locator('a[href="/products/"]');
    this.requestsMapLink = page.locator('a[href="/requests-map/"]');
    this.tendersMapLink = page.locator('a[href="/tenders-map/"]');
    this.createAnnouncementLink = page.locator('a[href="/create-unit/"]');

    this.loginButton = page.locator('div.NavbarAuthBlock_buttonEnter__c9siH');
    this.catalogButton = page.locator('div.NavbarCatalog_label__s1meA');

    this.topSearchInput = page.locator('header [data-testid="searchInput"]'); 
    this.bodySearchForm = page.locator('[data-testid="searchForm"]');
    this.bodySearchInput = this.bodySearchForm.locator('[data-testid="searchInput"]');

    this.telegramBotContainer = page.locator('div.RequestsPopup_container__J8leY');
    this.goToTelegramButton = page.locator('button.ItemButtons_blueBtn__MwFcv.ItemButtons_fullWidth__3HqA0');
    this.closeTelegramPopupButton = page.locator('div.RequestsPopup_cross__bwnMj');

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

    this.footer = page.locator('div.Footer_container__5d2_x');
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
    await this.click(this.requestsMapLink);
  }

  async navigateToTendersMap() {
    await this.click(this.tendersMapLink);
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
}
