import {
    Button,
    Center,
    Container,
    Divider,
    Flex,
    Stack,
    Text,
    useClipboard,
} from "@chakra-ui/react";
import * as Types from "./GameWaiting.types";

export const GameWaiting = ({ invitationLink, playersInRoom }: Types.Props) => {
    const { onCopy, hasCopied } = useClipboard(invitationLink);

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
                        fontSize="4xl"
                        fontWeight={"bold"}
                    >
                        Players in the room
                    </Text>

                    {playersInRoom &&
                        playersInRoom.map((playerNick) => (
                            <Text textAlign={"center"} fontSize="md">
                                {playerNick}
                            </Text>
                        ))}
                </Stack>
            </Container>
        </Flex>
    );
};
