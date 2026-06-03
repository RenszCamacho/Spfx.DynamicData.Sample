import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";

import { spfi, SPFI, SPFx } from "@pnp/sp";
import { LogLevel, PnPLogging } from "@pnp/logging";

import { IProductService } from "./IProductService";
import {
  IProduct,
  IProductResponse,
  PRODUCTOS_LIST,
  COLUMN_TITLE,
  COLUMN_PRECIO,
} from "../models";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export class ProductService implements IProductService {
  public static readonly serviceKey: ServiceKey<IProductService> =
    ServiceKey.create<IProductService>(
      "DynamicData.ProductService",
      ProductService,
    );

  private _sp!: SPFI;

  constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      const pageContext = serviceScope.consume(PageContext.serviceKey);

      this._sp = spfi()
        .using(SPFx({ pageContext }))
        .using(PnPLogging(LogLevel.Warning));
    });
  }

  public async getProducts(): Promise<IProduct[] | []> {
    try {
      const items = await this._sp.web.lists
        .getByTitle(PRODUCTOS_LIST)
        .items.select(COLUMN_TITLE, COLUMN_PRECIO)
        .orderBy(COLUMN_TITLE)<IProductResponse[]>();

      return items.map(({ Id, Title, Precio }) => ({
        Id,
        Title,
        Precio,
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
