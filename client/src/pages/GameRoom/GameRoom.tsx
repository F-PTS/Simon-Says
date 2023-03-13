import { Flex } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

export const GameRoom = () => {
    const { id } = useParams();

    return <>Gameroom ID: {id}</>;
};
