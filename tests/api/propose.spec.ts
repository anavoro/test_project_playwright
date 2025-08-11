import { test, expect} from '@playwright/test'
import { createToken } from '../../utils/auth';

test.describe.serial('Verify propose functionality', async () => {
    let token = '';
    let proposeId = 0;

    test.beforeAll(async () => {
        token = await createToken();
    });
     test("Get propose list", async ({ request }) => {
        const response = await request.get(`/api/propose/`);
        await expect(response).toHaveStatusCode(200);
        await expect(response).toHaveStatusText("OK");
    });
    test("Create propose", async ( {request} ) => {
        const response = await request.post(`/api/propose/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                id: 0,
                is_agree_with_price: true,
                proposed_price: "500.00",
                currency: "UAH",
                comment: "no comments",
                statement: "APPLIED",
                date_created: "2025-08-01T05:41:38.578Z",
                user: 6,
                tender: 877
            }    
        });
        const dataPropose = await response.json();
        proposeId = await dataPropose.id;
        await expect(response).toHaveStatusCode(201);
        await expect(response).toHaveStatusText("Created");
    });
    test("Get propose list after creating propose", async ({ request }) => {
        const response = await request.get(`/api/propose/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        await expect(response).toHaveStatusCode(200);
        await expect(response).toHaveStatusText("OK");
        const dataPropose = await response.json();
        let arr: any[] = [];
        dataPropose.forEach((item: { id: any; }) => {
            arr.push(item.id);
        });
        expect(arr[arr.length - 1] == proposeId).toBeTruthy();
        
    });
    test("Delete propose", async ( {request} ) => {
        const response = await request.delete(`/api/propose/${proposeId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        await expect(response).toHaveStatusCode(204);
        await expect(response).toHaveStatusText("No Content");
    });
    test("Get propose list after delition", async ({ request }) => {
        const response = await request.get(`/api/propose/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        await expect(response).toHaveStatusCode(200);
        await expect(response).toHaveStatusText("OK");
        const dataPropose = await response.json();
        let arr: any[] = [];
        dataPropose.forEach((item: { id: any; }) => {
            arr.push(item.id);
        });
        expect(arr[arr.length - 1] !== proposeId).toBeTruthy();
    });
});