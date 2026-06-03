import * as React from "react";
import * as ReactDom from "react-dom";

import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneDynamicField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { type DynamicProperty } from "@microsoft/sp-component-base";

import * as strings from "ConsumerWebPartStrings";
import { Consumer } from "./components/Consumer";
import { IConsumerProps } from "./components/IConsumerProps";
import type { IProduct } from "../../models";

export interface IConsumerWebPartProps {
  products: DynamicProperty<IProduct[]>;
}

export default class ConsumerWebPart extends BaseClientSideWebPart<IConsumerWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IConsumerProps> = React.createElement(
      Consumer,
      {
        dynamicProperty: this.properties.products,
      },
    );

    ReactDom.render(element, this.domElement);
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
                PropertyPaneDynamicField("products", {
                  label: strings.DynamicFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
