import { APIResponse, expect } from '@playwright/test';

export class ApiResponseHelper {

  static expectStatus(
    response: APIResponse,
    statusCode: number
  ) {
    expect(response.status()).toBe(statusCode);
  }


  static async getJson<T>(
    response: APIResponse
  ): Promise<T> {
    return await response.json();
  }


  static async expectBodyContains(
    response: APIResponse,
    key: string
  ) {

    const body = await response.json();

    expect(body[key]).toBeDefined();
  }


  static expectContentType(response: APIResponse) {

    expect(
      response.headers()['content-type']
    ).toContain('application/json');
  }

}
