import { useState, useEffect } from "react";
import type { DynamicProperty } from "@microsoft/sp-component-base";
import type { IProduct } from "../../../models";

export interface IUseConsumerReturn {
  selectedProduct: IProduct | undefined;
}

export function useConsumer(
  dynamicPropertyValue: DynamicProperty<IProduct>,
): IUseConsumerReturn {
  const [selectedProduct, setSelectedProduct] = useState<
    IProduct | undefined
  >();

  useEffect(() => {
    const value = dynamicPropertyValue.tryGetValue();
    setSelectedProduct(value);

    const onPropertyChanged = (): void => {
      const updated = dynamicPropertyValue.tryGetValue();
      setSelectedProduct(updated);
    };

    dynamicPropertyValue.register(onPropertyChanged);

    return () => {
      dynamicPropertyValue.unregister(onPropertyChanged);
    };
  }, [dynamicPropertyValue]);

  return { selectedProduct };
}
