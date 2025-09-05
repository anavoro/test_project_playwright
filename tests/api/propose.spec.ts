import { test, expect } from "@playwright/test";
import { createToken } from "../../auth/jwt.api";
import ProposeApi from "../../api/propose.api";

let proposeApi: any;

test.describe.serial("Verify propose functionality", async () => {
    let token = "";
    let proposeId = 0;

    test.beforeAll(async () => {
        token = await createToken();
    });
    test.beforeEach(async ({ request }) => {
        proposeApi = new ProposeApi(request);
    });
    test("Get propose list", async () => {
        const response = await proposeApi.getProposeList({
            Authorization: `Bearer ${token}`,
        });
        await expect(response).toHaveStatusCode(200);
        await expect(response).toHaveStatusText("OK");
    });
    test("Create propose", async () => {
        const response = await proposeApi.createPropose(
            {
                Authorization: `Bearer ${token}`,
            },
            {
                id: 0,
                is_agree_with_price: true,
                proposed_price: "500.00",
                currency: "UAH",
                comment: "no comments",
                statement: "APPLIED",
                date_created: "2025-08-01T05:41:38.578Z",
                user: 6,
                tender: 877,
            }
        );
        const dataPropose = await response.json();
        proposeId = await dataPropose.id;
        await expect(response).toHaveStatusCode(201);
        await expect(response).toHaveStatusText("Created");
    });
    test("Get propose list after creating propose", async () => {
        const response = await proposeApi.getProposeList({
            Authorization: `Bearer ${token}`,
        });
        await expect(response).toHaveStatusCode(200);
        await expect(response).toHaveStatusText("OK");
        const dataPropose = await response.json();
        let arr: any[] = [];
        dataPropose.forEach((item: { id: any }) => {
            arr.push(item.id);
        });
        arr.sort((a, b) => a - b);
        expect(arr[arr.length - 1] == proposeId).toBeTruthy();
    });
    test("Delete propose", async () => {
        const response = await proposeApi.deleteProposeByID(proposeId, {
            Authorization: `Bearer ${token}`,
        });
        await expect(response).toHaveStatusCode(204);
        await expect(response).toHaveStatusText("No Content");
    });
    test("Get propose list after delition", async () => {
        const response = await proposeApi.getProposeList({
            Authorization: `Bearer ${token}`,
        });
        await expect(response).toHaveStatusCode(200);
        await expect(response).toHaveStatusText("OK");
        const dataPropose = await response.json();
        let arr: any[] = [];
        dataPropose.forEach((item: { id: any }) => {
            arr.push(item.id);
        });
        arr.sort((a, b) => a - b);
        expect(arr[arr.length - 1] !== proposeId).toBeTruthy();
    });
});
