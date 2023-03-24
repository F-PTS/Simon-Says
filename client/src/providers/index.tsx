import { ChakraProvider } from "@chakra-ui/react";
import { PageProvider } from "./PageProvider";
import { RouterProvider } from "./RouterProvider";
import { theme } from "./theme/AppTheme";
import { ForceDarkMode } from "./theme/ForceDarkMode";

export function Providers() {
    return (
        <ChakraProvider theme={theme}>
            <ForceDarkMode>
                <PageProvider>
                    <RouterProvider />
                </PageProvider>
            </ForceDarkMode>
        </ChakraProvider>
    );
}
