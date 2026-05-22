/**
 * SharePoint List Column Names
 * Centralized as constants to avoid magic strings throughout the codebase.
 */
export const PRODUCTOS_LIST = "Productos";
export const COLUMN_TITLE = "Title";
export const COLUMN_PRECIO = "Precio";

/**
 * Domain model — represents a Product in our business logic.
 *
 * WHY separate from ISharePointItem?
 * - Our domain might transform data (computed fields, formatting)
 * - SharePoint metadata (like OData__* fields) doesn't belong in domain
 * - Makes the service layer the only place that knows about SharePoint structure
 */
export interface IProduct {
  Id: number;
  Title: string;
  Precio: number;
}

/**
 * Type-safe response from SharePoint.
 *
 * This is what PnPjs returns when you chain:
 *   .select('Id', 'Title', 'Precio')
 *
 * The generic `<IProducto>` tells TypeScript the shape of the response.
 */
export interface IProductResponse {
  Id: number;
  Title: string;
  Precio: number;
}
