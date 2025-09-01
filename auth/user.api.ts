import { APIRequestContext} from "@playwright/test";
import { BaseApi } from "../api/base.api";

export default class AuthUser extends BaseApi {
    constructor(request: APIRequestContext) {
        super(request, `/api/auth/users/`);
    }

    async createUser(userData: object) {
        const response = await this.post('', userData);
        return response;
    }
}
