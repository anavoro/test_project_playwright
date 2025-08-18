import { APIRequestContext} from "@playwright/test";
import { BaseApi } from "./base.api";

export default class UnitsApi extends BaseApi {
    constructor(request: APIRequestContext) {
        super(request);
    }

    async getUnitsList(headers: object) {
        const response = await this.get(`/api/units/`, headers);
        return response;
    }
    async createUnit(headers: object, userData: object) {
        const response = await this.post(`/api/units/`, userData, headers);
        return response;
    }
    async getUnitByID(id: number, headers: object) {
        const response = await this.get(`/api/units/${id}/`, headers);
        return response;
    }
    async deleteUnitByID(id: number, headers: object) {
        const response = await this.delete(`/api/units/${id}/`, headers);
        return response;
    }
}
