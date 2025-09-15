import { expect } from "@playwright/test";
import { test } from "../utils/fixtures"; 
import * as data from '../testData/unitData'

let allImagesBlocks: any;

test.describe("Verify Photos section", async () => {
    
    test.beforeEach(async ({ page, createAnnouncementPage, homePage, loginPage }) =>{
        await page.setViewportSize({ width: 1536, height: 980 });
        await homePage.goto("/");
        await homePage.clickLogin();
        await loginPage.login(data.validData.email, data.validData.password);
        await homePage.navigateToCreateAnnouncement();

        await createAnnouncementPage.clickCategoryInput();
        await expect(createAnnouncementPage.budivelnaTekhnikaLink).toContainText('Будівельна техніка');
        await createAnnouncementPage.click(createAnnouncementPage.budivelnaTekhnikaLink);
        await expect(createAnnouncementPage.buroviUstanovkiLink).toContainText('Бурові установки');
        await createAnnouncementPage.click(createAnnouncementPage.buroviUstanovkiLink);
        await expect(createAnnouncementPage.palebiiniUstanovkiLink).toContainText('палебійні установки');
        await createAnnouncementPage.click(createAnnouncementPage.palebiiniUstanovkiLink);
        await expect(createAnnouncementPage.categoryErrorText).not.toBeVisible()
        await createAnnouncementPage.fillUnitNameInput(data.validData.unitName);
        await createAnnouncementPage.unitNameErrorText.waitFor({state: 'hidden'})
        const manufacturerName = await data.manufacturerRandom(createAnnouncementPage)
        await createAnnouncementPage.fillVehicleManufacturerInput(manufacturerName);
        await createAnnouncementPage.clickVehicleManufacturerSearchResult();
        await createAnnouncementPage.clickLocationSelectButton();
        await createAnnouncementPage.clickMap();
        await createAnnouncementPage.clickMapPopUpSubmitButton();
        await createAnnouncementPage.vehicleLocationErrorText.waitFor({state: 'hidden'})
        await createAnnouncementPage.clickNextButton();
    })
    test('C367 Verify image upload panels', async ( {page, createAnnouncementPage} ) => {
        await expect(createAnnouncementPage.imageUploadTitle).toBeVisible();
        await expect(createAnnouncementPage.imageUploadTitle).toHaveText(/^Фото/, /засобу */);
        await expect(createAnnouncementPage.imageUploadAsterix).toHaveText('*');
        await expect(createAnnouncementPage.description).toBeVisible();
        await expect(createAnnouncementPage.description).toHaveText(/від 1 до/, /фото/);

        allImagesBlocks = await createAnnouncementPage.imageBlock.all();
        for (let i = 0; i < allImagesBlocks.length; i++){
            await data.fileChooserFunc(allImagesBlocks[i], data.images[0], createAnnouncementPage, page);
            await expect(createAnnouncementPage.mainImageLabel).toBeVisible();
            await createAnnouncementPage.imageUnit.hover();
            await expect(createAnnouncementPage.imageDelete).toBeVisible();
            await createAnnouncementPage.imageDelete.click();
        };

        await data.fileChooserFunc(createAnnouncementPage.imageUnit, data.images[0], createAnnouncementPage, page);
        await expect(createAnnouncementPage.mainImageLabel).toBeVisible();
        await expect(createAnnouncementPage.mainImageLabel).toHaveText('Головне');
        await createAnnouncementPage.imageUnit.hover();
        await expect(createAnnouncementPage.imageDelete).toBeVisible();
        await createAnnouncementPage.imageDelete.click();

        const fileChooserPromise = page.waitForEvent('filechooser');
        await createAnnouncementPage.clickImageUnit();
        const fileChooser = await fileChooserPromise;
        fileChooser.isMultiple();
        await fileChooser.setFiles(data.images, {timeout: 10000});
        expect(data.images.length).toEqual(16);

        const srcFirstBefore = await createAnnouncementPage.imageSrcFirst.getAttribute('src');
        await (createAnnouncementPage.image2).dragTo(createAnnouncementPage.image1);
        const srsSecondAfter = await createAnnouncementPage.imageSrcSecond.getAttribute('src');
        expect(srcFirstBefore == srsSecondAfter).toBeTruthy();

        const imagesUploaded = await createAnnouncementPage.imageUploadedAll.all();
        const count = await createAnnouncementPage.imageUploadedAll.count();
        for (let i = 0; i < imagesUploaded.length; i++) {
        await createAnnouncementPage.imageUnit.focus({timeout: 5000});
        await createAnnouncementPage.imageUnit.hover({timeout: 5000});
        await expect(createAnnouncementPage.imageDelete).toBeVisible();
        await createAnnouncementPage.imageDelete.click();
        };
    });
    test("С384 Verify same images uploading", async ({ page, createAnnouncementPage }) => {
        allImagesBlocks = await createAnnouncementPage.imageBlock.all();
        for (let i = 0; i < allImagesBlocks.length - 2; i++) {
            await data.fileChooserFunc(
                allImagesBlocks[i],
                data.images[0],
                createAnnouncementPage,
                page
            );
            await allImagesBlocks[i].focus();
        }
        await expect(createAnnouncementPage.popUpError).toHaveText(/завантажити двічі/);
        await createAnnouncementPage.clickPopUpCloseIcon();
        await expect(createAnnouncementPage.imageUploadedAll).toHaveCount(1);

        await data.fileChooserFunc(
            allImagesBlocks[1],
            data.images[0],
            createAnnouncementPage,
            page
        );
        await allImagesBlocks[1].focus();
        await expect(createAnnouncementPage.popUpError).toHaveText(/завантажити двічі/);
        await createAnnouncementPage.clickPopUpSaveBtn();
        await expect(createAnnouncementPage.imageUploadedAll).toHaveCount(1);

        await data.fileChooserFunc(
            allImagesBlocks[1],
            data.images[0],
            createAnnouncementPage,
            page
        );
        await allImagesBlocks[1].focus();
        await expect(createAnnouncementPage.popUpError).toHaveText(/завантажити двічі/);
        await page.mouse.click(0, 0);
        await expect(createAnnouncementPage.imageUploadedAll).toHaveCount(1);

        await createAnnouncementPage.imageUnit.hover();
        await expect(createAnnouncementPage.imageDelete).toBeVisible();
        await createAnnouncementPage.imageDelete.click();
        await expect(createAnnouncementPage.imageUploadedAll).toHaveCount(0);
    });
    test("C401 Verify uploading of invalid file type", async ({ page, createAnnouncementPage }) => {
        await data.fileChooserFunc(
            createAnnouncementPage.imageUnit,
            data.invalidData.fileType,
            createAnnouncementPage,
            page
        );
        await createAnnouncementPage.imageUnit.focus();
        await expect(createAnnouncementPage.popUpInvalidImageError).toHaveText(/не підтримується/);
        await createAnnouncementPage.clickPopUpInvalidImageCloseIcon();
        await expect(createAnnouncementPage.popUpInvalidImage).not.toBeVisible();
        await expect(createAnnouncementPage.imageUploadedAll).toHaveCount(0);

        await data.fileChooserFunc(
            createAnnouncementPage.imageUnit,
            data.invalidData.fileType,
            createAnnouncementPage,
            page
        );
        await createAnnouncementPage.imageUnit.focus();
        await createAnnouncementPage.clickPopUpInvalidImageSaveBtn();
        await expect(createAnnouncementPage.popUpInvalidImage).not.toBeVisible();
        await expect(createAnnouncementPage.imageUploadedAll).toHaveCount(0);

        await data.fileChooserFunc(
            createAnnouncementPage.imageUnit,
            data.invalidData.fileType,
            createAnnouncementPage,
            page
        );
        await createAnnouncementPage.imageUnit.focus();
        await page.mouse.click(0, 0);
        await expect(createAnnouncementPage.popUpInvalidImage).not.toBeVisible();
        await expect(createAnnouncementPage.imageUploadedAll).toHaveCount(0);
    });
    test("C405 Verify uploading of invalid size file", async ({ page, createAnnouncementPage }) => {
        await data.fileChooserFunc(
            createAnnouncementPage.imageUnit,
            data.invalidData.fileSize,
            createAnnouncementPage,
            page
        );
        await createAnnouncementPage.imageUnit.focus();
        await expect(createAnnouncementPage.popUpInvalidImageError).toHaveText(/не підтримується/);
        await createAnnouncementPage.clickPopUpInvalidImageCloseIcon();
        await expect(createAnnouncementPage.popUpInvalidImage).not.toBeVisible();
        await expect(createAnnouncementPage.imageUploadedAll).toHaveCount(0);

        await data.fileChooserFunc(
            createAnnouncementPage.imageUnit,
            data.invalidData.fileSize,
            createAnnouncementPage,
            page
        );
        await createAnnouncementPage.imageUnit.focus();
        await createAnnouncementPage.clickPopUpInvalidImageSaveBtn();
        await expect(createAnnouncementPage.popUpInvalidImage).not.toBeVisible();
        await expect(createAnnouncementPage.imageUploadedAll).toHaveCount(0);

        await data.fileChooserFunc(
            createAnnouncementPage.imageUnit,
            data.invalidData.fileSize,
            createAnnouncementPage,
            page
        );
        await createAnnouncementPage.imageUnit.focus();
        await page.mouse.click(0, 0);
        await expect(createAnnouncementPage.popUpInvalidImage).not.toBeVisible();
        await expect(createAnnouncementPage.imageUploadedAll).toHaveCount(0);
    });
    test("C390 Verify Prev button", async ({ createAnnouncementPage }) => {
        await expect(createAnnouncementPage.prevButton).toHaveText("Назад");
        await createAnnouncementPage.clickPrevButton();
        await expect(createAnnouncementPage.mainInfoHeader).toBeVisible();
        await expect(createAnnouncementPage.mainInfoHeader).toHaveText("Основна інформація");

        await expect(createAnnouncementPage.mainInfoButton).toBeVisible();
        await expect(createAnnouncementPage.mainInfoButtonNumber).toHaveCSS(
            "background-color",
            data.color.activeElem
        );
        await expect(createAnnouncementPage.photoButton).toBeVisible();
        await expect(createAnnouncementPage.photoButtonNumber).toHaveCSS(
            "background-color",
            data.color.inactiveElem
        );
        await expect(createAnnouncementPage.servicesButton).toBeVisible();
        await expect(createAnnouncementPage.servicesButtonNumber).toHaveCSS(
            "background-color",
            data.color.inactiveElem
        );
        await expect(createAnnouncementPage.costButton).toBeVisible();
        await expect(createAnnouncementPage.costButtonNumber).toHaveCSS(
            "background-color",
            data.color.inactiveElem
        );
        await expect(createAnnouncementPage.contactsButton).toBeVisible();
        await expect(createAnnouncementPage.contactsButtonNumber).toHaveCSS(
            "background-color",
            data.color.inactiveElem
        );
        await expect(createAnnouncementPage.categoryTitle).toBeVisible();
        await expect(createAnnouncementPage.categoryTitle).toContainText("Категорія *");
        await expect(createAnnouncementPage.categoryInput).toBeVisible();

        await expect(createAnnouncementPage.unitNameTitle).toBeVisible();
        await expect(createAnnouncementPage.unitNameTitle).toContainText("Назва оголошення *");
        await expect(createAnnouncementPage.unitNameInput).toBeVisible();

        await expect(createAnnouncementPage.vehicleManufacturerTitle).toBeVisible();
        await expect(createAnnouncementPage.vehicleManufacturerTitle).toContainText(/Виробник/);
        await expect(createAnnouncementPage.vehicleManufacturerField).toBeVisible();

        await expect(createAnnouncementPage.modelNameTitle).toBeVisible();
        await expect(createAnnouncementPage.modelNameTitle).toContainText("Назва моделі");
        await expect(createAnnouncementPage.modelNameInput).toBeVisible();

        await expect(createAnnouncementPage.techCharacteristicsTitle).toBeVisible();
        await expect(createAnnouncementPage.techCharacteristicsTitle).toContainText(/Технічні/);
        await expect(createAnnouncementPage.techCharacteristicsTextArea).toBeVisible();

        await expect(createAnnouncementPage.descriptionTitle).toBeVisible();
        await expect(createAnnouncementPage.descriptionTitle).toContainText("Детальний опис");
        await expect(createAnnouncementPage.descriptionTextArea).toBeVisible();

        await expect(createAnnouncementPage.vehicleLocationTitle).toBeVisible();
        await expect(createAnnouncementPage.vehicleLocationTitle).toContainText(/^Місце/);
        await expect(createAnnouncementPage.vehicleLocationAsterix).toBeVisible();
    });
    test('C393 Verify Next button', async ( {page, createAnnouncementPage} ) => {
        await expect(createAnnouncementPage.nextButton).toBeVisible();
        await expect(createAnnouncementPage.nextButton).toContainText('Далі');
        
        await createAnnouncementPage.clickNextButton();
        await expect(createAnnouncementPage.description).toBeVisible()
        await expect(createAnnouncementPage.description).toHaveCSS('color', data.color.error);

        await data.fileChooserFunc(createAnnouncementPage.imageUnit, data.images[0], createAnnouncementPage, page)
        await createAnnouncementPage.clickNextButton();
        await expect(createAnnouncementPage.createAnnouncementTitle).toBeVisible();
        await expect(createAnnouncementPage.createAnnouncementTitle).toContainText('Створити оголошення');

        await expect(createAnnouncementPage.servisesHeader).toBeVisible();
        await expect(createAnnouncementPage.servisesHeader).toHaveText('Послуги');

        await expect(createAnnouncementPage.mainInfoButton).toBeVisible();
        await expect(createAnnouncementPage.mainInfoButton).toContainText("Основна інформація");
        await expect(createAnnouncementPage.mainInfoButtonNumber).toContainText(/[1]/);
        await expect(createAnnouncementPage.mainInfoButtonNumber).toHaveCSS(
            "background-color",
            data.color.inactiveElem
        );
        
        await expect(createAnnouncementPage.photoButton).toBeVisible();
        await expect(createAnnouncementPage.photoButton).toContainText("Фотографії");
        await expect(createAnnouncementPage.photoButtonNumber).toContainText(/[2]/);
        await expect(createAnnouncementPage.photoButtonNumber).toHaveCSS(
            "background-color",
            data.color.inactiveElem
        );
        
        await expect(createAnnouncementPage.servicesButton).toBeVisible();
        await expect(createAnnouncementPage.servicesButton).toContainText("Послуги");
        await expect(createAnnouncementPage.servicesButtonNumber).toContainText(/[3]/);
        await expect(createAnnouncementPage.servicesButtonNumber).toHaveCSS(
            "background-color",
            data.color.activeElem
        );
        
        await expect(createAnnouncementPage.costButton).toBeVisible();
        await expect(createAnnouncementPage.costButton).toContainText("Вартість");
        await expect(createAnnouncementPage.costButtonNumber).toContainText(/[4]/);
        await expect(createAnnouncementPage.costButtonNumber).toHaveCSS(
            "background-color",
            data.color.inactiveElem
        );
        
        await expect(createAnnouncementPage.contactsButton).toBeVisible();
        await expect(createAnnouncementPage.contactsButton).toContainText("Контакти");
        await expect(createAnnouncementPage.contactsButtonNumber).toContainText(/[5]/);
        await expect(createAnnouncementPage.contactsButtonNumber).toHaveCSS(
            "background-color",
            data.color.inactiveElem
        );
          
        await expect(createAnnouncementPage.servicesSearchField).toBeVisible();
    })
});

