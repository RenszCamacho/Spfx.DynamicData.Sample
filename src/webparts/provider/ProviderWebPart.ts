import * as React from "react";
import * as ReactDom from "react-dom";

import { Version } from "@microsoft/sp-core-library";
import {
  PropertyPaneTextField,
  type IPropertyPaneConfiguration,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import type {
  IDynamicDataPropertyDefinition,
  IDynamicDataCallables,
} from "@microsoft/sp-dynamic-data";

import * as strings from "ProviderWebPartStrings";
import { IProviderProps } from "./components/IProviderProps";
import { Provider } from "./components/Provider";
import type { IProduct } from "../../models";
import {
  getPropertyDefinitions,
  getPropertyValue,
  getPropertyById,
} from "../../sources";
import { DYNAMIC_DATA_PROPERTIES } from "../../constants";

export interface IProviderWebPartProps {
  description: string;
}

export default class ProviderWebPart
  extends BaseClientSideWebPart<IProviderWebPartProps>
  implements IDynamicDataCallables
{
  private _products: IProduct[] = [];
  private _selectedProduct: IProduct | undefined;

  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return getPropertyDefinitions();
  }

  public getPropertyValue(
    propertyId: string,
  ): IProduct[] | number | IProduct | undefined {
    return getPropertyValue(propertyId, {
      products: this._products,
      selectedProduct: this._selectedProduct,
    });
  }

  public getPropertyById(
    propertyId: string,
  ): IDynamicDataPropertyDefinition | undefined {
    return getPropertyById(propertyId);
  }

  public render(): void {
    const element: React.ReactElement<IProviderProps> = React.createElement(
      Provider,
      {
        serviceScope: this.context.serviceScope,
        onProductsLoaded: (products: IProduct[]): void => {
          this._products = products;
        },
        onProductSelected: (product: IProduct | undefined): void => {
          this._selectedProduct = product;
          this.context.dynamicDataSourceManager.notifyPropertyChanged(
            DYNAMIC_DATA_PROPERTIES.PRODUCTO_SELECCIONADO,
          );
        },
      },
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this.context.dynamicDataSourceManager.initializeSource(this);
    return super.onInit();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
