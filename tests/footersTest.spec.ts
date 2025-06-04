import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { FootersPage } from "../pages/footersPage";
import { AdminPage } from "../pages/adminPage";
import testData from "../data/dataMainPage.json";
import * as dotenv from "dotenv";
dotenv.config();

let homePage: HomePage;
let footersPage: FootersPage;
let adminPage: AdminPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  footersPage = new FootersPage(page);
  adminPage = new AdminPage(page);
  await page.setViewportSize({ width: 1536, height: 864 });
  await homePage.goto("/");
  await page.waitForLoadState("networkidle");
  await homePage.verifyHomePageLoaded();
});

test.describe("Footer Verification", () => {
  test("C214 verify the footer", async ({ page }) => {
    await homePage.footer.scrollIntoViewIfNeeded();
    await homePage.closeTelegramBotPopup();
    await expect(homePage.footer).toBeVisible();
    await expect(homePage.aboutUs).toBeVisible();
    await expect(homePage.privacyPolicy).toBeVisible();
    await expect(homePage.rulesOfUsingFilesOfCookies).toBeVisible();
    await expect(homePage.termsOfAccessAndUsing).toBeVisible();
    await expect(homePage.forUsers).toBeVisible();
    await expect(homePage.advertisement).toBeVisible();
    await expect(homePage.tenders).toBeVisible();
    await expect(homePage.copyright).toBeVisible();
    await expect(homePage.contacts).toBeVisible();
    await expect(homePage.emailOfCompany).toBeVisible();
    await expect(homePage.logoFooter).toBeVisible();
    
    await homePage.footer.scrollIntoViewIfNeeded();
    await homePage.clickPrivacyPolicy();
    await expect(page).toHaveURL(testData.excerptOfUrl.privacyPolicy);
    await expect(footersPage.privacyPolicyTitle).toBeVisible();

    await homePage.footer.scrollIntoViewIfNeeded();
    await homePage.clickRulesOfUsingFilesOfCookies();
    await expect(page).toHaveURL(testData.excerptOfUrl.cookie);
    await expect(footersPage.rulesOfUsingFilesOfCookiesTitle).toBeVisible();

    await homePage.footer.scrollIntoViewIfNeeded();
    await homePage.clickTermsOfAccessAndUsing();
    await expect(page).toHaveURL(testData.excerptOfUrl.termsConditions);
    await expect(footersPage.termsOfAccessAndUsingTitle).toBeVisible();

    await homePage.footer.scrollIntoViewIfNeeded();
    await homePage.clickAdvertisement();
    await expect(page).toHaveURL(testData.excerptOfUrl.products);
    await expect(footersPage.searchInputAdvertisement).toBeVisible();

    await homePage.clickLogo();
    await homePage.footer.scrollIntoViewIfNeeded();
    await homePage.clickTenders();
    await expect(page).toHaveURL(testData.excerptOfUrl.tendersMap);
    await expect(footersPage.searchInputTenders).toBeVisible(); 
  });

  test("C226 verify the footer 'do you have questions'", async ({ page }) => {
    await homePage.footer.scrollIntoViewIfNeeded();
    await homePage.closeTelegramBotPopup();
    await expect(homePage.contactSection).toBeVisible();
    await homePage.requestConsultation("", "");
    await homePage.phoneInput.clear();
    await expect(homePage.emptyNameFieldError).toBeVisible();
    await expect(homePage.emptyPhoneFieldError).toBeVisible();

    await homePage.requestConsultation(testData.adviceData.name, "");
    await homePage.phoneInput.clear();
    await expect(homePage.emptyNameFieldError).not.toBeVisible();
    await expect(homePage.emptyPhoneFieldError).toBeVisible();

    await homePage.requestConsultation(testData.adviceData.name, "");
    await expect(homePage.phoneInput).toHaveValue("+380");

    await homePage.requestConsultation("", process.env.USER_MOBILE!);
    await homePage.nameInput.clear();
    await expect(homePage.emptyNameFieldError).toBeVisible();
    await expect(homePage.emptyPhoneFieldError).not.toBeVisible();

    await homePage.requestConsultation(
      testData.adviceData.name,
      testData.adviceData.incorrectPhone
    );
    await expect(homePage.emptyNameFieldError).not.toBeVisible();
    await expect(homePage.emptyFieldPhoneErrorIncorrectData).toBeVisible();

    await homePage.requestConsultation(
      testData.adviceData.name,
      process.env.USER_MOBILE!
    );
    page.once("dialog", async (dialog) => {
      await dialog.accept();
    });
    await adminPage.navigateToUsers("/admin/");
    await adminPage.login(
      process.env.ADMIN_EMAIL!,
      process.env.ADMIN_PASSWORD!
    );
    await page.waitForLoadState("networkidle");
    await adminPage.clickButtonSupport();
  });
});
