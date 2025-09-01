import { APIRequestContext} from "@playwright/test";
import { BaseApi } from "./base.api";

export default class UnitsApi extends BaseApi {
    constructor(request: APIRequestContext) {
        super(request, `/api/units/`);
    }

    async getUnitsList(headers: object) {
        const response = await this.get('', headers);
        return response;
    }
    async createUnit(headers: object, userData: object) {
        const response = await this.post('', userData, headers);
        return response;
    }
    async getUnitByID(id: number, headers: object) {
        const response = await this.get(`${id}/`, headers);
        return response;
    }
    async deleteUnitByID(id: number, headers: object) {
        const response = await this.delete(`${id}/`, headers);
        return response;
    }
}
