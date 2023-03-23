import { Button, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import * as Types from "./GamePlaying.types";

export const GamePlaying = ({
    playRematch,
    addPlayerMove,
    roundCount,
    playerRole,
    gameResult,
    activeButtonColor,
}: Types.Props) => {
    return (
        <Stack
            justifyContent="space-around"
            direction={"column"}
            align="center"
            flex={1}
        >
            {gameResult === "Playing" && (
                <>
                    <Text fontSize={"4xl"}>{playerRole.current}</Text>

                    <SimpleGrid columns={2} spacing={4}>
                        <Button
                            h="150px"
                            w="150px"
                            colorScheme="red"
                            variant="solid"
                            onClick={() => addPlayerMove("Red")}
                            isDisabled={playerRole.current === "waiting"}
                            backgroundColor={
                                activeButtonColor === "Red" ? "red.600" : ""
                            }
                        />
                        <Button
                            h="150px"
                            w="150px"
                            colorScheme="green"
                            variant="solid"
                            onClick={() => addPlayerMove("Green")}
                            isDisabled={playerRole.current === "waiting"}
                            backgroundColor={
                                activeButtonColor === "Green" ? "green.700" : ""
                            }
                        />
                        <Button
                            h="150px"
                            w="150px"
                            colorScheme="blue"
                            variant="solid"
                            onClick={() => addPlayerMove("Blue")}
                            isDisabled={playerRole.current === "waiting"}
                            backgroundColor={
                                activeButtonColor === "Blue" ? "blue.600" : ""
                            }
                        />
                        <Button
                            h="150px"
                            w="150px"
                            colorScheme="yellow"
                            variant="solid"
                            onClick={() => addPlayerMove("Yellow")}
                            isDisabled={playerRole.current === "waiting"}
                            backgroundColor={
                                activeButtonColor === "Yellow"
                                    ? "yellow.600"
                                    : ""
                            }
                        />
                    </SimpleGrid>

                    <Text fontSize={"xl"}>{roundCount}</Text>
                </>
            )}

            {gameResult !== "Playing" && (
                <>
                    <Stack align="center" spacing={8}>
                        <Text fontSize="6xl">Game Is Over</Text>
                        <Text fontSize="3xl">
                            {gameResult === "Win" ? "You Won!" : "You Lost!"}
                        </Text>
                        <Button
                            w={"100%"}
                            colorScheme="green"
                            mt={5}
                            onClick={() => playRematch()}
                        >
                            Ask for rematch
                        </Button>
                    </Stack>
                </>
            )}
        </Stack>
    );
};
