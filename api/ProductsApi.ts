import { BASE_URL } from '../config/env';
import { Product, CreateProduct } from '../types/Product';
import { BaseApi } from './BaseApi';

export class ProductsApi extends BaseApi {

  async getProducts() {
    return this.get(`${BASE_URL}/products`);
  }


  async getProduct(id: number) {
    return this.get(`${BASE_URL}/products/${id}`);
  }


  async createProduct(productData: CreateProduct) {
    return this.post(
      `${BASE_URL}/products`,
      productData
    );
  }


  async updateProduct(id: number, productData: CreateProduct) {
    return this.put(
      `${BASE_URL}/products/${id}`,
      productData
    );
  }


  async deleteProduct(id: number) {
    return this.delete(
      `${BASE_URL}/products/${id}`
    );
  }

}
