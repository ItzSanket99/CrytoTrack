import { Box, Container, HStack, Radio, RadioGroup, VStack , Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button} from '@chakra-ui/react'
import React,{ useEffect, useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import { server } from "../index";
import {useParams} from 'react-router-dom';
import Error from './Error';
import Chart from './Chart';



const CoinsDetails = () => {

  const [coin,setCoin] = useState({});
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [currency,setCurrency] = useState("inr");
  const [days,setDays] = useState("24h");
  const [chartArray,setChartArray] = useState([]);
  const currencySymbol = currency === 'inr'?"₹":currency === 'eur'?"€":"$";

  const btns = ['24h','7d','14d','30d','60d','200d','365d']

  const params = useParams();

  const switchChartstats = (key)=>{
    switch (key) {
      case '24h':
        setDays('24h');
        setLoading(true);
        break;
      case '7d':
        setDays('7d');
        setLoading(true);
        break;
      case '14d':
        setDays('14d');
        setLoading(true);
        break;
      case '30d':
        setDays('30d');
        setLoading(true);
        break;
      case '60d':
        setDays('60d');
        setLoading(true);
        break;
      case '200d':
        setDays('200d');
        setLoading(true);
        break;
      case '365d':
        setDays('365d');
        setLoading(true);
        break;
    
      default:
        setDays('24h');
        setLoading(true);
        break;
    }
  }

  useEffect(()=>{

    const fetchcoin = async () => {
      try {
        const {data} = await axios.get(`${server}/coins/${params.id}`)
        const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
        
        
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);

      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchcoin();
  },[params.id,days,currency]);

  if (error) return <Error message={'error while fetching the coin data '} />

  return (
    <Container maxW={'container.xl'} >
      {
        loading?<Loader />:
        <>
          <Box w={'full'} borderWidth={1} >
            <Chart  arr={chartArray} currency={currencySymbol} days={days} />
          </Box>

          <HStack p={'4'} overflowX={'auto'} >
            {
              btns.map((i)=>(
                <Button key={i} onClick={()=> switchChartstats(i)} >{i}</Button>
              ))
            }
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={'8'} >
            <HStack>
              <Radio value={'inr'} >INR</Radio>
              <Radio value={'usd'} >USD</Radio>
              <Radio value={'eur'} >EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={'4'} padding={'16'} alignItems={'flex-start'} >
            <Text fontSize={"small"} alignSelf="center" opacity={0.7} >
              Last Update on {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>

            <Image src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'} />
          
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
                <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? 'increase':'decrease'} />
                  {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge fontSize={'xl'} bgColor={'blackAlpha.900'} color={'white'} >
              {`#${coin.market_cap_rank}`}
            </Badge>

            <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} />

            <Box w={'full'} p={'4'} >
              <Item tittle={'max supply'} value={coin.market_data.max_supply} />
              <Item tittle={'Circulating supply'} value={coin.market_data.circulating_supply} />
              <Item tittle={'Market Capital'} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
              <Item tittle={'All Time Low'} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
              <Item tittle={'All Time High'} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
            </Box>
          </VStack>
        </>
      }

    </Container>
  )
}

const CustomBar = ({high,low})=>{
  return (
    <VStack w={'full'} >
      <Progress value={50} colorScheme='teal' w={'full'} />
      <HStack justifyContent={'space-between'} w={'full'} >
        <Badge children={low} colorScheme='red'  />
        <Text fontSize={'small'} >24H Range</Text>
        <Badge children={high} colorScheme='green'  />
      </HStack>
    </VStack>
  )
}

const Item = ({tittle,value})=>{
  return(
    <HStack justifyContent={'space-between'} w={'full'} my={'4'} >
      <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'} >
        {tittle}
      </Text>
      <Text>
        {value}
      </Text>
    </HStack>
  )
}

export default CoinsDetails