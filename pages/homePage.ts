import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import testData from "../data/dataMainPage.json";

export class HomePage extends BasePage {
  // Logo element
  logoHeader: Locator;
  logoFooter: Locator;

  // Navigation
  announcementsLink: Locator;
  requestsLink: Locator;
  tendersLink: Locator;
  createAnnouncementLink: Locator;
  mapButton: Locator;

  // Authentication
  loginButton: Locator;

  // Catalog
  catalogButton: Locator;
  firstDropDownMenuCatalog: Locator;
  secondDropDownMenuCatalog: Locator;
  thirdDropDownMenuCatalog: Locator;

  // Search
  topSearchInput: Locator;
  dropDownSearchForm: Locator;
  bodySearchForm: Locator;
  buttonCrossTop: Locator;
  bodySearchInput: Locator;
  historyOfSearching: Locator;
  servicesOfSearching: Locator;
  sowingOfServicesSearching: Locator;
  sprayingOfServicesSearching: Locator;
  fertilizerOfServicesSearching: Locator;
  categoryOfSearching: Locator;
  truckСrane25СategoryOfSearching: Locator;
  truckСrane40СategoryOfSearching: Locator;
  towerСraneСategoryOfSearching: Locator;
  draglineСategoryOfSearching: Locator;
  asphaltingServicesOfSearching: Locator;
  cardContainer: Locator;

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

  //Selections of popular services
  servicePopularComplexOfWork: Locator;
  servicePopularLoadingAndUnloading: Locator;
  servicePopularRoadWorks: Locator;
  servicePopularAsphalting: Locator;
  servicePopularPlowWork: Locator;
  servicePopularTransportationOfMaterials: Locator;
  servicePopularHoistWork: Locator;

  // Equipment section
  equipmentTitle: Locator;
  equipmentPopularButton: Locator;
  equipmentAgriculturalButton: Locator;
  equipmentConstructionButton: Locator;
  equipmentOtherButton: Locator;

  // Selections of popular equipments
  equipmentPopularSeeder: Locator;
  equipmentPopularTractor: Locator;
  equipmentPopularSprayer: Locator;
  equipmentPopularExcavator: Locator;
  equipmentPopularForklift: Locator;
  equipmentPopularHoist: Locator;
  equipmentPopularUtilityVehicles: Locator;

  // Contact section
  contactSection: Locator;
  contactTitle: Locator;
  nameInput: Locator;
  phoneInput: Locator;
  orderConsultationButton: Locator;
  emptyNameFieldError: Locator;
  emptyPhoneFieldError: Locator;
  emptyFieldPhoneErrorIncorrectData: Locator;
  formForNameInputAndError: Locator;
  formForPhoneInputAndError: Locator;

  // Footer
  footer: Locator;
  aboutUs: Locator;
  privacyPolicy: Locator;
  rulesOfUsingFilesOfCookies: Locator;
  termsOfAccessAndUsing: Locator;
  forUsers: Locator;
  advertisement: Locator;
  tenders: Locator;
  copyright: Locator;
  contacts: Locator;
  emailOfCompany: Locator;

