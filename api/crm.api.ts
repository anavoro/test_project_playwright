import { APIRequestContext } from "@playwright/test";
import { BaseApi } from "./base.api";

export default class CrmManufacturer extends BaseApi {
    constructor(request: APIRequestContext) {
        super(request, `/api/crm/manufacturers/`);
    }

    async getManufacturerList(headers: object) {
        const response = await this.get(
            '',
             headers);
        return response;
    }
    async createManufacturer(headers: object, userData: object) {
        const response = await this.post(
            '',
            userData,
            headers
        );
        return response;
    }
    async getManufacturerByID(id: number, headers: object) {
        const response = await this.get(
            `${id}/`,
            headers
        );
        return response;
    }
    async deleteManufacturerByID(id: number, headers: object) {
        const response = await this.delete(
            `${id}/`,
            headers
        );
        return response;
    }
}
