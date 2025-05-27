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
    // await servicesPage.verifyPopularEquipment(
    //   page,
    //   homePage,
    //   servicesPage,
    //   () => homePage.clickEquipmentPopularHoist(),
    //   testData.specialEquipment.hoist,
    //   testData.specialEquipmentServices.hoist
    // );
  });

  test("C530 verify searching on the main page", async ({ page }) => {
    let advertisementHistoryArray: string[] = [];

    await homePage.clickTopSearchInput();
    await expect(homePage.historyOfSearching).toBeVisible();
    await expect(homePage.servicesOfSearching).toBeVisible();
    await expect(homePage.sowingOfServicesSearching).toBeVisible();
    await expect(homePage.sprayingOfServicesSearching).toBeVisible();
    await expect(homePage.fertilizerOfServicesSearching).toBeVisible();
    await expect(homePage.categoryOfSearching).toBeVisible();
    await expect(homePage.truckСrane25СategoryOfSearching).toBeVisible();
    await expect(homePage.truckСrane40СategoryOfSearching).toBeVisible();
    await expect(homePage.towerСraneСategoryOfSearching).toBeVisible();
    await expect(homePage.topSearchInput).toHaveValue("");
    await homePage.pressEnterTopSearchInput();
    await expect(page).toHaveURL(testData.excerptOfUrl.products);
    //need to remove, exist by virtue of bug and will repeat
    await page.waitForTimeout(2000);
    await servicesPage.verifyRelevantAdvertisement("", "", false);

    await homePage.clickLogo();
    await page.waitForLoadState("networkidle");
    await homePage.verifyHomePageLoaded();
    await homePage.updateSearchHistoryArray(
      advertisementHistoryArray,
      testData.specialEquipment.tractor
    );
    await homePage.clickTopSearchInput();
    await homePage.fillTopSearchInput(testData.specialEquipment.tractor);
    await homePage.verifyThatSearchFormHaveAdvertisements(
      testData.specialEquipment.tractor
    );
    await homePage.pressEnterTopSearchInput();
    await expect(page).toHaveURL(testData.excerptOfUrl.products);
    await page.waitForTimeout(2000);
    await servicesPage.verifyRelevantAdvertisement(
      testData.mainTraitsCategory.categoryTractor,
      testData.specialEquipment.tractor,
      false
    );

    await homePage.clickLogo();
    await page.waitForLoadState("networkidle");
    await homePage.verifyHomePageLoaded();
    await homePage.clickTopSearchInput();
    await homePage.verifyUpdatedHistoryOfSearching(advertisementHistoryArray);
    await homePage.fillTopSearchInput(
      testData.specialEquipmentServices.hydraulics
    );
    await homePage.updateSearchHistoryArray(
      advertisementHistoryArray,
      testData.specialEquipmentServices.hydraulics
    );
    await homePage.verifyThatSearchFormHaveAdvertisements(
      testData.specialEquipmentServices.hydraulics
    );
    await homePage.pressEnterTopSearchInput();
    await expect(page).toHaveURL(testData.excerptOfUrl.products);
    await page.waitForTimeout(2000);
    await servicesPage.verifyRelevantAdvertisement(
      testData.specialEquipmentServices.pumps,
      testData.specialEquipmentServices.hydraulics,
      false
    );

    await homePage.clickLogo();
    await page.waitForLoadState("networkidle");
    await homePage.verifyHomePageLoaded();
    await homePage.clickTopSearchInput();
    await homePage.verifyUpdatedHistoryOfSearching(advertisementHistoryArray);
    await homePage.fillTopSearchInput(testData.specialEquipmentServices.repair);
    await homePage.verifyThatSearchFormHaveAdvertisements(
      testData.specialEquipmentServices.repair
    );
    await homePage.updateSearchHistoryArray(
      advertisementHistoryArray,
      testData.specialEquipmentServices.repair
    );
    await homePage.clickFirstCardContainer();
    await expect(servicesPage.advertisementTitle).toContainText(
      testData.specialEquipmentServices.repair
    );

    await homePage.clickLogo();
    await page.waitForLoadState("networkidle");
    await homePage.verifyHomePageLoaded();
    await homePage.clickTopSearchInput();
    await homePage.verifyUpdatedHistoryOfSearching(advertisementHistoryArray);
    await homePage.fillTopSearchInput("     ");
    await homePage.updateSearchHistoryArray(advertisementHistoryArray, "     ");
    expect(
      await homePage.servicesOfSearching.evaluate((el) => el.children.length)
    ).toBe(0);
    expect(
      await homePage.categoryOfSearching.evaluate((el) => el.children.length)
    ).toBe(0);
    await homePage.verifyThatSearchFormHaveAdvertisements("     ");
    await homePage.pressEnterTopSearchInput();
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(testData.excerptOfUrl.products);
    await servicesPage.verifyRelevantAdvertisement("", " ", false);

    await homePage.clickLogo();
    await page.waitForLoadState("networkidle");
    await homePage.verifyHomePageLoaded();
    await homePage.clickTopSearchInput();
    await homePage.verifyUpdatedHistoryOfSearching(advertisementHistoryArray);
    await homePage.fillTopSearchInput("123");
    await homePage.updateSearchHistoryArray(advertisementHistoryArray, "123");
    await homePage.verifyThatSearchFormHaveAdvertisements("123");
    await homePage.pressEnterTopSearchInput();
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(testData.excerptOfUrl.products);
    await servicesPage.verifyRelevantAdvertisement("", '"123"', false);

    await homePage.clickLogo();
    await page.waitForLoadState("networkidle");
    await homePage.verifyHomePageLoaded();
    await homePage.clickTopSearchInput();
    await homePage.verifyUpdatedHistoryOfSearching(advertisementHistoryArray);
    await homePage.fillTopSearchInput("$");
    await homePage.updateSearchHistoryArray(advertisementHistoryArray, "$");
    await homePage.verifyThatSearchFormHaveAdvertisements("$");
    await homePage.pressEnterTopSearchInput();
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(testData.excerptOfUrl.products);
    await servicesPage.verifyRelevantAdvertisement("", '"$"', false);

    await homePage.clickLogo();
    await page.waitForLoadState("networkidle");
    await homePage.verifyHomePageLoaded();
    await homePage.clickTopSearchInput();
    await homePage.verifyUpdatedHistoryOfSearching(advertisementHistoryArray);
    await homePage.fillTopSearchInput("non-existent тест1234567890");
    await homePage.updateSearchHistoryArray(
      advertisementHistoryArray,
      "non-existent тест1234567890"
    );
    await homePage.verifyThatSearchFormHaveAdvertisements(
      "non-existent тест1234567890"
    );
    await homePage.pressEnterTopSearchInput();
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(testData.excerptOfUrl.products);
    await servicesPage.verifyRelevantAdvertisement(
      "",
      '"non-existent тест1234567890"',
      false
    );

    await homePage.clickLogo();
    await page.waitForLoadState("networkidle");
    await homePage.verifyHomePageLoaded();
    await homePage.clickTopSearchInput();
    await homePage.verifyUpdatedHistoryOfSearching(advertisementHistoryArray);
    await homePage.fillTopSearchInput(testData.servicesData.asphalting);
    await homePage.updateSearchHistoryArray(
      advertisementHistoryArray,
      testData.servicesData.asphalting
    );
    await homePage.verifyThatSearchFormHaveAdvertisements(
      testData.servicesData.asphalting
    );
    await homePage.clickAsphaltingServicesOfSearching();
    await page.waitForTimeout(2000);
    const count = await servicesPage.openedDropDownMenu.count();
    if (count === 0) {
      await servicesPage.clickConstructionalArrowButtonDropDownMenu();
    }
    expect(
      await servicesPage.isCheckboxCheckedByLabel(
        testData.servicesData.asphalting
      )
    ).toBe(true);
    await servicesPage.verifyRelevantAdvertisement(
      "",
      testData.servicesData.asphalting,
      false
    );

    await homePage.clickLogo();
    await page.waitForLoadState("networkidle");
    await homePage.verifyHomePageLoaded();
    await homePage.clickTopSearchInput();
    await homePage.verifyUpdatedHistoryOfSearching(advertisementHistoryArray);
    await homePage.fillTopSearchInput("Драглайни");
    await homePage.updateSearchHistoryArray(
      advertisementHistoryArray,
      "Драглайни"
    );
    await homePage.verifyThatSearchFormHaveAdvertisements("Драглайни");
    await homePage.clickDraglineСategoryOfSearching();
    await page.waitForTimeout(2000);
    await expect(servicesPage.draglineCategoryOfAdvertisement).toBeVisible();
    await servicesPage.verifyRelevantAdvertisement("", "Драглайни", true);

    await homePage.clickLogo();
    await page.waitForLoadState("networkidle");
    await homePage.verifyHomePageLoaded();
    await homePage.clickTopSearchInput();
    await homePage.verifyUpdatedHistoryOfSearching(advertisementHistoryArray);
    await homePage.fillTopSearchInput(testData.specialEquipmentServices.repair);
    await homePage.updateSearchHistoryArray(
      advertisementHistoryArray,
      testData.specialEquipmentServices.repair
    );
    await homePage.verifyThatSearchFormHaveAdvertisements(
      testData.specialEquipmentServices.repair
    );
    await homePage.clickButtonCrossTop();
    await expect(homePage.dropDownSearchForm).toBeHidden();
    await expect(homePage.topSearchInput).toBeEmpty();
  });

  test("C559 verify catalog button", async ({ page }) => {
    await homePage.clickCatalog();
    await homePage.verifyWhetherFirstDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent
    );
    await homePage.hoverToElementFromFirstCatalogDropDownMenu(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent[0]
    );
    await homePage.verifyWhetherSecondDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.specialEquipmentDropDownMenuContent
    );
    await homePage.clickOnCertainElementAtDropDownCategoryMenu(
      homePage.secondDropDownMenuCatalog,
      testData.optionsOfCatalogDropDownMenu
        .specialEquipmentDropDownMenuContent[0]
    );
    await page.waitForTimeout(2000);
    await expect(servicesPage.constructionalEquipment).toBeVisible();
    await servicesPage.verifyRelevantAdvertisement("", "", true);

    await homePage.clickCatalog();
    await homePage.verifyWhetherFirstDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent
    );
    await homePage.hoverToElementFromFirstCatalogDropDownMenu(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent[0]
    );
    await homePage.verifyWhetherSecondDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.specialEquipmentDropDownMenuContent
    );
    await homePage.clickOnCertainElementAtDropDownCategoryMenu(
      homePage.secondDropDownMenuCatalog,
      testData.optionsOfCatalogDropDownMenu
        .specialEquipmentDropDownMenuContent[1]
    );
    await page.waitForTimeout(2000);
    await expect(servicesPage.communalEquipment).toBeVisible();
    await servicesPage.verifyRelevantAdvertisement("", "", true);

    await homePage.clickCatalog();
    await homePage.verifyWhetherFirstDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent
    );
    await homePage.hoverToElementFromFirstCatalogDropDownMenu(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent[0]
    );
    await homePage.verifyWhetherSecondDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.specialEquipmentDropDownMenuContent
    );
    await homePage.clickOnCertainElementAtDropDownCategoryMenu(
      homePage.secondDropDownMenuCatalog,
      testData.optionsOfCatalogDropDownMenu
        .specialEquipmentDropDownMenuContent[2]
    );
    await page.waitForTimeout(2000);
    await expect(servicesPage.storageEquipment).toBeVisible();
    await servicesPage.verifyRelevantAdvertisement("", "", true);

    await homePage.clickLogo();
    await page.waitForLoadState("networkidle");
    await homePage.verifyHomePageLoaded();
    await homePage.clickCatalog();
    await homePage.verifyWhetherFirstDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent
    );
    await homePage.hoverToElementFromFirstCatalogDropDownMenu(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent[0]
    );
    await homePage.verifyWhetherSecondDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.specialEquipmentDropDownMenuContent
    );
    await homePage.hoverToElementFromOthersCatalogDropDownMenu(
      testData.optionsOfCatalogDropDownMenu
        .specialEquipmentDropDownMenuContent[0]
    );
    await homePage.verifyWhetherSecondDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.constructionalEquipment
    );

    await homePage.clickLogo();
    await page.waitForLoadState("networkidle");
    await homePage.verifyHomePageLoaded();
    await homePage.clickCatalog();
    await homePage.verifyWhetherFirstDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent
    );
    await homePage.hoverToElementFromFirstCatalogDropDownMenu(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent[0]
    );
    await homePage.verifyWhetherSecondDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.specialEquipmentDropDownMenuContent
    );
    await homePage.hoverToElementFromOthersCatalogDropDownMenu(
      testData.optionsOfCatalogDropDownMenu
        .specialEquipmentDropDownMenuContent[1]
    );
    await homePage.verifyWhetherSecondDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.communalEquipment
    );

    await homePage.clickLogo();
    await page.waitForLoadState("networkidle");
    await homePage.verifyHomePageLoaded();
    await homePage.clickCatalog();
    await homePage.verifyWhetherFirstDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent
    );
    await homePage.hoverToElementFromFirstCatalogDropDownMenu(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent[0]
    );
    await homePage.verifyWhetherSecondDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.specialEquipmentDropDownMenuContent
    );
    await homePage.hoverToElementFromOthersCatalogDropDownMenu(
      testData.optionsOfCatalogDropDownMenu
        .specialEquipmentDropDownMenuContent[2]
    );
    await homePage.verifyWhetherSecondDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.storageEquipment
    );

    await homePage.clickLogo();
    await page.waitForLoadState("networkidle");
    await homePage.verifyHomePageLoaded();
    await homePage.clickCatalog();
    await homePage.verifyWhetherFirstDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent
    );
    await homePage.hoverToElementFromFirstCatalogDropDownMenu(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent[1]
    );
    await homePage.verifyWhetherSecondDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.servicesDropDownMenuContent
    );
    await homePage.hoverToElementFromOthersCatalogDropDownMenu(
      testData.optionsOfCatalogDropDownMenu.servicesDropDownMenuContent[0]
    );
    await homePage.verifyWhetherSecondDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.buildings
    );

    await homePage.clickLogo();
    await page.waitForLoadState("networkidle");
    await homePage.verifyHomePageLoaded();
    await homePage.clickCatalog();
    await homePage.verifyWhetherFirstDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent
    );
    await homePage.hoverToElementFromFirstCatalogDropDownMenu(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent[1]
    );
    await homePage.verifyWhetherSecondDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.servicesDropDownMenuContent
    );
    await homePage.hoverToElementFromOthersCatalogDropDownMenu(
      testData.optionsOfCatalogDropDownMenu.servicesDropDownMenuContent[1]
    );
    await homePage.verifyWhetherSecondDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.others
    );

    await homePage.clickLogo();
    await page.waitForLoadState("networkidle");
    await homePage.verifyHomePageLoaded();
    await homePage.clickCatalog();
    await homePage.verifyWhetherFirstDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent
    );
    await homePage.hoverToElementFromFirstCatalogDropDownMenu(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent[1]
    );
    await homePage.verifyWhetherSecondDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.servicesDropDownMenuContent
    );
    await homePage.hoverToElementFromOthersCatalogDropDownMenu(
      testData.optionsOfCatalogDropDownMenu.servicesDropDownMenuContent[2]
    );
    await homePage.verifyWhetherSecondDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.agricultural
    );
    await homePage.clickOnCertainElementAtDropDownCategoryMenu(
      homePage.thirdDropDownMenuCatalog,
      testData.optionsOfCatalogDropDownMenu.agricultural[0]
    );
    await page.waitForTimeout(2000);
    let count = await servicesPage.openedDropDownMenu.count();
    if (count === 0) {
      await servicesPage.clickAgriculturalArrowButtonDropDownMenu();
    }
    expect(
      await servicesPage.isCheckboxCheckedByLabel(
        testData.optionsOfCatalogDropDownMenu.agricultural[0]
      )
    ).toBe(true);
    await servicesPage.verifyRelevantAdvertisement("", "", true);

    //bug
    // await homePage.clickLogo();
    // await page.waitForLoadState("networkidle");
    // await homePage.verifyHomePageLoaded();
    // await homePage.clickCatalog();
    // await homePage.verifyWhetherFirstDropDownMenuisVisible(
    //   testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent
    // );
    // await homePage.hoverToElementFromFirstCatalogDropDownMenu(
    //   testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent[1]
    // );
    // await homePage.verifyWhetherSecondDropDownMenuisVisible(
    //   testData.optionsOfCatalogDropDownMenu.servicesDropDownMenuContent
    // );
    // await homePage.hoverToElementFromOthersCatalogDropDownMenu(
    //   testData.optionsOfCatalogDropDownMenu.servicesDropDownMenuContent[0]
    // );
    // await homePage.verifyWhetherSecondDropDownMenuisVisible(
    //   testData.optionsOfCatalogDropDownMenu.buildings
    // );
    // await homePage.clickOnCertainElementAtDropDownCategoryMenu(
    //   homePage.thirdDropDownMenuCatalog,
    //   testData.optionsOfCatalogDropDownMenu.buildings[3]
    // );
    // await page.waitForTimeout(2000);
    // count = await servicesPage.openedDropDownMenu.count();
    // if (count === 0) {
    //   await servicesPage.clickAgriculturalArrowButtonDropDownMenu();
    // }
    // expect(
    //   await servicesPage.isCheckboxCheckedByLabel(
    //     testData.optionsOfCatalogDropDownMenu.buildings[3]
    //   )
    // ).toBe(true);
    // await servicesPage.verifyRelevantAdvertisement("", "", true);

    await homePage.clickLogo();
    await page.waitForLoadState("networkidle");
    await homePage.verifyHomePageLoaded();
    await homePage.clickCatalog();
    await homePage.verifyWhetherFirstDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent
    );
    await homePage.hoverToElementFromFirstCatalogDropDownMenu(
      testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent[1]
    );
    await homePage.verifyWhetherSecondDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.servicesDropDownMenuContent
    );
    await homePage.hoverToElementFromOthersCatalogDropDownMenu(
      testData.optionsOfCatalogDropDownMenu.servicesDropDownMenuContent[2]
    );
    await homePage.verifyWhetherSecondDropDownMenuisVisible(
      testData.optionsOfCatalogDropDownMenu.agricultural
    );
    await homePage.clickOnCertainElementAtDropDownCategoryMenu(
      homePage.thirdDropDownMenuCatalog,
      testData.optionsOfCatalogDropDownMenu.agricultural[2]
    );
    await page.waitForTimeout(2000);
    count = await servicesPage.openedDropDownMenu.count();
    if (count === 0) {
      await servicesPage.clickAgriculturalArrowButtonDropDownMenu();
    }
    expect(
      await servicesPage.isCheckboxCheckedByLabel(
        testData.optionsOfCatalogDropDownMenu.agricultural[2]
      )
    ).toBe(true);
    await servicesPage.verifyRelevantAdvertisement("", "", true);

    //bug
    // await homePage.clickLogo();
    // await page.waitForLoadState("networkidle");
    // await homePage.verifyHomePageLoaded();
    // await homePage.clickCatalog();
    // await homePage.verifyWhetherFirstDropDownMenuisVisible(
    //   testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent
    // );
    // await homePage.hoverToElementFromFirstCatalogDropDownMenu(
    //   testData.optionsOfCatalogDropDownMenu.firstCatalogDromMenuContent[1]
    // );
    // await homePage.verifyWhetherSecondDropDownMenuisVisible(
    //   testData.optionsOfCatalogDropDownMenu.servicesDropDownMenuContent
    // );
    // await homePage.hoverToElementFromOthersCatalogDropDownMenu(
    //   testData.optionsOfCatalogDropDownMenu.servicesDropDownMenuContent[1]
    // );
    // await homePage.verifyWhetherSecondDropDownMenuisVisible(
    //   testData.optionsOfCatalogDropDownMenu.others
    // );
    // await homePage.clickOnCertainElementAtDropDownCategoryMenu(
    //   homePage.thirdDropDownMenuCatalog,
    //   testData.optionsOfCatalogDropDownMenu.others[3]
    // );
    // await page.waitForTimeout(2000);
    // count = await servicesPage.openedDropDownMenu.count();
    // if (count === 0) {
    //   await servicesPage.clickOtherArrowButtonDropDownMenu();
    // }
    // expect(
    //   await servicesPage.isCheckboxCheckedByLabel(
    //     testData.optionsOfCatalogDropDownMenu.others[3]
    //   )
    // ).toBe(true);
    // await servicesPage.verifyRelevantAdvertisement("", "", true);
  });
});