  constructor(page: Page) {
    super(page);

    this.logoHeader = page.locator('[data-testid="logo"]').first();
    this.logoFooter = page.locator('[data-testid="logo"]').nth(1);

    this.announcementsLink = page.locator(
      'a.Navbar_link__UhyJF[href="/products/"]'
    );
    this.requestsLink = page.locator('a[href="/requests-map/"]');
    this.tendersLink = page.locator('a[href="/tenders-map/"]');
    this.createAnnouncementLink = page.locator('a[href="/create-unit/"]');
    this.mapButton = page.locator('[data-testid="mapButton"]');

    this.loginButton = page.getByText("Вхід");
    this.catalogButton = page.getByText("Каталог");
    this.firstDropDownMenuCatalog = page.locator(
      '[class="Catalog_parents__ThIGP"]'
    );
    this.secondDropDownMenuCatalog = page.locator(
      '[class="Catalog_list__sVdCj"]'
    );
    this.thirdDropDownMenuCatalog = page.locator(
      '[class="Catalog_list__sVdCj Catalog_listSecond__awZH7"]'
    );

    this.topSearchInput = page.locator('header [data-testid="searchInput"]');
    this.buttonCrossTop = page.locator('[data-testid="searchClear"]');
    this.dropDownSearchForm = page.locator('[data-testid="searchDropdown"]');
    this.bodySearchForm = page.locator('[data-testid="searchForm"]');
    this.bodySearchInput = this.bodySearchForm.locator(
      '[data-testid="searchInput"]'
    );
    this.historyOfSearching = page.locator(
      '[class*="LeftsideSearch_title__FkeCp"]:has-text("Історія пошуку")'
    );
    this.servicesOfSearching = page.locator(
      '[class*="LeftsideSearch_title__FkeCp"]:has-text("Послуги")'
    );
    this.sowingOfServicesSearching = page.locator(
      '[data-testid="resultItem"]:has-text("Посів технічних та зернових культур")'
    );
    this.sprayingOfServicesSearching = page.locator(
      '[data-testid="resultItem"]:has-text("Обприскування")'
    );
    this.fertilizerOfServicesSearching = page.locator(
      '[data-testid="resultItem"]:has-text("Внесення добрив")'
    );
    this.categoryOfSearching = page.locator(
      '[class*="LeftsideSearch_title__FkeCp"]:has-text("Категорії")'
    );
    this.truckСrane25СategoryOfSearching = page.locator(
      '[data-testid="resultItem"]:has-text("автокрани ДО 25 ТОНН")'
    );
    this.truckСrane40СategoryOfSearching = page.locator(
      '[data-testid="resultItem"]:has-text("автокрани ДО 40 ТОНН")'
    );
    this.towerСraneСategoryOfSearching = page.locator(
      '[data-testid="resultItem"]:has-text("баштові крани")'
    );
    this.draglineСategoryOfSearching = page.locator(
      '[data-testid="resultItem"]:has-text("Драглайни")'
    );
    this.asphaltingServicesOfSearching = page.locator(
      '[data-testid="resultItem"]:has-text("Асфальтування")'
    );
    this.cardContainer = page.locator('[data-testid="cardContainer"]');

    this.telegramBotContainer = page.locator(
      '[data-testid="completeTenderRectangle"]'
    );
    this.goToTelegramButton = page.getByRole("button", {
      name: "Перейти до Telegram-боту",
    });
    this.closeTelegramPopupButton = page.locator('[data-testid="crossButton"]');

    this.servicesTitle = page.getByRole("heading", { name: "Послуги" });
    this.servicesPopularButton = page.locator(
      '[data-testid="services__populyarni"]'
    );
    this.servicesAgriculturalButton = page.locator(
      '[data-testid="services__silskogospodarski"]'
    );
    this.servicesConstructionButton = page.locator(
      '[data-testid="services__budivelni"]'
    );
    this.servicesOtherButton = page.locator('[data-testid="services__inshi"]');

    this.servicePopularComplexOfWork = page.locator(
      '[data-testid="service__kompleks-robit"]'
    );
    this.servicePopularLoadingAndUnloading = page.locator(
      '[data-testid="service__navantazhennya-ta-rozvantazhennya"]'
    );
    this.servicePopularRoadWorks = page.locator(
      '[data-testid="service__dorozhni-roboti"]'
    );
    this.servicePopularPlowWork = page.locator(
      '[data-testid="service__orannya-zemli"]'
    );
    this.servicePopularTransportationOfMaterials = page.locator(
      '[data-testid="service__perevezennya-materialiv"]'
    );
    this.servicePopularHoistWork = page.locator(
      '[data-testid="service__pidiomni-roboti"]'
    );
    this.servicePopularAsphalting = page.locator(
      '[data-testid="service__asfaltuvannya"]'
    );

    this.equipmentTitle = page.getByRole("heading", { name: "Спецтехніка" });
    this.equipmentPopularButton = page.locator(
      '[data-testid="specialEquipment__populyarna"]'
    );
    this.equipmentAgriculturalButton = page.locator(
      '[data-testid="specialEquipment__silskogospodarska"]'
    );
    this.equipmentConstructionButton = page.locator(
      '[data-testid="specialEquipment__budivelna"]'
    );
    this.equipmentOtherButton = page.locator(
      '[data-testid="specialEquipment__insha"]'
    );

    this.equipmentPopularSeeder = page.locator(
      '[data-testid="category__sivalki"]'
    );
    this.equipmentPopularTractor = page.locator(
      '[data-testid="category__traktori"]'
    );
    this.equipmentPopularSprayer = page.locator(
      '[data-testid="category__obpriskuvachi"]'
    );
    this.equipmentPopularExcavator = page.locator(
      '[data-testid="category__ekskavatori"]'
    );
    this.equipmentPopularForklift = page.locator(
      '[data-testid="category__navantazhuvachi"]'
    );
    this.equipmentPopularHoist = page.locator(
      '[data-testid="category__pidiomniki"]'
    );
    this.equipmentPopularUtilityVehicles = page.locator(
      '[data-testid="category__komunalni-mashini"]'
    );

    this.contactSection = page.locator(
      '[class*="Layouts_consultation__JUU1R"]'
    );
    this.formForNameInputAndError = page.locator(
      '[class*="ConsultationForm_name__3bVcz"]'
    );
    this.formForPhoneInputAndError = page.locator(
      '[class*="ConsultationForm_phone__vEOS9"]'
    );
    this.contactTitle = this.contactSection.getByRole("heading", {
      name: "У Вас залишилися питання?",
    });
    this.nameInput = this.contactSection.locator('input[name="name"]');
    this.phoneInput = this.contactSection.locator("input#mobile");
    this.orderConsultationButton = this.contactSection.getByRole("button", {
      name: "Замовити консультацію",
    });
    this.emptyNameFieldError = this.formForNameInputAndError.locator(
      '[class*="ConsultationForm_error_message__jleeD"]:has-text("Поле не може бути порожнім")'
    );
    this.emptyPhoneFieldError = this.formForPhoneInputAndError.locator(
      '[class*="ConsultationForm_error_message__jleeD"]:has-text("Поле не може бути порожнім")'
    );
    this.emptyFieldPhoneErrorIncorrectData = page.locator(
      '[class*="ConsultationForm_error_message__jleeD"]:has-text("Телефон не пройшов валідацію")'
    );

    this.footer = page.locator('[class*="Footer_footer__Dhw_9"]');
    this.aboutUs = this.footer.locator('[data-testid="content"]');
    this.privacyPolicy = this.footer.locator('a[href="/privacy-policy/"]');
    this.rulesOfUsingFilesOfCookies = this.footer.locator(
      'a[href="/cookie-policy/"]'
    );
    this.termsOfAccessAndUsing = this.footer.locator(
      'a[href="/terms-conditions/"]'
    );
    this.forUsers = this.footer.locator(
      '[class*="RentzilaForBuyers_title__k3tHn"]'
    );
    this.advertisement = this.footer.locator('a[href="/products/"]');
    this.tenders = this.footer.locator('a[href="/tenders-map/"]');
    this.copyright = this.footer.locator('[data-testid="copyright"]');
    this.contacts = this.footer.locator(
      '[class*="RentzilaContacts_title__SxcO7"]'
    );
    this.emailOfCompany = this.footer.locator(
      'a[href="mailto:info@rentzila.com.ua"]'
    );
  }

