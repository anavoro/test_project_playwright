import { test, expect} from '@playwright/test'
import * as data from '../../testData/unitData'

test.describe("Verify section Auth", () => {
    
    test("Verify creating user with unique email", async ({ request }) => {
        const response = await request.post(`/api/auth/users/`, {
            data: {
                email: data.wrongCreds.existingEmail,
                password: data.rightCreds.password,
                phone: data.rightCreds.phone,
            },
        });
        const dataAuth = await response.json();
        const text = await dataAuth["email"][0];
        await expect(response).toHaveStatusCode(400);
        await expect(response).toHaveStatusText("Bad Request");
        expect(text === data.text.existingEmail).toBeTruthy();
    });
    test("Create user with wrong password format", async ({ request }) => {
        const response = await request.post(`/api/auth/users/`, {
            data: {
                email: data.rightCreds.email,
                password: data.wrongCreds.password,
                phone: data.rightCreds.phone,
            },
        });
        const dataAuth = await response.json();
        const text = await dataAuth["non_field_errors"][0];
        await expect(response).toHaveStatusCode(400);
        await expect(response).toHaveStatusText("Bad Request");
        expect(text === data.text.wrongFormatPass).toBeTruthy();
    });
    test("Create user with unique phone", async ({ request }) => {
        const response = await request.post(`/api/auth/users/`, {
            data: {
                email: data.rightCreds.email,
                password: data.rightCreds.password,
                phone: data.wrongCreds.existingPhone,
            },
        });
        const dataAuth = await response.json();
        const text = await dataAuth["phone"][0];
        await expect(response).toHaveStatusCode(400);
        await expect(response).toHaveStatusText("Bad Request");
        expect(text === data.text.existingPhone).toBeTruthy();
    });
    test("Create user with landline phone number", async ({ request }) => {
        const response = await request.post(`/api/auth/users/`, {
            data: {
                email: data.rightCreds.email,
                password: data.rightCreds.password,
                phone: data.wrongCreds.landLinePhone,
            },
        });
        const dataAuth = await response.json();
        const text = await dataAuth["phone"][0];
        await expect(response).toHaveStatusCode(400);
        await expect(response).toHaveStatusText("Bad Request");
        expect(text === data.text.landLinePhone).toBeTruthy();
    });
});

