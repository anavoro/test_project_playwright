import { Page, Locator } from '@playwright/test';
import { AbstractAdminTablePage } from './abstractAdminTablePage';
import { faker } from '@faker-js/faker';

export class AdminManufacturerPage extends AbstractAdminTablePage {
  readonly createBtn: Locator;
  readonly dataRow: Locator;
  readonly inputManufacturerName: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    super(page);

    this.createBtn = page.getByTestId('customButtonContainer');
    this.dataRow = page.getByTestId('manufacturerRow');
    this.inputManufacturerName = page.getByTestId('custom-input');
    this.submitBtn = page.getByTestId('submitBtn');
  }

  // ---------------- Manufacturer Creation ----------------

  async clickCreate(): Promise<void> {
    await this.createBtn.click();
  }

  async fillManufacturerName(name?: string): Promise<string> {
    const manufacturerName = name || `Тестова назва ${faker.string.alphanumeric(4)}`;
    await this.inputManufacturerName.fill(manufacturerName);
    return manufacturerName;
  }

  async createItem(name?: string): Promise<string> {
    return this.createManufacturer(name);
  }

  async createManufacturer(name?: string): Promise<string> {
    const manufacturerName = name || `Тестова назва ${faker.string.alphanumeric(2)}`;
    await this.clickCreate();
    await this.fillManufacturerName(manufacturerName);
    await this.clickSubmit();
    return manufacturerName;
  }

  async clickSubmit(): Promise<void> {
    await this.submitBtn.click();
  }

  // ---------------- Search ----------------

  async searchManufacturer(searchTerm: string): Promise<void> {
   await this.searchByTerm(searchTerm);
 }

  // ---------------- Deletion ----------------

  async deleteManufacturerByName(manufacturerName: string): Promise<void> {
    await this.deleteByName(manufacturerName);
  }

  // ---------------- Row Helpers ----------------

  getManufacturerRowByName(manufacturerName: string): Locator {
    return this.getRowByName(manufacturerName);
  }

  getManufacturerRow(name: string): Locator {
   return this.getItemRow(name);
 }
}
