import { test, expect} from '@playwright/test';
import { createToken } from '../../utils/auth';

test.describe.serial('Verify CRM Manufacturers functionality', async () => {
    let token = '';
    let manufacturerId = 0;

    test.beforeAll(async () => {
        token = await createToken();
    });
    test("Get CRM manufacturers list", async ({ request }) => {
        const response = await request.get(`/api/crm/manufacturers/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        await expect(response).toHaveStatusCode(200);
        await expect(response).toHaveStatusText("OK");
    });
    test("Create CRM Manufacturer", async ( {request} ) => {
        const response = await request.post(`/api/crm/manufacturers/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                name: "Test Manufacturer",
                is_custom: false
            }
        });
        const dataManufacturers = await response.json();
        manufacturerId = await dataManufacturers.id;
        await expect(response).toHaveStatusCode(201);
        await expect(response).toHaveStatusText("Created");
    });
    test("Get CRM Manufacturer by ID", async ({ request }) => {
        const response = await request.get(`/api/crm/manufacturers/${manufacturerId}/`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        await expect(response).toHaveStatusCode(200);
        await expect(response).toHaveStatusText("OK");
        
    });
    test("Delete CRM Manufacturer", async ( {request} ) => {
        const response = await request.delete(`/api/crm/manufacturers/${manufacturerId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        await expect(response).toHaveStatusCode(204);
        await expect(response).toHaveStatusText("No Content");
    });
    test("Get CRM Manufacturer by ID after deletion", async ({ request }) => {
        const response = await request.get(`/api/crm/manufacturers/${manufacturerId}/`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        await expect(response).toHaveStatusCode(404);
        await expect(response).toHaveStatusText("Not Found");
        const dataCrmManufactorer = await response.json();
        const deletedManufactorerId = dataCrmManufactorer["units"];
        expect(deletedManufactorerId == undefined).toBeTruthy();
    });
});