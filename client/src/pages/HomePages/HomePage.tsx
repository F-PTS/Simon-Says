import React from "react";
import { Text, Button, Stack, Box, Container, Flex } from "@chakra-ui/react";
import { Link, redirect } from "react-router-dom";
import uniqid from "uniqid";

const HomePage = () => {
    return (
        <Flex justifyContent="center" align="center" flex={1}>
            <Container>
                <Stack gap={2} align="center">
                    <Text fontWeight={"bold"} fontSize="5xl">
                        Simon Says
                    </Text>
                    <Text fontSize="2xl">
                        Play simon says with your friends!
                    </Text>
                </Stack>
                <Stack gap={2} mt="10">
                    <Button
                        as={Link}
                        to={`/game/${uniqid()}`}
                        colorScheme={"green"}
                    >
                        Play!
                    </Button>
                    <Button
                        as={Link}
                        to="https://github.com/F-PTS/Simon-Says"
                        colorScheme={"green"}
                        variant="ghost"
                        target="_blank"
                    >
                        GitHub
                    </Button>
                </Stack>
            </Container>
        </Flex>
    );
};

export default HomePage;
