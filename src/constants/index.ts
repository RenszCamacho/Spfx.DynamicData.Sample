/**
 * DynamicData Property IDs
 * Used by the web part to expose product data as a DynamicDataSource.
 */
export const DYNAMIC_DATA_PROPERTIES = {
  PRODUCTS: "products",
  PRODUCT_COUNT: "productCount",
  PRODUCTO_SELECCIONADO: "productoSeleccionado",
} as const;

/**
 * SharePoint List Names
 * Centralized to avoid magic strings throughout the codebase.
 */
export const SHAREPOINT_LISTS = {
  PRODUCTOS: "Productos",
} as const;

/**
 * SharePoint Column Names
 * Centralized to avoid magic strings throughout the codebase.
 */
export const COLUMNS = {
  TITLE: "Title",
  PRECIO: "Precio",
} as const;
