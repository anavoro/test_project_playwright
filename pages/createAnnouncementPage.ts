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

   // Vehicle manufacturer section elements
   vehicleManufacturerTitle: Locator;
   vehicleManufacturerAsterix: Locator;
   loupeSymbol: Locator;
   vehicleManufacturerInput: Locator;
   vehicleManufacturerErrorText: Locator;
   vehicleManufacturerDropdown: Locator;
   vehicleManufacturerSearchResult: Locator;
   vehicleManufacturerDropdownError: Locator;
   crossIcon: Locator;
   vehicleManufacturerInputError: Locator;
   vehicleManufacturerChoosenResult: Locator;
   symbolsCounter: Locator;
   manufacturers: Locator;

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
   technicalToolPhoto: Locator;
   technicalToolAsterix: Locator;
   clueLine: Locator;
   imageUnit: Locator;
   imageDelete: Locator;
   mainImageLabel: Locator;

   constructor(page: Page) {
    super(page);

    this.createAnnouncementTitle = page.locator("main>div>div:nth-child(2)>div:nth-child(1)");

    this.mainInfoButton = page.locator('//button[1]/div/span');
    this.mainInfoButtonNumber = page.locator("//button[1]/div/div/span");
    this.photoButton = page.locator('//button[2]/div/span');
    this.photoButtonNumber = page.locator("//button[2]/div/div/span");
    this.servicesButton = page.locator('//button[3]/div/span');
    this.servicesButtonNumber = page.locator("//button[3]/div/div/span");
    this.costButton = page.locator('//button[4]/div/span');
    this.costButtonNumber = page.locator("//button[4]/div/div/span");
    this.contactsButton = page.locator('//button[5]/div/span');
    this.contactsButtonNumber = page.locator("//button[5]/div/div/span");

   this.categoryTitle = page.locator('.CategorySelect_title__W8Hgo');
   this.categoryAsterix = page.locator('//div[@data-testid="wrapper-characteristics"]/div/div/div/div[1]/div[1]');
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
   this.avtomobiliShtabniLink = page.locator('div[data-testid="list__avtomobili-shtabni"]');
   this.tekhnikaDlyaSkladuvanniaLink = page.locator('div[data-testid="list__tekhnika-dlya-skladuvannia"]');
   this.vagyRoklaLink = page.locator('div[data-testid="list__vagi-rokla"]');
       
   this.unitNameTitle = page.locator('div[data-testid="customInputWrapper"]:nth-of-type(2)>div:nth-of-type(1)');
   this.unitNameAsterix = page.locator('[data-testid="customInputStar"]');
   this.unitNameInput = page.locator('div[class="UnitInfo_mainInfo__g4aYl"]>div:nth-child(2) input');
   this.unitNameErrorText = page.locator('[data-testid="descriptionError"]');

   this.vehicleManufacturerTitle = page.locator('.SelectManufacturer_title__X9AEw');
   this.vehicleManufacturerAsterix = page.locator('div[class="SelectManufacturer_title__X9AEw"]>span');
   this.loupeSymbol = page.getByTestId('div-wrapper-customSelectWithSearch').locator('path');
   this.vehicleManufacturerInput = page.locator('[data-testid="input-customSelectWithSearch"]');
   this.vehicleManufacturerInputError = page.locator('.CustomSelectWithSearch_searchResultError__Q9xtO');
   this.vehicleManufacturerErrorText = page.locator('.CustomSelectWithSearch_errorTextVisible__B5lZH');
   this.vehicleManufacturerDropdown = page.locator('.CustomSelectWithSearch_searchedServicesCat_wrapper__aOGc3');
   this.vehicleManufacturerSearchResult = page.locator('.CustomSelectWithSearch_flexForServices__EW4k9:nth-child(1)');
   this.vehicleManufacturerChoosenResult = page.locator('.CustomSelectWithSearch_serviceText__seBcv');
   this.vehicleManufacturerDropdownError = page.locator('[data-testid="p2-notFound-addNewItem"]');
   this.crossIcon = page.locator('[data-testid="closeButton"]');
   this.symbolsCounter = page.getByTestId('maxLength');
   this.manufacturers = page.locator('[data-testid="item-customSelectWithSearch"]')

   this.modelNameTitle = page.locator('div[data-testid="customInputWrapper"]:nth-of-type(4)>div:nth-child(1)');
   this.modelNameInput = page.locator('div[data-testid="customInputWrapper"]:nth-of-type(4)>div~div>input');
   this.modelNameErrorText = page.locator('[data-testid="descriptionError"]');

   this.techCharacteristicsTitle = page.locator('div[class="Characteristics_info__Eza6o"]>div:nth-child(2)>div:nth-child(1)');
   this.techCharacteristicsTextArea = page.getByTestId('textarea-customTextAriaDescription').first();
   
   this.descriptionTitle = page.locator('div[class="Characteristics_info__Eza6o"]>div:nth-child(3)>div:nth-child(1)');
      
   
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
   this.technicalToolPhoto = page.locator('div[data-testid="ImagesUnitFlow"]>div:nth-child(2)')
   this.technicalToolAsterix = page.locator('div[data-testid="ImagesUnitFlow"]>div:nth-child(2)>span')
   this.clueLine = page.locator('div[data-testid="ImagesUnitFlow"]>div:nth-child(3)')
   this.imageUnit = page.locator('div[data-testid="description"]~div>div:nth-child(1)')
   this.imageDelete = page.locator('div[data-testid="imageBlock"]:nth-child(1)>div~img~div[data-testid="deleteImage"]')
   this.mainImageLabel = page.locator('div[data-testid="mainImageLabel"]')
   
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

   async fillVehicleManufacturerInput(name: string | any) {
      await this.vehicleManufacturerInput.fill(name);
   }

   async clickVehicleManufacturerSearchResult() {
      await this.vehicleManufacturerSearchResult.click();
   }
   
   async clickCrossIcon() {
      await this.crossIcon.click();
   }

   async clearVehicleManufacturerInput() {
      await this.vehicleManufacturerInput.clear()
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
  async verifyManufakturerNameNotFoundText101(name: string) {
     await expect(this.vehicleManufacturerDropdownError)
         .toContainText(`На жаль, виробника ${'“'}${name[0].toUpperCase()}${name.slice(1, -1)}${'“'} не знайдено в нашій базі. Щоб додати виробника - зв\`яжіться із службою підтримки`);
  }
  async verifyManufakturerNameNotFound(name: string) {
     await expect(this.vehicleManufacturerDropdownError)
         .toContainText(`На жаль, виробника ${'“'}${name}${'“'} не знайдено в нашій базі. Щоб додати виробника - зв\`яжіться із службою підтримки`);
  }

  async clickImageUnit(){
   await this.imageUnit.click()
  }

}