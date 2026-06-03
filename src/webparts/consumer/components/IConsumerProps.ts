import type { IProduct } from '../../../models';

export interface IConsumerProps {
  products: IProduct[];
  productCount: number;
  selectedProduct: IProduct | undefined;
  loading: boolean;
}
