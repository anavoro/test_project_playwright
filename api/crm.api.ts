import { APIRequestContext } from "@playwright/test";
import { BaseApi } from "./base.api";

export default class CrmManufacturer extends BaseApi {
    constructor(request: APIRequestContext) {
        super(request);
    }

    async getManufacturerList(headers: object) {
        const response = await this.get(`/api/crm/manufacturers/`, headers);
        return response;
    }
    async createManufacturer(headers: object, userData: object) {
        const response = await this.post(
            `/api/crm/manufacturers/`,
            userData,
            headers
        );
        return response;
    }
    async getManufacturerByID(id: number, headers: object) {
        const response = await this.get(
            `/api/crm/manufacturers/${id}/`,
            headers
        );
        return response;
    }
    async deleteManufacturerByID(id: number, headers: object) {
        const response = await this.delete(
            `/api/crm/manufacturers/${id}/`,
            headers
        );
        return response;
    }
}
