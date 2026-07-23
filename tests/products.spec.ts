import { test, expect } from '@playwright/test';
import { ProductsApi } from '../api/ProductsApi';
import { createProductData } from '../test-data/products';
import { ApiResponseHelper } from '../utils/ApiResponseHelper';
import { ProductSchema } from '../schemas/ProductSchema';
import { SchemaValidator } from '../utils/SchemaValidator';
import { Product } from '../types/Product';
import { ApiAssertions } from '../utils/ApiAssertions';




test('GET products should return product list', async ({ request }) => {

  const productsApi = new ProductsApi(request);

  const response = await productsApi.getProducts();

  ApiResponseHelper.expectStatus(response, 200);
  ApiResponseHelper.expectContentType(response);

  const products = await ApiResponseHelper.getJson<Product[]>(response);

  expect(products).toBeInstanceOf(Array);

  const firstProduct = products[0];

  expect(firstProduct).toBeDefined();

  expect(firstProduct.id).toBeDefined();
  expect(firstProduct.title).toBeDefined();
  expect(firstProduct.price).toBeDefined();

  SchemaValidator.validate(
    firstProduct,
    ProductSchema
  );

});



test('CREATE product should return created product', async ({ request }) => {

  const productsApi = new ProductsApi(request);

  const productData = createProductData();

  const response = await productsApi.createProduct(productData);

  ApiResponseHelper.expectStatus(response, 201);

  const createdProduct =
    await ApiResponseHelper.getJson<Product>(response);

  expect(createdProduct.title)
    .toBe(productData.title);

});


test('GET non existing product should return empty response', async ({ request }) => {

  const productsApi = new ProductsApi(request);

  const response = await productsApi.getProduct(999999);
  
ApiAssertions.expectStatus(response,200);


  const body = await response.text();

  expect(body).toBe('');

});
test('UPDATE product should return updated product', async ({ request }) => {

  const productsApi = new ProductsApi(request);

  const productData = createProductData({
    title: 'Updated Product',
    price: 199.99
  });


  const response = await productsApi.updateProduct(
    1,
    productData
  );


  ApiResponseHelper.expectStatus(response, 200);


  const updatedProduct =
    await ApiResponseHelper.getJson<Product>(response);


  expect(updatedProduct.title)
    .toBe(productData.title);

});
test('DELETE product should return success', async ({ request }) => {

  const productsApi = new ProductsApi(request);


  const response =
    await productsApi.deleteProduct(1);


  ApiResponseHelper.expectStatus(response, 200);

});
