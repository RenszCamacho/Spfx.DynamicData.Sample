import { useState, useEffect, useCallback, useMemo } from "react";
import { ServiceScope } from "@microsoft/sp-core-library";

import { ProductService } from "../services/ProductService";
import type { IProduct } from "../models";

export interface IUseProductsReturn {
  products: IProduct[];
  loading: boolean;
  error: string | undefined;
  refresh: () => Promise<void>;
  selectProduct: (product: IProduct | undefined) => void;
  selectedProduct: IProduct | undefined;
}

/**
 * Custom hook that encapsulates all Provider component logic.
 *
 * Responsibilities:
 * - Resolve ProductService from ServiceScope (DI)
 * - Fetch products on mount
 * - Expose products, loading, error state
 * - Provide refresh and selectProduct actions
 *
 * The hook does NOT import DynamicData constants or manage source state.
 * That responsibility belongs to the WebPart class.
 */
export function useProducts(serviceScope: ServiceScope): IUseProductsReturn {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(
    undefined,
  );

  const productService = useMemo(() => {
    return serviceScope.consume(ProductService.serviceKey);
  }, [serviceScope]);

  const fetchProducts = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(undefined);
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load products",
      );
    } finally {
      setLoading(false);
    }
  }, [productService]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchProducts();
  }, [fetchProducts]);

  const refresh = useCallback(async (): Promise<void> => {
    await fetchProducts();
  }, [fetchProducts]);

  const selectProduct = useCallback(
    (product: IProduct | undefined): void => {
      setSelectedProduct(product);
    },
    [],
  );

  return useMemo(
    () => ({
      products,
      loading,
      error,
      refresh,
      selectProduct,
      selectedProduct,
    }),
    [products, loading, error, refresh, selectProduct, selectedProduct],
  );
}
