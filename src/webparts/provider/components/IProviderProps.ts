import { ServiceScope } from "@microsoft/sp-core-library";
import type { IProduct } from "../../../models";

export interface IProviderProps {
  serviceScope: ServiceScope;
  onProductsLoaded: (products: IProduct[]) => void;
  onProductSelected: (product: IProduct | undefined) => void;
}
