import { useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";

export function ForceDarkMode(props: { children: JSX.Element }) {
    const { colorMode, toggleColorMode } = useColorMode();

    useEffect(() => {
        if (colorMode === "dark") return;
        toggleColorMode();
    }, [colorMode]);

    return props.children;
}
