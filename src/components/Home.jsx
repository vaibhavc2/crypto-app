import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import btc from "../assets/btc.png";

const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
      <Image
        src={btc}
        w={"full"}
        h={"86%"}
        objectFit={"contain"}
        filter={"grayscale(1)"}
      />
      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.700"}
        // mt={"-20"}
      >
        DigiCoin
      </Text>
    </Box>
  );
};

export default Home;
