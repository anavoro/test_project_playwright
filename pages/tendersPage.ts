import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class TendersPage extends BasePage {

  //Main Information
  createTenderBtn: Locator;
  tenderNameInput: Locator;
  tenderNameError: Locator;
  serviceNameInput: Locator;
  serviceNameOutput: Locator;
  serviceNameFirstItem: Locator;
  serviceNameCloseBtn: Locator;
  addNewItemWrapper: Locator;
  addNewItem: Locator;
  serviceNameError:Locator;
  endPicker: Locator;
  calendar: Locator;
  endError: Locator;
  periodOfProposalError: Locator;
  periodOfWorkPicker: Locator;
  periodOfWorkError: Locator;
  dayPicker: Locator;
  allDays: Locator;
  timePicker: Locator;
  nextMonth: Locator;
  budgetInput: Locator;
  budgetError: Locator;
  choseOnMapInput: Locator;
  cityInput: Locator;
  map: Locator;
  cancellBtn: Locator;
  confirmBtn: Locator;
  choseOnMapBtn: Locator;
  choseOnMapError: Locator;
  infoTextArea: Locator;
  infoError: Locator;
  prevBtn: Locator;
  nextBtn: Locator;
  telegramCrossIcon: Locator;

  //Documentation
  documentContainer: Locator;
  documentationErrorText: Locator;
  fileContainer: Locator;
  fileInput: Locator;
  errorPopup: Locator;
  popupAgreeBtn: Locator;

  //Contacts
  userInfo: Locator;
  checkbox: Locator;
  lastName: Locator;
  firstName: Locator;
  nameError: Locator;
  mobile: Locator;
  mobileError: Locator;

  //Creation
  agreementPopup: Locator;
  acceptBtn: Locator;
  declineBtn: Locator;
  createdTenderText: Locator;
  createdTendersBtn: Locator;

  //Pending
  pendingTab: Locator;
  pendingTenderName: Locator;
  pendingTenderDates: Locator;
  pendingTenderBudget: Locator;

  constructor(page: Page) {
    super(page);

    //Main Information
    this.createTenderBtn = page.getByRole("button", {name: 'Створити тендер', exact: true});
    this.tenderNameInput = page.getByPlaceholder('Введіть назву тендера');
    this.tenderNameError = this.tenderNameInput.locator('..').locator('[data-testid="descriptionError"]');
    this.serviceNameInput = page.locator('[data-testid="input-customSelectWithSearch"]');
    this.serviceNameOutput = page.locator('[data-testid="div-service-customSelectWithSearch"] div');
    this.serviceNameFirstItem = page.locator('[class^="CustomSelectWithSearch_searchedServicesCat"] > div').nth(0);
    this.serviceNameCloseBtn = page.locator('[data-testid="closeButton"]');
    this.addNewItemWrapper = page.locator('[class^="AddNewItem"] p');
    this.addNewItem = page.locator('[data-testid="btn-addNewItem"]');
    this.serviceNameError = page.locator('[class^="CustomSelectWithSearch_errorTextVisible__"]');
    this.endPicker = page.locator('[data-testid="datePicker"] input').nth(1);
    this.calendar = page.locator('.react-datepicker-popper');
    this.endError = page.locator('[data-testid="errorMessage"]').nth(1);
    this.periodOfProposalError = page.locator('[class^="PeriodOfProposals_error"]');
    this.periodOfWorkPicker = page.locator('[data-testid="datePicker"] input').nth(2);
    this.periodOfWorkError = page.locator('[class^="DateContainer_container"] [data-testid="errorMessage"]').nth(2);;
    this.dayPicker = page.locator('[class^="react-datepicker__day"][aria-disabled="false"]');
    this.allDays = page.locator('[class^="react-datepicker__day"]');
    this.timePicker = page.locator('[class^="react-datepicker__time"] li');
    this.nextMonth = page.locator('[aria-label="Next Month"]');
    this.budgetInput = page.locator('[class^="CreateItemPrice_"] input');
    this.budgetError = page.locator('[class^="CreateItemPrice_"] [data-testid="descriptionError"]');
    this.choseOnMapInput = page.locator('[data-testid="mapLabel"]');
    this.cityInput = page.locator('[data-testid="cityInput"]')
    this.map = page.locator('#map');
    this.cancellBtn = page.locator('[class^="MapPopup_btns"] button').nth(0);
    this.confirmBtn = page.locator('[class^="MapPopup_btns"] button').nth(1);
    this.choseOnMapBtn = page.locator('[data-testid="choseOnMap"]');
    this.choseOnMapError = page.locator('[class^="AddressSelectionBlock_errorTextVisible__"]');
    this.infoTextArea = page.locator('[data-testid="textAreaInput"]');
    this.infoError = page.locator('[data-testid="textAreaError"]');
    this.prevBtn = page.locator('[data-testid="prevButton"]');
    this.nextBtn = page.locator('[data-testid="nextButton"]');
    this.telegramCrossIcon = page.locator('[class^="RequestsPopup"] [data-testid="crossButton"]');

    //Documentation
    this.documentContainer = page.getByRole("tabpanel");
    this.documentationErrorText = page.locator('[data-testid="getFileDiv"]');
    this.fileContainer = page.locator('[data-testid="dropDiv"]');
    this.fileInput = page.locator('[data-testid="dropDiv"] input');
    this.errorPopup = page.locator('[data-testid="errorPopup"]');
    this.popupAgreeBtn = page.locator('[data-testid="errorPopup"]~div button');

    //Contacts
    this.userInfo = page.locator('[data-testid="userInfo"]');
    this.checkbox = page.locator('[data-testid="operatorCheckbox"]');
    this.lastName = page.locator('[data-testid="wrapper"] input').nth(0);
    this.firstName = page.locator('[data-testid="wrapper"] input').nth(1);
    this.nameError = page.locator('[data-testid="errorDescr"]');
    this.mobile = page.locator('#mobile');
    this.mobileError = page.locator('[data-testid="errorMessage"]');

    //Creation
    this.agreementPopup = page.locator('[data-testid="text"]');
    this.acceptBtn = page.getByRole("button", {name: 'Так, створити', exact: true});
    this.declineBtn = page.getByRole("button", {name: 'Скасувати', exact: true});
    this.createdTenderText = page.locator('[class^="SuccessfullyCreatedPage_wrapper"]');
    this.createdTendersBtn = page.getByRole("button", {name: 'Переглянути в моїх тендерах', exact: true});

    //Pending
    this.pendingTab = page.getByRole('tab', { name: 'Очікуючі' });
    this.pendingTenderName = page.locator('[class^="CurrentItemInfo_name"]');
    this.pendingTenderDates = page.locator('[class^="ParagraphWithIcon_paragraph"]').nth(0);
    this.pendingTenderBudget = page.locator('[class^="CurrentItemPrice_price"]').nth(1);
  }

  getDayLocator(day: string) {
    return this.allDays.filter({ hasText: new RegExp(`^${day}$`) }).first();
  }

  async clickCreateTenderBtn() {
    await this.createTenderBtn.click();
  }

  async clickNextBtn() {
    await this.nextBtn.click();
  }

  async clickEndPicker() {
    await this.endPicker.click();
  }

  async clickPeriodOfWorkPicker() {
    await this.periodOfWorkPicker.click();
  }

  async clickChooseOnMap() {
    await this.choseOnMapBtn.click();
  }

  async clickAgreeBtn() {
    await this.popupAgreeBtn.click();
  }

  async clickDeclineBtn() {
    await this.declineBtn.click();
  }

  async clickCreateBtn() {
    await this.acceptBtn.click();
  }

  async goToCreatedTenders() {
    await this.createdTendersBtn.click();
  }

  async closeMapWindow() {
    await this.cancellBtn.click();
  }

  async uncheckCheckbox() {
    await this.checkbox.click();
  }

    async resetServiceName() {
    await this.serviceNameCloseBtn.click();
  }

  async fillTenderName(tenderName: string) {
    await this.tenderNameInput.fill(tenderName);
  }

  async fillServiceName(serviceName: string) {
    if (await this.serviceNameCloseBtn.isVisible()) {
      await this.resetServiceName();
    }
    await this.serviceNameInput.fill(serviceName);
  }

  async fillBudget(budget: string) {
    await this.budgetInput.fill(budget);
  }

  async fillText(text: string) {
    await this.infoTextArea.fill(text);
  }

  async fillLastName(name: string) {
    await this.lastName.fill(name);
  }

  async fillFirstName(name: string) {
    await this.firstName.fill(name);
  }

  async fillPhone(phone: string) {
    await this.mobile.fill(phone);
  }

  async pasteTenderName(value: string) {
    await this.pasteValue(this.tenderNameInput, value);
  }

  async pasteServiceName(value: string) {
    if (await this.serviceNameCloseBtn.isVisible()) {
      await this.resetServiceName();
    }
    await this.pasteValue(this.serviceNameInput, value);
    await this.serviceNameFirstItem.click();
  }

  async pasteBudget(value: string) {
    await this.pasteValue(this.budgetInput, value);
  }

  async pasteText(value: string) {
    await this.pasteValue(this.infoTextArea, value);
  }

  async pasteLastName(value: string) {
    await this.pasteValue(this.lastName, value);
  }

  async pasteFirstName(value: string) {
    await this.pasteValue(this.firstName, value);
  }

  async fillTenderFields(tenderName?: string, serviceName?: string, day?: string, from?: string, to?: string, budget?: string, city?: string, text?: string) {
    if (tenderName) await this.fillTenderName(tenderName);
    if (serviceName) await this.fillAndClickServiceName(serviceName);
    if (day) await this.selectEndDay(day);
    if (from && to) await this.selectPeriodOfWork(from, to);
    if (budget) await this.fillBudget(budget);
    if (city) await this.fillCity(city);
    if (text) await this.fillText(text);
  }

  async fillAndClickServiceName(serviceName: string) {
    if (await this.serviceNameCloseBtn.isVisible()) {
      await this.resetServiceName();
    }
    await this.serviceNameInput.fill(serviceName);
    await this.serviceNameFirstItem.click();
  }

  async fillCity(city: string) {
    await this.clickChooseOnMap();
    await this.cityInput.fill(city);
    await this.confirmBtn.click();
  }

  async fillContact(lastName: string, firstName: string, phone: string) {
    await this.fillLastName(lastName);
    await this.fillFirstName(firstName);
    await this.fillPhone(phone);
  }

  async pasteValue(locator: Locator, value: string) {
    await locator.focus();
    await locator.fill('');
    await this.page.evaluate((text) => navigator.clipboard.writeText(text), value);
    const pasteShortcut = process.platform === 'darwin' ? 'Meta+V' : 'Control+V';
    await this.page.keyboard.press(pasteShortcut);
  }

  async pickTime(time: string) {
    const timeLocator = this.timePicker.filter({ hasText: time });
    await timeLocator.first().scrollIntoViewIfNeeded();
    await timeLocator.first().click();
  }

  async getDisabledDaysBefore(date: string) {
    const targetDay = Number(date);
    const count = await this.allDays.count();
    const disabledLocators = [];
    for (let i = 0; i < count; i++) {
      const text = await this.allDays.nth(i).innerText();
      const dayNumber = Number(text.trim());
      if (!isNaN(dayNumber) && dayNumber < targetDay) {
        disabledLocators.push(this.allDays.nth(i));
      }
    }
    return disabledLocators;
  }

  async selectEndDay(day: string) {
    await this.click(this.endPicker);
    const [endDay, endTime] = day.split(' ');
    await this.selectDay(endDay);
    await this.pickTime(endTime);
  }

  async selectPeriodOfWork(from?: string, to?: string) {
    if (from) {
      await this.clickPeriodOfWorkPicker();
      await this.selectDay(from);
    }

    if (to) {
      await this.clickPeriodOfWorkPicker();
      await this.selectDay(to);

      const value = await this.periodOfWorkPicker.inputValue();
      const hasEnd = value.includes(' - ') && value.split(' - ')[1].trim().length > 0;

      if (!hasEnd) {
        await this.clickPeriodOfWorkPicker();
        await this.selectDay(to);
      }
    }
  }

  async selectDay(day: string) {
    let dayLocator = this.dayPicker.filter({ hasText: new RegExp(`^${day}$`) });
    if (await dayLocator.count() === 0) {
      await this.nextMonth.click();
      dayLocator = this.dayPicker.filter({ hasText: new RegExp(`^${day}$`) });
    }
    await dayLocator.first().click();
  }
 
  async dragMapAndClickCenter() {
    const map = this.map;
    if (!map) throw new Error('Map not found');
    await map.hover();
    for (let i = 0; i < 3; i++) {
      await this.page.mouse.wheel(0, 1500);
    }
    const box = await map.boundingBox();
    if (!box) throw new Error('Map bounding box not found');
    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;
    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    await this.page.mouse.move(startX - 200, startY - 600, { steps: 15 });
    await this.page.mouse.up();
    await this.page.mouse.click(startX, startY);
  }
  
  async uploadFiles(files: { name: string, mimeType: string, buffer: Buffer }[]) {
    if (await this.fileContainer.isVisible()) {
      await this.fileInput.setInputFiles(files);
    }
    this.clickNextBtn()
    await this.fileInput.setInputFiles(files);
  }
}