test.describe('Verify Services section', () => {

    test.beforeEach(async ({ page, createAnnouncementPage, homePage, loginPage }) =>{
        await page.setViewportSize({ width: 1536, height: 980 });
        await homePage.goto("/");
        await homePage.clickLogin();
        await loginPage.login(data.validData.email, data.validData.password);
        await homePage.navigateToCreateAnnouncement();

        await createAnnouncementPage.clickCategoryInput();
        await expect(createAnnouncementPage.budivelnaTekhnikaLink).toContainText('Будівельна техніка');
        await createAnnouncementPage.click(createAnnouncementPage.budivelnaTekhnikaLink);
        await expect(createAnnouncementPage.buroviUstanovkiLink).toContainText('Бурові установки');
        await createAnnouncementPage.click(createAnnouncementPage.buroviUstanovkiLink);
        await expect(createAnnouncementPage.palebiiniUstanovkiLink).toContainText('палебійні установки');
        await createAnnouncementPage.click(createAnnouncementPage.palebiiniUstanovkiLink);
        await expect(createAnnouncementPage.categoryErrorText).not.toBeVisible()
        await createAnnouncementPage.fillUnitNameInput(data.validData.unitName);
        await createAnnouncementPage.unitNameErrorText.waitFor({state: 'hidden'})
        const manufacturerName = await data.manufacturerRandom(createAnnouncementPage)
        await createAnnouncementPage.fillVehicleManufacturerInput(manufacturerName);
        await createAnnouncementPage.clickVehicleManufacturerSearchResult();
        await createAnnouncementPage.clickLocationSelectButton();
        await createAnnouncementPage.clickMap();
        await createAnnouncementPage.clickMapPopUpSubmitButton();
        await createAnnouncementPage.vehicleLocationErrorText.waitFor({state: 'hidden'})
        await createAnnouncementPage.clickNextButton();

        await data.fileChooserFunc(createAnnouncementPage.imageUnit, data.images[0], createAnnouncementPage, page);
        await createAnnouncementPage.clickNextButton();
    });
    test('C409 Verify input section and choosing of existing sevice', async ( {page, createAnnouncementPage} ) => {
        await expect(createAnnouncementPage.servicesInputTitle).toBeVisible();
        await expect(createAnnouncementPage.servicesInputTitle).toHaveText(/^Знайдіть/, /\*/);
        await expect(createAnnouncementPage.servicesClueLine).toBeVisible();
        await expect(createAnnouncementPage.servicesClueLine).toHaveText(/^Додайте/, /1 послугу/);
        await expect(createAnnouncementPage.servicesSearchLoop).toBeVisible();
        await expect(createAnnouncementPage.servicesSearchInput).toBeVisible();
        await expect(createAnnouncementPage.servicesSearchInput)
              .toHaveAttribute("placeholder", /Наприклад/);

        await createAnnouncementPage.fillServisesSearchInput(data.invalidData.text101);
        await expect(createAnnouncementPage.symbolsCounter).toContainText(
            `${data.invalidData.text101.slice(0, -1).length} / 100`
        );

        await createAnnouncementPage.clearServisesSearchInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.servicesSearchInput,
            data.invalidData.text101);
        await expect(createAnnouncementPage.symbolsCounter).toContainText(
            `${data.invalidData.text101.slice(0, -1).length} / 100`);

        await createAnnouncementPage.clearServisesSearchInput();
        await createAnnouncementPage.fillServisesSearchInput(data.validData.letter);
        await expect(createAnnouncementPage.servicesSearchDropdown).toBeVisible();
        const minSearchSymbolsAmount =
            await createAnnouncementPage.servicesSearchInput.getAttribute(
                "value"
            );
        expect (minSearchSymbolsAmount).toHaveLength(1);

        await createAnnouncementPage.clearServisesSearchInput();
        await createAnnouncementPage.fillServisesSearchInput(data.searchService);
        const searchResult = await createAnnouncementPage.servicesSearchResult.all();
        const searchResultFirstLine: any = await searchResult[0].textContent();
        await expect((searchResultFirstLine.toLowerCase()).includes(data.searchService)).toBeTruthy();

        await createAnnouncementPage.clearServisesSearchInput();
        await createAnnouncementPage.fillServisesSearchInput(data.searchService.toUpperCase());
        expect(
            searchResultFirstLine
                .toUpperCase()
                .includes(data.searchService.toUpperCase())
        ).toBeTruthy();

        await createAnnouncementPage.clearServisesSearchInput();
        await createAnnouncementPage.fillServisesSearchInput(data.searchService);
        await createAnnouncementPage.clickServicesSearchResultFirst();
        await expect(createAnnouncementPage.markSelected).toBeVisible();
        const servicesListCount = await createAnnouncementPage.servicesList.count();
        await expect(servicesListCount).toBeGreaterThanOrEqual(1);
        await expect(createAnnouncementPage.choosedServicesTitle).toBeVisible();
        await expect(createAnnouncementPage.choosedServicesTitle).toHaveText(/Послуги, які/);
        await expect(createAnnouncementPage.serviceListItem).toBeVisible();
        await expect(createAnnouncementPage.serviceListItem).toHaveText(searchResultFirstLine);
        await expect(createAnnouncementPage.servicesListRemoveBtn).toBeVisible();
    });
    // Test C410 is skiped due not working Add service button
    test.skip('C410 Verify creating new service', async ( {page, createAnnouncementPage} ) => {
        const newServiceName = await data.newService();
        await createAnnouncementPage.fillServisesSearchInput(newServiceName);
        await expect(createAnnouncementPage.notFoundServiceText).toBeVisible();
        await createAnnouncementPage.verifyNotFoundServiceText(newServiceName);
        await expect(createAnnouncementPage.addNewServiceBtn).toBeVisible();
        await expect(createAnnouncementPage.addNewServiceBtnIcon).toBeVisible();
        await expect(createAnnouncementPage.addNewServiceBtn).toHaveText('Створити послугу');

        await createAnnouncementPage.clickAddNewServiceBtn();
        await expect(createAnnouncementPage.markSelected).toBeVisible();
        await expect(createAnnouncementPage.choosedServicesTitle).toBeVisible();
        await expect(createAnnouncementPage.serviceListItem).toBeVisible();
        await expect(createAnnouncementPage.serviceListItem).toHaveText(newServiceName); 
    })
    test('C411 Verify choosing multiple services', async ( {page, createAnnouncementPage} ) => {
        await createAnnouncementPage.fillServisesSearchInput(data.validData.letter);
        const servicesListCount = await createAnnouncementPage.servicesList.count();
        expect(servicesListCount).toBeGreaterThanOrEqual(1);
        const searchResults = await createAnnouncementPage.servicesSearchResult.allInnerTexts();
        for (let i = 0; i < searchResults.length; i++) {
            expect(
                searchResults[i].toUpperCase().includes(data.validData.letter)
            ).toBeTruthy();
        }

        await createAnnouncementPage.clickServicesSearchResultFirst();
        await createAnnouncementPage.servicesSearchResultSecond.click();
        await expect(createAnnouncementPage.choosedServicesTitle).toBeVisible();
        await expect(createAnnouncementPage.choosedServicesTitle).toHaveText(/^Послуги, які/);
        await expect(createAnnouncementPage.serviceListItemFirst).toBeVisible();
        await expect(createAnnouncementPage.serviceListItemFirst).toHaveText(searchResults[0]);
        await expect(createAnnouncementPage.serviceListItemSecond).toBeVisible();
        await expect(createAnnouncementPage.serviceListItemSecond).toHaveText(searchResults[1]);
    })
    test('C412 Verify removing variants from choosed list', async ( {page, createAnnouncementPage} ) => {
        await createAnnouncementPage.fillServisesSearchInput(data.validData.letter);
        await createAnnouncementPage.clickServicesSearchResultFirst();
        await createAnnouncementPage.servicesSearchResultSecond.click();
        await expect(createAnnouncementPage.choosedServicesTitle).toBeVisible();
        await expect(createAnnouncementPage.choosedServicesTitle).toHaveText(/Послуги, які/);
        await expect(createAnnouncementPage.serviceListItemFirst).toBeVisible();
        await expect(createAnnouncementPage.serviceListItemSecond).toBeVisible();

        await createAnnouncementPage.clickServiceListRemoveBtnSecond();
        await expect(createAnnouncementPage.serviceListItemSecond).not.toBeVisible();
        await createAnnouncementPage.clickServiceListRemoveBtnFirst();
        await expect(createAnnouncementPage.serviceListItemFirst).not.toBeVisible();
        await expect(createAnnouncementPage.choosedServicesTitle).not.toBeVisible();
    });
    test('C413 Verify prev button', async ( {page, createAnnouncementPage} ) => {
        await expect(createAnnouncementPage.prevButton).toHaveText("Назад");
        await createAnnouncementPage.clickPrevButton();
        await expect(createAnnouncementPage.photoTitle).toContainText('Фотографії')
        await expect(createAnnouncementPage.createAnnouncementTitle).toBeVisible();
        await expect(createAnnouncementPage.createAnnouncementTitle).toContainText('Створити оголошення');
        
        await expect(createAnnouncementPage.mainInfoButton).toBeVisible();
        await expect(createAnnouncementPage.mainInfoButton).toContainText("Основна інформація");
        await expect(createAnnouncementPage.mainInfoButtonNumber).toContainText(/[1]/);
        await expect(createAnnouncementPage.mainInfoButtonNumber)
                .toHaveCSS('background-color', data.color.inactiveElem);
        
        await expect(createAnnouncementPage.photoButton).toBeVisible();
        await expect(createAnnouncementPage.photoButton).toContainText("Фотографії");
        await expect(createAnnouncementPage.photoButtonNumber).toContainText(/[2]/);
        await expect(createAnnouncementPage.photoButtonNumber)
                .toHaveCSS('background-color', data.color.activeElem);
        
        await expect(createAnnouncementPage.servicesButton).toBeVisible();
        await expect(createAnnouncementPage.servicesButton).toContainText("Послуги");
        await expect(createAnnouncementPage.servicesButtonNumber).toContainText(/[3]/);
        await expect(createAnnouncementPage.servicesButtonNumber)
                .toHaveCSS('background-color', data.color.inactiveElem);
        
        await expect(createAnnouncementPage.costButton).toBeVisible();
        await expect(createAnnouncementPage.costButton).toContainText("Вартість");
        await expect(createAnnouncementPage.costButtonNumber).toContainText(/[4]/);
        await expect(createAnnouncementPage.costButtonNumber)
                .toHaveCSS('background-color', data.color.inactiveElem);
        
        await expect(createAnnouncementPage.contactsButton).toBeVisible();
        await expect(createAnnouncementPage.contactsButton).toContainText("Контакти"); 
        await expect(createAnnouncementPage.contactsButtonNumber).toContainText(/[5]/);
        await expect(createAnnouncementPage.contactsButtonNumber)
                .toHaveCSS('background-color', data.color.inactiveElem);
        
        await expect(createAnnouncementPage.imageUploadTitle).toBeVisible();
        await expect(createAnnouncementPage.imageUploadTitle).toHaveText(/^Фото/, /засобу */);
        await expect(createAnnouncementPage.imageUploadAsterix).toHaveText('*');
        await expect(createAnnouncementPage.description).toBeVisible();
        await expect(createAnnouncementPage.description).toHaveText(/від 1 до/, /фото/);
    });
    test('C414 Verify next button', async ( {page, createAnnouncementPage} ) => {
        await expect(createAnnouncementPage.nextButton).toBeVisible();
        await expect(createAnnouncementPage.nextButton).toContainText('Далі');
    
        await createAnnouncementPage.clickNextButton();
        await expect(createAnnouncementPage.addInfoError).toBeVisible();

        await createAnnouncementPage.clearServisesSearchInput();
        await createAnnouncementPage.fillServisesSearchInput(data.searchService);
        await createAnnouncementPage.clickServicesSearchResultFirst()
        await createAnnouncementPage.clickNextButton();

        await expect(createAnnouncementPage.createAnnouncementTitle).toBeVisible();
        await expect(createAnnouncementPage.createAnnouncementTitle).toContainText('Створити оголошення');
        await expect(createAnnouncementPage.priceTitle).toBeVisible();
        await expect(createAnnouncementPage.priceTitle).toContainText('Вартість');

        await expect(createAnnouncementPage.mainInfoButton).toBeVisible();
        await expect(createAnnouncementPage.mainInfoButton).toContainText('Основна інформація');
        await expect(createAnnouncementPage.mainInfoButtonNumber).toContainText(/[1]/);
        await expect(createAnnouncementPage.mainInfoButtonNumber)
                .toHaveCSS('background-color', data.color.inactiveElem);
        
        await expect(createAnnouncementPage.photoButton).toBeVisible();
        await expect(createAnnouncementPage.photoButton).toContainText('Фотографії');
        await expect(createAnnouncementPage.photoButtonNumber).toContainText(/[2]/);
        await expect(createAnnouncementPage.photoButtonNumber)
                .toHaveCSS('background-color', data.color.inactiveElem);
        
        await expect(createAnnouncementPage.servicesButton).toBeVisible();
        await expect(createAnnouncementPage.servicesButton).toContainText('Послуги');
        await expect(createAnnouncementPage.servicesButtonNumber).toContainText(/[3]/);
        await expect(createAnnouncementPage.servicesButtonNumber)
                .toHaveCSS('background-color', data.color.inactiveElem);
        
        await expect(createAnnouncementPage.costButton).toBeVisible();
        await expect(createAnnouncementPage.costButton).toContainText('Вартість');
        await expect(createAnnouncementPage.costButtonNumber).toContainText(/[4]/);
        await expect(createAnnouncementPage.costButtonNumber)
                .toHaveCSS('background-color', data.color.activeElem);
        
        await expect(createAnnouncementPage.contactsButton).toBeVisible();
        await expect(createAnnouncementPage.contactsButton).toContainText('Контакти');
        await expect(createAnnouncementPage.contactsButtonNumber).toContainText(/[5]/);
        await expect(createAnnouncementPage.contactsButtonNumber)
                .toHaveCSS('background-color', data.color.inactiveElem);
        
    });
});

