import { useState, useEffect } from 'react';
import type { DynamicProperty } from '@microsoft/sp-component-base';
import type { IProduct } from '../../../models';

export interface IUseConsumerReturn {
  products: IProduct[];
  productCount: number;
  selectedProduct: IProduct | undefined;
  loading: boolean;
}

export function useConsumer(
  dynamicPropertyValue: DynamicProperty<IProduct[]>
): IUseConsumerReturn {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const value = dynamicPropertyValue.tryGetValue();
    setProducts(value ?? []);
    setLoading(false);

    const onPropertyChanged = (): void => {
      const updated = dynamicPropertyValue.tryGetValue();
      setProducts(updated ?? []);
    };

    dynamicPropertyValue.register(onPropertyChanged);

    return () => {
      dynamicPropertyValue.unregister(onPropertyChanged);
    };
  }, [dynamicPropertyValue]);

  const productCount: number = products.length;
  const selectedProduct: IProduct | undefined = products.length > 0
    ? products[0]
    : undefined;

  return {
    products,
    productCount,
    selectedProduct,
    loading,
  };
}
