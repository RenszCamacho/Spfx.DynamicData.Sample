import * as React from "react";

import type { IConsumerProps } from "./IConsumerProps";
import { useConsumer } from "../hooks/useConsumer";

import { Text, Stack } from "@fluentui/react";

const Consumer: React.FC<IConsumerProps> = ({ productoSeleccionado }) => {
  const { selectedProduct } = useConsumer(productoSeleccionado);

  if (!selectedProduct) {
    return (
      <Stack
        as="section"
        horizontalAlign="center"
        verticalAlign="center"
        tokens={{ padding: 20 }}
      >
        <Text as="h2" variant="large">
          No product selected
        </Text>
        <Text as="p">
          Select a product from the Provider web part to see its details.
        </Text>
      </Stack>
    );
  }

  return (
    <Stack as="section" tokens={{ padding: 20 }}>
      <Text as="h2" variant="xLarge" block>
        Product Detail
      </Text>
      <Stack tokens={{ childrenGap: 10 }}>
        <Text as="p" variant="large">
          <strong>ID:</strong> {selectedProduct.Id}
        </Text>
        <Text as="p" variant="large">
          <strong>Name:</strong> {selectedProduct.Title}
        </Text>
        <Text as="p" variant="large">
          <strong>Price:</strong> ${selectedProduct.Precio}
        </Text>
      </Stack>
    </Stack>
  );
};

export { Consumer };
