import * as React from "react";

import styles from "./Provider.module.scss";

import type { IProviderProps } from "./IProviderProps";
import { useProducts } from "../hooks/useProducts";

import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  type IColumn,
  Spinner,
  SpinnerSize,
  Text,
  Stack,
} from "@fluentui/react";
import type { IProduct } from "../../../models";
import { COLUMNS } from "../../../constants";

const Provider = ({
  serviceScope,
  onProductsLoaded,
  onProductSelected,
}: IProviderProps): JSX.Element => {
  const { products, loading, error, selectProduct } =
    useProducts(serviceScope);

  // Notify parent when products change (for DynamicData state)
  React.useEffect(() => {
    onProductsLoaded(products);
  }, [products, onProductsLoaded]);

  const handleProductSelect = React.useCallback(
    (product: IProduct | undefined): void => {
      selectProduct(product);
      onProductSelected(product);
    },
    [selectProduct, onProductSelected],
  );

  const columns: IColumn[] = React.useMemo(
    () => [
      {
        key: "colId",
        name: "ID",
        fieldName: "Id",
        minWidth: 40,
        maxWidth: 60,
        isResizable: true,
      },
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

  const selectionRef = React.useRef<Selection | undefined>(undefined);

  const selection = React.useMemo(
    () =>
      new Selection({
        onSelectionChanged: (): void => {
          const sel = selectionRef.current;
          if (sel) {
            const selected = sel.getSelection()[0] as IProduct | undefined;
            handleProductSelect(selected);
          }
        },
      }),
    [],
  );

  React.useEffect(() => {
    selectionRef.current = selection;
  }, [selection]);

  if (loading) {
    return (
      <Stack
        as="section"
        className={styles.provider}
        horizontalAlign="center"
        verticalAlign="center"
        tokens={{ padding: 20 }}
      >
        <Spinner size={SpinnerSize.medium} label="Loading products..." />
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack
        as="section"
        className={styles.provider}
        tokens={{ padding: 20 }}
      >
        <Text as="h2" variant="large">
          Error loading products
        </Text>
        <Text as="p">{error}</Text>
      </Stack>
    );
  }

  return (
    <Stack as="section" className={styles.provider}>
      <Text as="h2" variant="large" block>
        Products
      </Text>
      <Text as="p" block>
        {products.length} product(s) found
      </Text>
      <DetailsList
        items={products}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={SelectionMode.single}
        selection={selection}
        selectionPreservedOnEmptyClick={true}
        ariaLabelForGrid="Products list"
        checkButtonAriaLabel="select row"
      />
    </Stack>
  );
};

export { Provider };
