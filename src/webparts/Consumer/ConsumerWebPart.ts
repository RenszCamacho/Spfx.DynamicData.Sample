import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'ConsumerWebPartStrings';
import Consumer from './components/Consumer';
import { IConsumerProps } from './components/IConsumerProps';

export interface IConsumerWebPartProps {

}

export default class ConsumerWebPart extends BaseClientSideWebPart<IConsumerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IConsumerProps> = React.createElement(
      Consumer,
      {
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return Promise.resolve()
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [

              ]
            }
          ]
        }
      ]
    };
  }
}
