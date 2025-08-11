import { request as playwrightRequest } from '@playwright/test';
import * as data from '../testData/unitData'
let cashedToken: string = '';

export async function createToken(): Promise<string> {
    const request = await playwrightRequest.newContext();
    const response = await request.post(`https://dev.rentzila.com.ua/api/auth/jwt/create/`, {
            data: {
                email: data.adminCreds.email,
                password: data.adminCreds.password,
                phone: data.adminCreds.phone,
            },
            failOnStatusCode: false,
        });
        const dataAuth = await response.json();
        cashedToken = dataAuth["access"];
        return cashedToken
}
