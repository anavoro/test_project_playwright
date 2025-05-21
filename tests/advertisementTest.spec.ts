import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { ServicesPage } from "../pages/servicesMapPage";
import testData from "../data/dataMainPage.json";

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

test.describe("Advertisements Verification", () => {
  test("C212 verify services section on the main page", async ({ page }) => {
    await homePage.servicesTitle.scrollIntoViewIfNeeded();
    await expect(homePage.servicesPopularButton).toBeVisible();
    await expect(homePage.servicePopularAsphalting).toBeVisible();
    await expect(homePage.servicePopularComplexOfWork).toBeVisible();
    await expect(
      homePage.servicePopularTransportationOfMaterials
    ).toBeVisible();
    await expect(homePage.servicePopularLoadingAndUnloading).toBeVisible();
    await expect(homePage.servicePopularHoistWork).toBeVisible();
    await expect(homePage.servicePopularPlowWork).toBeVisible();
    await expect(homePage.servicePopularRoadWorks).toBeVisible();

    await servicesPage.verifyPopularService(
      page,
      homePage,
      servicesPage,
      () => homePage.clickServicePopularComplexOfWork(),
      testData.servicesData.complexOfWork
    );

    await servicesPage.verifyPopularService(
      page,
      homePage,
      servicesPage,
      () => homePage.clickServicePopularTransportationOfMaterials(),
      testData.servicesData.transportationOfMaterials
    );

    await servicesPage.verifyPopularService(
      page,
      homePage,
      servicesPage,
      () => homePage.clickServicePopularLoadingAndUnloading(),
      testData.servicesData.loadingAndUnloading
    );

    await servicesPage.verifyPopularService(
      page,
      homePage,
      servicesPage,
      () => homePage.clickServicePopularHoistWork(),
      testData.servicesData.hoistWork
    );

    await servicesPage.verifyPopularService(
      page,
      homePage,
      servicesPage,
      () => homePage.clickServicePopularPlowWork(),
      testData.servicesData.plowWork
    );

    await servicesPage.verifyPopularService(
      page,
      homePage,
      servicesPage,
      () => homePage.clickServicePopularRoadWorks(),
      testData.servicesData.roadWork
    );

    await servicesPage.verifyPopularService(
      page,
      homePage,
      servicesPage,
      () => homePage.clickServicePopularAsphalting(),
      testData.servicesData.asphalting
    );
  });

  test("C213 verify equipment section on the main page", async ({ page }) => {
    await homePage.equipmentTitle.scrollIntoViewIfNeeded();
    await expect(homePage.equipmentPopularButton).toBeVisible();
    await expect(homePage.equipmentPopularSeeder).toBeVisible();
    await expect(homePage.equipmentPopularExcavator).toBeVisible();
    await expect(homePage.equipmentPopularForklift).toBeVisible();
    await expect(homePage.equipmentPopularHoist).toBeVisible();
    await expect(homePage.equipmentPopularSprayer).toBeVisible();
    await expect(homePage.equipmentPopularTractor).toBeVisible();
    await expect(homePage.equipmentPopularUtilityVehicles).toBeVisible();

    await servicesPage.verifyPopularEquipment(
      page,
      homePage,
      servicesPage,
      () => homePage.clickEquipmentPopularSeeder(),
      testData.specialEquipment.seeder,
      testData.specialEquipmentServices.seeder
    );

    await servicesPage.verifyPopularEquipment(
      page,
      homePage,
      servicesPage,
      () => homePage.clickEquipmentPopularExcavator(),
      testData.specialEquipment.excavator,
      testData.specialEquipmentServices.excavator
    );

    await servicesPage.verifyPopularEquipment(
      page,
      homePage,
      servicesPage,
      () => homePage.clickEquipmentPopularForklift(),
      testData.specialEquipment.forklift,
      testData.specialEquipmentServices.forklift
    );

    await servicesPage.verifyPopularEquipment(
      page,
      homePage,
      servicesPage,
      () => homePage.clickEquipmentPopularSprayer(),
      testData.specialEquipment.sprayer,
      testData.specialEquipmentServices.sprayer
    );

    await servicesPage.verifyPopularEquipment(
      page,
      homePage,
      servicesPage,
      () => homePage.clickEquipmentPopularTractor(),
      testData.specialEquipment.tractor,
      testData.specialEquipmentServices.tractor
    );

    await servicesPage.verifyPopularEquipment(
      page,
      homePage,
      servicesPage,
      () => homePage.clickEquipmentPopularUtilityVehicles(),
      testData.specialEquipment.utilityVehicles,
      testData.specialEquipmentServices.utilityVehicles
    );
    //advertisments are absent
    await servicesPage.verifyPopularEquipment(
      page,
      homePage,
      servicesPage,
      () => homePage.clickEquipmentPopularHoist(),
      testData.specialEquipment.hoist,
      testData.specialEquipmentServices.hoist
    );
  });
});