  async navigateToHomePage(baseUrl: string) {
    await this.goto(baseUrl);
  }

  async clickLogo() {
    await this.click(this.logoHeader);
  }

  async clickMapButton() {
    await this.click(this.mapButton);
  }

  async clickButtonCrossTop() {
    await this.click(this.buttonCrossTop.nth(0));
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

  async clickAsphaltingServicesOfSearching() {
    await this.click(this.asphaltingServicesOfSearching.nth(1));
  }

  async navigateToCreateAnnouncement() {
    await this.click(this.createAnnouncementLink);
  }

  async clickLogin() {
    await this.click(this.loginButton);
  }

  async clickDraglineСategoryOfSearching() {
    await this.click(this.draglineСategoryOfSearching.nth(1));
  }

  async clickEmailOfCompany() {
    await this.click(this.emailOfCompany);
  }

  async clickTenders() {
    await this.click(this.tenders);
  }

  async clickAdvertisement() {
    await this.click(this.advertisement);
  }

  async clickTermsOfAccessAndUsing() {
    await this.click(this.termsOfAccessAndUsing);
  }

  async clickRulesOfUsingFilesOfCookies() {
    await this.click(this.rulesOfUsingFilesOfCookies);
  }

  async clickPrivacyPolicy() {
    await this.click(this.privacyPolicy);
  }

  async clickCatalog() {
    await this.click(this.catalogButton);
  }

  async hoverToElementFromFirstCatalogDropDownMenu(name: string) {
    await this.page
      .locator('[class*="Catalog_parent__k_4MP"]', { hasText: name })
      .getByText(name, { exact: true })
      .hover();
  }

  async hoverToElementFromOthersCatalogDropDownMenu(name: string) {
    await this.page
      .locator('[class*="CatalogItem_item__xvBwY"]', { hasText: name })
      .getByText(name, { exact: true })
      .hover();
  }

  async verifyWhetherFirstDropDownMenuisVisible(arrayOfNames: string[]) {
    await expect(this.firstDropDownMenuCatalog).toBeVisible();
    for (let i = 0; i < arrayOfNames.length; i++) {
      await expect(
        this.page
          .locator('[class*="Catalog_parent__k_4MP"]', {
            hasText: arrayOfNames[i],
          })
          .getByText(arrayOfNames[i], { exact: true })
      ).toBeVisible();
    }
  }

  async verifyWhetherSecondDropDownMenuisVisible(arrayOfNames: string[]) {
    await expect(this.secondDropDownMenuCatalog).toBeVisible();
    for (let i = 0; i < arrayOfNames.length; i++) {
      await expect(
        this.page
          .locator('[class*="CatalogItem_item__xvBwY"]', {
            hasText: arrayOfNames[i],
          })
          .getByText(arrayOfNames[i], { exact: true })
      ).toBeVisible();
    }
  }

  async clickOnCertainElementAtDropDownCategoryMenu(
    numberOfMenu: Locator,
    textOfElement: string
  ) {
    await numberOfMenu
      .locator('[class*="CatalogItem_item__xvBwY"]', { hasText: textOfElement })
      .getByText(textOfElement, { exact: true })
      .click();
  }

  async clickServicePopularComplexOfWork() {
    await this.click(this.servicePopularComplexOfWork);
  }

  async clickServicePopularLoadingAndUnloading() {
    await this.click(this.servicePopularLoadingAndUnloading);
  }

  async clickServicePopularRoadWorks() {
    await this.click(this.servicePopularRoadWorks);
  }

  async clickServicePopularPlowWork() {
    await this.click(this.servicePopularPlowWork);
  }

  async clickServicePopularTransportationOfMaterials() {
    await this.click(this.servicePopularTransportationOfMaterials);
  }

  async clickServicePopularHoistWork() {
    await this.click(this.servicePopularHoistWork);
  }

  async clickServicePopularAsphalting() {
    await this.click(this.servicePopularAsphalting);
  }

  async clickEquipmentPopularHoist() {
    await this.click(this.equipmentPopularHoist);
  }

  async clickEquipmentPopularForklift() {
    await this.click(this.equipmentPopularForklift);
  }

  async clickEquipmentPopularExcavator() {
    await this.click(this.equipmentPopularExcavator);
  }

  async clickEquipmentPopularSeeder() {
    await this.click(this.equipmentPopularSeeder);
  }

  async clickEquipmentPopularSprayer() {
    await this.click(this.equipmentPopularSprayer);
  }

  async clickEquipmentPopularTractor() {
    await this.click(this.equipmentPopularTractor);
  }

  async clickEquipmentPopularUtilityVehicles() {
    await this.click(this.equipmentPopularUtilityVehicles);
  }

  async clickPhoneInput() {
    await this.click(this.phoneInput);
  }

  async clickFirstCardContainer() {
    await this.cardContainer.first().click();
  }

  async searchInBody(searchText: string) {
    await this.bodySearchInput.fill(searchText);
    await this.bodySearchInput.press("Enter");
  }

  async verifyThatSearchFormHaveAdvertisements(searchText: string) {
    await this.page.waitForTimeout(1000);
    const count = await this.cardContainer.count();
    console.log(count);
    for (let i = 0; i < count; i++) {
      await expect(this.cardContainer.nth(i)).toContainText(searchText, {
        ignoreCase: true,
      });
    }
  }

  async updateSearchHistoryArray(array: string[], newValue: string) {
    if (array.length > 2) {
      array.shift();
    }
    array.push(newValue);
    console.log(array);
    return array;
  }

  async clickTopSearchInput() {
    await this.topSearchInput.click();
  }

  async fillTopSearchInput(searchText: string) {
    await this.topSearchInput.fill(searchText);
  }

  async pressEnterTopSearchInput() {
    await this.topSearchInput.press("Enter");
  }

  async verifyUpdatedHistoryOfSearching(searchedText: string[]) {
    for (let i = 0; i < searchedText.length; i++) {
      expect(
        this.page
          .locator(`[data-testid="resultItem"]:has-text("${searchedText[i]}")`)
          .first()
      ).toBeVisible();
    }
  }

  async search(searchText: string, location: "header" | "body" = "body") {
    const target =
      location === "header" ? this.topSearchInput : this.bodySearchInput;
    await target.fill(searchText);
    await target.press("Enter");
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

  async selectServiceCategory(
    category: "popular" | "agricultural" | "construction" | "other"
  ) {
    const categoryMap = {
      popular: this.servicesPopularButton,
      agricultural: this.servicesAgriculturalButton,
      construction: this.servicesConstructionButton,
      other: this.servicesOtherButton,
    };
    await this.click(categoryMap[category]);
  }

  async selectEquipmentCategory(
    category: "popular" | "agricultural" | "construction" | "other"
  ) {
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
