import {
  Badge,
  Box,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { server } from "../main";
import { useParams } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currency, setCurrency] = useState("inr");

  const params = useParams();

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        setCoin(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
        setErrorMessage(err.message);
      }
    };
    fetchCoinDetails();
  }, [params.id]);

  if (error) return <ErrorComponent msg={errorMessage} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={"full"} borderWidth={1}>
            {coin.name}
          </Box>

          <RadioGroup value={currency} onChange={setCurrency} p={8}>
            <HStack spacing={4}>
              <Radio value="inr">₹ INR</Radio>
              <Radio value="usd">$ USD</Radio>
              <Radio value="eur">€ EUR</Radio>
            </HStack>
          </RadioGroup>

          {/** Button */}

          <VStack spacing={4} p={"16"} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
              Last Updated on{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
            <Image src={coin.image.large} w={16} h={16} objectFit={"contain"} />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol} {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h < 0
                      ? "decrease"
                      : "increase"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge
              fontSize={"2xl"}
              bgColor={"blackAlpha.800"}
              color={"white"}
              cursor={"pointer"}
            >
              {`#${coin.market_cap_rank}`}
            </Badge>

            <CustomBar
              high={`${currencySymbol} ${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol} ${coin.market_data.low_24h[currency]}`}
            />

            <Box w={"full"} p={4}>
              <Item title="Max Supply" value={2323} />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const CustomBar = ({ low, high }) => {
  return (
    <VStack w={"full"}>
      <Progress value={50} colorScheme="teal" w={"full"} />
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} colorScheme="red" />
        <Text fontSize={"sm"}>24H Range</Text>
        <Badge children={high} colorScheme="green" />
      </HStack>
    </VStack>
  );
};

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={4}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {value}
    </Text>
  </HStack>
);

export default CoinDetails;
