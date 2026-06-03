import type {
  IDynamicDataPropertyDefinition,
} from "@microsoft/sp-dynamic-data";

import { DYNAMIC_DATA_PROPERTIES } from "../constants";
import type { IProduct } from "../models";

/**
 * DynamicData callable methods for the Provider web part.
 *
 * These functions are source-specific — they depend on internal state
 * and return DynamicData protocol objects. They live in src/sources/
 * as a semantic match for the DynamicData concept of "sources".
 */

interface ISourceState {
  products: IProduct[];
  selectedProduct: IProduct | undefined;
}

/**
 * Returns the property definitions for this DynamicDataSource.
 * Called by SPFx when consumers query available properties.
 */
export function getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
  return [
    {
      id: DYNAMIC_DATA_PROPERTIES.PRODUCTS,
      title: "Products",
      description: "The full list of products from SharePoint",
    },
    {
      id: DYNAMIC_DATA_PROPERTIES.PRODUCT_COUNT,
      title: "Product Count",
      description: "The total number of products",
    },
    {
      id: DYNAMIC_DATA_PROPERTIES.PRODUCTO_SELECCIONADO,
      title: "Selected Product",
      description: "The currently selected product",
    },
  ];
}

/**
 * Returns the value for a given property ID.
 * Called by SPFx when consumers read a property value.
 */
export function getPropertyValue(
  propertyId: string,
  state: ISourceState,
): IProduct[] | number | IProduct | undefined {
  switch (propertyId) {
    case DYNAMIC_DATA_PROPERTIES.PRODUCTS:
      return state.products;

    case DYNAMIC_DATA_PROPERTIES.PRODUCT_COUNT:
      return state.products.length;

    case DYNAMIC_DATA_PROPERTIES.PRODUCTO_SELECCIONADO:
      return state.selectedProduct;

    default:
      return undefined;
  }
}

/**
 * Returns a property definition by its ID.
 * Called by SPFx when consumers query a specific property.
 */
export function getPropertyById(
  propertyId: string,
): IDynamicDataPropertyDefinition | undefined {
  return getPropertyDefinitions().find((def) => def.id === propertyId);
}
