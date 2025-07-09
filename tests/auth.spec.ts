import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { ProfilePage } from '../pages/profilePage';
import { registeredUser, texts, cssStyle } from '../constants/authData'
import { invalidUserCredentials } from '../constants/authDataGenerator'
import { normalizePhone } from '../utils/formatHelper';

test.describe('Authentication Tests', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await page.setViewportSize({ width: 1536, height: 864 });
    await page.context().clearCookies();
    await homePage.goto('/');
  });

    test('Authorization with valid email and password', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const validEmails = [registeredUser.email, registeredUser.emailUpperCase];
        const password = registeredUser.password;

        for (const email of validEmails) {
            await homePage.clickLogin();
            await loginPage.fillLoginForm(email, password);

            await loginPage.clickHiddenPasswordIcon();
            await expect(loginPage.passwordInput).toHaveAttribute('type', 'text');

            await loginPage.clickHiddenPasswordIcon();
            await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');

            await loginPage.clickSubmitLoginBtn();

            await expect(homePage.mainContainer).toBeVisible();

            await homePage.clickAvatar()
            await expect(homePage.dropdownMenuContainer).toBeVisible();
            await expect(homePage.dropdownProfileEmail).toHaveText(email.toLowerCase());
            await homePage.clickLogout();
        };
    });

    test('Authorization with valid phone and password', async ({page}) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const profilePage = new ProfilePage(page);
        const validPhones = [registeredUser.mobile, registeredUser.mobileVar1, registeredUser.mobileVar2];
        const password = registeredUser.password;

        for (const phone of validPhones) {
            await homePage.clickLogin();

            await loginPage.fillLoginForm(phone, password);
            await expect(loginPage.loginInput).not.toHaveCSS('border', cssStyle.errorBorderColor);
            await expect(loginPage.passwordInput).not.toHaveCSS('border', cssStyle.errorBorderColor);
            await loginPage.clickSubmitLoginBtn();

            await expect(homePage.mainContainer).toBeVisible();

            await homePage.clickAvatar()
            await expect(homePage.dropdownMenuContainer).toBeVisible();
            await homePage.clickProfile();

            await expect(profilePage.profileContainer).toBeVisible();

            expect(normalizePhone(await profilePage.profileNumberInput.inputValue())).toBe(normalizePhone(phone));
            await expect(profilePage.verifNumberText).toHaveText(texts.profileVerifNumberText);
            await profilePage.clickLogout();
        }
    });

    test('Authorization with invalid login or password', async ({page}) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const validPassword = registeredUser.password;
        const validLogin = registeredUser.email;
        const invalidEmails = Object.values(invalidUserCredentials.invalidEmails);
        const invalidPasswords = Object.values(invalidUserCredentials.invalidPasswords);

        for (const invalidEmail of invalidEmails) {
            await homePage.clickLogin();
            await loginPage.login(invalidEmail, validPassword);

            await expect(loginPage.authPopup).toBeVisible();
            await expect(loginPage.errorMessage).toHaveText(texts.loginErrorText);

            await page.reload();
        };

        for (const invalidPassword of invalidPasswords) {
            await page.context().clearCookies();
            await homePage.clickLogin();
            await loginPage.login(validLogin, invalidPassword);

            await expect(loginPage.authPopup).toBeVisible();

            if (await loginPage.errorMessage.isVisible()) {
                await expect(loginPage.errorMessage).toHaveText(texts.passwordErrorText);
                } else {
                await expect(loginPage.loginFormErrorMessage).toHaveText(texts.loginFormErrorText);
                }

            await page.reload();
        }
    });

    test('Authorization with invalid phone', async ({page}) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const validPassword = registeredUser.password;
        const invalidPhones = Object.values(invalidUserCredentials.invalidPhones);

        for (const invalidPhone of invalidPhones) {
            await homePage.clickLogin();
            await loginPage.login(invalidPhone, validPassword);

            await expect(loginPage.authPopup).toBeVisible();
            await expect(loginPage.errorMessage).toHaveText(texts.loginErrorText);

            await page.reload();
        }
    });

    test('Authorization with empty fields', async ({page}) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const login = registeredUser.email;
        const password = registeredUser.password;
        const empty = '';

        await homePage.clickLogin();
        await loginPage.clickSubmitLoginBtn();
        await expect(loginPage.authPopup).toBeVisible();
        await expect(loginPage.loginInput).toHaveCSS('border', cssStyle.errorBorderColor);
        await expect(loginPage.passwordInput).toHaveCSS('border', cssStyle.errorBorderColor);
        await expect(loginPage.errorMessage).toHaveCount(2);
        await expect(loginPage.errorMessage.nth(0)).toHaveText(texts.emptyFieldErrorText);
        await expect(loginPage.errorMessage.nth(1)).toHaveText(texts.emptyFieldErrorText);

        await loginPage.fillLoginForm(login, empty);
        await loginPage.clickSubmitLoginBtn();
        await expect(loginPage.authPopup).toBeVisible();
        await expect(loginPage.loginInput).not.toHaveCSS('border', cssStyle.errorBorderColor);
        await expect(loginPage.passwordInput).toHaveCSS('border', cssStyle.errorBorderColor);
        await expect(loginPage.errorMessage).toHaveText(texts.emptyFieldErrorText);

        await loginPage.fillLoginForm(empty, password);
        await loginPage.clickSubmitLoginBtn();
        await expect(loginPage.authPopup).toBeVisible();
        await expect(loginPage.loginInput).toHaveCSS('border', cssStyle.errorBorderColor);
        await expect(loginPage.passwordInput).not.toHaveCSS('border', cssStyle.errorBorderColor);
        await expect(loginPage.errorMessage).toHaveText(texts.emptyFieldErrorText);
    });
});