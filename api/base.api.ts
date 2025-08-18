import { APIRequestContext, APIResponse } from "@playwright/test";

export class BaseApi {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async get(url: string, headers = {}): Promise<APIResponse> {
        return this.request.get(url, { headers });
    }

    async post(url: string, data: object, headers = {}): Promise<APIResponse> {
        return this.request.post(url, { data, headers });
    }
    async getById(url: string, headers = {}): Promise<APIResponse> {
        return this.request.get(`${url}`, { headers });
    }

    async delete(url: string, headers = {}): Promise<APIResponse> {
        return this.request.delete(`${url}`, { headers });
    }
}
