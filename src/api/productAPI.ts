import { set } from 'react-hook-form';
import mockData from '../mocks/mock_product.json';

export interface Product {
    product_code: string;
    product_name: string;
    product_type: string;
    product_price: number;
    product_img: string;
}

export function getProducts(): Promise<Product[]> {
    // Simulate an async call to a server by returning a promise that resolves after 2 seconds
    return new Promise((resolve) => {
        setTimeout(() => {
            // Return mock data from mock_product.json file using the resolve function
            resolve(mockData);
        }, 2000);
    });
}
