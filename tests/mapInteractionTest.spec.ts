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
});

test.describe("Home Page Verification", () => {
  test("C517 verify map, select a cluster of units", async ({ page }) => {
    await homePage.clickMapButton();
    await page.waitForTimeout(1450);
    await servicesPage.verifyVisibilityOfLargeClusters();
  });

  test("C516 verify map, drag and drop", async ({ page }) => {
    await homePage.clickMapButton();
    await page.waitForTimeout(1450);
    const before = await servicesPage.titleUrl.first().getAttribute("src");
    await page.mouse.move(400, 300);
    await page.mouse.down();
    await page.mouse.move(100, 10000);
    await page.mouse.up();
    await page.waitForTimeout(1000);
    const after = await servicesPage.titleUrl.first().getAttribute("src");
    console.log("Before:", before);
    console.log("After:", after);
    await servicesPage.verifyExistenceOfClusters();
    expect(before).not.toBe(after);
  });

  test("C501 verify map zooming", async ({ page }) => {
    await homePage.clickMapButton();
    await page.waitForLoadState("networkidle");
    const initialZoom = await servicesPage.getZoomScale();
    await servicesPage.clickButtonZoomIn();
    await servicesPage.verifyExistenceOfClusters();
    let newZoom = await servicesPage.getZoomScale();
    expect(newZoom).toBe(initialZoom + 1);
    await servicesPage.clickButtonZoomOut();
    await servicesPage.verifyExistenceOfClusters();
    await page.waitForTimeout(1450);
    newZoom = await servicesPage.getZoomScale();
    expect(newZoom).toBe(initialZoom);

    await page.mouse.wheel(0, -100);
    await page.waitForTimeout(1000);
    await servicesPage.verifyExistenceOfClusters();
    newZoom = await servicesPage.getZoomScale();
    expect(newZoom).toBe(initialZoom + 1);
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(1000);
    await servicesPage.verifyExistenceOfClusters();
    newZoom = await servicesPage.getZoomScale();
    expect(newZoom).toBe(initialZoom);
  });
});
