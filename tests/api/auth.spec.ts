import { test, expect } from "@playwright/test";
import * as data from "../../testData/unitData";
import AuthUser from "../../api/auth.api";

let authUser: any;

test.describe("Verify section Auth", () => {
    test.beforeEach(async ({ request }) => {
        authUser = new AuthUser(request);
    });

    test("Verify creating user with unique email", async () => {
        const response = await authUser.createUser({
            email: data.wrongCreds.existingEmail,
            password: data.rightCreds.password,
            phone: data.rightCreds.phone,
        });
        const dataAuth = await response.json();
        console.log(dataAuth);
        console.log(response);
        const text = await dataAuth["email"][0];
        await expect(response).toHaveStatusCode(400);
        await expect(response).toHaveStatusText("Bad Request");
        expect(text === data.text.existingEmail).toBeTruthy();
    });
    test("Create user with wrong password format", async () => {
        const response = await authUser.createUser({
            email: data.rightCreds.email,
            password: data.wrongCreds.password,
            phone: data.rightCreds.phone,
        });
        const dataAuth = await response.json();
        const text = await dataAuth["non_field_errors"][0];
        await expect(response).toHaveStatusCode(400);
        await expect(response).toHaveStatusText("Bad Request");
        expect(text === data.text.wrongFormatPass).toBeTruthy();
    });
    test("Create user with unique phone", async () => {
        const response = await authUser.createUser({
            email: data.rightCreds.email,
            password: data.rightCreds.password,
            phone: data.wrongCreds.existingPhone,
        });
        const dataAuth = await response.json();
        const text = await dataAuth["phone"][0];
        await expect(response).toHaveStatusCode(400);
        await expect(response).toHaveStatusText("Bad Request");
        expect(text === data.text.existingPhone).toBeTruthy();
    });
    test("Create user with landline phone number", async () => {
        const response = await authUser.createUser({
            email: data.rightCreds.email,
            password: data.rightCreds.password,
            phone: data.wrongCreds.landLinePhone,
        });
        const dataAuth = await response.json();
        const text = await dataAuth["phone"][0];
        await expect(response).toHaveStatusCode(400);
        await expect(response).toHaveStatusText("Bad Request");
        expect(text === data.text.landLinePhone).toBeTruthy();
    });
});