test.describe('Verify Cost section', () => {
    test.beforeEach(async ({ page, createAnnouncementPage, homePage, loginPage }) =>{
        await page.setViewportSize({ width: 1536, height: 980 });
        await homePage.goto("/");
        await homePage.clickLogin();
        await loginPage.login(data.validData.email, data.validData.password);
        await homePage.navigateToCreateAnnouncement();

        await createAnnouncementPage.clickCategoryInput();
        await expect(createAnnouncementPage.budivelnaTekhnikaLink).toContainText('Будівельна техніка');
        await createAnnouncementPage.click(createAnnouncementPage.budivelnaTekhnikaLink);
        await expect(createAnnouncementPage.buroviUstanovkiLink).toContainText('Бурові установки');
        await createAnnouncementPage.click(createAnnouncementPage.buroviUstanovkiLink);
        await expect(createAnnouncementPage.palebiiniUstanovkiLink).toContainText('палебійні установки');
        await createAnnouncementPage.click(createAnnouncementPage.palebiiniUstanovkiLink);
        await expect(createAnnouncementPage.categoryErrorText).not.toBeVisible()
        await createAnnouncementPage.fillUnitNameInput(data.validData.unitName);
        await createAnnouncementPage.unitNameErrorText.waitFor({state: 'hidden'})
        const manufacturerName = await data.manufacturerRandom(createAnnouncementPage)
        await createAnnouncementPage.fillVehicleManufacturerInput(manufacturerName);
        await createAnnouncementPage.clickVehicleManufacturerSearchResult();
        await createAnnouncementPage.clickLocationSelectButton();
        await createAnnouncementPage.clickMap();
        await createAnnouncementPage.clickMapPopUpSubmitButton();
        await createAnnouncementPage.vehicleLocationErrorText.waitFor({state: 'hidden'})
        await createAnnouncementPage.clickNextButton();

        await data.fileChooserFunc(createAnnouncementPage.imageUnit, data.images[0], createAnnouncementPage, page);
        await createAnnouncementPage.clickNextButton();
        await createAnnouncementPage.fillServisesSearchInput(data.searchService);
        await createAnnouncementPage.clickServicesSearchResultFirst()
        await createAnnouncementPage.clickNextButton();
    });
    test('C417 Verify Payment Method field', async ( {page, createAnnouncementPage} ) => {
        await expect(createAnnouncementPage.paymentMethodTitle).toBeVisible()
        await expect(createAnnouncementPage.paymentMethodTitle).toContainText('Спосіб оплати *')
        await expect(createAnnouncementPage.paymentMethodAsterix).toBeVisible()
        await expect(createAnnouncementPage.paymentMethodAsterix).toContainText('*')
        await expect(createAnnouncementPage.paymentMethod).toBeVisible()
        await expect(createAnnouncementPage.paymentMethod).toContainText('Готівкою / на картку')

        await createAnnouncementPage.clickPaymentMethodField()
        await expect(createAnnouncementPage.paymentMethodDropdown).toBeVisible();
        await expect(createAnnouncementPage.paymentCashOrCard).toBeVisible();
        await expect(createAnnouncementPage.paymentCashOrCard).toHaveText('Готівкою / на картку')
        await expect(createAnnouncementPage.paymentNonCashNoVAT).toBeVisible();
        await expect(createAnnouncementPage.paymentNonCashNoVAT).toHaveText('Безготівковий розрахунок (без ПДВ)')
        await expect(createAnnouncementPage.paymentNonCashWithVAT).toBeVisible();
        await expect(createAnnouncementPage.paymentNonCashWithVAT).toHaveText('Безготівковий розрахунок (з ПДВ)');

        await createAnnouncementPage.clickPaymentNonCashNoVAT();
        await expect(createAnnouncementPage.paymentMethod).toContainText('Безготівковий розрахунок (без ПДВ)');

        await createAnnouncementPage.clickPaymentMethodField();
        await createAnnouncementPage.clickPaymentNonCashWithVAT();
        await expect(createAnnouncementPage.paymentMethod).toHaveText('Безготівковий розрахунок (з ПДВ)');

        await createAnnouncementPage.clickPaymentMethodField();
        await createAnnouncementPage.clickPaymentCashOrCard();
        await expect(createAnnouncementPage.paymentMethod).toHaveText('Готівкою / на картку')
    })
    test('C418 Verify min order cost section', async ( {page, createAnnouncementPage} ) => {
        await expect(createAnnouncementPage.minCostTitle).toBeVisible();
        await expect(createAnnouncementPage.minCostTitle).toHaveText('Вартість мінімального замовлення *');
        await expect(createAnnouncementPage.minCostAsterix).toBeVisible();
        await expect(createAnnouncementPage.minCostAsterix).toHaveText('*');
        await expect(createAnnouncementPage.minCostInput).toHaveAttribute('placeholder','Наприклад, 1000');

        await createAnnouncementPage.clearMinCostField()
        await createAnnouncementPage.fillMinCostField(data.invalidData.text3);
        let obtainedText = await createAnnouncementPage.minCostInput.getAttribute('value');
        expect(obtainedText?.length).toEqual(0);

        await createAnnouncementPage.minCostInput.click()
        await createAnnouncementPage.clearMinCostField();
        await createAnnouncementPage.copyPaste(
            createAnnouncementPage.minCostInput, 
            data.invalidData.text3);
        let obtainedValue = await createAnnouncementPage.minCostInput.getAttribute('value');
        await expect(obtainedValue?.length).toEqual(0);

        await createAnnouncementPage.clearMinCostField()
        await createAnnouncementPage.fillMinCostField(data.invalidData.symbols);
        obtainedValue = await createAnnouncementPage.minCostInput.getAttribute('value');
        expect(obtainedValue?.length).toEqual(0);

        await createAnnouncementPage.minCostInput.click()
        await createAnnouncementPage.clearMinCostField();
        await createAnnouncementPage.copyPaste(
            createAnnouncementPage.minCostInput, 
            data.invalidData.symbols);
        obtainedValue = await createAnnouncementPage.minCostInput.getAttribute('value');
        await expect(obtainedValue?.length).toEqual(0);
        
        await createAnnouncementPage.minCostInput.click()
        await createAnnouncementPage.fillMinCostField(data.invalidData.digits(15))
        obtainedValue = await createAnnouncementPage.minCostInput.getAttribute('value')
        await createAnnouncementPage.minCostInput.click()
        await expect(obtainedValue?.length).toBeLessThanOrEqual(9)

        await createAnnouncementPage.clearMinCostField();
        await createAnnouncementPage.copyPaste(
            createAnnouncementPage.minCostInput,
            data.invalidData.digits(15));
        expect(obtainedValue?.length).toBe(9);

        await createAnnouncementPage.minCostInput.click();
        await createAnnouncementPage.fillMinCostField(data.invalidData.digitsSpaceEnd);
        obtainedValue = await createAnnouncementPage.minCostInput.getAttribute('value');
        let result = obtainedValue?.match(/[0-9]/)? true : false;
        expect(result == true).toBeTruthy();

        await createAnnouncementPage.clearMinCostField();
        await createAnnouncementPage.copyPaste(
            createAnnouncementPage.minCostInput, 
            data.invalidData.digitsSpaceEnd);
        result = obtainedValue?.match(/[0-9]/)? true : false;
        expect(result == true).toBeTruthy();
        
        await createAnnouncementPage.clearMinCostField()
        await createAnnouncementPage.fillMinCostField(data.invalidData.digitsSpaceInside);
        obtainedValue = await createAnnouncementPage.minCostInput.getAttribute('value');
        result = obtainedValue?.match(/[0-9]/)? true : false;
        expect(result == true).toBeTruthy();

        await createAnnouncementPage.clearMinCostField();
        await createAnnouncementPage.copyPaste(
            createAnnouncementPage.minCostInput, 
            data.invalidData.digitsSpaceInside);
        obtainedValue = await createAnnouncementPage.minCostInput.getAttribute('value');
        result = obtainedValue?.match(/[0-9]/)? true : false;
        expect(result).toBeTruthy();
        
        await createAnnouncementPage.clearMinCostField()
        let incertedValue = data.validData.digits(9);
        await createAnnouncementPage.fillMinCostField(incertedValue);
        obtainedValue = await createAnnouncementPage.minCostInput.getAttribute('value');
        expect(incertedValue == obtainedValue).toBeTruthy();

        await createAnnouncementPage.clearMinCostField();
        await createAnnouncementPage.copyPaste(
            createAnnouncementPage.minCostInput, 
            incertedValue);
        obtainedValue = await createAnnouncementPage.minCostInput.getAttribute('value');
        expect(incertedValue == obtainedValue).toBeTruthy();

        await expect(createAnnouncementPage.currencyField).toBeVisible();
        await expect(createAnnouncementPage.currencyField).toHaveAttribute('value','UAH');
    });
    test('C488 Verify prev button', async ( {page, createAnnouncementPage} ) => {
        await expect(createAnnouncementPage.prevButton).toHaveText("Назад");
        await createAnnouncementPage.clickPrevButton()
        await expect(createAnnouncementPage.createAnnouncementTitle).toBeVisible();
        await expect(createAnnouncementPage.createAnnouncementTitle).toContainText('Створити оголошення');

        await expect(createAnnouncementPage.servisesHeader).toBeVisible();
        await expect(createAnnouncementPage.servisesHeader).toHaveText('Послуги');

        await expect(createAnnouncementPage.mainInfoButton).toContainText("Основна інформація");
        await expect(createAnnouncementPage.mainInfoButton).toBeVisible();
        await expect(createAnnouncementPage.mainInfoButtonNumber).toContainText(/[1]/);
        await expect(createAnnouncementPage.mainInfoButtonNumber).toHaveCSS(
            "background-color",
            data.color.inactiveElem
        );

        await expect(createAnnouncementPage.photoButton).toBeVisible();
        await expect(createAnnouncementPage.photoButton).toContainText("Фотографії");
        await expect(createAnnouncementPage.photoButtonNumber).toContainText(/[2]/);
        await expect(createAnnouncementPage.photoButtonNumber).toHaveCSS(
            "background-color",
            data.color.inactiveElem
        );

        await expect(createAnnouncementPage.servicesButton).toBeVisible();
        await expect(createAnnouncementPage.servicesButton).toContainText("Послуги");
        await expect(createAnnouncementPage.servicesButtonNumber).toContainText(/[3]/);
        await expect(createAnnouncementPage.servicesButtonNumber).toHaveCSS(
            "background-color",
            data.color.activeElem
        );
        
        await expect(createAnnouncementPage.costButton).toBeVisible();
        await expect(createAnnouncementPage.costButton).toContainText("Вартість");
        await expect(createAnnouncementPage.costButtonNumber).toContainText(/[4]/);
        await expect(createAnnouncementPage.costButtonNumber).toHaveCSS(
            "background-color",
            data.color.inactiveElem
        );

        await expect(createAnnouncementPage.contactsButton).toBeVisible();
        await expect(createAnnouncementPage.contactsButton).toContainText("Контакти");  
        await expect(createAnnouncementPage.contactsButtonNumber).toContainText(/[5]/);
        await expect(createAnnouncementPage.contactsButtonNumber).toHaveCSS(
            "background-color",
            data.color.inactiveElem
        );
        
    })
    test('C489 Verify next button', async ( {page, createAnnouncementPage} ) => {
        await expect(createAnnouncementPage.nextButton).toContainText('Далі');
        await createAnnouncementPage.clickNextButton();
        
        await expect(createAnnouncementPage.minCostFieldError).toHaveText(data.text.requiredField)
        await expect(createAnnouncementPage.minCostFieldError).toHaveCSS('color',data.color.error)
        await expect(createAnnouncementPage.minCostField).toHaveCSS('border', data.color.errorBorder)

        await createAnnouncementPage.fillMinCostField(data.validData.digits(9));
        await createAnnouncementPage.clickNextButton();
        
        await expect(createAnnouncementPage.createAnnouncementTitle).toBeVisible();
        await expect(createAnnouncementPage.createAnnouncementTitle).toContainText('Створити оголошення');

        await expect(createAnnouncementPage.contactsHeader).toBeVisible();
        await expect(createAnnouncementPage.contactsHeader).toHaveText('Ваші контакти');

        await expect(createAnnouncementPage.mainInfoButton).toContainText("Основна інформація");
        await expect(createAnnouncementPage.mainInfoButton).toBeVisible();
        await expect(createAnnouncementPage.mainInfoButtonNumber).toContainText(/[1]/);
        await expect(createAnnouncementPage.mainInfoButtonNumber).toHaveCSS(
            "background-color",
            data.color.inactiveElem
        );

        await expect(createAnnouncementPage.photoButton).toBeVisible();
        await expect(createAnnouncementPage.photoButton).toContainText("Фотографії");
        await expect(createAnnouncementPage.photoButtonNumber).toContainText(/[2]/);
        await expect(createAnnouncementPage.photoButtonNumber).toHaveCSS(
            "background-color",
            data.color.inactiveElem
        );

        await expect(createAnnouncementPage.servicesButton).toBeVisible();
        await expect(createAnnouncementPage.servicesButton).toContainText("Послуги");
        await expect(createAnnouncementPage.servicesButtonNumber).toContainText(/[3]/);
        await expect(createAnnouncementPage.servicesButtonNumber).toHaveCSS(
            "background-color",
            data.color.inactiveElem
        );
        
        await expect(createAnnouncementPage.costButton).toBeVisible();
        await expect(createAnnouncementPage.costButton).toContainText("Вартість");
        await expect(createAnnouncementPage.costButtonNumber).toContainText(/[4]/);
        await expect(createAnnouncementPage.costButtonNumber).toHaveCSS(
            "background-color",
            data.color.inactiveElem
        );

        await expect(createAnnouncementPage.contactsButton).toBeVisible();
        await expect(createAnnouncementPage.contactsButton).toContainText("Контакти");  
        await expect(createAnnouncementPage.contactsButtonNumber).toContainText(/[5]/);
        await expect(createAnnouncementPage.contactsButtonNumber).toHaveCSS(
            "background-color",
            data.color.activeElem
        );
    });
});

