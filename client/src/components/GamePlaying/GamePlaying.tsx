import { Flex, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { SimonSaysBoxes } from "../../components/SimonSaysBoxes";

export const GamePlaying = () => {
    const { id } = useParams();

    return (
        <Stack
            justifyContent="space-around"
            direction={"column"}
            align="center"
            flex={1}
        >
            <Text fontSize={"4xl"}>Simon's Turn @</Text>
            <SimonSaysBoxes />
            <Text fontSize={"xl"}>Round 69</Text>
        </Stack>
    );
};
