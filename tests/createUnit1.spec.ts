import { expect } from "@playwright/test";
import { test } from "../utils/fixtures"; 
import { images, validData, manufacturerRandom, fileChooserFunc, invalidData, color, searchService, newService} from "../testData/unitData";

let allImagesBlocks: any;

test.describe("Test create_unit page 1", async () => {
    
    test.beforeEach(async ({ page, createAnnouncementPage, homePage, loginPage }) =>{
        await page.setViewportSize({ width: 1536, height: 980 });
        await homePage.goto("/");
        await homePage.clickLogin();
        await loginPage.login(validData.email, validData.password);
        await homePage.navigateToCreateAnnouncement();

        await createAnnouncementPage.clickCategoryInput();
        await expect(createAnnouncementPage.budivelnaTekhnikaLink).toContainText('Будівельна техніка');
        await createAnnouncementPage.click(createAnnouncementPage.budivelnaTekhnikaLink);
        await expect(createAnnouncementPage.buroviUstanovkiLink).toContainText('Бурові установки');
        await createAnnouncementPage.click(createAnnouncementPage.buroviUstanovkiLink);
        await expect(createAnnouncementPage.palebiiniUstanovkiLink).toContainText('палебійні установки');
        await createAnnouncementPage.click(createAnnouncementPage.palebiiniUstanovkiLink);
        await expect(createAnnouncementPage.categoryErrorText).not.toBeVisible()
        await createAnnouncementPage.fillUnitNameInput(validData.unitName);
        await expect(createAnnouncementPage.unitNameErrorText).not.toBeVisible()
        const manufacturerName = await manufacturerRandom(createAnnouncementPage)
        await createAnnouncementPage.fillVehicleManufacturerInput(manufacturerName);
        await createAnnouncementPage.clickVehicleManufacturerSearchResult();
        await expect(createAnnouncementPage.vehicleManufacturerErrorText).not.toBeVisible()
        await createAnnouncementPage.clickLocationSelectButton();
        await createAnnouncementPage.clickMap();
        await createAnnouncementPage.clickMapPopUpSubmitButton();
        await expect(createAnnouncementPage.vehicleLocationErrorText).not.toBeVisible()
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
            await fileChooserFunc(allImagesBlocks[i], images[0], createAnnouncementPage, page);
            await expect(createAnnouncementPage.mainImageLabel).toBeVisible();
            await createAnnouncementPage.imageUnit.hover();
            await expect(createAnnouncementPage.imageDelete).toBeVisible();
            await createAnnouncementPage.imageDelete.click();
        };

        await fileChooserFunc(createAnnouncementPage.imageUnit, images[0], createAnnouncementPage, page);
        await expect(createAnnouncementPage.mainImageLabel).toBeVisible();
        await expect(createAnnouncementPage.mainImageLabel).toHaveText('Головне');
        await createAnnouncementPage.imageUnit.hover();
        await expect(createAnnouncementPage.imageDelete).toBeVisible();
        await createAnnouncementPage.imageDelete.click();

        const fileChooserPromise = page.waitForEvent('filechooser');
        await createAnnouncementPage.clickImageUnit();
        const fileChooser = await fileChooserPromise;
        fileChooser.isMultiple();
        await fileChooser.setFiles(images, {timeout: 10000});
        expect(images.length).toEqual(16);

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
            await fileChooserFunc(
                allImagesBlocks[i],
                images[0],
                createAnnouncementPage,
                page
            );
            await allImagesBlocks[i].focus();
        }
        await expect(createAnnouncementPage.popUpError).toHaveText(/завантажити двічі/);
        await createAnnouncementPage.clickPopUpCloseIcon();
        await expect(createAnnouncementPage.imageUploadedAll).toHaveCount(1);

        await fileChooserFunc(
            allImagesBlocks[1],
            images[0],
            createAnnouncementPage,
            page
        );
        await allImagesBlocks[1].focus();
        await expect(createAnnouncementPage.popUpError).toHaveText(/завантажити двічі/);
        await createAnnouncementPage.clickPopUpSaveBtn();
        await expect(createAnnouncementPage.imageUploadedAll).toHaveCount(1);

        await fileChooserFunc(
            allImagesBlocks[1],
            images[0],
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
        await fileChooserFunc(
            createAnnouncementPage.imageUnit,
            invalidData.fileType,
            createAnnouncementPage,
            page
        );
        await createAnnouncementPage.imageUnit.focus();
        await expect(createAnnouncementPage.popUpInvalidImageError).toHaveText(/не підтримується/);
        await createAnnouncementPage.clickPopUpInvalidImageCloseIcon();
        await expect(createAnnouncementPage.popUpInvalidImage).not.toBeVisible();
        await expect(createAnnouncementPage.imageUploadedAll).toHaveCount(0);

        await fileChooserFunc(
            createAnnouncementPage.imageUnit,
            invalidData.fileType,
            createAnnouncementPage,
            page
        );
        await createAnnouncementPage.imageUnit.focus();
        await createAnnouncementPage.clickPopUpInvalidImageSaveBtn();
        await expect(createAnnouncementPage.popUpInvalidImage).not.toBeVisible();
        await expect(createAnnouncementPage.imageUploadedAll).toHaveCount(0);

        await fileChooserFunc(
            createAnnouncementPage.imageUnit,
            invalidData.fileType,
            createAnnouncementPage,
            page
        );
        await createAnnouncementPage.imageUnit.focus();
        await page.mouse.click(0, 0);
        await expect(createAnnouncementPage.popUpInvalidImage).not.toBeVisible();
        await expect(createAnnouncementPage.imageUploadedAll).toHaveCount(0);
    });
    test("C405 Verify uploading of invalid size file", async ({ page, createAnnouncementPage }) => {
        await fileChooserFunc(
            createAnnouncementPage.imageUnit,
            invalidData.fileSize,
            createAnnouncementPage,
            page
        );
        await createAnnouncementPage.imageUnit.focus();
        await expect(createAnnouncementPage.popUpInvalidImageError).toHaveText(/не підтримується/);
        await createAnnouncementPage.clickPopUpInvalidImageCloseIcon();
        await expect(createAnnouncementPage.popUpInvalidImage).not.toBeVisible();
        await expect(createAnnouncementPage.imageUploadedAll).toHaveCount(0);

        await fileChooserFunc(
            createAnnouncementPage.imageUnit,
            invalidData.fileSize,
            createAnnouncementPage,
            page
        );
        await createAnnouncementPage.imageUnit.focus();
        await createAnnouncementPage.clickPopUpInvalidImageSaveBtn();
        await expect(createAnnouncementPage.popUpInvalidImage).not.toBeVisible();
        await expect(createAnnouncementPage.imageUploadedAll).toHaveCount(0);

        await fileChooserFunc(
            createAnnouncementPage.imageUnit,
            invalidData.fileSize,
            createAnnouncementPage,
            page
        );
        await createAnnouncementPage.imageUnit.focus();
        await page.mouse.click(0, 0);
        await expect(createAnnouncementPage.popUpInvalidImage).not.toBeVisible();
        await expect(createAnnouncementPage.imageUploadedAll).toHaveCount(0);
    });
    test("C390 Verify Prev button", async ({ page, createAnnouncementPage }) => {
        await expect(createAnnouncementPage.prevButton).toHaveText("Назад");
        await createAnnouncementPage.clickPrevButton();
        await expect(createAnnouncementPage.mainInfoHeader).toBeVisible();
        await expect(createAnnouncementPage.mainInfoHeader).toHaveText("Основна інформація");

        await expect(createAnnouncementPage.mainInfoButton).toBeVisible();
        await expect(createAnnouncementPage.mainInfoButtonNumber).toHaveCSS(
            "background-color",
            color.activeElem
        );
        await expect(createAnnouncementPage.photoButton).toBeVisible();
        await expect(createAnnouncementPage.photoButtonNumber).toHaveCSS(
            "background-color",
            color.inactiveElem
        );
        await expect(createAnnouncementPage.servicesButton).toBeVisible();
        await expect(createAnnouncementPage.servicesButtonNumber).toHaveCSS(
            "background-color",
            color.inactiveElem
        );
        await expect(createAnnouncementPage.costButton).toBeVisible();
        await expect(createAnnouncementPage.costButtonNumber).toHaveCSS(
            "background-color",
            color.inactiveElem
        );
        await expect(createAnnouncementPage.contactsButton).toBeVisible();
        await expect(createAnnouncementPage.contactsButtonNumber).toHaveCSS(
            "background-color",
            color.inactiveElem
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
        await expect(createAnnouncementPage.description).toHaveCSS('color', color.error);

        await fileChooserFunc(createAnnouncementPage.imageUnit, images[0], createAnnouncementPage, page)
        await createAnnouncementPage.clickNextButton();
        await expect(createAnnouncementPage.createAnnouncementTitle).toBeVisible();
        await expect(createAnnouncementPage.createAnnouncementTitle).toContainText('Створити оголошення');

        await expect(createAnnouncementPage.servisesHeader).toBeVisible();
        await expect(createAnnouncementPage.servisesHeader).toHaveText('Послуги');
        await expect(createAnnouncementPage.mainInfoButton).toBeVisible();
        await expect(createAnnouncementPage.mainInfoButtonNumber).toContainText(/[1]/);
        await expect(createAnnouncementPage.mainInfoButtonNumber).toHaveCSS(
            "background-color",
            color.inactiveElem
        );
        await expect(createAnnouncementPage.mainInfoButton).toContainText("Основна інформація");
        await expect(createAnnouncementPage.photoButton).toBeVisible();
        await expect(createAnnouncementPage.photoButtonNumber).toContainText(/[2]/);
        await expect(createAnnouncementPage.photoButtonNumber).toHaveCSS(
            "background-color",
            color.inactiveElem
        );
        await expect(createAnnouncementPage.photoButton).toContainText("Фотографії");
        await expect(createAnnouncementPage.servicesButton).toBeVisible();
        await expect(createAnnouncementPage.servicesButtonNumber).toContainText(/[3]/);
        await expect(createAnnouncementPage.servicesButtonNumber).toHaveCSS(
            "background-color",
            color.activeElem
        );
        await expect(createAnnouncementPage.servicesButton).toContainText("Послуги");
        await expect(createAnnouncementPage.costButton).toBeVisible();
        await expect(createAnnouncementPage.costButtonNumber).toContainText(/[4]/);
        await expect(createAnnouncementPage.costButtonNumber).toHaveCSS(
            "background-color",
            color.inactiveElem
        );
        await expect(createAnnouncementPage.costButton).toContainText("Вартість");
        await expect(createAnnouncementPage.contactsButton).toBeVisible();
        await expect(createAnnouncementPage.contactsButtonNumber).toContainText(/[5]/);
        await expect(createAnnouncementPage.contactsButtonNumber).toHaveCSS(
            "background-color",
            color.inactiveElem
        );
        await expect(createAnnouncementPage.contactsButton).toContainText("Контакти");  
        await expect(createAnnouncementPage.servicesSearchField).toBeVisible();
    })
    test('C409 Verify input section and choosing of existing sevice', async ( {page, createAnnouncementPage} ) => {
        await fileChooserFunc(
            createAnnouncementPage.imageUnit,
            images[0],
            createAnnouncementPage,
            page
        );
        await createAnnouncementPage.clickNextButton();

        await expect(createAnnouncementPage.servicesInputTitle).toBeVisible();
        await expect(createAnnouncementPage.servicesInputTitle).toHaveText(/^Знайдіть/, /\*/);
        await expect(createAnnouncementPage.servicesClueLine).toBeVisible();
        await expect(createAnnouncementPage.servicesClueLine).toHaveText(/^Додайте/, /1 послугу/);
        await expect(createAnnouncementPage.servicesSearchLoop).toBeVisible();
        await expect(createAnnouncementPage.servicesSearchInput).toBeVisible();
        await expect(createAnnouncementPage.servicesSearchInput)
              .toHaveAttribute("placeholder", /Наприклад/);

        await createAnnouncementPage.fillServisesSearchInput(invalidData.text101);
        await expect(createAnnouncementPage.symbolsCounter).toContainText(
            `${invalidData.text101.slice(0, -1).length} / 100`
        );

        await createAnnouncementPage.clearServisesSearchInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.servicesSearchInput,
            invalidData.text101);
        await expect(createAnnouncementPage.symbolsCounter).toContainText(
            `${invalidData.text101.slice(0, -1).length} / 100`);

        await createAnnouncementPage.clearServisesSearchInput();
        await createAnnouncementPage.fillServisesSearchInput(validData.letter);
        await expect(createAnnouncementPage.servicesSearchDropdown).toBeVisible();
        const minSearchSymbolsAmount =
            await createAnnouncementPage.servicesSearchInput.getAttribute(
                "value"
            );
        expect (minSearchSymbolsAmount).toHaveLength(1);

        await createAnnouncementPage.clearServisesSearchInput();
        await createAnnouncementPage.fillServisesSearchInput(searchService);
        const searchResult = await createAnnouncementPage.servicesSearchResult.all();
        const searchResultFirstLine: any = await searchResult[0].textContent();
        await expect((searchResultFirstLine.toLowerCase()).includes(searchService)).toBeTruthy();

        await createAnnouncementPage.clearServisesSearchInput();
        await createAnnouncementPage.fillServisesSearchInput(searchService.toUpperCase());
        expect(
            searchResultFirstLine
                .toUpperCase()
                .includes(searchService.toUpperCase())
        ).toBeTruthy();

        await createAnnouncementPage.clearServisesSearchInput();
        await createAnnouncementPage.fillServisesSearchInput(searchService);
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
    test('C410 Verify creating new service', async ( {page, createAnnouncementPage} ) => {
        await fileChooserFunc(
            createAnnouncementPage.imageUnit,
            images[0],
            createAnnouncementPage,
            page
        );
        await createAnnouncementPage.clickNextButton();

        const newServiceName = await newService();
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
        await fileChooserFunc(
            createAnnouncementPage.imageUnit,
            images[0],
            createAnnouncementPage,
            page
        );
        await createAnnouncementPage.clickNextButton();

        await createAnnouncementPage.fillServisesSearchInput(validData.letter);
        const servicesListCount = await createAnnouncementPage.servicesList.count();
        expect(servicesListCount).toBeGreaterThanOrEqual(1);
        const searchResults = await createAnnouncementPage.servicesSearchResult.allInnerTexts();
        for (let i = 0; i < searchResults.length; i++) {
            expect(
                searchResults[i].toUpperCase().includes(validData.letter)
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
        await fileChooserFunc(createAnnouncementPage.imageUnit, images[0], createAnnouncementPage, page)
        await createAnnouncementPage.clickNextButton();

        await createAnnouncementPage.fillServisesSearchInput(validData.letter);
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
});