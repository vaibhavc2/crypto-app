import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import btc from "../assets/btc.png";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"} pt={35}>
      <motion.div
        style={{
          height: "80vh"
        }}
        animate={{
          translateY: "20px"
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Image
          src={btc}
          w={"full"}
          h={"86%"}
          objectFit={"contain"}
          filter={"grayscale(1)"}
        />
      </motion.div>
      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.700"}
        mt={"-20"}
      >
        DigiCoin
      </Text>
    </Box>
  );
};

export default Home;
