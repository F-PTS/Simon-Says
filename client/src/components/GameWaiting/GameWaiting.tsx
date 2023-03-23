import {
  Button,
  Container,
  Divider,
  Flex,
  Input,
  Stack,
  Text,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import Filter from "bad-words";
import { useState } from "react";
import * as Types from "./GameWaiting.types";
const filter = new Filter();

export const GameWaiting = ({
  invitationLink,
  opponentNick,
  currentUsername,
  socket,
  isOpponentReady,
}: Types.Props) => {
  const { onCopy, hasCopied } = useClipboard(invitationLink);
  const toast = useToast();
  const [username, setUsername] = useState<string>();
  const [isReady, setIsReady] = useState<boolean>(false);

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

    if (opponentNick && opponentNick === username) {
      toast({
        title: "Nick is already taken",
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

  const handleReadyToggle = () => {
    setIsReady((current) => !current);
    socket.emit("user:setReady");
  };

  const handleStartGame = () => {
    const readyTuple: [boolean, boolean] = [isReady, isOpponentReady];
    console.log(readyTuple);
    socket.emit("room:startGame", readyTuple);
  };

  return (
    <Flex justifyContent="center" align="center" flex={1}>
      <Container>
        <Stack gap={4} justifyContent="center">
          <Text textAlign={"center"} fontSize="4xl" fontWeight={"bold"}>
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

          <Text textAlign={"center"} fontSize="3xl" fontWeight={"bold"}>
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
            disabled={isReady}
            placeholder="Nickname"
            colorScheme={"green"}
            size="md"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button colorScheme={"green"} size="md" onClick={handleNickChange}>
            Change nickname
          </Button>

          <Flex justifyContent={"space-around"} alignItems="center">
            <Button
              size={"sm"}
              variant="ghost"
              onClick={handleReadyToggle}
              colorScheme={isReady ? "green" : "red"}
            >
              {currentUsername} {isReady ? "" : "not"} ready
            </Button>

            <Text
              fontSize={"sm"}
              fontWeight="medium"
              color={isOpponentReady ? "green.200" : "red.200"}
            >
              {opponentNick} {isOpponentReady ? "" : "not"} ready
            </Text>
          </Flex>
          {isOpponentReady && isReady && (
            <Button onClick={handleStartGame} colorScheme={"green"}>
              Play!
            </Button>
          )}
        </Stack>
      </Container>
    </Flex>
  );
};
