import { test, expect } from "@playwright/test";
import { createToken } from "../../auth/jwt.api";
import CrmManufacturer from "../../api/crm.api";

let crmManufacturer: any;

test.describe.serial("Verify CRM Manufacturers functionality", async () => {
    let token = "";
    let manufacturerId = 0;

    test.beforeAll(async () => {
        token = await createToken();
    });
    test.beforeEach(async ({ request }) => {
        crmManufacturer = new CrmManufacturer(request);
    });
    test("Get CRM manufacturers list", async () => {
        const response = await crmManufacturer.getManufacturerList({
            Authorization: `Bearer ${token}`,
        });
        await expect(response).toHaveStatusCode(200);
        await expect(response).toHaveStatusText("OK");
    });
    test("Create CRM Manufacturer", async () => {
        const response = await crmManufacturer.createManufacturer(
            {
                Authorization: `Bearer ${token}`,
            },
            {
                name: "Test Manufacturer",
                is_custom: false,
            }
        );
        const dataManufacturers = await response.json();
        manufacturerId = await dataManufacturers.id;
        await expect(response).toHaveStatusCode(201);
        await expect(response).toHaveStatusText("Created");
    });
    test("Get CRM Manufacturer by ID", async () => {
        const response = await crmManufacturer.getManufacturerByID(
            manufacturerId,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        await expect(response).toHaveStatusCode(200);
        await expect(response).toHaveStatusText("OK");
    });
    test("Delete CRM Manufacturer", async () => {
        const response = await crmManufacturer.deleteManufacturerByID(
            manufacturerId,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        await expect(response).toHaveStatusCode(204);
        await expect(response).toHaveStatusText("No Content");
    });
    test("Get CRM Manufacturer by ID after deletion", async () => {
        const response = await crmManufacturer.getManufacturerByID(
            manufacturerId,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        await expect(response).toHaveStatusCode(404);
        await expect(response).toHaveStatusText("Not Found");
        const dataCrmManufactorer = await response.json();
        const deletedManufactorerId = dataCrmManufactorer["units"];
        expect(deletedManufactorerId == undefined).toBeTruthy();
    });
});
