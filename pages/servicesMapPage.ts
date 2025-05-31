import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { HomePage } from "../pages/homePage";

export class ServicesPage extends BasePage {
  arrowButtonDropDownMenu: Locator;
  checkBoxLabel: Locator;
  cardWrapperFirst: Locator;
  cardWrappers: Locator;
  openedDropDownMenu: Locator;
  maindTraitsCategory: Locator;
  advertisementDescription: Locator;
  advertisementTitle: Locator;
  quantityOfAdvertisementsTitle: Locator;
  draglineCategoryOfAdvertisement: Locator;
  generalCategoryOfAdvertisement: Locator;
  constructionalEquipment: Locator;
  communalEquipment: Locator;
  storageEquipment: Locator;
  buttonZoomIn: Locator;
  buttonZoomOut: Locator;
  сlusters: Locator;
  largeClusters: Locator;
  mediumClusters: Locator;
  smallClusters: Locator;
  marksOfAdvertisementsOnMap: Locator;
  entireMap: Locator;
  titleUrl: Locator;
  categoryOfAdvertisement: Locator;

  constructor(page: Page) {
    super(page);
    this.openedDropDownMenu = page.locator(
      ".ServiceCategory_svgContainer__mPCMj.ServiceCategory_clicked__Jm6x8"
    );
    this.cardWrapperFirst = page.locator('[data-testid="link"]').first();
    this.cardWrappers = page.locator('[data-testid="link"]');
    this.arrowButtonDropDownMenu = page.locator(
      '[class*="ServiceCategory_svgContainer__mPCMj"]'
    );
    this.checkBoxLabel = page.locator('label[data-testid="serviceLabel"]');
    this.draglineCategoryOfAdvertisement = page.locator(
      '[class*="ResetFilters_selectedCategory___D1E6"]:has-text("Драглайни")'
    );
    this.generalCategoryOfAdvertisement = page.locator(
      '[class*="ResetFilters_selectedCategory___D1E6"]'
    );
    this.maindTraitsCategory = page.locator('[itemprop="category"]');
    this.advertisementDescription = page.locator(
      '[data-testid="unitDescriptionContainer"]'
    );
    this.advertisementTitle = page.locator('[class="UnitName_title__NqpQs"]');
    this.quantityOfAdvertisementsTitle = page
      .locator('[class="MapPagination_count__c_dzg"]')
      .first();
    this.constructionalEquipment = page.locator(
      '[data-testid="budivelna-tekhnika"]'
    );

    this.categoryOfAdvertisement = page.locator(
      '[class*="UnitCharacteristics_service__aTyk2"]'
    );
    this.communalEquipment = page.locator('[data-testid="komunalna-tekhnika"]');
    this.storageEquipment = page.locator('[data-testid="skladska-tekhnika"]');
    this.buttonZoomIn = page.locator('[href="#"]').first();
    this.buttonZoomOut = page.locator('[href="#"][title="Zoom out"]');
    this.сlusters = page.locator(
      '[class*="leaflet-marker-icon marker-cluster"]'
    );
    this.largeClusters = page.locator(
      '[class="leaflet-marker-icon marker-cluster marker-cluster-large leaflet-zoom-animated leaflet-interactive"]'
    );
    this.mediumClusters = page.locator(
      '[class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive"]'
    );
    this.smallClusters = page.locator(
      '[class="leaflet-marker-icon marker-cluster marker-cluster-small leaflet-zoom-animated leaflet-interactive"]'
    );
    this.marksOfAdvertisementsOnMap = page.locator(
      '[src="/images/marker.svg"]'
    );
    this.entireMap = page.locator(".leaflet-container");
    this.titleUrl = page.locator(".leaflet-tile");
  }

  async clickcardWrapperFirst() {
    await this.click(this.cardWrapperFirst);
  }

  async clickButtonZoomIn() {
    await this.click(this.buttonZoomIn);
  }

  async clickButtonZoomOut() {
    await this.click(this.buttonZoomOut);
  }

