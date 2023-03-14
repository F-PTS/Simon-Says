import { Button, SimpleGrid } from "@chakra-ui/react";
import React from "react";

export function SimonSaysBoxes() {
    return (
        <SimpleGrid columns={2} spacing={4}>
            <Button h="150px" w="150px" colorScheme="red" variant="solid" />
            <Button h="150px" w="150px" colorScheme="green" variant="solid" />
            <Button h="150px" w="150px" colorScheme="blue" variant="solid" />
            <Button h="150px" w="150px" colorScheme="yellow" variant="solid" />
        </SimpleGrid>
    );
}
