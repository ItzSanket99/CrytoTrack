import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Box bgColor={'blackAlpha.900'} color={'whiteAlpha.700'} minH={'48'} px={'16'} py={['16','8']} >
        <Stack direction={['column','row']} h={'full'} alignItems={'center'} >
            <VStack w={'full'} alignItems={['center','flex-start']} >
                <Text fontWeight={'bold'} >
                    About Us
                </Text>
                <Text fontSize={'sm'} letterSpacing={'widest'} textAlign={['center','left']} >
                CrytoTrack provides comprehensive data on various cryptocurrency exchanges and coins. Stay updated with real-time market trends, detailed coin information, and secure exchange rates.  
                </Text>
            </VStack>
            <VStack>
                <Avatar boxSize={'28'} mt={['4','0']} />
                <Text>Sanket Jagtap</Text>
            </VStack>
        </Stack>

    </Box>
  )
}

export default Footer