import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { CreateAnnouncementPage } from "../pages/createAnnouncementPage";
import { text, validData, invalidData, color, manufacturerRandom} from "../unitData";

test.describe("Test create_unit page", async () => {
    
    test.beforeEach(async ({ page }) =>{
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        await page.setViewportSize({ width: 1536, height: 980 });
        await homePage.goto("/");
        await homePage.clickLogin();
        await loginPage.login(validData.email, validData.password);
        await homePage.navigateToCreateAnnouncement();
    })
    test("C294 Verify body title and tab titles", async ({ page }) => {
        const createAnnouncementPage = new CreateAnnouncementPage(page);
    
        await expect(createAnnouncementPage.createAnnouncementTitle).toBeVisible();
        await expect(createAnnouncementPage.createAnnouncementTitle).toContainText('Створити оголошення');

        await expect(createAnnouncementPage.mainInfoButton).toBeVisible();
        await expect(createAnnouncementPage.mainInfoButtonNumber).toContainText(/[1]/);
        await expect(createAnnouncementPage.mainInfoButtonNumber)
              .toHaveCSS('background-color', color.activeElem);
        await expect(createAnnouncementPage.mainInfoButton).toContainText("Основна інформація");

        await expect(createAnnouncementPage.photoButton).toBeVisible();
        await expect(createAnnouncementPage.photoButtonNumber).toContainText(/[2]/);
        await expect(createAnnouncementPage.photoButtonNumber)
              .toHaveCSS('background-color', color.inactiveElem);
        await expect(createAnnouncementPage.photoButton).toContainText("Фотографії");

        await expect(createAnnouncementPage.servicesButton).toBeVisible();
        await expect(createAnnouncementPage.servicesButtonNumber).toContainText(/[3]/);
        await expect(createAnnouncementPage.servicesButtonNumber)
              .toHaveCSS('background-color', color.inactiveElem);
        await expect(createAnnouncementPage.servicesButton).toContainText("Послуги");

        await expect(createAnnouncementPage.costButton).toBeVisible();
        await expect(createAnnouncementPage.costButtonNumber).toContainText(/[4]/);
        await expect(createAnnouncementPage.costButtonNumber)
              .toHaveCSS('background-color', color.inactiveElem);
        await expect(createAnnouncementPage.costButton).toContainText("Вартість");

        await expect(createAnnouncementPage.contactsButton).toBeVisible();
        await expect(createAnnouncementPage.contactsButtonNumber).toContainText(/[5]/);
        await expect(createAnnouncementPage.contactsButtonNumber)
              .toHaveCSS('background-color', color.inactiveElem);
        await expect(createAnnouncementPage.contactsButton).toContainText("Контакти");
    });
    test("C296 Verify Category section", async ({ page }) => {
        const createAnnouncementPage = new CreateAnnouncementPage(page);

        await expect(createAnnouncementPage.categoryTitle).toBeVisible();
        await expect(createAnnouncementPage.categoryTitle).toContainText('Категорія *');
        await expect(createAnnouncementPage.categoryAsterix).toBeVisible();
        await expect(createAnnouncementPage.categoryAsterix).toContainText('*');
        await expect(createAnnouncementPage.categoryInput).toContainText('Виберіть категорію');
        await expect(createAnnouncementPage.arrowDown).toBeVisible();

        await createAnnouncementPage.clickNextButton();
        await expect(createAnnouncementPage.categoryErrorText).toContainText(text.requiredField);
        await expect(createAnnouncementPage.categoryErrorText).toHaveCSS('color', color.error);
        await expect(createAnnouncementPage.categoryInput).toHaveCSS('border', color.errorBorder);

        await createAnnouncementPage.clickCategoryInput();
        await expect(createAnnouncementPage.categoryPopUp).toBeVisible();
        await expect(createAnnouncementPage.categoryPopUpTitle)
              .toContainText('Вибір категорії технічного засобу');
        await expect(createAnnouncementPage.closeIcon).toBeVisible();
        await createAnnouncementPage.clickCloseIcon();
        await expect(createAnnouncementPage.categoryPopUp).not.toBeVisible();

        await createAnnouncementPage.clickCategoryInput();
        await page.mouse.click(0, 0);
        await expect(createAnnouncementPage.categoryPopUp).not.toBeVisible();

        await createAnnouncementPage.clickCategoryInput();
        await expect(createAnnouncementPage.budivelnaTekhnikaLink).toContainText('Будівельна техніка');
        await createAnnouncementPage.click(createAnnouncementPage.budivelnaTekhnikaLink);
        await expect(createAnnouncementPage.buroviUstanovkiLink).toContainText('Бурові установки');
        await createAnnouncementPage.click(createAnnouncementPage.buroviUstanovkiLink);
        await expect(createAnnouncementPage.palebiiniUstanovkiLink).toContainText('палебійні установки');
        await createAnnouncementPage.click(createAnnouncementPage.palebiiniUstanovkiLink);
        await expect(createAnnouncementPage.categoryPopUp).not.toBeVisible();

        await createAnnouncementPage.clickCategoryInput();
        await expect(createAnnouncementPage.komunalnaTekhnikaLink).toContainText('Комунальна техніка');
        await createAnnouncementPage.click(createAnnouncementPage.komunalnaTekhnikaLink);
        await expect(createAnnouncementPage.avariiniMashiniLink).toContainText('Аварійні машини');
        await createAnnouncementPage.click(createAnnouncementPage.avariiniMashiniLink);
        await expect(createAnnouncementPage.avtomobiliShtabniLink).toContainText('автомобілі штабні');
        await createAnnouncementPage.click(createAnnouncementPage.avtomobiliShtabniLink);
        await expect(createAnnouncementPage.categoryPopUp).not.toBeVisible();

        await createAnnouncementPage.clickCategoryInput();
        await expect(createAnnouncementPage.skladskaTekhnikaLink).toContainText('Складська техніка');
        await createAnnouncementPage.click(createAnnouncementPage.skladskaTekhnikaLink);
        await expect(createAnnouncementPage.tekhnikaDlyaSkladuvanniaLink).toContainText('Техніка для складування');
        await createAnnouncementPage.click(createAnnouncementPage.tekhnikaDlyaSkladuvanniaLink);
        await expect(createAnnouncementPage.vagyRoklaLink).toContainText('ваги-рокла');
        await createAnnouncementPage.click(createAnnouncementPage.vagyRoklaLink);
        await expect(createAnnouncementPage.categoryPopUp).not.toBeVisible();   
    })
    test("C297 Verify unit name section", async ({ page }) => {
        const createAnnouncementPage = new CreateAnnouncementPage(page);

        await expect(createAnnouncementPage.unitNameTitle).toBeVisible();
        await expect(createAnnouncementPage.unitNameTitle).toContainText('Назва оголошення *');
        await expect(createAnnouncementPage.unitNameAsterix).toBeVisible();
        await expect(createAnnouncementPage.unitNameAsterix).toContainText('*');
        await expect(createAnnouncementPage.unitNameInput)
              .toHaveAttribute('placeholder', 'Введіть назву оголошення');
        
        await createAnnouncementPage.clickNextButton();
        await expect(createAnnouncementPage.unitNameErrorText).toContainText(text.requiredField);
        await expect(createAnnouncementPage.unitNameErrorText).toHaveCSS('color', color.error);
        await expect(createAnnouncementPage.unitNameInput).toHaveCSS('border', color.errorBorder);
        
        await createAnnouncementPage.clearUnitNameInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.unitNameInput, invalidData.digits);
        await createAnnouncementPage.clickNextButton();
        await expect(createAnnouncementPage.unitNameErrorText).toContainText(text.notLess10Symbols);
        await expect(createAnnouncementPage.unitNameErrorText).toHaveCSS('color', color.error);
        await expect(createAnnouncementPage.unitNameInput).toHaveCSS('border', color.errorBorder);
        
        await createAnnouncementPage.clearUnitNameInput();
        await createAnnouncementPage.fillUnitNameInput(invalidData.digits);
        await createAnnouncementPage.clickNextButton();
        await expect(createAnnouncementPage.unitNameErrorText).toContainText(text.notLess10Symbols);
        await expect(createAnnouncementPage.unitNameErrorText).toHaveCSS('color', color.error);
        await expect(createAnnouncementPage.unitNameInput).toHaveCSS('border', color.errorBorder);

        await createAnnouncementPage.clearUnitNameInput();
        await createAnnouncementPage.fillUnitNameInput(invalidData.text101);
        await expect(createAnnouncementPage.unitNameErrorText).toContainText(text.notMore100Symbols);
        await expect(createAnnouncementPage.unitNameErrorText).toHaveCSS('color', color.error);
        await expect(createAnnouncementPage.unitNameInput).toHaveCSS('border', color.errorBorder);
    
        await createAnnouncementPage.clearUnitNameInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.unitNameInput, validData.unitName);
        await expect(createAnnouncementPage.unitNameInput).toHaveValue(validData.unitName);

        await createAnnouncementPage.clearUnitNameInput();
        await createAnnouncementPage.fillUnitNameInput(validData.unitName);
        await expect(createAnnouncementPage.unitNameInput).toHaveValue(validData.unitName);
    })
    test('C298 Verify vehicle manufacturer section', async ({ page }) => {
        const createAnnouncementPage = new CreateAnnouncementPage(page);

        await expect(createAnnouncementPage.vehicleManufacturerTitle).toBeVisible()
        await expect(createAnnouncementPage.vehicleManufacturerTitle)
              .toContainText('Виробник транспортного засобу *');
        await expect(createAnnouncementPage.vehicleManufacturerAsterix).toBeVisible();
        await expect(createAnnouncementPage.vehicleManufacturerAsterix).toContainText('*');
        await expect(createAnnouncementPage.loupeSymbol).toBeVisible();
        await expect(createAnnouncementPage.vehicleManufacturerInput).toBeVisible();
        await expect(createAnnouncementPage.vehicleManufacturerInput)
              .toHaveAttribute('placeholder', /^Введіть виробника/);
        
        await createAnnouncementPage.clickNextButton();
        await expect(createAnnouncementPage.vehicleManufacturerErrorText)
              .toContainText(text.requiredField);
        await expect(createAnnouncementPage.vehicleManufacturerErrorText)
              .toHaveCSS('color', color.error);
        await expect(createAnnouncementPage.vehicleManufacturerInputError)
              .toHaveCSS('border-color', color.error);
        
        await createAnnouncementPage.copyPaste(createAnnouncementPage.vehicleManufacturerInput, validData.letter);
        await expect(createAnnouncementPage.vehicleManufacturerDropdown).toBeVisible();

        await createAnnouncementPage.clearVehicleManufacturerInput();
        await createAnnouncementPage.fillVehicleManufacturerInput(validData.letter);
        await expect(createAnnouncementPage.vehicleManufacturerDropdown).toBeVisible();

        const manufacturerName: string = await manufacturerRandom(createAnnouncementPage)
        await createAnnouncementPage.clearVehicleManufacturerInput();
        await createAnnouncementPage.fillVehicleManufacturerInput(manufacturerName);
        await expect(createAnnouncementPage.vehicleManufacturerSearchResult).toBeVisible({timeout: 10000});
        await expect(createAnnouncementPage.vehicleManufacturerSearchResult)
              .toContainText(manufacturerName);

        await createAnnouncementPage.clearVehicleManufacturerInput();
        await createAnnouncementPage.fillVehicleManufacturerInput(manufacturerName.toLowerCase());
        await expect(createAnnouncementPage.vehicleManufacturerSearchResult).toBeVisible();
        await expect(createAnnouncementPage.vehicleManufacturerSearchResult)
              .toContainText(manufacturerName);

        await createAnnouncementPage.clearVehicleManufacturerInput();
        await createAnnouncementPage.fillVehicleManufacturerInput(invalidData.space);
        await expect(createAnnouncementPage.vehicleManufacturerSearchResult).not.toBeVisible();

        await createAnnouncementPage.clearVehicleManufacturerInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.vehicleManufacturerInput, invalidData.space);
        await expect(createAnnouncementPage.vehicleManufacturerInput).toContainText('');

        await createAnnouncementPage.clearVehicleManufacturerInput();
        await createAnnouncementPage.fillVehicleManufacturerInput(invalidData.symbols);
        await expect(createAnnouncementPage.symbolsCounter).toContainText(`${invalidData.symbols.length} / 100`);
        await createAnnouncementPage.verifyManufakturerNameNotFound(invalidData.symbols);
        await expect(createAnnouncementPage.vehicleManufacturerSearchResult).not.toBeVisible();

        await createAnnouncementPage.clearVehicleManufacturerInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.vehicleManufacturerInput, invalidData.symbols);
        await expect(createAnnouncementPage.symbolsCounter).toContainText(`${invalidData.symbols.length} / 100`);
        await createAnnouncementPage.verifyManufakturerNameNotFound(invalidData.symbols);
        await expect(createAnnouncementPage.vehicleManufacturerSearchResult).not.toBeVisible();

        await createAnnouncementPage.clearVehicleManufacturerInput();
        await createAnnouncementPage.fillVehicleManufacturerInput(invalidData.digits);
        await expect(createAnnouncementPage.symbolsCounter).toContainText(`${invalidData.digits.length} / 100`);
        await createAnnouncementPage.verifyManufakturerNameNotFound(invalidData.digits);
        await expect(createAnnouncementPage.vehicleManufacturerSearchResult).not.toBeVisible();

        await createAnnouncementPage.clearVehicleManufacturerInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.vehicleManufacturerInput, invalidData.digits)
        await expect(createAnnouncementPage.symbolsCounter).toContainText(`${invalidData.digits.length} / 100`);
        await createAnnouncementPage.verifyManufakturerNameNotFound(invalidData.digits);
        await expect(createAnnouncementPage.vehicleManufacturerSearchResult).not.toBeVisible();

        await createAnnouncementPage.clearVehicleManufacturerInput();
        await createAnnouncementPage.fillVehicleManufacturerInput(invalidData.text101);
        await expect(createAnnouncementPage.symbolsCounter).toContainText(`${invalidData.text101.slice(0,-1).length} / 100`);
        await createAnnouncementPage.verifyManufakturerNameNotFoundText101(invalidData.text101);
        await expect(createAnnouncementPage.vehicleManufacturerSearchResult).not.toBeVisible();

        await createAnnouncementPage.clearVehicleManufacturerInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.vehicleManufacturerInput, invalidData.text101);
        await expect(createAnnouncementPage.vehicleManufacturerDropdownError).toBeVisible();
        await expect(createAnnouncementPage.symbolsCounter).toContainText(`${invalidData.text101.slice(0,-1).length} / 100`);
        await createAnnouncementPage.verifyManufakturerNameNotFoundText101(invalidData.text101);
        await expect(createAnnouncementPage.vehicleManufacturerSearchResult).not.toBeVisible();

        let manufacturerNameUpper:string = "" 
        if (manufacturerName[1] == manufacturerName[1].toUpperCase()){
            manufacturerNameUpper = manufacturerName
        }
        await createAnnouncementPage.clearVehicleManufacturerInput();
        await createAnnouncementPage.fillVehicleManufacturerInput(manufacturerName.toLowerCase());
        await createAnnouncementPage.clickVehicleManufacturerSearchResult();
        await expect(createAnnouncementPage.vehicleManufacturerChoosenResult)
              .toContainText(manufacturerNameUpper); 
        await expect(createAnnouncementPage.crossIcon).toBeVisible();
        await createAnnouncementPage.clickCrossIcon();
        await expect(createAnnouncementPage.vehicleManufacturerInput).toBeEmpty();

        await createAnnouncementPage
              .copyPaste(createAnnouncementPage.vehicleManufacturerInput, manufacturerName.toLowerCase());
        await createAnnouncementPage.clickVehicleManufacturerSearchResult();
        await expect(createAnnouncementPage.vehicleManufacturerChoosenResult)
              .toContainText(manufacturerNameUpper);
        await expect(createAnnouncementPage.crossIcon).toBeVisible();
        await createAnnouncementPage.clickCrossIcon();
        await expect(createAnnouncementPage.vehicleManufacturerInput).toBeEmpty();
    })
    test('C299 Verify model name input field', async ({ page }) => {
        const createAnnouncementPage = new CreateAnnouncementPage(page);

        await expect(createAnnouncementPage.modelNameTitle).toBeVisible();
        await expect(createAnnouncementPage.modelNameTitle).toContainText('Назва моделі');
        await expect(createAnnouncementPage.modelNameInput)
              .toHaveAttribute('placeholder', 'Введіть назву моделі');

        await createAnnouncementPage.copyPaste(createAnnouncementPage.modelNameInput, validData.digits16);
        await expect(createAnnouncementPage.modelNameErrorText).toBeVisible();
        await expect(createAnnouncementPage.modelNameErrorText).toHaveText(text.notMore15Symbols);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveCSS('color', color.error);
        await expect(createAnnouncementPage.modelNameInput).toHaveCSS('border-color', color.error);

        await createAnnouncementPage.clearModelNameInput();
        await createAnnouncementPage.fillModelNameInput(validData.digits16);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveText(text.notMore15Symbols);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveCSS('color', color.error);
        await expect(createAnnouncementPage.modelNameInput).toHaveCSS('border-color', color.error);

        await createAnnouncementPage.clearModelNameInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.modelNameInput, invalidData.spaceInside);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveText(text.notMore15Symbols);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveCSS('color', color.error);
        await expect(createAnnouncementPage.modelNameInput).toHaveCSS('border-color', color.error);

        await createAnnouncementPage.clearModelNameInput();
        await createAnnouncementPage.fillModelNameInput(invalidData.spaceInside);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveText(text.notMore15Symbols);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveCSS('color', color.error);
        await expect(createAnnouncementPage.modelNameInput).toHaveCSS('border-color', color.error);

        await createAnnouncementPage.clearModelNameInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.modelNameInput, invalidData.spaceEnd);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveText(text.notMore15Symbols);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveCSS('color', color.error);
        await expect(createAnnouncementPage.modelNameInput).toHaveCSS('border-color', color.error);

        await createAnnouncementPage.clearModelNameInput();
        await createAnnouncementPage.fillModelNameInput(invalidData.spaceEnd);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveText(text.notMore15Symbols);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveCSS('color', color.error);
        await expect(createAnnouncementPage.modelNameInput).toHaveCSS('border-color', color.error);

        await createAnnouncementPage.clearModelNameInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.modelNameInput, invalidData.space);
        await expect(createAnnouncementPage.modelNameInput).toContainText("");

        await createAnnouncementPage.clearModelNameInput();
        await createAnnouncementPage.fillModelNameInput(invalidData.space);
        await expect(createAnnouncementPage.modelNameInput).toBeEmpty();

        await createAnnouncementPage.clearModelNameInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.modelNameInput, invalidData.digits15);
        await expect(createAnnouncementPage.modelNameErrorText).not.toBeVisible();
    })
    test('C317 Verify Technical characteristics section', async ({ page }) => {
        const createAnnouncementPage = new CreateAnnouncementPage(page);

        await expect(createAnnouncementPage.techCharacteristicsTitle).toBeVisible();
        await expect(createAnnouncementPage.techCharacteristicsTitle).toContainText('Технічні характеристики');
        await expect(createAnnouncementPage.techCharacteristicsTextArea).toBeEnabled();
        await expect(createAnnouncementPage.techCharacteristicsTextArea).toBeVisible();
        await expect(createAnnouncementPage.techCharacteristicsTextArea).toBeEditable();
        await expect(createAnnouncementPage.techCharacteristicsTextArea).toBeEmpty();

        await createAnnouncementPage.clearTechCharacteristicsTextArea();
        await createAnnouncementPage.fillTechCharacteristicsTextArea(invalidData.text9001);
        const textarea = createAnnouncementPage.techCharacteristicsTextArea;
        const content: any = await textarea.textContent();
        await expect(content.length == 9000).toBeTruthy();

        await createAnnouncementPage.clearTechCharacteristicsTextArea();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.techCharacteristicsTextArea, invalidData.text9001);
        const content1: any = await textarea.textContent();
        await expect(content1.length).toBeLessThanOrEqual(9000);
    })
    test('C318 Verify description section', async ({ page }) => {
        const createAnnouncementPage = new CreateAnnouncementPage(page);
        
        await expect(createAnnouncementPage.descriptionTitle).toBeVisible();
        await expect(createAnnouncementPage.descriptionTitle).toContainText('Детальний опис');
        await expect(createAnnouncementPage.descriptionTextArea).toBeEnabled();
        await expect(createAnnouncementPage.descriptionTextArea).toBeVisible();
        await expect(createAnnouncementPage.descriptionTextArea).toBeEditable();
        await expect(createAnnouncementPage.descriptionTextArea).toBeEmpty();

        await createAnnouncementPage.clearDescriptionTextArea();
        await createAnnouncementPage.fillDescriptionTextArea(invalidData.text9001);
        const textarea = createAnnouncementPage.descriptionTextArea;
        const content: any = await textarea.textContent();
        await expect(content.length === 9000).toBeTruthy();
    
        await createAnnouncementPage.clearDescriptionTextArea();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.descriptionTextArea, invalidData.text9001);
        const content1: any = await textarea.textContent();
        await expect(content1.length).toBeLessThanOrEqual(9000);
        
    })
    test('C319 Verify vehicle location division', async ({ page }) => {
        const createAnnouncementPage = new CreateAnnouncementPage(page);

        await expect(createAnnouncementPage.vehicleLocationTitle).toBeVisible();
        await expect(createAnnouncementPage.vehicleLocationTitle).toContainText(/^Місце розташування/);
        await expect(createAnnouncementPage.vehicleLocationAsterix).toBeVisible();
        await expect(createAnnouncementPage.vehicleLocationAsterix).toContainText('*');
        await expect(createAnnouncementPage.vehicleLocationInput).toContainText('Виберіть на мапі');

        await createAnnouncementPage.clickNextButton();
        await expect(createAnnouncementPage.vehicleLocationErrorText).toContainText(text.choosePlaceOnMap);
        await expect(createAnnouncementPage.vehicleLocationErrorText)
              .toHaveCSS('color', color.error);
        await expect(createAnnouncementPage.vehicleLocationInput)
              .toHaveCSS('border-color', color.error);

        await createAnnouncementPage.clickVehicleLocationInput();
        await expect(createAnnouncementPage.mapPopUp).toBeVisible();
        await expect(createAnnouncementPage.mapPopUpTitle).toContainText('Техніка на мапі');
        await expect(createAnnouncementPage.mapPopUpCloseIcon).toBeVisible();
        await expect(createAnnouncementPage.mapPopUpAddress)
              .toContainText(text.defaultAddress);
        await createAnnouncementPage.clickMapPopUpSubmitButton();
        await expect(createAnnouncementPage.mapPopUp).not.toBeVisible();
        await expect(createAnnouncementPage.vehicleLocationInput)
              .toContainText(text.defaultAddress);
        
        await createAnnouncementPage.clickLocationSelectButton();
        await createAnnouncementPage.map.waitFor({state: "visible"});
        await createAnnouncementPage.clickMap();
        await createAnnouncementPage.map.waitFor({timeout: 5000});
        const address1 = await createAnnouncementPage.mapPopUpAddress.textContent();
        await createAnnouncementPage.clickMapPopUpSubmitButton();
        const address2 = await createAnnouncementPage.vehicleLocationInput.textContent();
        await expect(address1 == address2).toBeTruthy();
    })
    test('C326 Verify Cancel button', async ({ page}) => {
        const createAnnouncementPage = new CreateAnnouncementPage(page);

        await expect(createAnnouncementPage.cancelButton).toBeVisible();
        await expect(createAnnouncementPage.cancelButton).toContainText('Скасувати');

        await createAnnouncementPage.clickCancelButton();
        page.on('dialog', dialog => dialog.accept());
        await expect(page).toHaveURL('/');
        await expect(page).not.toHaveURL('/create-unit/');
    })
    test('C329 Verify Next button', async ({ page }) => {
        const createAnnouncementPage = new CreateAnnouncementPage(page);
        
        await expect(createAnnouncementPage.nextButton).toBeVisible();
        await expect(createAnnouncementPage.nextButton).toContainText('Далі');

        await createAnnouncementPage.clickNextButton();
        await expect(createAnnouncementPage.categoryErrorText).toContainText(text.requiredField);
        await expect(createAnnouncementPage.categoryErrorText).toHaveCSS('color', color.error);
        await expect(createAnnouncementPage.categoryInput).toHaveCSS('border', color.errorBorder);

        await expect(createAnnouncementPage.unitNameErrorText).toContainText(text.requiredField);
        await expect(createAnnouncementPage.unitNameErrorText).toHaveCSS('color', color.error);
        await expect(createAnnouncementPage.unitNameInput).toHaveCSS('border', color.errorBorder);

        await expect(createAnnouncementPage.vehicleManufacturerErrorText).toContainText(text.requiredField);
        await expect(createAnnouncementPage.vehicleManufacturerErrorText).toHaveCSS('color', color.error);
        await expect(createAnnouncementPage.vehicleManufacturerInputError).toHaveCSS('border-color', color.error);

        await expect(createAnnouncementPage.vehicleLocationErrorText).toContainText(text.choosePlaceOnMap);
        await expect(createAnnouncementPage.vehicleLocationErrorText).toHaveCSS('color', color.error);
        await expect(createAnnouncementPage.vehicleLocationInput).toHaveCSS('border-color', color.error);

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
        await expect(createAnnouncementPage.photoTitle).toContainText('Фотографії')
        await expect(createAnnouncementPage.createAnnouncementTitle).toBeVisible();
        await expect(createAnnouncementPage.createAnnouncementTitle).toContainText('Створити оголошення');
        
        await expect(createAnnouncementPage.mainInfoButton).toBeVisible();
        await expect(createAnnouncementPage.mainInfoButtonNumber).toContainText(/[1]/);
        await expect(createAnnouncementPage.mainInfoButtonNumber)
              .toHaveCSS('background-color', color.inactiveElem);
        await expect(createAnnouncementPage.mainInfoButton).toContainText("Основна інформація");
        
        await expect(createAnnouncementPage.photoButton).toBeVisible();
        await expect(createAnnouncementPage.photoButtonNumber).toContainText(/[2]/);
        await expect(createAnnouncementPage.photoButtonNumber)
              .toHaveCSS('background-color', color.activeElem);
        await expect(createAnnouncementPage.photoButton).toContainText("Фотографії");
        
        await expect(createAnnouncementPage.servicesButton).toBeVisible();
        await expect(createAnnouncementPage.servicesButtonNumber).toContainText(/[3]/);
        await expect(createAnnouncementPage.servicesButtonNumber)
              .toHaveCSS('background-color', color.inactiveElem);
        await expect(createAnnouncementPage.servicesButton).toContainText("Послуги");
        
        await expect(createAnnouncementPage.costButton).toBeVisible();
        await expect(createAnnouncementPage.costButtonNumber).toContainText(/[4]/);
        await expect(createAnnouncementPage.costButtonNumber)
              .toHaveCSS('background-color', color.inactiveElem);
        await expect(createAnnouncementPage.costButton).toContainText("Вартість");
        
        await expect(createAnnouncementPage.contactsButton).toBeVisible();
        await expect(createAnnouncementPage.contactsButtonNumber).toContainText(/[5]/);
        await expect(createAnnouncementPage.contactsButtonNumber)
              .toHaveCSS('background-color', color.inactiveElem);
        await expect(createAnnouncementPage.contactsButton).toContainText("Контакти");   
    })
});



