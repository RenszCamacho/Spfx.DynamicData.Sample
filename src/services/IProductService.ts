import { IProduct } from "../models";

/**
 * Contrato del servicio de productos.
 *
 * PATRÓN: Interface/Contract
 * Define QUÉ hace el servicio, no CÓMO lo hace.
 * Permite cambiar la implementación sin afectar los consumidores.
 */
export interface IProductService {
  getProducts(): Promise<IProduct[]>;
}
