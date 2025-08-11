import { test, expect} from '@playwright/test';
import * as data from '../../testData/unitData';
import { createToken } from '../../utils/auth';

test.describe.serial('Verify Units functionality', async () => {
    let token = '';
    let unitsId = 0;

    test.beforeAll(async () => {
        token = await createToken();
    });
     test("Get propose list", async ({ request }) => {
        const response = await request.get(`/api/units/`);
        await expect(response).toHaveStatusCode(200);
        await expect(response).toHaveStatusText("OK");
    });
    test("Create propose", async ( {request} ) => {
        const response = await request.post(`/api/units/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                name: "Agriculture technique",
                first_name: "Aha",
                last_name: "Aha",
                declined_incomplete: true,
                declined_censored: true,
                declined_incorrect_price: true,
                declined_incorrect_data: true,
                declined_invalid_img: true,
                slug: "gth",
                model_name: "string",
                description: "test test",
                features: "string",
                rating: 0,
                views_count: 0,
                type_of_work: "CHANGE",
                time_of_work: "FOUR",
                phone: "+380501234567",
                minimal_price: 300,
                money_value: "UAH",
                payment_method: "CASH_OR_CARD",
                lat: 0,
                lng: 0,
                count: 0,
                is_approved: true,
                is_archived: true,
                manufacturer: 4,
                owner: 1746,
                category: 2411,
                services: [
                    5
                ]
            }
        });
        const dataUnits = await response.json();
        unitsId = await dataUnits.id;
        await expect(response).toHaveStatusCode(201);
        await expect(response).toHaveStatusText("Created");
    });
    test("Get new propose after creating", async ({ request }) => {
        const response = await request.get(`/api/units/${unitsId}/`);
        await expect(response).toHaveStatusCode(200);
        await expect(response).toHaveStatusText("OK");
        
    });
    test("Delete propose by ID", async ( {request} ) => {
        const response = await request.delete(`/api/units/${unitsId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        await expect(response).toHaveStatusCode(204);
        await expect(response).toHaveStatusText("No Content");
    });
    test("Get new propose after deletion", async ({ request }) => {
        const response = await request.get(`/api/units/${unitsId}/`);
        await expect(response).toHaveStatusCode(200);
        await expect(response).toHaveStatusText("OK");
        const dataUnits = await response.json();
        const deletedUnit = dataUnits["units"];
        expect(deletedUnit == undefined).toBeTruthy();
        expect(dataUnits == data.text.unitDoesntExist).toBeTruthy();    
    });
});