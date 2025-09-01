import { APIRequestContext} from "@playwright/test";
import { BaseApi } from "./base.api";

export default class ProposeApi extends BaseApi {
    constructor(request: APIRequestContext) {
        super(request, `/api/propose/`);
    }
    async getProposeList(headers: object) {
        const response = await this.get('', headers);
        return response;
    }
    async createPropose(headers: object, userData: object) {
        const response = await this.post('', userData, headers);
        return response;
    }
    async deleteProposeByID(id: number, headers: object) {
        const response = await this.delete(`${id}/`, headers);
        return response;
    }
}
