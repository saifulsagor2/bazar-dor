
export interface Category {
  id: string;
  name: string;
  [key: string]: unknown;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  [key: string]: unknown;
}
