import * as React from "react";

import type { IConsumerProps } from "./IConsumerProps";
import { useConsumer } from "../hooks/useConsumer";

import {
  DocumentCard,
  DocumentCardDetails,
  Separator,
  Stack,
  Text,
  keyframes,
} from "@fluentui/react";

const fadeIn = keyframes({
  from: { opacity: 0, transform: "translateY(4px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

const Consumer: React.FC<IConsumerProps> = ({ productoSeleccionado }) => {
  const { selectedProduct } = useConsumer(productoSeleccionado);

  if (!selectedProduct) {
    return (
      <Stack
        as="section"
        horizontalAlign="center"
        verticalAlign="center"
        tokens={{ padding: 32 }}
        styles={{ root: { minHeight: 160 } }}
      >
        <Stack tokens={{ childrenGap: 6, maxWidth: 320 }} horizontalAlign="center">
          <Text
            as="h3"
            variant="mediumPlus"
            block
            styles={{ root: { fontWeight: 600 } }}
          >
            No product selected
          </Text>
          <Text
            as="p"
            variant="medium"
            block
            styles={{ root: { textAlign: "center", opacity: 0.75 } }}
          >
            Choose a product in the Provider web part to see its details here.
          </Text>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack
      as="section"
      tokens={{ padding: 24 }}
      styles={{
        root: {
          animation: `${fadeIn} 240ms ease-out`,
        },
      }}
    >
      <DocumentCard aria-label={`Product detail: ${selectedProduct.Title}`}>
        <DocumentCardDetails>
          <Stack tokens={{ childrenGap: 16, padding: 20 }}>
            <Text
              as="span"
              variant="small"
              block
              styles={{
                root: {
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  opacity: 0.6,
                },
              }}
            >
              Product
            </Text>

            <Text
              as="h2"
              variant="xLarge"
              block
              styles={{
                root: { fontWeight: 600, lineHeight: 1.2 },
              }}
            >
              {selectedProduct.Title}
            </Text>

            <Separator />

            <Stack horizontal tokens={{ childrenGap: 32 }} wrap>
              <Stack tokens={{ childrenGap: 4 }}>
                <Text
                  as="span"
                  variant="small"
                  block
                  styles={{ root: { opacity: 0.6 } }}
                >
                  Price
                </Text>
                <Text
                  as="span"
                  variant="xxLarge"
                  block
                  styles={{ root: { fontWeight: 700, lineHeight: 1.1 } }}
                >
                  ${selectedProduct.Precio}
                </Text>
              </Stack>

              <Stack tokens={{ childrenGap: 4 }}>
                <Text
                  as="span"
                  variant="small"
                  block
                  styles={{ root: { opacity: 0.6 } }}
                >
                  ID
                </Text>
                <Text
                  as="span"
                  variant="large"
                  block
                  styles={{
                    root: {
                      fontFamily:
                        'Consolas, "Courier New", monospace',
                      opacity: 0.85,
                    },
                  }}
                >
                  #{selectedProduct.Id}
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </DocumentCardDetails>
      </DocumentCard>
    </Stack>
  );
};

export { Consumer };
