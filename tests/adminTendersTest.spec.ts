import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { AdminPage } from "../pages/adminPage";
import * as dotenv from "dotenv";
import { equal } from "assert";
dotenv.config();

let homePage: HomePage;
let adminPage: AdminPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  adminPage = new AdminPage(page);
  await page.setViewportSize({ width: 1536, height: 864 });
  await homePage.goto("/admin/");
  await adminPage.login(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
  await adminPage.verifyWhetherAdminPageIsLoaded();
  await adminPage.clickButtonMainPage();
  await page.waitForLoadState("networkidle");
});

test.describe("Admin Tenders Verification", () => {
  test("C502 The tenders menu section functionality", async ({ page }) => {
    await homePage.clickIconSuperUser();
    expect(page.url()).toBe("https://dev.rentzila.com.ua/admin/");
    await adminPage.verifyWhetherAdminPageIsLoaded();
    await expect(adminPage.buttonTenders).toBeEnabled();
    await adminPage.clickButtonTenders();
    await expect(adminPage.tenderTitle).toBeVisible();
    expect(page.url()).toBe("https://dev.rentzila.com.ua/admin/tenders/");
  });

  test('C506 The "Перегляд тендера" button functionality', async ({ page }) => {
    await homePage.clickIconSuperUser();
    await adminPage.verifyWhetherAdminPageIsLoaded();
    await adminPage.clickButtonTenders();
    await adminPage.clickAdminEyeButton();
    await adminPage.verifyWhetherTendersPageContainsElements();
    await adminPage.clickButtonClose();
    await expect(adminPage.tenderTitle).toBeVisible();
    expect(page.url()).toBe("https://dev.rentzila.com.ua/admin/tenders/");
  });

  test('C507 The "Редагування тендера" button functionality', async ({
    page,
  }) => {
    await homePage.clickIconSuperUser();
    await adminPage.verifyWhetherAdminPageIsLoaded();
    await adminPage.clickButtonTenders();
    await adminPage.clickButtonEditTender();
    await expect(adminPage.titleOfEditTenderPage).toBeVisible();
    await expect(page).toHaveURL(
      /https:\/\/dev\.rentzila\.com\.ua\/admin\/tenders\/edit\//
    );
    await page.waitForTimeout(2200);
    const basicValueOfTenderName =
      await adminPage.inputEditTenderName.inputValue();
    await adminPage.addValueToTenderName();
    const expectedValue = basicValueOfTenderName + "test";
    await expect(adminPage.inputEditTenderName).toHaveValue(expectedValue);
    await adminPage.formToUploadFileEditTender.setInputFiles("Untitled.png");
    if (await adminPage.buttonAlertAboutTheSameFile.isVisible()) {
      await adminPage.clickButtonAlertAboutTheSameFile();
    }
    await expect(adminPage.formUploadedFile).toBeVisible();
    await adminPage.clickButtonCloseEditPage();
    await adminPage.tenderTitle.waitFor({ state: "visible", timeout: 5000 });
    expect(page.url()).toBe("https://dev.rentzila.com.ua/admin/tenders/");
    await expect(
      adminPage.formOfTenderOnTenderPageForEdit.first()
    ).toContainText(expectedValue);
    await adminPage.clickButtonReviewEditChanges();
    await adminPage.clickButtonApproveReviewEditChanges();
  });

  test('C508 The "Видалення тендера" button functionality', async ({
    page,
  }) => {
    await homePage.clickIconSuperUser();
    await adminPage.verifyWhetherAdminPageIsLoaded();
    await adminPage.clickButtonTenders();
    const primalValueOfTenderName = await adminPage.tenderId.textContent();
    await adminPage.clickButtonDeleteTender();
    await expect(adminPage.formDeleteTender).toBeVisible();
    await adminPage.clickButtonCancelDeleteTender();
    await expect(adminPage.tenderTitle).toBeVisible();
    expect(page.url()).toBe("https://dev.rentzila.com.ua/admin/tenders/");
    await expect(adminPage.formDeleteTender).toBeHidden();

    await adminPage.clickButtonDeleteTender();
    await expect(adminPage.formDeleteTender).toBeVisible();
    await adminPage.clickButtonApproveDeleteTender();
    await expect(adminPage.formDeleteTender).toBeHidden();
    await page.waitForTimeout(2200);
    await expect(adminPage.tenderId).not.toHaveText(
      primalValueOfTenderName ?? ""
    );
    const currentValueOfTenderName = await adminPage.tenderId.textContent();
    expect(primalValueOfTenderName).not.toEqual(currentValueOfTenderName);
  });

  test("C510 The number of tenders on the page functionality", async () => {
    await homePage.clickIconSuperUser();
    await adminPage.verifyWhetherAdminPageIsLoaded();
    await adminPage.clickButtonTenders();
    await adminPage.verifyQuantityOfTendersOnPage(10);
    await adminPage.buttonExtendQuantityOfTendersOnPage.scrollIntoViewIfNeeded();
    await adminPage.clickButtonExtendQuantityOfTendersOnPage();
    await adminPage.clickButtonExtendQuantityOfTendersOnPageTo20();
    await adminPage.verifyQuantityOfTendersOnPage(20);
    await adminPage.buttonExtendQuantityOfTendersOnPage.scrollIntoViewIfNeeded();
    await adminPage.clickButtonExtendQuantityOfTendersOnPage();
    await adminPage.clickButtonExtendQuantityOfTendersOnPageTo50();
    await adminPage.verifyQuantityOfTendersOnPage(50);
    await adminPage.buttonExtendQuantityOfTendersOnPage.scrollIntoViewIfNeeded();
    await adminPage.clickButtonExtendQuantityOfTendersOnPage();
    await adminPage.clickButtonExtendQuantityOfTendersOnPageTo10();
    await adminPage.verifyQuantityOfTendersOnPage(10);
  });
});
