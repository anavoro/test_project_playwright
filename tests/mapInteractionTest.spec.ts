import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { ServicesPage } from "../pages/servicesMapPage";

let homePage: HomePage;
let servicesPage: ServicesPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  servicesPage = new ServicesPage(page);
  await page.setViewportSize({ width: 1536, height: 864 });
  await homePage.goto("/");
  await page.waitForLoadState("networkidle");
  await homePage.verifyHomePageLoaded();
  await homePage.clickMapButton();
  await page.waitForTimeout(2000);
});

test.describe("Product Page Verification Of Map", () => {
  test("C517 verify map, select a cluster of units", async ({}) => {
    await servicesPage.verifyVisibilityOfLargeClusters();
  });

  test("C516 verify map, drag and drop", async ({ page }) => {
    const before = await servicesPage.titleUrl.first().getAttribute("src");
    await page.mouse.move(400, 300);
    await page.mouse.down();
    await page.mouse.move(-800, -800);
    await page.mouse.up();
    await expect
      .poll(async () => {
        return await servicesPage.titleUrl.first().getAttribute("src");
      })
      .not.toBe(before);
    await servicesPage.сlusters
      .first()
      .waitFor({ state: "visible", timeout: 10000 });
    await servicesPage.verifyExistenceOfMarks();
    await servicesPage.verifyExistenceOfClusters();
  });

  test("C501 verify map zooming", async ({ page }) => {
    let before = await servicesPage.titleUrl.first().getAttribute("src");
    let mark;
    await servicesPage.clickButtonZoomIn();
    await expect
      .poll(async () => {
        return await servicesPage.titleUrl.first().getAttribute("src");
      })
      .not.toBe(before);
    await servicesPage.marksOfAdvertisementsOnMap
      .first()
      .waitFor({ state: "visible", timeout: 10000 });
    mark = servicesPage.marksOfAdvertisementsOnMap.first();
    await servicesPage.verifyExistenceOfMarks();
    await servicesPage.verifyExistenceOfClusters();
    before = await servicesPage.titleUrl.first().getAttribute("src");
    await servicesPage.clickButtonZoomOut();
    await expect
      .poll(async () => {
        return await servicesPage.titleUrl.first().getAttribute("src");
      })
      .not.toBe(before);
    await mark.waitFor({ state: "hidden", timeout: 10000 });
    await servicesPage.verifyExistenceOfMarks();
    await servicesPage.verifyExistenceOfClusters();

    before = await servicesPage.titleUrl.first().getAttribute("src");
    await page.mouse.wheel(0, -100);
    await expect
      .poll(async () => {
        return await servicesPage.titleUrl.first().getAttribute("src");
      })
      .not.toBe(before);
    await servicesPage.marksOfAdvertisementsOnMap
      .first()
      .waitFor({ state: "visible", timeout: 10000 });
    mark = servicesPage.marksOfAdvertisementsOnMap.first();
    await servicesPage.verifyExistenceOfMarks();
    await servicesPage.verifyExistenceOfClusters();
    before = await servicesPage.titleUrl.first().getAttribute("src");
    await page.mouse.wheel(0, 100);
    await expect
      .poll(async () => {
        return await servicesPage.titleUrl.first().getAttribute("src");
      })
      .not.toBe(before);
    await mark.waitFor({ state: "hidden", timeout: 10000 });
    await servicesPage.verifyExistenceOfMarks();
    await servicesPage.verifyExistenceOfClusters();
  });
});
