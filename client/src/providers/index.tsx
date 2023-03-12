import { ChakraProvider } from "@chakra-ui/react";
import AppTheme from "./theme/AppTheme";
import PageProvider from "./PageProvider";
import RouterProvider from "./RouterProvider";

function Providers() {
    return (
        <ChakraProvider theme={AppTheme}>
            <PageProvider>
                <RouterProvider />
            </PageProvider>
        </ChakraProvider>
    );
}

export default Providers;
