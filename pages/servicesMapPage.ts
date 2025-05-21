import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { HomePage } from "../pages/homePage";

export class ServicesPage extends BasePage {
  arrowButtonDropDownMenu: Locator;
  cardWrapper: Locator;
  openedDropDownMenu: Locator;

  //ad
  categoryOfAdvertisement: Locator;

  constructor(page: Page) {
    super(page);
    this.openedDropDownMenu = page.locator('.ServiceCategory_svgContainer__mPCMj.ServiceCategory_clicked__Jm6x8');
    this.cardWrapper = page.locator('[data-testid="cardWrapper"]').first();
    this.arrowButtonDropDownMenu = page
      .locator('[class*="ServiceCategory_svgContainer__mPCMj"]')
      .nth(2);
    this.categoryOfAdvertisement = page.locator(
      '[class*="UnitCharacteristics_service__aTyk2"]'
    );
  }

  async clickCardWrapper() {
    await this.click(this.cardWrapper);
  }

  async clickArrowButtonDropDownMenu() {
    await this.click(this.arrowButtonDropDownMenu);
  }

  async verifyPopularService(
    page: Page,
    homePage: HomePage,
    servicesPage: ServicesPage,
    serviceClickFn: () => Promise<void>,
    expectedLabel: string
  ) {
    await serviceClickFn();
    await expect(page).toHaveURL(/\/products\//);
    await page.waitForTimeout(1000);
    //need to remove
    const count = await this.openedDropDownMenu.count();
    if (count === 0) {
      await servicesPage.clickArrowButtonDropDownMenu();
    }
    expect(await this.isCheckboxCheckedByLabel(expectedLabel)).toBe(true);
    await servicesPage.clickCardWrapper();

    await this.categoryOfAdvertisement.first().waitFor({ state: "visible" });
    const texts = await this.categoryOfAdvertisement.allTextContents();
    const found = texts.some((text) => text.includes(expectedLabel));
    expect(found).toBe(true);

    await homePage.clickLogo();
  }

  async verifyPopularEquipment(
    page: Page,
    homePage: HomePage,
    servicesPage: ServicesPage,
    serviceClickFn: () => Promise<void>,
    category: string,
    expectedLabel: string[]
  ) {
    await serviceClickFn();
    await expect(page).toHaveURL(/\/products\//);
    //need to remove
    await page.waitForTimeout(1000);
    await servicesPage.clickArrowButtonDropDownMenu();
    await page
      .locator(
        `[class*="ResetFilters_selectedCategory___D1E6"]:has-text("${category}")`
      )
      .isEnabled();
    await servicesPage.clickCardWrapper();
    await this.categoryOfAdvertisement.first().waitFor({ state: "visible" });
    const texts = await this.categoryOfAdvertisement.allTextContents();
    console.log("Texts:", texts);
    console.log("expectedLabel:", expectedLabel);
    const containsExpected = texts.some((text) =>
      expectedLabel.some((expected) => text.includes(expected))
    );
    expect(containsExpected).toBe(true);
    await homePage.clickLogo();
  }

  async isCheckboxCheckedByLabel(labelText: string): Promise<boolean> {
    const label = this.page
      .locator(`label[data-testid="serviceLabel"]:has-text("${labelText}")`)
      .first();
    const id = await label.getAttribute("for");
    if (!id)
      throw new Error(`No 'for' attribute found for label: ${labelText}`);
    const checkbox = this.page.locator(`input#${id}`);
    return checkbox.isChecked();
  }
}
