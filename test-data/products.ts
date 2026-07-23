import { CreateProduct } from '../types/Product';


export function createProductData(
  overrides: Partial<CreateProduct> = {}
): CreateProduct {

  return {
    title: 'Test Product',
    price: 99.99,
    description: 'API test product',
    category: 'electronics',

    ...overrides
  };

}
