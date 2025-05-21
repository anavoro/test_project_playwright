import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { ServicesPage } from "../pages/servicesMapPage";
import { FootersPage } from "../pages/footersPage";
import { LoginPage } from "../pages/loginPage";
import { AdminPage } from "../pages/adminPage";
import testData from "../data/dataMainPage.json";
import * as dotenv from "dotenv";
dotenv.config();

let homePage: HomePage;
let servicesPage: ServicesPage;
let footersPage: FootersPage;
let loginPage: LoginPage;
let adminPage: AdminPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  servicesPage = new ServicesPage(page);
  footersPage = new FootersPage(page);
  loginPage = new LoginPage(page);
  adminPage = new AdminPage(page);
  await page.setViewportSize({ width: 1536, height: 864 });
  await homePage.goto("/");
  await page.waitForLoadState("networkidle");
  await homePage.verifyHomePageLoaded();
});

test.describe("Home Page Verification", () => {
  test("C530 verify searching on the main page", async ({ page }) => {
    await homePage.searchInBody("");
  });
});
