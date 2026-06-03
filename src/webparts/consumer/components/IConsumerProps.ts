import type { DynamicProperty } from "@microsoft/sp-component-base";
import type { IProduct } from "../../../models";

export interface IConsumerProps {
  dynamicProperty: DynamicProperty<IProduct[]>;
}
