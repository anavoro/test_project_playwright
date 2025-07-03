import { expect } from "@playwright/test";
import { test } from '../utils/fixtures';
import { texts } from '../constants/authData'
import { CUSTOMER_TYPES, FIELD_LABELS, invalidUserData, invalidPhoneScenarios, nameFieldsData } from "../constants/userData";


test.describe('Profile Info Validation', () => {
    test.beforeEach(async ({ loggedInUser }) => {
      await loggedInUser.clickAvatar();
      await expect(loggedInUser.dropdownMenuContainer).toBeVisible();
      await loggedInUser.clickProfile();
  });
    test.afterEach(async ({ profilePage }) => {
        await profilePage.clearAllFields();
      });

test('C333: Should not validate empty first and last name fields', async ({profilePage}) => {
    await expect(profilePage.profileContainer).toBeVisible();
    await expect(profilePage.verifNumberText).toHaveText(texts.profileVerifNumberText);
    await profilePage.clickSave();
    await expect(profilePage.getCustomInputErrorByLabel(FIELD_LABELS.LAST_NAME))
      .toHaveText(texts.requiredFieldError);
    await expect(profilePage.getCustomInputErrorByLabel(FIELD_LABELS.FIRST_NAME))
      .toHaveText(texts.requiredFieldError);
      });

test('C350: Should not validate short EDRPOU', async ({profilePage}) => {
    await profilePage.selectCustomerType(CUSTOMER_TYPES.LEGAL_ENTITY);
    await profilePage.fillInputByLabel(FIELD_LABELS.EDRPOU_LEGAL, invalidUserData.shortEdrpou);
    await profilePage.clickSave();
 
    await expect(profilePage.getCustomInputErrorByLabel(FIELD_LABELS.EDRPOU_LEGAL))
        .toHaveText(texts.edrpouTooShort);
      });

test('C351: Should not validate invalid tax number for different customer types', async ({profilePage}) => {
    const taxValidationScenarios = [
        {
         customerType: CUSTOMER_TYPES.INDIVIDUAL_ENTREPRENEUR,
         fieldLabel: FIELD_LABELS.TAX_NUMBER_FOP
        },
        {
         customerType: CUSTOMER_TYPES.PRIVATE_PERSON,
        fieldLabel: FIELD_LABELS.TAX_NUMBER_PRIVATE
        }
    ];
      
    for (const scenario of taxValidationScenarios) {
        await profilePage.selectCustomerType(scenario.customerType);
        await profilePage.fillInputByLabel(scenario.fieldLabel, invalidUserData.shortTaxNumber);
        await profilePage.clickSave();

        await expect(profilePage.getCustomInputErrorByLabel(scenario.fieldLabel))
            .toHaveText(texts.ipnTooShort);
        }
      });
      
test('C352: Should not validate all invalid data in name fields', async ({ profilePage }) => {
    const invalidValues = Object.values(invalidUserData.invalidNames);
      
    for (const field of nameFieldsData) {
      for (const invalidValue of invalidValues) {
        await test.step(`Field: ${field.label}, Value: ${invalidValue}`, async () => {
        await profilePage.clearInputByLabel(field.label);
        await profilePage.fillInputByLabel(field.label, invalidValue);
        await profilePage.clickSave();
      
        const error = profilePage.getCustomInputErrorByLabel(field.label);
        await expect(error).toHaveText(field.expectedError);
          });
        }
       }
      });

test('C355: Should not validate phone number field with invalid inputs', async ({ profilePage }) => {
    for (const scenario of invalidPhoneScenarios) {
    await test.step(`Testing ${scenario.description}`, async () => {
    await profilePage.clearPhoneNumber();
    await profilePage.fillPhoneNumber(scenario.phoneNumber);
        
    await expect(profilePage.phoneNumberError).toBeVisible();
    await expect(profilePage.phoneNumberError).toHaveText(texts.phoneNumberInvalid);
    });

}
});
});