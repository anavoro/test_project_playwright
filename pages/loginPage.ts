import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {

  authPopup: Locator;
  authTitle: Locator;
  registrationForm: Locator;
  loginForm: Locator;
  loginInput: Locator;
  emailInput: Locator;
  passwordInput: Locator;
  registrationCheckbox: Locator;
  submitLoginBtn: Locator;
  submitRegisterBtn: Locator;
  signUpLink: Locator;
  hiddenPasswordIcon: Locator;
  errorMessage: Locator;
  loginFormErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.authPopup = page.locator('[data-testid="loginPopup"]');
    this.authTitle = page.locator('[data-testid="authorizationTitle"]');
    this.registrationForm = page.locator('[class^="RegistrationForm_form__"]');
    this.loginForm = page.locator('[class^="LoginForm_form__"]');
    this.loginInput = page.locator('#email');
    this.emailInput = page.locator('#login');
    this.passwordInput = page.locator('#password');
    this.registrationCheckbox = page.locator('#registration');
    this.submitLoginBtn = page.getByRole('button', { name: 'Увійти', exact: true });
    this.submitRegisterBtn = page.getByRole('button', { name: 'Зареєструватись', exact: true });
    this.signUpLink = page.locator('[data-testid="switcher"]');
    this.hiddenPasswordIcon = page.locator('[data-testid="reactHookButton"]');
    this.errorMessage = page.locator('[class^="LoginForm_form__"] [role="alert"]');
    this.loginFormErrorMessage = page.locator('[data-testid="errorMessage"]')
  }

  async login(login: string, password: string): Promise<void> {
    await this.loginInput.fill(login);
    await this.passwordInput.fill(password);
    await this.click(this.submitLoginBtn);
  }

    async fillLoginForm(login: string, password: string): Promise<void> {
    await this.loginInput.fill(login);
    await this.passwordInput.fill(password);
  }

  async clickSubmitLoginBtn() {
    await this.waitForElement(this.submitLoginBtn);
    await this.click(this.submitLoginBtn);
  }

  async clickHiddenPasswordIcon() {
    await this.click(this.hiddenPasswordIcon);
  }


  async register(email: string, password: string): Promise<void> {
    await this.click(this.signUpLink);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.click(this.registrationCheckbox);
    await this.click(this.submitRegisterBtn);
  }

}