import { APIRequestContext, APIResponse } from '@playwright/test';
import { API_TOKEN } from '../config/env';
import { ApiLogger } from '../utils/ApiLogger';


export class BaseApi {

  protected request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  protected getHeaders(): Record<string, string> {

    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (API_TOKEN) {
      headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }

    return headers;
  }

 protected async get(endpoint: string): Promise<APIResponse> {

  ApiLogger.logRequest(
    'GET',
    endpoint
  );

  const response = await this.request.get(endpoint, {
    headers: this.getHeaders()
  });

  await ApiLogger.logResponse(response);

  return response;
}


  protected async post(
  endpoint: string,
  data: unknown
): Promise<APIResponse> {

  ApiLogger.logRequest(
    'POST',
    endpoint,
    data
  );

  const response = await this.request.post(endpoint, {
    headers: this.getHeaders(),
    data
  });

  await ApiLogger.logResponse(response);

  return response;
}


  protected async put(endpoint: string, data: unknown): Promise<APIResponse> {
    return this.request.put(endpoint, {
      headers: this.getHeaders(),
      data
    });
  }

  protected async delete(endpoint: string): Promise<APIResponse> {
    return this.request.delete(endpoint, {
      headers: this.getHeaders()
    });
  }
}
