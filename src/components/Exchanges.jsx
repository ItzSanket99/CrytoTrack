import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack } from '@chakra-ui/react'
import Loader from './Loader'
import ExchangeCard from './ExchangeCard'
import Error from './Error'

const Exchanges = () => {

  const [exchanges,setExchanges] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);

  useEffect(()=>{
    const fetchExchanges = async ()=>{
      try {
        const {data} = await axios.get(`${server}/exchanges?per_page=100`)
        setExchanges(data);    
        setLoading(false);

      } catch (error) {
        setError(true)
        setLoading(false)
        
      }
    }

    fetchExchanges();
  },[])

  if (error) {
    return <Error message={'error while fetching exchanges'} />
  }

  return (
    <Container maxW={'Container.xl'} >
      {
        loading?<Loader />:(
        <>
          <HStack wrap={'wrap'}  justifyContent={'space-evenly'} >
            {
              exchanges.map((i)=>(
                <ExchangeCard name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} key={i.id} />
              )) 
            }
          </HStack>
        </>)
      }
    </Container>
  )
}

export default Exchanges