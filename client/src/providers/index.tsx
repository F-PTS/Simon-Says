import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme/AppTheme";
import { PageProvider } from "./PageProvider";
import { RouterProvider } from "./RouterProvider";

export function Providers() {
  return (
    <ChakraProvider theme={theme}>
      <PageProvider>
        <RouterProvider />
      </PageProvider>
    </ChakraProvider>
  );
}
