import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class CreateAnnouncementPage extends BasePage{
   
   // Heading
   createAnnouncementTitle: Locator;

   // Announcement form menu elements
   mainInfoHeader: Locator;
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
   vehicleManufacturerField: Locator;
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
   imageUploadTitle: Locator;
   imageUploadAsterix: Locator;
   description: Locator;
   imageUnit: Locator;
   imageDelete: Locator;
   mainImageLabel: Locator;
   imageBlock: Locator;
   image1: Locator;
   imageSrcFirst: Locator;
   image2: Locator;
   imageSrcSecond: Locator;
   popUpError: Locator;
   popUpCloseIcon: Locator;
   imageUploadedAll: Locator;
   popUpSaveBtn: Locator;
   popUpInvalidImageError: Locator;
   popUpInvalidImageCloseIcon: Locator;
   popUpInvalidImageSaveBtn: Locator;
   popUpInvalidImage: Locator;

   prevButton: Locator;
   servisesHeader: Locator;
   servicesSearchField: Locator;
   servicesInputTitle: Locator;
   servicesClueLine: Locator;
   servicesSearchLoop: Locator;
   servicesSearchInput: Locator;
   servicesSearchDropdown: Locator;
   servicesSearchResult: Locator;
   servicesSearchResultFirst: Locator;
   servicesSearchResultSecond: Locator;
   markSelected: Locator;
   choosedServicesTitle: Locator;
   servicesList: Locator;
   serviceListItem: Locator;
   servicesListRemoveBtn: Locator;
   notFoundServiceText: Locator;
   addNewServiceBtn: Locator;
   addNewServiceBtnIcon: Locator;
   serviceListItemFirst: Locator;
   serviceListItemSecond: Locator;
   serviceListRemoveBtnFirst: Locator;
   serviceListRemoveBtnSecond: Locator;
   addInfoError: Locator;

   priceTitle: Locator;
   paymentMethodTitle: Locator;
   paymentMethodAsterix: Locator;
   paymentMethod: Locator;
   paymentMethodField: Locator;
   paymentMethodDropdown: Locator;
   paymentCashOrCard: Locator;
   paymentNonCashNoVAT: Locator;
   paymentNonCashWithVAT: Locator;
   minCostTitle: Locator;
   minCostAsterix: Locator;
   minCostInput: Locator;
   currencyField: Locator;
   minCostFieldError: Locator;
   minCostField: Locator;

   contactsHeader: Locator;
   myContactsSurname: Locator;
   myContactsEdrpou: Locator;
   myContactsCellPhone: Locator;
   myContactsEmail: Locator;
   operatorContactsTitle: Locator;
   operatorCheckBox: Locator;
   checkBoxLabel: Locator;
   lastNameTitle: Locator;
   operatorLastNameField: Locator;
   operatorLastNameFieldErr: Locator;
   firstNameTitle: Locator;
   operatorFirstNameField: Locator;
   operatorFirstNameFieldErr: Locator;
   operatorMobileTitle: Locator;
   operatorMobileField: Locator;
   operatorMobileFieldErr: Locator;

   constructor(page: Page) {
    super(page);

    this.createAnnouncementTitle = page.locator('[class*="CreateEditFlowLayout_title"]');
    
    this.mainInfoHeader = page.locator('[class*="Characteristics_title"]');
    this.mainInfoButton = page.locator('//button[1]/div/span');
    this.mainInfoButtonNumber = page.locator("//button[1]/div/div/span");
    this.photoButton = page.locator('//button[2]/div/span');
    this.photoButtonNumber = page.locator('//button[2]/div/div/span')
    this.servicesButton = page.locator('//button[3]/div/span');
    this.servicesButtonNumber = page.locator("//button[3]/div/div/span");
    this.costButton = page.locator('//button[4]/div/span');
    this.costButtonNumber = page.locator("//button[4]/div/div/span");
    this.contactsButton = page.locator('//button[5]/div/span');
    this.contactsButtonNumber = page.locator("//button[5]/div/div/span");

   this.categoryTitle = page.locator('[class*="CategorySelect_title"]');
   this.categoryAsterix = page.locator('[class*="CategorySelect_title"]>span');
   this.categoryInput = page.getByTestId('buttonDiv');
   this.arrowDown = page.locator('[alt="Arrow-down"]');
   this.categoryErrorText = page.locator('[class*="CategorySelect_errorTextVisible"]');
   this.categoryPopUp = page.getByTestId('categoryPopupWrapper');
   this.categoryPopUpTitle = page.locator('[class*="CategoryPopup_title"]');
   this.closeIcon = page.getByTestId('closeIcon').getByTestId('crossIcon');
   this.budivelnaTekhnikaLink = page.getByTestId('list__budivelna-tekhnika').getByTestId('firstCategoryLabel');
   this.buroviUstanovkiLink = page.getByTestId('list__burovi-ustanovki').locator('div').first();
   this.palebiiniUstanovkiLink = page.getByTestId('list__palebiini-ustanovki');
   this.komunalnaTekhnikaLink = page.getByTestId('list__komunalna-tekhnika').getByTestId('firstCategoryWrapper');
   this.skladskaTekhnikaLink = page.getByTestId('list__skladska-tekhnika').getByTestId('firstCategoryWrapper');
   this.avariiniMashiniLink = page.getByTestId('list__avariini-mashini').getByTestId('checkLabel');
   this.avtomobiliShtabniLink = page.getByTestId('list__avtomobili-shtabni');
   this.tekhnikaDlyaSkladuvanniaLink = page.getByTestId('list__tekhnika-dlia-skladuvannia');
   this.vagyRoklaLink = page.getByTestId('list__vagi-rokla');
       
   this.unitNameTitle = page.locator('//div[@data-testid="customInputWrapper"][1]/div[1]');
   this.unitNameAsterix = page.getByTestId('customInputStar');
   this.unitNameInput = page.locator('//div[1]/div[2]/div/input');
   this.unitNameErrorText = page.locator('[class*="CustomInput_errorDescr"]');

   this.vehicleManufacturerTitle = page.locator('[class*="SelectManufacturer_title"]');
   this.vehicleManufacturerAsterix = page.locator('div[class*="SelectManufacturer_title"]>span');
   this.loupeSymbol = page.getByTestId('div-wrapper-customSelectWithSearch').locator('path');
   this.vehicleManufacturerInput = page.getByTestId('input-customSelectWithSearch');
   this.vehicleManufacturerField = page.getByTestId('div-wrapper-customSelectWithSearch');
   this.vehicleManufacturerInputError = page.locator('[class*="CustomSelectWithSearch_searchResultError"]');
   this.vehicleManufacturerErrorText = page.locator('[class*="CustomSelectWithSearch_errorTextVisible"]');
   this.vehicleManufacturerDropdown = page.locator('[class*="CustomSelectWithSearch_searchedServicesCat_wrapper"]');
   this.vehicleManufacturerSearchResult = page.locator('[class*="CustomSelectWithSearch_flexForServices"]:nth-child(1)');
   this.vehicleManufacturerChoosenResult = page.locator('[class*="CustomSelectWithSearch_serviceText"]');
   this.vehicleManufacturerDropdownError = page.getByTestId('p2-notFound-addNewItem');
   this.crossIcon = page.getByTestId('closeButton');
   this.symbolsCounter = page.getByTestId('maxLength');
   this.manufacturers = page.getByTestId('item-customSelectWithSearch')

   this.modelNameTitle = page.locator('//div[@data-testid="customInputWrapper"][2]/div[1]');
   this.modelNameInput = page.locator('//div[1]/div[4]/div/input');
   this.modelNameErrorText = page.getByTestId('descriptionError');

   this.techCharacteristicsTitle = page.locator('//div[@data-testid="wrapper-customTextAriaDescription"][1]/div[1]');
   this.techCharacteristicsTextArea = page.getByTestId('textarea-customTextAriaDescription').first();
   
   this.descriptionTitle = page.locator('//div[@data-testid="wrapper-customTextAriaDescription"][2]/div[1]');
   this.descriptionTextArea = page.getByTestId('textarea-customTextAriaDescription').nth(1);

   this.vehicleLocationTitle = page.locator('[class*="AddressSelectionBlock_title"]');
   this.vehicleLocationInput = page.getByTestId('mapLabel');
   this.vehicleLocationAsterix = page.locator('[class*="AddressSelectionBlock_title"]>span');
   this.vehicleLocationErrorText = page.locator('[class*="AddressSelectionBlock_errorTextVisible"]');

   this.mapPopUp = page.locator('[class*="MapPopup_body"]');
   this.mapPopUpTitle = page.locator('[class*="MapPopup_title"]');
   this.mapPopUpCloseIcon = page.locator('[class*="MapPopup_icon"]');
   this.mapPopUpSubmitButton = page.locator('[class*="ItemButtons_darkBlueBtn"]');
   this.locationSelectButton = page.locator('[class*="AddressSelectionBlock_locationBtn"]');
   this.mapPopUpAddress = page.locator('[class*="MapPopup_address"]');
   this.map = page.locator('#map');

   this.cancelButton = page.locator('[class*="ButtonsFlow_emptyBtn"]');
   this.nextButton = page.getByTestId('nextButton');

   this.photoTitle = page.locator('//div[@data-testid="ImagesUnitFlow"]/div[1]')
   this.imageUploadTitle = page.locator('[class*="ImagesUnitFlow_paragraph"]')
   this.imageUploadAsterix = page.locator('[class*="ImagesUnitFlow_paragraph"]>span')
   this.description = page.getByTestId('description')
   this.imageUnit = page.locator('[data-testid="imageBlock"]:nth-child(1)')
   this.imageDelete = page.locator('//div[@data-testid="imageBlock"][1]//div[@data-testid="deleteImage"]')
   this.mainImageLabel = page.locator('div[data-testid="mainImageLabel"]')
   this.imageBlock = page.locator('div[data-testid="description"]~div>div')
   this.image1 = page.locator('div[data-testid="imageBlock"]:nth-child(1)')
   this.imageSrcFirst = page.locator('div[data-testid="imageBlock"]:nth-child(1) img')
   this.image2 = page.locator('div[data-testid="imageBlock"]:nth-child(2)')
   this.imageSrcSecond = page.locator('div[data-testid="imageBlock"]:nth-child(2) img')
   this.imageUploadedAll = page.locator("//img[contains(@src, 'base')]")

   this.popUpError = page.locator('div[data-testid="errorPopup"]')
   this.popUpCloseIcon = page.locator('div[data-testid="closeIcon"]')
   this.popUpSaveBtn = page.locator('div[style="order: unset;"]>button')
   this.popUpInvalidImageError = page.locator('div[data-testid="errorPopup"]')
   this.popUpInvalidImageCloseIcon = page.locator('div[data-testid="closeIcon"]')
   this.popUpInvalidImageSaveBtn = page.locator('div[style="order: unset;"]>button')
   this.popUpInvalidImage = page.locator('div[data-testid="wrapper"]>div')

   this.prevButton = page.getByTestId('prevButton')
   
   this.servisesHeader = page.locator("[class*='ServicesUnitFlow_title']")
   this.servicesSearchField = page.getByTestId('searchResult')
   this.servicesInputTitle = page.locator('[class*="ServicesUnitFlow_paragraph"]')
   this.servicesClueLine = page.getByTestId('add-info')
   this.servicesSearchLoop = page.locator('div[data-testid="searchResult"]>div>svg')
   this.servicesSearchInput = page.locator('div[data-testid="searchResult"]>div>input')
   this.servicesSearchDropdown = page.locator('[class*="ServicesUnitFlow_searchedServicesCatWrapper"]')
   this.servicesSearchResult = page.locator('//div[@data-testid="searchItem-servicesUnitFlow"]')
   this.servicesSearchResultFirst = page.locator('div[data-testid="searchItem-servicesUnitFlow"]:nth-child(1)>div')
   this.markSelected = page.locator('//div[@data-testid="searchItem-servicesUnitFlow"][1]')
   this.choosedServicesTitle = page.locator('div[class*="ServicesUnitFlow_wrapper"]>div:nth-child(5)')
   this.serviceListItem = page.getByTestId('item-servicesUnitFlow')
   this.servicesList = page.locator('[class*="ServicesUnitFlow_searchedServicesCatWrapper"]>div')
   this.servicesListRemoveBtn = page.getByTestId('remove-servicesUnitFlow')
   this.notFoundServiceText = page.getByTestId('p2-notFound-addNewItem')
   this.addNewServiceBtn = page.getByTestId('btn-addNewItem')
   this.addNewServiceBtnIcon = page.getByTestId('svg-plus-addNewItem')
   this.servicesSearchResultSecond = page.locator('//div[@data-testid="searchItem-servicesUnitFlow"][2]/div')
   this.serviceListItemFirst = page.locator('[data-testid="item-servicesUnitFlow"]:nth-child(1)')
   this.serviceListItemSecond = page.locator('[data-testid="item-servicesUnitFlow"]:nth-child(2)')
   this.serviceListRemoveBtnFirst = page.locator('//div[@data-testid="item-servicesUnitFlow"][1]//button')
   this.serviceListRemoveBtnSecond = page.locator('//div[@data-testid="item-servicesUnitFlow"][2]//button')
   this.addInfoError = page.getByTestId('add-info');

   this.priceTitle = page.locator('[class*="PricesUnitFlow_title"]');
   this.paymentMethodTitle = page.locator('[class*="PricesUnitFlow_paragraph"]:nth-child(2)');
   this.paymentMethodAsterix = page.locator('[class*="PricesUnitFlow_paragraph"]:nth-child(2)>span');
   this.paymentMethod = page.locator('[class*="CustomSelect_value"]');
   this.paymentMethodField = page.getByTestId('div_CustomSelect');
   this.paymentMethodDropdown = page.getByTestId('listItems-customSelect');
   this.paymentCashOrCard = page.locator('li[class*="CustomSelect_option"]:nth-child(1)');
   this.paymentNonCashNoVAT = page.locator('li[class*="CustomSelect_option"]:nth-child(2)');
   this.paymentNonCashWithVAT = page.locator('li[class*="CustomSelect_option"]:nth-child(3)');
   this.minCostTitle = page.locator('[class*="PricesUnitFlow_paragraph"]:nth-child(4)');
   this.minCostAsterix = page.locator('[class*="PricesUnitFlow_paragraph"]:nth-child(4)>span');
   this.minCostInput = page.locator('[class*="RowUnitPrice_inputWithError"]>div>input');
   this.minCostField = page.locator('[class*="RowUnitPrice_inputWithError"]>div:nth-child(1)');
   this.currencyField = page.locator('[class*="RowUnitPrice_currencyText"]');
   this.minCostFieldError = page.getByTestId('div_required_RowUnitPrice')

   this.contactsHeader = page.locator('[class*="AuthContactCard_title"]')
   this.myContactsSurname = page.locator('[data-testid="userName"]')
   this.myContactsEdrpou = page.locator('[data-testid="edrpou"]')
   this.myContactsCellPhone = page.locator('div[class*="AuthContactCard_info"]>div:nth-child(4)>div~div')
   this.myContactsEmail = page.locator('div[class*="AuthContactCard_info"]>div:nth-child(5)>div~div')
   this.operatorContactsTitle = page.locator('[class*="OperatorCheckbox_title"]')
   this.operatorCheckBox = page.locator('#operator')
   this.checkBoxLabel = page.locator('[for="operator"]')
   this.lastNameTitle = page.locator('div[class*="OperatorForm_wrapperName"]>div:nth-child(1)>div:nth-child(1)')
   this.operatorLastNameField = page.locator('[name="fNameOperator"]')
   this.operatorLastNameFieldErr = page.locator('input[name="fNameOperator"]~div')
   this.firstNameTitle = page.locator('div[class*="OperatorForm_wrapperName"]>div:nth-child(2)>div:nth-child(1)')
   this.operatorFirstNameField = page.locator('input[name="lNameOperator"]')
   this.operatorFirstNameFieldErr = page.locator('input[name="lNameOperator"]~div')
   this.operatorMobileTitle = page.locator('[class*="OperatorForm_title"]')
   this.operatorMobileField = page.locator('#mobile')
   this.operatorMobileFieldErr = page.locator('input[id="mobile"]~p')
   

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

   async fillVehicleManufacturerInput(term: string) {
      await this.vehicleManufacturerInput.fill(term);
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

   async copyPaste(locator: Locator, value: string) {
      const mod = process.platform === "darwin" ? "Meta" : "Control";
      await locator.fill(value);
      await locator.press(`${mod}+A`);
      await locator.press(`${mod}+C`);
      await locator.fill('');
      await locator.focus();
      await locator.press(`${mod}+V`);
      }
   
   async verifyManufacturerNameNotFoundText101(name: string) {
      await expect(this.vehicleManufacturerDropdownError)
         .toContainText(`На жаль, виробника ${'“'}${name[0].toUpperCase()}${name.slice(1, -1)}${'“'} не знайдено в нашій базі. Щоб додати виробника - зв\`яжіться із службою підтримки`);
   }

   async verifyManufacturerNameNotFound(name: string) {
      await expect(this.vehicleManufacturerDropdownError)
         .toContainText(`На жаль, виробника ${'“'}${name}${'“'} не знайдено в нашій базі. Щоб додати виробника - зв\`яжіться із службою підтримки`);
   }

   async clickImageUnit(){
   await this.imageUnit.click()
   }

   async clickImageBlock(locator: Locator){
   await locator.click()
   }

   async clickPopUpCloseIcon(){
   await this.popUpCloseIcon.click()
   }

   async clickPopUpSaveBtn(){
   await this.popUpSaveBtn.click()
   }

   async clickPopUpInvalidImageCloseIcon(){
   await this.popUpInvalidImageCloseIcon.click()
   }

   async clickPopUpInvalidImageSaveBtn(){
   await this.popUpInvalidImageSaveBtn.click()
   }

   async clickPrevButton(){
   await this.prevButton.click()
   }

   async fillServisesSearchInput(name: any){
   await this.servicesSearchInput.fill(name)
   }

   async clearServisesSearchInput(){
   await this.servicesSearchInput.clear()
   }

   async clickServicesSearchResultFirst(){
   await this.servicesSearchResultFirst.click()
   }

   async verifyNotFoundServiceText(name: string){
      expect(this.notFoundServiceText).toHaveText(`На жаль, послугу ${'“'}${name}${'“'} не знайдено в нашій базі. Ви можете додати послугу в категорію 
         “Користувацькі”:`)
   }

   async clickAddNewServiceBtn(){
   await this.addNewServiceBtn.click()
   }

     async clickServiceListRemoveBtnFirst(){
   await this.serviceListRemoveBtnFirst.click()
   }

   async clickServiceListRemoveBtnSecond(){
   await this.serviceListRemoveBtnSecond.click()
   }

   async clickPaymentMethodField(){
   await this.paymentMethodField.click()
   }

   async clickPaymentCashOrCard(){
   await this.paymentCashOrCard.click()
   }

   async clickPaymentNonCashNoVAT(){
   await this.paymentNonCashNoVAT.click()
   }

   async clickPaymentNonCashWithVAT(){
   await this.paymentNonCashWithVAT.click()
   }

   async fillMinCostField(value: any){
   await this.minCostInput.fill(value)
   }

   async clearMinCostField(){
   await this.minCostInput.clear()
   }

   async clickCheckBoxLabel(){
   await this.checkBoxLabel.click()
   }

   async fillOperatorLastNameField(value: any){
   await this.operatorLastNameField.fill(value)
   }

   async fillOperatorFirstNameField(value: any){
   await this.operatorFirstNameField.fill(value)
   }

   async fillOperatorMobileField(value: any){
   await this.operatorMobileField.fill(value)
   }

   async clickOperatorMobileField(){
   await this.operatorMobileField.click()
   }

   async clearOperatorLastNameField(){
   await this.operatorLastNameField.clear()
   }

   async clearOperatorFirstNameField(){
   await this.operatorFirstNameField.clear()
   }

   async clearOperatorMobileField(){
   await this.operatorMobileField.clear()
   }  
}