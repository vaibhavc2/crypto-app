import { Box, Spinner, VStack } from "@chakra-ui/react";
import React from "react";

const ChartLoader = () => {
  return (
    <VStack h={"50vh"} justifyContent={"center"}>
      <Box transform={"scale(3)"}>
        <Spinner size={"lg"} />
      </Box>
    </VStack>
  );
};

export default ChartLoader;
