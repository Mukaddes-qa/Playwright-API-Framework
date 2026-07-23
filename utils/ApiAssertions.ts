import { APIResponse, expect } from '@playwright/test';

export class ApiAssertions {

  static expectStatus(
    response: APIResponse,
    status: number
  ) {
    expect(response.status())
      .toBe(status);
  }


  static async expectJsonField(
    response: APIResponse,
    field: string
  ) {

    const body = await response.json();

    expect(body[field])
      .toBeDefined();
  }


  static async expectArrayResponse(
    response: APIResponse
  ) {

    const body = await response.json();

    expect(Array.isArray(body))
      .toBe(true);
  }

}





