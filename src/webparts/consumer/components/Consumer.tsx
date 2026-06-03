import * as React from "react";

import type { IConsumerProps } from "./IConsumerProps";
import { useConsumer } from "../hooks/useConsumer";

import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  type IColumn,
  Spinner,
  SpinnerSize,
  Text,
  Stack,
} from "@fluentui/react";
import { COLUMNS } from "../../../constants";

const Consumer: React.FC<IConsumerProps> = ({ dynamicProperty }) => {
  const { products, productCount, loading } =
    useConsumer(dynamicProperty);

  const columns: IColumn[] = React.useMemo(
    () => [
      {
        key: "colTitle",
        name: "Title",
        fieldName: COLUMNS.TITLE,
        minWidth: 150,
        isResizable: true,
      },
      {
        key: "colPrecio",
        name: "Precio",
        fieldName: COLUMNS.PRECIO,
        minWidth: 80,
        maxWidth: 120,
        isResizable: true,
      },
    ],
    [],
  );

  if (loading) {
    return (
      <Stack
        as="section"
        horizontalAlign="center"
        verticalAlign="center"
        tokens={{ padding: 20 }}
      >
        <Spinner size={SpinnerSize.medium} label="Loading products..." />
      </Stack>
    );
  }

  if (products.length === 0) {
    return (
      <Stack as="section" tokens={{ padding: 20 }}>
        <Text as="h2" variant="large">
          No data source configured
        </Text>
        <Text as="p">
          Add a Dynamic Data source in the web part property pane.
        </Text>
      </Stack>
    );
  }

  return (
    <Stack as="section">
      <Text as="h2" variant="large" block>
        Products ({productCount})
      </Text>
      <DetailsList
        items={products}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={SelectionMode.single}
        selectionPreservedOnEmptyClick={true}
        onItemInvoked={(item): void => {
          console.log("Selected:", item);
        }}
        ariaLabelForGrid="Products list"
        checkButtonAriaLabel="select row"
      />
    </Stack>
  );
};

export { Consumer };
