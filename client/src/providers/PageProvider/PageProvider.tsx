import { Flex } from "@chakra-ui/react";
import * as Types from "./PageProvider.types";

export const PageProvider = ({ children }: Types.Props) => {
  return (
    <Flex direction="column" minH="100vh" p={[1, 2, 4]}>
      {children}
    </Flex>
  );
};