test.describe('Verify Contacts section', () => {
    test.beforeEach(async ({ page, createAnnouncementPage, homePage, loginPage }) =>{
        await page.setViewportSize({ width: 1536, height: 980 });
        await homePage.goto("/");
        await homePage.clickLogin();
        await loginPage.login(data.validData.email, data.validData.password);
        await homePage.navigateToCreateAnnouncement();

        await createAnnouncementPage.clickCategoryInput();
        await expect(createAnnouncementPage.budivelnaTekhnikaLink).toContainText('Будівельна техніка');
        await createAnnouncementPage.click(createAnnouncementPage.budivelnaTekhnikaLink);
        await expect(createAnnouncementPage.buroviUstanovkiLink).toContainText('Бурові установки');
        await createAnnouncementPage.click(createAnnouncementPage.buroviUstanovkiLink);
        await expect(createAnnouncementPage.palebiiniUstanovkiLink).toContainText('палебійні установки');
        await createAnnouncementPage.click(createAnnouncementPage.palebiiniUstanovkiLink);
        await expect(createAnnouncementPage.categoryErrorText).not.toBeVisible()
        await createAnnouncementPage.fillUnitNameInput(data.validData.unitName);
        await createAnnouncementPage.unitNameErrorText.waitFor({state: 'hidden'});
        const manufacturerName = await data.manufacturerRandom(createAnnouncementPage);
        await createAnnouncementPage.fillVehicleManufacturerInput(manufacturerName);
        await createAnnouncementPage.clickVehicleManufacturerSearchResult();
        await createAnnouncementPage.clickLocationSelectButton();
        await createAnnouncementPage.clickMap();
        await createAnnouncementPage.clickMapPopUpSubmitButton();
        await createAnnouncementPage.vehicleLocationErrorText.waitFor({state: 'hidden'});
        await createAnnouncementPage.clickNextButton();

        await data.fileChooserFunc(createAnnouncementPage.imageUnit, data.images[0], createAnnouncementPage, page);
        await createAnnouncementPage.clickNextButton();
        await createAnnouncementPage.fillServisesSearchInput(data.searchService);
        await createAnnouncementPage.clickServicesSearchResultFirst();
        await createAnnouncementPage.clickNextButton();
        await createAnnouncementPage.fillMinCostField(data.validData.digits(9));
        await createAnnouncementPage.clickNextButton();
    })
    test('C536 Verify contact card block', async ({page, createAnnouncementPage, homePage, profilePage}) => {
        await expect(createAnnouncementPage.contactsHeader).toBeVisible();
        await expect(createAnnouncementPage.contactsHeader).toHaveText('Ваші контакти');

        await profilePage.myProfileLeftSideBarLink.click();
        page.on('dialog', dialog => dialog.accept());
        const profileName = await profilePage.myProfileName.getAttribute('value');
        const profileSurname = await profilePage.myProfileSurname.getAttribute('value');
        const profileFathername = await profilePage.myProfileFatherName.getAttribute('value');
        const profileTaxNumber = await profilePage.myProfileEdrpou.getAttribute('value');
        const profileCellPhoneString: any = await profilePage.profileNumberInput.getAttribute('value');
        const profileCellPhone = profileCellPhoneString.replaceAll(' ', '');
        const profileEmail = await profilePage.myProfileEmail.getAttribute('value');

        await homePage.navigateToCreateAnnouncement();
        await createAnnouncementPage.contactsButton.click();
        const contactsNameString: any = await createAnnouncementPage.myContactsSurname.textContent();
        const contactsEdrpouString: any = await createAnnouncementPage.myContactsEdrpou.textContent();
        const contactsName = (contactsNameString.split(' '))[0];
        const contactsSurname = (contactsNameString.split(' '))[1];
        const contactsFatherName = (contactsNameString.split(' '))[2];
        const contactsEdrpou = (contactsEdrpouString.split(' '))[1];
        const contactsCellPhone = await createAnnouncementPage.myContactsCellPhone.textContent();
        const ContactsEmail = await createAnnouncementPage.myContactsEmail.textContent();

        expect(profileSurname == contactsSurname).toBeTruthy();
        expect(profileName == contactsName).toBeTruthy();
        expect(profileFathername == contactsFatherName).toBeTruthy();
        expect(profileTaxNumber == contactsEdrpou).toBeTruthy();
        expect(profileCellPhone == contactsCellPhone).toBeTruthy();
        expect(profileEmail == ContactsEmail).toBeTruthy();
    });
    test('C537_1 Verify operator section: UI', async( {createAnnouncementPage} ) => {
        await expect(createAnnouncementPage.operatorContactsTitle).toHaveText('Контакти оператора');
        await expect(createAnnouncementPage.operatorCheckBox).toBeChecked();
        await expect(createAnnouncementPage.checkBoxLabel).toHaveText(/Я оператор/, /засобу/);
        await expect(createAnnouncementPage.lastNameTitle).not.toBeVisible();
        await expect(createAnnouncementPage.operatorLastNameField).not.toBeVisible();
        await expect(createAnnouncementPage.firstNameTitle).not.toBeVisible();
        await expect(createAnnouncementPage.operatorFirstNameField).not.toBeVisible();
        await expect(createAnnouncementPage.operatorMobileTitle).not.toBeVisible();
        await expect(createAnnouncementPage.operatorMobileField).not.toBeVisible();

        await createAnnouncementPage.clickCheckBoxLabel();
        await expect(createAnnouncementPage.operatorCheckBox).not.toBeChecked();
        await expect(createAnnouncementPage.lastNameTitle).toHaveText('Прізвище *');
        await expect(createAnnouncementPage.operatorLastNameField).toBeVisible();
        await expect(createAnnouncementPage.operatorLastNameField).toHaveCSS('border-color', data.color.error);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).toContainText(data.text.requiredField);
        await expect(createAnnouncementPage.firstNameTitle).toHaveText('Ім’я *');
        await expect(createAnnouncementPage.operatorFirstNameField).toBeVisible();
        await expect(createAnnouncementPage.operatorFirstNameField).toHaveCSS('border-color', data.color.error);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).toContainText(data.text.requiredField);;
        await expect(createAnnouncementPage.operatorMobileTitle).toHaveText('Телефон *');
        await expect(createAnnouncementPage.operatorMobileField).toBeVisible();
        await expect(createAnnouncementPage.operatorMobileField).toHaveCSS('border-color', data.color.error);
        await expect(createAnnouncementPage.operatorMobileFieldErr).toContainText(data.text.requiredField);
    });
    test('C537_2 Verify operator section: Last Name Field', async( {page, createAnnouncementPage} ) => {
        await createAnnouncementPage.clickCheckBoxLabel();
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.fillOperatorLastNameField(data.invalidData.text1);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).toContainText(data.text.notLess2Symbols);
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.fillOperatorLastNameField(data.invalidData.text26);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).toContainText(data.text.notMore25Symbols);
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.fillOperatorLastNameField(data.invalidData.digits(9));
        await expect(createAnnouncementPage.operatorLastNameFieldErr).toContainText(data.text.onlyLetters);
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.fillOperatorLastNameField(data.invalidData.symbols);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).toContainText(data.text.onlyLetters);
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.fillOperatorLastNameField(data.invalidData.space);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).toContainText(data.text.onlyLetters);
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.fillOperatorLastNameField(data.invalidData.textSpaceEnd);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).toContainText(data.text.onlyLetters);
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.fillOperatorLastNameField(data.invalidData.textSpaceInside);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).toContainText(data.text.onlyLetters);

        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorLastNameField,data.invalidData.text1);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).toContainText(data.text.notLess2Symbols);
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorLastNameField, data.invalidData.text26);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).toContainText(data.text.notMore25Symbols);
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorLastNameField, data.invalidData.digits(9));
        await expect(createAnnouncementPage.operatorLastNameFieldErr).toContainText(data.text.onlyLetters);
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorLastNameField, data.invalidData.symbols);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).toContainText(data.text.onlyLetters);
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorLastNameField, data.invalidData.space);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).toContainText(data.text.onlyLetters);
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorLastNameField, data.invalidData.textSpaceEnd);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).toContainText(data.text.onlyLetters);
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorLastNameField, data.invalidData.textSpaceInside);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).toContainText(data.text.onlyLetters);

        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.fillOperatorLastNameField(data.validData.text2);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).not.toBeVisible();
        await expect(createAnnouncementPage.operatorLastNameField).toHaveCSS('border', data.color.noErrorBorder);
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.fillOperatorLastNameField(data.validData.cyrillic);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).not.toBeVisible();
        await expect(createAnnouncementPage.operatorLastNameField).toHaveCSS('border', data.color.noErrorBorder);
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.fillOperatorLastNameField(data.validData.text25);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).not.toBeVisible();
        await expect(createAnnouncementPage.operatorLastNameField).toHaveCSS('border', data.color.noErrorBorder);
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.fillOperatorLastNameField(data.validData.textDash);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).not.toBeVisible();
        await expect(createAnnouncementPage.operatorLastNameField).toHaveCSS('border', data.color.noErrorBorder);
    
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorLastNameField, data.validData.text2);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).not.toBeVisible();
        await expect(createAnnouncementPage.operatorLastNameField).toHaveCSS('border', data.color.noErrorBorder);
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorLastNameField, data.validData.cyrillic);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).not.toBeVisible();
        await expect(createAnnouncementPage.operatorLastNameField).toHaveCSS('border', data.color.noErrorBorder);
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorLastNameField, data.validData.text25);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).not.toBeVisible();
        await expect(createAnnouncementPage.operatorLastNameField).toHaveCSS('border', data.color.noErrorBorder);
        await createAnnouncementPage.clearOperatorLastNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorLastNameField, data.validData.textDash);
        await expect(createAnnouncementPage.operatorLastNameFieldErr).not.toBeVisible();
        await expect(createAnnouncementPage.operatorLastNameField).toHaveCSS('border', data.color.noErrorBorder);
    });
    test('C537_3 Verify operator section: First Name Field', async( {createAnnouncementPage} ) => {
        await createAnnouncementPage.clickCheckBoxLabel();
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.fillOperatorFirstNameField(data.invalidData.text1);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).toContainText(data.text.notLess2Symbols);
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.fillOperatorFirstNameField(data.invalidData.text26);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).toContainText(data.text.notMore25Symbols);
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.fillOperatorFirstNameField(data.invalidData.digits(9));
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).toContainText(data.text.onlyLetters);
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.fillOperatorFirstNameField(data.invalidData.symbols);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).toContainText(data.text.onlyLetters);
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.fillOperatorFirstNameField(data.invalidData.space);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).toContainText(data.text.onlyLetters);
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.fillOperatorFirstNameField(data.invalidData.textSpaceEnd);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).toContainText(data.text.onlyLetters);
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.fillOperatorFirstNameField(data.invalidData.textSpaceInside);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).toContainText(data.text.onlyLetters);

        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorFirstNameField,data.invalidData.text1);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).toContainText(data.text.notLess2Symbols);
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorFirstNameField, data.invalidData.text26);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).toContainText(data.text.notMore25Symbols);
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorFirstNameField, data.invalidData.digits(9));
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).toContainText(data.text.onlyLetters);
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorFirstNameField, data.invalidData.symbols);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).toContainText(data.text.onlyLetters);
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorFirstNameField, data.invalidData.space);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).toContainText(data.text.onlyLetters);
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorFirstNameField, data.invalidData.textSpaceEnd);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).toContainText(data.text.onlyLetters);
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorFirstNameField, data.invalidData.textSpaceInside);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).toContainText(data.text.onlyLetters);

        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.fillOperatorFirstNameField(data.validData.text2);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).not.toBeVisible();
        await expect(createAnnouncementPage.operatorFirstNameField).toHaveCSS('border', data.color.noErrorBorder);
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.fillOperatorFirstNameField(data.validData.cyrillic);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).not.toBeVisible();
        await expect(createAnnouncementPage.operatorFirstNameField).toHaveCSS('border', data.color.noErrorBorder);
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.fillOperatorFirstNameField(data.validData.text25);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).not.toBeVisible();
        await expect(createAnnouncementPage.operatorFirstNameField).toHaveCSS('border', data.color.noErrorBorder);
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.fillOperatorFirstNameField(data.validData.textDash);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).not.toBeVisible();
        await expect(createAnnouncementPage.operatorFirstNameField).toHaveCSS('border', data.color.noErrorBorder);
    
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorFirstNameField, data.validData.text2);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).not.toBeVisible();
        await expect(createAnnouncementPage.operatorFirstNameField).toHaveCSS('border', data.color.noErrorBorder);
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorFirstNameField, data.validData.cyrillic);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).not.toBeVisible();
        await expect(createAnnouncementPage.operatorFirstNameField).toHaveCSS('border', data.color.noErrorBorder);
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorFirstNameField, data.validData.text25);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).not.toBeVisible();
        await expect(createAnnouncementPage.operatorFirstNameField).toHaveCSS('border', data.color.noErrorBorder);
        await createAnnouncementPage.clearOperatorFirstNameField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorFirstNameField, data.validData.textDash);
        await expect(createAnnouncementPage.operatorFirstNameFieldErr).not.toBeVisible();
        await expect(createAnnouncementPage.operatorFirstNameField).toHaveCSS('border', data.color.noErrorBorder);
    });
    test('C537_4 Verify operator section: Operator Mobile Field', async( {createAnnouncementPage} ) => {
        await createAnnouncementPage.clickCheckBoxLabel();
        await createAnnouncementPage.clearOperatorMobileField();
        await createAnnouncementPage.clickOperatorMobileField();
        await expect(createAnnouncementPage.operatorMobileField).toHaveValue('+380');
        await createAnnouncementPage.clearOperatorMobileField();
        await createAnnouncementPage.fillOperatorMobileField(data.invalidData.digits(2));
        await expect(createAnnouncementPage.operatorMobileFieldErr).toContainText(data.text.enterCorrectNumber);
        await createAnnouncementPage.clearOperatorMobileField();
        await createAnnouncementPage.fillOperatorMobileField(data.invalidData.digits(10));
        await expect(createAnnouncementPage.operatorMobileFieldErr).toContainText(data.text.enterCorrectNumber);
        await createAnnouncementPage.clearOperatorMobileField();
        await createAnnouncementPage.fillOperatorMobileField(data.invalidData.text10);
        await expect(createAnnouncementPage.operatorMobileFieldErr).toContainText(data.text.requiredField);
        await createAnnouncementPage.clearOperatorMobileField();
        await createAnnouncementPage.fillOperatorMobileField(data.invalidData.symbols);
        await expect(createAnnouncementPage.operatorMobileFieldErr).toContainText(data.text.requiredField);
        await createAnnouncementPage.clearOperatorMobileField();
        await createAnnouncementPage.fillOperatorMobileField(data.invalidData.space);
        await expect(createAnnouncementPage.operatorMobileFieldErr).toContainText(data.text.requiredField);

        await createAnnouncementPage.clearOperatorMobileField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorMobileField, data.invalidData.digits(2));
        await expect(createAnnouncementPage.operatorMobileFieldErr).toContainText(data.text.enterCorrectNumber);
        await createAnnouncementPage.clearOperatorMobileField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorMobileField, data.invalidData.digits(10));
        await expect(createAnnouncementPage.operatorMobileFieldErr).toContainText(data.text.enterCorrectNumber);
        await createAnnouncementPage.clearOperatorMobileField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorMobileField, data.invalidData.text10);
        await expect(createAnnouncementPage.operatorMobileFieldErr).toContainText(data.text.enterCorrectNumber);
        await createAnnouncementPage.clearOperatorMobileField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorMobileField, data.invalidData.symbols);
        await expect(createAnnouncementPage.operatorMobileFieldErr).toContainText(data.text.enterCorrectNumber);
        await createAnnouncementPage.clearOperatorMobileField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorMobileField, data.invalidData.space);
        await expect(createAnnouncementPage.operatorMobileFieldErr).toContainText(data.text.enterCorrectNumber);

        await createAnnouncementPage.clearOperatorMobileField();
        const mobile = await data.mobileNumber();
        await createAnnouncementPage.fillOperatorMobileField(mobile);

        await createAnnouncementPage.clearOperatorMobileField();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.operatorMobileField, mobile);
    });
})