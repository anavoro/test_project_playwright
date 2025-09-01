import { APIRequestContext, APIResponse } from "@playwright/test";

export class BaseApi {
    private request: APIRequestContext;
    private endpoint: string;

    constructor(request: APIRequestContext, endpoint: string) {
        this.request = request;
        this.endpoint = endpoint;
    }

    async get(url = '', headers = {}): Promise<APIResponse> {
        return this.request.get(`${this.endpoint}${url}`, { headers });
    }

    async post(url = '', data: object, headers = {}): Promise<APIResponse> {
        return this.request.post(`${this.endpoint}${url}`, { data, headers });
    }

    async delete(url = '', headers = {}): Promise<APIResponse> {
        return this.request.delete(`${this.endpoint}${url}`, { headers });
    }
}
