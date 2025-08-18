import { APIRequestContext} from "@playwright/test";
import { BaseApi } from "./base.api";

export default class ProposeApi extends BaseApi {
    constructor(request: APIRequestContext) {
        super(request);
    }
    async getProposeList(headers: object) {
        const response = await this.get(`/api/propose/`, headers);
        return response;
    }
    async createPropose(headers: object, userData: object) {
        const response = await this.post(`/api/propose/`, userData, headers);
        return response;
    }
    async deleteProposeByID(id: number, headers: object) {
        const response = await this.delete(`/api/propose/${id}/`, headers);
        return response;
    }
}
