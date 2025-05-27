import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class CreateAnnouncementPage extends BasePage{
   
   // Heading
   createAnnouncementTitle: Locator;

   // Announcement form menu elements
   mainInfoButton: Locator;
   mainInfoButtonNumber: Locator;
   photoButton: Locator;
   photoButtonNumber: Locator;
   servicesButton: Locator;
   servicesButtonNumber: Locator;
   costButton: Locator;
   costButtonNumber: Locator;
   contactsButton: Locator;
   contactsButtonNumber: Locator;

   // Category section elememts
   categoryTitle: Locator;
   categoryAsterix: Locator;
   categoryInput: Locator;
   arrowDown: Locator;
   categoryErrorText: Locator;
   categoryPopUp: Locator;
   categoryPopUpTitle: Locator;
   closeIcon: Locator;
   budivelnaTekhnikaLink: Locator;
   buroviUstanovkiLink: Locator;
   palebiiniUstanovkiLink: Locator;
   komunalnaTekhnikaLink: Locator;
   skladskaTekhnikaLink: Locator;
   avariiniMashiniLink: Locator;
   avtomobiliShtabniLink: Locator;
   tekhnikaDlyaSkladuvanniaLink: Locator;
   vagyRoklaLink: Locator;

   // Unit name section elements
   unitNameTitle: Locator;
   unitNameAsterix: Locator;
   unitNameInput: Locator;
   unitNameErrorText: Locator;

   // Veacle manufactore section elements
   vehicleManufactureTitle: Locator;
   vehicleManufactureAsterix: Locator;
   loupeSymbol: Locator;
   vehicleManufactureInput: Locator;
   vehicleManufactureErrorText: Locator;
   vehicleManufactureDropdown: Locator;
   vehicleManufactureSearchResult: Locator;
   vehicleManufactureDropdownError: Locator;
   crossIcon: Locator;
   vehicleManufactureInputError: Locator;
   vehicleManufactureChoosenResult: Locator;
   symbolsCounter: Locator;

   // Model nane section elements
   modelNameTitle: Locator;
   modelNameInput: Locator;
   modelNameErrorText: Locator;

   // Technical characteristics section elements
   techCharacteristicsTitle: Locator;
   techCharacteristicsTextArea: Locator;

   // Description section elements
   descriptionTitle: Locator;
   descriptionTextArea: Locator;

   // Vehicle location elements
   vehicleLocationTitle: Locator;
   vehicleLocationInput: Locator;
   vehicleLocationAsterix: Locator;
   vehicleLocationErrorText: Locator;

   // Map elements
   mapPopUp: Locator;
   mapPopUpTitle: Locator;
   mapPopUpCloseIcon: Locator;
   mapPopUpAddress: Locator;
   mapPopUpSubmitButton: Locator;
   locationSelectButton: Locator;
   map: Locator;

   // Elements of the create-unit page
   cancelButton: Locator;
   nextButton: Locator;

   // Photo section
   photoTitle: Locator;

   constructor(page: Page) {
    super(page);

    this.createAnnouncementTitle = page.getByText("Створити оголошення");

    this.mainInfoButton = page.getByRole("tab", { name: "Основна інформація" });
    this.mainInfoButtonNumber = page.locator("//button[1]/div/div/span");
    this.photoButton = page.getByRole("tab", { name: "Фотографії" });
    this.photoButtonNumber = page.locator("//button[2]/div/div/span");
    this.servicesButton = page.getByRole("tab", { name: "Послуги" });
    this.servicesButtonNumber = page.locator("//button[3]/div/div/span");
    this.costButton = page.getByRole("tab", { name: "Вартість" });
    this.costButtonNumber = page.locator("//button[4]/div/div/span");
    this.contactsButton = page.getByRole("tab", { name: "Контакти" });
    this.contactsButtonNumber = page.locator("//button[5]/div/div/span");

   this.categoryTitle = page.locator('.CategorySelect_title__W8Hgo');
   this.categoryAsterix = page.locator('div').filter({ hasText: /^Категорія \*$/ }).locator('span');
   this.categoryInput = page.locator('[data-testid="buttonDiv"]');
   this.arrowDown = page.locator('[alt="Arrow-down"]');
   this.categoryErrorText = page.locator('.CategorySelect_errorTextVisible__1Oyzh');
   this.categoryPopUp = page.locator('.CategoryPopup_wrapper__JpUB1');
   this.categoryPopUpTitle = page.locator('.CategoryPopup_title__19YOz');
   this.closeIcon = page.getByTestId('closeIcon').getByTestId('crossIcon');
   this.budivelnaTekhnikaLink = page.getByTestId('list__budivelna-tekhnika').getByTestId('firstCategoryLabel');
   this.buroviUstanovkiLink = page.getByTestId('list__burovi-ustanovki').locator('div').first();
   this.palebiiniUstanovkiLink = page.getByTestId('list__palebiini-ustanovki');
   this.komunalnaTekhnikaLink = page.getByTestId('list__komunalna-tekhnika').getByTestId('firstCategoryWrapper');
   this.skladskaTekhnikaLink = page.getByTestId('list__skladska-tekhnika').getByTestId('firstCategoryWrapper');
   this.avariiniMashiniLink = page.getByTestId('list__avariini-mashini').getByTestId('checkLabel');
   this.avtomobiliShtabniLink = page.getByText('автомобілі штабні');
   this.tekhnikaDlyaSkladuvanniaLink = page.getByTestId('list__tekhnika-dlya-skladuvannia').getByTestId('checkLabel');
   this.vagyRoklaLink = page.getByText('ваги-рокла');
       
   this.unitNameTitle = page.getByText('Назва оголошення *');
   this.unitNameAsterix = page.locator('[data-testid="customInputStar"]');
   this.unitNameInput = page.getByRole('textbox', { name: 'Введіть назву оголошення' });
   this.unitNameErrorText = page.locator('[data-testid="descriptionError"]');

   this.vehicleManufactureTitle = page.locator('.SelectManufacturer_title__X9AEw');
   this.vehicleManufactureAsterix = page.locator('div[class="SelectManufacturer_title__X9AEw"]>span');
   this.loupeSymbol = page.getByTestId('div-wrapper-customSelectWithSearch').locator('path');
   this.vehicleManufactureInput = page.locator('[data-testid="input-customSelectWithSearch"]');
   this.vehicleManufactureInputError = page.locator('.CustomSelectWithSearch_searchResultError__Q9xtO');
   this.vehicleManufactureErrorText = page.locator('.CustomSelectWithSearch_errorTextVisible__B5lZH');
   this.vehicleManufactureDropdown = page.locator('.CustomSelectWithSearch_searchedServicesCat_wrapper__aOGc3');
   this.vehicleManufactureSearchResult = page.getByTestId('item-customSelectWithSearch');
   this.vehicleManufactureChoosenResult = page.locator('.CustomSelectWithSearch_serviceText__seBcv');
   this.vehicleManufactureDropdownError = page.locator('[data-testid="p2-notFound-addNewItem"]');
   this.crossIcon = page.locator('[data-testid="closeButton"]');
   this.symbolsCounter = page.getByTestId('maxLength');

   this.modelNameTitle = page.getByText('Назва моделі');
   this.modelNameInput = page.getByPlaceholder('Введіть назву моделі');
   this.modelNameErrorText = page.locator('[data-testid="descriptionError"]');

   this.techCharacteristicsTitle = page.getByText("Технічні характеристики");
   this.techCharacteristicsTextArea = page.getByTestId('textarea-customTextAriaDescription').first();
   
   this.descriptionTitle = page.getByText("Детальний опис");
   this.descriptionTextArea = page.getByTestId('textarea-customTextAriaDescription').nth(1);

   this.vehicleLocationTitle = page.locator('.AddressSelectionBlock_title__pTi78');
   this.vehicleLocationInput = page.locator('[data-testid="mapLabel"]');
   this.vehicleLocationAsterix = page.locator('[class="AddressSelectionBlock_title__pTi78"]>span');
   this.vehicleLocationErrorText = page.locator('.AddressSelectionBlock_errorTextVisible__IAGKS');

   this.mapPopUp = page.locator('.MapPopup_body__gzgFm');
   this.mapPopUpTitle = page.locator('.MapPopup_title__ykbd3');
   this.mapPopUpCloseIcon = page.locator('.MapPopup_icon__aJopq');
   this.mapPopUpSubmitButton = page.locator('.ItemButtons_darkBlueBtn__juupv ');
   this.locationSelectButton = page.locator('.AddressSelectionBlock_locationBtn__IvqEL');
   this.mapPopUpAddress = page.locator('.MapPopup_address__lu6NB');
   this.map = page.locator('#map');

   this.cancelButton = page.locator('.ButtonsFlow_emptyBtn__96V4x');
   this.nextButton = page.getByTestId('nextButton');

   this.photoTitle = page.locator('//div[@data-testid="ImagesUnitFlow"]/div[1]')
   }

   async clickNextButton() {
      await this.nextButton.click();
   }

   async clickCategoryInput() {
      await this.categoryInput.click();
   }

   async clickCloseIcon() {
      await this.closeIcon.click();
   }

   async clickBudivelnaTekhnikaLink() {
      await this.budivelnaTekhnikaLink.click();
   }

   async clickBuroviUstanovkiLink() {
      await this.buroviUstanovkiLink.click();
   }

   async clickPalebiiniUstanovkiLink() {
      await this.palebiiniUstanovkiLink.click();
   }

   async clearUnitNameInput() {
      await this.unitNameInput.clear();
   }

   async fillUnitNameInput(name: string) {
      await this.unitNameInput.fill(name);
   }

   async fillVehicleManufacturyInput(name: string) {
      await this.vehicleManufactureInput.fill(name);
   }

   async clickVehicleManufactureSearchResult() {
      await this.vehicleManufactureSearchResult.click();
   }
   
   async clickCrossIcon() {
      await this.crossIcon.click();
   }

   async clearVehicleManufactureInput() {
      await this.vehicleManufactureInput.clear()
   };

   async fillModelNameInput(name: string) {
      await this.modelNameInput.fill(name);
   }

   async clearModelNameInput() {
      await this.modelNameInput.clear();
   }
   
   async fillTechCharacteristicsTextArea(name: string) {
      await this.techCharacteristicsTextArea.fill(name);
   }

   async clearTechCharacteristicsTextArea() {
      await this.techCharacteristicsTextArea.clear();
   }

   async fillDescriptionTextArea(name: string) {
      await this.descriptionTextArea.fill(name);
   }

   async clearDescriptionTextArea() {
      await this.descriptionTextArea.clear();
   }

   async clickVehicleLocationInput() {
      await this.vehicleLocationInput.click();
   }

   async clickMapPopUpSubmitButton() {
      await this.mapPopUpSubmitButton.click();
   }

   async clickLocationSelectButton() {
      await this.locationSelectButton.click();
   }

   async clickCancelButton() {
      await this.cancelButton.click();
   }

   async clickMap() {
      await this.map.focus();
      await this.map.click({position: {x: 200, y: 100}});
   }

   async copyPaste(locator: Locator, name: any) {
      await locator.fill(name);
      await this.page.keyboard.press("Control+A");
      await this.page.keyboard.press("Control+C");
      await locator.clear();
      await this.page.keyboard.press("Control+V");
  }
  async verifyManufaktureNameNotFoundText101(name: string) {
     await expect(this.vehicleManufactureDropdownError)
         .toContainText(`На жаль, виробника ${'“'}${name[0].toUpperCase()}${name.slice(1, -1)}${'“'} не знайдено в нашій базі. Щоб додати виробника - зв\`яжіться із службою підтримки`);
  }
  async verifyManufaktureNameNotFound(name: string) {
     await expect(this.vehicleManufactureDropdownError)
         .toContainText(`На жаль, виробника ${'“'}${name}${'“'} не знайдено в нашій базі. Щоб додати виробника - зв\`яжіться із службою підтримки`);
  }
}