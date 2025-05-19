import { Page, Locator, expect} from '@playwright/test';
import { BasePage } from './basePage';

export class AdminPage extends BasePage {

adminPanel: Locator;
userPanel: Locator;
technicPanel: Locator;
servicePanel: Locator;


constructor(page: Page) {
    super(page);
this.adminPanel = page.locator('a[href="/admin/"]');
this.userPanel = page.locator('a[href="/admin/users"]');
this.technicPanel = page.getByText("Техніка");
this.servicePanel = page.getByText("Сервіси");
}

async navigateToUsers() {
    await this.userPanel.click();
    await this.page.waitForURL('**/admin/users**');
  }

  async login(email: string, password: string) {
    const emailInputs = this.page.locator('#email');
    const emailCount = await emailInputs.count();
    for (let i = 0; i < emailCount; i++) {
      const input = emailInputs.nth(i);
      if (await input.isVisible()) {
        await input.fill(email);
      }
    }

    const passwordInputs = this.page.locator('#password');
    const passwordCount = await passwordInputs.count();
    for (let i = 0; i < passwordCount; i++) {
      const input = passwordInputs.nth(i);
      if (await input.isVisible()) {
        await input.fill(password);
      }
    }

    const submitButtons = this.page.getByRole('button', { name: 'Увійти' });

    for (let i = 0; i < await submitButtons.count(); i++) {
      const btn = submitButtons.nth(i);
      if (await btn.isVisible()) {
        try {
          await btn.click({ force: true }); 
        } catch (e) {
            await btn.evaluate((b) => (b as HTMLElement).click());
        }
        break;
      }
    }
  }
}