  async clickConstructionalArrowButtonDropDownMenu() {
    await this.click(this.arrowButtonDropDownMenu.nth(0));
  }

  async clickAgriculturalArrowButtonDropDownMenu() {
    await this.click(this.arrowButtonDropDownMenu.nth(2));
  }

  async verifyVisibilityOfLargeClusters() {
    const countLargeCluster = await this.largeClusters.count();
    let before;
    for (let i = 0; i < countLargeCluster; i++) {
      before = await this.titleUrl.first().getAttribute("src");
      await this.click(this.largeClusters.nth(i));
      await expect
        .poll(async () => {
          return await this.titleUrl.first().getAttribute("src");
        })
        .not.toBe(before);
      await this.marksOfAdvertisementsOnMap
        .first()
        .waitFor({ state: "visible" });
      await this.verifyExistenceOfMarks();
      await this.verifyExistenceOfClusters();
      await this.page.reload({ waitUntil: "networkidle" });
    }
  }

  async verifyExistenceOfMarks() {
    let countMarks = await this.marksOfAdvertisementsOnMap.count();
    for (let j = 0; j < countMarks; j++) {
      await expect(this.marksOfAdvertisementsOnMap.nth(j)).toBeEnabled();
    }
  }

  async verifyExistenceOfClusters() {
    await this.page.waitForTimeout(1000);
    let countClusters = await this.сlusters.count();
    for (let j = 0; j < countClusters; j++) {
      await expect(this.сlusters.nth(j)).toBeEnabled();
    }
  }

  async verifyPopularService(
    page: Page,
    homePage: HomePage,
    serviceClickFn: () => Promise<void>,
    expectedLabel: string
  ) {
    await serviceClickFn();
    await expect(page).toHaveURL(/\/products\//);
    await page.waitForTimeout(2200);
    const count = await this.openedDropDownMenu.count();
    if (count === 0) {
      await this.clickAgriculturalArrowButtonDropDownMenu();
    }
    expect(await this.isCheckboxCheckedByLabel(expectedLabel)).toBe(true);
    await this.clickcardWrapperFirst();

    await this.categoryOfAdvertisement.first().waitFor({ state: "visible" });
    const texts = await this.categoryOfAdvertisement.allTextContents();
    const found = texts.some((text) => text.includes(expectedLabel));
    expect(found).toBe(true);

    await homePage.clickLogo();
  }

  async verifyPopularEquipment(
    page: Page,
    homePage: HomePage,
    serviceClickFn: () => Promise<void>,
    category: string,
    expectedLabel: string[]
  ) {
    await serviceClickFn();
    await expect(page).toHaveURL(/\/products\//);
    await page.waitForTimeout(2200);
    await this.clickAgriculturalArrowButtonDropDownMenu();
    const currentEquipmentCategory = this.generalCategoryOfAdvertisement.filter(
      { hasText: category }
    );
    await expect(currentEquipmentCategory).toBeVisible();
    await this.clickcardWrapperFirst();
    await this.categoryOfAdvertisement.first().waitFor({ state: "visible" });
    const texts = await this.categoryOfAdvertisement.allTextContents();
    const containsExpected = texts.some((text) =>
      expectedLabel.some((expected) => text.includes(expected))
    );
    expect(containsExpected).toBe(true);
    await homePage.clickLogo();
  }

  async isCheckboxCheckedByLabel(labelText: string): Promise<boolean> {
    const label = this.checkBoxLabel.filter({ hasText: labelText }).first();
    const id = await label.getAttribute("for");
    if (!id)
      throw new Error(`No 'for' attribute found for label: ${labelText}`);
    const checkbox = this.page.locator(`input#${id}`);
    return checkbox.isChecked();
  }

  async verifyRelevantAdvertisement() {
    const count = await this.cardWrappers.count();
    for (let i = 0; i < count; i++) {
      let currentAd = this.cardWrappers.nth(i);
      await currentAd.scrollIntoViewIfNeeded();
      await expect(currentAd).toBeVisible();
    }
  }
}
