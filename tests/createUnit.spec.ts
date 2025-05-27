import { test, expect, Locator } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { CreateAnnouncementPage } from "../pages/createAnnouncementPage";
import { faker } from '@faker-js/faker';

const digits = faker.string.numeric(9);
const text101 = faker.string.fromCharacters('abcw', 101);
const symbols = faker.internet.password({length: 7, pattern: /[?$#&%@]/});
const unitNameValid = faker.string.alpha(10);
const upperLetter = faker.string.alpha({casing: 'upper'});
const vehicleManufactureATEC = "АТЭК";
const vehicleManufactureAtec = "Атэк";
const space = ' ';
const validName = 'Abc';
const digits16 = faker.string.numeric(16);
const digitsSpaceInside = faker.string.octal({ length: 12, prefix: '123 ' });
const digitsSpaceEnd = `${faker.string.numeric(15)} + " "`;
const digits15 = faker.string.numeric(15);
const text9001 = faker.string.fromCharacters('abcde ', 9001);
const email = "my.lanauno@gmail.com";
const password = "345Qwerty"

test.describe("Test create_unit page", async () => {
    
    test.beforeEach(async ({ page }) =>{
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        await page.setViewportSize({ width: 1536, height: 980 });
        await homePage.goto("/");
        await homePage.clickLogin();
        await loginPage.login(email, password);
        await homePage.navigateToCreateAnnouncement();
    })
    test("C294 Verify body title and tab titles", async ({ page }) => {
        const createAnnouncementPage = new CreateAnnouncementPage(page);
    
        await expect(createAnnouncementPage.createAnnouncementTitle).toBeVisible();
        await expect(createAnnouncementPage.createAnnouncementTitle).toContainText('Створити оголошення');

        await expect(createAnnouncementPage.mainInfoButton).toBeVisible();
        await expect(createAnnouncementPage.mainInfoButtonNumber).toContainText(/[1]/);
        await expect(createAnnouncementPage.mainInfoButtonNumber)
              .toHaveCSS('background-color','rgb(64, 75, 105)');
        await expect(createAnnouncementPage.mainInfoButton).toContainText("Основна інформація");

        await expect(createAnnouncementPage.photoButton).toBeVisible();
        await expect(createAnnouncementPage.photoButtonNumber).toContainText(/[2]/);
        await expect(createAnnouncementPage.photoButtonNumber)
              .toHaveCSS('background-color','rgb(196, 196, 196)');
        await expect(createAnnouncementPage.photoButton).toContainText("Фотографії");

        await expect(createAnnouncementPage.servicesButton).toBeVisible();
        await expect(createAnnouncementPage.servicesButtonNumber).toContainText(/[3]/);
        await expect(createAnnouncementPage.servicesButtonNumber)
              .toHaveCSS('background-color','rgb(196, 196, 196)');
        await expect(createAnnouncementPage.servicesButton).toContainText("Послуги");

        await expect(createAnnouncementPage.costButton).toBeVisible();
        await expect(createAnnouncementPage.costButtonNumber).toContainText(/[4]/);
        await expect(createAnnouncementPage.costButtonNumber)
              .toHaveCSS('background-color','rgb(196, 196, 196)');
        await expect(createAnnouncementPage.costButton).toContainText("Вартість");

        await expect(createAnnouncementPage.contactsButton).toBeVisible();
        await expect(createAnnouncementPage.contactsButtonNumber).toContainText(/[5]/);
        await expect(createAnnouncementPage.contactsButtonNumber)
              .toHaveCSS('background-color','rgb(196, 196, 196)');
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
        await expect(createAnnouncementPage.categoryErrorText).toContainText('Це поле обов’язкове');
        await expect(createAnnouncementPage.categoryErrorText).toHaveCSS('color', 'rgb(247, 56, 89)');
        await expect(createAnnouncementPage.categoryInput).toHaveCSS('border', '1px solid rgb(247, 56, 89)');

        await createAnnouncementPage.clickCategoryInput();
        await expect(createAnnouncementPage.categoryPopUp).toBeVisible();
        await expect(createAnnouncementPage.categoryPopUpTitle)
              .toContainText('Вибір категорії технічного засобу');
        await expect(createAnnouncementPage.closeIcon).toBeVisible();
        await createAnnouncementPage.clickCloseIcon();
        await expect(createAnnouncementPage.categoryPopUp).not.toBeVisible();

        await createAnnouncementPage.clickCategoryInput();
        await page.mouse.click(0, 0);
        await expect(page.locator('.CategoryPopup_wrapper__JpUB1')).not.toBeVisible();

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
        await expect(createAnnouncementPage.unitNameErrorText).toContainText('Це поле обов’язкове');
        await expect(createAnnouncementPage.unitNameErrorText).toHaveCSS('color', 'rgb(247, 56, 89)');
        await expect(createAnnouncementPage.unitNameInput).toHaveCSS('border', '1px solid rgb(247, 56, 89)');
        
        await createAnnouncementPage.clearUnitNameInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.unitNameInput, digits);
        await createAnnouncementPage.clickNextButton();
        await expect(createAnnouncementPage.unitNameErrorText).toContainText(/не менше 10 символів/);
        await expect(createAnnouncementPage.unitNameErrorText).toHaveCSS('color', 'rgb(247, 56, 89)');
        await expect(createAnnouncementPage.unitNameInput).toHaveCSS('border', '1px solid rgb(247, 56, 89)');
        
        await createAnnouncementPage.clearUnitNameInput();
        await createAnnouncementPage.fillUnitNameInput(digits);
        await createAnnouncementPage.clickNextButton();
        await expect(createAnnouncementPage.unitNameErrorText).toContainText(/не менше 10 символів/);
        await expect(createAnnouncementPage.unitNameErrorText).toHaveCSS('color', 'rgb(247, 56, 89)');
        await expect(createAnnouncementPage.unitNameInput).toHaveCSS('border', '1px solid rgb(247, 56, 89)');

        await createAnnouncementPage.clearUnitNameInput();
        await createAnnouncementPage.fillUnitNameInput(text101);
        await expect(createAnnouncementPage.unitNameErrorText).toContainText(/не більше 100 символів/);
        await expect(createAnnouncementPage.unitNameErrorText).toHaveCSS('color', 'rgb(247, 56, 89)');
        await expect(createAnnouncementPage.unitNameInput).toHaveCSS('border', '1px solid rgb(247, 56, 89)');
    
        await createAnnouncementPage.clearUnitNameInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.unitNameInput, unitNameValid);
        await expect(createAnnouncementPage.unitNameInput).toHaveValue(unitNameValid);

        await createAnnouncementPage.clearUnitNameInput();
        await createAnnouncementPage.fillUnitNameInput(unitNameValid);
        await expect(createAnnouncementPage.unitNameInput).toHaveValue(unitNameValid);
    })
    test('C298 Verify vehicle manufacturer section', async ({ page }) => {
        const createAnnouncementPage = new CreateAnnouncementPage(page);

        await expect(createAnnouncementPage.vehicleManufactureTitle).toBeVisible()
        await expect(createAnnouncementPage.vehicleManufactureTitle)
              .toContainText('Виробник транспортного засобу *');
        await expect(createAnnouncementPage.vehicleManufactureAsterix).toBeVisible();
        await expect(createAnnouncementPage.vehicleManufactureAsterix).toContainText('*');
        await expect(createAnnouncementPage.loupeSymbol).toBeVisible();
        await expect(createAnnouncementPage.vehicleManufactureInput).toBeVisible();
        await expect(createAnnouncementPage.vehicleManufactureInput)
              .toHaveAttribute('placeholder', /^Введіть виробника/);
        
        await createAnnouncementPage.clickNextButton();
        await expect(createAnnouncementPage.vehicleManufactureErrorText)
              .toContainText('Це поле обов’язкове');
        await expect(createAnnouncementPage.vehicleManufactureErrorText)
              .toHaveCSS('color', 'rgb(247, 56, 89)');
        await expect(createAnnouncementPage.vehicleManufactureInputError)
              .toHaveCSS('border-color', 'rgb(247, 56, 89)');
        
        await createAnnouncementPage.copyPaste(createAnnouncementPage.vehicleManufactureInput, upperLetter);
        await expect(createAnnouncementPage.vehicleManufactureDropdown).toBeVisible();

        await createAnnouncementPage.clearVehicleManufactureInput();
        await createAnnouncementPage.fillVehicleManufacturyInput(upperLetter);
        await expect(createAnnouncementPage.vehicleManufactureDropdown).toBeVisible();
        
        await createAnnouncementPage.clearVehicleManufactureInput();
        await createAnnouncementPage.fillVehicleManufacturyInput(vehicleManufactureATEC);
        await expect(createAnnouncementPage.vehicleManufactureSearchResult).toBeVisible({timeout: 10000});
        await expect(createAnnouncementPage.vehicleManufactureSearchResult)
              .toContainText(vehicleManufactureATEC);

        await createAnnouncementPage.clearVehicleManufactureInput();
        await createAnnouncementPage.fillVehicleManufacturyInput(vehicleManufactureAtec);
        await expect(createAnnouncementPage.vehicleManufactureSearchResult).toBeVisible();
        await expect(createAnnouncementPage.vehicleManufactureSearchResult)
              .toContainText(vehicleManufactureATEC);

        await createAnnouncementPage.clearVehicleManufactureInput();
        await createAnnouncementPage.fillVehicleManufacturyInput(space);
        await expect(createAnnouncementPage.vehicleManufactureSearchResult).not.toBeVisible();

        await createAnnouncementPage.clearVehicleManufactureInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.vehicleManufactureInput, space);
        await expect(createAnnouncementPage.vehicleManufactureInput).toContainText('');

        await createAnnouncementPage.clearVehicleManufactureInput();
        await createAnnouncementPage.fillVehicleManufacturyInput(symbols);
        await expect(createAnnouncementPage.symbolsCounter).toContainText(`${symbols.length} / 100`);
        await createAnnouncementPage.verifyManufaktureNameNotFound(symbols);
        await expect(createAnnouncementPage.vehicleManufactureSearchResult).not.toBeVisible();

        await createAnnouncementPage.clearVehicleManufactureInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.vehicleManufactureInput, symbols);
        await expect(createAnnouncementPage.symbolsCounter).toContainText(`${symbols.length} / 100`);
        await createAnnouncementPage.verifyManufaktureNameNotFound(symbols);
        await expect(createAnnouncementPage.vehicleManufactureSearchResult).not.toBeVisible();

        await createAnnouncementPage.clearVehicleManufactureInput();
        await createAnnouncementPage.fillVehicleManufacturyInput(digits);
        await expect(createAnnouncementPage.symbolsCounter).toContainText(`${digits.length} / 100`);
        await createAnnouncementPage.verifyManufaktureNameNotFound(digits);
        await expect(createAnnouncementPage.vehicleManufactureSearchResult).not.toBeVisible();

        await createAnnouncementPage.clearVehicleManufactureInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.vehicleManufactureInput, digits)
        await expect(createAnnouncementPage.symbolsCounter).toContainText(`${digits.length} / 100`);
        await createAnnouncementPage.verifyManufaktureNameNotFound(digits);
        await expect(createAnnouncementPage.vehicleManufactureSearchResult).not.toBeVisible();

        await createAnnouncementPage.clearVehicleManufactureInput();
        await createAnnouncementPage.fillVehicleManufacturyInput(text101);
        await expect(createAnnouncementPage.symbolsCounter).toContainText(`${text101.slice(0,-1).length} / 100`);
        await createAnnouncementPage.verifyManufaktureNameNotFoundText101(text101);
        await expect(createAnnouncementPage.vehicleManufactureSearchResult).not.toBeVisible();

        await createAnnouncementPage.clearVehicleManufactureInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.vehicleManufactureInput, text101);
        await expect(createAnnouncementPage.vehicleManufactureDropdownError).toBeVisible();
        await expect(createAnnouncementPage.symbolsCounter).toContainText(`${text101.slice(0,-1).length} / 100`);
        await createAnnouncementPage.verifyManufaktureNameNotFoundText101(text101);
        await expect(createAnnouncementPage.vehicleManufactureSearchResult).not.toBeVisible();

        await createAnnouncementPage.clearVehicleManufactureInput();
        await createAnnouncementPage.fillVehicleManufacturyInput(validName);
        await createAnnouncementPage.clickVehicleManufactureSearchResult();
        await expect(createAnnouncementPage.vehicleManufactureChoosenResult)
              .toContainText(validName.toUpperCase()); 
        await expect(createAnnouncementPage.crossIcon).toBeVisible();
        await createAnnouncementPage.clickCrossIcon();
        await expect(createAnnouncementPage.vehicleManufactureInput).toBeEmpty();

        await createAnnouncementPage.copyPaste(createAnnouncementPage.vehicleManufactureInput, validName);
        await createAnnouncementPage.clickVehicleManufactureSearchResult();
        await expect(createAnnouncementPage.vehicleManufactureChoosenResult)
              .toContainText(validName.toUpperCase());
        await expect(createAnnouncementPage.crossIcon).toBeVisible();
        await createAnnouncementPage.clickCrossIcon();
        await expect(createAnnouncementPage.vehicleManufactureInput).toBeEmpty();
    })
    test('C299 Verify model name input field', async ({ page }) => {
        const createAnnouncementPage = new CreateAnnouncementPage(page);

        await expect(createAnnouncementPage.modelNameTitle).toBeVisible();
        await expect(createAnnouncementPage.modelNameTitle).toContainText('Назва моделі');
        await expect(createAnnouncementPage.modelNameInput)
              .toHaveAttribute('placeholder', 'Введіть назву моделі');

        await createAnnouncementPage.copyPaste(createAnnouncementPage.modelNameInput, digits16);
        await expect(createAnnouncementPage.modelNameErrorText).toBeVisible();
        await expect(createAnnouncementPage.modelNameErrorText).toHaveText(/не більше 15 символів/);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveCSS('color', 'rgb(247, 56, 89)');
        await expect(createAnnouncementPage.modelNameInput).toHaveCSS('border-color', 'rgb(247, 56, 89)');

        await createAnnouncementPage.clearModelNameInput();
        await createAnnouncementPage.fillModelNameInput(digits16);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveText(/не більше 15 символів/);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveCSS('color', 'rgb(247, 56, 89)');
        await expect(createAnnouncementPage.modelNameInput).toHaveCSS('border-color', 'rgb(247, 56, 89)');

        await createAnnouncementPage.clearModelNameInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.modelNameInput, digitsSpaceInside);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveText(/не більше 15 символів/);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveCSS('color', 'rgb(247, 56, 89)');
        await expect(createAnnouncementPage.modelNameInput).toHaveCSS('border-color', 'rgb(247, 56, 89)');

        await createAnnouncementPage.clearModelNameInput();
        await createAnnouncementPage.fillModelNameInput(digitsSpaceInside);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveText(/не більше 15 символів/);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveCSS('color', 'rgb(247, 56, 89)');
        await expect(createAnnouncementPage.modelNameInput).toHaveCSS('border-color', 'rgb(247, 56, 89)');

        await createAnnouncementPage.clearModelNameInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.modelNameInput, digitsSpaceEnd);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveText(/не більше 15 символів/);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveCSS('color', 'rgb(247, 56, 89)');
        await expect(createAnnouncementPage.modelNameInput).toHaveCSS('border-color', 'rgb(247, 56, 89)');

        await createAnnouncementPage.clearModelNameInput();
        await createAnnouncementPage.fillModelNameInput(digitsSpaceEnd);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveText(/не більше 15 символів/);
        await expect(createAnnouncementPage.modelNameErrorText).toHaveCSS('color', 'rgb(247, 56, 89)');
        await expect(createAnnouncementPage.modelNameInput).toHaveCSS('border-color', 'rgb(247, 56, 89)');

        await createAnnouncementPage.clearModelNameInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.modelNameInput, space);
        await expect(createAnnouncementPage.modelNameInput).toContainText("");

        await createAnnouncementPage.clearModelNameInput();
        await createAnnouncementPage.fillModelNameInput(space);
        await expect(createAnnouncementPage.modelNameInput).toBeEmpty();

        await createAnnouncementPage.clearModelNameInput();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.modelNameInput, digits15);
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
        await createAnnouncementPage.fillTechCharacteristicsTextArea(text9001);
        const textarea = createAnnouncementPage.techCharacteristicsTextArea;
        const content: any = await textarea.textContent();
        console.log(content.length);
        await expect(content.length == 9000).toBeTruthy();

        await createAnnouncementPage.clearTechCharacteristicsTextArea();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.techCharacteristicsTextArea, text9001);
        const content1: any = await textarea.textContent();
        console.log(content1.length);
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
        await createAnnouncementPage.fillDescriptionTextArea(text9001);
        const textarea = createAnnouncementPage.descriptionTextArea;
        const content: any = await textarea.textContent();
        console.log(content.length);
        await expect(content.length === 9000).toBeTruthy();
    
        await createAnnouncementPage.clearDescriptionTextArea();
        await createAnnouncementPage.copyPaste(createAnnouncementPage.descriptionTextArea, text9001);
        const content1: any = await textarea.textContent();
        console.log(content1.length);
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
        await expect(createAnnouncementPage.vehicleLocationErrorText).toContainText(/[^Виберіть/ && /^місце]/);
        await expect(createAnnouncementPage.vehicleLocationErrorText)
              .toHaveCSS('color', 'rgb(247, 56, 89)');
        await expect(createAnnouncementPage.vehicleLocationInput)
              .toHaveCSS('border-color', 'rgb(247, 56, 89)');

        await createAnnouncementPage.clickVehicleLocationInput();
        await expect(createAnnouncementPage.mapPopUp).toBeVisible();
        await expect(createAnnouncementPage.mapPopUpTitle).toContainText('Техніка на мапі');
        await expect(createAnnouncementPage.mapPopUpCloseIcon).toBeVisible();
        await expect(createAnnouncementPage.mapPopUpAddress)
              .toContainText(/[^Київ/ && /Володимирська 21\/20]/);
        await createAnnouncementPage.clickMapPopUpSubmitButton();
        await expect(createAnnouncementPage.mapPopUp).not.toBeVisible();
        await expect(createAnnouncementPage.vehicleLocationInput)
              .toContainText(/[^Київ/ && /Володимирська 21\/20]/);
        
        await createAnnouncementPage.clickLocationSelectButton();
        await createAnnouncementPage.map.waitFor({state: "visible"});
        await createAnnouncementPage.clickMap();
        await createAnnouncementPage.map.waitFor({timeout: 5000});
        const address1 = await createAnnouncementPage.mapPopUpAddress.textContent();
        console.log(address1);
        await createAnnouncementPage.clickMapPopUpSubmitButton();
        const address2 = await createAnnouncementPage.vehicleLocationInput.textContent();
        console.log(address2);
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
        await expect(createAnnouncementPage.categoryErrorText).toContainText('Це поле обов’язкове');
        await expect(createAnnouncementPage.categoryErrorText).toHaveCSS('color', 'rgb(247, 56, 89)');
        await expect(createAnnouncementPage.categoryInput).toHaveCSS('border', '1px solid rgb(247, 56, 89)');

        await expect(createAnnouncementPage.unitNameErrorText).toContainText('Це поле обов’язкове');
        await expect(createAnnouncementPage.unitNameErrorText).toHaveCSS('color', 'rgb(247, 56, 89)');
        await expect(createAnnouncementPage.unitNameInput).toHaveCSS('border', '1px solid rgb(247, 56, 89)');

        await expect(createAnnouncementPage.vehicleManufactureErrorText).toContainText('Це поле обов’язкове');
        await expect(createAnnouncementPage.vehicleManufactureErrorText).toHaveCSS('color', 'rgb(247, 56, 89)');
        await expect(createAnnouncementPage.vehicleManufactureInputError).toHaveCSS('border-color', 'rgb(247, 56, 89)');

        await expect(createAnnouncementPage.vehicleLocationErrorText).toContainText(/^Виберіть коректне місце/);
        await expect(createAnnouncementPage.vehicleLocationErrorText).toHaveCSS('color', 'rgb(247, 56, 89)');
        await expect(createAnnouncementPage.vehicleLocationInput).toHaveCSS('border-color', 'rgb(247, 56, 89)');

        await createAnnouncementPage.clickCategoryInput();
        await expect(createAnnouncementPage.budivelnaTekhnikaLink).toContainText('Будівельна техніка');
        await createAnnouncementPage.click(createAnnouncementPage.budivelnaTekhnikaLink);
        await expect(createAnnouncementPage.buroviUstanovkiLink).toContainText('Бурові установки');
        await createAnnouncementPage.click(createAnnouncementPage.buroviUstanovkiLink);
        await expect(createAnnouncementPage.palebiiniUstanovkiLink).toContainText('палебійні установки');
        await createAnnouncementPage.click(createAnnouncementPage.palebiiniUstanovkiLink);
        await expect(createAnnouncementPage.categoryErrorText).not.toBeVisible()

        await createAnnouncementPage.fillUnitNameInput(unitNameValid);
        await expect(createAnnouncementPage.unitNameErrorText).not.toBeVisible()
        await createAnnouncementPage.fillVehicleManufacturyInput(vehicleManufactureATEC);
        await createAnnouncementPage.clickVehicleManufactureSearchResult();
        await expect(createAnnouncementPage.vehicleManufactureErrorText).not.toBeVisible()
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
              .toHaveCSS('background-color','rgb(196, 196, 196)');
        await expect(createAnnouncementPage.mainInfoButton).toContainText("Основна інформація");
        
        await expect(createAnnouncementPage.photoButton).toBeVisible();
        await expect(createAnnouncementPage.photoButtonNumber).toContainText(/[2]/);
        await expect(createAnnouncementPage.photoButtonNumber)
              .toHaveCSS('background-color','rgb(64, 75, 105)');
        await expect(createAnnouncementPage.photoButton).toContainText("Фотографії");
        
        await expect(createAnnouncementPage.servicesButton).toBeVisible();
        await expect(createAnnouncementPage.servicesButtonNumber).toContainText(/[3]/);
        await expect(createAnnouncementPage.servicesButtonNumber)
              .toHaveCSS('background-color','rgb(196, 196, 196)');
        await expect(createAnnouncementPage.servicesButton).toContainText("Послуги");
        
        await expect(createAnnouncementPage.costButton).toBeVisible();
        await expect(createAnnouncementPage.costButtonNumber).toContainText(/[4]/);
        await expect(createAnnouncementPage.costButtonNumber)
              .toHaveCSS('background-color','rgb(196, 196, 196)');
        await expect(createAnnouncementPage.costButton).toContainText("Вартість");
        
        await expect(createAnnouncementPage.contactsButton).toBeVisible();
        await expect(createAnnouncementPage.contactsButtonNumber).toContainText(/[5]/);
        await expect(createAnnouncementPage.contactsButtonNumber)
              .toHaveCSS('background-color','rgb(196, 196, 196)');
        await expect(createAnnouncementPage.contactsButton).toContainText("Контакти");   
    })
});



