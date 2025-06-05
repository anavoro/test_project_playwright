import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { TendersPage } from '../pages/tendersPage';
import { registeredUser } from '../constants/authData';
import { texts } from '../constants/tendersData';
import * as tendersData from '../constants/tendersDataGenerator';
import * as usersData from '../constants/authDataGenerator';
import { formatDateValue, getNormalizedText, extractDay } from '../utils/formatHelper';

test.describe('Tenders Tests', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const email = registeredUser.email;
    const password = registeredUser.password;

    await page.setViewportSize({ width: 1536, height: 864 });
    await page.context().clearCookies();
    await homePage.goto('/');
    await homePage.clickLogin();
    await loginPage.login(email, password);
    await homePage.goToTenders();
  });

    test('Create tender, empty fields validation', async ({page}) => {
      const tendersPage = new TendersPage(page);
      const {tenderName, serviceName, endDate, budget, city, info, periodOfWork: { start, end }} = tendersData.validTenderValues;
        
      await tendersPage.clickCreateTenderBtn();
      await tendersPage.clickNextBtn();
      await expect(tendersPage.tenderNameError).toHaveText(texts.tenderNameErrorText);
      await expect(tendersPage.serviceNameError).toHaveText(texts.requiredFieldText);
      await expect(tendersPage.endError).toHaveText(texts.requiredFieldText);
      await expect(tendersPage.budgetError).toHaveText(texts.requiredFieldText);
      await expect(tendersPage.choseOnMapError).toHaveText(texts.mapErrorText);
      await expect(tendersPage.infoError).toHaveText(texts.textAreaErrorText(0));
        
      await tendersPage.fillTenderFields(tenderName, serviceName, endDate, start, end, budget, city, info);
      await expect(tendersPage.tenderNameError).not.toBeVisible();
      await expect(tendersPage.serviceNameError).not.toBeVisible();
      await expect(tendersPage.endError).not.toBeVisible();
      await expect(tendersPage.budgetError).not.toBeVisible();
      await expect(tendersPage.choseOnMapError).not.toBeVisible();
      await expect(tendersPage.infoError).not.toBeVisible();
    });

    test('Create tender, TenderName field validation', async ({page}) => {
      const tendersPage = new TendersPage(page);
      const {serviceName, endDate, budget, city, info, periodOfWork: { start, end }} = tendersData.validTenderValues;
      const lessThenTen = tendersData.invalidTenderValues.tenderName.lessThenTen;
      const withRestrictedSymbolName = Object.values(tendersData.invalidTenderValues.tenderName.withRestrictedSymbol);
      const with71Symbol = tendersData.invalidTenderValues.tenderName.with71Symbol;

      await tendersPage.clickCreateTenderBtn();
      await tendersPage.fillTenderFields(undefined, serviceName, endDate, start, end, budget, city, info);
      await tendersPage.clickNextBtn();
      await expect(tendersPage.tenderNameError).toHaveText(texts.tenderNameErrorText);
      await expect(tendersPage.tenderNameError).toBeInViewport();

      await tendersPage.fillTenderName(lessThenTen);
      await tendersPage.clickNextBtn();
      await expect(tendersPage.tenderNameError).toHaveText(texts.tenderNameErrorText);
      await expect(tendersPage.tenderNameError).toBeInViewport();

      for (const invalidName of withRestrictedSymbolName) {
        await tendersPage.fillTenderName(invalidName);
        await expect(tendersPage.tenderNameInput).toHaveValue(invalidName.slice(0, -1));
        await expect(tendersPage.tenderNameError).not.toBeVisible();
      };

      for (const invalidName of withRestrictedSymbolName) {
        await tendersPage.pasteTenderName(invalidName);
        await expect(tendersPage.tenderNameInput).toHaveValue(invalidName.slice(0, -1));
        await expect(tendersPage.tenderNameError).not.toBeVisible();
      };

      await tendersPage.fillTenderName(with71Symbol);
      await expect(tendersPage.tenderNameInput).toHaveValue(with71Symbol.slice(0, 70));
    });

    test('Create tender, ServiceName field validation', async ({page}) => {
      const tendersPage = new TendersPage(page);
      const {tenderName, serviceName, endDate, budget, city, info, periodOfWork: { start, end }} = tendersData.validTenderValues;
      const withRestrictedSymbolService = Object.values(tendersData.invalidTenderValues.serviceName.withRestrictedSymbol);
      const with101Symbol = tendersData.invalidTenderValues.serviceName.with101Symbol;
        
      await tendersPage.clickCreateTenderBtn();
      await tendersPage.fillTenderFields(tenderName, serviceName, endDate, start, end, budget, city, info);
      await tendersPage.resetServiceName();
      await expect(tendersPage.serviceNameCloseBtn).not.toBeVisible();
      await expect(tendersPage.serviceNameInput).toHaveValue('');

      await tendersPage.clickNextBtn();
      await expect(tendersPage.serviceNameError).toHaveText(texts.requiredFieldText);
      await expect(tendersPage.serviceNameError).toBeInViewport();

      for (const invalidService of withRestrictedSymbolService) {
        await tendersPage.fillAndClickServiceName(invalidService);
        await expect(tendersPage.serviceNameOutput).toContainText(invalidService.slice(0, -1));
      };

      await tendersPage.fillServiceName(with101Symbol);
      expect(getNormalizedText(await tendersPage.addNewItemWrapper.textContent())).toBe(texts.nonExistingServiceText(with101Symbol.slice(0, 100)));

      for (const invalidService of withRestrictedSymbolService) {
        await tendersPage.pasteServiceName(invalidService);
        await expect(tendersPage.serviceNameOutput).toContainText(invalidService.slice(0, -1));
      };
    });

    test('Create tender, DataPicker fields validation', async ({ page }) => {
      const tendersPage = new TendersPage(page);
      const {tenderName, serviceName, budget, city, info} = tendersData.validTenderValues;
      const invalidEndDay = tendersData.invalidTenderValues.endDateLessThan24H;
      const currDay = tendersData.invalidTenderValues.endDateCurrent
      const disabledDays = await tendersPage.getDisabledDaysBefore(currDay);
      const nextDayFromCurr = tendersData.invalidTenderValues.nextDay
      const secondDayFromCurr = tendersData.invalidTenderValues.secondDay
        
      await tendersPage.clickCreateTenderBtn();
      await tendersPage.fillTenderFields(tenderName, serviceName, invalidEndDay, undefined, undefined, budget, city, info);
      await tendersPage.clickNextBtn();
      await expect(tendersPage.periodOfProposalError).toHaveText(texts.endDateErrorText);
      await expect(tendersPage.periodOfProposalError).toBeInViewport();

      await tendersPage.clickEndPicker();
      await expect (tendersPage.getDayLocator(currDay)).toHaveAttribute('aria-disabled', 'true');
      await expect(tendersPage.calendar).toBeVisible();
      expect(formatDateValue(await tendersPage.endPicker.inputValue())).toBe(invalidEndDay);

      await tendersPage.clickNextBtn();
      await expect(tendersPage.periodOfWorkError).toHaveText(texts.requiredFieldText);
      await expect(tendersPage.periodOfWorkError).toBeInViewport();
      await tendersPage.clickPeriodOfWorkPicker();
      for (const day of disabledDays) {
        await expect(day).toHaveAttribute("aria-disabled", "true");
      }
      await tendersPage.selectPeriodOfWork(nextDayFromCurr);
      await tendersPage.clickNextBtn();
      await expect(tendersPage.periodOfWorkError).toHaveText(texts.requiredFieldText);
      await expect(tendersPage.periodOfWorkError).toBeInViewport();
      await tendersPage.selectPeriodOfWork(undefined, secondDayFromCurr);
      expect(extractDay(await tendersPage.periodOfWorkPicker.inputValue())).toEqual([Number(nextDayFromCurr), Number(secondDayFromCurr)]);
    });

    test('Create tender, Budget field validation', async ({page}) => {
      const tendersPage = new TendersPage(page);
      const {tenderName, serviceName, endDate, city, info, periodOfWork: { start, end }} = tendersData.validTenderValues;
      const restrictedSymbolsBudget = Object.values(tendersData.invalidTenderValues.budget.withRestrictedSymbol);
      const moreThan9 = tendersData.invalidTenderValues.budget.moreThan9;

      await tendersPage.clickCreateTenderBtn();
      await tendersPage.fillTenderFields(tenderName, serviceName, endDate, start, end, undefined, city, info);
      await tendersPage.clickNextBtn();
      await expect(tendersPage.budgetError).toHaveText(texts.requiredFieldText);

      for(const symbol of restrictedSymbolsBudget) {
        await tendersPage.fillBudget(symbol);
        await tendersPage.clickNextBtn();
        await expect(tendersPage.budgetError).toHaveText(texts.requiredFieldText);
        await expect(tendersPage.budgetError).toBeInViewport();
      }

      for(const symbol of restrictedSymbolsBudget) {
        await tendersPage.pasteBudget(symbol);
        await tendersPage.clickNextBtn();
        await expect(tendersPage.budgetError).toHaveText(texts.requiredFieldText);
        await expect(tendersPage.budgetError).toBeInViewport();
      }

      await tendersPage.fillBudget(moreThan9);
      await expect(tendersPage.budgetInput).toHaveValue(moreThan9.slice(0, 9));

      await tendersPage.pasteBudget(moreThan9);
      await expect(tendersPage.budgetInput).toHaveValue(moreThan9.slice(0, 9));
    });

    test('Create tender, Map Validation', async ({page}) => {
      const tendersPage = new TendersPage(page);
      const {tenderName, serviceName, endDate, budget, info, periodOfWork: { start, end }} = tendersData.validTenderValues;
      
      await tendersPage.clickCreateTenderBtn();
      await tendersPage.fillTenderFields(tenderName, serviceName, endDate, start, end, budget, undefined, info);
      await tendersPage.clickChooseOnMap();
      await tendersPage.dragMapAndClickCenter();
      await tendersPage.closeMapWindow();
      await expect(tendersPage.choseOnMapError).toHaveText(texts.mapErrorText);
    });

    test('Create tender, Additional Info Validation', async ({page}) => {
      const tendersPage = new TendersPage(page);
      const {tenderName, serviceName, endDate, budget, city, periodOfWork: { start, end }} = tendersData.validTenderValues;
      const thirtyNineSymbols = tendersData.invalidTenderValues.info.thirtyNineSymbols;
      const restrictedSymbolsText = Object.values(tendersData.invalidTenderValues.info.withRestrictedSymbol);

      await tendersPage.clickCreateTenderBtn();
      await tendersPage.fillTenderFields(tenderName, serviceName, endDate, start, end, budget, city, undefined);
      await tendersPage.clickNextBtn();
      await expect(tendersPage.infoError).toHaveText(texts.textAreaErrorText(0));

      await tendersPage.fillText(thirtyNineSymbols);
      await tendersPage.clickNextBtn();
      await expect(tendersPage.infoError).toHaveText(texts.textAreaErrorText(thirtyNineSymbols.length));
      
      for(const symbol of restrictedSymbolsText) {
        await tendersPage.fillText(symbol);
        await expect(tendersPage.infoTextArea).toHaveText(symbol.slice(0, -1));
      }

      for(const symbol of restrictedSymbolsText) {
        await tendersPage.pasteText(symbol);
        await expect(tendersPage.infoTextArea).toHaveText(symbol.slice(0, -1));
      }
    });

    test('Create tender, Documentation Step Validation', async ({page}) => {
      const tendersPage = new TendersPage(page);
      const {tenderName, serviceName, endDate, budget, city, info, periodOfWork: { start, end }} = tendersData.validTenderValues;
      const largeFiles = tendersData.generateRandomLargeFiles(2);
      const invalidFiles = tendersData.generateInvalidFormatFiles(3);
      const validFiles = tendersData.generateValidFiles(3);

      await tendersPage.clickCreateTenderBtn();
      await tendersPage.fillTenderFields(tenderName, serviceName, endDate, start, end, budget, city, info);
      await tendersPage.clickNextBtn();
      await expect(tendersPage.documentContainer).toBeVisible();
      await tendersPage.clickNextBtn();
      await page.waitForTimeout(300);
      await expect(tendersPage.documentationErrorText).toHaveText(texts.withoutDocumentErrorText);
      
      await tendersPage.uploadFiles(largeFiles);
      await expect(tendersPage.errorPopup).toBeVisible();
      await expect(tendersPage.errorPopup).toHaveText(texts.documentErrorPopup);
      await tendersPage.clickAgreeBtn();
      
      await tendersPage.uploadFiles(invalidFiles);
      await expect(tendersPage.errorPopup).toBeVisible();
      await expect(tendersPage.errorPopup).toHaveText(texts.documentErrorPopup);
      await tendersPage.clickAgreeBtn();

      await tendersPage.uploadFiles(validFiles);
      await tendersPage.uploadFiles(validFiles);
      await expect(tendersPage.errorPopup).toBeVisible();
      await expect(tendersPage.errorPopup).toHaveText(texts.documentErrorSameFile);
      await tendersPage.clickAgreeBtn();
      await tendersPage.clickNextBtn();
    });

    test('Create Tender, Contact Validation', async({page}) => {
      const tendersPage = new TendersPage(page);
      const {tenderName, serviceName, endDate, budget, city, info, periodOfWork: { start, end }} = tendersData.validTenderValues;
      const validFiles = tendersData.generateValidFiles(1);
      const {lastName, firstName, validMobile} = usersData.tenderContact;
      const shortName = usersData.invalidUserCredentials.name.oneSymbol;
      const longName = usersData.invalidUserCredentials.name.moreThan25;
      const invalidMobiles = Object.values(usersData.invalidUserCredentials.invalidPhonesForContact.withRestrictedSymbol);

      await tendersPage.clickCreateTenderBtn();
      await tendersPage.fillTenderFields(tenderName, serviceName, endDate, start, end, budget, city, info);
      await tendersPage.clickNextBtn();
      await tendersPage.uploadFiles(validFiles);
      await tendersPage.clickNextBtn();

      await expect(tendersPage.userInfo).toBeVisible();
      await tendersPage.uncheckCheckbox();
      await tendersPage.fillContact(lastName, firstName, validMobile);
      await expect(tendersPage.nameError.nth(0)).not.toBeVisible();
      await expect(tendersPage.nameError.nth(1)).not.toBeVisible();
      await expect(tendersPage.mobileError).not.toBeVisible();

      //Last Name Validation
      await tendersPage.fillLastName('');
      await expect(tendersPage.nameError).toHaveText(texts.requiredFieldText);
      await tendersPage.fillLastName(shortName);
      await expect(tendersPage.nameError).toHaveText(texts.shortLastNameError);
      await tendersPage.fillLastName(longName);
      await expect(tendersPage.nameError).toHaveText(texts.longNameError);
      await tendersPage.fillLastName(lastName);

      //First Name Validation
      await tendersPage.fillFirstName('');
      await expect(tendersPage.nameError).toHaveText(texts.requiredFieldText);
      await tendersPage.fillFirstName(shortName);
      await expect(tendersPage.nameError).toHaveText(texts.shortFirstNameError);
      await tendersPage.fillFirstName(longName);
      await expect(tendersPage.nameError).toHaveText(texts.longNameError);
      await tendersPage.fillFirstName(firstName);

      //Phone Number Validation
      await tendersPage.fillPhone('');
      await expect(tendersPage.mobileError).toHaveText(texts.requiredFieldText);
      for(const symbol of invalidMobiles) {
        await tendersPage.fillPhone(symbol);
        expect((await tendersPage.mobile.inputValue()).replace(/\s+/g, '')).toBe(symbol.trim().slice(0, -1));
      }
    });

    test('Create Tender, Full Flow', async ({page}) => {
      const tendersPage = new TendersPage(page);
      const {tenderName, serviceName, endDate, budget, city, info, periodOfWork: { start, end }} = tendersData.validTenderValues;
      const validFiles = tendersData.generateValidFiles(1);
      const {lastName, firstName, validMobile} = usersData.tenderContact;

      await tendersPage.clickCreateTenderBtn();
      await tendersPage.fillTenderFields(tenderName, serviceName, endDate, start, end, budget, city, info);
      await tendersPage.clickNextBtn();
      await tendersPage.uploadFiles(validFiles);
      await tendersPage.clickNextBtn();

      await expect(tendersPage.userInfo).toBeVisible();
      await tendersPage.uncheckCheckbox();
      await tendersPage.fillContact(lastName, firstName, validMobile);
      await tendersPage.clickNextBtn();
      await expect(tendersPage.agreementPopup).toBeVisible();
      await tendersPage.clickDeclineBtn();
    })
});