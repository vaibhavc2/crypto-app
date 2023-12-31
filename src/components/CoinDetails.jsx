import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Heading,
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
import Chart from "./Chart";
import numberToCurrency from "../func/numberToCurrency";
import ChartLoader from "./ChartLoader";

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  const [chartLoading, setChartLoading] = useState(true);

  const params = useParams();

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (val) => {
    switch (val) {
      case "24h":
        setDays("24h");
        setChartLoading(true);
        break;

      case "7d":
        setDays("7d");
        setChartLoading(true);
        break;

      case "14d":
        setDays("14d");
        setChartLoading(true);
        break;

      case "30d":
        setDays("30d");
        setChartLoading(true);
        break;

      case "60d":
        setDays("60d");
        setChartLoading(true);
        break;

      case "200d":
        setDays("200d");
        setChartLoading(true);
        break;

      case "1y":
        setDays("365d");
        setChartLoading(true);
        break;

      case "max":
        setDays("max");
        setChartLoading(true);
        break;

      default:
        setDays("24h");
        setChartLoading(true);
        break;
    }
  };

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        setCoin(data);

        window.scrollTo(0, 0); // scroll to top
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
        setErrorMessage(err.message);
      }
    };
    fetchCoinDetails();
  }, [params.id, currency]);

  useEffect(() => {
    const fetchChartDetails = async () => {
      try {
        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setChartArray(chartData.prices);
        setChartLoading(false);
      } catch (err) {
        setError(true);
        setChartLoading(false);
        setErrorMessage(err.message);
      }
    };
    fetchChartDetails();
  }, [days]);

  if (error) return <ErrorComponent msg={errorMessage} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={"full"} borderWidth={1} mt={35}>
            <Heading display={"block"} textAlign={"center"} p={2}>
              {coin.name}
            </Heading>
            {chartLoading ? (
              <ChartLoader />
            ) : (
              <>
                <Chart arr={chartArray} currency={currencySymbol} days={days} />
              </>
            )}
          </Box>

          <RadioGroup value={currency} onChange={setCurrency} m={5}>
            <HStack spacing={4}>
              <Radio value="inr">₹ INR</Radio>
              <Radio value="usd">$ USD</Radio>
              <Radio value="eur">€ EUR</Radio>
            </HStack>
          </RadioGroup>

          <HStack p={4} overflowX={"auto"}>
            {btns.map((i) => (
              <Button key={i} onClick={() => switchChartStats(i)}>
                {i}
              </Button>
            ))}
          </HStack>

          <VStack spacing={4} p={"16"} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
              Last Updated on{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
            <Image src={coin.image.large} w={16} h={16} objectFit={"contain"} />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}{" "}
                {numberToCurrency(
                  currency,
                  coin.market_data.current_price[currency]
                )}
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
              high={`${currencySymbol} ${numberToCurrency(
                currency,
                coin.market_data.high_24h[currency]
              )}`}
              low={`${currencySymbol} ${numberToCurrency(
                currency,
                coin.market_data.low_24h[currency]
              )}`}
            />

            <Box w={"full"} p={4}>
              <Item
                title="Max Supply"
                value={numberToCurrency(currency, coin.market_data.max_supply)}
              />
              <Item
                title="Circulating Supply"
                value={numberToCurrency(
                  currency,
                  coin.market_data.circulating_supply
                )}
              />
              <Item
                title="Market Cap"
                value={`${currencySymbol} ${numberToCurrency(
                  currency,
                  coin.market_data.market_cap[currency]
                )}`}
              />
              <Item
                title="All Time Low"
                value={`${currencySymbol} ${numberToCurrency(
                  currency,
                  coin.market_data.atl[currency]
                )}`}
              />
              <Item
                title="All Time High"
                value={`${currencySymbol} ${numberToCurrency(
                  currency,
                  coin.market_data.ath[currency]
                )}`}
              />
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
