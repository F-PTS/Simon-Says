import { ChakraProvider } from "@chakra-ui/react";
import AppTheme from "./theme/AppTheme";
import PageProvider from "./PageProvider";

function Providers() {
    return (
        <ChakraProvider theme={AppTheme}>
            <PageProvider>
                <h1>temp</h1>
            </PageProvider>
        </ChakraProvider>
    );
}

export default Providers;
