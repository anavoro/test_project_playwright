import { APIRequestContext} from "@playwright/test";
import { BaseApi } from "./base.api";

export default class AuthUser extends BaseApi {
    constructor(request: APIRequestContext) {
        super(request);
    }

    async createUser(userData: object) {
        const response = await this.post(`/api/auth/users/`, userData);
        return response;
    }
}
