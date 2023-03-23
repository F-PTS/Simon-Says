import { Button, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import * as Types from "./GamePlaying.types";

export const GamePlaying = ({
    opponentNick,
    currentUsername,
    playRematch,
    addPlayerMove,
    playerMoves,
    opponentMoves,
    roundCount,
    wantRematch,
    socket,
    handleChangeRoundCount,
    playerRole,
    handleChangePlayerRole,
    gameResult,
}: Types.Props) => {
    return (
        <Stack
            justifyContent="space-around"
            direction={"column"}
            align="center"
            flex={1}
        >
            <Text fontSize={"4xl"}>{playerRole.current}</Text>

            <SimpleGrid columns={2} spacing={4}>
                <Button
                    h="150px"
                    w="150px"
                    colorScheme="red"
                    variant="solid"
                    onClick={() => addPlayerMove("Red")}
                />
                <Button
                    h="150px"
                    w="150px"
                    colorScheme="green"
                    variant="solid"
                    onClick={() => addPlayerMove("Green")}
                />
                <Button
                    h="150px"
                    w="150px"
                    colorScheme="blue"
                    variant="solid"
                    onClick={() => addPlayerMove("Blue")}
                />
                <Button
                    h="150px"
                    w="150px"
                    colorScheme="yellow"
                    variant="solid"
                    onClick={() => addPlayerMove("Yellow")}
                />
            </SimpleGrid>

            <Text fontSize={"xl"}>{roundCount}</Text>
        </Stack>
    );
};
