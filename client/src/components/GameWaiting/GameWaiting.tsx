import {
    Button,
    Center,
    Container,
    Divider,
    Flex,
    Input,
    Stack,
    Text,
    useClipboard,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import * as Types from "./GameWaiting.types";
import Filter from "bad-words";
const filter = new Filter();

export const GameWaiting = ({
    invitationLink,
    opponentNick,
    currentUsername,
    socket,
}: Types.Props) => {
    const { onCopy, hasCopied } = useClipboard(invitationLink);
    const toast = useToast();
    const [username, setUsername] = useState<string>();

    const handleNickChange = () => {
        if (!username) {
            toast({
                title: "NickName cannot be empty",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (filter.isProfane(username)) {
            toast({
                title: "Profane nickname detected",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        socket.emit("user:setName", username);
    };

    return (
        <Flex justifyContent="center" align="center" flex={1}>
            <Container>
                <Stack gap={4} justifyContent="center">
                    <Text
                        textAlign={"center"}
                        fontSize="4xl"
                        fontWeight={"bold"}
                    >
                        Invitation Link
                    </Text>
                    <Text
                        textAlign={"center"}
                        fontSize="xl"
                        color={hasCopied ? "green.300" : ""}
                    >
                        {invitationLink}
                    </Text>
                    <Button onClick={onCopy} colorScheme={"green"}>
                        {hasCopied ? "Copied!" : "Copy Link"}
                    </Button>

                    <Divider />

                    <Text
                        textAlign={"center"}
                        fontSize="3xl"
                        fontWeight={"bold"}
                    >
                        Players in the room
                    </Text>

                    <Flex justifyContent={"space-around"} gap={6}>
                        <Stack>
                            <Text fontWeight={"bold"}>You</Text>
                            <Text size={"sm"}>{currentUsername}</Text>
                        </Stack>
                        <Stack>
                            <Text fontWeight={"bold"}>Opponent</Text>
                            <Text size={"sm"}>{opponentNick}</Text>
                        </Stack>
                    </Flex>

                    <Input
                        placeholder="Nickname"
                        colorScheme={"green"}
                        size="md"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button
                        colorScheme={"green"}
                        size="md"
                        onClick={handleNickChange}
                    >
                        Change nickname
                    </Button>
                </Stack>
            </Container>
        </Flex>
    );
};
